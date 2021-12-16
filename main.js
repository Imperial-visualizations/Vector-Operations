// Get an element given its id
function elID(id) {
    return document.getElementById(id);
}

// Get an element using its class name
function elClass(className) {
    return Array.from(document.getElementsByClassName(className));
}

// Store the possible page states
const pageStates = ["basic", "scalar", "vector"]

// Get inputs
const rxInputs = [elID("v1x-input-scalar"), elID("v1x-input-vector")];
const ryInputs = [elID("v1y-input-scalar"), elID("v1y-input-vector")];
const sxInputs = [elID("v2x-input-scalar"), elID("v2x-input-vector")];
const syInputs = [elID("v2y-input-scalar"), elID("v2y-input-vector")];
const thetaInput = elID("theta-input");
const thetaLabel = elID("theta-label");

// Get toggle button and related elements
const panelTitle = elID("panel-title");
const scalarPanel = elID("scalar-panel");
const vectorPanel = elID("vector-panel");
const vectorButton = elID("vector-button");
const scalarButton = elID("scalar-button");

// Get svg elements
const rLine = elID("r-line");
const sLine = elID("s-line");
const projectedLine = elID("projected-line");
const projectionPerp = elID("projection-perp");
const rightAnglePath = elID("right-angle-path");
const projectionArrow = elID("arrow-head-1")
const arc = elID("arc");
const rHandle = elID("r-handle");
const sHandle = elID("s-handle");
const vectorGraphContainer = elID("vector-graph-container");
const vectorGraph = elID("vector-graph");
const curlyBrace = elID("curly-brace");

// Vector labels
const rLabelGroup = elID("r-bracket-group");
const sLabelGroup = elID("s-bracket-group");
const rLabels = elClass("vector-label-1");
const sLabels = elClass("vector-label-2");

// Store info about dragging
let mousePressed = false;
let grabHandle = null;

// Store vector data
const vectorData = {
    "vectorR": [6, 2],
    "angleR": 0,
    "vectorS": [1, 5],
    "angleS": 0,
    "projection": [3, 3],
    "angleProj": 0,
    "perp": [0, 0],
    "angleDiff": 0,
    "theta": 30
}

// Store visualisation data
const visData = {
    "smallRVector": [],
    "smallSVector": [],
    "smallProjVector": [],
    "smallPerpVector": [],
    "midPoint": [],
    "bigvectorR": [],
    "bigvectorS": [],
    "bigvectorProjection": [],
    "state": "scalar"
}

const displace = 250; //vectorGraph.width.baseVal.value/2;
const scaleBig = 25;

// Return the dot product of 2 vectors
function dotProduct(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
}

// Return the modulus of a vector
function mod(vector) {
    return (vector[0] ** 2 + vector[1] ** 2) ** 0.5;
}

// Return scalar multiple of vector
function scalarMult(vector, scalar) {
    return vector.map((element) => element * scalar);
}

// Return sum of 2 vectors
function twoVectorSum(vector1, vector2) {
    return vector1.map((element, index) => element + vector2[index]);
}

// Return sum of any number of vectors
function vectorSum(...vectors) {
    return vectors.reduce(twoVectorSum);
}

// Return the unit vector in the direction of a vector
function unit(vector) {
    if (mod(vector) !== 0) {
        return scalarMult(vector, 1 / mod(vector));
    } else {
        return [0, 0];
    }
}

// Return the vector projection of v1 onto v2
function vectorProjection(v1, v2) {
    let scalar = dotProduct(v1, v2) / dotProduct(v2, v2)
    return [scalar * v2[0], scalar * v2[1]];
}

// Find the angle of a vector relative to the x axis
function angleOfVector(vector) {
    if (vector[1] != 0) {
        let output = Math.atan(vector[1] / vector[0]);
        if (vector[0] <= 0) {
            output += Math.PI;
        }
        if (vector[0] > 0 && vector[1] < 0) {
            output += 2 * Math.PI;
        }
        return output
    } else {
        return (vector[0] < 0 ? Math.PI : 0);
    }

}

// Converts angles from degrees to radians
function toRad(deg) {
    return (Math.PI / 180) * deg;
}
// Converts angles from raidans to degrees
function toDeg(rad) {
    return (180 / Math.PI) * rad;
}

function calculateTheta(theta) {
    return (modulo(theta, 360) <= 180 ? modulo(theta, 360) : 360 - modulo(theta, 360));
}

// Performs correct modulo operation for negatives
function modulo(n, m) {
    return ((n % m) + m) % m;
}

