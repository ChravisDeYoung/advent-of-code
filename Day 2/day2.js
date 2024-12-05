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
const input = fs.readFileSync('Day 2/input.txt', 'utf-8');
const lines = input.trim().split('\n');
const unusualData = lines.map(line => line.split(/\s+/).map(Number));
// console.log('Unusual Data:', unusualData);
const isReportSafe = (report) => {
    const isIncreasingSafe = report.every((level, index) => {
        if (index === 0) {
            return true;
        }
        const difference = level - report[index - 1];
        if (difference >= 1 && difference <= 3) {
            return true;
        }
        else {
            return false;
        }
    });
    const isDecreasingSafe = report.every((level, index) => {
        if (index === 0) {
            return true;
        }
        const difference = report[index - 1] - level;
        if (difference >= 1 && difference <= 3) {
            return true;
        }
        else {
            return false;
        }
    });
    return isIncreasingSafe || isDecreasingSafe;
};
// Part 1
let safeCount = 0;
unusualData.forEach((report, index) => {
    if (isReportSafe(report)) {
        safeCount++;
    }
});
console.log('Safe Report Count:', safeCount); // 564
// Part 2
safeCount = 0;
unusualData.forEach(report => {
    for (let i = 0; i < report.length; i++) {
        if (isReportSafe(report.filter((_, index) => index !== i))) {
            safeCount++;
            break;
        }
    }
});
console.log('Safe Report Count with Problem Dampener:', safeCount); // 564
