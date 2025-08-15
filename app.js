/**
 * MyCat Game - Main Application
 * 围住神经猫游戏主程序
 * Created by yu on 2015/4/13.
 */

// Game initialization
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick",stage);

// Game container setup
var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);

// Game state variables
var circleArr = [[],[],[],[],[],[],[],[],[]]; // 9x9 grid
var currentCat; // Current cat position

// Movement direction constants
var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_UP_LEFT = 1, MOVE_UP_RIGHT = 2, 
    MOVE_RIGHT = 3, MOVE_DOWN_RIGHT = 4, MOVE_DOWN_LEFT = 5;

/**
 * Calculate the best movement direction for the cat
 * @param {Object} cat - The cat object with current position
 * @returns {number} - Best movement direction constant
 */
function getMoveDir(cat) {
    console.log("Checking move directions for cat at:", cat.indexX, cat.indexY);
    
    // Check if cat can move in each direction
    var possibleMoves = [];
    
    // Check left
    if(cat.indexX > 0 && circleArr[cat.indexX - 1][cat.indexY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_LEFT);
    }
    
    // Check right
    if(cat.indexX < 8 && circleArr[cat.indexX + 1][cat.indexY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_RIGHT);
    }
    
    // Check up-left
    var upLeftX = cat.indexY % 2 == 0 ? cat.indexX - 1 : cat.indexX;
    var upLeftY = cat.indexY - 1;
    if(upLeftY >= 0 && upLeftX >= 0 && upLeftX < 9 && 
       circleArr[upLeftX][upLeftY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_UP_LEFT);
    }
    
    // Check up-right
    var upRightX = cat.indexY % 2 == 1 ? cat.indexX + 1 : cat.indexX;
    var upRightY = cat.indexY - 1;
    if(upRightY >= 0 && upRightX >= 0 && upRightX < 9 && 
       circleArr[upRightX][upRightY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_UP_RIGHT);
    }
    
    // Check down-left
    var downLeftX = cat.indexY % 2 == 0 ? cat.indexX - 1 : cat.indexX;
    var downLeftY = cat.indexY + 1;
    if(downLeftY < 9 && downLeftX >= 0 && downLeftX < 9 && 
       circleArr[downLeftX][downLeftY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_DOWN_LEFT);
    }
    
    // Check down-right
    var downRightX = cat.indexY % 2 == 1 ? cat.indexX + 1 : cat.indexX;
    var downRightY = cat.indexY + 1;
    if(downRightY < 9 && downRightX >= 0 && downRightX < 9 && 
       circleArr[downRightX][downRightY].getCircleType() != Circle.TYPE_SELECTED) {
        possibleMoves.push(MOVE_DOWN_RIGHT);
    }
    
    console.log("Possible moves:", possibleMoves);
    
    // If no moves possible, cat is trapped
    if(possibleMoves.length == 0) {
        console.log("No possible moves - cat is trapped!");
        return MOVE_NONE;
    }
    
    // Return a random possible move (simple AI)
    var chosenMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    console.log("Chosen move:", chosenMove);
    return chosenMove;
}


/**
 * Handle circle click events
 * @param {Object} event - Click event object
 */
function circleClick(event) {
    console.log("Circle clicked!");
    console.log("Circle type:", event.target.getCircleType());
    
    if(event.target.getCircleType() != Circle.TYPE_CAT){
        event.target.setCircleType(Circle.TYPE_SELECTED);
        console.log("Circle set to TYPE_SELECTED");
    }else{
        console.log("Clicked on cat, ignoring");
        return;
    }
    // Check if cat reached the edge (player loses)
    if(currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8){
        alert("游戏结束！神经猫逃跑了！你输了！");
        resetGame();
        return;
    }

    var dir = getMoveDir(currentCat);
    console.log("Cat move direction:", dir);
    
    if(dir != MOVE_NONE){
        console.log("Cat is moving!");
    } else {
        console.log("Cat cannot move (trapped)");
    }
    
    switch (dir){
        case MOVE_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX-1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_UP_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY-1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexX+1][currentCat.indexY];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_DOWN_RIGHT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX+1:currentCat.indexX][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        case MOVE_DOWN_LEFT:
            currentCat.setCircleType(Circle.TYPE_UNSELECTED);
            currentCat=circleArr[currentCat.indexY%2?currentCat.indexX:currentCat.indexX-1][currentCat.indexY+1];
            currentCat.setCircleType(Circle.TYPE_CAT);
            break;
        default :
            // Cat is trapped (player wins)
            alert("恭喜！你成功困住了神经猫！你赢了！");
            resetGame();
    }

    //var leftCircle = circleArr[currentCat.indexX-1][currentCat.indexY];
    //var rightCircle = circleArr[currentCat.indexX+1][currentCat.indexY];
    //var lefttopCircle = circleArr[currentCat.indexX-1][currentCat.indexY-1];
    //var righttopCircle = circleArr[currentCat.indexX][currentCat.indexY-1];
    //var leftbottomCircle = circleArr[currentCat.indexX-1][currentCat.indexY+1];
    //var rightbottomCircle = circleArr[currentCat.indexX][currentCat.indexY+1];
    //
    //if(leftCircle.getCircleType()==1){
    //    leftCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = leftCircle;
    //}else if(rightCircle.getCircleType()==1){
    //    rightCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = rightCircle;
    //}else if(lefttopCircle.getCircleType()==1){
    //    lefttopCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = lefttopCircle;
    //}else if(righttopCircle.getCircleType()==1){
    //    righttopCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = righttopCircle;
    //}else if(leftbottomCircle.getCircleType()==1){
    //    leftbottomCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = leftbottomCircle;
    //}
    //else if(rightbottomCircle.getCircleType()==1){
    //    rightbottomCircle.setCircleType(3);
    //    currentCat.setCircleType(1);
    //    currentCat = rightbottomCircle;
    //}else{
    //    alert("game over");
    //}


}

/**
 * Initialize the game board with circles
 * Creates a 9x9 grid with the cat in the center
 */
function addCircles() {
    for(var indexY=0;indexY<9;indexY++){
        for(var indexX=0;indexX<9;indexX++){
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY%2?indexX*55+25:indexX*55;
            c.y = indexY*55;

            if(indexX==4&&indexY==4){
            c.setCircleType(Circle.TYPE_CAT);
                currentCat = c;
            }else if(Math.random()<0.1){
                c.setCircleType(Circle.TYPE_SELECTED);
            }
            c.addEventListener("click",circleClick)
        }
    }
}

/**
 * Reset the game to initial state
 */
function resetGame() {
    // Clear existing circles
    gameView.removeAllChildren();
    circleArr = [[],[],[],[],[],[],[],[],[]];
    
    // Reinitialize game
    addCircles();
}

addCircles();