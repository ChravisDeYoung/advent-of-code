import * as fs from 'fs';

const input = fs.readFileSync('Day 2/input.txt', 'utf-8');

const lines = input.trim().split('\n');

const unusualData: number[][] = lines.map(line => line.split(/\s+/).map(Number));

// console.log('Unusual Data:', unusualData);

const isReportSafe = (report: number[]): boolean => {
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
}

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

console.log('Safe Report Count with Problem Dampener:', safeCount); // 604