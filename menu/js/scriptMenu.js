$(document).ready(function () {
  $(".sub-menu").slideDown();
  $(".nav-item .fas")
    .removeClass("fa-chevron-right")
    .addClass("fa-chevron-down");

  $(".logout-link").click(function (e) {
    e.preventDefault();
    console.log("Logout clicado");
    sessionStorage.clear();
    window.location.href = "../../login/login.html";
  });

  const username = sessionStorage.getItem("username");
  if (username) {
    console.log("Nome do Usuário:", username);
    $(".sidebar-title").text(`Bem-vindo, ${username}`);
  } else {
    console.error("Nome do usuário não encontrado na sessionStorage");
    $(".sidebar-title").text("Bem-vindo");
  }

  $("#toggleMenu").click(function () {
    $(".sidebar").toggleClass("active");
    $(".header, .footer").toggleClass("menu-active");
    $(".content").toggleClass("menu-active");

    if ($(".sidebar").hasClass("active")) {
      $(this).attr("title", "Fechar Menu");
    } else {
      $(this).attr("title", "Abrir Menu");
    }
  });

  $(".sidebar").addClass("active");
  $(".header, .footer").addClass("menu-active");
  $(".content").addClass("menu-active");
  $("#toggleMenu").attr("title", "Fechar Menu");
});
