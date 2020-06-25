document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;
    let nextRandom = 0;
    const ScoreDisplay = document.querySelectorAll('#score');
    const StartButton = document.querySelectorAll('#start-pause-button');
    let timerId;


    //set tetrimenos 
    const lTetrimino = [
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2],
        [1, width + 1, width * 2 + 1, width * 2],
        [width, width * 2, width * 2 + 1, width * 2 + 2],
    ];

    const zTetromino = [
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [0, width, width + 1, width * 2 + 1],
        [width + 1, width + 2, width * 2, width * 2 + 1]
    ];

    const tTetromino = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ];

    const oTetromino = [
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1],
        [0, 1, width, width + 1]
    ];

    const iTetromino = [
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1],
        [width, width + 1, width + 2, width + 3]
    ];

    const tetrimenosArray = [lTetrimino, zTetromino, oTetromino, iTetromino];

    let currentPosition = 4;
    let currentRotation = 0;
    let selectRandomTetrimino = Math.floor(Math.random() * tetrimenosArray.length);

    let current = tetrimenosArray[selectRandomTetrimino][currentRotation];

    // draw tetrimeno on graph 
    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetrimino');
        });
    };

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetrimino');
        })
    };

    //timerId = setInterval(moveDown, 1000);

    function control(e) {
        if (e.keyCode === 37) {
            moveLeft();
        } else if (e.keyCode === 39) {
            moveRight();
        } else if (e.keyCode === 38) {
            rotate();
        } else if (e.keyCode === 40) {
            moveDown();
        }
    }
    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freezeBottom();
    }

    function freezeBottom() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            //make new tetrimino FALL
            selectRandomTetrimino = nextRandom;
            nextRandom = Math.floor(Math.random() * tetrimenosArray.length);
            current = tetrimenosArray[selectRandomTetrimino][currentRotation];
            currentPosition = 4;
            draw();
            displayShape();
        };
    }

    //rules for edges
    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

        if (!isAtLeftEdge) currentPosition -= 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition += 1;
        }
        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1);

        if (!isAtRightEdge) currentPosition += 1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -= 1;
        }
        draw();
    }

    function rotate() {
        undraw();
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }
        current = tetrimenosArray[selectRandomTetrimino][currentRotation];
        draw();
    }
    // show next tetrimino
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    let displayIndex = 4;

    //show tetrimino w/o rotation
    const upNextTetrimino = [
        [1, displayWidth + 1, displayWidth * 2 + 1, 2], // ltetrimino
        [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], //ztetrimino
        [1, displayWidth, displayWidth + 1, displayWidth + 2], //ttetrimino
        [0, 1, displayWidth, displayWidth + 1], //otetrimino
        [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], //itetrimino
    ];

    function displayShape() {
        displaySquares.forEach(squares => {
            squares.classList.remove('tetrimino');
        });
        upNextTetrimino[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetrimino');
        });
    };



});