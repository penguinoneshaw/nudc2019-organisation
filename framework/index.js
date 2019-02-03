import {DancesportFrame, DancesportFrameholder, RoundFrame} from './components/index.js';
import css from './styles/main.scss';
import normalize from 'normalize.css';
const socket = io();

const style = document.createElement('style');
style.innerHTML = [normalize, css].join('');
document.head.appendChild(style);
window.customElements.define('dancesport-frame', DancesportFrame);
window.customElements.define('dancesport-frameholder', DancesportFrameholder);
window.customElements.define('round-frame', RoundFrame);

const frameholder = document.querySelector('dancesport-frameholder');

socket.on('current-slide', (evt) => {
    frameholder.slide = evt;
});

document.addEventListener('slide-changed', (evt) => {
    socket.emit('slide-changed', evt.detail.slide);
});