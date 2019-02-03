import {
    LitElement,
    css,
    html
} from 'lit-element';

export class DancesportFrameholder extends LitElement {
    static get styles() {
        return css `
  :host {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: grid;
    z-index: -2;
    grid-template-areas: "logo logo" "body body" "footer footer";
    grid-template-rows: 80px auto 80px;
    grid-template-columns: 1fr 5fr;
    transition: transform 0.3s ease-in-out;
    background-color: white;
    font-family: var(--header-fonts);
    background-color: white;
  }

  #frames::after {
        content: '';
        background: url(logo.svg) no-repeat center center;
        position: fixed;
        background-size: 80%;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        opacity: 0.1;
        z-index: -1;
  }

  header {
    grid-area: logo;
    font-size: 1em;
    background-color: var(--app-primary-color, darkgreen);
    color: var(--app-contrast-primary-color, white);
    text-align: center;
    font-variant: small-caps;
  }

  section {
      font-family: var(--body-fonts)
  }

  #sidebar {
      border-right: double thick var(--app-primary-color);
      grid-area: sidebar

  }

  :host([loading]) {
      opacity: 0;
  }

  #frames {
      display: contents;
      transition: opacity 0.1s cubic-bezier(0, 0.3,.6,1);
  }

  footer {
      grid-area: footer;
      background-color: var(--app-primary-color, darkgreen);
      color: var(--app-primary-contrast-color, white);
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: space-around;
  }

  #nextup {
    font-style: italic;
    font-size: 1.4em;
  }

  #nextup::before {
      content: 'Next: ';
      font-style: normal;
  }
`;
    }

    static get properties() {
        return {
            _slides: {
                type: Array
            },
            _competitions: {
                type: Object
            },
            _current_slide: {
                type: Number
            },
            _sponsors: {
                type: Array
            },
            _compere: {
                type: String
            },
            title: {
                type: String
            }
        };
    }
    
    constructor() {
        super();
        this.title = this.title || 'Northern Universities Dance Competition';
        this._slides = [{
            type: 'standard',

        }];
        this._current_slide = 0;

        this.setAttribute('loading', true);
    }

    render() {
        return html `
            <header>
            <h1>${this.title}</h1>
            </header>
            <div id='frames'>
            ${this._slides.map((slide) => {
        switch (slide.type) {
        case 'round':
            return html`<round-frame .title="${this._competitions[slide.competition].category + ' ' + this._competitions[slide.competition].event}"
                        .round="${slide.round}"
                        .heats="${slide.heats}"
                        .recalls=${slide.recalls}
                        .dances=${this._competitions[slide.competition].dances}
                        ></round-frame>`;
        default:
            return html`<dancesport-frame .title="${slide.title}" .body="${slide.body}"></dancesport-frame>`;
        }
            })}
            </div>
            <footer>
                ${this._compere ? html`<div>Compère: ${this._compere}</div>`:'' }
                <div id="nextup">${this._next_event()}</div>
                ${this._sponsors ? html`<div>Kindly Sponsored By ${this._sponsors.join(', ')}</div>`:'' }
            </footer>
        `;
    }

    _current_slide_frame() {
        return this.shadowRoot.querySelectorAll('#frames > *')[this._current_slide];
    } 

    _next_event() {
        let nextSlideNumber = (this._current_slide + 1) % this._slides.length;
        if (!this._slides[nextSlideNumber]) return 'END OF COMPETITION!';
        if (nextSlideNumber == 0) return 'END OF COMPETITION!';

        const nextSlide = this._slides[nextSlideNumber];
        switch (nextSlide.type) {
        case 'round':
            return [this._competitions[nextSlide.competition].category, this._competitions[nextSlide.competition].event, Number.isInteger(parseInt(nextSlide.round),10) ? `Round ${nextSlide.round}` : nextSlide.round].join(' ');
        default:
            return nextSlide.title;
        }
    }

    firstUpdated() {
        
        fetch(
            '/config'
        ).then(
            res => res.json()
        ).then(
            config => {
                this._competitions = config.competitions;
                this._compere = config.compere;
                this._sponsors = config.sponsors;
                this._slides = config.slides;
                this.removeAttribute('loading');
            }
        ).catch(e => console.error(e));
                    
        document.body.addEventListener('keydown', (e) => {
            switch (e.key) {
            case 'ArrowRight':
                this.nextSlide();
                break;
            case 'ArrowLeft':
                this.prevSlide();
                break;
            case 'f': 
                this.requestFullscreen();
            }
        });
        document.body.addEventListener('touchstart', ()=>{
            this.requestFullscreen();
        });
        this._current_slide_frame().showSlide();
    }
                
    set slide(slide_address) {
        let slide;
        if (Array.isArray(slide_address)) {
            slide = slide_address[0];
        } else {
            slide = slide_address;
        }
        if (!(slide < this._slides.length && slide >= 0)) throw new Error('Slide not available to switch to.');
        this._current_slide_frame().hideSlide();
        this._current_slide = slide;
        if (Array.isArray(slide_address) && slide_address.length > 1) {
            if (this._current_slide_frame().subframe !== undefined) this._current_slide_frame().subframe = (([,...t])=>t)(slide_address);
        }
        this._current_slide_frame().showSlide();
    }

    get slide() {
        return [this._current_slide, this._current_slide_frame().subframe];
    }
    
    nextSlide() {
        if (!(this._current_slide_frame().nextSubframe && this._current_slide_frame().nextSubframe())){
            this._current_slide_frame().hideSlide();
            this.slide = this._next_slide_number();
            this._current_slide_frame().showSlide();
        }
        this.dispatchEvent(new CustomEvent('slide-changed', {
            detail: {
                slide: this.slide,
            },
            bubbles: true,
            cancelable: true
        }));
    }

    _next_slide_number() {
        return (this._current_slide + 1) % this._slides.length;
    }

    _prev_slide_number() {
        return ((this._current_slide - 1) < 0 ? this._slides.length : (this._current_slide)) - 1;
    }

    prevSlide() {
        this._current_slide_frame().hideSlide();
        this.slide = this._prev_slide_number();
        this._current_slide_frame().showSlide();
        this.dispatchEvent(new CustomEvent('slide-changed', {
            detail: {
                slide: this.slide
            },
            bubbles: true,
            cancelable: true
        }));
    }
}