import { chat } from "./elements.js";
import { getTextLog } from "./get-text-log.js";
import { getTime } from "./utils.js";

function generateLogs(type, { name }, { name: playerName2, hp }, valueAttack) {
    let text = getTextLog(type, name, playerName2);
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
    chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs;
