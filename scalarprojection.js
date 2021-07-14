mousePressed = false;
chosenV = 1;

// Numbers for svg elements
const scale = 10;
const scale2 = 25;
const displace = 250;

// Store our vectors
let vectorR = [6, 2];
let vectorS = [1, 5];
let vectorProjection = [3, 3];
let theta = 30;
let sp = 1;
let T1 = 0;
let T2 = 0;

//Gets elements
const rx = elID("v1x");
const ry = elID("v1y");
const sx = elID("v2x");
const sy = elID("v2y");
const thetaInput = elID("thetaInput");

const lineR = elID("line1");
const lineS = elID("line2");
const vpLine = elID("line3");
const vplinedotted = elID("line4");
const rightAngleLine1 = elID("line5");
const rightAngleLine2 = elID("line6");

const arc1 = elID("arc1");

const circle1 = elID("circle1");
const circle2 = elID("circle2");

const vectorGraph = elID("vectorgraphdiv");

const vRxlbl = elID("v1xlbl");
const vRylbl = elID("v1ylbl");
const vSxlbl = elID("v2xlbl");
const vSylbl = elID("v2ylbl");


//Brackets for the label of the 2 vectors
//Brackets for vector 1
//Left bracket
const vRbracket1 = elID("v1b1");
//Right bracket
const vRbracket2 = elID("v1b2");
//Brackets for vector 2
//Left bracket
const vSbracket1 = elID("v2b1");
//Right bracket
const vSbracket2 = elID("v2b2");

//Function returning an element given its id
function elID(id) {
    return document.getElementById(id);
}

//Function returning the dot product of 2 vectors
function dotProduct(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
}

//Function returning the modulus of a vector
function mod(v1) {
    return ( ( (v1[0]) ** 2 ) + ( (v1[1]) ** 2 ) ) ** 0.5
}

//Converts angles from degrees to radians
function toRad(deg) {
    return ( Math.PI / 180) * deg;
}
//Converts angles from raidans to degrees
function toDeg(rad) {
    return (180 / Math.PI) * rad;
}

//Function to find the SVG coordinates of a vector
function convertToSVGBig(vector) {
    const svgVector = [];

    svgVector.push(vector[0] * scale2 + displace);
    svgVector.push(displace - vector[1] * scale2);

    return svgVector;
}

//Function to convert SVG coordinates into normal vectors

function convertToVectorBig(vector) {
    const realVector = [];

    realVector.push((vector[0] - displace) / scale2);
    realVector.push((displace - vector[1]) / scale2);

    return realVector;
}

function operate(change) {
    let cv1 = vectorR[0] / mod(vectorR);
    T1 = Math.acos(cv1);
    T2 = T1 + toRad(theta);
    if (change == "r" || change == "s") {
        let ctheta = dotProduct(vectorR, vectorS) / (mod(lineR) * mod(lineS));
        theta = toDeg(Math.acos(ctheta));
    } else {
        vectorS[0] = mod(vectorS) * Math.cos(T2);
        vectorS[1] = mod(vectorS) * Math.sin(T2);
    }


    sp = dotProduct(vectorR, vectorS) / mod(vectorR);
    let spsf = sp / mod(vectorR);
    vectorProjection[0] = spsf * vectorR[0];
    vectorProjection[1] = spsf * vectorR[1];

}

function updateVectorInput() {
    rx.value = Math.round(lineR[0]*10)/10;
    ry.value = Math.round(lineR[1]*10)/10;
    sx.value = Math.round(lineS[0]*10)/10;
    sy.value = Math.round(lineS[1]*10)/10;
    thetaInput.value = Math.round(theta * 10) /10;

    
    //Updates the values for the label for vector R
    vRxlbl.innerHTML = Math.round(vectorR[0]*10)/10;
    vRylbl.innerHTML = Math.round(vectorR[1]*10)/10;

    //Updates the values for the label for vector S
    vSxlbl.innerHTML = Math.round(vectorS[0]*10)/10;
    vSylbl.innerHTML = Math.round(vectorS[1]*10)/10;
}

