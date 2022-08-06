function init() {
    showTurnInformation("Setting Stage")
    initTable()
}

//Set the table configuration.
function initTable() {
    table = document.getElementById("table")
    for (var x=0; x<board.length; x++) {
        var tr = document.createElement("tr")
        table.appendChild(tr)
        for (var y=0; y<board[x].length; y++) {
            var td = document.createElement("td")
            var txt = document.createTextNode(board[x][y])
            td.appendChild(txt)
            td.setAttribute("id", x.toString()+y.toString())
            td.addEventListener("click",setCell.bind(null,x,y),false)
            tr.appendChild(td)
        }
    }
}

//Tranform character to image.
function charToImage(char) {
    switch(char) {
        case "b": 
            return "<img src='image/block.jpg'  alt='block' />"
        case "1": 
            return "<img src='image/red1.jpg'  alt='red1' />"
        case "2": 
            return "<img src='image/red2.jpg'  alt='red2' />"
        case "3":
            return "<img src='image/red3.jpg'  alt='red3' />"
        case "4":
            return "<img src='image/red4.jpg'  alt='red4' />"
        case " ":
            return " "
    }
}

function charToImage2(char) {
    switch(char) {
        case "1": 
            return "<img src='image/black1.jpg'  alt='black1' />"
        case "2": 
            return "<img src='image/black2.jpg'  alt='black2' />"
        case "3":
            return "<img src='image/black3.jpg'  alt='black3' />"
        case "4":
            return "<img src='image/black4.jpg'  alt='black4' />"
        case " ":
            return " "
    }
}

//Set the Cell from user input.
function setCell(x,y,event) {
    if (stage == 1) {
        if (board[x][y] == " ") {
            var input = prompt("Please enter the object in this cell:")
            if (input == "b"){
              num_block++
              board[x][y] = input
              event.target.innerHTML = charToImage(board[x][y])
              block_array.push(new RoboSpaceship(x,y))
            } else if (input != null){
                alert("Invalid object")
            } 
            }else {
            alert("Grid position ["+x+","+y+"] already placed")
        }
    }
    else if (stage == 2) {
        if (board[x][y] == " ") {
            var input = prompt("Please enter the object in this cell:")
            if (input == "1" || input == "2" || input == "3" || input == "4") {

                if (input == "1") {
                    if (num_red1 != 0) {
                        red++
                        num_red1--
                        board[x][y] = input
                        event.target.innerHTML = charToImage(board[x][y])
                        red_array.push(new Red(x,y))
                    } else {
                        alert("You can not add more red1!")
                    }
                } else if (input == "2") {
                    if (num_red2 != 0) {
                        red++
                        num_red2--
                        board[x][y] = input
                        event.target.innerHTML = charToImage(board[x][y])
                        red_array.push(new Red(x,y))
                    } else {
                        alert("You can not add more red2!")
                    }
                } else if (input == "3") {
                    if (num_red3 != 0) {
                        red++
                        num_red3--
                        board[x][y] = input
                        event.target.innerHTML = charToImage(board[x][y])
                        red_array.push(new Red(x,y))
                    } else {
                        alert("You can not add more red3!")
                    }
                }  else if (input == "4"){
                      if (num_red3 != 0) {
                          red++
                          num_red3--
                          board[x][y] = input
                          event.target.innerHTML = charToImage(board[x][y])
                          red_array.push(new Red(x,y))
                      } else {
                        alert("You can not add more red4!")
                    }
                }
            } else if (input != null){
                alert("Invalid object")
            }
        } else {
            alert("Grid position ["+x+","+y+"] already placed")
        }
    }else if (stage == 3) {
        if (board[x][y] == " ") {
            var input = prompt("Please enter the object in this cell:")
            if (input == "1" || input == "2" || input == "3" || input == "4") {

                if (input == "1") {
                    if (num_black1 != 0) {
                        black++
                        num_black1--
                        board[x][y] = input
                        event.target.innerHTML = charToImage2(board[x][y])
                        black_array.push(new Black(x,y))
                    } else {
                        alert("You can not add more black1!")
                    }
                } else if (input == "2") {
                    if (num_black2 != 0) {
                        black++
                        num_black2--
                        board[x][y] = input
                        event.target.innerHTML = charToImage2(board[x][y])
                        black_array.push(new Black(x,y))
                    } else {
                        alert("You can not add more black2!")
                    }
                } else if (input == "3") {
                    if (num_black3 != 0) {
                        black++
                        num_black3--
                        board[x][y] = input
                        event.target.innerHTML = charToImage2(board[x][y])
                        black_array.push(new Black(x,y))
                    } else {
                        alert("You can not add more black3!")
                    }
                }  else if (input == "4"){
                      if (num_black4 != 0) {
                          black++
                          num_black4--
                          board[x][y] = input
                          event.target.innerHTML = charToImage2(board[x][y])
                          black_array.push(new Black(x,y))
                      } else {
                        alert("You can not add more black4!")
                    }
                }
            } else if (input != null){
                alert("Invalid object")
            }
        } else {
            alert("Grid position ["+x+","+y+"] already placed")
        }
    }
}


