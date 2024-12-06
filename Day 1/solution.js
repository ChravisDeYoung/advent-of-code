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
const input = fs.readFileSync('Day 1/input.txt', 'utf-8');
const lines = input.split('\n');
const leftList = [];
const rightList = [];
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
