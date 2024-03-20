function detalharEmpresa(epCodigo) {
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
