import { createElement } from "./create-element.js";

export function createPlayer({ player, name, hp, img }) {
    const $player = createElement('div', `player${player}`);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}
