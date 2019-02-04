'use strict';
const fs = require('fs');
const hbs = require('handlebars');
const http = require('http');
const express = require('express');
const app = express();
const crypto = require('crypto');

const {
    individual, team
} = require('./data/events');

const config = {...require('./data/slides.json'), 'competitions': {...individual, ...team}};

fs.readFile = fs.promises.readFile;
let base_template_promise = fs.readFile('handlebars_templates/template.hbs').then(template => hbs.compile(template.toString('utf-8')));
let invoice_template_promise = fs.readFile('handlebars_templates/invoice.hbs').then(template => hbs.compile(template.toString('utf-8')));
let invoice_list_template_promise = fs.readFile('handlebars_templates/invoice_list.hbs').then(template => hbs.compile(template.toString('utf-8')));
let index_promise = fs.readFile('handlebars_templates/index.hbs').then(template => hbs.compile(template.toString('utf-8')));
let university_index_promise = fs.readFile('handlebars_templates/university_index.hbs').then(template => hbs.compile(template.toString('utf-8')));
let event_index_promise = fs.readFile('handlebars_templates/event_index.hbs').then(template => hbs.compile(template.toString('utf-8')));
const presentation_template = fs.readFile('framework/index.hbs').then(template => hbs.compile(template.toString('utf-8')));


async function
render_invoice(form_output) {
    const render_context = generate_invoice_object(form_output, form_output.late);
    return invoice_template_promise.then((compiled) => {
        return {
            title: form_output.basic_information.university + ' invoice',
            body: compiled(render_context)
        };
    });
}

async function build_index() {
    const dir_listing = await fs.promises.readdir('entries');
    const universities = await Promise.all(dir_listing.map(entry => fs.readFile(`entries/${entry}/json/full_save.json`))).then(
        entries => entries.map(entry => JSON.parse(entry)).reduce((object, university) => {
            return {
                ...object,
                [university.basic_information.university]: university
            };
        }, {})
    );

    return {
        universities,
        full_list: combine_full_competition_individual_lists(universities)
    };
}

const combined_universities = build_index();

app.get('/', async (req, res) => {
    const index_template = await index_promise;
    const index_content = await combined_universities;
    const index = {
        body: index_template(index_content)
    };
    const base_template = await base_template_promise;
    res.send(base_template(index));
});


app.get('/invoices', async (req, res) => {
    res.set({
        'Content-Type': 'text/html'
    });
    const {
        universities
    } = await combined_universities;
    const links = Object.keys(universities).map(link => {
        return {
            href: encodeURI(`/${link}/invoice`),
            text: link
        };
    });

    return Promise.all([base_template_promise, invoice_list_template_promise]).then(
        base_template => res.send(base_template[0]({
            body: base_template[1]({
                links
            })
        }))
    );
});

app.get(/university\/(.*)\/invoice$/, async (req, res) => {
    try {
        const {
            universities
        } = await combined_universities;
        const content = await render_invoice(universities[decodeURIComponent(req.params[0])]);
        const in_context = await base_template_promise.then(template => template(content));
        res.set({
            'Content-Type': 'text/html'
        });
        res.send(in_context);
    } catch (_) {
        res.sendStatus(404);
    }
});

app.get(/university\/(.*)$/, async (req, res) => {
    try {
        const {
            universities,
            full_list
        } = await combined_universities;
        res.set({
            'Content-Type': 'text/html'
        });
        const university = req.params[0];
        const ret = {
            ...universities[university].basic_information,
            couples: Object.values(full_list.couples).filter(c => c.university === university).map(cpl => {
                return {
                    ...cpl,
                    lead: full_list.competitors[cpl.lead],
                    follow: full_list.competitors[cpl.follow]
                };
            }),
            competitors: universities[university].competitors
        };
        return Promise.all([base_template_promise, university_index_promise]).then(
            base_template => res.send(base_template[0]({
                body: base_template[1](ret)
            }))
        );
    } catch (_) {
        res.sendStatus(404);
    }
});

