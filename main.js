import { player1, player2 } from './players.js';
import { createElement } from './create-element.js';
import createReloadButton from './restart.js';
import { enemyAttack, playerAttack } from './fight.js';
import playerWins from './winner.js';
import { logs } from './logs.js';
import { getRandom } from './utils.js';
import { formFight, arenas, fightButton, chat } from './elements.js';

function createPlayer(playerInfo) {
    const $player = createElement('div', 'player'+playerInfo.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = playerInfo.hp + '%';
    $name.innerText = playerInfo.name;
    $img.src = playerInfo.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));

function showResult() {
    const formInputs = formFight.querySelectorAll('input');

    if (player1.hp === 0 || player2.hp === 0) {
        fightButton.disabled = true;
        for (let item of formInputs) {
            item.disabled = true;
        }
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        arenas.appendChild(playerWins(player2.name));
        generateLogs('end', player2, player1);
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        arenas.appendChild(playerWins(player1.name));
        generateLogs('end', player1, player2);
    } else if (player1.hp === 0 && player2.hp === 0) {
        arenas.appendChild(playerWins());
        generateLogs('draw');
    }
}

function generateLogs(type, playerHit, playerDefence) {
    const enemy = enemyAttack();
    const player = playerAttack();
    let logText = '';
    const time = new Date().toLocaleTimeString().slice(0,-3);
    switch (type) {
        case 'start':
            logText = logs[type]
                .replace('[time]', time)
                .replace('[player1]', playerHit.name)
                .replace('[player2]', playerDefence.name);
            break;
        case 'hit':
            logText = `${time} - ${logs[type][getRandom(logs[type].length) - 1]
                .replace('[playerKick]', playerHit.name)
                .replace('[playerDefence]', playerDefence.name)}.
                [-${playerDefence.damage}] 
                [${playerDefence.hp}/100]`;
            break;
        case 'defence':
            logText = `${time} - ${logs[type][getRandom(logs[type].length) - 1]
                .replace('[playerKick]', playerHit.name)
                .replace('[playerDefence]', playerDefence.name)}.`;
            break;
        case 'end':
            logText = logs[type][getRandom(logs[type].length) - 1]
                .replace('[playerWins]', playerHit.name)
                .replace('[playerLose]', playerDefence.name);
            break;
        case 'draw':
            logText = logs[type];
            break;
        default:
            logText = 'Something else';
            break;
    }
    const el = `<p>${logText}</p>`;
    chat.insertAdjacentHTML('afterbegin', el);
}

generateLogs('start', player1, player2);

formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        //console.log(`## Второй игрок нанес урон первому: ${enemy.value}`);
        generateLogs('hit', player2, player1);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        //console.log(`## Первый игрок нанес урон второму: ${player.value}`);
        generateLogs('hit', player1, player2);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
