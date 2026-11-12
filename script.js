const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '0';
let storedValue = null;
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputNumber(value) {
  if (currentValue === '0' || shouldResetDisplay) {
    currentValue = value;
    shouldResetDisplay = false;
  } else {
    currentValue += value;
  }
  updateDisplay();
}

function inputDecimal() {
  if (shouldResetDisplay) {
    currentValue = '0.';
    shouldResetDisplay = false;
    updateDisplay();
    return;
  }

  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(currentValue);

  if (storedValue === null) {
    storedValue = inputValue;
  } else if (operator) {
    const result = calculate(storedValue, inputValue, operator);
    currentValue = String(result);
    storedValue = result;
  }

  operator = nextOperator;
  shouldResetDisplay = true;
  updateDisplay();
}

function calculate(first, second, operation) {
  switch (operation) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
}

function clearCalculator() {
  currentValue = '0';
  storedValue = null;
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLastDigit() {
  if (shouldResetDisplay) {
    currentValue = '0';
    shouldResetDisplay = false;
  } else if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  updateDisplay();
}

function evaluate() {
  if (storedValue === null || operator === null) {
    return;
  }

  const inputValue = Number(currentValue);
  const result = calculate(storedValue, inputValue, operator);

  currentValue = String(result);
  storedValue = null;
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const { value, action } = button.dataset;

    if (button.classList.contains('number')) {
      inputNumber(value);
      return;
    }

    if (button.classList.contains('operator')) {
      if (value) {
        handleOperator(value);
      }
      if (action === 'delete') {
        deleteLastDigit();
      }
      return;
    }

    if (action === 'clear') {
      clearCalculator();
      return;
    }

    if (action === 'calculate') {
      evaluate();
    }
  });
});

updateDisplay();
