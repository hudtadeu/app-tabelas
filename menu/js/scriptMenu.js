$(document).ready(function(){
    // Evento de clique nos links do menu lateral
    $('.nav-link').click(function(e){
        // Verifica se o link tem um destino válido
        if ($(this).attr('href') && $(this).attr('href') !== '#') {
            // Não faz nada e permite o comportamento padrão do link
            return;
        }

        // Impede o comportamento padrão do link se for um link interno
        e.preventDefault();

        // Verifica se o texto do link clicado é "Logout"
        if ($(this).text().trim() === 'Logout') {
            // Código para o logout aqui
            console.log('Logout clicado');
            // Limpa os dados da sessão
            sessionStorage.clear();
            // Redireciona para a página de login
            window.location.href = '../../login/login.html';
        } else {
            // Alterna a classe do ícone e mostra ou oculta o submenu
            $(this).find('.fas').toggleClass('fa-chevron-right fa-chevron-down');
            $(this).next('.sub-menu').slideToggle();
        }
    });

    // Verifica se há um nome de usuário na sessionStorage e exibe-o no menu lateral
    const username = sessionStorage.getItem('username');
    if (username) {
        console.log('Nome do Usuário:', username);
        $('.sidebar-title').text(`Bem-vindo, ${username}`);
    } else {
        console.error('Nome do usuário não encontrado na sessionStorage');
        $('.sidebar-title').text('Bem-vindo');
    }

    // Evento de clique no botão para esconder/mostrar o menu lateral
    $('#toggleMenu').click(function(){
        // $('.sidebar').toggleClass('active');
        // $('.header, .footer').toggleClass('menu-active'); // Adiciona classe ao cabeçalho e rodapé para ajustar margem
        // $('.content').toggleClass('menu-active'); // Adiciona classe ao conteúdo para ajustar margem
        $('.sidebar').toggleClass('active');
        $('.header, .footer').toggleClass('menu-active'); // Adiciona classe ao cabeçalho e rodapé para ajustar margem
        $('.content').toggleClass('menu-active'); // Adiciona classe ao conteúdo para ajustar margem

        // Altera o título do botão de acordo com o estado do menu
        if ($('.sidebar').hasClass('active')) {
            $(this).attr('title', 'Fechar Menu');
        } else {
            $(this).attr('title', 'Abrir Menu');
        }
    });

    // Simulação de login bem-sucedido
    // Suponha que o usuário tenha feito login e o menu lateral deva aparecer
    // Remova esta parte quando integrar com a funcionalidade de login real
    $('.sidebar').addClass('active');
    $('.header, .footer').addClass('menu-active');
    $('.content').addClass('menu-active');
    $('#toggleMenu').attr('title', 'Fechar Menu'); // Define o título inicial do botão
});
