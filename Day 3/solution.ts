import * as fs from 'fs';

const input = fs.readFileSync('Day 3/input.txt', 'utf-8');

// Part 1

const part1Regex = /mul\(\d+,\d+\)/gm; // mul({someNumber},{someNumber})
const part1Matches = [...input.matchAll(part1Regex)].map(match => match[0]); 

// console.log('Matches:', part1Matches);

let sum = 0;
part1Matches.forEach(match => {
    const numbers = [...match.matchAll(/\d+/gm)].map(x => Number(x[0]));
    
    sum += Number(numbers[0]) * Number(numbers[1]);
});

console.log('Part 1 Sum:', sum); // 183380722

// Part 2
const part2Regex = /don't\(\)|do\(\)|mul\(\d+,\d+\)/gm; // don't() or do() or mul({someNumber},{someNumber})
const part2Matches = [...input.matchAll(/don't\(\)|do\(\)|mul\(\d+,\d+\)/gm)].map(match => match[0]);

// console.log('Matches:', part2Matches);

let enabled = true;

sum = 0;
part2Matches.forEach(match => {
    if (match === 'do()') {
        enabled = true;
    } else if (match === 'don\'t()') {
        enabled = false;
    } else if (enabled) {
        const numbers = [...match.matchAll(/\d+/gm)].map(x => Number(x[0]));
        sum += Number(numbers[0]) * Number(numbers[1]);
    }
});

console.log('Part 2 Sum:', sum); // 82733683