import * as fs from 'fs';

const diskMap = fs.readFileSync('Day9/input.txt', 'utf-8').replace('\r', '').replace('\n', '').split('').map(Number);

// Part 1

const individualBlocks: string[] = [];
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
for (let i = 0; i <= lastNumberIndex; i++) 
{
    while (individualBlocks[lastNumberIndex] === '.')
    {
        lastNumberIndex -= 1;
    }

    if (individualBlocks[i] === '.') 
    {
        checksum += Number(individualBlocks[lastNumberIndex]) * i;
        lastNumberIndex -= 1;
    }
    else 
    {
        checksum += Number(individualBlocks[i]) * i;
    }
}

console.log('Checksum:', checksum); // 6398252054886

// Part 2

id = 0;
const part2Blocks: { value: string, length: number }[] = [];
diskMap.forEach((value, index) => {
    if (index % 2 === 1) {
        part2Blocks.push({ value: '.', length: value });
    }
    else {
        part2Blocks.push({ value: id.toString(), length: value });
        id++;
    }
});

for (let i = part2Blocks.length - 1; i >= 0; i--)
{
    if (part2Blocks[i].value !== '.')
    {
        const emptyIndex = part2Blocks.findIndex(block => block.value === '.' && block.length >= part2Blocks[i].length);
        if (emptyIndex !== -1 && emptyIndex < i)
        {
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
    while (block.length > 0) 
    {
        if (block.value !== '.')
        {
            checksum += Number(block.value) * id;
        }
        block.length -= 1;
        id += 1;
    }
});

console.log('Checksum:', checksum); // 32962