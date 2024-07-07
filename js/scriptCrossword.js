const sizeY = 25; // Высота сетки
const sizeX = 26; // Ширина сетки

const grid = new Array(sizeY);
for(let i = 0; i < grid.length; i++){
    grid[i] = new Array(sizeX).fill(null).map(() => ({
        value: "",
        empty: true,
        number: null
    }));
}

const crosswordDiv = document.getElementById('crossword');
crosswordDiv.innerHTML = '';

let words_placed = [];

function placeWord(word, startRow, startCol, direction, question) {
    if (direction === 'horizontal'){
        for(let i = 0; i < word.length; i++){
            grid[startRow][startCol + i].value = word[i];
            grid[startRow][startCol + i].empty = false;
        }
    } 
    else{
        for(let i = 0; i < word.length; i++){
            grid[startRow + i][startCol].value = word[i];
            grid[startRow + i][startCol].empty = false;
        }
    }
    words_placed.push({
        word_str: word,
        row: startRow,
        col: startCol,
        direction: direction,
        question: question
    });
}

function showAnswer(){
    for (let i = 0; i < sizeY; i++) {
        for (let j = 0; j < sizeX; j++) {
            if (!grid[i][j].empty) {
                const input = document.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${j + 1}) input`);
                input.value = grid[i][j].value;
            }
        }
    }
}

function paint(){
    crosswordDiv.innerHTML = '';
    const table = document.createElement('table');
    for (let i = 0; i < sizeY; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < sizeX; j++) {
            const cell = document.createElement('td');
            cell.style.position = 'relative';
            cell.style.padding = '0';


            if(!grid[i][j].empty){
                const input = document.createElement('input');
                input.type = 'text';
                input.maxLength = 1;
                input.style.width = '100%';
                input.style.height = '100%';
                input.style.boxSizing = 'border-box';
                input.style.border = 'none';
                input.style.outline = 'none';
                input.style.textAlign = 'center';

                if (grid[i][j].number !== null) {
                    const label = document.createElement('label');
                    label.className = 'crossword-label';

                    label.innerText = grid[i][j].number;
                    cell.appendChild(label);
                }
                cell.appendChild(input);
            } 
            else {
                cell.style.backgroundColor = 'rgb(245, 245, 245)';
            }
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    crosswordDiv.appendChild(table);
    assignInputEvents();
}

function generateClues(){
    const horizontalClues = document.getElementById('horizontal-clues');
    const verticalClues = document.getElementById('vertical-clues');
    horizontalClues.innerHTML = '';
    verticalClues.innerHTML = '';
    let questionNumber = 1;

    words_placed.forEach(word =>{
        const clueContainer = document.createElement('li');
        clueContainer.className = 'clue-container';
        const clueContainerInner = document.createElement('div');
        const clueNumber = document.createElement('div');
        const clueItem = document.createElement('div');
        clueNumber.className = 'clue-number';
        clueNumber.innerText = `${questionNumber}`;
        clueItem.innerText = `${word.question}`;

        clueContainer.appendChild(clueContainerInner);
        clueContainerInner.appendChild(clueNumber);
        clueContainerInner.appendChild(clueItem);

        if(word.direction === 'horizontal'){
            horizontalClues.appendChild(clueContainer);
        } 
        else{
            verticalClues.appendChild(clueContainer);
        }

        grid[word.row][word.col].number = questionNumber;

        questionNumber++;
    });
}

function checkAnswer(){
    let correctCount = 0;
    let totalCount = 0;

    for (let i = 0; i < sizeY; i++) {
        for (let j = 0; j < sizeX; j++) {
            if(!grid[i][j].empty){
                totalCount++;
                const input = document.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${j + 1}) input`);
                if(input.value.toLowerCase() === grid[i][j].value.toLowerCase()) {
                    correctCount++;
                    input.style.backgroundColor = 'lightgreen'; // Правильный ответ
                }
                else{
                    input.style.backgroundColor = 'lightcoral'; // Неправильный ответ
                }
            }
        }
    }

    const percentage = (correctCount / totalCount) * 100;
    if(percentage > 95){
        alert(`Вы прошли! Правильных ответов: ${correctCount} из ${totalCount} (${percentage.toFixed(2)}%)`);
    } 
    else{
        alert(`Вы не прошли. Правильных ответов: ${correctCount} из ${totalCount} (${percentage.toFixed(2)}%)`);
    }
}


