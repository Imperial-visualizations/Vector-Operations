mousePressed = false;
chosenV = 1;

// Numbers for svg elements
const scale = 10;
const scale2 = 25;
const displace = 250;
modroverr = [0.6, 0.8];

// Store our vectors
let vector1 = [6, 2];
let vector2 = [1, 5];
let vector3 = [3, 3];
let theta = 30;
let sp = 1;
let T1 = 0;
let T2 = 0;

//Gets elements
const rx = elID("v1x");
const ry = elID("v1y");
const sx = elID("v2x");
const sy = elID("v2y");
const v3x = elID("v3x");
const v3y = elID("v3y");
const modroverrInput = elID("modroverrInput");

const line1 = elID("line1");
const line2 = elID("line2");
const line3 = elID("line3");
const line4 = elID("line4");
const line5 = elID("line5");
const line6 = elID("line6");

const arc1 = elID("arc1");

const circle1 = elID("circle1");
const circle2 = elID("circle2");

const vectorGraph = elID("vectorgraphdiv");

function elID(id) {
    return document.getElementById(id);
}

function dotProduct(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
}

function mod(v1) {
    return ( ( (v1[0]) ** 2 ) + ( (v1[1]) ** 2 ) ) ** 0.5
}


function toRad(deg) {
    return ( Math.PI / 180) * deg;
}

function toDeg(rad) {
    return (180 / Math.PI) * rad;
}



function convertToSVGBig(vector) {
    const svgVector = [];

    svgVector.push(vector[0] * scale2 + displace);
    svgVector.push(displace - vector[1] * scale2);

    return svgVector;
}


function convertToVectorBig(vector) {
    const realVector = [];

    realVector.push((vector[0] - displace) / scale2);
    realVector.push((displace - vector[1]) / scale2);

    return realVector;
}

function operate(change) {
    
    let cv1 = vector1[0] / mod(vector1);
    theta = Math.cos()
    T1 = Math.acos(cv1);
    T2 = T1 + toRad(theta);
    let ctheta = dotProduct(vector1, vector2) / (mod(vector1) * mod(vector2));
    theta = toDeg(Math.acos(ctheta));
    
    if (change == "r" || change == "s") {
        modroverr[0] = vector1[0] / mod(vector1);
        modroverr[1] = vector1[1] / mod(vector1);
    } else {
        vector1[0] = mod(vector1) * modroverr[0];
        vector1[1] = mod(vector1) * modroverr[1];
    }


    sp = dotProduct(vector1, vector2) / mod(vector1);
    let spsf = sp / mod(vector1);
    vector3[0] = spsf * vector1[0];
    vector3[1] = spsf * vector1[1];

}

function updateVectorInput() {
    rx.value = Math.round(vector1[0]*10)/10;
    ry.value = Math.round(vector1[1]*10)/10;
    sx.value = Math.round(vector2[0]*10)/10;
    sy.value = Math.round(vector2[1]*10)/10;
    v3x.value = Math.round(modroverr[0]*100)/100;
    v3y.value = Math.round(modroverr[1]*100)/100;
}

