import { html, css } from "lit-element";

import { DancesportFrame } from "..";

export class OffbeatFrame extends DancesportFrame {
  static get styles() {
    return [...super.styles, css``];
  }

  static get properties() {
    return {
      ...super.properties,
      university: {
        type: Number,
      },
    };
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <header>
        <h1>Offbeat</h1>
        <h2>${this.university} &mdash; ${this.title}</h2>
      </header>
    `;
  }
}
