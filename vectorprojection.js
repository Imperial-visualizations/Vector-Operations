mousePressed = false;
chosenV = 1;

// Numbers for svg elements
const scale = 10;
const scale2 = 25;
const displace = 250;
modroverr = [0.6, 0.8];

// Store our vectors
let vectorR = [6, 2];
let vectorS = [1, 5];
let vectorProjection = [3, 3];
let theta = 30;
let sp = 1;
let T1 = 0;
let T2 = 0;

//Start and end points for the arc showing the angle between the vectors
let start = [0, 0];
let end = [0, 0];

//Gets elements
const rx = elID("v1x");
const ry = elID("v1y");
const sx = elID("v2x");
const sy = elID("v2y");
const modroverrx = elID("v3x");
const modroverry = elID("v3y");
const modroverrInput = elID("modroverrInput");

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

/* Function to find the angle of a vector from the positive
   x-axis 0 to 2pi
*/
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

//Function which changes values and calculates vector projection
function operate(change) {
    
    //Updates the angle between the vectors - useful for drawing 
    //   the arc showing the angle between vector r and vector 
    let ctheta = dotProduct(vectorR, vectorS) / (mod(vectorR) * mod(vectorS));
    theta = toDeg(Math.acos(ctheta));
    
    if (change === "r" || change === "s") {
        modroverr[0] = vectorR[0] / mod(vectorR);
        modroverr[1] = vectorR[1] / mod(vectorR);
    } else {
        vectorR[0] = mod(vectorR) * modroverr[0];
        vectorR[1] = mod(vectorR) * modroverr[1];
    }

    //CALCULATES VECTOR PROJECTION (R dot S) times by (R divided by |R|)
    //Finds the scalar projection - (R dot S) divided by |R|
    sp = dotProduct(vectorR, vectorS) / mod(vectorR);
    //Divides the scalar projection by the modulus of R
    let spsf = dotProduct(vectorR, vectorS) / ( mod(vectorR) * mod(vectorR));
    //console.log(spsf);
    
    //Mutiplies (scalar projection divided by |R|) by R to get the vector projection
    vectorProjection[0] = spsf * vectorR[0];
    vectorProjection[1] = spsf * vectorR[1];

    //console.log((vectorProjection[0] / mod(vectorProjection)) - (vectorR[0] / mod(vectorR))   );
    //console.log((vectorProjection[1] / mod(vectorProjection)) - (vectorR[1] / mod(vectorR))   );

}

function updateVectorInput() {
    //Updates input values for vector R
    rx.value = Math.round(vectorR[0]*10)/10;
    ry.value = Math.round(vectorR[1]*10)/10;
    //Updates input values for vector S
    sx.value = Math.round(vectorS[0]*10)/10;
    sy.value = Math.round(vectorS[1]*10)/10;

    //Updates values for vector projection
    modroverrx.value = Math.round(modroverr[0]*100)/100;
    modroverry.value = Math.round(modroverr[1]*100)/100;

    //Updates the values for the label for vector R
    vRxlbl.innerHTML = Math.round(vectorR[0]*10)/10;
    vRylbl.innerHTML = Math.round(vectorR[1]*10)/10;

    //Updates the values for the label for vector S
    vSxlbl.innerHTML = Math.round(vectorS[0]*10)/10;
    vSylbl.innerHTML = Math.round(vectorS[1]*10)/10;

}

