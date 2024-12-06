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
const input = fs.readFileSync('Day 5/input.txt', 'utf-8');
// key must appear before all values in the array
let pageOrderingRules = {};
let updates = [];
const lines = input.split('\n');
lines.forEach((line) => {
    // page ordering rules 
    if (line.includes('|')) {
        const [pageBefore, pageAfter] = line.split('|').map(Number);
        if (pageOrderingRules.hasOwnProperty(pageBefore)) {
            pageOrderingRules[pageBefore].push(pageAfter);
        }
        else {
            pageOrderingRules[pageBefore] = [pageAfter];
        }
    }
    // page updates
    else if (line.includes(',')) {
        updates.push([...line.split(',').map(Number)]);
    }
});
// Part 1
let sum = 0;
updates.forEach(updatePages => {
    let isCorrect = false;
    for (let i = 0; i < updatePages.length; i++) {
        const updatePage = updatePages[i];
        const previousUpdatePages = updatePages.filter((_, index) => index < i);
        if (pageOrderingRules[updatePage].some(notAllowedPage => previousUpdatePages.includes(notAllowedPage))) {
            break;
        }
        if (i === updatePages.length - 1) {
            isCorrect = true;
        }
    }
    if (isCorrect) {
        const middleIndex = Math.floor(updatePages.length / 2);
        sum += updatePages[middleIndex];
    }
});
console.log('Correct Sum:', sum); // 6384
// Part 2 - sorry this is so ugly
sum = 0;
updates.forEach(updatePages => {
    let isCorrect = false;
    for (let i = 0; i < updatePages.length; i++) {
        const updatePage = updatePages[i];
        const previousUpdatePages = updatePages.filter((_, index) => index < i);
        if (pageOrderingRules[updatePage].some(notAllowedPage => previousUpdatePages.includes(notAllowedPage))) {
            break;
        }
        if (i === updatePages.length - 1) {
            isCorrect = true;
        }
    }
    if (!isCorrect) {
        for (let i = 0; i < updatePages.length; i++) {
            const updatePage = updatePages[i];
            let swapIndex = i;
            // work our way backwards 
            for (let j = i - 1; j >= 0; j--) {
                const previousUpdatePage = updatePages[j];
                if (pageOrderingRules[updatePage].includes(previousUpdatePage)) {
                    swapIndex = j;
                }
            }
            if (swapIndex !== i) {
                const temp = updatePages[swapIndex];
                updatePages[swapIndex] = updatePage;
                updatePages[i] = temp;
                i = swapIndex;
            }
        }
        const middleIndex = Math.floor(updatePages.length / 2);
        sum += updatePages[middleIndex];
    }
});
console.log('Fixed Sum:', sum); // 5353
