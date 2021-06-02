const player1 = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['lasso', 'knife', 'lash'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const player2 = {
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'fork', 'ray'],
    attack: function() {
        console.log(this.name + ' Fight...');
    }
};

const arenas = document.querySelector('.arenas');

function createPlayer(playerClass, playerInfo) {
    const $player = document.createElement('div');
    const $progressbar = document.createElement('div');
    const $character = document.createElement('div');
    const $life = document.createElement('div');
    const $name = document.createElement('div');
    const $img = document.createElement('img');

    $player.classList.add(playerClass);
    $progressbar.classList.add('progressbar');
    $character.classList.add('character');
    $life.classList.add('life');
    $life.style.width = playerInfo.hp + '%';
    $name.classList.add('name');
    $name.innerText = playerInfo.name;
    $img.src = playerInfo.img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);
