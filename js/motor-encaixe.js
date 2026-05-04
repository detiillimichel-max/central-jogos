// motor-encaixe.js
// Aqui fica APENAS a lógica e os dados do jogo. Nada de design.

const configJogo = {
    linhas: 10,
    colunas: 10,
    palavras: ["ZECOLMEIA", "BOBIFILHO", "NOSTALGIA", "CINEMA", "PIPOCA"]
};

let gradeMatematica = [];

function inicializarMotor() {
    // 1. Cria uma grade vazia
    gradeMatematica = Array(configJogo.linhas).fill(null).map(() => Array(configJogo.colunas).fill(''));
    
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    // 2. Preenche com letras aleatórias (Base do MVP para testarmos a interface)
    for (let l = 0; l < configJogo.linhas; l++) {
        for (let c = 0; c < configJogo.colunas; c++) {
            gradeMatematica[l][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
        }
    }
    
    // 3. Injeta a primeira palavra na primeira linha só para testarmos se o visual carrega
    const palavraTeste = configJogo.palavras[0];
    for(let i = 0; i < palavraTeste.length; i++) {
        if(i < configJogo.colunas) {
            gradeMatematica[0][i] = palavraTeste[i];
        }
    }
}

// Funções para exportar os dados para o ficheiro de interface
function obterGrade() {
    return gradeMatematica;
}

function obterPalavras() {
    return configJogo.palavras;
}

function obterConfig() {
    return configJogo;
}

// Roda a matemática assim que o ficheiro carrega
inicializarMotor();