app.get(/event\/([a-z]+)$/, async (req, res) => {
    const {
        full_list
    } = await combined_universities;

    const event_couples = Object.values(full_list.couples).filter(c => c.events.includes(req.params[0])).map(c => {
        return {
            ...c,
            lead: full_list.competitors[c.lead],
            follow: full_list.competitors[c.follow]
        };
    });
    return Promise.all([base_template_promise, event_index_promise]).then(
        base_template => res.send(base_template[0]({
            body: base_template[1]({
                ...individual[req.params[0]],
                event_couples
            })
        }))
    );
});

const ENTRY_TYPES = {
    'full': {
        type: 'Full Admission',
        unit_cost: 15,
    },
    'full-late': {
        type: 'Full Admission (late entry)',
        unit_cost: 20,
    },
    'offrnr': {
        type: 'Offbeat Only/Rock \'n\' Roll Only',
        unit_cost: 10,
    },
    'offrnr-late': {
        type: 'Offbeat Only/Rock \'n\' Roll Only (late entry)',
        unit_cost: 15,
    },
    'spectator': {
        type: 'Spectator',
        unit_cost: 4
    }
};

function competitor_entry_category(competitor, offbeat = false, late = false) {
    competitor.events = competitor.events || [];
    let type = '';
    if (competitor.events.length == 0 && competitor.offbeat && offbeat ||
        (competitor.events.includes('onarr') || competitor.events.includes('oarr')) && competitor.events.length == 1 ||
        (competitor.events.includes('onarr') && competitor.events.includes('oarr') && competitor.events.length == 2)) {
        type = 'offrnr';
    } else if (competitor.events.length == 0 && !(competitor.offbeat && offbeat)) {
        type = 'spectator';
    } else {
        type = 'full';
    }

    if (['offrnr', 'full'].includes(type) && late) {
        type += '-late';
    }
    return type;
}

function generate_invoice_object(form_output, late = false) {
    const competitors_with_entrytype = Object.values(form_output.competitors).map((competitor) => {
        return {
            ...competitor,
            entry_type: competitor_entry_category(competitor, form_output.offbeat, late),
        };
    });
    const summary = Object.values(competitors_with_entrytype).reduce((prev, next) => {
        return {
            ...prev,
            [next.entry_type]: {
                ...ENTRY_TYPES[next.entry_type],
                number: (prev[next.entry_type] || {
                    number: 0
                }).number + 1,
            }
        };
    }, {
        'affiliation': {
            type: 'NUDC Affiliation Fee',
            unit_cost: 25,
            number: 1
        }
    });
    return {
        reference: `NUDC ${form_output.basic_information.university.split(/university|and(?!\w)|of(?!\w)/ig).join('')}`.substr(0, 18).trim(),
        university: form_output.basic_information.university,
        competitors: competitors_with_entrytype,
        summary: {
            ...summary,
        },
        total_entry: Object.values(summary).reduce((prev, next) => prev + next.number * next.unit_cost, 0),
    };

}

hbs.registerHelper('type-row', (context, opts) => {
    return Object.values(context).reduce((prev, next) => {
        if (next.number == 0) return prev;
        next.unit_total = next.unit_cost * next.number;
        return prev + opts.fn(next);
    }, '');
});

hbs.registerHelper('competitor-row', (context, opts) => {
    return Object.values(context).sort((a, b) => a.name > b.name ? 1 : -1).reduce((prev, next) => {
        next.entry_type = ENTRY_TYPES[next.entry_type];
        return prev + opts.fn(next);
    }, '');
});

hbs.registerHelper('couple-row', (context, opts) => {
    return Object.values(context).sort((a, b) => a.comp_couple_id > b.comp_couple_id ? 1 : -1).reduce((prev, next) => {
        return prev + opts.fn({
            ...next,
            events: next.events.join(', ')
        });
    }, '');
});

hbs.registerHelper('all-events-row', (context, opts) => {
    return Object.keys(individual).map((event_id) => {
        const event_couples = Object.values(context.couples).filter((c) => c.events.includes(event_id));
        return opts.fn({
            event: individual[event_id],
            event_couples
        });
    }).join('\n');
});

