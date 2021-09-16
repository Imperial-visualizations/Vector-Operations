//Variables for operations
let operation = "+";
let operationArray = ["−", "+", "×"];
let optionShow = true;

// Numbers for svg elements
const scale = 20;
const scale2 = 25;
const smallDisplace = 100;
const bigDisplace = 250;

// Store our vectors
let vector1 = [3, 0];
let vector2 = [0, 3];
let vector2a = [-0, -3];
let vector3 = [3, 3];
let sf = 2;

// Helper functions for getting elements
function elClass(className) {
    return document.getElementsByClassName(className);
}

function elID(id) {
    return document.getElementById(id);
}

// Store our various element ids
const canvas1 = elID("canvas1");
const canvas2 = elID("canvas2");
const line1 = elID("line1");
const circle1 = elID("circle1");
const arrowHead1 = elID("arrowHead1");
const line2 = elID("line2");
const circle2 = elID("circle2");
const arrowHead2 = elID("arrowHead2");
const line3 = elID("line3");
const arrowHead3 = elID("arrowHead3");
const line4 = elID("line4");
const arrowHead4 = elID("arrowHead4");
const line5 = elID("line5");
const arrowHead5 = elID("arrowHead5");

const ptblue = elID("ptblue");

const v1x = elID("v1x");
const v1y = elID("v1y");
const v2x = elID("v2x");
const v2y = elID("v2y");
const sfE = elID("sf");

const sfDiv = elClass("sfvectOpt")[0];

const v1Output = elID("v1output");
const v2Output = elID("v2output");
const v3Output = elID("v3output");
const sfOutput = elID("sfOutput");
const opsign = elID("opsign");

const displayVector1 = elID("displayVector1");
const displayVector2 = elID("displayVector2");
const displayVector3 = elID("displayVector3");

const btn1 = elID("btn1");
const btn2 = elID("btn2");
const btn3 = elID("btn3");

const btntxt1 = elID("btntxt1");
const btntxt2 = elID("btntxt2");
const btntxt3 = elID("btntxt3");

const optioncanvas = elID("operationOptionSVG");

const viewBtn = elID("viewbtn");

const vect2div = elClass("v2div")[0];

const v2Bracket1 = elClass("v2bracket")[0];
const v2Bracket2 = elClass("v2bracket")[1];

//Sliders
const sliderSVG = elID("slidersvg");
const slider = elID("slide");
const sliderhandle = elID("sliderhandle");

const circlel5 = elID("circlel5");

// Useful conversion functions
function convertSliderBig(width) {
    let nw = sf + 5;
    return ((nw / 10) * 170) + 5;
}

function convertToSVGSmall(vector) {
    const svgVector = [];

    svgVector.push(vector[0] * scale + smallDisplace);
    svgVector.push(smallDisplace - vector[1] * scale);

    return svgVector;
}

function convertToSVGBig(vector) {
    const svgVector = [];

    svgVector.push(vector[0] * scale2 + bigDisplace);
    svgVector.push(bigDisplace - vector[1] * scale2);

    return svgVector;
}

function convertToVectorSmall(vector) {
    const realVector = [];

    realVector.push((vector[0] - smallDisplace) / scale);
    realVector.push((smallDisplace - vector[1]) / scale);

    return realVector;
}

function convertToVectorBig(vector) {
    const realVector = [];

    realVector.push((vector[0] - bigDisplace) / scale2);
    realVector.push((bigDisplace - vector[1]) / scale2);

    return vector;
}

function arrowRefXSmall(vector) {
    return Math.sqrt(vector[0]**2 + vector[1]**2)*scale/8 + 1;
}

function arrowRefXBig(vector) {
    return Math.sqrt(vector[0]**2 + vector[1]**2)*scale2/8 + 1.5;
}

const vectorSum = (vec1, vec2) => vec1.map((element, i) => element + vec2[i]);

//Changes type of operation
function operate() {
    //console.log(operationArray[1]);
    if (operationArray[1] == "+") {
        vector2a[0] = vector2[0];
        vector2a[1] = vector2[1];
        vector3[0] = vector1[0] + vector2[0];
        vector3[1] = vector1[1] + vector2[1];
    } else if (operationArray[1] == "×") {
        vector3[0] = vector1[0] * sf;
        vector3[1] = vector1[1] * sf;

    } else if (operationArray[1] == "−") {
        vector2a[0] = 0 - vector2[0];
        vector2a[1] = 0 - vector2[1];
        vector3[0] = vector1[0] - vector2[0];
        vector3[1] = vector1[1] - vector2[1];
    }
    //console.log(vector2a);
}