// Convert vector space values to svg space values
function convertToSVG(vector, scale, displacement) {
    const svgVector = [];
    svgVector.push(vector[0] * scale + displacement);
    svgVector.push(displacement - vector[1] * scale);
    return svgVector;
}

// Convert svg space values to vector space values
function convertToVector(svgVector, scale, displacement) {
    const vector = [];
    vector.push((svgVector[0] - displacement) / scale);
    vector.push((displacement - svgVector[1]) / scale);
    return vector;
}

// Find the position of Theta in the svg using vectors
function calculateThetaPosition(vector1, vector2) {
    let thetaPos;
    let sum = vectorSum(unit(vector1), unit(vector2));
    if (sum[1] !== 0) {
        thetaPos = convertToSVG(scalarMult(unit(sum), 1.2), scaleBig, displace);
    } else {
        thetaPos = convertToSVG(scalarMult([0, 1], 1.2), scaleBig, displace);
    }
    return thetaPos
}

// Find the refX of an arrow to the center of a vector
function arrowRefX(vector, scale) {
    return mod(vector) * scale / 8 + 1.5;
}

// Calculate everything in the vectorData object depending on which 
// vector has changed
function calculateVectorData(change) {
    switch (change) {

        case ("vector-both"):
            vectorData.angleR = toDeg(angleOfVector(vectorData.vectorR));
            vectorData.angleS = toDeg(angleOfVector(vectorData.vectorS));
            vectorData.angleDiff = modulo(vectorData.angleR - vectorData.angleS, 360);
            break;

        case ("vectorR"):
            vectorData.angleR = toDeg(angleOfVector(vectorData.vectorR));
            vectorData.angleDiff = modulo(vectorData.angleR - vectorData.angleS, 360);
            break;

        case ("vectorS"):
            vectorData.angleS = toDeg(angleOfVector(vectorData.vectorS));
            vectorData.angleDiff = modulo(vectorData.angleR - vectorData.angleS, 360);
            break;

        case ("theta"):
            vectorData.angleDiff = (vectorData.angleDiff <= 180 ? vectorData.theta : 360 - vectorData.theta);
            vectorData.angleS = modulo(vectorData.angleR - vectorData.angleDiff, 360);
            vectorData.vectorS[0] = mod(vectorData.vectorS) * Math.cos(toRad(vectorData.angleS));
            vectorData.vectorS[1] = mod(vectorData.vectorS) * Math.sin(toRad(vectorData.angleS));
            break;
    }

    vectorData.projection = vectorProjection(vectorData.vectorS, vectorData.vectorR);
    vectorData.perp = vectorSum(vectorData.vectorS, scalarMult(vectorData.projection, -1));
    vectorData.angleProj = toDeg(angleOfVector(vectorData.projection));
}

// Update the R vector input values
function updateRInput() {
    //Updates input values for vector R
    rxInputs.forEach((input) => input.value = Math.round(vectorData.vectorR[0] * 10) / 10);
    ryInputs.forEach((input) => input.value = Math.round(vectorData.vectorR[1] * 10) / 10);

    //Updates the values for the label for vector R
    rLabels[1].innerHTML = Math.round(vectorData.vectorR[0] * 10) / 10; // x label
    rLabels[2].innerHTML = Math.round(vectorData.vectorR[1] * 10) / 10; // y label
}

// Update the S vector input values
function updateSInput() {
    //Updates input values for vector R
    sxInputs.forEach((input) => input.value = Math.round(vectorData.vectorS[0] * 10) / 10);
    syInputs.forEach((input) => input.value = Math.round(vectorData.vectorS[1] * 10) / 10);

    //Updates the values for the label for vector R
    sLabels[1].innerHTML = Math.round(vectorData.vectorS[0] * 10) / 10; // x label
    sLabels[2].innerHTML = Math.round(vectorData.vectorS[1] * 10) / 10; // y label
}

// Update the theta input values
function updateThetaInput() {
    // Updates input value for the theta input
    vectorData.theta = calculateTheta(vectorData.angleDiff);
    thetaInput.value = Math.round(vectorData.theta * 10) / 10;
}

// Update the vector input depending on which handle is grabbed
function updateVectorInput() {

    // Handle update by grabbing
    switch (grabHandle) {

        case (null):
            updateRInput();
            updateSInput();
            break;

        case ("r-handle"):
            updateRInput();
            updateThetaInput();
            break;

        case ("s-handle"):
            updateSInput();
            updateThetaInput();
            break;

    }
}

