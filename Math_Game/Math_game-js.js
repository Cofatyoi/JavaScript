import {getLogMessages} from './game.type.js';
import fs from 'fs-extra';
import prompt from 'prompt-sync';

class Loader {
    constructor(filename, defaultJson = {}) {
        this.filename = filename;
        this.defaultJson = defaultJson;
    }

    dump(js, indent = 4) {
        const data = JSON.stringify(js, null, indent);
        fs.writeFileSync(this.filename, data, 'utf-8');
    }

    load() {
        if (!fs.existsSync(this.filename)) {
            this.dump(this.defaultJson);
            return { ...this.defaultJson };
        }
        const data = fs.readFileSync(this.filename, 'utf-8');
        return JSON.parse(data);
    }
}


const js = new Loader("data.json", {
    "Played": 0,
    "Win": 0,
    "Lose": 0,
    "Nickname": "None",
    "Money": 0
});
const data = js.load();

function math_end(d) {
    console.clear()
    if (d) {
        console.log("Good");
        data["Win"] += 1;
        data["Money"] += 5;
        console.log("Yay! You get 5 coins");
    } else {
        console.log("Bad");
        data["Lose"] += 1;
        console.log("Oh :< You don`t get coins")

    }
    data["Played"] += 1;
    js.dump(data);
}

function math_add(min, max) {
    const a = Math.floor(Math.random() * (max - min)) + min;
    const b = Math.floor(Math.random() * (max - min)) + min;
    const math_answer = a + b;
    console.log(`${a} + ${b}`)
    const answer = parseInt(prompt({ sigint: true })("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_sub(min, max) {
    const b = (Math.random() * (max - min) + min) ^ 0
    const a = (Math.random() * (max - (b + 1)) + (b + 1)) ^ 0
    const math_answer = a - b;
    console.log(`${a} - ${b}`)
    const answer = parseInt(prompt({ sigint: true })("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_multi(min, max) {
    const a = Math.floor(Math.random() * (max - min)) + min;
    const b = Math.floor(Math.random() * (max - min)) + min;
    const math_answer = a * b;
    console.log(`${a} * ${b}`)
    const answer = parseInt(prompt({ sigint: true })("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_div(min, max) {
    const b = (Math.random() * (max - min) + min) ^ 0
    const a = (Math.random() * (max - (b + 1)) + (b + 1)) ^ 0
    const math_answer = a / b;
    console.log(`${a} / ${b}`)
    const answer = parseInt(prompt({ sigint: true })("Write the correct answer: "))
    math_end(answer===math_answer)
}


function math(min, max, operation) {
    switch (operation) {
        case '+':
            math_add(min, max);
            break;
        case '-':
            math_sub(min, max);
            break;
        case '*':
            math_multi(min, max);
            break;
        case '/':
            math_div(min, max);
            break;
        default:
            console.log("Invalid function or operation!");
    }
}

while (true) {
    const select = prompt({ sigint: true })("Choice: ").toLowerCase();
    if (select === "g") {
        console.clear();
        console.log("Levels: Easy(1-10), Medium(10-20), Hard(20-50), Insane(50-100)");
        console.log("Operation: Add(+), Sub(-), Multi(*), Div(/)");

        const question = prompt({ sigint: true })("Choose Level: ").toLowerCase();
        const question_operation = prompt({ sigint: true })("Choose Operation: ");

        check_lvl(question, question_operation);

        function check_lvl(question, operation) {
            switch (question) {
                case "easy":
                    math(1, 10, operation);
                    break;
                case "medium":
                    math(10, 20, operation);
                    break;
                case "hard":
                    math(20, 50, operation);
                    break;
                case "insane":
                    math(50, 100, operation);
                    break;
                default:
                    console.log("Invalid operation!");
            }
        }

    } else if (select === "help") {
        const logs = getLogMessages(data);
        console.clear();
        console.log(logs.HELP)

    } else if (select === "p") {
        const logs = getLogMessages(data);
        console.clear();
        console.log(logs.PROFILE)

    } else if (select === "name") {

        console.clear();
        data["Nickname"] = prompt({sigint: true})("Change your nickname: ");
        js.dump(data)

    } else if (select === "r") {

        console.clear();
        if (data["Money"] <= 50) {
            console.log("You don`t have 50 coins for buy it")
        } else {
            console.log(`Right answer: ${math_answer}`);
            data["Money"] -= 50;
        }

    } else if (select === "e") {
        js.dump(data);
        break

    } else {
        if (select === "") {
            console.clear();
        } else {
            console.clear();
            console.log("ERROR")
        }
    }
}