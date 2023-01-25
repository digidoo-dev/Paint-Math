const buttonReset = document.querySelector("#buttonreset");

const xyInputDiv = document.querySelector(".xyinput");
const linearInput = document.querySelector(".linearinput");
const quadraticInput = document.querySelector(".quadraticinput");
const exponentialInput = document.querySelector(".exponentialinput");
const logarithmicInput = document.querySelector(".logarithmicinput");

const buttonShow = document.querySelector("#showbutton");

var mathType = 0;



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
    ctx.clearRect(0, 0, width, height);
    drawCoordinateSystem();
});


buttonShow.addEventListener("click", function(e) {
    if (mathType == 0) {
        
        const xCoordinate = parseFloat($("#inputX").val());
        const yCoordinate = parseFloat($("#inputY").val());

        drawPoint(xCoordinate, yCoordinate);

    }else if (mathType == 1) {
        const a = parseFloat($("#linearInputA").val());
        const b = parseFloat($("#linearInputB").val());

        drawLinearFunction(a, b);

    } else if(mathType == 2) {
        const a = parseFloat($("#quadraticInputA").val());
        const b = parseFloat($("#quadraticInputB").val());
        const c = parseFloat($("#quadraticInputC").val());

        if (a == 0) {
            alert("A cannot be 0. Try again.");
            return;
        }

        drawQuadraticFunction(a, b, c);

    } else if (mathType == 3) {
        const a = parseFloat($("#exponentialInputA").val())

        if (!(a >0)) {
            alert("A has to be bigger than 0. Try again.");
            return;
        } else if (a>6) {
            alert("Please use an A of max 6. (That's the most a web browser can handle.)");
            return;
        }

        drawExponentialFunction(a);

    } else if (mathType==4) {
        const a = parseFloat($("#logarithmicInputA").val())
        
        if (a <= 0 || a == 1) {
            alert("A has to be bigger than 0, and cannot be equal to 1. Try again.");
            return;
        }

        drawLogarithmicFunction(a);
    }
});


function drawCoordinateSystem() {
    
    // X axis
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height /2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.stroke();
    // arrow
    ctx.beginPath();
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - 10, (height / 2) + 10);
    ctx.lineTo(width - 10, (height / 2) - 10);
    ctx.fill();

    
    // Y axis
    ctx.beginPath();
    ctx.moveTo(width / 2, height);
    ctx.lineTo(width / 2, 0);
    ctx.stroke();
    // arrow
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 - 10, 10);
    ctx.lineTo(width / 2 + 10, 10);
    ctx.fill();


    // lines and numbers on X axis
    var i = -10;
    for (var x = 0; x <= width; x += width / 20) {
        ctx.beginPath();
        ctx.moveTo(x, height / 2 - 5);
        ctx.lineTo(x, height / 2 + 5);
        ctx.stroke();
        ctx.font = "10px arial";
        if (x != 0 && x != width && i != 0) ctx.fillText(i, x - 4, height / 2 + 15);
        i++;
    }


    // lines and numbers on Y axis
    i = -10;
    for (var y = height; y >= 0; y -= height / 20) {
        ctx.beginPath();
        ctx.moveTo(width / 2 - 5, y);
        ctx.lineTo(width / 2 + 5, y);
        ctx.stroke();
        ctx.font = "10px arial";
        if (y != height && y!= 0 && i != 0) ctx.fillText(i, width / 2 - 15, y + 5);
        i++;
    }


    // Faint lines on whole canvas
    for (var x = 0; x <= width; x += width / 20) {
        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, 0);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();   
    }
    for (var y = height; y >= 0; y -= height / 20 ) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.stroke();
    }


    // 0 in the middle
    ctx.font = "10px arial";
    ctx.fillText(0, width / 2 - 10, height / 2 + 10);
}

function getCanvasPositionX(coordinateX) {
    return (10 + coordinateX) * 25;
}

function getCanvasPositionY(coordinateY) {
    return (10 - coordinateY) * 25;
}

function drawPoint(xCoordinate, yCoordinate) {
    const canvasX = getCanvasPositionX(xCoordinate);
    const canvasY = getCanvasPositionY(yCoordinate);
    ctx.fillRect(canvasX - 2, canvasY -2, 4, 4);
    ctx.fillText("("+xCoordinate+","+yCoordinate+")", canvasX - 10, canvasY + 10);
}

function drawLinearFunction(a, b) {
    ctx.beginPath();
    var x = -10; 
    var y = a * x + b;
    ctx.moveTo(getCanvasPositionX(x), getCanvasPositionY(y));
    x = 10;
    y = a * x + b;
    ctx.lineTo(getCanvasPositionX(x), getCanvasPositionY(y));
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
}

function drawQuadraticFunction(a, b, c) {
    for (var x = -10; x <= 10; x += 0.1 ) {
        var y = (a * (x**2)) + (b * x) + c;
        if (x == -10) ctx.moveTo(getCanvasPositionX(x), getCanvasPositionY(y));
        else ctx.lineTo(getCanvasPositionX(x), getCanvasPositionY(y));
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
}

function drawExponentialFunction(a) {
    for (var x = -10; x <= 10; x += 0.1){
        var y = a**x;
        if (x == -10) ctx.moveTo(getCanvasPositionX(x), getCanvasPositionY(y));
        else ctx.lineTo(getCanvasPositionX(x), getCanvasPositionY(y));
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();
}

function drawLogarithmicFunction(a) {
    for (var x = 0.05; x <= 10; x += 0.05){

        var y = log(a, x);
        if (x == 0.05) ctx.moveTo(getCanvasPositionX(x), getCanvasPositionY(y));
        else ctx.lineTo(getCanvasPositionX(x), getCanvasPositionY(y));
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 1)";
    ctx.stroke();

    function log(base, number) {
        return Math.log(number) / Math.log(base);
    }

}

const mathCanvas = document.querySelector("#mathcanvas");
const ctx = mathCanvas.getContext("2d");

const width = mathCanvas.width;
const height = mathCanvas.height;

drawCoordinateSystem();










