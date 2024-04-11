const calculator = document.createElement('div');
calculator.classList.add('calculator');
document.body.appendChild(calculator);

const display = document.createElement('input');
display.setAttribute('type', 'text');
display.setAttribute('id', 'display');
display.setAttribute('disabled', true);
calculator.appendChild(display);

const buttons = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '*'],
    ['0', '=', 'C', '/']
];

buttons.forEach(row => {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    calculator.appendChild(rowElement);

    row.forEach(label => {
        const button = document.createElement('button');
        button.textContent = label;
        button.addEventListener('click', () => {
            if (label === '=') {
                calculate();
            } else if (label === 'C') {
                clearDisplay();
            } else {
                appendValue(label);
            }
        });
        rowElement.appendChild(button);
    });
});

function appendValue(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    let result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}