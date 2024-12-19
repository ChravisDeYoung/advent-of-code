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
const diskMap = fs.readFileSync('Day9/input.txt', 'utf-8').replace('\r', '').replace('\n', '').split('').map(Number);
// Part 1
const individualBlocks = [];
let id = 0;
diskMap.forEach((value, index) => {
    if (index % 2 === 1) {
        individualBlocks.push(...Array(value).fill('.'));
    }
    else {
        individualBlocks.push(...Array(value).fill(id));
        id++;
    }
});
// console.log('Individual Blocks:', individualBlocks);
let checksum = 0;
let lastNumberIndex = individualBlocks.length - 1;
for (let i = 0; i <= lastNumberIndex; i++) {
    while (individualBlocks[lastNumberIndex] === '.') {
        lastNumberIndex -= 1;
    }
    if (individualBlocks[i] === '.') {
        checksum += Number(individualBlocks[lastNumberIndex]) * i;
        lastNumberIndex -= 1;
    }
    else {
        checksum += Number(individualBlocks[i]) * i;
    }
}
console.log('Checksum:', checksum); // 6398252054886
// Part 2
id = 0;
const part2Blocks = [];
diskMap.forEach((value, index) => {
    if (index % 2 === 1) {
        part2Blocks.push({ value: '.', length: value });
    }
    else {
        part2Blocks.push({ value: id.toString(), length: value });
        id++;
    }
});
for (let i = part2Blocks.length - 1; i >= 0; i--) {
    if (part2Blocks[i].value !== '.') {
        const emptyIndex = part2Blocks.findIndex(block => block.value === '.' && block.length >= part2Blocks[i].length);
        if (emptyIndex !== -1 && emptyIndex < i) {
            part2Blocks[emptyIndex].length -= part2Blocks[i].length;
            const newBlock = { value: part2Blocks[i].value, length: part2Blocks[i].length };
            part2Blocks[i].value = '.';
            const removedBlocks = part2Blocks.splice(emptyIndex);
            part2Blocks.push(newBlock, ...removedBlocks);
        }
    }
}
id = 0;
checksum = 0;
part2Blocks.forEach(block => {
    while (block.length > 0) {
        if (block.value !== '.') {
            checksum += Number(block.value) * id;
        }
        block.length -= 1;
        id += 1;
    }
});
console.log('Checksum:', checksum); // 32962
