const arenas = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    return elHP.call(this).style.width = this.hp + '%';
}

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['lasso', 'knife', 'lash'],
    attack: function(name) {
        console.log(name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'fork', 'ray'],
    attack: function(name) {
        console.log(name + ' Fight...');
    },
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
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

    return $player;
}

function playerWins(name) {
    const $winTitle = createElement('div', 'loseTitle');
    if (name) {
        $winTitle.innerText = name + ' wins!';
    } else {
        $winTitle.innerText = 'Draw!';
    }
    return $winTitle;
}

function getRandom(num) {
    return Math.ceil(Math.random() * num);
}

randomButton.addEventListener('click', function () {
    player1.changeHP(getRandom(20));
    player1.renderHP();
    player2.changeHP(getRandom(20));
    player2.renderHP();

    if (player1.hp === 0 || player2.hp === 0) {
        randomButton.disabled = true;
        createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        arenas.appendChild(playerWins(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        arenas.appendChild(playerWins(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        arenas.appendChild(playerWins());
    }
});

function createReloadButton() {
    const reloadWrap = createElement('div', 'reloadWrap');
    const reloadButton = createElement('button', 'button');
    reloadButton.innerText = 'Restart';
    reloadWrap.appendChild(reloadButton);
    arenas.appendChild(reloadWrap);

    reloadButton.addEventListener('click', function () {
        window.location.reload();
    });
}

arenas.appendChild(createPlayer(player1));
arenas.appendChild(createPlayer(player2));
