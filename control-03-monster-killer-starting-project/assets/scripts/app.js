const ATTACK_VALUE = 10;
const STRONG_ATTACK_VAlUE = 50;
const MONSTER_ATTACK = 14;
const HEAL_VALUE = 20;

let choseMaxLife = 100;
let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife  = true;

adjustHealthBars(choseMaxLife);

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -= playerDamage
    if(currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife()
        currentMonsterHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('bonus life')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('yo won!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('yo lost!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === "STRONG_ATTACK_VAlUE") {
        maxDamage = STRONG_ATTACK_VAlUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound()
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
        alert("you can*t heal")
        healValue = choseMaxLife - currentPlayerHealth
    }else{
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener("click", (e) => {
    attackMonster("ATTACK")
});
strongAttackBtn.addEventListener("click", (e) => {
    attackMonster("STRONG_ATTACK_VAlUE")
});
healBtn.addEventListener("click", (e) => {
    healPlayerHandler()
})