function updateVectorSVG() {
    //CREATING THE LINES THAT FORM THE RIGHT ANGLE
    //Coordinates of the right angle in the basis of vector 1 and
    //  the vector projection

    
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
     
    //Calculates the SVG coordinates of the vectors R and S
    bigvectorR = convertToSVGBig(vectorR);
    bigvectorS = convertToSVGBig(vectorS);
    
    //Calculates the SVG coordinates of the points of the lines 
    //  of the right angle
    bigrightAngleP1 = convertToSVGBig(rightAngleP1);
    bigrightAngleP2 = convertToSVGBig(rightAngleP2);
    bigrightAngleP3 = convertToSVGBig(rightAngleP3);

    bigVectorRx = convertToSVGBig([vectorR[0]+1, vectorR[1]+2 ]);
    bigVectorRy = convertToSVGBig([vectorR[0]+1, vectorR[1]+1 ]);
    bigVectorSx = convertToSVGBig([vectorS[0]+1, vectorS[1]+2 ]);
    bigvectorSy = convertToSVGBig([vectorS[0]+1, vectorS[1]+1 ]);

    //Calculates the SVG coordinates of the brackets of the label for vector R
    bigvectorR1 = convertToSVGBig([vectorR[0], vectorR[1]+1.5]);
    bigvectorR2 = convertToSVGBig([vectorR[0]+2, vectorR[1]+1.5 ]);

    //Calculates the SVG coordinates of the brackets of the label for vector S
    bigvectorS1 = convertToSVGBig([vectorS[0], vectorS[1]+1.5]);
    bigvectorS2 = convertToSVGBig([vectorS[0]+2, vectorS[1]+1.5 ]);

    //Calculates the SVG coordinates of the vector projection
    bigvectorProjection = convertToSVGBig(vectorProjection);

    //Displays the vector R on the graph
    lineR.setAttribute("x1", displace.toString());
    lineR.setAttribute("y1", displace.toString());
    lineR.setAttribute("x2", bigvectorR[0].toString());
    lineR.setAttribute("y2", bigvectorR[1].toString());

    //Displays the vector S on the graph
    lineS.setAttribute("x1", displace.toString());
    lineS.setAttribute("y1", displace.toString());
    lineS.setAttribute("x2", bigvectorS[0].toString());
    lineS.setAttribute("y2", bigvectorS[1].toString());

    //Updates the line of the vector Projection
    vpLine.setAttribute("x1", displace.toString());
    vpLine.setAttribute("y1", displace.toString());
    vpLine.setAttribute("x2", bigvectorProjection[0].toString());
    vpLine.setAttribute("y2", bigvectorProjection[1].toString());

    //Updates the dotted line
    vplinedotted.setAttribute("x1", bigvectorS[0].toString());
    vplinedotted.setAttribute("y1", bigvectorS[1].toString());
    vplinedotted.setAttribute("x2", bigvectorProjection[0].toString());
    vplinedotted.setAttribute("y2", bigvectorProjection[1].toString());
    
    //Updates lines for the right angle mark on diagram
    rightAngleLine1.setAttribute("x1", bigrightAngleP1[0].toString());
    rightAngleLine1.setAttribute("y1", bigrightAngleP1[1].toString());
    rightAngleLine1.setAttribute("x2", bigrightAngleP2[0].toString());
    rightAngleLine1.setAttribute("y2", bigrightAngleP2[1].toString());

    rightAngleLine2.setAttribute("x1", bigrightAngleP2[0].toString());
    rightAngleLine2.setAttribute("y1", bigrightAngleP2[1].toString());
    rightAngleLine2.setAttribute("x2", bigrightAngleP3[0].toString());
    rightAngleLine2.setAttribute("y2", bigrightAngleP3[1].toString());

    //Updates the position of the circles used to move the vectors around
    circle1.setAttribute("cx", bigvectorR[0]);
    circle1.setAttribute("cy", bigvectorR[1]);

    circle2.setAttribute("cx", bigvectorS[0]);
    circle2.setAttribute("cy", bigvectorS[1]);

    //Updates the arc marking the angle between vector R and vector S
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

//Checks if the user has changed the input of the x-component of vector R
rx.oninput = function() {
    //Checks if input is valid
    try {
        //Changes array for vector R if valid
        vectorR[0] = rx.valueAsNumber;
        //Calculates the new vector projection and the new angle between vector R and vector S
        operate("r");
        //Updates the input values and the value in the labels
        updateVectorInput();
        //Updates the postion of the vectors, labels and the arc
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

//Checks if the user has changed the input of the y-component of vector R
ry.oninput = function() {
    try {
        //Changes array for vector R if valid
        vectorR[1] = ry.valueAsNumber;
        //Calculates the new vector projection and the new angle between vector R and vector S
        operate("r");
        //Updates the input values and the value in the labels
        updateVectorInput();
        //Updates the postion of the vectors, labels and the arc
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

//Checks if the user has changed the input of the x-component of vector S
sx.oninput = function() {
    try {
        //Changes array for vector S if valid
        vectorS[0] = sx.valueAsNumber;
        //Calculates the new vector projection and the new angle between vector R and vector S
        operate("s");
        //Updates the input values and the value in the labels
        updateVectorInput();
        //Updates the postion of the vectors, labels and the arc
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

//Checks if the user has changed the input of the y-component of vector S
sy.oninput = function() {
    try {
        //Changes value in array for vector S if valid
        vectorS[1] = sy.valueAsNumber;
        //Calculates the new vector projection and the new angle between vector R and vector S
        operate("s");
        //Updates the input values and the value in the labels
        updateVectorInput();
        //Updates the postion of the vectors, labels and the arc
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

//Checks if the input for the x-component of the vector R over |R| 
modroverrx.oninput = function() {
    try {
        //Checks if input is valid
        if (modroverrx.valueAsNumber < -1 || modroverrx.valueAsNumber > 1) {
            //If not reverts the input value back to the previous value
            modroverrx.valueAsNumber = modroverr[0];
        } else {
            //Changes value in array for the vector R over |R|
            modroverr[0] = modroverrx.valueAsNumber;
            //Because the modulus of the vector R over |R| has to be a unit vector, it calculates the 
            // new value for the y-component of the vector R over |R|
            //If the y-component was positive, it will remain positive
            if (modroverr[1] >= 0) {
                modroverr[1] = (1 - (modroverr[0] ** 2)) ** 0.5;
            }
            //If the y-component is negative it will remain negative
            else {
                modroverr[1] = -1 * ((1 - (modroverr[0] ** 2)) ** 0.5);
            }
            //Updates vector R with the new value
            operate("modr/r");
            //Updates the input values and the value in the labels
            updateVectorInput();
            //Updates the postion of the vectors, labels and the arc
            updateVectorSVG();
        }
        

    } catch (error) {
        console.log(error);
    }
}

//Checks if the input for the x-component of the vector R over |R| 
modroverry.oninput = function() {
    try {
        //Checks if input is valid
        if (modroverry.valueAsNumber < -1 || modroverrx.valueAsNumber > 1) {
            //If not reverts the input value back to the previous value
            modroverry.valueAsNumber = modroverr[1];
        } else {
            //Changes value in array for the vector R over |R|
            modroverr[1] = modroverry.valueAsNumber;
            //Because the modulus of the vector R over |R| has to be a unit vector, it calculates the 
            // new value for the y-component of the vector R over |R|
            //If the y-component was positive, it will remain positive
            if (modroverr[0] >= 0) {
                modroverr[0] = (1 - (modroverr[1] ** 2)) ** 0.5;
            } 
            //If the y-component is negative it will remain negative
            else {
                modroverr[0] = -1 * ((1 - (modroverr[1] ** 2)) ** 0.5);
            }
            
            //Updates vector R with the new value
            operate("modr");
            //Updates the input values and the value in the labels
            updateVectorInput();
            //Updates the postion of the vectors, labels and the arc
            updateVectorSVG();
        }

    } catch (error) {
        console.log(error);
    }
}


//Checks if the user has clicked on the circle used to move vector R around
circle1.onmousedown = function(event) {
    mousePressed = true;
    chosenV = 1;
    //Changes the cursor to a pointer
    vectorGraph.style.cursor = "pointer";
    //Calls function that handles the position the user has clicked on 
    vectorGraph.onmousemove(event);
    
}

//Checks if the user has stopped clicking on the ccircle used to move vector R
circle1.onmouseup = function() {
    mousePressed = false;
    
}

//Changes the cursor back to normal
circle1.onmouseleave = function() {
    vectorGraph.style.cursor = "auto";    
}

//Checks if the user has clicked on the circle used to move vector R around
circle2.onmousedown = function(event) {
    mousePressed = true;
    chosenV = 2;
    //Changes the cursor to a pointer
    vectorGraph.style.cursor = "pointer";
    //Calls function that handles the position the user has clicked on 
    vectorGraph.onmousemove(event);
    
}

//Checks if the user has stopped clicking on the ccircle used to move vector S
circle2.onmouseup = function() {
    mousePressed = false;
    chosenV = 0;
}

//Changes the cursor back to normal
circle2.onmouseleave = function() {
    vectorGraph.style.cursor = "auto";    
}

//Function that handles the position the user has clicked on 
vectorGraph.onmousemove = function(event) {
    //Checks if the mouse is pressed
    if (mousePressed) {
        //Calculates the SVG coordinates of where the mouse is
        let optioncanvasX = vectorGraph.getBoundingClientRect().x;
        let optioncanvasY = vectorGraph.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;
    
        let xCoord = mouseX - optioncanvasX;
        let yCoord = mouseY - optioncanvasY;

        //Checks what circle the user pressed 
        if (chosenV == 1) {
            //Updates the vectorR array 
            vectorR = convertToVectorBig([xCoord, yCoord]);
            //Calculates the vector projection and the angle between vector R and vector S
            operate("r");
        } 
        if (chosenV == 2) {
            //Updates the vectorS array 
            vectorS = convertToVectorBig([xCoord, yCoord]);
            //Calculates the vector projection and the angle between vector R and vector S
            operate("s");
        }
        
        //Updates inputs and labels of vectors
        updateVectorInput();
        //Updates positons of vectors, right angles, arcs and lines
        updateVectorSVG();
    }
}

//Calculates the vector projection and the angle between vector R and vector S
operate("r");
//Updates inputs and labels of vectors
updateVectorInput();
//Updates positons of vectors, right angles, arcs and lines
updateVectorSVG();