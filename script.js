let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = false;

let winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
       if (box.innerText === "") {
           if (turnO) {
               box.innerText = "O";
               turnO = false;
           } else {
               box.innerText = "X";
               turnO = true;
           }
           box.disabled = true;

           checkWinner();
       }
    });
});

const disableboxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableboxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showDraw = () => {
    msg.innerText = "The match is a draw!";
    msgContainer.classList.remove("hide");
    disableboxes();
};

const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations, Winner is ${winner} 🎉`;
    msgContainer.classList.remove("hide");
    disableboxes();
};

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return;
            }
        }
    }

    let isDraw = true;
    for (let box of boxes) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        showDraw();
    }
};

const resetGame = () => {
    turnO = false;
    enableboxes();
    msgContainer.classList.add("hide");
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
