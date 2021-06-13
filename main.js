const arenas = document.querySelector('.arenas');
const formFight = document.querySelector('.control');
const fightButton = formFight.querySelector('.button');
const chat = document.querySelector('.chat');

function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.damage = damage;
    return this.hp;
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    return elHP.call(this).style.width = this.hp + '%';
}

function attack() {
    console.log(this.name + ' ' + 'Fight...');
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал "вырезано цензурой", и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['lasso', 'knife', 'lash'],
    damage: 0,
    attack,
    changeHP,
    elHP,
    renderHP,
};

const player2 = {
    player: 2,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['gun', 'fork', 'ray'],
    damage: 0,
    attack,
    changeHP,
    elHP,
    renderHP,
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

function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
    }
}

function playerAttack() {
    const attack = {};
    for (let item of formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom(HIT[item.value]);
            attack.hit = item.value;
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }
        item.checked = false;
    }

    return attack;
}

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

function generateLogs(type, playerHit, playerDefence) {
    const enemy = enemyAttack();
    const player = playerAttack();
    let logText = '';
    const time = new Date().toLocaleTimeString().slice(0,-3);
    switch (type) {
        case 'start':
            logText = logs[type]
                .replace('[time]', time)
                .replace('[player1]', playerHit.name)
                .replace('[player2]', playerDefence.name);
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

generateLogs('start', player1, player2);

formFight.addEventListener('submit', function (e) {
    e.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if (player.defence !== enemy.hit) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        //console.log(`## Второй игрок нанес урон первому: ${enemy.value}`);
        generateLogs('hit', player2, player1);
    } else {
        generateLogs('defence', player2, player1);
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        //console.log(`## Первый игрок нанес урон второму: ${player.value}`);
        generateLogs('hit', player1, player2);
    } else {
        generateLogs('defence', player1, player2);
    }

    showResult();
});
