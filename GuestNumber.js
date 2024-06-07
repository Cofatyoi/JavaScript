const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function random() {
    return Math.floor(Math.random() * 10);
}

questNumber = random();
ConsoleNumber = 0;

console.log("Угадайте число которое было спрятано. От 1 до 10")

rl.question('Введите число: ', (ConsoleNumber) => {
    if (questNumber !== parseInt(ConsoleNumber)) {
        return console.log(`Вы не угадали, повёт в следующий раз! Число: ${questNumber}`)
    }
    else {
        console.log("Поздравляю вы угадали!")
    }
});

