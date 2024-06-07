const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function multi(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    if (num2 === 0) {
        return "Ошибка: Деление на ноль";
    }
    return num1 / num2;
}

rl.question('Введите первое число: ', (num1) => {
    rl.question('Введите второе число: ', (num2) => {
        rl.question('Введите действие (+, -, *, /): ', (func) => {
            num1 = parseFloat(num1);
            num2 = parseFloat(num2);

            // Выполнение выбранной операции
            let result;
            if (func === "+") {
                result = add(num1, num2);
            } else if (func === "-") {
                result = sub(num1, num2);
            } else if (func === "*") {
                result = multi(num1, num2);
            } else if (func === "/") {
                result = div(num1, num2);
            } else {
                result = "Неизвестное действие";
            }

            // Вывод результата
            console.log(`Результат: ${result}`);

            rl.close();
        });
    });
});