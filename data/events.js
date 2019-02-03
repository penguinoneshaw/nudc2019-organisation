const individual = {
    'bw': {
        'id': 'bw',
        'eligibility': 'Present Student',
        'category': 'Beginners\'',
        event: 'Waltz',
        'dances': ['Waltz'],

    },
    'bq': {
        'id': 'bq',
        'eligibility': 'Present Student',
        'category': 'Beginners\'',
        event: 'Quickstep',
        'dances': ['Quickstep'],

    },
    'bc': {
        'id': 'bc',
        'eligibility': 'Present Student',
        'category': 'Beginners\'',
        event: 'Cha-Cha',
        'dances': ['Cha-Cha'],

    },
    'bj': {
        'id': 'bj',
        'eligibility': 'Present Student',
        'category': 'Beginners\'',
        event: 'Jive',
        'dances': ['Jive'],

    },
    'nb': {
        'id': 'nb',
        'eligibility': 'Present Student',
        'category': 'Novice',
        event: 'Ballroom',
        'dances': ['Waltz', 'Quickstep'],

    },
    'nl': {
        'id': 'nl',
        'eligibility': 'Present Student',
        'category': 'Novice',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Jive'],

    },
    'ib': {
        'id': 'ib',
        'eligibility': 'Present Student',
        'category': 'Intermediate',
        event: 'Ballroom',
        'dances': ['Waltz', 'Tango', 'Quickstep'],

    },
    'il': {
        'id': 'il',
        'eligibility': 'Present Student',
        'category': 'Intermediate',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Rumba', 'Jive'],

    },
    'ab': {
        'id': 'ab',
        'eligibility': 'Present Student',
        'category': 'Advanced',
        event: 'Ballroom',
        'dances': ['Waltz', 'Tango', 'Quickstep'],

    },
    'al': {
        'id': 'al',
        'eligibility': 'Present Student',
        'category': 'Advanced',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Rumba', 'Jive'],

    },
    'ssb': {
        'id': 'ssb',
        'eligibility': 'Present Student',
        'category': 'Same-Sex',
        event: 'Ballroom',
        'dances': ['Waltz', 'Quickstep'],

    },
    'ssl': {
        'id': 'ssl',
        'eligibility': 'Present Student',
        'category': 'Same-Sex',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Jive'],

    },
    'esnb': {
        'id': 'esnb',
        'eligibility': 'Ex-student',
        'category': 'Ex-Student Novice',
        event: 'Ballroom',
        'dances': ['Waltz', 'Quickstep'],

    },
    'esnl': {
        'id': 'esnl',
        'eligibility': 'Ex-student',
        'category': 'Ex-Student Novice',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Jive'],

    },
    'esob': {
        'id': 'esob',
        'eligibility': 'Ex-student',
        'category': 'Ex-Student Open',
        event: 'Ballroom',
        'dances': ['Waltz', 'Tango'],

    },
    'esol': {
        'id': 'esol',
        'eligibility': 'Ex-student',
        'category': 'Ex-Student Open',
        event: 'Latin',
        'dances': ['Cha-Cha', 'Rumba'],

    },
    'ocs': {
        'id': 'ocs',
        'eligibility': 'Open',
        'category': 'Open',
        event: 'Classical Sequence',
        'dances': ['Balmoral Blues'],

    },
    'osb': {
        'id': 'osb',
        'category': 'Open Syllabus',
        'eligibility': 'Open',
        event: 'Ballroom 5-Dance',
        'dances': ['Waltz', 'Viennese Waltz', 'Tango', 'Foxtrot', 'Quickstep'],

    },
    'osl': {
        'id': 'osl',
        'eligibility': 'Open',
        'category': 'Open Syllabus',
        event: 'Latin 5-Dance',
        'dances': ['Cha-Cha', 'Samba', 'Rumba', 'Paso Doble', 'Jive'],

    },
    'onarr': {
        'id': 'onarr',
        'eligibility': 'Open',
        'category': 'Rock \'n\' Roll',
        event: 'Non-Acrobatic',

    },
    'oarr': {
        'id': 'oarr',
        'eligibility': 'Open',
        'category': 'Rock \'n\' Roll',
        event: 'Acrobatic',
    }
};

const team = {
    'match': {
        category: 'Team',
        event: 'Match',
        dances: ['Waltz', 'Quickstep', 'Cha-Cha-Cha']
    }
}

module.exports = {
    individual,
    team
}