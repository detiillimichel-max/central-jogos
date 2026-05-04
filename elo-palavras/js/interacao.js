// interacao.js - Versão "Luxury Presentation"
document.addEventListener("DOMContentLoaded", () => {
    let moedas = 10;
    let palavrasNaoEncontradas = [];
    let letrasSelecionadas = [];

    function renderizarJogo() {
        const gridVisual = document.getElementById("tabuleiro-grid");
        const listaVisual = document.getElementById("palavras-alvo");
        
        gridVisual.innerHTML = "";
        listaVisual.innerHTML = "";
        letrasSelecionadas = [];
        
        const config = obterConfig();
        const gradeMatematica = obterGrade();
        const palavras = obterPalavras();
        palavrasNaoEncontradas = [...palavras];
        
        document.getElementById("nivel-display").textContent = "Nível " + obterFaseNumero();
        atualizarPlacarMoedas();

        gridVisual.style.gridTemplateColumns = `repeat(${config.colunas}, 40px)`;

        for (let l = 0; l < config.linhas; l++) {
            for (let c = 0; c < config.colunas; c++) {
                const celula = document.createElement("div");
                celula.className = "celula";
                celula.textContent = gradeMatematica[l][c];
                celula.addEventListener("click", () => selecionarLetra(celula));
                gridVisual.appendChild(celula);
            }
        }

        palavras.forEach(palavra => {
            const li = document.createElement("li");
            li.textContent = palavra;
            listaVisual.appendChild(li);
        });
    }

    function selecionarLetra(celula) {
        if (celula.classList.contains("encontrada")) return;
        celula.classList.toggle("selecionada");
        
        if (celula.classList.contains("selecionada")) {
            letrasSelecionadas.push(celula);
        } else {
            letrasSelecionadas = letrasSelecionadas.filter(el => el !== celula);
        }
        verificarJogada();
    }

    function atualizarPlacarMoedas() {
        const el = document.getElementById("moedas-valor");
        el.style.transform = "scale(1.5)";
        el.textContent = moedas;
        setTimeout(() => el.style.transform = "scale(1)", 200);
    }

    // TELA DE VITÓRIA ESTILO "IMAGEM 3"
    function mostrarTelaVitoria() {
        const overlay = document.createElement("div");
        overlay.className = "luxury-overlay";
        overlay.innerHTML = `
            <div class="slide-vitoria">
                <h2 style="color: #fcd34d; font-size: 3rem;">0${obterFaseNumero()}</h2>
                <h1 style="letter-spacing: 5px;">FASE CONCLUÍDA</h1>
                <p>O SEU PROGRESSO É MONITORADO</p>
                <div class="moedas-ganhas">🪙 +5 CRÉDITOS</div>
                <button onclick="this.parentElement.parentElement.remove()" id="btn-proxima">CONTINUAR</button>
            </div>
        `;
        document.body.appendChild(overlay);

        document.getElementById("btn-proxima").addEventListener("click", () => {
            const proxima = avancarFaseMatematica();
            if (proxima) renderizarJogo();
            else alert("VOCÊ É UM MESTRE!");
        });
    }

    function verificarJogada() {
        const formada = letrasSelecionadas.map(el => el.textContent).join('');
        const invertida = formada.split('').reverse().join('');
        let acertou = palavrasNaoEncontradas.includes(formada) ? formada : (palavrasNaoEncontradas.includes(invertida) ? invertida : null);

        if (acertou) {
            letrasSelecionadas.forEach(el => {
                el.classList.replace("selecionada", "encontrada");
            });
            const itens = document.querySelectorAll("#palavras-alvo li");
            itens.forEach(li => { if (li.textContent === acertou) li.classList.add("riscada"); });
            
            palavrasNaoEncontradas = palavrasNaoEncontradas.filter(p => p !== acertou);
            letrasSelecionadas = [];

            if (palavrasNaoEncontradas.length === 0) {
                moedas += 5;
                if (typeof confetti === 'function') confetti({ particleCount: 200, spread: 100 });
                setTimeout(mostrarTelaVitoria, 500);
            }
        }
        // Lógica de erro simplificada para não travar no mobile
        else if (letrasSelecionadas.length > 8) { 
             letrasSelecionadas.forEach(el => el.classList.remove("selecionada"));
             letrasSelecionadas = [];
        }
    }

    renderizarJogo();
});
