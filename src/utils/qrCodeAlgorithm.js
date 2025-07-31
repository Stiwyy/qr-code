// Generation for QR-Code Version 3 only for now

const FINDER_PATTERN = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1]
];

const SEPARATOR = new Array(8).fill(0).map(() => new Array(8).fill(0));

const ALIGNMENT_PATTERN = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];

const ALIGNMENT_POSITION = [22];

// Functions to create and add Static patterns
function createTimingPattern(size) {
    const pattern = new Array(size).fill(0);
    for (let i = 0; i < size; i += 2) {
        pattern[i] = 1;
    }
    return pattern;
}

function createEmptyMatrix() {
    return new Array(29).fill().map(() => new Array(29).fill(null));
}

function addFinderPatterns(matrix) {
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
            matrix[y][x] = FINDER_PATTERN[y][x];
            matrix[y][matrix.length - 7 + x] = FINDER_PATTERN[y][x];
            matrix[matrix.length - 7 + y][x] = FINDER_PATTERN[y][x];
        }
    }
    return matrix;
}

function addSeparators(matrix) {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (y === 7 || x === 7) matrix[y][x] = 0;
            if (y === 7 || x === 0) matrix[y][matrix.length - 8 + x] = 0;
            if (y === 0 || x === 7) matrix[matrix.length - 8 + y][x] = 0;
        }
    }
    return matrix;
}

function addTimingPatterns(matrix) {
    const timing = createTimingPattern(matrix.length - 16);
    for (let i = 0; i < timing.length; i++) {
        matrix[6][i + 8] = timing[i];
        matrix[i + 8][6] = timing[i];
    }
    return matrix;
}

function addAlignmentPattern(matrix) {
    const pos = ALIGNMENT_POSITION[0];
    const start = pos - 2;
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            matrix[start + y][start + x] = ALIGNMENT_PATTERN[y][x];
        }
    }
    return matrix;
}

// Mode Indicator for QR-Code
const MODE = {
    NUMERIC: '0001',
    ALPHANUMERIC: '0010',
    BYTE: '0100',
    KANJI: '1000'
};

// For Version 3 medium error correction
const CHARACTER_COUNT_BITS = {
    NUMERIC: 10,
    ALPHANUMERIC: 9,
    BYTE: 8,
    KANJI: 8
};

function isAlphanumeric(text) {
    const alphanumericRegex = /^[0-9A-Z $%*+\-./:]*$/;
    return alphanumericRegex.test(text);
}

function getAlphanumericValue(char) {
    if (char >= '0' && char <= '9') return char.charCodeAt(0) - 48;
    if (char >= 'A' && char <= 'Z') return char.charCodeAt(0) - 55;
    switch (char) {
        case ' ': return 36;
        case '$': return 37;
        case '%': return 38;
        case '*': return 39;
        case '+': return 40;
        case '-': return 41;
        case '.': return 42;
        case '/': return 43;
        case ':': return 44;
        default: return -1;
    }
}

function toBinary(num, length) {
    return num.toString(2).padStart(length, '0');
}

// Encode Text in Alphanumeric mode
function encodeAlphanumeric(text) {
    let binary = '';
    for (let i = 0; i < text.length; i += 2) {
        if (i + 1 < text.length) {
            const val1 = getAlphanumericValue(text[i]);
            const val2 = getAlphanumericValue(text[i + 1]);
            binary += toBinary(val1 * 45 + val2, 11);
        } else {
            const val = getAlphanumericValue(text[i]);
            binary += toBinary(val, 6);
        }
    }
    return binary;
}


// Encode Text in Byte Mode (UTF-8)
function encodeByte(text) {
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        binary += toBinary(text.charCodeAt(i), 8);
    }
    return binary;
}


//Generation of the QR Code
export function generateQRCode(text) {
    let matrix = createEmptyMatrix();
    matrix = addFinderPatterns(matrix);
    matrix = addSeparators(matrix);
    matrix = addTimingPatterns(matrix);
    matrix = addAlignmentPattern(matrix);
    return matrix;
}


export function renderQRCodeToCanvas(matrix, canvasRef, moduleSize = 10) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = matrix.length * moduleSize;
    canvas.width = size;
    canvas.height = size;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix.length; x++) {
            if (matrix[y][x] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
            } else if (matrix[y][x] === 0) {
                ctx.fillStyle = 'white';
                ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
            }
        }
    }
}