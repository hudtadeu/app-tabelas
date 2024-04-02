document.addEventListener("DOMContentLoaded", function () {
  const base64Credentials = sessionStorage.getItem("token");

  if (!base64Credentials) {
    console.error("base64Credentials não encontrado na sessionStorage");
    return;
  }

  fetch(
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa",
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
            <td>${item["cod-estabel"]}</td>
            <td>${item["cgc"]}</td>
            <td>${item["ins-municipal"]}</td>
            <td>${item["inscr-estad"]}</td>
            <td>${item["razao-social"]}</td>
            <td>
              <button id="detalharBtn${index}" type="button" class="btn btn-primary" title="Detalhar">
                <i class="bi bi-eye icon-small"></i>
              </button>
              <button type="button" class="btn btn-warning" title="Editar">
                <i class="bi bi-pencil icon-small"></i>
              </button>
              <button type="button" class="btn btn-danger" title="Excluir">
                <i class="bi bi-trash icon-small"></i>
              </button>
            </td>
          `;
          tableBody.appendChild(row);

          // Adiciona evento de clique para o botão de detalhar
          document
            .getElementById(`detalharBtn${index}`)
            .addEventListener("click", function () {
              detalharModal(item["cod-estabel"]);
            });
        });
      } else {
        console.error("Nenhum item encontrado na resposta.");
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar dados da API:", error);
    });
});

function detalharModal(epCodigo) {
  const url =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/?ep-codigo=" +
    epCodigo;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao solicitar os detalhes da empresa");
      }
      return response.json();
    })

    .then((data) => {
      const modalBody = document.getElementById("modalBody");
      modalBody.innerHTML = ""; // Limpa o conteúdo anterior do modal

      // Cria uma tabela
      const table = document.createElement("table");
      table.classList.add("table");

      // Cria o corpo da tabela
      const tbody = document.createElement("tbody");

      // Adiciona uma linha para cada chave-valor nos dados
      for (const key in data) {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.textContent = key;
        const td = document.createElement("td");
        td.textContent = data[key];
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      }

      // Adiciona o corpo da tabela à tabela
      table.appendChild(tbody);

      // Adiciona a tabela ao corpo do modal
      modalBody.appendChild(table);

      // Abrir o modal
      $("#detalhesModal").modal("show");
    });
}

function editarEmpresa(epCodigo) {
  // Implemente a lógica para obter os dados atualizados da empresa, seja através de um modal de edição ou outro método

  // Exemplo de dados atualizados
  const dadosAtualizados = {
    // Insira os dados atualizados da empresa aqui
    razao_social: "Nova Razão Social",
    cgc: "Novo CGC",
    // Etc...
  };

  // URL para enviar a solicitação PUT
  const url =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/?ep-codigo=" +
    epCodigo;

  fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(dadosAtualizados),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao editar empresa");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Empresa editada com sucesso:", data);
      // Atualize a tabela ou faça outras ações necessárias após a edição bem-sucedida
    })
    .catch((error) => {
      console.error("Erro ao editar empresa:", error);
    });
}

function excluirEmpresa(epCodigo) {
  // URL para enviar a solicitação DELETE
  const url =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/?ep-codigo=" +
    epCodigo;

  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erro ao excluir empresa");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Empresa excluída com sucesso:", data);
      // Atualize a tabela ou faça outras ações necessárias após a exclusão bem-sucedida
    })
    .catch((error) => {
      console.error("Erro ao excluir empresa:", error);
    });
}