//Switches between different staes of the set up and game play.
function checkSetting() {
    if (stage == 1) {
        stage = 2
    } else if (stage == 2){
        stage = 3
    } else if (stage == 3){
      
    if (red > 0 && black > 0) {
        stage = 4
        document.getElementById("button_area").innerHTML = "<button type='button' onclick='endPlay()'>Finish Playing<span class='pus'></span></button>"
        showGameInformation()
        play()
      } else {
          alert("The number of user spaceship must be set to 1!")
      }
    }
}


//Enter the play stage.
function play() {
    if (checkGameEnd()) {
        endPlay()
    } else {
        userSetUp()
        showTurnInformation("User Turn")
        buttonSetting()
    }
}

// Trying to set user_row and user_column for user object that has been clicked.
function userSetUp(){
    const tbody = document.querySelector('#table tbody');
    tbody.addEventListener('click', function (e) {
    const cell = e.target.closest('td')
    if (!cell) {return;} // Quit, not clicked on a cell
    const row = cell.parentElement
    user_row = row.rowIndex
    user_column = cell.cellIndex
    alert("Moving object has been selected")
});
}

//Set the button.
function buttonSetting() {
    document.getElementById("user_input").removeAttribute("hidden")
    document.getElementById("computer_button_area").removeAttribute("hidden")
    document.getElementById("computer_turn_button").setAttribute("disabled","disabled")
    document.getElementById("computer_turn_button").setAttribute("class","disabled")
}


//Check if user pieces (red) or computer pieces (black) can move.
function checkMove(x,y,type) {
    for (var i=-1; i<2; i++) {
      for (var j=-1; j<2; j++) {

            if (type == "r") {
                if (!(i == 0 && j== 0) && inBoard(x+i,y+j) && board[x+i][y+j] != "a" && board[x+i][y+j] != "r") {
                    return true
                }
            } else {
                if (!(i == 0 && j== 0) && inBoard(x+i,y+j) && ( (i==-1 && j==0) || (i==0 && j==-1) || (i==0 && j==1) || (i==1 && j==0) ) && board[x+i][y+j] != "a") {
                    return true
                }
            }    
        }
    }
    return false
}

//Check if the given position is in board.
function inBoard(x,y) {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4
}

