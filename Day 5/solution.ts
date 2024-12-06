import * as fs from 'fs';

const input = fs.readFileSync('Day 5/input.txt', 'utf-8');

// key must appear before all values in the array
let pageOrderingRules: { [key: number]: number[] } = {};
let updates: number[][] = [];

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
            for (let j = i-1; j >= 0; j--) {
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
