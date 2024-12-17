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
const input = fs.readFileSync('Day 7/input.txt', 'utf-8');
const problems = input
    .split('\n')
    .map(line => line.split(':'))
    .map(([target, values]) => ({
    target: Number(target),
    values: values.trim().split(' ').map(Number)
}));
// Part 1
const operators = [
    (a, b) => a + b,
    (a, b) => a * b,
];
let total = 0;
problems.forEach(problem => {
    let possibleSolutions = [problem.values[0]];
    problem.values.slice(1).forEach(value => {
        const newSolutions = [];
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
    let possibleSolutions = [problem.values[0]];
    problem.values.slice(1).forEach(value => {
        const newSolutions = [];
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
