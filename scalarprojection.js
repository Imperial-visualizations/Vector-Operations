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
const thetaLabel = elID("thetaLabel");

let lineR = elID("line1");
let lineS = elID("line2");
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

function angleOfVector (vector) {

    let output = Math.atan(vector[1] / vector[0]);

    if (vector[0] < 0) {
        output += Math.PI;
    }

    if (vector[0] > 0 && vector[1] < 0) {
        output += 2*Math.PI;
    }

    return output

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

//Function which changes values and calculates projection
function operate(change) {
    //Finds the value of cos of the angle between vector R
    // to the x-axis 
    let cv1 = vectorR[0] / mod(vectorR);
    //Find the angle between vector R and the x-axis.
    T1 = Math.acos(cv1);
    //Calculates the new angle between vector S and the x-axis.
    T2 = T1 + toRad(theta);

    if (change == "r" || change == "s") {
        let ctheta = dotProduct(vectorR, vectorS) / (mod(vectorR) * mod(vectorS));
        theta = toDeg(Math.acos(ctheta));
    } else {
        vectorS[0] = mod(vectorS) * Math.cos(T2);
        vectorS[1] = mod(vectorS) * Math.sin(T2);
    }

    //CALCULATES VECTOR PROJECTION (R dot S) times by (R divided by |R|)
    //Finds the scalar projection - (R dot S) divided by |R|
    sp = dotProduct(vectorR, vectorS) / mod(vectorR);
    //Divides the scalar projection by the modulus of R
    let spsf = sp / mod(vectorR);

    //Mutiplies (scalar projection divided by |R|) by R to get the vector projection
    vectorProjection[0] = spsf * vectorR[0];
    vectorProjection[1] = spsf * vectorR[1];

}

function updateVectorInput() {
    //Updates input values for vector R
    rx.value = Math.round(vectorR[0]*10)/10;
    ry.value = Math.round(vectorR[1]*10)/10;
    //Updates input values for vector S
    sx.value = Math.round(vectorS[0]*10)/10;
    sy.value = Math.round(vectorS[1]*10)/10;

    //Updates input value for the theta input
    thetaInput.value = Math.round(theta * 10) /10;

    
    //Updates the values for the label for vector R
    vRxlbl.innerHTML = Math.round(vectorR[0]*10)/10;
    vRylbl.innerHTML = Math.round(vectorR[1]*10)/10;

    //Updates the values for the label for vector S
    vSxlbl.innerHTML = Math.round(vectorS[0]*10)/10;
    vSylbl.innerHTML = Math.round(vectorS[1]*10)/10;
}

function updateVectorSVG() {
    let R1 = [0,0];
    R1[0] = vectorProjection[0] / mod(vectorProjection) / 1.5;
    R1[1] = vectorProjection[1] / mod(vectorProjection) / 1.5;

    let R2 = [0, 0];
    R2[0] = vectorS[0] - vectorProjection[0];
    R2[1] = vectorS[1] - vectorProjection[1];


    //console.log(vectorProjection);

    let mr2 = mod(R2);
    R2[0] = R2[0] / mr2 / 1.5;
    R2[1] = R2[1] / mr2 / 1.5;

    //Vectors of the points for the arc of the angle
    let R3 = [0, 0];
    let mr3 = mod(vectorS);
    R3[0] = vectorS[0] / mr3 / 1.5;
    R3[1] = vectorS[1] / mr3 / 1.5;

    let R4 = [0,0];
    R4[0] = vectorR[0] / mod(vectorR) / 1.5;
    R4[1] = vectorR[1] / mod(vectorR) / 1.5;    

    //Creates array variables for the points where the right angle symbol will show
    let rightAngleP1 = [0,0];
    let rightAngleP2 = [0,0];
    let rightAngleP3 = [0,0];

    //Points of the lines used to draw the right angle
    rightAngleP1[0] = vectorProjection[0] + R2[0];
    rightAngleP1[1] = vectorProjection[1] + R2[1];

    rightAngleP2[0] = vectorProjection[0] - R1[0] + R2[0];
    rightAngleP2[1] = vectorProjection[1] - R1[1] + R2[1];

    rightAngleP3[0] = vectorProjection[0] - R1[0];
    rightAngleP3[1] = vectorProjection[1] - R1[1];

    //Calculates the endpoint and start points of  
    arcStart = convertToSVGBig(R4);
    arcEnd = convertToSVGBig(R3);

    T1D = toDeg(T1) + 360;
    T2D = toDeg(T2) + 360;

    T3 = toDeg(angleOfVector(vectorR));
    T4 = toDeg(angleOfVector(vectorS));

    start = [arcStart[0], arcStart[1]];
    end = [arcEnd[0], arcEnd[1]];

    console.log(T4, T3, T4-T3);
    if (T4-T3 <= 180) {
        midAngle = toRad(0.5*(T4+T3)); 
    } else {
        console.log(T4, T3+360, T3+360+T4)
        midAngle = toRad((0.5*(T3+T4+360)) ); 
    }

    MI = [Math.cos(midAngle),  Math.sin(midAngle)] ;
    bigMID = convertToSVGBig(MI);

    //Sets up parameter of the path of the arc
    let lAF = ""

    if (T4 - T3 >= 180 || (T4 - T3 < 0 && T4 - T3 >= -180)) {
        lAF = "1";
    } else {
        lAF = "0";
    }

    let path = "M " + start[0].toString() + " " + start[1].toString()
     + "\nA 16.7 16.7 0 0 " + lAF + " " + end[0].toString() +
    " " + end[1].toString();

    thetaLabel.setAttribute("x", bigMID[0].toString());
    thetaLabel.setAttribute("y", bigMID[1].toString());

    bigvectorR = convertToSVGBig(vectorR);
    bigvectorS = convertToSVGBig(vectorS);
    bigvectorProjection = convertToSVGBig(vectorProjection);

    bigRightAngleP1 = convertToSVGBig(rightAngleP1);
    bigRightAngleP2 = convertToSVGBig(rightAngleP2);
    bigRightAngleP3 = convertToSVGBig(rightAngleP3);

    //Calculates the SVG coordinates of the brackets of the label for vector R
    bigvectorR1 = convertToSVGBig([vectorR[0], vectorR[1]+1.5]);
    bigvectorR2 = convertToSVGBig([vectorR[0]+2, vectorR[1]+1.5 ]);

    //Calculates the SVG coordinates of the brackets of the label for vector S
    bigvectorS1 = convertToSVGBig([vectorS[0]+0, vectorS[1]+1.5]);
    bigvectorS2 = convertToSVGBig([vectorS[0]+2, vectorS[1]+1.5 ]);
    
     
    rightAnglePath = "M " + bigRightAngleP1[0].toString() + ", " +
                    bigRightAngleP1[1].toString() + " L " +
                    bigRightAngleP2[0].toString() + ", " +
                    bigRightAngleP2[1].toString() + " L " +
                    bigRightAngleP3[0].toString() + ", " +
                    bigRightAngleP3[1].toString()
                    

    //console.log(rightAnglePath);
    rightAngleLine1.setAttribute("d", rightAnglePath);

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

    bigVectorRx = convertToSVGBig([vectorR[0]+1.1, vectorR[1]+2 ]);
    bigVectorRy = convertToSVGBig([vectorR[0]+1.1, vectorR[1]+1 ]);
    bigVectorSx = convertToSVGBig([vectorS[0]+1.1, vectorS[1]+2 ]);
    bigvectorSy = convertToSVGBig([vectorS[0]+1.1, vectorS[1]+1 ]);

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
    //console.log(bigvectorS1, bigvectorS2);
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
        vectorS[0] = sx.valueAsNumber;
        operate("s");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

sy.oninput = function() {
    try {
        vectorS[1] = sy.valueAsNumber;
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

    vRbracket1.style.display = 'block';
    vRxlbl.style.display = 'block';
    vRylbl.style.display = 'block';
    vRbracket2.style.display = 'block';

}

circle1.onmouseup = function() {
    mousePressed = false;
    chosenV = 0;

    vRbracket1.style.display = 'none';
    vRxlbl.style.display = 'none';
    vRylbl.style.display = 'none';
    vRbracket2.style.display = 'none';
    
}

circle1.onmouseleave = function() {
    vectorGraph.style.cursor = "auto";    
}


circle2.onmousedown = function(event) {
    mousePressed = true;
    chosenV = 2;
    vectorGraph.style.cursor = "pointer";
    vectorGraph.onmousemove(event);


    vSbracket1.style.display = 'block';
    vSxlbl.style.display = 'block';
    vSylbl.style.display = 'block';
    vSbracket2.style.display = 'block';
    
}

circle2.onmouseup = function() {
    mousePressed = false;
    chosenV = 0;

    vSbracket1.style.display = 'none';
    vSxlbl.style.display = 'none';
    vSylbl.style.display = 'none';
    vSbracket2.style.display = 'none';
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
            vectorR = convertToVectorBig([xCoord, yCoord]);
            operate("r");
        } 
        if (chosenV == 2) {
            vectorS = convertToVectorBig([xCoord, yCoord]);
            operate("s");
        }
        
        
        updateVectorInput();
        updateVectorSVG();
    }
}

operate("r");
updateVectorInput();
updateVectorSVG();

vRbracket1.style.display = 'none';
vRxlbl.style.display = 'none';
vRylbl.style.display = 'none';
vRbracket2.style.display = 'none';

vSbracket1.style.display = 'none';
vSxlbl.style.display = 'none';
vSylbl.style.display = 'none';
vSbracket2.style.display = 'none';