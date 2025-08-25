function soma (primeiro_numero, segundo_numero) {
    return primeiro_numero + segundo_numero
}

function subtracao (primeiro_numero, segundo_numero) {
    return primeiro_numero - segundo_numero
}


function multiplicacao (primeiro_numero, segundo_numero) {
    return primeiro_numero * segundo_numero
}

function divisao(primeiro_numero, segundo_numero) {
    if (segundo_numero == 0) {
        return "Não é possível fazer divisão por 0";
    } else {
        return primeiro_numero / segundo_numero;
    }
}

function quadrado (primeiro_numero) {
    return primeiro_numero * primeiro_numero
}

function raizQuad (primeiro_numero) {
    return primeiro_numero / primeiro_numero
}

module.exports = {
    soma,
    subtracao,
    multiplicacao,
    divisao,
    quadrado,
    raizQuad
}
