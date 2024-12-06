import * as fs from 'fs';

const input = fs.readFileSync('Day 1/input.txt', 'utf-8');

const lines = input.split('\n');

const leftList: number[] = [];
const rightList: number[] = [];

lines.forEach(line => {
    const [left, right] = line.trim().split(/\s+/).map(Number);
    if (!isNaN(left) && !isNaN(right)) {
        leftList.push(left);
        rightList.push(right);
    }
});

// console.log('Left List:', leftList);
// console.log('Right List:', rightList);

// Part 1

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let sum = 0;

for (let i = 0; i < leftList.length; i++) {
    const difference = Math.abs(leftList[i] - rightList[i]);
    if (isNaN(difference)) {
        console.log('NaN:', leftList[i], rightList[i]);
    }

    sum += difference;
}

console.log('Sum:', sum); // 2000468

// Part 2

let similarityScore = 0; 
leftList.forEach(leftValue => {
    let quantity = 0;
    
    rightList.forEach(rightValue => {
        if (leftValue === rightValue) {
            quantity++;
        }
    });

    similarityScore += (leftValue * quantity);
});

console.log('Similarity Score:', similarityScore); // 18567089