hbs.registerHelper('university-row', (context, opts) => {
    return Object.values(context).reduce((prev, entry) => {
        const competitors_length = Object.values(entry.competitors).filter(competitor => competitor.events.length || competitor.offbeat).length;
        const couples_length = Object.values(entry.couples).filter(couple => couple.events.length).length;
        return prev + opts.fn({
            university: entry.basic_information.university,
            link: `university/${encodeURIComponent(entry.basic_information.university)}`,
            competitors_length,
            couples_length
        });
    }, '');
});

hbs.registerHelper('all-couples-row', (context, opts) => {
    return Object.values(context.couples).reduce((prev, entry) => {

        return prev + opts.fn({
            comp_couple_id: entry.comp_couple_id,
            university: entry.university,
            events: entry.events.join(', '),
            lead: context.competitors[entry.lead],
            follow: context.competitors[entry.follow]
        });
    }, '');
});

function combine_full_competition_individual_lists(combined_entries_by_university) {
    let result = {
        couples: [],
        competitors: {}
    };
    let comp_id = 0;

    Object.keys(combined_entries_by_university).forEach(university => {
        const input_couples = {
            ...combined_entries_by_university[university].couples
        };
        let input_competitors = {
            ...combined_entries_by_university[university].competitors
        };

        Object.values(input_couples).forEach((couple) => {
            let lead = input_competitors[couple.lead];
            let follow = input_competitors[couple.follow];
            if (!lead.comp_id) {
                input_competitors[couple.lead].comp_id = comp_id++;
                lead.university = university;
                result.competitors = {
                    ...result.competitors,
                    [lead.comp_id]: lead
                };
            }
            if (!follow.comp_id) {
                input_competitors[couple.follow].comp_id = comp_id++;
                follow.university = university;

                result.competitors = {
                    ...result.competitors,
                    [follow.comp_id]: follow
                };
                follow = input_competitors[couple.follow];
            }

            input_competitors = {
                ...input_competitors,
                [lead.id]: lead,
                [follow.id]: follow,
            };

            result.couples.push({
                lead: lead.comp_id,
                follow: follow.comp_id,
                events: couple.events,
                university: university
            });

        });
    });
    
    result.couples_fixed = [];
    result.couples
        .sort((a, b) => {
            const ahash = crypto.createHash('sha256');
            const bhash = crypto.createHash('sha256');

            ahash.update(result.couples.length + a.lead + a.follow + a.university + a.events.join(''));
            bhash.update(result.couples.length + b.lead + b.follow + b.university + b.events.join(''));

            return ahash.digest('base64') > bhash.digest('base64') ? 1 : -1;
        }).forEach((couple, i) => {
            if (result.couples_fixed.slice(-1)[0] && result.couples_fixed.slice(-1)[0].university === couple.university) {
                if (result.couples_fixed[0] && result.couples_fixed[0].university === couple.university) {
                    result.couples_fixed.splice(result.couples_fixed.length/4 + i % result.couples_fixed.length/2, 0, couple);
                    result.couples_fixed = result.couples_fixed.reverse();
                    return;
                } 
                result.couples_fixed = result.couples_fixed.reverse();
            }
            return result.couples_fixed.push(couple);
        });

    
        
    result.couples_map = result.couples_fixed.reduce((prev, next, i) => {
        const BANNED_NUMBERS = [13, 88, 69];
        const comp_couple_id = BANNED_NUMBERS.includes(i + 1) ? result.couples.length + BANNED_NUMBERS.indexOf(i + 1) + 1 : i + 1;
        return {
            ...prev,
            [comp_couple_id]: {
                ...next,
                comp_couple_id
            }
        };
    }, {});

    return {
        competitors: result.competitors,
        couples: result.couples_map

    };
}

/** PRESENTATIONS */

app.get('/presentation', async (req, res) => {
    const index = await presentation_template;
    res.header('Content-Type', 'text/html');
    res.send(index(config));
});

app.get('/config', async (req, res) => {
    res.header('cache', 'private, no-cache');
    res.header('Content-Type', 'text/json');
    res.send(config);
});

app.use(express.static('static'));

const server = http.createServer(app);


const io = require('socket.io')(server);

let current_slide = [0,0];
io.on('connection', (socket) => {
    socket.on('slide-changed', (slide)=>{
        current_slide = slide;
        socket.broadcast.emit('current-slide', slide);
    });
    socket.emit('current-slide', current_slide);
});

server.listen(8081);