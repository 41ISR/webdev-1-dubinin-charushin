// Слушатель события (запускает код после загрузки всего документа)
document.addEventListener('DOMContentLoaded', () => {
    // Определение переменных
    const displayElement = document.querySelector('.display'); 
    const buttons = document.querySelectorAll('.button'); 

    // Переменные для хранения состояния калькулятора
    let currentExpression = ''; 
    let shouldResetDisplay = false; 

    // Функция для обработки выражения перед вычислением
    function evaluateExpression() {
        return currentExpression
            .replaceAll('×', '*') 
            .replaceAll('÷', '/') 
            .replaceAll('−', '-') 
            .replaceAll(',', '.'); 
    }

    // Функция обработки нажатия кнопки
    function handleButtonClick(event) {
        const buttonValue = event.target.textContent;

        // Обработка кнопок
        if (buttonValue === 'AC') {
            clearDisplay(); 
        } else if (buttonValue === '=') {
            calculateResult(); 
        } else if (buttonValue === '+/-') {
            toggleSign(); 
        } else if (buttonValue === '%') {
            calculatePercentage(); 
        } else {
            updateExpression(buttonValue); 
        }
    }

    // Очистка текущего выражения и дисплея
    function clearDisplay() {
        currentExpression = ''; 
        displayElement.textContent = '0'; 
    }

    // Вычисление результата текущего выражения
    function calculateResult() {
        try {
            const result = eval(evaluateExpression()); 
            displayElement.textContent = result; 
            currentExpression = String(result); 
            shouldResetDisplay = true; 
        } catch {
            displayElement.textContent = 'Error'; 
            currentExpression = ''; 
        }
    }

    // Смена знака числа
    function toggleSign() {
        if (currentExpression) { 
            try {
                const result = eval(evaluateExpression()) * -1; 
                displayElement.textContent = result; 
                currentExpression = String(result); 
            } catch {
                displayElement.textContent = 'Error'; 
                currentExpression = ''; 
            }
        }
    }

    // Вычисление процента
    function calculatePercentage() {
        if (currentExpression) { 
            try {
                const result = eval(evaluateExpression()) / 100; 
                displayElement.textContent = result; 
                currentExpression = String(result); 
                shouldResetDisplay = true; 
            } catch {
                displayElement.textContent = 'Error'; 
                currentExpression = ''; 
            }
        }
    }

    // Обновление текущего выражения в зависимости от нажатой кнопки
    function updateExpression(value) {
        if (shouldResetDisplay) { 
            currentExpression = ''; 
            shouldResetDisplay = false; 
        }

        currentExpression = (displayElement.textContent === '0' || displayElement.textContent === 'Error')
            ? value 
            : currentExpression + value; 

        displayElement.textContent = currentExpression; 
    }

    // Добавляем обработчики событий на все кнопки калькулятора
    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
});
