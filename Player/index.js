import { createElement } from "../utils";

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

    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');

        $life.style.width = this.hp + '%';
        $name.innerText = this.name;
        $img.src = this.img;

        $player.appendChild($progressbar);
        $player.appendChild($character);
        $progressbar.appendChild($life);
        $progressbar.appendChild($name);
        $character.appendChild($img);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    }
}
