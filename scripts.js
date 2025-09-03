document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.querySelector('.display');
    const buttons = document.querySelectorAll('.button');
    
    let currentExpression = '';
    let shouldResetDisplay = false;

    function evaluateExpression(expr = currentExpression) {
        return expr
            .replaceAll('×', '*')
            .replaceAll('÷', '/')
            .replaceAll('−', '-')
            .replaceAll(',', '.');
    }

    function handleButtonClick(event) {
        const buttonValue = event.target.textContent;

        if (buttonValue === 'AC') {
            clearDisplay();
        } else if (buttonValue === '=') {
            calculateResult();
        } else if (buttonValue === '+/-') {
            toggleSign();
        } else if (buttonValue === '%') {
            handlePercentage();
        } else {
            updateExpression(buttonValue);
        }
    }

    function clearDisplay() {
        currentExpression = '';
        displayElement.textContent = '0';
    }

    function calculateResult() {
        try {
       
            if (currentExpression.includes('%')) {
                calculatePercentage();
            } else {
                const result = eval(evaluateExpression());
                displayElement.textContent = formatResult(result);
                currentExpression = String(result);
                shouldResetDisplay = true;
            }
        } catch {
            displayElement.textContent = 'Error';
            currentExpression = '';
        }
    }

    function toggleSign() {
        if (currentExpression) {
            try {
                const result = eval(evaluateExpression()) * -1;
                displayElement.textContent = formatResult(result);
                currentExpression = String(result);
            } catch {
                displayElement.textContent = 'Error';
                currentExpression = '';
            }
        }
    }

    function handlePercentage() {
        if (!currentExpression) return;
       
        currentExpression += '%';
        displayElement.textContent = currentExpression;
    }

    function calculatePercentage() {
        try {
            const parts = currentExpression.split('%');
            if (parts.length === 2) {
                const baseValue = eval(evaluateExpression(parts[0]));
                const percentValue = eval(evaluateExpression(parts[1]));
                const result = (baseValue * percentValue) / 100;
                
                displayElement.textContent = formatResult(result);
                currentExpression = String(result);
                shouldResetDisplay = true;
            }
        } catch {
            displayElement.textContent = 'Error';
            currentExpression = '';
        }
    }

    function formatResult(result) {
        const num = Number(result);
        if (Number.isInteger(num)) {
            return num.toString();
        }
        return num.toFixed(8).replace(/\.?0+$/, '');
    }

    function updateExpression(value) {
        if (shouldResetDisplay) {
            currentExpression = '';
            shouldResetDisplay = false;
        }

        if (displayElement.textContent === 'Error' || 
            (displayElement.textContent === '0' && value !== '.')) {
            currentExpression = value;
        } else {
            currentExpression += value;
        }

        displayElement.textContent = currentExpression;
    }

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});