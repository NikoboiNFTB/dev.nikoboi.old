let gameWon = false;

function getRandomUniqueNumbers(min, max, count) {
    const numbers = new Set();
    while (numbers.size < count) {
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(num);
    }
    return Array.from(numbers);
}

function fillBingoBoard() {
    const ranges = {
        B: [1, 15],
        I: [16, 30],
        N: [31, 45],
        G: [46, 60],
        O: [61, 75],
    };

    for (const [col, [min, max]] of Object.entries(ranges)) {
        const count = col === "N" ? 4 : 5;
        const numbers = getRandomUniqueNumbers(min, max, count);

        let numberIndex = 0;
        for (let row = 1; row <= 5; row++) {
            if (col === "N" && row === 3) continue;

            const cell = document.getElementById(col + row);
            if (cell) {
                cell.textContent = numbers[numberIndex];
                numberIndex++;
            }
        }
    }
}

function addClickListeners() {
    const cells = document.querySelectorAll('.bingo-board div');

    cells.forEach(cell => {
        if ([...cell.classList].some(cls => cls.endsWith('-header'))) return;

        cell.addEventListener('click', () => {
            cell.classList.toggle('marked');
            checkWin();
        });
    });
}

function resetBoard() {
    gameWon = false;

    const markedCells = document.querySelectorAll('.marked');
    markedCells.forEach(cell => cell.classList.remove('marked'));

    const winMessage = document.getElementById('winMessage');
    winMessage.style.display = 'none';

    const freeSpace = document.getElementById('N3');
    if (freeSpace) {
        freeSpace.innerHTML = '<img src="../../assets/fin-square.svg" alt="logo" class="logo-img" />';
        freeSpace.classList.add('marked');
    }

    fillBingoBoard();
}

function showWinMessage() {
    const winMessage = document.getElementById('winMessage');
    winMessage.style.display = 'block';
    gameWon = true;
    confetti({
        particleCount: 256,
        spread: 64,
        origin: { y: 0.4 },
    });
}

function checkWin() {
    if (gameWon) return;

    const isMarked = (id) => {
        const cell = document.getElementById(id);
        return cell && cell.classList.contains('marked');
    };

    const letters = ['B', 'I', 'N', 'G', 'O'];

    for (let row = 1; row <= 5; row++) {
        let rowWin = true;
        for (let col = 0; col < 5; col++) {
            const cellId = letters[col] + row;
            if (cellId === 'N3') continue;
            if (!isMarked(cellId)) {
                rowWin = false;
                break;
            }
        }
        if (rowWin) return showWinMessage();
    }

    for (let col = 0; col < 5; col++) {
        let colWin = true;
        for (let row = 1; row <= 5; row++) {
            const cellId = letters[col] + row;
            if (cellId === 'N3') continue;
            if (!isMarked(cellId)) {
                colWin = false;
                break;
            }
        }
        if (colWin) return showWinMessage();
    }

    let diag1 = true;
    let diag2 = true;
    for (let i = 0; i < 5; i++) {
        const id1 = letters[i] + (i + 1);
        const id2 = letters[4 - i] + (i + 1);

        if (id1 !== 'N3' && !isMarked(id1)) diag1 = false;
        if (id2 !== 'N3' && !isMarked(id2)) diag2 = false;
    }

    if (diag1 || diag2) return showWinMessage();
}

window.onload = () => {
    fillBingoBoard();
    addClickListeners();

    const resetButton = document.getElementById('resetBtn');
    resetButton.textContent = "New Game";

    const winMessage = document.getElementById('winMessage');
    winMessage.textContent = "Bingo!";

    resetButton.addEventListener('click', resetBoard);
};
