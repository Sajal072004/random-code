// Calculator functionality
let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;
let operator = null;
let previousInput = null;
let waitingForNewInput = false;

// Initialize display
display.value = currentInput;

// Function to append numbers and operators to display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '0';
        shouldResetDisplay = false;
    }

    if (waitingForNewInput) {
        currentInput = '0';
        waitingForNewInput = false;
    }

    // Handle decimal point
    if (value === '.') {
        if (currentInput.includes('.')) {
            return; // Don't allow multiple decimal points
        }
        if (currentInput === '0') {
            currentInput = '0.';
        } else {
            currentInput += value;
        }
    }
    // Handle operators
    else if (['+', '-', '*', '/'].includes(value)) {
        if (operator !== null && !waitingForNewInput) {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        waitingForNewInput = true;
        return;
    }
    // Handle numbers
    else {
        if (currentInput === '0') {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    display.value = currentInput;
}

// Function to clear display
function clearDisplay() {
    currentInput = '0';
    operator = null;
    previousInput = null;
    waitingForNewInput = false;
    shouldResetDisplay = false;
    display.value = currentInput;
}

// Function to delete last character
function deleteLast() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    display.value = currentInput;
}

// Function to calculate result
function calculate() {
    if (operator === null || previousInput === null || waitingForNewInput) {
        return;
    }

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('Cannot divide by zero!');
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

    // Format result
    if (result % 1 === 0) {
        currentInput = result.toString();
    } else {
        currentInput = result.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
    }

    display.value = currentInput;
    operator = null;
    previousInput = null;
    waitingForNewInput = false;
    shouldResetDisplay = true;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if (/[0-9\.]/.test(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        appendToDisplay(key);
    }
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Escape or 'c' for clear
    else if (key === 'Escape' || key.toLowerCase() === 'c') {
        event.preventDefault();
        clearDisplay();
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Add some visual feedback for button presses
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });
    
    button.addEventListener('mouseup', function() {
        setTimeout(() => {
            this.style.transform = '';
            this.style.boxShadow = '';
        }, 100);
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});
