export function changeHP(damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
        this.hp = 0;
    }
    this.damage = damage;
    return this.hp;
}

export function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

export function renderHP() {
    return elHP.call(this).style.width = this.hp + '%';
}

export function attack() {
    console.log(this.name + ' ' + 'Fight...');
}
