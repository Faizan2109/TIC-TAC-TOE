const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPosition =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//let's create the function to initialize the game

function initGame() {
    currentPlayer ="X";
    gameGrid =["","","","","","","","",""];
    //UI par empty karna
    boxes.forEach((box,index) => {
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, green color ko bhi remove krna he
        box.classList = `box box${index+1}`;
        
    }
    );
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer == "X")
    {
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function  checkGameOver(){
    let answer="";

    winningPosition.forEach((positiion) => {
        //all 3 boxes should be non-empty and exactly same inn value
        if( (gameGrid[positiion[0]] !== "" || gameGrid[positiion[1]] !== "" || gameGrid[positiion[2]] !== "")
            && (gameGrid[positiion[0]] === gameGrid[positiion[1]] && gameGrid[positiion[1]] === gameGrid[positiion[2]] )
        ){

        //check if winner is X
        if(gameGrid[positiion[0]] === "X")
            answer = "X";
        else
            answer = "O";

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            

        //now we know X/O is a winner
        boxes[positiion[0]].classList.add("win");
        boxes[positiion[1]].classList.add("win");
        boxes[positiion[2]].classList.add("win");
}

    });

    //it means we have a winner
    if(answer !=="")
    {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;

    }

    //let's check wheather game is tie
    let fillCount=0;
    gameGrid.forEach((box) =>{
        if(box !== "")
            fillCount++;
    });

    //board is filled , game is tie
    if(fillCount === 9){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }

}

function handleClick(index){
    if(gameGrid[index] === "" ){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        // boxes[index].style.pointerEvents ="none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet to nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () =>
    {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

