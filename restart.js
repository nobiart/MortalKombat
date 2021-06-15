import { createElement } from './create-element.js';
import { arenas } from './elements.js';

function createReloadButton() {
    const reloadWrap = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');
    reloadButton.innerText = 'Restart';
    reloadWrap.appendChild(reloadButton);
    arenas.appendChild(reloadWrap);

    reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
}

export default createReloadButton;