// Updates all drawings of vectors
function updateVectorSvg() {

    sliderwidth = convertSliderBig(sf);

    slider.setAttribute("x", (sliderwidth).toString());
    sliderhandle.setAttribute("width", sliderwidth.toString());

    // calculate vector 3
    const bigVector3 = convertToSVGBig(vector3);

    // draw vector 1
    const smallVector1 = convertToSVGSmall(vector1);

    line1.setAttribute("x1", smallDisplace.toString());
    line1.setAttribute("y1", smallDisplace.toString());
    line1.setAttribute("x2", smallVector1[0].toString());
    line1.setAttribute("y2", smallVector1[1].toString());

    circle1.setAttribute("cx", smallVector1[0].toString());
    circle1.setAttribute("cy", smallVector1[1].toString());

    arrowHead1.setAttribute("refX", arrowRefXSmall(vector1).toString());

    const bigVector1 = convertToSVGBig(vector1);

    ptblue.setAttribute("cx", bigVector1[0].toString());
    ptblue.setAttribute("cy", bigVector1[1].toString());

        // draw vector 3
    line5.setAttribute("x1", bigDisplace.toString());
    line5.setAttribute("y1", bigDisplace.toString());
    line5.setAttribute("x2", bigVector3[0].toString());
    line5.setAttribute("y2", bigVector3[1].toString());

    circlel5.setAttribute("cx", bigVector3[0].toString());
    circlel5.setAttribute("cy", bigVector3[1].toString());
    
    arrowHead5.setAttribute("refX", arrowRefXBig(vector3).toString());

    line3.setAttribute("x1", bigDisplace.toString());
    line3.setAttribute("y1", bigDisplace.toString());
    line3.setAttribute("x2", bigVector1[0].toString());
    line3.setAttribute("y2", bigVector1[1].toString());

    arrowHead3.setAttribute("refX", arrowRefXBig(vector1).toString());

    // draw vector 2
    //console.log(vector2a);
    const smallVector2 = convertToSVGSmall(vector2);
    //console.log(smallVector2);

    line2.setAttribute("x1", smallDisplace.toString());
    line2.setAttribute("y1", smallDisplace.toString());
    line2.setAttribute("x2", smallVector2[0].toString());
    line2.setAttribute("y2", smallVector2[1].toString());

    circle2.setAttribute("cx", smallVector2[0].toString());
    circle2.setAttribute("cy", smallVector2[1].toString());

    arrowHead2.setAttribute("refX", arrowRefXSmall(vector2).toString());

    const bigVector2 = convertToSVGBig(vector2a);

    line4.setAttribute("x1", bigVector1[0].toString());
    line4.setAttribute("y1", bigVector1[1].toString());
    line4.setAttribute("x2", bigVector3[0].toString());
    line4.setAttribute("y2", bigVector3[1].toString());
    line4.setAttribute("stroke-width", "4");

    arrowHead4.setAttribute("refX", arrowRefXBig(vector2).toString());



}

// Updates the numerical representations of the vectors
function updateVectorInput() {
    sfE.value = Math.round(sf * 10) / 10;

    // update vector 1 input
    v1x.value = vector1[0].toString();
    v1y.value = vector1[1].toString();

    // update vector 2 input
    v2x.value = vector2[0].toString();
    v2y.value = vector2[1].toString();

    //Updates Equation    
    v1Output.innerHTML = vector1[0].toString() + "<br>" + vector1[1].toString();
    if (operationArray[1] == "×") {
        v2Output.innerHTML = ((Math.round(sf * 10)) / 10).toString();
    }
    else {
        v2Output.innerHTML = vector2[0].toString() + "<br>" + vector2[1].toString();
    }    
    
    v3Output.innerHTML = (Math.round((vector3[0])*100000) / 100000).toString() + "<br>" + (Math.round((vector3[1])*100000) / 100000).toString();
    sfOutput.innerHTML = ((Math.round(sf * 10))/10).toString();
}