//User turn operation.
function userTurn() {
        var input 
        input = document.getElementById("textfield").value
        if (input == "w" || input == "a" || input == "s" || input == "d") {
            handleInput(input)
            TurnToComputer()
        } else {
            showInformation("Invalid input, please input again!")
        }

    showGameInformation()
    if (checkGameEnd()) {
        endPlay()
    } else {
        showTurnInformation("Computer Turn")
    }
}
//Trying to handle the user input.
function handleInput(input) {
    if (input == "w") {
        if (user_row == 0) {
            showInformation("Outside the grid, move fails")
        }
        else if (board[user_row-1][user_column] == "a") {
            showInformation("Cell occupied by an asteroid, move fails")
        }
        else {
            checkUserOldPosition()
            updateImage(user_row,user_column)
            user_row--
            checkUserNewPosition()
            updateImage(user_row,user_column)
        }
    }

    if (input == "a") {
        if (user_column == 0) {
            showInformation("Outside the grid, move fails")
        }
        else if (board[user_row][user_column-1] == "a") {
            showInformation("Cell occupied by an asteroid, move fails")
        }
        else {
            checkUserOldPosition()
            updateImage(user_row,user_column)
            user_column--
            checkUserNewPosition()
            updateImage(user_row,user_column)
        }
    }

    if (input == "s") {
        if (user_row == 4) {
            showInformation("Outside the grid, move fails")
        }
        else if (board[user_row+1][user_column] == "a") {
            showInformation("Cell occupied by an asteroid, move fails")
        }
        else {
            checkUserOldPosition()
            updateImage(user_row,user_column)
            user_row++
            checkUserNewPosition()
            updateImage(user_row,user_column)
        }
    }

    if (input == "d") {
        if (user_column == 4) {
            showInformation("Outside the grid, move fails")
        }
        else if (board[user_row][user_column+1] == "a") {
            showInformation("Cell occupied by an asteroid, move fails")
        }
        else {
            checkUserOldPosition()
            updateImage(user_row,user_column)
            user_column++
            checkUserNewPosition()
            updateImage(user_row,user_column)
        }
    }
}


//Set the button before computer turn..
function TurnToComputer() {
    document.getElementById("user_turn_button").setAttribute("disabled","disabled")
    document.getElementById("user_turn_button").setAttribute("class","disabled")
    document.getElementById("computer_turn_button").removeAttribute("disabled")
    document.getElementById("computer_turn_button").removeAttribute("class")
}

//Check the user old position.
function checkUserOldPosition() {
    if (board[user_row][user_column] == "u") {
        board[user_row][user_column] = " "
    } else if (board[user_row][user_column] == "um") {
        board[user_row][user_column] = "am"
    }
}

//Check the user new position.
function checkUserNewPosition() {
    if(board[user_row][user_column] == " ") {
        board[user_row][user_column] = "u"
    } else if (board[user_row][user_column] == "m") {
        num_inactive_mine--
        board[user_row][user_column] = "um"
    } else if (board[user_row][user_column] == "am") {
        board[user_row][user_column] = "um"
    } else if (board[user_row][user_column] == "r") {
        num_user_spaceship--
    }
}

//Computer Turn Operation.
function computerTurn() {
    for (var i=0; i<black_array.length; i++) {
        if (black_array[i] != undefined) {
            roboticRun(i, black_array[i].x, black_array[i].y)
        }
    }

    TurnToUser()
    round++
    showGameInformation()

    if (checkGameEnd()) {
        endPlay()
    } else {
        showTurnInformation("User Turn")
    }
}

//Set the button before turn to user.
function TurnToUser() {
    document.getElementById("computer_turn_button").setAttribute("disabled","disabled")
    document.getElementById("computer_turn_button").setAttribute("class","disabled")
    document.getElementById("user_turn_button").removeAttribute("disabled")
    document.getElementById("user_turn_button").removeAttribute("class")
}

