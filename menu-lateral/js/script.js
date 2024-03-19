$('.manutencao').click(function() {
    $('.sidebar ul .itemsManutencao').toggleClass('show');
});

$('.tarefas').click(function() {
    $('.sidebar ul .itemsTarefas').toggleClass('show');
});

$('.manutencao').mouseover(function() {
    $('.sidebar ul .arrow1').toggleClass('spin');
});

$('.tarefas').mouseover(function() {
    $('.sidebar ul .arrow2').toggleClass('spin');
});