// Allow operation selection

operationSelect.forEach(function(operationButton, i) {
    operationButton.onclick = function (event) {

        event.preventDefault;

        operationSelect.forEach((operation, j) => j !== i ? operation.classList.remove("selected") : operation.classList.add("selected"));

        operation = operationArray[i];

        operationDisplay.textContent = operation;

        if (operation === "×") {
            scalarBlock.style.display = "";
            vect2div.style.display = "none";
            line4.style.display = "none";
            v2Bracket1.style.display = "none";
            v2Bracket2.style.display = "none";
            sfDiv.style.display = "inline";
            line3.setAttribute("stroke-width", "4");
            circlel5.setAttribute("r", "5");
        } else {
            scalarBlock.style.display = "none";
            vect2div.style.display = "inline";
            line4.style.display = "inline";
            sfDiv.style.display = "none";
            v2Bracket1.style.display = "table-cell";
            v2Bracket2.style.display = "table-cell";
            line3.setAttribute("stroke-width", "4");
            line5.setAttribute("stroke-width", "4");
            circlel5.setAttribute("r", "3");
        }

        line5.setAttribute("stroke-width", "6");
        

        opsign.textContent = operation;

        operate();
        updateVectorSvg();
        updateVectorInput();

    }
});


// Run the update functions when the page loads
updateVectorSvg();
updateVectorInput();

// Handle inputs
v1x.oninput = function() {

    if(!isNaN(v1x.valueAsNumber)) {
        vector1[0] = v1x.valueAsNumber;
        operate();
        updateVectorSvg();
        updateVectorInput();
    }

}

v1y.oninput = function() {

    if(!isNaN(v1y.valueAsNumber)) {
        vector1[1] = v1y.valueAsNumber;
        operate();
        updateVectorSvg();
        updateVectorInput();
    }
}

v2x.oninput = function() {

    if(!isNaN(v2x.valueAsNumber)) {
        vector2[0] = v2x.valueAsNumber;
        operate();
        updateVectorSvg();
        updateVectorInput();
    }
}

v2y.oninput = function() {

    if(!isNaN(v2y.valueAsNumber)) {
        vector2[1] = v2y.valueAsNumber;
        operate();
        updateVectorSvg();
        updateVectorInput();
    }
}

// Use the mouse to manipulate vectors
let mousePressed = false;

canvas1.onmousemove = function(event) {

    if(mousePressed) {

        canvas1.style.cursor = "grabbing";

        let canvas1X = canvas1.getBoundingClientRect().x;
        let canvas1Y = canvas1.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        vector1 = convertToVectorSmall([mouseX - canvas1X, mouseY - canvas1Y]);

        operate();
        updateVectorSvg();
        updateVectorInput();
    }
}

circle1.onmousedown = function (event) {
    mousePressed = true;
    canvas1.onmousemove(event);
};

circle1.onmouseup = function (event) {
    canvas1.style.cursor = "pointer";
};

circle1.onmouseover = function () {
    // circle1.setAttribute("r", "9");
    circle1.style.cursor = "pointer";
}

circle1.onmouseleave = function () {
    // circle1.setAttribute("r", "6");
    canvas1.style.cursor = "auto";
}

canvas2.onmousemove = function (event) {

    if(mousePressed) {

        canvas2.style.cursor = "grabbing";
        
        let canvas2X = canvas2.getBoundingClientRect().x;
        let canvas2Y = canvas2.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        vector2 = convertToVectorSmall([mouseX - canvas2X, mouseY - canvas2Y]);
        vector3[0] = vector1[0] + vector2[0];
        vector3[1] = vector1[1] + vector2[1];

        operate();
        updateVectorSvg();
        updateVectorInput();
    }
}

circle2.onmousedown = function (event) {
    mousePressed = true;
    canvas2.onmousemove(event);
};

circle1.onmouseup = function (event) {
    canvas2.style.cursor = "pointer";
    mousePressed = false;
};


circle2.onmouseover = function () {
    // circle2.setAttribute("r", "9");
    circle2.style.cursor = "pointer";
}

circle2.onmouseleave = function () {
    // circle2.setAttribute("r", "6");
    canvas2.style.cursor = "auto";
}

