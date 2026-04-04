let tarefas = [];
let plataformaAtual = "";

function abrirPlataforma(nome) {
  plataformaAtual = nome;

  document.getElementById("tarefas").style.display = "block";
  document.getElementById("titulo").innerText = "Tarefas - " + nome;

  carregar();
  renderizar();
}

//ADICIONAR TAREFAS
function adicionarTarefa() {
  let input = document.getElementById("inputTarefa");
  let texto = input.value;

  let data = document.getElementById("data").value;

  if (texto === "" || data === "") {
    alert("Preencha a tarefa e a data!");
    return;
  }

  tarefas.push({
    nome: texto,
    concluida: false,
    plataforma: plataformaAtual,
    data: data,
  });

  input.value = "";
  salvar();
  renderizar();
}

//MOSTRAR TAREFAS
function renderizar() {
  let lista = document.getElementById("lista");
  lista.innerText = "";

  tarefas
    .filter((t) => t.plataforma === plataformaAtual)
    .forEach((tarefa, index) => {
      let item = document.createElement("li");

      item.innerHTML = `
        ${tarefa.nome}
        <button onclick="concluir(${index})">✅</button>`;

      lista.appendChild(item);
    });
}

//CONCLUIR TAREFAS
function concluir(index) {
  tarefas[index].concluida = true;
  salvar();
  renderizar();
}

//SALVAR NO NAVEGADOR
function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregar() {
  let dados = localStorage.getItem("tarefas");
  if (dados) {
    tarefas = JSON.parse(dados);
  }
}

function fecharTarefas() {
  document.getElementById("tarefas").style.display = "none";
}

function abrirPlataforma(nome) {
  plataformaAtual = nome;

  document.querySelector(".cards").style.display = "none";
  document.getElementById("tarefas").style.display = "block";
  document.getElementById("titulo").innerText = "Tarefas - " + nome;

  carregar();
  renderizar();
}

function fecharTarefas() {
  document.querySelector(".cards").style.display = "grid";
  document.getElementById("tarefas").style.display = "none";
}

//BARRA DE PROGRESSO FUNCIONAL
function atualizarProgresso() {
  console.log("Atualizando progresso...");

  let total = tarefas.length;
  let concluidas = tarefas.filter((t) => t.concluida).length;

  let porcentagem = 0;

  if (total > 0) {
    porcentagem = Math.round((concluidas / total) * 100);
  }

  document.getElementById("porcentagem").innerText = porcentagem + "%";

  let circulo = document.querySelector(".progress");
  circulo.style.background = `conic-gradient(#356bd3 ${porcentagem}%, #ddd ${porcentagem}%)`;
}

//VERIFICAR SE HÁ ALGO PENDENTE E COLOCAR O SININHO
function verificarAlertas() {
  let plataformas = [
    "Redacao",
    "Leia",
    "Teens",
    "High",
    "Desafio",
    "Khan",
    "Matific",
    "Class",
    "Quizziz",
  ];

  plataformas.forEach((nome) => {
    let pendentes = tarefas.filter(
      (t) => t.plataforma === nome && !t.concluida,
    ).length;

    let alerta = document.getElementById("alerta-" + nome);

    if (alerta) {
      if (pendentes > 0) {
        alerta.style.display = "block";
        alerta.innerText = pendentes;
      } else {
        alerta.style.display = "none";
        alerta.innerText = "";
      }
    }
  });
}

function renderizar() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    if (tarefa.plataforma === plataformaAtual) {
      let item = document.createElement("li");

      item.innerHTML = `
         <span class="${tarefa.concluida ? "concluida" : ""}"><br>
          ${tarefa.nome}
           <p>A data de entrega dessa atividade é:</p>
          ${tarefa.data ? new Date(tarefa.data).toLocaleString("pt-BR") : ""}
        </span><br>
        <button onclick="concluir(${index})"  class="botoes_tarefa"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg></button>
        <button onclick="excluir(${index})" class= "botoes_tarefa" ><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
        </svg></button>
      `;

      lista.appendChild(item);
    }
  });

  salvar();
  atualizarProgresso();
  verificarAlertas();
}

//EXCLUIR TAREFA
function excluir(index) {
  tarefas.splice(index, 1);
  salvar();
  renderizar();
}
 