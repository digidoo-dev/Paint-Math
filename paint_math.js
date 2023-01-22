function setCellActive(row, column) {
    cellMatrix[row][column].classList.add("highlited-cell");
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
const quadraticInput = document.querySelector(".quadraticinput")
const buttonShow = document.querySelector("#showbutton");
const inputX = document.querySelector("#inputX");
const inputY = document.querySelector("#inputY");

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


$("#mathtypeselector").change(function() {
    mathType = $(this).val();
    if (mathType == 0){
        xyInputDiv.classList.remove("invisible");
        linearInput.classList.add("invisible");
        quadraticInput.classList.add("invisible");

    } else if (mathType == 1) {
        linearInput.classList.remove("invisible");
        xyInputDiv.classList.add("invisible");
        quadraticInput.classList.add("invisible");
    } else if (mathType == 2) {
        quadraticInput.classList.remove("invisible");
        linearInput.classList.add("invisible");
        xyInputDiv.classList.add("invisible");

    }
});

buttonReset.addEventListener("click", function(e) {
    $(".highlited-cell").toggleClass("highlited-cell");
});


buttonShow.addEventListener("click", function(e) {
    if (mathType == 0) {
        const x = parseFloat(inputX.value);
        const y = parseFloat(inputY.value);

        row = getRowFromY(y);
        column = getColumnFromX(x);

        setCellActive(row, column);
        setCellActive(row, column - 1);
        setCellActive(row - 1, column);
        setCellActive(row - 1, column - 1);
    }else if (mathType == 1) {
        const a = parseFloat($("#linearInputA").val());
        const b = parseFloat($("#linearInputB").val());

        for (var x = -7.9; x < 8; x += 0.1) {
            var y = a * x + b

            row = getRowFromY(y);
            column = getColumnFromX(x);
            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
                setCellActive(row, column);
                setCellActive(row, column - 1);
                setCellActive(row - 1, column);
                setCellActive(row - 1, column - 1);   
            }

            
        }
    } else if(mathType == 2) {
        const a = parseFloat($("#quadraticInputA").val());
        const b = parseFloat($("#quadraticInputB").val());
        const c = parseFloat($("#quadraticInputC").val());

        for (var x = -7.9; x < 8; x += 0.1){
            var y = (a * x**2) + (b * x) + c;
            
            row = getRowFromY(y);
            column = getColumnFromX(x);
            
            if (row > 0 && row <= 119 && column > 0 && column <= 159) {
                setCellActive(row, column);
                setCellActive(row, column - 1);
                setCellActive(row - 1, column);
                setCellActive(row - 1, column - 1);   
            }
        }

        
    }
    
    


});