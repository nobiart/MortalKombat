import { logs } from "./logs.js";
import { getRandom } from "./utils.js";
import { chat } from "./elements.js";

function generateLogs(type, playerHit, playerDefence) {
    let logText = '';
    const time = new Date().toLocaleTimeString().slice(0,-3);
    switch (type) {
        case 'start':
            logText = `${logs[type]
                .replace('[time]', time)
                .replace('[player1]', playerHit.name)
                .replace('[player2]', playerDefence.name)}`;
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
    }
    const el = `<p>${logText}</p>`;
    chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs;
