document.addEventListener("DOMContentLoaded", function () {
  const base64Credentials = sessionStorage.getItem("token");

  if (!base64Credentials) {
    console.error("base64Credentials não encontrado na sessionStorage");
    return;
  }

  fetch(
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestUsuarioLoader",
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao solicitar os dados da API");
      }
      return response.json();
    })
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const tableBody = document.getElementById("table-body");
        data.items.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
          <td>${item["cod-usuario"]}</td>
          <td>${item["cod-estabel"]}</td>
          <td>${item["l-importa"]}</td>
          <td>${item["l-elimina"]}</td>
          <td>${item["l-cancela-doc"]}</td>
          <td>${item["l-altera-cfop"]}</td>
          <td>${item["l-atualiza"]}</td>
          <td>${item["l-efetua-download"]}</td>
          <td>${item["l-arquiva-xml"]}</td>
          <td>${item["l-manifesta"]}</td>
          <td>${item["l-prioriza-documento"]}</td>
          <td>${item["l-recebe-fiscal"]}</td>
          <td>${item["l-recebe-fisico"]}</td>
          <td>
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="bi bi-three-dots"></i>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">Visualizar</a>
                    <a class="dropdown-item" href="#">Editar</a>
                    <a class="dropdown-item" href="#">Duplicar</a>
                    <a class="dropdown-item" href="#">Exportar</a>
                    <a class="dropdown-item red-text" href="#">Excluir</a>
                  </div>
                </div>
              </td>
        `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Nenhum item encontrado na resposta.");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar dados da API:", error);
    });
});

document.addEventListener("DOMContentLoaded", function () {
  // Função para abrir o modal de novo usuário
  function openModal() {
    // Código para abrir o modal aqui
    console.log("Abrir modal de novo usuário");
  }

  // Adiciona evento de clique ao botão de novo usuário
  document.getElementById("new").addEventListener("click", openModal);

  // Função para alternar a direção da seta
  function toggleArrow(element) {
    if (element.classList.contains("bi-caret-up-fill")) {
      element.classList.remove("bi-caret-up-fill");
      element.classList.add("bi-caret-down-fill");
    } else {
      element.classList.remove("bi-caret-down-fill");
      element.classList.add("bi-caret-up-fill");
    }
  }

  // Adicionar eventos de clique aos ícones de seta nas colunas da tabela
  var arrowIcons = document.querySelectorAll(
    ".bi-caret-up-fill, .bi-caret-down-fill"
  );
  arrowIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      toggleArrow(icon);
      // Aqui você pode adicionar a lógica para classificar a tabela conforme necessário
      // Por exemplo, você pode classificar os dados da tabela com base na coluna clicada
      // e na direção da seta
    });
  });
});
