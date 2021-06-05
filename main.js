const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['lasso', 'knife', 'lash'],
    attack: function(name) {
        console.log(name + ' Fight...');
    }
};

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'fork', 'ray'],
    attack: function(name) {
        console.log(name + ' Fight...');
    }
};

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    return $tag;
}

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

    return $player
}

function changeHP(player) {
    const playerLife = document.querySelector('.player' + player.player + ' .life');
    player.hp -= Math.ceil(Math.random() * 20);

    if (player.hp <= 0) {
        player.hp = 0;
        randomButton.disabled = true;
    }

    playerLife.style.width = player.hp + '%';

    if (player1.hp === 0) {
        arenas.appendChild(playerWin(player2));
    }

    if (player2.hp === 0) {
        arenas.appendChild(playerWin(player1));
    }
}

function playerWin(player) {
    const $winTitle = createElement('div', 'loseTitle');

    $winTitle.innerText = player.name + ' win!';

    return $winTitle;
}

randomButton.addEventListener('click', function () {
    changeHP(player1);
    changeHP(player2);
})

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