// Using vectorData and depending on which handle is grabbed,
// draw the projection vis
function drawProjection(grabHandle) {

    // Calculate data needed for visualisation
    visData.smallProjVector = scalarMult(vectorData.projection, 1 / 1.5 / mod(vectorData.projection))
    visData.smallPerpVector = scalarMult(vectorData.perp, 1 / 1.5 / mod(vectorData.perp))
    visData.midPoint = calculateThetaPosition(vectorData.vectorR, vectorData.vectorS);
    visData.bigvectorProjection = convertToSVG(vectorData.projection, scaleBig, displace);

    if (grabHandle !== "r-handle") {
        // Only recalculate S vector data if not grabbing the r handle
        visData.smallSVector = scalarMult(vectorData.vectorS, 1 / 1.5 / mod(vectorData.vectorS))
        visData.bigvectorS = convertToSVG(vectorData.vectorS, scaleBig, displace);

        // Only redraw S vector if not grabbing the r handle
        // Draw S vector
        sLine.setAttribute("x1", displace.toString());
        sLine.setAttribute("y1", displace.toString());
        sLine.setAttribute("x2", visData.bigvectorS[0].toString());
        sLine.setAttribute("y2", visData.bigvectorS[1].toString());

        // Draw S handle
        sHandle.setAttribute("cx", visData.bigvectorS[0]);
        sHandle.setAttribute("cy", visData.bigvectorS[1]);

        // Position S label
        let sLabelShift = [Math.sign(vectorData.vectorS[0]) * 30, -30]
        sLabelGroup.style.transform = `translate(${visData.bigvectorS[0] + sLabelShift[0]}px, 
                                    ${visData.bigvectorS[1] + sLabelShift[1]}px)`;

    }

    if (grabHandle !== "s-handle") {
        // No need to recalculate R vector data
        visData.smallRVector = scalarMult(vectorData.vectorR, 1 / 1.5 / mod(vectorData.vectorR));
        visData.bigvectorR = convertToSVG(vectorData.vectorR, scaleBig, displace);

        // Only redraw R vector if not grabbing the s handle
        // Draw R vector
        rLine.setAttribute("x1", displace.toString());
        rLine.setAttribute("y1", displace.toString());
        rLine.setAttribute("x2", visData.bigvectorR[0].toString());
        rLine.setAttribute("y2", visData.bigvectorR[1].toString());

        // Draw R handle
        rHandle.setAttribute("cx", visData.bigvectorR[0]);
        rHandle.setAttribute("cy", visData.bigvectorR[1]);

        // Position R label
        let rLabelShift = [Math.sign(vectorData.vectorR[0]) * 30, -30]
        rLabelGroup.style.transform = `translate(${visData.bigvectorR[0] + rLabelShift[0]}px, 
                                    ${visData.bigvectorR[1] + rLabelShift[1]}px)`;

    }

    const projectionSize = mod(vectorData.projection);

    // Draw projection
    projectedLine.setAttribute("x1", displace.toString());
    projectedLine.setAttribute("y1", displace.toString());
    projectedLine.setAttribute("x2", visData.bigvectorProjection[0].toString());
    projectedLine.setAttribute("y2", visData.bigvectorProjection[1].toString());

    // If we are in "vector" mode, draw the arrow on the projection
    if (visData.state === "vector") {
        // Draw arrow if in vector state
        curlyBrace.style.display = "none";
        curlyBrace.setAttribute("stroke-opacity", 0);
        projectionArrow.style.display = "block";
        if (projectionSize >= 1.8) {
            projectionArrow.setAttribute("fill-opacity", 1);
        } else if (projectionSize >= 1.3) {
            projectionArrow.setAttribute("fill-opacity", (projectionSize - 1.3) * 2);
        } else {
            projectionArrow.setAttribute("fill-opacity", 0);
        }

        projectionArrow.setAttribute("refX", arrowRefX(vectorData.projection, scaleBig));

    // If we are in "scalar" mode, draw the arrow on the projection 
    } else if (visData.state === "scalar") {
        // Draw curly brace if in scalar state
        curlyBrace.style.display = "block";
        projectionArrow.style.display = "none";
        projectionArrow.setAttribute("fill-opacity", 0);

        curlyBrace.setAttribute("stroke-opacity", 1);
        const braceStretch = projectionSize * scaleBig / 2;
        curlyBrace.setAttribute("d", `M 250, 240 c 0,-20 ${braceStretch},0 ${braceStretch},-20 0,20 ${braceStretch},0 ${braceStretch},20`);

        // Set transformation of curly brace depending on where everything is
        if ((vectorData.angleDiff > 90 && vectorData.angleDiff <= 180) || vectorData.angleDiff > 270 && vectorData.angleDiff < 360) {
            curlyBrace.setAttribute("transform", `rotate(${-1 * vectorData.angleProj}, 250, 250) scale(1,-1) translate(0,-500)`);
        } else {
            curlyBrace.setAttribute("transform", `rotate(${-1 * vectorData.angleProj}, 250, 250)`);
        }
    }

    // Draw perpendicular dashed line
    projectionPerp.setAttribute("x1", visData.bigvectorS[0].toString());
    projectionPerp.setAttribute("y1", visData.bigvectorS[1].toString());
    projectionPerp.setAttribute("x2", visData.bigvectorProjection[0].toString());
    projectionPerp.setAttribute("y2", visData.bigvectorProjection[1].toString());

    // Draw right angle
    if (projectionSize <= 1.3) {
        rightAnglePath.setAttribute("stroke-opacity", 0);
    } else {

        if (projectionSize <= 1.8) {
            rightAnglePath.setAttribute("stroke-opacity", (projectionSize - 1.3) * 2);
        } else {
            rightAnglePath.setAttribute("stroke-opacity", 1);
        }
        // Points of the lines used to draw the right angle
        let rightAngleP1 = convertToSVG(vectorSum(vectorData.projection,
            scalarMult(visData.smallProjVector, -1)),
            scaleBig, displace);

        let rightAngleP2 = convertToSVG(vectorSum(vectorData.projection, visData.smallPerpVector,
            scalarMult(visData.smallProjVector, -1)),
            scaleBig, displace);

        let rightAngleP3 = convertToSVG(vectorSum(vectorData.projection, visData.smallPerpVector),
            scaleBig, displace);

        let rightAngleString = "M " + rightAngleP1[0].toString() + ", " +
            rightAngleP1[1].toString() + " L " +
            rightAngleP2[0].toString() + ", " +
            rightAngleP2[1].toString() + " L " +
            rightAngleP3[0].toString() + ", " +
            rightAngleP3[1].toString();

        rightAnglePath.setAttribute("d", rightAngleString);
    }

    // Theta and arc - don't display if vector mode
    if (visData.state !== "vector") {

        // Calculate the endpoint and start points of arc
        let arcStart = convertToSVG(visData.smallRVector, scaleBig, displace);
        let arcEnd = convertToSVG(visData.smallSVector, scaleBig, displace);

        // Calculate a parameter of the path of the arc
        let lAF = ""
        if (vectorData.angleDiff >= 180) {
            lAF = "0";
        } else {
            lAF = "1";
        }

        // Calculate the arc path and add to the arc svg element
        let arcPath = "M " + arcStart[0].toString() + " " + arcStart[1].toString()
            + "\nA " + (50 / 3).toString() + " " + (50 / 3).toString() + " 0 0 " + lAF
            + " " + arcEnd[0].toString() + " " + arcEnd[1].toString();
        arc.setAttribute("d", arcPath);

        // Position theta label
        thetaLabel.setAttribute("x", visData.midPoint[0].toString());
        thetaLabel.setAttribute("y", (visData.midPoint[1] + 5).toString());
    }

}

