const ATTACK_VALUE = 10;
const STRONG_ATTACK_VAlUE = 50;
const MONSTER_ATTACK = 14;
let choseMazLife = 100;
let currentMonsterHealth = choseMazLife;
let currentPlayerHealth = choseMazLife;
adjustHealthBars(choseMazLife);

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK_VAlUE") {
        maxDamage = STRONG_ATTACK_VAlUE;
    }
    const damage = dealMonsterDamage(maxDamage)
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK)
    currentMonsterHealth -= damage
    currentPlayerHealth -= playerDamage
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('yo won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('yo lost!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
    }
}

attackBtn.addEventListener("click", (e)=>{
    attackMonster("ATTACK")
});
strongAttackBtn.addEventListener("click", (e)=>{
    attackMonster("STRONG_ATTACK_VAlUE")
});