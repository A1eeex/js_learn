const ATTACK_VALUE = 10;
const STRONG_ATTACK_VAlUE = 50;
const MONSTER_ATTACK = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"
const MODE_STRONG_ATTACK_VAlUE = "STRONG_ATTACK_VAlUE"
const LOG_EVENT_PLAYER_ATTACK = 'PAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'LOG_EVENT_PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'LOG_EVENT_MONSTER_ATTACK';
const LOG_EVENT_MONSTER_STRONG_ATTACK = 'PAYER_STRONG_ATTACK';
const LOG_EVENT_PLAYER_HEALTH = 'PLAYER_HEALTH';
const LOG_EVENT_GAME_OVER = 'GAME_OVER'


let battleLog = [];

function getMaxLifeValue() {

    const enteredValue = prompt("Write max live you and the monster", '100');

    const parsedValue = parseInt(enteredValue);
    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw {message: 'Invalid user input, not a number!'}
    }
    return parsedValue;
}

let choseMaxLife;

try {
    choseMaxLife = getMaxLifeValue();

} catch (error) {
    console.log(error)
    choseMaxLife = 100;
    alert('you write something wrong, so default value = 100')
}finally{
    alert('Start Game!')
}

let currentMonsterHealth = choseMaxLife;
let currentPlayerHealth = choseMaxLife;
let hasBonusLife = true;


adjustHealthBars(choseMaxLife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };
    switch (ev) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = "MONSTER";
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = "PLAYER";
            break;
        case LOG_EVENT_MONSTER_STRONG_ATTACK:
            logEntry = {
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
                target: "PLAYER"
            }
            break;
        case LOG_EVENT_PLAYER_HEALTH:
            logEntry = {
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
                target: "PLAYER"
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: ev,
                value: val,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth
            };
            break;
        default:
            logEntry = {};
    }
    // if (ev === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry.target = "MONSTER";
    // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry.target = "PLAYER";
    // } else if (ev === LOG_EVENT_MONSTER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //         target: "PLAYER"
    //     };
    // } else if (ev === LOG_EVENT_PLAYER_HEALTH) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //         target: "PLAYER"
    //     };
    // } else if (ev === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: ev,
    //         value: val,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth
    //     };
    // }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = choseMaxLife;
    currentPlayerHealth = choseMaxLife;
    resetGame(choseMaxLife)
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -= playerDamage
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife()
        currentMonsterHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth)
        alert('bonus life')
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('yo won!')
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER_WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('yo lost!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'MONSTER_WON',
            currentMonsterHealth,
            currentPlayerHealth
        );
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'A DRAW',
            currentMonsterHealth,
            currentPlayerHealth
        );
    }
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset()
    }
}

function attackMonster(mode) {
    const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VAlUE;
    let logEvent = mode === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // } else if (mode === MODE_STRONG_ATTACK_VAlUE) {
    //     maxDamage = STRONG_ATTACK_VAlUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK
    // }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        damage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound()
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= choseMaxLife - HEAL_VALUE) {
        alert("you can*t heal")
        healValue = choseMaxLife - currentPlayerHealth
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEALTH,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

attackBtn.addEventListener("click", (e) => {
    attackMonster(MODE_ATTACK)
});
strongAttackBtn.addEventListener("click", (e) => {
    attackMonster(MODE_STRONG_ATTACK_VAlUE)
});
healBtn.addEventListener("click", (e) => {
    healPlayerHandler()
})
logBtn.addEventListener('click', (e) => {
    console.log(battleLog)
})