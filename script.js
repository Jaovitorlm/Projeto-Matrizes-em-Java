// Cria os inputs para entrada da matriz
function criarInputsMatriz(size, matrizId) {
    let matrizContainer = document.getElementById(matrizId);
    matrizContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    matrizContainer.innerHTML = ""; // Limpa antes de criar
    
    for (let i = 0; i < size * size; i++) {
        let input = document.createElement("input");
        input.type = "number";
        input.value = 0;
        matrizContainer.appendChild(input);
    }
}

function exibirMatriz(matriz, resultadoId, titulo) {
    let resultadoContainer = document.getElementById(resultadoId);
    resultadoContainer.innerHTML = ""; // Limpa antes de exibir
    
    let title = document.createElement("h3");
    title.textContent = titulo;
    resultadoContainer.appendChild(title); // Adiciona o título no resultado

    let table = document.createElement("table"); // Cria uma tabela para exibir a matriz

    for (let i = 0; i < matriz.length; i++) {
        let row = document.createElement("tr"); // Cria uma linha
        for (let j = 0; j < matriz[i].length; j++) {
            let cell = document.createElement("td"); // Cria uma célula
            cell.textContent = matriz[i][j]; // Adiciona o número na célula
            row.appendChild(cell); // Adiciona a célula na linha
        }
        table.appendChild(row); // Adiciona a linha na tabela
    }

    resultadoContainer.appendChild(table); // Exibe a matriz na tela
}

let tamanhoMatriz = { matrizA: 3, matrizB: 3 }; // Tamanho inicial

function alterarTamanhoMatriz(matrizId, operacao) {
    if (operacao === "aumentar") {
        if (tamanhoMatriz[matrizId] < 6) { // Máximo 6x6
            tamanhoMatriz[matrizId]++;
        }
    } else if (operacao === "diminuir") {
        if (tamanhoMatriz[matrizId] > 2) { // Mínimo 2x2
            tamanhoMatriz[matrizId]--;
        }
    }
    criarInputsMatriz(tamanhoMatriz[matrizId], matrizId); // Recria os inputs
}

