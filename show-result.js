import { formFight, fightButton, arenas } from "./elements.js";
import { player1, player2 } from "./players.js";
import createReloadButton from "./restart.js";
import playerWins from "./winner.js";
import generateLogs from "./generate-logs.js";

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

export default showResult;
