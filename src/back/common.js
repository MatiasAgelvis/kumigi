function circular(X, i) {
    return X[i % X.length];
}

function parseArrayString(arrayString, callback = (x) => x) {
    return (
        arrayString
            // remove brackets
            .replace(/\[|\]/g, "")
            // replace , not inside parenthesis with |
            .replace(/,(?![^(]*\))/g, "|")
            // split by |
            .split("|")
            // ensure that all characters are lowercase
            .map(callback)
    );
}

function applyLayers(avatar, layers) {
    for (let [key, layer] of Object.entries(layers)) {
        if (layer.shape) {
            if (layer.shape != "text") {
                avatar[layer.shape](layer.color);
            } else {
                avatar[layer.shape](layer.text, layer.color, layer.font);
            }
        }
    }
}

const hexColorRegex = require("hex-color-regex");
function testHexColor(color) {
    return hexColorRegex().test("#" + color);
}

module.exports = { circular, parseArrayString, applyLayers, testHexColor };
