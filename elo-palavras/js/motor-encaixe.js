// motor-encaixe.js
const configJogo = {
    linhas: 10,
    colunas: 10,
    palavras: ["ZECOLMEIA", "BOBIFILHO", "NOSTALGIA", "CINEMA", "PIPOCA"]
};

let gradeMatematica = [];

function inicializarMotor() {
    gradeMatematica = Array(configJogo.linhas).fill(null).map(() => Array(configJogo.colunas).fill(''));
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for (let l = 0; l < configJogo.linhas; l++) {
        for (let c = 0; c < configJogo.colunas; c++) {
            gradeMatematica[l][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
        }
    }
    
    const palavraTeste = configJogo.palavras[0];
    for(let i = 0; i < palavraTeste.length; i++) {
        if(i < configJogo.colunas) {
            gradeMatematica[0][i] = palavraTeste[i];
        }
    }
}

function obterGrade() { return gradeMatematica; }
function obterPalavras() { return configJogo.palavras; }
function obterConfig() { return configJogo; }

inicializarMotor();

