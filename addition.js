// Numbers for svg elements
const scale = 20;
const scale2 = 25;
const smallDisplace = 100;
const bigDisplace = 250;

// Store our vectors
let vector1 = [1, 0];
let vector2 = [0, 1];

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
const line2 = elID("line2");
const line3 = elID("line3");
const line4 = elID("line4");
const line5 = elID("line5");

const ptblue = elID("ptblue");

const v1x = elID("v1x");
const v1y = elID("v1y");
const v2x = elID("v2x");
const v2y = elID("v2y");

const v1Output = elID("v1output");
const v2Output = elID("v2output");
const v3Output = elID("v3output");

// Useful conversion functions
function convertToSVGSmall(vector) {
    let svgVector = [];

    svgVector.push(vector[0] * scale + smallDisplace);
    svgVector.push(smallDisplace - vector[1] * scale);

    return svgVector;
}

function convertToSVGBig(vector) {
    let svgVector = [];

    svgVector.push(vector[0] * scale2 + bigDisplace);
    svgVector.push(bigDisplace - vector[1] * scale2);

    return svgVector;
}

function convertToVectorSmall(vector) {
    let realVector = [];

    realVector.push((vector[0] - smallDisplace) / scale);
    realVector.push((smallDisplace - vector[1]) / scale);

    return realVector;
}

function convertToVectorBig(vector) {
    let realVector = [];

    realVector.push((vector[0] - bigDisplace) / scale2);
    realVector.push((bigDisplace - vector[1]) / scale2);

    return vector;
}

// Updates all drawings of vectors
function updateVectorSvg() {

    // draw vector 1
    const smallVector1 = convertToSVGSmall(vector1);

    line1.setAttribute("x1", smallDisplace.toString());
    line1.setAttribute("y1", smallDisplace.toString());
    line1.setAttribute("x2", smallVector1[0].toString());
    line1.setAttribute("y2", smallVector1[1].toString());

    const bigVector1 = convertToSVGBig(vector1);

    ptblue.setAttribute("cx", bigVector1[0].toString());
    ptblue.setAttribute("cy", bigVector1[1].toString());

    line3.setAttribute("x1", bigDisplace.toString());
    line3.setAttribute("y1", bigDisplace.toString());
    line3.setAttribute("x2", bigVector1[0].toString());
    line3.setAttribute("y2", bigVector1[1].toString());

    // draw vector 2
    const smallVector2 = convertToSVGSmall(vector2);

    line2.setAttribute("x1", smallDisplace.toString());
    line2.setAttribute("y1", smallDisplace.toString());
    line2.setAttribute("x2", smallVector2[0].toString());
    line2.setAttribute("y2", smallVector2[1].toString());

    const bigVector2 = convertToSVGBig(vector2);

    line4.setAttribute("x1", bigVector1[0].toString());
    line4.setAttribute("y1", bigVector1[1].toString());
    line4.setAttribute("x2", (bigVector1[0] + bigVector2[0] - bigDisplace).toString());
    line4.setAttribute("y2", (bigVector1[1] + bigVector2[1] - bigDisplace).toString());

    // draw vector 3
    line5.setAttribute("x1", bigDisplace.toString());
    line5.setAttribute("y1", bigDisplace.toString());
    line5.setAttribute("x2", (bigVector1[0] + bigVector2[0] - bigDisplace).toString());
    line5.setAttribute("y2", (bigVector1[1] + bigVector2[1] - bigDisplace).toString());

}

// Updates the numerical representations of the vectors
function updateVectorInput() {

    // update vector 1 input
    v1x.value = vector1[0].toString();
    v1y.value = vector1[1].toString();

    // update vector 2 input
    v2x.value = vector2[0].toString();
    v2y.value = vector2[1].toString();

    //Updates Equation    
    v1Output.innerHTML = vector1[0].toString() + "<br>" + vector1[1].toString();
    v2Output.innerHTML = vector2[0].toString() + "<br>" + vector2[1].toString();
    v3Output.innerHTML = (Math.round((vector2[0]+vector1[0])*100) / 100).toString() + "<br>" + (Math.round((vector2[1]+vector1[1])*100000) / 100000).toString();
}

// Run the update functions when the page loads
updateVectorSvg();
updateVectorInput();

// Handle inputs
v1x.oninput = function() {

    if(!isNaN(v1x.valueAsNumber)) {
        vector1[0] = v1x.valueAsNumber;
        updateVectorSvg();
        updateVectorInput();
    }

}

v1y.oninput = function() {

    if(!isNaN(v1y.valueAsNumber)) {
        vector1[1] = v1y.valueAsNumber;
        updateVectorSvg();
        updateVectorInput();
    }
}

v2x.oninput = function() {

    if(!isNaN(v2x.valueAsNumber)) {
        vector2[0] = v2x.valueAsNumber;
        updateVectorSvg();
        updateVectorInput();
    }
}

v2y.oninput = function() {

    if(!isNaN(v2y.valueAsNumber)) {
        vector2[1] = v2y.valueAsNumber;
        updateVectorSvg();
        updateVectorInput();
    }
}

// Use the mouse to manipulate vectors
let mousePressed = false;

canvas1.onmousemove = function(event) {

    if(mousePressed) {

        let canvas1X = canvas1.getBoundingClientRect().x;
        let canvas1Y = canvas1.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        vector1 = convertToVectorSmall([mouseX - canvas1X, mouseY - canvas1Y]);

        updateVectorSvg();
        updateVectorInput();
    }
}

canvas1.onmousedown = function (event) {
    canvas1.style.cursor = "grabbing";
    mousePressed = true;
    canvas1.onmousemove(event);
};

canvas2.onmousemove = function (event) {

    if(mousePressed) {
        
        let canvas2X = canvas2.getBoundingClientRect().x;
        let canvas2Y = canvas2.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        vector2 = convertToVectorSmall([mouseX - canvas2X, mouseY - canvas2Y]);

        updateVectorSvg();
        updateVectorInput();
    }
}

canvas2.onmousedown = function (event) {
    canvas2.style.cursor = "grabbing";
    mousePressed = true;
    canvas2.onmousemove(event);
};

window.onmouseup = function () {
    canvas1.style.cursor = "pointer";
    canvas2.style.cursor = "pointer";
    mousePressed = false;
};
