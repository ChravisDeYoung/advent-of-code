import * as fs from 'fs';

const input = fs.readFileSync('Day8/input.txt', 'utf-8').split('\n').map(line => line.replace('\r', ''));

interface Location 
{
    row: number;
    column: number;
}

const locations: Location[] = [];   
const antennas: { [type: string]: Location[] } = {};
for (let outerRow = 0; outerRow < input.length; outerRow++) 
{
    for (let outerCol = 0; outerCol < input[outerRow].length; outerCol++) 
    {
        if (input[outerRow][outerCol] !== '.') 
        {
            if (antennas[input[outerRow][outerCol]]) 
            {
                antennas[input[outerRow][outerCol]].push({ row: outerRow, column: outerCol });
            } 
            else 
            {
                antennas[input[outerRow][outerCol]] = [{ row: outerRow, column: outerCol }];
            }

            locations.push({ row: outerRow, column: outerCol });
        }
    }
}

// Part 1
const antinodes: Location[] = [];
for (const antenna in antennas)
{
    antennas[antenna].forEach((location, index) => {
        for (let i = index + 1; i < antennas[antenna].length; i++)
        {
            const rowDiff = antennas[antenna][i].row - location.row;
            const colDiff = antennas[antenna][i].column - location.column;

            const newLocation1 = { row: antennas[antenna][i].row + rowDiff, column: antennas[antenna][i].column + colDiff };
            if (newLocation1.row >= 0
                && newLocation1.row < input.length
                && newLocation1.column >= 0
                && newLocation1.column < input[newLocation1.row].length
                && antinodes.findIndex(antinode => antinode.row === newLocation1.row && antinode.column === newLocation1.column) === -1)
            {
                antinodes.push(newLocation1);
            }
            
            const newLocation2 = { row: location.row - rowDiff, column: location.column - colDiff };
            if (newLocation2.row >= 0
                && newLocation2.row < input.length
                && newLocation2.column >= 0
                && newLocation2.column < input[newLocation2.row].length
                && antinodes.findIndex(antinode => antinode.row === newLocation2.row && antinode.column === newLocation2.column) === -1)
            {
                antinodes.push(newLocation2);
            }
        }
    });
}

console.log('Antinodes Count:', antinodes.length);

// Part 2

antinodes.length = 0;
for (const antenna in antennas)
{
    antennas[antenna].forEach((location, index) => {
        for (let i = index + 1; i < antennas[antenna].length; i++)
        {
            const rowDiff = antennas[antenna][i].row - location.row;
            const colDiff = antennas[antenna][i].column - location.column;

            let added = false;

            const newLocation1 = { row: antennas[antenna][i].row + rowDiff, column: antennas[antenna][i].column + colDiff };
            while (newLocation1.row >= 0
                && newLocation1.row < input.length
                && newLocation1.column >= 0
                && newLocation1.column < input[newLocation1.row].length)
            {
                if (antinodes.findIndex(antinode => antinode.row === newLocation1.row && antinode.column === newLocation1.column) === -1)
                {
                    added = true;
                    antinodes.push({ row: newLocation1.row, column: newLocation1.column });
                }

                newLocation1.row += rowDiff;
                newLocation1.column += colDiff;
            }
            
            const newLocation2 = { row: location.row - rowDiff, column: location.column - colDiff };
            while (newLocation2.row >= 0
                && newLocation2.row < input.length
                && newLocation2.column >= 0
                && newLocation2.column < input[newLocation2.row].length)
            {                
                if (antinodes.findIndex(antinode => antinode.row === newLocation2.row && antinode.column === newLocation2.column) === -1)
                {
                    added = true;
                    antinodes.push({row: newLocation2.row, column: newLocation2.column});
                }
                
                newLocation2.row -= rowDiff;
                newLocation2.column -= colDiff;
            }

            // if (added)
            // {
                if (antinodes.findIndex(antinode => antinode.row === antennas[antenna][i].row && antinode.column === antennas[antenna][i].column) === -1)
                {
                    antinodes.push({ row: antennas[antenna][i].row, column: antennas[antenna][i].column });
                }

                if (antinodes.findIndex(antinode => antinode.row === location.row && antinode.column === location.column) === -1)
                {
                    antinodes.push({ row: location.row, column: location.column });
                }
            // }
        }
    });
}

console.log('Antinodes Count:', antinodes.length);

let output = "";
input.forEach((row, i) => {
    for (let j = 0; j < row.length; j++) {
        if (locations.findIndex(antenna => antenna.row === i && antenna.column === j) !== -1)
        {
            output += '0';
        }
        else if (antinodes.findIndex(antinode => antinode.row === i && antinode.column === j) !== -1)
        {
            output += '#';
        }
        else 
        {
            output += '.';
        }
    }

    output += '\n';
})

console.log(output);