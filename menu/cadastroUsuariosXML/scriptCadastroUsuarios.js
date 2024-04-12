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
          <td>${
            item["l-importa"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-elimina"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-cancela-doc"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-altera-cfop"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-atualiza"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-efetua-download"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-arquiva-xml"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-manifesta"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-prioriza-documento"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-recebe-fiscal"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
          <td>${
            item["l-recebe-fisico"]
              ? '<i class="bi bi-check-circle-fill text-success"></i>'
              : '<i class="bi bi-x-circle-fill text-danger"></i>'
          }</td>
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
  function openModal() {
    console.log("Abrir modal de novo usuário");
  }

  document.getElementById("new").addEventListener("click", openModal);

  function toggleArrow(element) {
    if (element.innerHTML === "unfold_more") {
      element.innerHTML = "unfold_less";
    } else {
      element.innerHTML = "unfold_more";
    }
  }

  var arrowIcon = document.getElementById("iconTable");
  arrowIcon.addEventListener("click", function () {
    toggleArrow(arrowIcon);
  });
});
