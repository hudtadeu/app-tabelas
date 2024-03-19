document.addEventListener("DOMContentLoaded", function () {

  const base64Credentials = sessionStorage.getItem('token');

  if (base64Credentials) {
    console.log('base64Credentials: ', base64Credentials);
  } else {
      console.error('base64Credentials não encontrado na sessionStorage');
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
              `;
          tableBody.appendChild(row);
        });
      } else {
        console.error("Nenhum item encontrado na resposta.");
      }
    })
    .catch((error) => console.error("Erro ao carregar dados da API:", error));
});
