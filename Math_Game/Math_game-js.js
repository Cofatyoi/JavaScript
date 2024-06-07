const fs = require('fs')
const prompt = require('prompt-sync')();

class JS {
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

const js = new JS("settings.json", {
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
}

function math_add(min, max) {
    const a = Math.floor(Math.random() * (max - min)) + min;
    const b = Math.floor(Math.random() * (max - min)) + min;
    const math_answer = a + b;
    console.log(`${a} + ${b}`)
    const answer = parseInt(prompt("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_sub(min, max) {
    while (true) {
        const a = Math.floor(Math.random() * (max - min)) + min;
        const b = Math.floor(Math.random() * (max - min)) + min;
        if (a > b) {
            break
        }
    }
    const math_answer = a - b;
    console.log(`${a} - ${b}`)
    const answer = parseInt(prompt("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_multi(min, max) {
    const a = Math.floor(Math.random() * (max - min)) + min;
    const b = Math.floor(Math.random() * (max - min)) + min;
    const math_answer = a * b;
    console.log(`${a} * ${b}`)
    const answer = parseInt(prompt("Write the correct answer: "))
    math_end(answer===math_answer)
}

function math_div(min, max) {
    while (true) {
        const a = Math.floor(Math.random() * (max - min)) + min;
        const b = Math.floor(Math.random() * (max - min)) + min;
        if (a > b) {
            break
        }
    }
    const math_answer = a / b;
    console.log(`${a} / ${b}`)
    const answer = parseInt(prompt("Write the correct answer: "))
    math_end(answer===math_answer)
}


function math(min, max, question_math) {
    if (question_math === "+") {
        math_add(min, max);
    } else if (question_math === "-") {
        math_sub(min, max);
    } else if (question_math === "*") {
        math_multi(min, max);
    } else if (question_math === "/") {
        math_div(min, max);
    } else {
        console.log("Invalid function or operation!")
    }
}

while (true) {
    if (data["Played"] > 0) {
        percent = Math.round((data["Win"] / data["Played"]) * 100);
    } else {
        percent = 0;
    }
    const select = prompt("Choice: ").toLowerCase();
    if (select === "g") {
        console.clear();
        console.log("Levels: Easy(1-10), Medium(10-20), Hard(20-50), Insane(50-100)");
        console.log("Operation: Add(+), Sub(-), Multi(*), Div(/)");

        const question = prompt("Choose Level: ").toLowerCase();
        const question_math = prompt("Choose Operation: ");

        if (question === "easy") {
            math(1, 10, question_math);
        } else if (question === "medium") {
            math(10, 20, question_math);
        } else if (question === "hard") {
            math(20, 50, question_math);
        } else if (question === "insane") {
            math(50, 100, question_math);
        } else {
            console.log("Wrong!");
        }
    } else if (select === "help") {
        console.clear();
        console.log("Commands: ");
        console.log(" ⁍• G - Start Game ");
        console.log(" ⁍• Help - View this text about commands ");
        console.log(" ⁍• P - Profile ");
        console.log(" ⁍• Name - change nickname ");
        console.log(" ⁍• R - View right answer. Cost: 50 coins ");
        console.log(" ⁍• E - Exit and save all ");
    } else if (select === "p") {
        console.clear();
        console.log("Your Profile");
        console.log(` ⁍• Nickname: ${data['Nickname']}`);
        console.log(` ⁍• Played Games: ${data['Played']}`);
        console.log(` ⁍• Coins: ${data['Money']}`);
        console.log(` ⁍• Wins: ${data['Win']}`);
        console.log(` ⁍• Lose: ${data['Lose']}`);
        console.log(` ⁍• Winning percentage: ${percent}%`);

    } else if (select === "name") {
        console.clear();
        nickname = prompt("Change your nickname: ");
        data["Nickname"] = nickname;
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
        js.dump(data)
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