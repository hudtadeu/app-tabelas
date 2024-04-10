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

        const empresa = data.items[0];
        console.log("Empresa:", empresa);

        if (modalBody) {
          modalBody.innerHTML = `
          <div id="Container">
      <p><strong>Código:</strong> <div class="quadrante"> ${empresa["cod-estabel"]}</div></p>
      <p><strong>Nome:</strong> <div class="quadrante"> ${empresa["nome"]}</div></p>
      <p><strong>Razão Social:</strong> <div class="quadrante"> ${empresa["razao-social"]}</div></p>
      </div>
    <div id="iconContainer">
      <button id="geralButton">GERAL</button>
      <button id="traducaoButton">TRADUÇÃO</button>
      <button id="traducaoButtonb">TRADUÇÃO ||</button>
      <button id="configuracoesButton">CONFIGURAÇÕES</button>
      <button id="servidorButton">SERVIDOR RPW</button>
    </div>
    <div id="infoContainer"></div>
    <div id="infoTraducao"></div>
    <div id="infoTraducaob"></div>
  `;

          const showGeralInfo = () => {
            const infoContainer = document.querySelector("#infoContainer");
            infoContainer.style.display = "block";
            const infoTraducao = document.querySelector("#infoTraducao");
            infoTraducao.style.display = "none";

            const getCheckboxHTML = (condition) => {
              return `
                <input type="checkbox" disabled ${condition ? "checked" : ""}>
              `;
            };

            const armazenamentoNaoArmazena = getCheckboxHTML(
              empresa["cd-armazena"] === 1
            );
            const armazenamentoPastaFisica = getCheckboxHTML(
              empresa["cd-armazena"] === 2
            );
            const armazenamentoBancoDados = getCheckboxHTML(
              empresa["cd-armazena"] === 3
            );

            infoContainer.innerHTML = `
              <p><strong>Código:</strong> ${empresa["cod-estabel"]}</p>
              <p><strong>Razão Social:</strong> ${empresa["razao-social"]}</p>
              <p><strong>Pasta de Entrada:</strong> ${
                empresa["pasta-entrada"]
              }</p>
              <p><strong>Pasta Processo Email:</strong> ${
                empresa["pasta-proc-email"]
              }</p>
              <p><strong>Pasta de Erros:</strong> ${empresa["pasta-erros"]}</p>
              <p><strong>Armazenagem do XML:</strong> <div id="infoArmazena">
                Não Armazena ${armazenamentoNaoArmazena}  
                Armazena Pasta Física ${armazenamentoPastaFisica} 
                Armazena Banco de Dados ${armazenamentoBancoDados}
                </div>
                <div>${
                  empresa["l-pasta-log"]
                    ? '<input type="checkbox" checked disabled>'
                    : "Não"
                } Habilita Pasta Log</div>
              <p><strong>Pasta de Armazenagem:</strong> ${
                empresa["pasta-armaz"]
              }</p>
              <p><strong>Pasta de Gravação do Log:</strong> ${
                empresa["pasta-grava-log"]
              }</p>
            `;
          };

          const getIconHTML = (value) => {
            const iconClass = value ? "icone-verde" : "icone-vermelho";
            const icon = value ? "✔" : "✘";
            return `<span class="${iconClass}">${icon}</span>`;
          };

          const showTraducaoInfo = () => {
            const infoContainer = document.querySelector("#infoContainer");
            infoContainer.style.display = "none";
            const infoTraducao = document.querySelector("#infoTraducao");
            infoTraducao.style.display = "block";

            const getCheckBoxHTML = (value) => {
              if (value === true) {
                return '<input type="checkbox" checked>';
              } else {
                return '<input type="checkbox">';
              }
            };

            infoTraducao.innerHTML = `
              <p><strong>Utiliza Item Cliente/Fornecedor:</strong> ${getCheckBoxHTML(
                empresa["l-item-fornec"]
              )}</p>
              <p><strong>Utiliza FIFO Ordem de Compra:</strong> ${getCheckBoxHTML(
                empresa["l-fifo-ordem-compra"]
              )}</p>
              <p><strong>Importa Observação XML:</strong> ${getCheckBoxHTML(
                empresa["l-observacao"]
              )}</p>
              <p><strong>Envia E-mail Eventos:</strong> ${getCheckBoxHTML(
                empresa["l-email-eventos"]
              )}</p>
              <p><strong>Mantém Impostos do XML na Capa:</strong> ${getCheckBoxHTML(
                empresa["l-impostos-capa"]
              )}</p>
              <p><strong>Zera Valor IPI Outros:</strong> ${getCheckBoxHTML(
                empresa["l-zera-ipi-outros"]
              )}</p>
              <p><strong>Prioriza Documentos:</strong> ${getCheckBoxHTML(
                empresa["l-prioriza-documento"]
              )}</p>
              <p><strong>Informa Conta/CCusto Manual Item:</strong> ${getCheckBoxHTML(
                empresa[""]
              )}</p>
              <p><strong>Usa Tag Ordem Compra:</strong> ${getCheckBoxHTML(
                empresa["l-usa-tag-compra"]
              )}</p>
              <p><strong>Usa NCM Fornecedor:</strong> ${getCheckBoxHTML(
                empresa["log-ncm-fornec"]
              )}</p>
              <p><strong>Altera NCM do item:</strong> ${getCheckBoxHTML(
                empresa["log-altera-ncm"]
              )}</p>
              <p><strong>Quantidade Manual:</strong> ${getCheckBoxHTML(
                empresa["log-qt-manual"]
              )}</p>
              <p><strong>Usa CST Fornecedor:</strong> ${getCheckBoxHTML(
                empresa["log-cst-fornec"]
              )}</p>
              <p><strong>Usa Duplicata Documento XML:</strong> ${getCheckBoxHTML(
                empresa["l-duplic-docum"]
              )}</p>
              <p><strong>Altera EAN/GTIN do item:</strong> ${getCheckBoxHTML(
                empresa["log-altera-ean-gtin"]
              )}</p>
              <p><strong>Grava Pesos Recebimento Fís.ico:</strong> ${getCheckBoxHTML(
                empresa["l-peso-doc-fisico"]
              )}</p>
              <p><strong>Bloqueia Lançamento sem Confirmação:</strong> ${getCheckBoxHTML(
                empresa[""]
              )}</p>
              <p><strong>Bloqueia UN Divergente:</strong> ${getCheckBoxHTML(
                empresa["log-bloq-un-divergente"]
              )}</p>
              <p><strong>Bloqueia OP Finaliz/Terminada:</strong> ${getCheckBoxHTML(
                empresa["l-bloqueia-op-finaliz"]
              )}</p>
              <p><strong>Bloqueia NCM Divergente:</strong> ${getCheckBoxHTML(
                empresa["log-bloqueio-ncm-diverg"]
              )}</p>
              <p><strong>Bloqueia Diverg Valor OC:</strong> ${getCheckBoxHTML(
                empresa["l-bloq-var-valor"]
              )}</p>
              <p><strong>Bloqueia Diverg Quantidade OC:</strong> ${getCheckBoxHTML(
                empresa["l-bloq-var-quant"]
              )}</p>
              <p><strong>Bloqueia Estab OC Divergente:</strong> ${getCheckBoxHTML(
                empresa["l-bloq-estab-diveg"]
              )}</p>
              <p><strong>Usa NCM Fornecedor Debito Direto:</strong> ${getCheckBoxHTML(
                empresa["l-subst-ncm-dd"]
              )}</p>
              <p><strong>Contingência Download XML:</strong> ${getCheckBoxHTML(
                empresa[""]
              )}
              </p>
`;
          };

          const showTraducaoInfob = () => {
            const infoContainer = document.querySelector("#infoContainer");
            infoContainer.style.display = "none";
            const infoTraducao = document.querySelector("#infoTraducao");
            infoTraducao.style.display = "block";

            const getCheckBoxHTML = (value) => {
              if (value === true) {
                return '<input type="checkbox" checked>';
              } else {
                return '<input type="checkbox">';
              }
            };

            infoTraducao.innerHTML = `
    <p><strong>Depos Devolução:</strong> ${getCheckBoxHTML(
      empresa["log-depos-devol"]
    )} ${empresa["cod-depos-dev"]}
    </p>
    <p><strong>Localiz Devolução:</strong> ${empresa["cod-localiz-dev"]}</p>
    <p><strong>Lote:</strong> ${getCheckBoxHTML(empresa["l-fixa-lote"])} ${
              empresa["lote"]
            } ${empresa["dt-valid-lote"]}</p>
    <p><strong>Pasta Copia GFE:</strong> ${getCheckBoxHTML(
      empresa["l-copia-gfe"]
    )} ${empresa["pasta-gfe"]}</p>
    <p><strong>Anexos Divergência:</strong> ${empresa["pasta-anexo-diverg"]}</p>
  `;
          };

          const showConfiguracoesInfo = () => {
            const infoContainer = document.querySelector("#infoContainer");
            infoContainer.style.display = "none";
            const infoTraducao = document.querySelector("#infoTraducao");
            infoTraducao.style.display = "block";
            infoTraducao.innerHTML = `
    <p><strong>Servidor E-mail:</strong> ${empresa["servidor-email"]}</p>
    <p><strong>E-mail NFe:</strong> ${empresa["e-mail-nfe"]}</p>
    <p><strong>Senha E-mail:</strong> ${
      empresa["senha-email"] ? "********" : "Não definida"
    }</p>
    <p><strong>Tipo Conexão:</strong> ${
      empresa["tipo-conexao-mail"] === 1 ? "Segura" : "Não segura"
    }</p>
    <p><strong>Cliente ID:</strong> ${empresa["client-id"]}</p>
    <p><strong>Tenant ID:</strong> ${empresa["tenant-id"]}</p>
    <p><strong>Ambiente SEFAZ:</strong> ${empresa["ambiente-sefaz"]}</p>
    <p><strong>Ambiente Destinada:</strong> ${
      empresa["ambiente-destinadas"]
    }</p>
    <p><strong>Tipo Certificado:</strong> ${
      empresa["tipo-certificado"] === 1 ? "A1" : "A3"
    }</p>
    <p><strong>Senha Certificado:</strong> ${
      empresa["senha-certificado"] ? "********" : "Não definida"
    }</p>
    <p><strong>Arquivo Certificado:</strong> ${empresa["arq-certificado"]}</p>
    <p><strong>Pasta Arq Configuração:</strong> ${
      empresa["pasta-arq-config"]
    }</p>
    <p><strong>Nome Arq Config:</strong> ${empresa["nome-arq-config"]}</p>
    <p><strong>Utiliza Proxy:</strong> ${
      empresa["l-utiliza-proxy"] ? "Sim" : "Não"
    }</p>
    <p><strong>Servidor Proxy:</strong> ${empresa["servidor-proxy"]}</p>
    <p><strong>Porta:</strong> ${empresa["porta-proxy"]}</p>
    <p><strong>Usuário Proxy:</strong> ${empresa["usuario-proxy"]}</p>
    <p><strong>Senha Proxy:</strong> ${
      empresa["senha-proxy"] ? "********" : "Não definida"
    }</p>
  `;
          };

          const showServidorInfo = () => {
            const infoContainer = document.querySelector("#infoContainer");
            infoContainer.style.display = "none";
            const infoTraducao = document.querySelector("#infoTraducao");
            infoTraducao.style.display = "block";

            const getCheckBoxHTML = (value) => {
              if (value === true) {
                return '<input type="checkbox" checked>';
              } else {
                return '<input type="checkbox">';
              }
            };

            infoTraducao.innerHTML = `
    <p><strong>Usa Linux RPW:</strong> ${getCheckBoxHTML(
      empresa["ambiente-sefaz"]
    )}</p>
    <p><strong>Arquivo Certificado Linux:</strong> ${
      empresa["cod-arq-certificado-lnx"]
    }</p>
    <p><strong>Nome Arquivo Configuração Linux:</strong> ${
      empresa["nome-arq-config-lnx"]
    }</p>
    <p><strong>Pasta Arquivo Configuração Linux:</strong> ${
      empresa["pasta-arq-config-lnx"]
    }</p>
    <p><strong>Pasta de Entrada Linux:</strong> ${
      empresa["pasta-entrada-lnx"]
    }</p>
    <p><strong>Pasta Processo E-mail Linux:</strong> ${
      empresa["pasta-proc-mail-lnx"]
    }</p>
    <p><strong>Pasta Processo DFE Linux:</strong> ${
      empresa["pasta-proc-dfe-lnx"]
    }</p>
    <p><strong>Pasta de Erros Linux:</strong> ${empresa["pasta-erros-lnx"]}</p>
    <p><strong>Pasta de Log Linux:</strong> ${
      empresa["pasta-grava-log-linux"]
    }</p>
  `;
          };

          const geralButton = modalBody.querySelector("#geralButton");
          geralButton.addEventListener("click", () => {
            showGeralInfo();
          });

          const traducaoButton = modalBody.querySelector("#traducaoButton");
          traducaoButton.addEventListener("click", () => {
            showTraducaoInfo();
          });

          const traducaoButtonb = modalBody.querySelector("#traducaoButtonb");
          traducaoButtonb.addEventListener("click", () => {
            showTraducaoInfob();
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
    cod_estabel: "Novo Estabelecimento",
    cgc: "Novo CGC",
    ins_municipal: "Nova Inscrição Municipal",
    inscr_estad: "Nova Inscrição Estadual",
    razao_social: "Nova Razão Social",
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
