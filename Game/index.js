import { getRandom, createElement, getTime } from "../utils";
import { HIT, LOGS } from "../constants";
import Player from "../Player";

export class Game {
    constructor() {
        this.formFight = document.querySelector('.control');
        this.arenas = document.querySelector('.arenas');
        this.fightButton = document.querySelector('.button');
        this.chat = document.querySelector('.chat');
    }

    getRandomPlayer = async () => {
        return  fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json());
    }

    playerAttack = async () => {
        const attack = {};
        for (let item of this.formFight) {
            if (item.checked && item.name === 'hit') {
                attack.value = getRandom(HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        const values = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit: attack.hit,
                defence: attack.defence,
            })
        }).then(res => res.json());

        return values;
    }

    createReloadButton = () => {
        const reloadWrap = createElement('div', 'reloadWrap');
        const reloadButton = createElement('button', 'button');
        reloadButton.innerText = 'Restart';
        reloadWrap.appendChild(reloadButton);
        this.arenas.appendChild(reloadWrap);
    
        reloadButton.addEventListener('click', () => window.location.reload());
    }

    playerWins = (name) => {
        const $winTitle = createElement('div', 'loseTitle');
        if (name) {
            $winTitle.innerText = `${name} wins!`;
        } else {
            $winTitle.innerText = 'Draw!';
        }
        return $winTitle;
    }

    showResult = (player1, player2) => {
        const formInputs = this.formFight.querySelectorAll('input');
    
        if (player1.hp === 0 || player2.hp === 0) {
            this.fightButton.disabled = true;
            for (let item of formInputs) {
                item.disabled = true;
            }
            this.createReloadButton();
        }
    
        if (player1.hp === 0 && player1.hp < player2.hp) {
            this.arenas.appendChild(this.playerWins(player2.name));
            this.generateLogs('end', player2, player1);
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            this.arenas.appendChild(this.playerWins(player1.name));
            this.generateLogs('end', player1, player2);
        } else if (player1.hp === 0 && player2.hp === 0) {
            this.arenas.appendChild(this.playerWins());
            this.generateLogs('draw');
        }
    }

    getTextLog = (type, playerName1, playerName2) => {
        switch (type) {
            case 'start':
                return LOGS[type]
                    .replace('[player1]', playerName1)
                    .replace('[player2]', playerName2)
                    .replace('[time]', getTime());
            case 'hit':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2);
            case 'defence':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2);
            case 'end':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerWins]', playerName1)
                    .replace('[playerLose]', playerName2);
            case 'draw':
                return LOGS[type];
            default:
                return 'Something else';
        }
    }

    generateLogs = (type, { name }, { name: playerName2, hp }, valueAttack) => {
        let text = this.getTextLog(type, name, playerName2);
        switch(type) {
            case 'hit':
                text = `${getTime()} ${text} -${valueAttack} [${hp}/100]`;
                break;
            case 'defence':
            case 'end':
            case 'draw':
                text = `${getTime()} ${text}`;
                break;

        }

        const el = `<p>${text}</p>`;
        this.chat.insertAdjacentHTML('afterbegin', el);
    }

    start = async () => {
        const p1 = await this.getRandomPlayer();
        const p2 = await this.getRandomPlayer();
        const player1 = new Player({
            ...p1,
            player: 1,
            rootSelector: 'arenas'
        });
        const player2 = new Player({
            ...p2,
            player: 2,
            rootSelector: 'arenas'
        });

        player1.createPlayer();
        player2.createPlayer();
        
        this.generateLogs('start', player1, player2);

        this.formFight.addEventListener('submit', async (e) => {
            e.preventDefault();

            const players = await this.playerAttack();
            const attack = players.player1;
            const enemy = players.player2;

            if (attack.defence !== enemy.hit) {
                player1.changeHP(enemy.value);
                player1.renderHP();
                this.generateLogs('hit', player1, player2, enemy.value);
            } else {
                this.generateLogs('defence', player2, player1);
            }

            if (attack.hit !== enemy.defence) {
                player2.changeHP(attack.value);
                player2.renderHP();
                this.generateLogs('hit', player1, player2, attack.value);
            } else {
                this.generateLogs('defence', player1, player2);
            }

            this.showResult(player1, player2);
        });
    }
}
