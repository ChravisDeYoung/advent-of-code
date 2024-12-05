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
    }
    else if (match === 'don\'t()') {
        enabled = false;
    }
    else if (enabled) {
        const numbers = [...match.matchAll(/\d+/gm)].map(x => Number(x[0]));
        sum += Number(numbers[0]) * Number(numbers[1]);
    }
});
console.log('Part 2 Sum:', sum); // 82733683
