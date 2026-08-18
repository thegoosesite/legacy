document.addEventListener('DOMContentLoaded', function(){
    const canvas = document.querySelector(".BBcanvas");
    const ctx = canvas.getContext("2d");
    // DO NOT DECLARE IN CSS OTW YOULL END UP WITH SAAMS FATE
    canvas.width = 480;
    canvas.height = 320;

    // images
    const imageLink = `https://thegoosesite.github.io/legacy/assets/images/BBbackground.png`;
    const background = new Image();
    background.src = imageLink;

    // Ball image setup
    const ballImage = new Image();
    ballImage.src = 'https://thegoosesite.github.io/legacy/assets/images/BBball.png';

    // Getting elements
    const scoreText = document.querySelector(".BBgooscore");
    const livesText = document.querySelector(".BBlives");
    const restartButton = document.querySelector(".BBrestart");
    const statis = document.querySelector(".BBstatus");
    // More stuff...
    // 1. Set the appearance
    ctx.font = "bold 30px Courier New";
    ctx.fillStyle = "white";

    // 2. Calculate the exact center coordinates of the canvas
    const centerX = 142;
    const centerY = 155;

    // 3. Render the text exactly at the calculated center
    ctx.fillText("Press start.", centerX, centerY);
    // Clicks
    restartButton.onclick = initialize

    // Setting up global variables
    let ball = {
        radius: 10,
        x: canvas.width / 2,
        y: canvas.height - 50,
        speed: 5,
        dx: 0, // Start at 0 so it doesn't move immediately
        dy: 0
    };

    let paddle = {
        width: 75,
        height: 10,
        x: 0,
        y: 0
    };

    let bricks = [];
    const rowCount = 3;
    const colCount = 6;
    const offsetTop = 30;
    const offsetLeft = 15;
    let lives;
    let score;
    let numBricks;
    let gameInterval = null; // Variable to hold our loop interval

    // Set up key listeners
    let rightPressed = false;
    let leftPressed = false;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    // Draw background loop cleanly on load without starting game mechanics
    background.onload = function() {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.fillText("Press start.", centerX, centerY);
    };

    // Function to setup starting parameters
    function initialize() {
        // Clear any existing intervals so loops don't stack on restart
        clearInterval(gameInterval);

        /// Clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Reset status text + re
        statis.innerText = "Playing...";
        restartButton.textContent = "Restart";

        // Set up lives and score
        lives = 3;
        livesText.innerHTML = lives;
        score = 0;
        scoreText.innerHTML = score;
        numBricks = 0;

        // Set up ball and paddle positions and speeds
        reset();
        ball.dx = 3;
        ball.dy = -4;

        // Set up bricks
        var colors = ["gainsboro", "orange", "#333"];
        for (var c = 0; c < colCount; c++) {
            bricks[c] = [];
            for (var r = 0; r < rowCount; r++) {
                var brick = {
                    width: 70,
                    height: 20,
                    padding: 5,
                    x: 0,
                    y: 0,
                    color: colors[r],
                    status: 1
                };
                bricks[c][r] = brick;
                numBricks += 1;
            }
        }

        // Start the loop ONLY when initialize (or restart) is explicitly called
        gameInterval = setInterval(updateGame, 30);
    }

    // Draw ball as an image
    function drawBall() {
        // Center the image layout exactly over the ball's X and Y physics point
        const imgX = ball.x - ball.radius;
        const imgY = ball.y - ball.radius;
        const size = ball.radius * 2;

        ctx.drawImage(ballImage, imgX, imgY, size, size);
    }

    // draw paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath(); 
    }

    function theGooseIsAwesome(){
        livesText.innerText = 1000000;
        lives = 1000000;
        alert("Thank you for your generous donation of your rib cage!");
    }

    // draw bricks
    function drawBricks() {
        for (var c = 0; c < colCount; c++) {
            for (var r = 0; r < rowCount; r++) {
                var brick = bricks[c][r];
                if (brick.status == 1) {
                    brick.x = (c * (brick.width + brick.padding)) + offsetLeft;
                    brick.y = (r * (brick.height + brick.padding)) + offsetTop;

                    ctx.beginPath();
                    ctx.rect(brick.x, brick.y, brick.width, brick.height);
                    ctx.fillStyle = brick.color;
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }

    // detect if ball hit brick
    function collision() {
        for (var c = 0; c < colCount; c++) {
            for (var r = 0; r < rowCount; r++) {
                var brick = bricks[c][r];
                if (brick.status == 1) {
                    if (ball.x + ball.radius > brick.x && ball.x - ball.radius < brick.x + brick.width && ball.y + ball.radius > brick.y && ball.y - ball.radius < brick.y + brick.height) {
                        ball.dy *= -1;
                        brick.status = 0;
                        score += 1;
                        scoreText.innerHTML = score;
                        numBricks -= 1;
                        if (numBricks == 0) {
                            statis.innerText = "You won!";
                            restartButton.textContent = "Restart";
                            clearInterval(gameInterval); // Stop game loop completely
                        }
                    }
                }
            }
        }
    }

    // reset ball and paddle position
    function reset() {
        ball.x = canvas.width / 2;
        ball.y = canvas.height - 50;
        ball.dx = 3;
        ball.dy = -4;

        paddle.x = (canvas.width - paddle.width) / 2;
        paddle.y = canvas.height - paddle.height * 2;
    }

    // handle key presses
    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    // handle key releases
    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }

    // update the screen to reflect the state of the game
    function updateGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background if desired, or let CSS handle it
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        drawBricks();
        drawBall();
        drawPaddle();

        // bounce off the edge and paddle
        if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius){
            ball.dx *= -1;
        }
        if (ball.y + ball.dy < ball.radius){
            ball.dy *= -1;
        } else if (ball.y + ball.dy > paddle.y - ball.radius) {
            if (ball.x + ball.radius > paddle.x && ball.x - ball.radius < paddle.x + paddle.width){
                //calculate angle of ball from where it hits the paddle
                var angle = (Math.PI / 2) * (paddle.x + (paddle.width / 2) - ball.x) / (paddle.width / 2);
                ball.dx = -1 * (Math.sin(angle) * ball.speed);
                ball.dy = -1 * (Math.cos(angle) * ball.speed);
            } else {
                lives -= 1;
                livesText.innerHTML = lives;
                if (lives < 1){
                    statis.innerText = "Game Over";
                    restartButton.textContent = "Restart";
                    clearInterval(gameInterval); // Stop game loop completely
                } else {
                    reset();
                }
            }
        }

        // update the paddle
        if( rightPressed && paddle.x < canvas.width - paddle.width){
            paddle.x += 7;
        } else if (leftPressed && paddle.x > 0){
            paddle.x -= 7;
        }

        // update ball position
        ball.x += ball.dx;
        ball.y += ball.dy;

        collision();
    }
});