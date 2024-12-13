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
const input = fs.readFileSync('Day 6/input.txt', 'utf-8');
const map = input.split('\n');
var Direction;
(function (Direction) {
    Direction["Up"] = "^";
    Direction["Right"] = ">";
    Direction["Down"] = "v";
    Direction["Left"] = "<";
})(Direction || (Direction = {}));
// Part 1
const worker = getWorker(map);
const uniquePositions = [];
let nextPosition = worker.position;
do {
    if (map[nextPosition.row][nextPosition.column] === '#') {
        nextPosition = worker.position;
        worker.direction = getNewDirection(worker.direction);
    }
    else {
        if (uniquePositions.length === 0
            || uniquePositions.find(p => p.column === nextPosition.column && p.row === nextPosition.row) === undefined) {
            uniquePositions.push(Object.assign({}, nextPosition));
        }
        worker.position = nextPosition;
    }
    nextPosition = getNextPosition(worker.direction, worker.position);
} while (nextPosition !== null
    && nextPosition.row < map.length
    && nextPosition.row >= 0
    && nextPosition.column < map[nextPosition.row].length
    && nextPosition.column >= 0);
console.log('Distinct Positions:', uniquePositions.length); // 4656
// Part 2
const moves = [];
moves.push(getWorker(map));
let obstacleCount = 0;
while (moves.at(-1).position.row < map.length
    && moves.at(-1).position.row >= 0
    && moves.at(-1).position.column < map[moves.at(-1).position.row].length
    && moves.at(-1).position.column >= 0) {
    if (map[moves.at(-1).position.row][moves.at(-1).position.column] === '#') {
        moves.pop();
        moves.at(-1).direction = getNewDirection(moves.at(-1).direction);
    }
    else {
        // test obstacle 
        const loopMoves = [];
        loopMoves.push({ position: moves.at(-1).position, direction: getNewDirection(moves.at(-1).direction) });
        while (loopMoves.at(-1).position.row < map.length
            && loopMoves.at(-1).position.row >= 0
            && loopMoves.at(-1).position.column < map[loopMoves.at(-1).position.row].length
            && loopMoves.at(-1).position.column >= 0) {
            if (map[loopMoves.at(-1).position.row][loopMoves.at(-1).position.column] === '#') {
                loopMoves.pop();
                loopMoves.at(-1).direction = getNewDirection(loopMoves.at(-1).direction);
            }
            else {
                const nextMove = { position: getNextPosition(loopMoves.at(-1).direction, loopMoves.at(-1).position), direction: loopMoves.at(-1).direction };
                if (loopMoves.find(m => m.position.column === nextMove.position.column
                    && m.position.row === nextMove.position.row
                    && m.direction === nextMove.direction) === undefined) {
                    loopMoves.push(nextMove);
                }
                else {
                    obstacleCount++;
                    break;
                }
            }
        }
    }
    moves.push({ position: getNextPosition(moves.at(-1).direction, moves.at(-1).position), direction: moves.at(-1).direction });
}
console.log('Obstacle Count:', obstacleCount); // 901
/*
013456789
...#..... 0
...+---+# 1
...|...|. 2
.#.|...|. 3
.+-+-+#|. 4
.|.|.|.|. 5
#+-^-+-+. 6
.....|.#. 7
.....|... 8
.....|... 9

*/
function getWorker(map) {
    for (let row = 0; row < map.length; row++) {
        let workerIndex = map[row].indexOf('^');
        if (workerIndex !== -1) {
            return { position: { row: row, column: workerIndex }, direction: Direction.Up };
        }
        workerIndex = map[row].indexOf('>');
        if (workerIndex !== -1) {
            return { position: { row: row, column: workerIndex }, direction: Direction.Right };
        }
        workerIndex = map[row].indexOf('v');
        if (workerIndex !== -1) {
            return { position: { row: row, column: workerIndex }, direction: Direction.Down };
        }
        workerIndex = map[row].indexOf('<');
        if (workerIndex !== -1) {
            return { position: { row: row, column: workerIndex }, direction: Direction.Left };
        }
    }
    return { position: { row: 0, column: 0 }, direction: Direction.Up }; // pls never
}
function getNextPosition(direction, currentPosition) {
    if (direction === Direction.Up) {
        return { row: currentPosition.row - 1, column: currentPosition.column };
    }
    else if (direction === Direction.Right) {
        return { row: currentPosition.row, column: currentPosition.column + 1 };
    }
    else if (direction === Direction.Down) {
        return { row: currentPosition.row + 1, column: currentPosition.column };
    }
    else if (direction === Direction.Left) {
        return { row: currentPosition.row, column: currentPosition.column - 1 };
    }
    return currentPosition; // pls never
}
function getNewDirection(currentDirection) {
    if (currentDirection === Direction.Up) {
        return Direction.Right;
    }
    else if (currentDirection === Direction.Right) {
        return Direction.Down;
    }
    else if (currentDirection === Direction.Down) {
        return Direction.Left;
    }
    else if (currentDirection === Direction.Left) {
        return Direction.Up;
    }
    return Direction.Up; // pls never
}
