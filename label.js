// Helper functions for getting elements
function elClass(className) {
    return document.getElementsByClassName(className);
}

function elID(id) {
    return document.getElementById(id);
}

try {
    const line3 = elID("line3");
    const line4 = elID("line4");
    const line5 = elID("line5");
} catch(error) {
    console.log(error);
}


vector1Lbl = elID("vector1Label");

line3.onmousedown = function(event) {
    vector1Lbl.style.display = '';
}