function calcularTransposta(matrizId) {
    let inputs = document.querySelectorAll(`#${matrizId} input`);
    let size = Math.sqrt(inputs.length); // Calcula o tamanho da matriz
    
    let matriz = [];
    for (let i = 0; i < size; i++) {
        matriz[i] = [];
        for (let j = 0; j < size; j++) {
            matriz[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }
    console.log(inputs);
    console.log("Matriz original:", matriz); // Verifica se os valores estão sendo lidos corretamente

    let matrizTransposta = [];
    for (let i = 0; i < size; i++) {
        matrizTransposta[i] = [];
        for (let j = 0; j < size; j++) {
            matrizTransposta[i][j] = matriz[j][i]; // Inverte os índices
        }
    }

    console.log("Matriz transposta:", matrizTransposta); // Verifica a transposta
    let resultadoId = matrizId === "matrizA" ? "resultadoA" : "resultadoB";
    exibirMatriz(matrizTransposta, resultadoId, "Matriz Transposta");

}

function calcularInversa(matrizId) {
    let inputs = document.querySelectorAll(`#${matrizId} input`);
    let size = Math.sqrt(inputs.length);

    let matriz = [];
    for (let i = 0; i < size; i++) {
        matriz[i] = [];
        for (let j = 0; j < size; j++) {
            matriz[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }

    let determinante = math.det(matriz); // Calcula o determinante

    let matrizInversa;
    if (Math.abs(determinante) < 1e-10) { // Verifica se é próximo de zero
        matrizInversa = [["Não é inversível"]];
    } else {
        matrizInversa = math.inv(matriz); // Calcula a inversa usando math.js
        
        // Converter valores para frações
        matrizInversa = matrizInversa.map(row => row.map(value => decimalParaFracao(value)));
        console.log(matrizInversa)
    }

    let resultadoId = matrizId === "matrizA" ? "resultadoA" : "resultadoB";
    exibirMatriz(matrizInversa, resultadoId, "Matriz Inversa");
}

function calcularDeterminante(matrizId) {
    let inputs = document.querySelectorAll(`#${matrizId} input`);
    let size = Math.sqrt(inputs.length);

    let matriz = [];
    for (let i = 0; i < size; i++) {
        matriz[i] = [];
        for (let j = 0; j < size; j++) {
            matriz[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }

    let determinante;
    try {
        determinante = math.det(matriz); // Calcula o determinante usando math.js
        determinante = determinante.toFixed(2); // Formata para duas casas decimais
    } catch (error) {
        determinante = "Erro ao calcular";
    }

    let resultadoId = matrizId === "matrizA" ? "resultadoA" : "resultadoB";
    exibirMatriz([[determinante]], resultadoId, "Determinante");
}

function multiplicarPorX (matrizID, multiplicador){
    let inputs = document.querySelectorAll(`#${matrizID} input`)
    let size = Math.sqrt(inputs.length);

    let matriz = [];
    for (let i = 0; i < size; i++) {
        matriz[i] = [];
        for (let j = 0; j < size; j++) {
            matriz[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }

    let matrizMultiplicada = [];
    for (let i = 0; i < size; i++) {
        matrizMultiplicada[i] = [];
        for (let j = 0; j < size; j++) {
            matrizMultiplicada[i][j] = matriz[i][j] * multiplicador; // Multiplica o valor
        }
    }

    let resultadoID = matrizID === "matrizA" ? "resultadoA" : "resultadoB";
    exibirMatriz(matrizMultiplicada, resultadoID, `Matriz multiplicada por ${multiplicador}`)
}

function matrizASomaMatrizB(matrizIDA, matrizIDB){
    let inputs = document.querySelectorAll(`#${matrizIDA} input`);
    let size = Math.sqrt(inputs.length);

    let matrizA = [];
    for (let i = 0; i < size; i++) {
        matrizA[i] = [];
        for (let j = 0; j < size; j++) {
            matrizA[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }

    inputs = document.querySelectorAll(`#${matrizIDB} input`);
    size = Math.sqrt(inputs.length);

    let matrizB = [];
    for (let i = 0; i < size; i++){
        matrizB[i] = [];
        for (let j = 0; j < size; j++) {
            matrizB[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }
    
    let resultado = [];
    if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
        resultado = [["As matrizes devem ter o mesmo tamanho!"]] ;
        console.log ("entrou no erro")
    } else {

        for (let i = 0; i < size; i++) {
            resultado[i] = [];
            for (let j = 0; j < size; j++) {
                resultado[i][j] = matrizA[i][j] + matrizB[i][j]; 
            }
        }
    }

    exibirMatriz(resultado, "resultadoAB", "Soma de A + B");
    return resultado;
}

function matrizASubstraiMatrizB(matrizIDA, matrizIDB){
    let inputs = document.querySelectorAll(`#${matrizIDA} input`);
    let size = Math.sqrt(inputs.length);

    let matrizA = [];
    for (let i = 0; i < size; i++) {
        matrizA[i] = [];
        for (let j = 0; j < size; j++) {
            matrizA[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }

    inputs = document.querySelectorAll(`#${matrizIDB} input`);
    size = Math.sqrt(inputs.length);

    let matrizB = [];
    for (let i = 0; i < size; i++){
        matrizB[i] = [];
        for (let j = 0; j < size; j++) {
            matrizB[i][j] = parseFloat(inputs[i * size + j].value) || 0;
        }
    }
    
    let resultado = [];
    if (matrizA.length !== matrizB.length || matrizA[0].length !== matrizB[0].length) {
        resultado = [["As matrizes devem ter o mesmo tamanho!"]] ;
        console.log ("entrou no erro")
    } else {
        for (let i = 0; i < size; i++) {
            resultado[i] = [];
            for (let j = 0; j < size; j++) {
                resultado[i][j] = matrizA[i][j] - matrizB[i][j]; 
            }
        }
    }

    exibirMatriz(resultado, "resultadoAB", "Subtração de A - B");
    return resultado;
}

// Botão calcular determinante
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("botaoDeterminanteA").addEventListener("click", function(){
        calcularDeterminante("matrizA");
    });
    document.getElementById("botaoDeterminanteB").addEventListener("click", function(){
        calcularDeterminante("matrizB");
    });
});

// Botão calcular multiplicação
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botaoMultiplicarA").addEventListener("click", function () {
        let multiplicador = parseFloat(document.getElementById("multiplicadorA").value) || 1;
        multiplicarPorX("matrizA", multiplicador);
    });
    document.getElementById("botaoMultiplicarB").addEventListener("click", function () {
        let multiplicador = parseFloat(document.getElementById("multiplicadorB").value) || 1;
        multiplicarPorX("matrizB", multiplicador);
    });
});

//Botão soma entre A e B
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botaoSomarMatrizes").addEventListener("click", function () {
        matrizASomaMatrizB("matrizA", "matrizB");
    });
});

//Botão substração entre A e B
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("botaoSubtrairMatrizes").addEventListener("click", function () {
        matrizASubstraiMatrizB("matrizA", "matrizB");
    });
});

// Adiciona os eventos para os botões de aumentar/diminuir
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("aumentarA").addEventListener("click", function () {
        alterarTamanhoMatriz("matrizA", "aumentar");
    });
    document.getElementById("diminuirA").addEventListener("click", function () {
        alterarTamanhoMatriz("matrizA", "diminuir");
    });

    document.getElementById("aumentarB").addEventListener("click", function () {
        alterarTamanhoMatriz("matrizB", "aumentar");
    });
    document.getElementById("diminuirB").addEventListener("click", function () {
        alterarTamanhoMatriz("matrizB", "diminuir");
    });
});

// Gera as matrizes ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
    criarInputsMatriz(3, "matrizA"); // Cria Matriz A
    criarInputsMatriz(3, "matrizB"); // Cria Matriz B
});

// Botão calcular transposta
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("botaoTranspostaA").addEventListener("click", function(){
        calcularTransposta("matrizA");
    });
    document.getElementById("botaoTranspostaB").addEventListener("click", function(){
        calcularTransposta("matrizB");
    });
});

// Botão calcular inversa
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("botaoInversaA").addEventListener("click", function(){
        calcularInversa("matrizA");
    });
    document.getElementById("botaoInversaB").addEventListener("click", function(){
        calcularInversa("matrizB");
    });
});


function decimalParaFracao(decimal, precisao = 1e-6) {
    if (decimal === 0) return "0";

    let sinal = decimal < 0 ? "-" : "";
    decimal = Math.abs(decimal);

    let numerador = 1, denominador = 1;
    let erro = Math.abs(numerador / denominador - decimal);

    while (erro > precisao) {
        if (numerador / denominador < decimal) {
            numerador++;
        } else {
            denominador++;
            numerador = Math.round(decimal * denominador);
        }
        erro = Math.abs(numerador / denominador - decimal);
    }

    if (denominador === 1) return `${sinal}${numerador}`
    else return `${sinal}${numerador}/${denominador}`;
}



