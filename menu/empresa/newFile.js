document.addEventListener("DOMContentLoaded", function () {
  const base64Credentials = sessionStorage.getItem("token");
  const apiUrl =
    "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/boRequestEmpresa";

  if (!base64Credentials) {
    console.error("base64Credentials não encontrado na sessionStorage");
    return;
  }

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
    },
  })
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
      },
    })
      .then((response) => {
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
        // Suponha que 'data' seja a resposta da API
        // Suponha que 'data' seja a resposta da API
        // Suponha que 'data' seja a resposta da API
        const empresa = data.items[0]; // Acessando o primeiro item
        console.log("Empresa:", empresa);

        if (modalBody) {
          modalBody.innerHTML = `
    <div id="infoContainer">
      <p><strong>Código:</strong> ${empresa["cod-estabel"]}</p>
      <p><strong>Razão Social:</strong> ${empresa["razao-social"]}</p>
      <p><strong>Pasta de Entrada:</strong> ${empresa["pasta-entrada"]}</p>
      <p><strong>Pasta Processo Email:</strong> ${empresa["pasta-proc-email"]}</p>
      <p><strong>Pasta de Erros:</strong> ${empresa["pasta-erros"]}</p>
      <p><strong>Pasta de Armazenagem:</strong> ${empresa["pasta-armaz"]}</p>
      <p><strong>Pasta de Gravação do Log:</strong> ${empresa["pasta-grava-log"]}</p>
    </div>
    <div id="iconContainer">
      <button id="geralButton">GERAL</button>
      <button id="traducaoButton">TRADUÇÃO</button>
      <button id="configuracoesButton">CONFIGURAÇÕES</button>
      <button id="servidorButton">SERVIDOR RPW</button>
    </div>
  `;

          const infoContainer = modalBody.querySelector("#infoContainer");

          // Funções para exibir informações específicas
          const showGeralInfo = () => {
            infoContainer.innerHTML = `
      <p><strong>Código:</strong> ${empresa["cod-estabel"]}</p>
      <p><strong>Razão Social:</strong> ${empresa["razao-social"]}</p>
      <p><strong>Pasta de Entrada:</strong> ${empresa["pasta-entrada"]}</p>
      <p><strong>Pasta Processo Email:</strong> ${empresa["pasta-proc-email"]}</p>
      <p><strong>Pasta de Erros:</strong> ${empresa["pasta-erros"]}</p>
      <p><strong>Pasta de Armazenagem:</strong> ${empresa["pasta-armaz"]}</p>
      <p><strong>Pasta de Gravação do Log:</strong> ${empresa["pasta-grava-log"]}</p>
    `;
          };

          const showTraducaoInfo = () => {
            // Coloque o código para exibir as informações de tradução aqui
          };

          const showConfiguracoesInfo = () => {
            // Coloque o código para exibir as informações de configurações aqui
          };

          const showServidorInfo = () => {
            // Coloque o código para exibir as informações do servidor RPW aqui
          };

          // Adiciona manipuladores de eventos aos botões
          const geralButton = modalBody.querySelector("#geralButton");
          geralButton.addEventListener("click", () => {
            showGeralInfo();
          });

          const traducaoButton = modalBody.querySelector("#traducaoButton");
          traducaoButton.addEventListener("click", () => {
            showTraducaoInfo();
          });

          const configuracoesButton = modalBody.querySelector(
            "#configuracoesButton"
          );
          configuracoesButton.addEventListener("click", () => {
            showConfiguracoesInfo();
          });

          const servidorButton = modalBody.querySelector("#servidorButton");
          servidorButton.addEventListener("click", () => {
            showServidorInfo();
          });
        }

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
      });
  }
});
