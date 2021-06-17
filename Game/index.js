import { getRandom, createElement, getTime } from "../utils/index.js";
import { HIT, ATTACK, LOGS } from "../constants/index.js";
import { Scorpion, Subzero, createPlayer } from "../Player/index.js";

export default class Game {
    constructor() {
        this.formFight = document.querySelector('.control');
        this.arenas = document.querySelector('.arenas');
        this.fightButton = document.querySelector('.button');
        this.chat = document.querySelector('.chat');
    }

    enemyAttack = () => {
        const hit = ATTACK[getRandom(3) - 1];
        const defence = ATTACK[getRandom(3) - 1];
    
        return {
            value: getRandom(HIT[hit]),
            hit,
            defence,
        }
    }
    
    playerAttack = () => {
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
    
        return attack;
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
                break;
            case 'hit':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2);
                break;
            case 'defence':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerKick]', playerName1)
                    .replace('[playerDefence]', playerName2);
                break;
            case 'end':
                return LOGS[type][getRandom(LOGS[type].length - 1) - 1]
                    .replace('[playerWins]', playerName1)
                    .replace('[playerLose]', playerName2);
                break;
            case 'draw':
                return LOGS[type];
                break;
            default:
                return 'Something else';
                break;
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

    start = () => {
        this.arenas.appendChild(createPlayer(Scorpion));
        this.arenas.appendChild(createPlayer(Subzero));
        
        this.generateLogs('start', Scorpion, Subzero);

        this.formFight.addEventListener('submit', (e) => {
            e.preventDefault();
            const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = this.enemyAttack();
            const { hit, defence, value } = this.playerAttack();
        
            if (defence !== hitEnemy) {
                Scorpion.changeHP(valueEnemy);
                Scorpion.renderHP();
                this.generateLogs('hit', Subzero, Scorpion, valueEnemy);
            } else {
                this.generateLogs('defence', Subzero, Scorpion);
            }
        
            if (hit !== defenceEnemy) {
                Subzero.changeHP(value);
                Subzero.renderHP();
                this.generateLogs('hit', Scorpion, Subzero, value);
            } else {
                this.generateLogs('defence', Scorpion, Subzero);
            }
        
            this.showResult(Scorpion, Subzero);
        });
    }
}
