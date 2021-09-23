// Numbers for svg elements
const scale = 20;
const scale2 = 25;
const smallDisplace = 100;
const bigDisplace = 250;

// Store our vectors
let vector1 = [1, 1];
let vector2 = [2, 2]
let sf = 2;

// Helper functions for getting elements
function elClass(className) {
    return document.getElementsByClassName(className);
}

function elID(id) {
    return document.getElementById(id);
}

// Store our various element ids
//  Stores canvases
const canvas1 = elID("canvas1");
const sliderSVG = elID("slidersvg");
//  Stores lines
const line1 = elID("line1");

const line3 = elID("line3");
const line4 = elID("line4");
const line5 = elID("line5");
//  Stores Input elements
const sfE = elID("sf");
const v1x = elID("v1x");
const v1y = elID("v1y");
//  Stores output elements
const v1Output = elID("v1output");
const v2Output = elID("v2output");
const v3Output = elID("v3output");
//Slidebox 
const slider = elID("slide");
const sliderhandle = elID("sliderhandle");

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
function convertSliderBig(width) {
    let nw = sf + 5;
    return ((nw / 10) * 170) + 5;
}

// Updates all drawings of vectors
function updateVectorSvg() {
    sliderwidth = convertSliderBig(sf);

    slider.setAttribute("x", (sliderwidth).toString());
    sliderhandle.setAttribute("width", sliderwidth.toString());
    // draw vector 1
    const smallVector1 = convertToSVGSmall(vector1);

    line1.setAttribute("x1", smallDisplace.toString());
    line1.setAttribute("y1", smallDisplace.toString());
    line1.setAttribute("x2", smallVector1[0].toString());
    line1.setAttribute("y2", smallVector1[1].toString());

    const bigVector1 = convertToSVGBig(vector1);

    line3.setAttribute("x1", bigDisplace.toString());
    line3.setAttribute("y1", bigDisplace.toString());
    line3.setAttribute("x2", bigVector1[0].toString());
    line3.setAttribute("y2", bigVector1[1].toString());

    let bigVector2 = convertToSVGBig(vector2);

    // draw vector 3
    line5.setAttribute("x1", bigDisplace.toString());
    line5.setAttribute("y1", bigDisplace.toString());
    line5.setAttribute("x2", (bigVector2[0]).toString());
    line5.setAttribute("y2", (bigVector2[1]).toString());

}

// Updates the numerical representations of the vectors
function updateVectorInput() {

    // update vector 1 input
    v1x.value = vector1[0].toString();
    v1y.value = vector1[1].toString();
    sfE.value = Math.round(sf * 10) / 10;

    //Updates Equation    
    v1Output.innerHTML = vector1[0].toString() + "<br>" + vector1[1].toString();
    v2Output.innerHTML = (Math.round(sf * 10) / 10).toString();
    v3Output.innerHTML = (Math.round((sf*vector1[0])*100) / 100).toString() + "<br>" + (Math.round((sf*vector1[1])*100000) / 100000).toString();
}

// Run the update functions when the page loads
updateVectorSvg();
updateVectorInput();

// Handle inputs
v1x.oninput = function() {

    if(!isNaN(v1x.valueAsNumber)) {
        vector1[0] = v1x.valueAsNumber;
        vector2[0] = sf * vector1[0];
        vector2[1] = sf * vector1[1];
        updateVectorSvg();
        updateVectorInput();
    }

}

v1y.oninput = function() {

    if(!isNaN(v1y.valueAsNumber)) {
        vector1[1] = v1y.valueAsNumber;
        vector2[0] = sf * vector1[0];
        vector2[1] = sf * vector1[1];
        updateVectorSvg();
        updateVectorInput();
    }
}

sfE.oninput = function() {

    if(!isNaN(sfE.valueAsNumber)) {
        sf = sfE.valueAsNumber;
        vector2[0] = sf * vector1[0];
        vector2[1] = sf * vector1[1];
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
        vector2[0] = sf * vector1[0];
        vector2[1] = sf * vector1[1];        

        updateVectorSvg();
        updateVectorInput();
    }
}

canvas1.onmousedown = function (event) {
    canvas1.style.cursor = "grabbing";
    mousePressed = true;
    canvas1.onmousemove(event);
};



window.onmouseup = function () {
    canvas1.style.cursor = "pointer";
    
    mousePressed = false;
};

sliderSVG.onmousemove = function(event) {
    if (mousePressed) {
        let sliderX = sliderSVG.getBoundingClientRect().x;
        let mouseX = event.clientX;
        if (mouseX - sliderX - 5 >= 0 && mouseX - sliderX - 5 <= 170) {
            sf = ((mouseX - sliderX - 5) / 170) * 10;
            sf = Math.round(sf * 10) / 10;
            sf -= 5;

            vector2[0] = sf * vector1[0];
            vector2[1] = sf * vector1[1];

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