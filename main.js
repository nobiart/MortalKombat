import { player1, player2 } from './players.js';
import { enemyAttack, playerAttack } from './fight.js';
import { formFight, arenas } from './elements.js';
import generateLogs from './generate-logs.js';
import showResult from './show-result.js';
import { createPlayer } from './create-player.js';

formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
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
