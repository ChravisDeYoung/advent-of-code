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
const stoneArrangement = fs.readFileSync('Day11/input.txt', 'utf-8')
    .split(' ')
    .map(Number);
// Part 1
console.log('Stone Count:', rearrangeStoneArrangment([...stoneArrangement], 25).length);
// Part 2 
let stoneCount = 0;
stoneArrangement.forEach((stone) => {
    const newList = rearrangeStoneArrangment([stone], 25);
    newList.forEach((pebble) => {
        stoneCount += rearrangeStoneArrangment([pebble], 25).length;
    });
});
console.log('Stone Count:', stoneCount);
function rearrangeStoneArrangment(stoneArrangement, blinkCount) {
    for (let i = 0; i < blinkCount; i++) {
        // console.log(stoneArrangement);
        for (let j = 0; j < stoneArrangement.length; j++) {
            if (stoneArrangement[j] === 0) {
                stoneArrangement[j] = 1;
            }
            else if (stoneArrangement[j].toString().length % 2 === 0) {
                const middle = stoneArrangement[j].toString().length / 2;
                const firstHalf = Number(stoneArrangement[j].toString().slice(0, middle));
                const secondHalf = Number(stoneArrangement[j].toString().slice(middle));
                stoneArrangement.splice(j, 1, firstHalf, secondHalf);
                j += 1; // don't want to perform operation on the second half
            }
            else {
                stoneArrangement[j] *= 2024;
            }
        }
    }
    return stoneArrangement;
}