function showCrossword() {
    placeWord("целостность", 2, 6, "vertical", "Отсутствие изменений в передаваемой или хранимой информации по сравнению с ее исходной записью.");
    placeWord("устройство", 9, 2, "horizontal", "Аппаратное средство обработки информации.");
    placeWord("зашифрование", 3, 11, "vertical", "Процесс преобразования открытого сообщения в шифрованное сообщение");
    placeWord("хеш", 5, 9, "horizontal", "Результат преобразования данных в фиксированную строку.");
    placeWord("криптография", 1, 15, "vertical", "Научная область, связанная с разработкой средств защиты информации и анализом их стойкости ко взлому.");
    placeWord("бит", 7, 9, "vertical", "Наименьшая единица цифровой информации.");
    placeWord("сообщение", 14, 3, "horizontal", "Передаваемая информация между отправителем и получателем.");
    placeWord("стойкость", 17, 2, "horizontal", "Устойчивость криптоалгоритма к его криптоанализу.");
    placeWord("блок", 14, 6, "vertical", "Последовательность символов фиксированной длины, используемая для представления данных.");
    placeWord("дешифрование", 19, 1, "horizontal", "Процесс аналитического раскрытия нарушителем сообщения открытого без предварительного полного знания всех элементов криптографической системы.");
    placeWord("функция", 12, 9, "horizontal", "Отношение между элементами, при котором изменение в одном элементе влечёт изменение в другом.");
    placeWord("цифра", 10, 13, "horizontal", "То, из чего состоит числовая система.");
    placeWord("цезарь", 7, 17, "vertical", "Великий полководец, в честь которого назвали один из простейших шифров.");
    placeWord("цикл", 12, 13, "vertical", "Повторяющаяся последовательность операций.");
    placeWord("атбаш", 16, 9, "vertical", "Древний шифр подстановки с обратным алфавитом.");
    placeWord("канал", 14, 13, "horizontal", "Средство передачи информации.");
    placeWord("секретность", 7, 21, "vertical", "Свойство данных быть известными и доступными только тому кругу субъектов, которому для которого они предназначены.");
    placeWord("алгоритм", 14, 16, "vertical", "Последовательность действий для решения задачи.");
    placeWord("ключ", 9, 21, "horizontal", "Изменяемый элемент (параметр), каждому значению которого однозначно соответствует одно из отображений, реализуемых криптосистемой.");
    placeWord("подпись", 17, 15, "horizontal", "Цифровое подтверждение подлинности данных.");
    placeWord("аутентификация", 23, 9, "horizontal", "Установление (то есть проверка и подтверждение) подлинности информации.");
    placeWord("биграмма", 16, 19, "vertical", "Пара последовательных символов в тексте.");
    placeWord("брутфорс", 19, 18, "horizontal", "Метод подбора ключа перебором всех вариантов.");

    generateClues();
    paint();
}

function setFocus(input, row, col) {
    const nextInput = document.querySelector(`tr:nth-child(${row + 1}) td:nth-child(${col + 1}) input`);
    if(nextInput){
        nextInput.focus();
    }
}

function handleArrowKeys(event, row, col) {
    switch(event.key){
        case 'ArrowUp':
            if (row > 0) setFocus(event.target, row - 1, col);
            break;
        case 'ArrowDown':
            if (row < sizeY - 1) setFocus(event.target, row + 1, col);
            break;
        case 'ArrowLeft':
            if (col > 0) setFocus(event.target, row, col - 1);
            break;
        case 'ArrowRight':
            if (col < sizeX - 1) setFocus(event.target, row, col + 1);
            break;
    }
}

function assignInputEvents() {
    for(let i = 0; i < sizeY; i++){
        for(let j = 0; j < sizeX; j++){
            if (!grid[i][j].empty) {
                const input = document.querySelector(`tr:nth-child(${i + 1}) td:nth-child(${j + 1}) input`);
                if (input) {
                    input.addEventListener('keydown', function(event) {
                        handleArrowKeys(event, i, j);
                    });
                }
            }
        }
    }
}

showCrossword();