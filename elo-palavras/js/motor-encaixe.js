// motor-encaixe.js
// Gerenciador de Fases e Lógica de Distribuição

const configJogo = {
    linhas: 10, colunas: 10,
    // As 10 fases do jogo - Temas Nostálgicos
    fases: [
        ["ZECOLMEIA", "BOBIFILHO", "NOSTALGIA", "CINEMA", "PIPOCA"], // Fase 1
        ["BATMAN", "CORINGA", "GOTHAM", "HEROI", "CAPA"],            // Fase 2
        ["PICAPAU", "LEONCIO", "ARVORE", "MADEIRA", "PENAS"],       // Fase 3
        ["CHAVES", "KIKO", "CHIQUINHA", "MADRUGA", "BARRIL"],        // Fase 4
        ["MARIO", "LUIGI", "COGUMELO", "PRINCESA", "CASTELO"],       // Fase 5
        ["MATRIX", "NEO", "TRINITY", "MORPHEUS", "ORACULO"],         // Fase 6
        ["TOYSTORY", "WOODY", "BUZZ", "ANDY", "BRINQUEDO"],          // Fase 7
        ["HARRY", "RONY", "HERMIONE", "MAGIA", "VARINHA"],           // Fase 8
        ["STARWARS", "JEDI", "VADER", "SABRE", "YODA"],              // Fase 9
        ["VINGADORES", "STARK", "THOR", "HULK", "THANOS"]            // Fase 10
    ]
};

let faseAtual = 0;
let gradeMatematica = [];

function inicializarMotor() {
    // Cria grade limpa
    gradeMatematica = Array(configJogo.linhas).fill(null).map(() => Array(configJogo.colunas).fill(''));
    
    // Puxa as palavras da fase atual
    const palavrasDaFase = configJogo.fases[faseAtual];
    
    // Tenta encaixar cada uma
    for (const palavra of palavrasDaFase) {
        colocarPalavraNaGrade(palavra);
    }
    
    // Preenche o resto com letras aleatórias
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
        const direcao = Math.floor(Math.random() * 2); // 0 Horiz, 1 Vert
        let linhaStart = Math.floor(Math.random() * configJogo.linhas);
        let colunaStart = Math.floor(Math.random() * configJogo.colunas);
        let cabeECombina = true;

        if (direcao === 0) {
            if (colunaStart + palavra.length > configJogo.colunas) continue;
            for (let j = 0; j < palavra.length; j++) {
                const letra = gradeMatematica[linhaStart][colunaStart + j];
                if (letra !== '' && letra !== palavra[j]) { cabeECombina = false; break; }
            }
            if (cabeECombina) {
                for (let j = 0; j < palavra.length; j++) gradeMatematica[linhaStart][colunaStart + j] = palavra[j];
                colocada = true; break;
            }
        } else {
            if (linhaStart + palavra.length > configJogo.linhas) continue;
            for (let j = 0; j < palavra.length; j++) {
                const letra = gradeMatematica[linhaStart + j][colunaStart];
                if (letra !== '' && letra !== palavra[j]) { cabeECombina = false; break; }
            }
            if (cabeECombina) {
                for (let j = 0; j < palavra.length; j++) gradeMatematica[linhaStart + j][colunaStart] = palavra[j];
                colocada = true; break;
            }
        }
    }
}

function avancarFaseMatematica() {
    if (faseAtual < configJogo.fases.length - 1) {
        faseAtual++;
        inicializarMotor();
        return true;
    }
    return false;
}

// Exportações para o arquivo de Interação
function obterGrade() { return gradeMatematica; }
function obterPalavras() { return configJogo.fases[faseAtual]; }
function obterConfig() { return configJogo; }
function obterFaseNumero() { return faseAtual + 1; }

inicializarMotor();
