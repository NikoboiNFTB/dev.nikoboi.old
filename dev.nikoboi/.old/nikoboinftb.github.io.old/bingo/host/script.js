const ranges = {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75],
};

const generateBtn = document.getElementById('generateBtn');
const numberDisplay = document.querySelector('.number');
const historyContainer = document.querySelector('.history');
const resetBtn = document.getElementById('resetBtn');

let calledNumbers = [];

function getRandomNumber(range) {
    const [min, max] = range;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateBingoNumber() {
    const totalNumbers = 75;

    if (calledNumbers.length >= totalNumbers) {
        alert('All numbers have been called!');
        return;
    }

    const letters = Object.keys(ranges);
    let letter, num, full;

    do {
        letter = letters[Math.floor(Math.random() * letters.length)];
        num = getRandomNumber(ranges[letter]);
        full = `${letter}${num}`;
    } while (calledNumbers.includes(full));

    calledNumbers.push(full);

    numberDisplay.textContent = full;
    numberDisplay.classList.add('show');

    const span = document.createElement('span');
    span.textContent = full;
    historyContainer.appendChild(span);

    setTimeout(() => {
        numberDisplay.classList.remove('show');
    }, 300);
}

function resetGenerator() {
    calledNumbers = [];
    numberDisplay.textContent = '⬇';
    historyContainer.innerHTML = '';
}

generateBtn.addEventListener('click', generateBingoNumber);
resetBtn.addEventListener('click', resetGenerator);
