// interacao.js
document.addEventListener("DOMContentLoaded", () => {
    let moedas = 10; 
    let palavrasNaoEncontradas = [];
    let letrasSelecionadas = []; 

    function renderizarJogo() {
        const gridVisual = document.getElementById("tabuleiro-grid");
        const listaVisual = document.getElementById("palavras-alvo");
        
        // Limpa a tela para a nova fase
        gridVisual.innerHTML = "";
        listaVisual.innerHTML = "";
        letrasSelecionadas = [];
        
        const config = obterConfig();
        const gradeMatematica = obterGrade();
        const palavras = obterPalavras();
        palavrasNaoEncontradas = [...palavras];
        
        // Atualiza o topo: Fase e Moedas
        document.getElementById("nivel-display").textContent = "Fase " + obterFaseNumero();
        atualizarPlacarMoedas();

        gridVisual.style.gridTemplateColumns = `repeat(${config.colunas}, 40px)`;

        // Cria o tabuleiro
        for (let l = 0; l < config.linhas; l++) {
            for (let c = 0; c < config.colunas; c++) {
                const celula = document.createElement("div");
                celula.className = "celula";
                celula.textContent = gradeMatematica[l][c];
                
                celula.addEventListener("click", () => {
                    if (celula.classList.contains("encontrada")) return;

                    if (celula.classList.contains("selecionada")) {
                        celula.classList.remove("selecionada");
                        letrasSelecionadas = letrasSelecionadas.filter(el => el !== celula);
                    } else {
                        celula.classList.add("selecionada");
                        letrasSelecionadas.push(celula);
                        verificarJogada(); 
                    }
                });
                gridVisual.appendChild(celula);
            }
        }

        // Cria a lista de palavras
        palavras.forEach(palavra => {
            const li = document.createElement("li");
            li.textContent = palavra;
            listaVisual.appendChild(li);
        });
    }

    function atualizarPlacarMoedas() {
        document.getElementById("moedas-valor").textContent = moedas;
    }

    function verificarJogada() {
        const formada = letrasSelecionadas.map(el => el.textContent).join('');
        const invertida = formada.split('').reverse().join('');

        let acertou = null;
        if (palavrasNaoEncontradas.includes(formada)) acertou = formada;
        else if (palavrasNaoEncontradas.includes(invertida)) acertou = invertida;

        if (acertou) {
            // SUCESSO: Letras ficam verdes
            letrasSelecionadas.forEach(el => {
                el.classList.remove("selecionada");
                el.classList.add("encontrada");
            });
            letrasSelecionadas = []; 

            // Risca na lista
            const itens = document.querySelectorAll("#palavras-alvo li");
            itens.forEach(li => { if (li.textContent === acertou) li.classList.add("riscada"); });

            palavrasNaoEncontradas = palavrasNaoEncontradas.filter(p => p !== acertou);

            // VITÓRIA NA FASE
            if (palavrasNaoEncontradas.length === 0) {
                if (typeof confetti === 'function') {
                    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
                }
                
                moedas += 5; // Bônus por fase
                
                setTimeout(() => {
                    const proxima = avancarFaseMatematica();
                    if (proxima) {
                        alert("Fase Concluída! +5 Moedas 🪙");
                        renderizarJogo();
                    } else {
                        alert("🏆 INCRÍVEL! Você completou as 10 fases!");
                    }
                }, 1500);
            }
            return;
        }

        // LÓGICA DE ERRO: Se a seleção não for caminho para nenhuma palavra
        const possivel = palavrasNaoEncontradas.some(p => p.startsWith(formada) || p.startsWith(invertida));

        if (!possivel && formada.length > 1) {
            moedas -= 1; // Gasta moeda no erro
            atualizarPlacarMoedas();
            
            letrasSelecionadas.forEach(el => {
                el.classList.remove("selecionada");
                el.classList.add("erro");
            });
            
            const temporario = [...letrasSelecionadas];
            letrasSelecionadas = [];
            
            setTimeout(() => {
                temporario.forEach(el => el.classList.remove("erro"));
            }, 400);

            if (moedas <= 0) {
                alert("Game Over! Suas moedas acabaram.");
                location.reload(); 
            }
        }
    }

    renderizarJogo();
});
