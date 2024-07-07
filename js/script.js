const menu_button = document.getElementById('menu-button');
const menu = document.getElementById('menu');

menu_button.addEventListener('click', function()  {
    if (menu.style.display === 'grid'){
        menu.style.display = 'none';
    }
    else{
        menu.style.display = 'grid';
    }
})

function toggleContent(id) {
    var element = document.getElementById(id);
    if (element.style.display === "none") {
        element.style.display = "block";
    }
    else {
        element.style.display = "none";
    }
}


function doCaesarCipher(textBox){
    let text = document.getElementById(textBox + 'Input').value;
    let key = Number(document.getElementById(textBox + 'Key').value);
    if (key > 33) key = 33;
    else if(key < 0) key = 3;
    let result = '';
    for(let i = 0; i < text.length; i++){
        let charCode = text.charCodeAt(i);
        result += String.fromCharCode(charCode + key);
    }
    document.getElementById(textBox + 'Output').value = result;
}

function undoCaesarCipher(textBox){
    let text = document.getElementById(textBox + 'Output').value;
    let key = Number(document.getElementById(textBox + 'Key').value);
    if (key > 33) key = 33;
    else if(key < 0) key = 3;
    let result = '';
    for(let i = 0; i < text.length; i++){
        let charCode = text.charCodeAt(i);
        result += String.fromCharCode(charCode - key);
    }
    document.getElementById(textBox + 'Input').value = result;
}

function doVigenereCipher(textBox){
    const alphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const alphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    let text = document.getElementById(textBox + 'Input').value;
    let key = document.getElementById(textBox + 'Key').value;
    let result = '';
    let keyIndex = 0;
    for (let i = 0; i < text.length; i++) {
        let textChar = text[i];
        // Поиск индекса символа в алфавите
        let textCharIndex = alphabetUpper.indexOf(textChar);
        let isUpperCase = textCharIndex !== -1;
        if (!isUpperCase) {
            textCharIndex = alphabetLower.indexOf(textChar);
        }
        if (textCharIndex === -1) {
            // Символ не найден в алфавите, добавляем его без изменений
            result += textChar;
            continue;
        }
        // Поиск индекса символа ключа
        let keyCharIndex = alphabetUpper.indexOf(key[keyIndex % key.length]);
        let isKeyUpperCase = keyCharIndex !== -1;
        if (!isKeyUpperCase) {
            keyCharIndex = alphabetLower.indexOf(key[keyIndex % key.length]);
        }
        if (keyCharIndex === -1) {
            // Если символ ключа не найден в алфавите, пропускаем его
            keyIndex++;
            i--;
            continue;
        }
        // Шифрование символа
        let encryptedCharIndex = (textCharIndex + keyCharIndex) % 33 + 1;
        result += isUpperCase ? alphabetUpper[encryptedCharIndex] : alphabetLower[encryptedCharIndex];
        keyIndex++;
    }
    document.getElementById(textBox + 'Output').value = result;
}

function undoVigenereCipher(textBox) {
    let text = document.getElementById(textBox + 'Output').value;
    let key = document.getElementById(textBox + 'Key').value;
    let result = '';
    let keyIndex = 0;
    const alphabetUpper = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const alphabetLower = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    for (let i = 0; i < text.length; i++) {
        let textChar = text[i];
        let textCharIndex = alphabetUpper.indexOf(textChar);
        let isUpperCase = textCharIndex !== -1;
        if (!isUpperCase) {
            textCharIndex = alphabetLower.indexOf(textChar);
        }
        if (textCharIndex === -1) {
            result += textChar;
            continue;
        }
        let keyCharIndex = alphabetUpper.indexOf(key[keyIndex % key.length]);
        let isKeyUpperCase = keyCharIndex !== -1;
        if (!isKeyUpperCase) {
            keyCharIndex = alphabetLower.indexOf(key[keyIndex % key.length]);
        }
        if (keyCharIndex === -1) {
            keyIndex++;
            i--;
            continue;
        }
        let decryptedCharIndex = (textCharIndex - keyCharIndex + 33) % 33 - 1;
        result += isUpperCase ? alphabetUpper[decryptedCharIndex] : alphabetLower[decryptedCharIndex];
        keyIndex++;
    }
    document.getElementById(textBox + 'Input').value = result;
}

function doXorCipher(textBox) {
    let input = document.getElementById(textBox + 'Input').value;
    let key = document.getElementById(textBox + 'Key').value;
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    document.getElementById(textBox + 'Output').value = output;
}
function undoXorCipher(textBox){
    let input = document.getElementById(textBox + 'Output').value;
    let key = document.getElementById(textBox + 'Key').value;
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    document.getElementById(textBox + 'Input').value = output;
}