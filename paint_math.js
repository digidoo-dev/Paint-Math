function setCellActive(row, column) {
    cellMatrix[row][column].classList.add("highlited-cell");
}

function setFourCellsActive(row, column) {
    setCellActive(row, column);
    setCellActive(row, column - 1);
    setCellActive(row - 1, column);
    setCellActive(row - 1, column - 1);
}


function getRowFromY(y) {
    return Math.round((6 - y) * 10);
}

function getColumnFromX(x) {
    return Math.round((8 + x) * 10);
}

const buttonReset = document.querySelector("#buttonreset");
const mathCanvas = document.querySelector("#mathcanvas");

const xyInputDiv = document.querySelector(".xyinput");
const linearInput = document.querySelector(".linearinput");
const quadraticInput = document.querySelector(".quadraticinput");
const exponentialInput = document.querySelector(".exponentialinput");
const logarithmicInput = document.querySelector(".logarithmicinput");

const buttonShow = document.querySelector("#showbutton");

var mathType = 0;

const width = 160;
const height = 120;

const cellSizePixels = 3;

const canvasWidthPixels = 480;
const canvasHeightPixels = 360;

const canvasWidthUnits = 16;
const canvasHeightUnits = 12;

var cellMatrix = [];

for (var row = 0; row < height; row++) {
    var tableRow = mathCanvas.insertRow();
    tableRow.setAttribute("id", "row-" + row);
    var rowList = [];
    for (var column = 0; column < width; column++) {
        tableCell = tableRow.insertCell();
        tableCell.setAttribute("id", "cell-" + row + "-" + column);

        rowList.push(tableCell);
    }
    cellMatrix.push(rowList);
}




function setAllInputsInvisible() {

    xyInputDiv.classList.add("invisible");
    linearInput.classList.add("invisible");
    quadraticInput.classList.add("invisible");
    exponentialInput.classList.add("invisible");
    logarithmicInput.classList.add("invisible");
}




$("#mathtypeselector").change(function() {
    mathType = $(this).val();
    if (mathType == 0){
        setAllInputsInvisible();
        xyInputDiv.classList.remove("invisible");
        
    } else if (mathType == 1) {
        setAllInputsInvisible();
        linearInput.classList.remove("invisible");
        
    } else if (mathType == 2) {
        setAllInputsInvisible();
        quadraticInput.classList.remove("invisible");

    } else if (mathType == 3) {
        setAllInputsInvisible();
        exponentialInput.classList.remove("invisible");
    } else if (mathType == 4) {
        setAllInputsInvisible();
        logarithmicInput.classList.remove("invisible");
    }
});

buttonReset.addEventListener("click", function(e) {
    $(".highlited-cell").toggleClass("highlited-cell");
});


buttonShow.addEventListener("click", function(e) {
    if (mathType == 0) {
        
        const x = parseFloat($("#inputX").val());

        const y = parseFloat($("#inputY").val());

        if (x < -7.9 || x > 7.9 || y < -5.9 || y > 5.9) {
            alert("X has to be bigger than -8 but smaller than 8. Y has to be bigger than -6 but smaller than 6. Try again.");
            return;
        }

        row = getRowFromY(y);
        column = getColumnFromX(x);

        
        setFourCellsActive(row, column);

    }else if (mathType == 1) {
        const a = parseFloat($("#linearInputA").val());
        const b = parseFloat($("#linearInputB").val());

        for (var x = -7.9; x < 8; x += 0.1) {
            var y = a * x + b

            row = getRowFromY(y);
            column = getColumnFromX(x);
            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
                
                setFourCellsActive(row, column);   
            }

            
        }
    } else if(mathType == 2) {
        const a = parseFloat($("#quadraticInputA").val());
        const b = parseFloat($("#quadraticInputB").val());
        const c = parseFloat($("#quadraticInputC").val());

        if (a == 0) {
            alert("A cannot be 0. Try again.");
            return;
        }

        for (var x = -7.9; x < 8; x += 0.1){
            var y = (a * x**2) + (b * x) + c;
            
            row = getRowFromY(y);
            column = getColumnFromX(x);
            
            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
                  
                setFourCellsActive(row, column);
            }
        }
    } else if (mathType == 3) {
        const a = parseFloat($("#exponentialInputA").val())

        if (!(a >0)) {
            alert("A has to be bigger than 0. Try again.");
            return;
        }

        for (var x = -7.9; x < 8; x += 0.1){
            var y = a**x;

            row = getRowFromY(y);
            column = getColumnFromX(x);

            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
               
                setFourCellsActive(row, column);
            }
        }
    } else if (mathType==4) {
        const a = parseFloat($("#logarithmicInputA").val())
        
        if (a <= 0 || a == 1) {
            alert("A has to be bigger than 0, and cannot be equal to 1. Try again.");
            return;
        }

        for (var x = -7.9; x < 8; x += 0.1){
            var y = log(a, x);

            row = getRowFromY(y);
            column = getColumnFromX(x);

            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
               
                setFourCellsActive(row, column);
            }
        }
    }
    
    
    function log(base, number) {
        return Math.log(number) / Math.log(base);
    }

});