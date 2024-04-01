document.addEventListener("DOMContentLoaded", function () {
  const base64Credentials = sessionStorage.getItem("token");

  if (base64Credentials) {
    //console.log("base64Credentials: ", base64Credentials);
  } else {
    console.error("base64Credentials não encontrado na sessionStorage");
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
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const tableBody = document.getElementById("table-body");
        data.items.forEach((item) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                  <td>${item["cod-estabel"]}</td>
                  <td>${item["cgc"]}</td>
                  <td>${item["ins-municipal"]}</td>
                  <td>${item["inscr-estad"]}</td>
                  <td>${item["razao-social"]}</td>
                  <td>
                    <button id="detalharBtn" type="button" class="btn btn-primary" title="Detalhar">
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
        });
      } else {
        console.error("Nenhum item encontrado na resposta.");
      }
    })
    .catch((error) => console.error("Erro ao carregar dados da API:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  // Seu código existente para carregar os dados da API

  // Função para detalhar informações de uma empresa com base no código
  function detalharModal(epCodigo) {
    // Construir a URL com base no ep-codigo
    var url =
      "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa/?ep-codigo=" +
      epCodigo;

    // Realizar a solicitação GET usando fetch()
    fetch(url)
      .then((response) => {
        // Verificar se a resposta está ok
        if (!response.ok) {
          throw new Error("Erro ao solicitar os detalhes da empresa");
        }
        // Retornar os dados em formato JSON
        return response.json();
      })
      .then((data) => {
        // Manipular os dados recebidos
        console.log(data); // Aqui você pode processar os dados conforme necessário
      })
      .catch((error) => {
        // Lidar com erros de requisição
        console.error("Erro de requisição:", error);
      });
  }

  // Exemplo de como chamar a função detalharEmpresa ao clicar no ícone de detalhe
  document.getElementById("detalharBtn").addEventListener("click", function () {
    // Abre o modal de detalhar
    $("#detalharModal").modal("show");
  });
});

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
