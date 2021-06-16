import { player1, player2 } from './players.js';
import { enemyAttack, playerAttack } from './fight.js';
import { formFight, arenas } from './elements.js';
import generateLogs from './generate-logs.js';
import showResult from './show-result.js';
import { createPlayer } from './create-player.js';

formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemyAttack();
    const { hit, defence, value } = playerAttack();

    if (defence !== hitEnemy) {
        player1.changeHP(valueEnemy);
        player1.renderHP();
        generateLogs('hit', player2, player1, valueEnemy);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (hit !== defenceEnemy) {
        player2.changeHP(value);
        player2.renderHP();
        generateLogs('hit', player1, player2, value);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});

function init() {
    arenas.appendChild(createPlayer(player1));
    arenas.appendChild(createPlayer(player2));

    generateLogs('start', player1, player2);
}

init();
