// Selciona os elementos do DOM
const form = document.getElementById("form-cadastro");
const lista = document.getElementById("clientes");

// Carrega clientes do localStorage ao iniciar
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
renderizarClientes();

let indexEditando = null;

// Função ao enviar o formulário
form.addEventListener("submit", function (e) {
    e.preventDefault(); // impede o recarregamento da página

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const observacoes = document.getElementById("observacoes").value.trim();

    if (!nome || !telefone || !endereco) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    if(indexEditando !== null) {
        // Atualiza cliente existente
        clientes[indexEditando] = {nome, telefone, endereco, observacoes };
        indexEditando = null;

        // Volta o texto do botão para "Cadastrar Cliente"
        form.querySelector("button").textContent = "Cadastrar Cliente";
    } else {
        // Cadastra novo cliente
        const cliente = {nome, telefone, endereco, observacoes };
        clientes.push(cliente);
    }

    localStorage.setItem("clientes", JSON.stringify(clientes));
    renderizarClientes();
    form.reset(); // limpa o formulário
});

// Função para renderizar a lista de clientes
function renderizarClientes() {
    lista.innerHTML = ""; // limpa antes de renderizar novamente

    clientes.forEach((cliente, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <strong>${cliente.nome}</storng><br>
        📞 ${cliente.telefone}<br>
        📍 ${cliente.endereco}<br>
        📝 ${cliente.observacoes || "Sem observações"}
        `;

        // Botão Editar
        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.style.marginTop = "0.5rem";
        btnEditar.style.marginRight = "0.5rem";
        btnEditar.onclick = () => editarCliente(index);

        // Botão Remover
        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.style.marginTop = "0.2rem";
        btnRemover.onclick = () => removerCliente(index);

        // Adiciona os botões no elemento <li>
        li.appendChild(document.createElement("br"));
        li.appendChild(btnEditar);
        li.appendChild(btnRemover);

        lista.appendChild(li);
    });
}

// Função para remover cliente da lista
function removerCliente(index) {
    if (confirm("Deseja remover este cliente?")) {
        clientes.splice(index, 1);
        localStorage.setItem("clientes", JSON.stringify(clientes));
        renderizarClientes();
    }
}

// Função para Editar Cliente
function editarCliente(index) {
    const cliente = clientes[index];

    document.getElementById("nome").value = cliente.nome;
    document.getElementById("telefone").value = cliente.telefone;
    document.getElementById("endereco").value = cliente.endereco;
    document.getElementById("observacoes").value = cliente.observacoes;

    indexEditando = index;
    form.querySelector("button").textContent = "Atualizar Cliente";
}