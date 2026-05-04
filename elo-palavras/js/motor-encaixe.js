// motor-encaixe.js
// Motor real: calcula posições, interseções e distribui as palavras.

const configJogo = {
    linhas: 10,
    colunas: 10,
    palavras: ["ZECOLMEIA", "BOBIFILHO", "NOSTALGIA", "CINEMA", "PIPOCA"]
};

let gradeMatematica = [];

function inicializarMotor() {
    // 1. Cria a grade vazia preenchida com espaços em branco
    gradeMatematica = Array(configJogo.linhas).fill(null).map(() => Array(configJogo.colunas).fill(''));
    
    // 2. Tenta colocar cada palavra na grade
    for (const palavra of configJogo.palavras) {
        colocarPalavraNaGrade(palavra);
    }
    
    // 3. Preenche os espaços que sobraram com letras aleatórias
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let l = 0; l < configJogo.linhas; l++) {
        for (let c = 0; c < configJogo.colunas; c++) {
            if (gradeMatematica[l][c] === '') {
                gradeMatematica[l][c] = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            }
        }
    }
}

function colocarPalavraNaGrade(palavra) {
    const maxTentativas = 100;
    let colocada = false;

    for (let i = 0; i < maxTentativas; i++) {
        // Sorteia a direção: 0 para Horizontal, 1 para Vertical
        const direcao = Math.floor(Math.random() * 2);
        let linhaStart = Math.floor(Math.random() * configJogo.linhas);
        let colunaStart = Math.floor(Math.random() * configJogo.colunas);

        let cabeECombina = true;

        if (direcao === 0) { // Horizontal
            // Verifica se a palavra cabe na linha
            if (colunaStart + palavra.length > configJogo.colunas) continue;
            
            // Verifica colisões e cruzamentos perfeitos
            for (let j = 0; j < palavra.length; j++) {
                const letraAtual = gradeMatematica[linhaStart][colunaStart + j];
                if (letraAtual !== '' && letraAtual !== palavra[j]) {
                    cabeECombina = false;
                    break;
                }
            }
            
            // Se coube perfeitamente, escreve a palavra na grade
            if (cabeECombina) {
                for (let j = 0; j < palavra.length; j++) {
                    gradeMatematica[linhaStart][colunaStart + j] = palavra[j];
                }
                colocada = true;
                break;
            }
            
        } else { // Vertical
            // Verifica se a palavra cabe na coluna
            if (linhaStart + palavra.length > configJogo.linhas) continue;
            
            // Verifica colisões e cruzamentos perfeitos
            for (let j = 0; j < palavra.length; j++) {
                const letraAtual = gradeMatematica[linhaStart + j][colunaStart];
                if (letraAtual !== '' && letraAtual !== palavra[j]) {
                    cabeECombina = false;
                    break;
                }
            }
            
            // Se coube perfeitamente, escreve a palavra na grade
            if (cabeECombina) {
                for (let j = 0; j < palavra.length; j++) {
                    gradeMatematica[linhaStart + j][colunaStart] = palavra[j];
                }
                colocada = true;
                break;
            }
        }
    }
    
    // Log de segurança caso a grade seja pequena demais para a palavra
    if (!colocada) {
        console.warn("Atenção: Não houve espaço para a palavra " + palavra);
    }
}

// Funções de exportação seguras (A interface consome isso)
function obterGrade() { return gradeMatematica; }
function obterPalavras() { return configJogo.palavras; }
function obterConfig() { return configJogo; }

// Inicia o motor matemático assim que o arquivo é carregado
inicializarMotor();
