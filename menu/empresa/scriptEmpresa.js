document.addEventListener("DOMContentLoaded", function () {
  const base64Credentials = sessionStorage.getItem("token");
  const apiUrl = "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa";


  if (!base64Credentials) {
    console.error("base64Credentials não encontrado na sessionStorage");
    return;
  }

  fetch(apiUrl,
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

  function detalharModal(epCodigo) {
    console.log("Código: ", epCodigo);
    const urlDetalhar = `${apiUrl}/?ep-codigo=${epCodigo}`;

    fetch(urlDetalhar, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${sessionStorage.getItem("token")}`,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao solicitar os detalhes da empresa");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Resposta da API de detalhar:", data);
      const modalBody = document.getElementById("modalBody");
      // // Limpa o conteúdo anterior do modal
      // modalBody.innerHTML = "";

      const empresa = data.items[0]; // Acessando o primeiro item
      console.log("Empresa:", empresa);

      if (modalBody) {
        modalBody.innerHTML = `
          <p><strong>Código:</strong> ${empresa['cod-estabel']}</p>
          <p><strong>Nome CGC:</strong> ${empresa['cgc']}</p>
          <p><strong>Inscrição Municipal:</strong> ${empresa['ins-municipal']}</p>
          <p><strong>Inscrição Estadual:</strong> ${empresa['inscr-estad']}</p>
          <p><strong>Razão Social:</strong> ${empresa['razao-social']}</p>
        `;
      }
        // Exibe o modal
        $("#detalharModal").modal("show");
  })
    .catch((error) => {
      console.error("Erro ao carregar detalhes da empresa:", error);
    });
  }
});

function editarEmpresa(epCodigo) {
  console.log("Código: ", epCodigo);
  const urlEditar = `${apiUrl}/?ep-codigo=${epCodigo}`;

  const dadosAtualizados = {
    // Insira os dados atualizados da empresa aqui
    cod_estabel: "Novo Estabelecimento",
    cgc: "Novo CGC",
    ins_municipal: "Nova Inscrição Municipal",
    inscr_estad: "Nova Inscrição Estadual",
    razao_social: "Nova Razão Social",
    // Etc...
  };

  fetch(urlEditar, {
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
  console.log("Código: ", epCodigo);
  const urlExcluir = `${apiUrl}/?ep-codigo=${epCodigo}`;

  fetch(urlExcluir, {
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
    })
    .catch((error) => {
      console.error("Erro ao excluir empresa:", error);
    });
}
