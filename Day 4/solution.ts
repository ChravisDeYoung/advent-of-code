import * as fs from 'fs';

const input = fs.readFileSync('Day 4/input.txt', 'utf-8');

const lines = input.split('\n');

const letters = lines.map(line => line.split(''));

// Part 1

let count = 0;
for (let row = 0; row < letters.length; row++) {
    for (let column = 0; column < letters[row].length; column++) {
        const letter = letters[row][column];

        if (letter === 'X')
        {
            // up
            if (row - 3 >= 0 
                && letters[row - 1][column] === 'M'
                && letters[row - 2][column] === 'A'
                && letters[row - 3][column] === 'S') {
                count++;
            }
            // diagonal up right
            if (row - 3 >= 0 
                && column + 3 < letters[row].length
                && letters[row - 1][column + 1] === 'M'
                && letters[row - 2][column + 2] === 'A'
                && letters[row - 3][column + 3] === 'S') {
                count++;
            }
            // right
            if (column + 3 < letters[row].length
                && letters[row][column + 1] === 'M'
                && letters[row][column + 2] === 'A'
                && letters[row][column + 3] === 'S') {
                count++;
            }
            // diagonal down right
            if (row + 3 < letters.length 
                && column + 3 < letters[row].length
                && letters[row + 1][column + 1] === 'M'
                && letters[row + 2][column + 2] === 'A'
                && letters[row + 3][column + 3] === 'S') {
                count++;
            }
            // down
            if (row + 3 < letters.length
                && letters[row + 1][column] === 'M'
                && letters[row + 2][column] === 'A'
                && letters[row + 3][column] === 'S') {
                count++;
            }
            // diagonal down left
            if (row + 3 < letters.length 
                && column - 3 >= 0
                && letters[row + 1][column - 1] === 'M'
                && letters[row + 2][column - 2] === 'A'
                && letters[row + 3][column - 3] === 'S') {
                count++;
            }
            // left
            if (column - 3 >= 0
                && letters[row][column - 1] === 'M'
                && letters[row][column - 2] === 'A'
                && letters[row][column - 3] === 'S') {
                count++;
            }
            // diagonal up left
            if (row - 3 >= 0 
                && column - 3 >= 0
                && letters[row - 1][column - 1] === 'M'
                && letters[row - 2][column - 2] === 'A'
                && letters[row - 3][column - 3] === 'S') {
                count++;
            }
        }
    }
}

console.log('XMAS Count:', count); // 2401

// Part 2 - this one made me giggle

count = 0;
for (let row = 0; row < letters.length; row++) {
    for (let column = 0; column < letters[row].length; column++) {
        const letter = letters[row][column];

        if (letter === 'A'
            && row - 1 >= 0 && row + 1 < letters.length
            && column - 1 >= 0 && column + 1 < letters[row].length
            // diagonal up right and diagonal down left
            && ((letters[row - 1][column + 1] === 'M' && letters[row + 1][column - 1] === 'S')
                || (letters[row - 1][column + 1] === 'S' && letters[row + 1][column - 1] === 'M'))
            // diagonal down right and diagonal up left
            && ((letters[row + 1][column + 1] === 'M' && letters[row - 1][column - 1] === 'S')
                || (letters[row + 1][column + 1] === 'S' && letters[row - 1][column - 1] === 'M')))
        {
            count++;
        }
    }
}

console.log('X-MAS Count:', count); // 1822
