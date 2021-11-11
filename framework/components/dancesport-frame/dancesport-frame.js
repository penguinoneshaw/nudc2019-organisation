import { LitElement, html, css } from "lit";

export class DancesportFrame extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          grid-area: body;
          transition: transform 0.3s ease-in-out, opacity 0.2s ease-out;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          text-align: center;
          font-size: 32px;
        }

        :host(:not([active])) {
          opacity: 0;
        }

        section {
          max-width: 800px;
        }
      `,
    ];
  }

  static get properties() {
    return {
      active: {
        type: Boolean,
        notify: true,
        reflect: true,
      },
      title: {
        type: String,
      },
      body: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.title = this.title || "Northern Universities Dance Competition";
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
      </header>
      ${this.body ? html` <section>${this.body}</section> ` : ""}
    `;
  }

  hideSlide() {
    this.active = false;
    return this.active;
  }

  showSlide() {
    this.active = true;
    return this.active;
  }

  shouldUpdate() {
    return true; //this.active;
  }
}
