document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    console.log("username", username);
    console.log("password", password);

    const dataToSend = {
      user: username,
      password: password,
    };
    console.log("dataToSend", dataToSend);

    const base64Credentials = btoa(`${username}:${password}`);

    fetch(
      "http://131.161.43.14:8280/dts/datasul-rest/resources/prg/etq/v1/piGetLogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${base64Credentials}`,
        },
        body: JSON.stringify(dataToSend),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao autenticar usuário");
        }
        return response.json();
      })
      .then((responseData) => {
        console.log("Dados da resposta:", responseData);
        if (
          responseData.total === 1 &&
          responseData.items &&
          responseData.items.length > 0 &&
          responseData.items[0].Erro === 0
        ) {
          sessionStorage.setItem("token", base64Credentials); // Armazena o token na sessionStorage
          sessionStorage.setItem("username", username); // Armazena o nome do usuário na sessionStorage
          window.location.href = "../menu/menu.html";
        } else {
          throw new Error("Usuário ou senha incorretos");
        }
      })
      .catch((error) => {
        alert(error.message);
        console.error("Erro ao efetuar login:", error);
      });
  });
