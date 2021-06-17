import { createElement } from "../utils/index.js";

export default class Player {
    constructor(props) {
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.player = props.player;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHP = (damage) => {
        this.hp -= damage;

        if (this.hp <= 0) {
            this.hp = 0;
        }
    }
    
    elHP = () => {
        return document.querySelector(`.${this.selector} .life`);
    }
    
    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }
}

export const Scorpion = new Player({
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    rootSelector: 'arenas',
});

export const Subzero = new Player({
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelector: 'arenas',
});

export const createPlayer = ({ name, hp, img, selector, rootSelector }) => {
    const $player = createElement('div', selector);
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

    const $root = document.querySelector(`.${rootSelector}`);
    $root.appendChild($player);

    return $player;
};