//Robotic spaceship operation.
function roboticRun(i,x,y) {
        if (user_row != undefined && user_column != undefined && Math.abs(user_row - x) <= 1 && Math.abs(user_column-y) <= 1) {
            checkRoboticOldPosition(x,y)
            updateImage(x,y)
            black_array[i].x = user_row
            black_array[i].y = user_column
            updateImage(black_array[i].x, black_array[i].y)
            user_row = undefined
            user_column = undefined
        } else {
            checkRoboticOldPosition(x,y)
            updateImage(x,y)
            var move = determineMove(x,y)
            black_array[i].x = move[0]
            black_array[i].y = move[1]
            console.log("rx = "+move[0]+" ry = "+move[1])
            updateImage(black_array[i].x, black_array[i].y)
        }
}

//Determine how the robotic spaceship move.
function determineMove(x,y) {
    var move = []
    var plan_x
    var plan_y

    if (x < user_row) {
        plan_x = x+1
    } else if (x == user_row) {
        plan_x = x
    } else {
        plan_x = x-1
    }
    
    if (y < user_column) {
        plan_y = y+1
    } else if (y == user_column) {
        plan_y = y
    } else {
        plan_y = y-1
    }

    if (inBoard(plan_x,plan_y) && board[plan_x][plan_y] != "r" && board[plan_x][plan_y] != "a") {
        move[0] = plan_x
        move[1] = plan_y
    } else {
        random_move = randomMove(x,y)
        move[0] = random_move[0]
        move[1] = random_move[1]
        console.log("mx = "+random_move[0]+" my = "+random_move[1])
    }
    return move
}

//If not allowed to move closed to user red piece, random move.
function randomMove(x,y) {
    var isValid = false
    var move = []
    while(!isValid) {
        var x_change = Math.floor(Math.random()*3)-1
        var y_change = Math.floor(Math.random()*3)-1
        if (!(x_change == 0 && y_change== 0) && inBoard(x+x_change,y+y_change) && board[x+x_change][y+y_change] != "a" && board[x+x_change][y+y_change] != "r") {
            isValid = true
        }
    }

    move[0] = x+x_change
    move[1] = y+y_change
    return move
}


//Check black piece old position.
function checkRoboticOldPosition(x,y) {
    if (board[x][y] == "r") {
        board[x][y] = " "
    }
}


//Update the image of the cell.
function updateImage(x,y){
    var id = x.toString() + y.toString()
    document.getElementById(id).innerHTML = charToImage(board[x][y])
}

//Check if there are someone can move.
function checkSomeOneCanMove() {
    for (var i=0; i<black_array.length; i++) {
        if (black_array[i] != undefined/* && checkMove(black_array[i].x, black_array[i].y, "r")*/) {
            return true
        }
    }

    if (red != 0 /*&& checkMove(user_row, user_column, "u")*/) {
        return true
    }

    return false
}

//Check if game will enter the end stage.
function checkGameEnd() {
    return black == 0 || red == 0 || !checkSomeOneCanMove()
}

//End the game.
function endPlay() {
    showResult()
    document.getElementById("user_input").setAttribute("hidden","hidden")
    document.getElementById("computer_button_area").setAttribute("hidden","hidden")
    document.getElementById("button_area").setAttribute("hidden","hidden")
}

//Show the game result.
function showResult() {
    var result = "Game End<br>"
    if (black == 0) {
        result += "User Win !"
    } else if (red == 0) {
        result += "Computer Win !"
    }
    else {
        result += "Draw !"
    }
    showInformation(result)
}

//Red pieces class.
function Red(arg1,arg2) {
    this.x = arg1
    this.y = arg2
}

//Block class.
function Block(arg1,arg2) {
    this.x = arg1
    this.y = arg2
}

//Show game statistic infomration.//
function showGameInformation() {
    var information = ""
    information += "<b>Round: " + round + "</b><br>"
    information += "<b>Red pieces: " + red +"</b><br>"
    information += "<b>Black pieces: " + black + "</b><br>"
    document.getElementById("game_information").innerHTML = information
}

//Show turn information.
function showTurnInformation(message) {
    document.getElementById("turn_information").innerHTML = message
}

//Show notice information.
function showInformation(message) {
    document.getElementById("information").innerHTML = message
}