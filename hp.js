function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.damage = damage;
    return this.hp;
}

function elHP() {
    return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
    return elHP.call(this).style.width = this.hp + '%';
}

function attack() {
    console.log(this.name + ' ' + 'Fight...');
}

export { changeHP, elHP, renderHP, attack };