function updateVectorSVG() {
    ra1 = [-1, 1];
    ra2 = [-1, 0];
    ra3 = [0, 1];

    let R1 = [0,0];
    R1[0] = vectorProjection[0] / mod(vectorProjection) / 1.5;
    R1[1] = vectorProjection[1] / mod(vectorProjection) / 1.5;

    let R2 = [0, 0];
    R2[0] = vectorS[0] - vectorProjection[0];
    R2[1] = vectorS[1] - vectorProjection[1];

    let mr2 = mod(R2);
    R2[0] = R2[0] / mr2 / 1.5;
    R2[1] = R2[1] / mr2 / 1.5;

    let R3 = [0, 0];
    let mr3 = mod(vectorS);
    R3[0] = vectorS[0] / mr3;
    R3[1] = vectorS[1] / mr3;

    let R4 = [0,0];
    R4[0] = lineR[0] / mod(lineR) / 1.5;
    R4[1] = lineR[1] / mod(lineR) / 1.5;    

    let rightAngleP1 = [0,0];
    let rightAngleP2 = [0,0];
    let rightAngleP3 = [0,0];

    rightAngleP1[0] = vectorProjection[0] + R2[0];
    rightAngleP1[1] = vectorProjection[1] + R2[1];

    rightAngleP2[0] = vectorProjection[0] - R1[0] + R2[0];
    rightAngleP2[1] = vectorProjection[1] - R1[1] + R2[1];

    rightAngleP3[0] = vectorProjection[0] - R1[0];
    rightAngleP3[1] = vectorProjection[1] - R1[1];

    BV1 = convertToSVGBig(R1);
    BV2 = convertToSVGBig(R3);
    BV3 = convertToSVGBig(R2);
    BV4 = convertToSVGBig(R4);

    T1D = toDeg(T1) + 360;
    T2D = toDeg(T2) + 360;

    T3 = toDeg(Math.atan(vectorR[1] / vectorR[0]));
    T4 = toDeg(Math.atan(vectorS[1] / vectorS[0]));

    if (T3 < 0 ) {
        T3 = T3 + 360;
    }
    if (T4 < 0 ) {
        T4 = T4 + 360;
    }    

    let start = [0, 0];
    let end = [BV1[0], BV1[1]];
    end[0] = BV2[0];
    end[1] = BV2[1];

    //if  (theta >= 180 && theta <= 270) {
        start = [BV4[0], BV4[1]];
        end = [BV2[0], BV2[1]];
//    } else {
  //      start = [BV4[0], BV4[1]];
    ///    end = [BV2[0], BV2[1]];
   // }

    let lAF = ""
    console.log(T4 , T3, T4-T3);

    if (T4 - T3 > 180 ) {
        lAF = "1";
    } else {
        lAF = "0";
    }

    //let lAF = theta <= 180 ? "0" : "1";

    let path = "M " + start[0].toString() + " " + start[1].toString()
     + "\nA 25 25 0 0 " + lAF + " " + end[0].toString() +
    " " + end[1].toString();
     

    bigvectorR = convertToSVGBig(vectorR);
    bigvectorS = convertToSVGBig(vectorS);
    bigvectorProjection = convertToSVGBig(vectorProjection);

    bigrightAngleP1 = convertToSVGBig(rightAngleP1);
    bigrightAngleP2 = convertToSVGBig(rightAngleP2);
    bigrightAngleP3 = convertToSVGBig(rightAngleP3);

    lineR.setAttribute("x1", displace.toString());
    lineR.setAttribute("y1", displace.toString());
    lineR.setAttribute("x2", bigvectorR[0].toString());
    lineR.setAttribute("y2", bigvectorR[1].toString());

    lineS.setAttribute("x1", displace.toString());
    lineS.setAttribute("y1", displace.toString());
    lineS.setAttribute("x2", bigvectorS[0].toString());
    lineS.setAttribute("y2", bigvectorS[1].toString());

    vpLine.setAttribute("x1", displace.toString());
    vpLine.setAttribute("y1", displace.toString());
    vpLine.setAttribute("x2", bigvectorProjection[0].toString());
    vpLine.setAttribute("y2", bigvectorProjection[1].toString());

    vplinedotted.setAttribute("x1", bigvectorS[0].toString());
    vplinedotted.setAttribute("y1", bigvectorS[1].toString());
    vplinedotted.setAttribute("x2", bigvectorProjection[0].toString());
    vplinedotted.setAttribute("y2", bigvectorProjection[1].toString());
    //
    rightAngleLine1.setAttribute("x1", bigrightAngleP1[0].toString());
    rightAngleLine1.setAttribute("y1", bigrightAngleP1[1].toString());
    rightAngleLine1.setAttribute("x2", bigrightAngleP2[0].toString());
    rightAngleLine1.setAttribute("y2", bigrightAngleP2[1].toString());

    rightAngleLine2.setAttribute("x1", bigrightAngleP2[0].toString());
    rightAngleLine2.setAttribute("y1", bigrightAngleP2[1].toString());
    rightAngleLine2.setAttribute("x2", bigrightAngleP3[0].toString());
    rightAngleLine2.setAttribute("y2", bigrightAngleP3[1].toString());

    circle1.setAttribute("cx", bigvectorR[0]);
    circle1.setAttribute("cy", bigvectorR[1]);

    circle2.setAttribute("cx", bigvectorS[0]);
    circle2.setAttribute("cy", bigvectorS[1]);

    arc1.setAttribute("d", path);

        //Update the position of the ables of the vectors
    // VectorR Label
    vRxlbl.setAttribute("x", bigVectorRx[0]);
    vRxlbl.setAttribute("y", bigVectorRx[1]);
    vRylbl.setAttribute("x", bigVectorRy[0]);
    vRylbl.setAttribute("y", bigVectorRy[1]);

    // VectorS Label
    vSxlbl.setAttribute("x", bigVectorSx[0]);
    vSxlbl.setAttribute("y", bigVectorSx[1]);
    vSylbl.setAttribute("x", bigvectorSy[0]);
    vSylbl.setAttribute("y", bigvectorSy[1]);

    // Vector R bracket
    //  Left Bracket
    vRbracket1.setAttribute("x", bigvectorR1[0]);
    vRbracket1.setAttribute("y", bigvectorR1[1]);

    //  Right Bracket
    vRbracket2.setAttribute("x", bigvectorR2[0]);
    vRbracket2.setAttribute("y", bigvectorR2[1]);


    // Vector S bracket
    console.log(bigvectorS1, bigvectorS2);
    //  Left Bracket
    vSbracket1.setAttribute("x", bigvectorS1[0]);
    vSbracket1.setAttribute("y", bigvectorS1[1]);

    //  Right Bracket
    vSbracket2.setAttribute("x", bigvectorS2[0]);
    vSbracket2.setAttribute("y", bigvectorS2[1]);
}

