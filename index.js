let firstNum = 0;
let secondNum = 0;
let action = '+';
let answer = 0;

let input = document.getElementById('calc-input');
let calculationSpan = document.getElementById('calculation');

let history = [];


function onNumberClick(number) {
    if (input.value === "0" && number === 0) {
        return;
    } else if (input.value === "0" && input.value[input.value.length - 1] === "0") {
        input.value = input.value.slice(0, -1);
    }

    input.value += number.toString();
};

function onDecimalClick() {
    if (input.value.includes(action) && !input.value.slice(input.value.indexOf(action)).includes('.')) {
        input.value += ".";
        return;
    } else if (input.value.includes('.')) {
        return;
    } else {
        input.value += ".";
    }
}

function onBackspaceClick() {
    if (input.value === "") {
        return;
    } else if (input.value.slice(-1) === " ") {
        input.value = input.value.slice(0, -3);
    } else {
        input.value = input.value.slice(0, -1);
    }
}

function onActionClick(clickedAction) {
    if (input.value.includes("+") || input.value.includes("-") || input.value.includes("x") || input.value.includes("/")) {
        return;
    }
    input.value += ' ' + clickedAction + ' ';
    action = clickedAction;
};

function onCountClick() {
    let split = input.value.split(" ");
    firstNum = parseFloat(split[0]);
    action = split[1];
    secondNum = parseFloat(split[2]);

    calculateAnswer(action);
    input.value = answer;

    calculationSpan.innerText = `${firstNum} ${action} ${secondNum}`;

    addToHistory();
};

function calculateAnswer(action) {
    switch (action) {
        case '+': answer = firstNum + secondNum; break;
        case '-': answer = firstNum - secondNum; break;
        case 'x': answer = firstNum * secondNum; break;
        case '/': answer = firstNum / secondNum; break;
    }
};

function onCleanClick() {
    firstNum = 0;
    secondNum = 0;
    action = '+';
    answer = 0;
    input.value = '';
    calculationSpan.innerText = "";
};

function addToHistory() {
    let historyItem = {
        firstNum,
        action,
        secondNum,
        answer
    };
    history.unshift(historyItem);

    if (history.length > 5) {
        history.pop();
    }

    let formatted = history.map(x => `<p>${x.firstNum} ${x.action} ${x.secondNum} = ${x.answer}</p>`);
    let historyBlock = document.querySelector('.calculator .history-items');
    historyBlock.innerHTML = formatted.join("");

}

document.getElementById('show-history').onclick = function () {
    document.querySelector('.calculator .history-items').classList.toggle('visible');
}

document.getElementById('clear-history').addEventListener('click', (e) => {
    history = [];
    document.querySelector('.calculator .history-items').innerHTML = "";
});