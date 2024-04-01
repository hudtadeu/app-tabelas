document
  .getElementById("eventoForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Coletar os valores do formulário
    var estabelecimento = document.getElementById("estabelecimento").value;
    var tipoEvento = document.getElementById("tipoEvento").value;
    var assuntoEmail = document.getElementById("assuntoEmail").value;
    var remetenteEmail = document.getElementById("remetenteEmail").value;
    var textoPadraoEmail = document.getElementById("textoPadraoEmail").value;
    var destinatarios = document.getElementById("destinatarios").value;

    // Gerar o conteúdo do e-mail HTML
    var emailHTML = `
      <html>
      <head>
          <title>${assuntoEmail}</title>
      </head>
      <body>
          <h2>${tipoEvento} no ${estabelecimento}</h2>
          <p>${textoPadraoEmail}</p>
          <p>Atenciosamente,<br>${remetenteEmail}</p>
      </body>
      </html>
    `;

    // Abrir um cliente de e-mail com o conteúdo gerado
    var emailWindow = window.open(
      "mailto:?subject=" +
        encodeURIComponent(assuntoEmail) +
        "&body=" +
        encodeURIComponent(emailHTML),
      "_blank"
    );
  });
