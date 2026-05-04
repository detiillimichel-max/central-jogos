// interacao.js
document.addEventListener("DOMContentLoaded", () => {
    const gridVisual = document.getElementById("tabuleiro-grid");
    const listaVisual = document.getElementById("palavras-alvo");
    
    const config = obterConfig();
    const gradeMatematica = obterGrade();
    const palavras = obterPalavras();

    gridVisual.style.gridTemplateColumns = `repeat(${config.colunas}, 40px)`;

    for (let l = 0; l < config.linhas; l++) {
        for (let c = 0; c < config.colunas; c++) {
            const celula = document.createElement("div");
            celula.className = "celula";
            celula.textContent = gradeMatematica[l][c];
            
            celula.addEventListener("click", () => {
                celula.classList.toggle("selecionada");
            });
            
            gridVisual.appendChild(celula);
        }
    }

    palavras.forEach(palavra => {
        const li = document.createElement("li");
        li.textContent = palavra;
        listaVisual.appendChild(li);
    });
});

