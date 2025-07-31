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