/*
    Toggle between vectorial and scalar modes
*/

vectorButton.onclick = function (event) {

    event.preventDefault();

    // Change vector state and redraw vis accordingly
    visData.state = "vector";
    drawProjection();

    // Show the vector panel on the right
    vectorPanel.style.visibility = "visible";
    // Move the scalar panel out of view and hide it after 400ms
    scalarPanel.classList.add("moved");
    setTimeout(function () {
        scalarPanel.style.visibility = "hidden";
    }, 400);

    // Hide theta label and theta arc
    thetaLabel.style.display = "none";
    thetaLabel.setAttribute("stroke-opacity", 0);
    arc.setAttribute("stroke-opacity", 0);

}

scalarButton.onclick = function (event) {

    event.preventDefault();
    
    // Change vector state and redraw vis accordingly
    visData.state = "scalar";
    drawProjection();

    // Show the scalar panel on the right
    scalarPanel.style.visibility = "visible";
    // Move the scalar panel into view and hide vector panel after 400ms
    scalarPanel.classList.remove("moved");
    setTimeout(function () {
        vectorPanel.style.visibility = "hidden";
    }, 400);

    // Show theta label and theta arc
    thetaLabel.style.display = "block";
    thetaLabel.setAttribute("stroke-opacity", 1);
    arc.setAttribute("stroke-opacity", 1);
}