function updateVectorSVG() {
    ra1 = [-1, 1];
    ra2 = [-1, 0];
    ra3 = [0, 1];

    let R1 = [0,0];
    R1[0] = vector3[0] / mod(vector3) / 1.5;
    R1[1] = vector3[1] / mod(vector3) / 1.5;

    let R2 = [0, 0];
    R2[0] = vector2[0] - vector3[0];
    R2[1] = vector2[1] - vector3[1];

    let mr2 = mod(R2);
    R2[0] = R2[0] / mr2 / 1.5;
    R2[1] = R2[1] / mr2 / 1.5;

    let R3 = [0, 0];
    let mr3 = mod(vector2);
    R3[0] = vector2[0] / mr3;
    R3[1] = vector2[1] / mr3;

    let R4 = [0,0];
    R4[0] = vector1[0] / mod(vector1) / 1.5;
    R4[1] = vector1[1] / mod(vector1) / 1.5;    

    let vector4 = [0,0];
    let vector5 = [0,0];
    let vector6 = [0,0];

    vector4[0] = vector3[0] + R2[0];
    vector4[1] = vector3[1] + R2[1];

    vector5[0] = vector3[0] - R1[0] + R2[0];
    vector5[1] = vector3[1] - R1[1] + R2[1];

    vector6[0] = vector3[0] - R1[0];
    vector6[1] = vector3[1] - R1[1];

    BV1 = convertToSVGBig(R1);
    BV2 = convertToSVGBig(R3);
    BV3 = convertToSVGBig(R2);
    BV4 = convertToSVGBig(R4);

    T1D = toDeg(T1) + 360;
    T2D = toDeg(T2) + 360;

    T3 = toDeg(Math.atan(vector1[1] / vector1[0]));
    T4 = toDeg(Math.atan(vector2[1] / vector2[0]));

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
     

    bigVector1 = convertToSVGBig(vector1);
    bigVector2 = convertToSVGBig(vector2);
    bigVector3 = convertToSVGBig(vector3);

    bigVector4 = convertToSVGBig(vector4);
    bigVector5 = convertToSVGBig(vector5);
    bigVector6 = convertToSVGBig(vector6);

    line1.setAttribute("x1", displace.toString());
    line1.setAttribute("y1", displace.toString());
    line1.setAttribute("x2", bigVector1[0].toString());
    line1.setAttribute("y2", bigVector1[1].toString());

    line2.setAttribute("x1", displace.toString());
    line2.setAttribute("y1", displace.toString());
    line2.setAttribute("x2", bigVector2[0].toString());
    line2.setAttribute("y2", bigVector2[1].toString());

    line3.setAttribute("x1", displace.toString());
    line3.setAttribute("y1", displace.toString());
    line3.setAttribute("x2", bigVector3[0].toString());
    line3.setAttribute("y2", bigVector3[1].toString());

    line4.setAttribute("x1", bigVector2[0].toString());
    line4.setAttribute("y1", bigVector2[1].toString());
    line4.setAttribute("x2", bigVector3[0].toString());
    line4.setAttribute("y2", bigVector3[1].toString());
    //
    line5.setAttribute("x1", bigVector4[0].toString());
    line5.setAttribute("y1", bigVector4[1].toString());
    line5.setAttribute("x2", bigVector5[0].toString());
    line5.setAttribute("y2", bigVector5[1].toString());

    line6.setAttribute("x1", bigVector5[0].toString());
    line6.setAttribute("y1", bigVector5[1].toString());
    line6.setAttribute("x2", bigVector6[0].toString());
    line6.setAttribute("y2", bigVector6[1].toString());

    circle1.setAttribute("cx", bigVector1[0]);
    circle1.setAttribute("cy", bigVector1[1]);

    circle2.setAttribute("cx", bigVector2[0]);
    circle2.setAttribute("cy", bigVector2[1]);

    arc1.setAttribute("d", path);
}

rx.oninput = function() {
    try {
        vector1[0] = rx.valueAsNumber;
        operate("r");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

ry.oninput = function() {
    try {
        vector1[1] = ry.valueAsNumber;
        operate("r");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

sx.oninput = function() {
    try {
        vector2[0] = sx.valueAsNumber;
        operate("s");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

sy.oninput = function() {
    try {
        vector2[1] = sy.valueAsNumber;
        operate("s");
        updateVectorInput();
        updateVectorSVG();
    } catch (error) {
        console.log(error);
    }
}

v3x.oninput = function() {
    try {
        if (v3x.valueAsNumber < 0 || v3x.valueAsNumber > 1) {
            v3x.value = modroverr[0];
        } else {
            modroverr[0] = v3x.valueAsNumber;
            modroverr[1] = (1 - (modroverr[0] ** 2)) ** 0.5;
            operate("modr/r");
            updateVectorInput();
            updateVectorSVG();
        }
        

    } catch (error) {
        console.log(error);
    }
}

v3y.oninput = function() {
    try {
        if (v3y.valueAsNumber < 0 || v3x.valueAsNumber > 1) {
            v3y.value = modroverr[1];
        } else {
            modroverr[1] = v3y.valueAsNumber;
            modroverr[0] = (1 - (modroverr[1] ** 2)) ** 0.5;
            operate("modr");
            updateVectorInput();
            updateVectorSVG();
        }

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
    if (mousePressed) {
        let optioncanvasX = vectorGraph.getBoundingClientRect().x;
        let optioncanvasY = vectorGraph.getBoundingClientRect().y;
        let mouseX = event.clientX;
        let mouseY = event.clientY;
    
        let xCoord = mouseX - optioncanvasX;
        let yCoord = mouseY - optioncanvasY;
        
        if (chosenV == 1) {
            vector1 = convertToVectorBig([xCoord, yCoord]);
            operate("r");
        } 
        if (chosenV == 2) {
            vector2 = convertToVectorBig([xCoord, yCoord]);
            operate("s");
        }
        
        
        updateVectorInput();
        updateVectorSVG();
    }
}

operate("r");
updateVectorInput();
updateVectorSVG();