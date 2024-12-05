"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const input = fs.readFileSync('Day 4/input.txt', 'utf-8');
const lines = input.split('\n');
const letters = lines.map(line => line.split(''));
// Part 1
let count = 0;
for (let row = 0; row < letters.length; row++) {
    for (let column = 0; column < letters[row].length; column++) {
        const letter = letters[row][column];
        if (letter === 'X') {
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
                || (letters[row + 1][column + 1] === 'S' && letters[row - 1][column - 1] === 'M'))) {
            count++;
        }
    }
}
console.log('X-MAS Count:', count); // 2401
