function elClass(className) {
    return document.getElementsByClassName(className);
}

function elID(id) {
    return document.getElementById(id);
}

function convertToSVGSmall(number, xOry) {
    let scale = 20;
    if (xOry == "x") {
        value = number * scale;
        value += 100;
        return value;
    } else if (xOry == "y") {
        //console.log(number);
        let v1 = number * scale;
        let v2 = v1 + 100;
        let value = 200 - v2;
        return value;
    }
    
    return value;
}

function convertToSVGBig(number, xOry) {
    let scale = 25;
    if (xOry == "x") {
        value = number * scale;
        value += 250;
        return value;
    } else if (xOry == "y") {
        let v1 = number * scale;
        let v2 = v1 + 250;
        let value = 500 - v2;
        return value;
    }
    return value;
}

function convertToVectorSmall(number, xOry) {
    let scale = 20;
    if (xOry == "x") {
        let v1 = (number - 100) / scale;
        let value = v1 / scale;
    } else if (xOry == "y") {
        let v1 = 200 - number;
        let v2 = number - 100;
        let value = v2 / scale;
    }
    return value    
}

function convertToVectorBig(number, xOry) {
    let scale = 25;
    if (xOry == "x") {
        let v1 = (number - 250) / scale;
        let value = v1 / scale;
    } else if (xOry == "y") {
        let v1 = 500 - number;
        let v2 = number - 250;
        let value = v2 / scale;
    }
    return value    
}    



function createVector() {
try {
    let c1 = document.getElementById("canvas1");
    
    let c3 = document.getElementById("canvas3");

    let l1 = document.getElementById("l1");
    let l3 = document.getElementById("l3");
    let l5 = document.getElementById("l5");

    //c1.remove(l1);
    //c2.remove(l2);
    //c3.remove(l3);
    //c3.remove(l4);
    //c3.remove(l5);
    
} catch (error){
    //console.log(error);
}

    let v1xStr = document.getElementById("v1x").value;
    let v1yStr = document.getElementById("v1y").value;
    let scalef = document.getElementById("sf").value;

    //console.log(v1xStr); //console.log(v1yStr); //console.log(v2xStr); //console.log(v2yStr);
     
    try {
        let v1xC = parseFloat(v1xStr);
        let v1yC = parseFloat(v1yStr);
        let sf = parseFloat(scalef);

        let v1xA = v1xC; 
        let v1yA = v1yC;
        console.log(1);
        let v2xC = v1xA * sf;
        let v2yC = v1yA * sf;
        console.log("Created variable v2xC");
        let v2xA = v2xC;
        let v2yA = v2yC;
        let v2xStr = v2xA.toString();
        let v2yStr = v2yA.toString();

        //console.log(v1xC); //console.log(v1yC);

        let v1x = convertToSVGSmall(v1xC, "x");
        console.log("y component of first value");
        console.log(v1yC);
        let v1y = convertToSVGSmall(v1yC, "y");
        //console.log("CONVERTED TO SVG")
        //console.log(v1y);
        let v2x = convertToSVGSmall(v2xC, "x");
        let v2y = convertToSVGSmall(v2yC, "y");

        //console.log("CONVERT TO SVGSMALL");
        //console.log(v1x); console.log(v1y);

        let v1xSVGStr = v1x.toString();
        let v1ySVGStr = v1y.toString();
        let v2xSVGStr = v2x.toString();
        let v2ySVGStr = v2y.toString();

        let v1xB = convertToSVGBig(v1xA, "x");
        let v1yB = convertToSVGBig(v1yA, "y");
        let v2xB = convertToSVGBig(v2xA, "x");
        let v2yB = convertToSVGBig(v2yA, "y");
        

        //v2xB += v1xB;
        //v2yB += v1yB;

        let v1xBStr = v1xB.toString();
        let v1yBStr = v1yB.toString();
        let v2xBStr = v2xB.toString();
        let v2yBStr = v2yB.toString();

        //console.log(v1xSVGStr); console.log(v1ySVGStr);
        //console.log(v2xSVGStr); console.log(v2ySVGStr);

        let line1 = elID("line1");

        line1.setAttribute("x1", "100");
        line1.setAttribute("y1", "100");
        line1.setAttribute("x2", v1xSVGStr);
        line1.setAttribute("y2", v1ySVGStr);
        

        let line3 = elID("line3");

        line3.setAttribute("x1", "250");
        line3.setAttribute("y1", "250");
        line3.setAttribute("x2", v1xBStr);
        line3.setAttribute("y2", v1yBStr);
        
        line3.setAttribute("stroke-width", "2");


        let line5 = elID("line5");

        line5.setAttribute("x1", "250");
        line5.setAttribute("y1", "250");
        line5.setAttribute("x2", v2xBStr);
        line5.setAttribute("y2", v2yBStr);
        line5.setAttribute("stroke-width", "4");

        elID("v1output").innerHTML = scalef.toString();
        elID("v2output").innerHTML = v1xStr.toString() + "<br>" + v1yStr.toString();
        elID("v3output").innerHTML = (Math.round( (v1xStr*scalef) * 100000 ) / 100000).toString() + "<br>" + (Math.round( (v1yStr*scalef) * 100000 ) / 100000).toString();



    } catch(error) {
        console.log(error);
    }

}

