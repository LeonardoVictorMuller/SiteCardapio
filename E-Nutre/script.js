const cardapioNormal = {
    "Domingo": "Feijoada, arroz, couve, farofa e laranja",
    "Segunda": "Frango grelhado, arroz integral, salada verde",
    "Terça": "Carne moída, purê de batata, arroz e feijão",
    "Quarta": "Peixe assado, arroz, salada de alface e tomate",
    "Quinta": "Estrogonofe de frango, arroz e batata palha",
    "Sexta": "Feijoada light, arroz, couve refogada",
    "Sábado": "Lasanha, arroz branco, salada de rúcula"
  };
  
  const cardapioVegano = {
    "Domingo": "Feijoada vegana, arroz, couve, farofa e laranja",
    "Segunda": "Tofu grelhado, arroz integral, salada verde",
    "Terça": "Grão-de-bico, purê de batata, arroz e feijão",
    "Quarta": "Berinjela assada, arroz, alface e tomate",
    "Quinta": "Estrogonofe de grão-de-bico, arroz e batata palha",
    "Sexta": "Feijoada vegana, arroz, couve refogada",
    "Sábado": "Lasanha vegana, arroz branco, salada de rúcula"
  };
  
  const nutricional = {
    "Feijoada": "500 kcal, rica em ferro e proteínas.",
    "Feijoada vegana": "400 kcal, fonte de proteína vegetal e ferro.",
    "Arroz": "200 kcal, carboidrato complexo.",
    "Couve": "50 kcal, rica em fibras e vitamina C.",
    "Farofa": "300 kcal, alta em gorduras.",
    "Laranja": "60 kcal, rica em vitamina C.",
    "Frango grelhado": "250 kcal, proteína magra.",
    "Tofu grelhado": "180 kcal, proteína vegetal e cálcio.",
    "Arroz integral": "180 kcal, rico em fibras.",
    "Salada verde": "30 kcal, vitaminas e minerais.",
    "Carne moída": "280 kcal, fonte de proteína e gordura.",
    "Grão-de-bico": "220 kcal, rico em proteínas vegetais.",
    "Purê de batata": "200 kcal, carboidrato simples.",
    "Feijão": "150 kcal, proteína vegetal e ferro.",
    "Peixe assado": "220 kcal, rico em ômega-3.",
    "Berinjela assada": "90 kcal, rica em antioxidantes.",
    "Alface": "10 kcal, vitamina K.",
    "Tomate": "20 kcal, antioxidantes.",
    "Estrogonofe de frango": "400 kcal, contém creme de leite.",
    "Estrogonofe de grão-de-bico": "350 kcal, versão vegana com leite de coco.",
    "Batata palha": "250 kcal, alto teor de gordura.",
    "Feijoada light": "350 kcal, versão mais leve.",
    "Couve refogada": "80 kcal, fibras e ferro.",
    "Lasanha": "450 kcal, rica em carboidratos e proteínas.",
    "Lasanha vegana": "400 kcal, feita com vegetais e massa integral.",
    "Rúcula": "15 kcal, rica em cálcio e ferro."
  };
  
  const semana = Object.keys(cardapioNormal);
  const weekDiv = document.getElementById("week");
  const modal = document.getElementById("modal");
  const diaModal = document.getElementById("diaModal");
  const nutricao = document.getElementById("nutricao");
  const closeModal = document.getElementById("closeModal");
  const btnNormal = document.getElementById("btnNormal");
  const btnVegano = document.getElementById("btnVegano");
  const editModal = document.getElementById("editModal");
  const editForm = document.getElementById("editForm");
  
  let cardapioAtual = cardapioNormal;
  let modoAtual = "normal";
  
  function renderCardapio() {
    weekDiv.innerHTML = "";
    semana.forEach(dia => {
      const diaDiv = document.createElement("div");
      diaDiv.className = "day";
      diaDiv.innerHTML = `
        <h3>${dia}</h3>
        <div class="menu">${cardapioAtual[dia]}</div>
      `;
      diaDiv.onclick = () => {
        diaModal.innerText = `Informações nutricionais - ${dia}`;
        const ingredientes = cardapioAtual[dia].split(", ");
        nutricao.innerHTML = ingredientes.map(ing => `<b>${ing}</b>: ${nutricional[ing] || 'Sem dados.'}`).join('<br/>');
        modal.style.display = "flex";
      };
      weekDiv.appendChild(diaDiv);
    });
  }
  
  btnNormal.addEventListener('click', () => {
    cardapioAtual = cardapioNormal;
    modoAtual = "normal";
    btnNormal.classList.add("active");
    btnVegano.classList.remove("active");
    renderCardapio();
  });
  
  btnVegano.addEventListener('click', () => {
    cardapioAtual = cardapioVegano;
    modoAtual = "vegano";
    btnVegano.classList.add("active");
    btnNormal.classList.remove("active");
    renderCardapio();
  });
  
  closeModal.onclick = () => {
    modal.style.display = "none";
  };
  
  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
    if (event.target === editModal) editModal.style.display = "none";
  };
  
  function abrirEditor() {
    editForm.innerHTML = "";
    const cardapio = modoAtual === "normal" ? cardapioNormal : cardapioVegano;
    semana.forEach(dia => {
      editForm.innerHTML += `
        <label for="${dia}"><b>${dia}</b></label>
        <textarea id="${dia}">${cardapio[dia]}</textarea>
      `;
    });
    editModal.style.display = "flex";
  }
  
  function fecharEditor() {
    editModal.style.display = "none";
  }
  
  function salvarEdicao() {
    semana.forEach(dia => {
      const valor = document.getElementById(dia).value;
      if (modoAtual === "normal") cardapioNormal[dia] = valor;
      else cardapioVegano[dia] = valor;
    });
    fecharEditor();
    renderCardapio();
  }
  
  window.onload = function() {
    renderCardapio();
  };
  