rx.oninput = function() {
    try {
        lineR[0] = rx.valueAsNumber;
        operate("r");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

ry.oninput = function() {
    try {
        lineR[1] = ry.valueAsNumber;
        operate("r");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

sx.oninput = function() {
    try {
        lineS[0] = sx.valueAsNumber;
        operate("s");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

sy.oninput = function() {
    try {
        lineS[1] = sy.valueAsNumber;
        operate("s");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

thetaInput.oninput = function() {
    try {
        theta = thetaInput.valueAsNumber;
        operate("theta");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

circle1.onmousedown = function(event) {
    mousePressed = true;
    chosenV = 1;
    vectorGraph.style.cursor = "pointer";
    vectorGraph.onmousemove(event);
    
}

circle1.onmouseup = function() {
    mousePressed = false;
    chosenV = 0;
    
}

circle1.onmouseleave = function() {
    vectorGraph.style.cursor = "auto";    
}


circle2.onmousedown = function(event) {
    mousePressed = true;
    chosenV = 2;
    vectorGraph.style.cursor = "pointer";
    vectorGraph.onmousemove(event);
    
}

circle2.onmouseup = function() {
    mousePressed = false;
    chosenV = 0;
}

circle2.onmouseleave = function() {
    vectorGraph.style.cursor = "auto";    
}

vectorGraph.onmousemove = function(event) {
    if (mousePressed == true) {
        let optioncanvasX = vectorGraph.getBoundingClientRect().x;
        let optioncanvasY = vectorGraph.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;
    
        let xCoord = mouseX - optioncanvasX;
        let yCoord = mouseY - optioncanvasY;
        
        if (chosenV == 1) {
            lineR = convertToVectorBig([xCoord, yCoord]);
            operate("r");
        } 
        if (chosenV == 2) {
            lineS = convertToVectorBig([xCoord, yCoord]);
            operate("s");
        }
        
        
        updateVectorInput();
        updateVectorSVG();
    }
}

operate("r");
updateVectorInput();
updateVectorSVG();