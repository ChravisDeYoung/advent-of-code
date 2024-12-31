import * as fs from 'fs';

const stoneArrangement = fs.readFileSync('Day11/input.txt', 'utf-8')
    .split(' ')
    .map(Number);

// Part 1
console.log('Stone Count:', rearrangeStoneArrangment([...stoneArrangement], 25).length);

function rearrangeStoneArrangment(stoneArrangement: number[], blinkCount: number): number[] {
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