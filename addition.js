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
        //alert(number);
        let v1 = number * scale;
        let v2 = v1 + 100;
        let value = 200 - v2;
        return value;
    }
    
    return value;
}

function convertToSVGBig(number, xOry) {
    let scale = 20;
    if (xOry == "x") {
        value = number * scale;
        value += 200;
        return value;
    } else if (xOry == "y") {
        let v1 = number * scale;
        let v2 = v1 + 200;
        let value = 400 - v2;
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
    let scale = 20;
    if (xOry == "x") {
        let v1 = (number - 200) / scale;
        let value = v1 / scale;
    } else if (xOry == "y") {
        let v1 = 400 - number;
        let v2 = number - 200;
        let value = v2 / scale;
    }
    return value    
}    



function createVector() {
try {
    let c1 = document.getElementById("canvas1");
    let c2 = document.getElementById("canvas2");
    let c3 = document.getElementById("canvas3");

    let l1 = document.getElementById("l1");
    let l2 = document.getElementById("l2");
    let l3 = document.getElementById("l3");
    let l4 = document.getElementById("l4");
    let l5 = document.getElementById("l5");

    //c1.remove(l1);
    //c2.remove(l2);
    //c3.remove(l3);
    //c3.remove(l4);
    //c3.remove(l5);
    
} catch (error){
    //alert(error);
}


    let v1xStr = document.getElementById("v1x").value;
    let v1yStr = document.getElementById("v1y").value;
    let v2xStr = document.getElementById("v2x").value;
    let v2yStr = document.getElementById("v2y").value;

    //alert(v1xStr); //alert(v1yStr); //alert(v2xStr); //alert(v2yStr);
    
    try {
        let v1xC = parseInt(v1xStr);
        let v2xC = parseInt(v2xStr);
        let v1yC = parseInt(v1yStr);
        let v2yC = parseInt(v2yStr);

        let v1xA = v1xC; 
        let v1yA = v1yC;
        let v2xA = v2xC;
        let v2yA = v2yC;

        //alert(v1xC); //alert(v1yC);

        let v1x = convertToSVGSmall(v1xC, "x");
        //alert("y component of first value");
        //alert(v1yC);
        let v1y = convertToSVGSmall(v1yC, "y");
        //alert("CONVERTED TO SVG")
        //alert(v1y);
        let v2x = convertToSVGSmall(v2xC, "x");
        let v2y = convertToSVGSmall(v2yC, "y");

        //alert("CONVERT TO SVGSMALL");
        //alert(v1x); alert(v1y);

        let v1xSVGStr = v1x.toString();
        let v1ySVGStr = v1y.toString();
        let v2xSVGStr = v2x.toString();
        let v2ySVGStr = v2y.toString();

        let v1xB = convertToSVGBig(v1xA, "x");
        let v1yB = convertToSVGBig(v1yA, "y");
        let v2xB = convertToSVGBig(v2xA + v1xA, "x");
        let v2yB = convertToSVGBig(v2yA + v1yA, "y");
        

        //v2xB += v1xB;
        //v2yB += v1yB;

        let v1xBStr = v1xB.toString();
        let v1yBStr = v1yB.toString();
        let v2xBStr = v2xB.toString();
        let v2yBStr = v2yB.toString();

        //alert(v1xSVGStr); alert(v1ySVGStr);
        //alert(v2xSVGStr); alert(v2ySVGStr);

        let line1 = elID("line1");

        line1.setAttribute("x1", "100");
        line1.setAttribute("y1", "100");
        line1.setAttribute("x2", v1xSVGStr);
        line1.setAttribute("y2", v1ySVGStr);
        line1.setAttribute("stroke", "red");

        let line2 = elID("line2");

        line2.setAttribute("x1", "100");
        line2.setAttribute("y1", "100");
        line2.setAttribute("x2", v2xSVGStr);
        line2.setAttribute("y2", v2ySVGStr);
        line2.setAttribute("stroke", "blue");
        
        let line3 = elID("line3");

        line3.setAttribute("x1", "200");
        line3.setAttribute("y1", "200");
        line3.setAttribute("x2", v1xBStr);
        line3.setAttribute("y2", v1yBStr);
        line3.setAttribute("stroke", "red");

        let line4 = elID("line4");

        line4.setAttribute("x1", v1xBStr);
        line4.setAttribute("y1", v1yBStr);
        line4.setAttribute("x2", v2xBStr);
        line4.setAttribute("y2", v2yBStr);
        line4.setAttribute("stroke", "blue");

        let line5 = elID("line5");

        line5.setAttribute("x1", "200");
        line5.setAttribute("y1", "200");
        line5.setAttribute("x2", v2xBStr);
        line5.setAttribute("y2", v2yBStr);



    } catch(error) {
        alert(error);
    }

}

