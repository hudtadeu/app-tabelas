document.addEventListener("DOMContentLoaded", function () {
  // Função para abrir o modal de novo usuário
  function openModal() {
    // Código para abrir o modal aqui
    console.log("Abrir modal de novo usuário");
  }

  // Adiciona evento de clique ao botão de novo usuário
  document.getElementById("new").addEventListener("click", openModal);

  // Função para alternar a direção da seta
  function toggleArrow(element) {
    if (element.classList.contains("bi-caret-up-fill")) {
      element.classList.remove("bi-caret-up-fill");
      element.classList.add("bi-caret-down-fill");
    } else {
      element.classList.remove("bi-caret-down-fill");
      element.classList.add("bi-caret-up-fill");
    }
  }

  // Adicionar eventos de clique aos ícones de seta nas colunas da tabela
  var arrowIcons = document.querySelectorAll(
    ".bi-caret-up-fill, .bi-caret-down-fill"
  );
  arrowIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      toggleArrow(icon);
      // Aqui você pode adicionar a lógica para classificar a tabela conforme necessário
      // Por exemplo, você pode classificar os dados da tabela com base na coluna clicada
      // e na direção da seta
    });
  });
});
