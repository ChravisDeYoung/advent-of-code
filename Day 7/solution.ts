import * as fs from 'fs';

interface Problem 
{
    target: number;
    values: number[];
}

const input = fs.readFileSync('Day 7/input.txt', 'utf-8');

const problems: Problem[] = input
    .split('\n')
    .map(line => line.split(':'))
    .map(([target, values]) => ({
        target: Number(target),
        values: values.trim().split(' ').map(Number)        
    }));

// Part 1

const operators: ((a: number, b: number) => number)[] = [
    (a, b) => a + b,
    (a, b) => a * b,
]

let total = 0;
problems.forEach(problem => {
    let possibleSolutions: number[] = [problem.values[0]];

    problem.values.slice(1).forEach(value => {
        const newSolutions: number[] = [];

        possibleSolutions.forEach(solution => {
            operators.forEach(operator => {
                newSolutions.push(operator(solution, value));
            });
        });

        possibleSolutions = newSolutions;
    });

    if (possibleSolutions.includes(problem.target)) {
        total += problem.target;
    }
});

console.log('Total:', total); //21572148763543

// Part 2

operators.push((a, b) => Number(a.toString() + b.toString()));

total = 0;
problems.forEach(problem => {
    let possibleSolutions: number[] = [problem.values[0]];

    problem.values.slice(1).forEach(value => {
        const newSolutions: number[] = [];

        possibleSolutions.forEach(solution => {
            operators.forEach(operator => {
                newSolutions.push(operator(solution, value));
            });
        });

        possibleSolutions = newSolutions;
    });

    if (possibleSolutions.includes(problem.target)) {
        total += problem.target;
    }
});

console.log('Total:', total); //581941094529163