/*
    Numerical input based interaction
*/

/* 
    A function that takes a component (which tells us 0 (x) or 1 (y) component)
    and a name ("vectorS" or "vectorR") and returns a function. This function 
    then sets an oninput listener based on the values given
*/
const receiveVectorInput = (component, vectorName) => function (input) {

    // Add an oninput listener to all "input" variables
    input.oninput = function () {
        // If valueAsNumber is not NaN
        if (!isNaN(input.valueAsNumber)) {
            // Update the vectorData object based on the input
            vectorData[vectorName][component] = input.valueAsNumber;
            // Calculate the rest of the vectorData object as a result
            calculateVectorData(vectorName);
            // Update the vector input boxes accordingly
            updateVectorInput();
            // Redraw the projection in response
            drawProjection();
        }
    }
};

// Here we attach oninput listeners based on the receiveVectorInput function
// to each of the R and S vector inputs on the right
rxInputs.forEach(receiveVectorInput(0, "vectorR"));
ryInputs.forEach(receiveVectorInput(1, "vectorR"));
sxInputs.forEach(receiveVectorInput(0, "vectorS"));
syInputs.forEach(receiveVectorInput(1, "vectorS"));

// Similar to the above but modified for the scalar value of theta
thetaInput.oninput = function () {
    if (!isNaN(thetaInput.valueAsNumber)) {
        vectorData.theta = calculateTheta(thetaInput.valueAsNumber);
        thetaInput.value = vectorData.theta;
        calculateVectorData("theta");
        updateVectorInput();
        drawProjection();
    }
}

/*
    Mouse based interaction with the graph
*/

// Function which returns the x and y coords of the mouse
function getMouseCoords(event) {

    const optioncanvasX = vectorGraph.getBoundingClientRect().x;
    const optioncanvasY = vectorGraph.getBoundingClientRect().y;
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let xCoord = mouseX - optioncanvasX;
    let yCoord = mouseY - optioncanvasY;

    return [xCoord, yCoord];

}

/*
    Here we create a series of functions which will be attached to event
    listeners later
*/

function hoverGrab(event) {

    event.preventDefault();
    if (!mousePressed) {
        vectorGraph.style.cursor = "grab";
    }

}

function leaveHoverGrab(event) {

    event.preventDefault();
    if (!mousePressed) {
        vectorGraph.style.cursor = "auto";
    }

}

function startGrab(event) {

    mousePressed = true;
    // grabHandle knows which of the handles is being grabbed
    // we use this to change labels and call functions in response
    grabHandle = event.target.id;
    vectorGraph.style.cursor = "grabbing";
    event.preventDefault();

    switch (grabHandle) {

        case "s-handle":
            sLabels.forEach((label) => label.style.display = "block");
            break;
        case "r-handle":
            rLabels.forEach((label) => label.style.display = "block");
            break;

    }

}

function endGrab(event) {

    mousePressed = false;
    // When nothing is being grabbed, set grabHandle to null
    grabHandle = null;
    vectorGraph.style.cursor = "auto";
    rLabelGroup.style.display = "none";
    sLabelGroup.style.display = "none";
    event.preventDefault();

}

// Add listeners for the above functions to the s and r handles
sHandle.onmouseover = hoverGrab;
rHandle.onmouseover = hoverGrab;
sHandle.onmouseleave = leaveHoverGrab;
rHandle.onmouseleave = leaveHoverGrab;
sHandle.onmousedown = startGrab;
rHandle.onmousedown = startGrab;
vectorGraph.onmouseup = endGrab;

// 
vectorGraph.onmousemove = function (event) {

    event.preventDefault();

    if (mousePressed) {

        mouseCoords = getMouseCoords(event)
        position = convertToVector(mouseCoords, scaleBig, displace);

        switch (grabHandle) {

            case "s-handle":
                vectorData.vectorS = position;
                sLabelGroup.style.display = "block";
                calculateVectorData("vectorS");
                break;
            case "r-handle":
                vectorData.vectorR = position;
                rLabelGroup.style.display = "block";
                calculateVectorData("vectorR");
                break;

        }
        updateVectorInput();
        drawProjection(grabHandle);
    }
}

calculateVectorData("vector-both");
updateVectorInput();
drawProjection();