window.onmouseup = function () {
    mousePressed = false;
}

displayVector1.checked = true;
displayVector2.checked = true;
displayVector3.checked = true;

displayVector1.oninput = function () {   
    if (displayVector1.checked) {
        line3.style.display = "";
        ptblue.style.display = "";
    } else {
        line3.style.display = "none";
        ptblue.style.display = "none";
    }
}

displayVector2.oninput = function () {   
    if (displayVector2.checked) {
        line4.style.display = "";
    } else {
        line4.style.display = "none";
    }
}


displayVector3.oninput = function () {   
    if (displayVector3.checked) {
        line5.style.display = "";
    } else {
        line5.style.display = "none";
    }
}

optioncanvas.onmousedown = function(event) {
    let optioncanvasX = optioncanvas.getBoundingClientRect().x;
    let optioncanvasY = optioncanvas.getBoundingClientRect().y;
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let xCoord = mouseX - optioncanvasX;
    let yCoord = mouseY - optioncanvasY;
    let newvectopparr = ["a", "b", "c"];
    if (yCoord >= 50 && yCoord <= 100) {
        
        newvectopparr[1] = operationArray[0];
        newvectopparr[2] = operationArray[1];
        newvectopparr[0] = operationArray[2];
        //console.log(newvectopparr);

    } else if (yCoord >=170 && yCoord <= 220) {       
        newvectopparr[1] = operationArray[2];
        newvectopparr[0] = operationArray[1];
        newvectopparr[2] = operationArray[0];

    } else {
        newvectopparr[1] = operationArray[1];
        newvectopparr[0] = operationArray[0];
        newvectopparr[2] = operationArray[2];  
    }
    operationArray[0] = newvectopparr[0];
    operationArray[1] = newvectopparr[1];
    operationArray[2] = newvectopparr[2];
    operation = operationArray[1];
    btntxt1.textContent = operationArray[0];
    btntxt2.textContent = operationArray[1];
    btntxt3.textContent = operationArray[2];

    //console.log(operationArray);

    opsign.innerHTML = operationArray[1];

    if (operationArray[1] == "×") {
        vect2div.style.display = "none";
        line4.style.display = "none";
        v2Bracket1.style.display = "none";
        v2Bracket2.style.display = "none";
        displayVector2.display = "none";
        sfDiv.style.display = "inline";
	line3.setAttribute("stroke-width", "2");
    } else {
        vect2div.style.display = "inline";
        line4.style.display = "inline";
        sfDiv.style.display = "none";
        displayVector2.display = "block";
        v2Bracket1.style.display = "table-cell";
        v2Bracket2.style.display = "table-cell";
	line3.setAttribute("stroke-width", "4");
    }

    if (yCoord >= 220 && yCoord <= 270) {
        console.log("Clicked");
        if (optionShow == true) {
            optionShow = false;
            btn1.style.display = "none";
            btn3.style.display = "none";
            btntxt1.style.display = "none";
            
            btntxt3.style.display = "none";
            optionShow = false;

        } else {
            optionShow = false;
            btn1.style.display = "block";
            btn3.style.display = "block";
            btntxt1.style.display = "block";
            
            btntxt3.style.display = "block";
            optionShow = true;

        }
    }

    operate();

    updateVectorSvg();
    updateVectorInput();
}

sliderSVG.onmousemove = function(event) {
    if (mousePressed) {
        let sliderX = sliderSVG.getBoundingClientRect().x;
        let mouseX = event.clientX;
        if (mouseX - sliderX - 5 >= 0 && mouseX - sliderX - 5 <= 170) {
            sf = ((mouseX - sliderX - 5) / 170) * 10;
            sf = Math.round(sf * 10) / 10;
            sf -= 5;

            operate();
            updateVectorSvg();
            updateVectorInput();
        }
    }
   
}

sliderSVG.onmousedown = function(event) {
    mousePressed = true;
    sliderSVG.onmousemove(event);
}

sliderSVG.onmouseup = function() {
    mousePressed= false;
}

viewBtn.onmousedown = function(event) {
    mousePressed = true;
    optioncanvas.style.display = "none";
    optionShow = False;
}

viewBtn.onmousedown = function(event) {
    mousePressed = false;
}