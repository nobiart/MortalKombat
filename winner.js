import { createElement } from "./create-element.js";

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' wins!';
    } else {
        $winTitle.innerText = 'Draw!';
    }
    return $winTitle;
}

export default playerWins;
