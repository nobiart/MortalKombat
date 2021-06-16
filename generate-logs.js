import { chat } from "./elements.js";
import { getTextLog } from "./get-text-log.js";
import { getTime } from "./utils.js";

function generateLogs(type, player1 = {}, player2 = {}, valueAttack) {
    let text = getTextLog(type, player1.name, player2.name);
    switch(type) {
        case 'hit':
            text = `${getTime()} ${text} -${valueAttack} [${player2.hp}/100]`;
            break;
        case 'defence':
        case 'end':
        case 'draw':
            text = `${getTime()} ${text}`;
            break;

    }

    const el = `<p>${text}</p>`;
    chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs;
