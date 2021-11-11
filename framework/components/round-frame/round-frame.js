import { html, css } from "lit-element";

import { DancesportFrame } from "..";

export class RoundFrame extends DancesportFrame {
  static get styles() {
    return [...super.styles, css``];
  }

  static get properties() {
    return {
      ...super.properties,
      round: {
        type: Number,
      },
      heats: {
        type: Number,
      },
      recalls: {
        type: Array,
      },
      _current_heat: {
        type: Number,
      },
      _current_dance: {
        type: Number,
      },
      dances: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.title = this.title || "Northern Universities Dance Competition";
    this.recalls = this.recalls || [];
    this._current_heat = 1;
    this._current_dance = 0;
    this.dances = this.dances || [];
  }

  render() {
    return html`
      <header>
        <h1>${this.title}</h1>
        ${this.dances.length > 1
          ? html` <h2>${this.dances[this._current_dance]}</h2>`
          : ""}
        <h2>
          ${Number.isInteger(parseInt(this.round, 10))
            ? html`Round ${this.round}`
            : this.round}
        </h2>
        ${this.heats != 1
          ? html`<h3>Heat ${this._current_heat}/${this.heats}</h3>`
          : ""}
      </header>
      ${this.recalls
        ? html`
            <section>
              <h1>Recalls</h1>
              ${this.recalls.join(",\t")}
            </section>
          `
        : ""}
    `;
  }

  set heat(h) {
    if (h > this.heats || h <= 0) throw new Error("Invalid Heat Number" + h);
    this._current_heat = h;
    return h;
  }

  set dance(d) {
    if (d >= this.dances.length || d < 0)
      throw new Error("Invalid Dance Number" + d);
    this._current_dance = d;
    return d;
  }

  set subframe(n) {
    if (Array.isArray(n)) n = n[0];
    if (n >= this.dances.length * this.heats)
      return new Error("Invalid Heat Number" + n);
    this.dance = Math.floor(n / this.heats);
    this.heat = (n % this.heats) + 1;
  }

  get subframe() {
    return this._current_dance * this.heats + (this._current_heat - 1);
  }

  nextSubframe() {
    if (this.subframe + 1 >= this.heats * this.dances.length) return false;
    this.subframe = this.subframe + 1;
    return true;
  }

  hideSlide() {
    super.hideSlide();
    this.subframe = 0;
  }
}
