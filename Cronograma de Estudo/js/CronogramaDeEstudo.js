//CARREGA FUNÇÕES COM A PÁGINA

window.onload = function() {

   usuario();
   navegation(getWKNumState());

    console.log("--------");
    console.log(getFormMode());
    console.log(getMobile());
    console.log(getWKNumState());
    console.log(getWKUser());
    console.log(getWKNumProces());
    console.log(getWKUserLocale());
    console.log(getWKCardId());
    console.log("--------");

};

$(document).on('change', "#number_orc",
    function inputValueIsNull() {
        filtro();
});

function navegation(numState) {

    if (numState == 1) {
        selectFilter();

        var tb = $('#nOrc_project').val(); // Parâmetros dentro da tabela

        var tb_nameI = "tb_sub_R";

        var tbConstraint = DatasetFactory.createConstraint("tablename", tb_nameI, tb_nameI, ConstraintType.MUST); // Usar sempre tablename
        var docConstraint = DatasetFactory.createConstraint("tb2_orc", tb, tb, ConstraintType.MUST); // Nome do campo a usar como parâmetro
        var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array
    
        // Busca no Dataset + Condições de Filtro
        var array3 = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);
    
        var countRow = array3.values.length;       
    
        $('#selectNumber').append($('<option>', {
    
            value: "",
            text: "Selecione..."
        }));
    
        for (var i = 0; i < countRow; i++) {
    
            var nSub = array3.values[i].tb_n_h
            var descric = array3.values[i].tb_descricao_h
            var respon = array3.values[i].tb_responsavel_h
    
            $('#tb_nitem___'+(i+1)).val(nSub);
            $('#tb_descSI___'+(i+1)).val(descric);
            $('#tb_respon___'+(i+1)).val(respon);
    
            $('#selectNumber').append($('<option>', {
    
                value: nSub,
                text: nSub
            }));
    
        }
    }

    else if (numState == 3) {

        selectFilter();
        $('#div_mov').addClass('nav-close');


    }
};

// FOCAR ELEMENTO
function focusLocation() {

    window.location.hash = '#filter_project';

};

//NAVEGAÇÃO

//Navegação entre as abas de forma interativa

function valid() {

    var nProjeto = $('#number_project').val();
    var cp = $('#client_patroc_search').val();
    var nomeProject = $('#name_project').val();

    if(nProjeto != "" || cp != "" || nomeProject != "") {
        
        selectFilter();
        pcp();

    }
    else {

        alert('Por favor preencha todos os campos corretamente.');

    }

};

function selectFilter() {

    $("#filtro_projeto_tabs").removeClass("active");
    $("#filtro_projeto_nav").removeClass("active");

    $("#controle_estudo_tabs").addClass("active");
    $("#controle_estudo_nav").addClass("active");


};

function addMoviment() {

    $("#filtro_projeto_tabs").addClass("nav-close");
    $("#filtro_projeto_nav").addClass("nav-close");

    $("#controle_estudo_tabs").addClass("nav-close");
    $("#controle_estudo_nav").addClass("nav-close");
    
    $("#amostra_tabs").removeClass("nav-close");
    $("#amostra_nav").removeClass("nav-close");

    $("#controle_estudo_tabs").removeClass("active");
    $("#controle_estudo_nav").removeClass("active");

    $("#amostra_tabs").addClass("active");
    $("#amostra_nav").addClass("active");
};

function voltarAmostra() {

    $("#controle_estudo_tabs").removeClass("nav-close");
    $("#controle_estudo_nav").removeClass("nav-close");

    $("#filtro_projeto_tabs").removeClass("nav-close");
    $("#filtro_projeto_nav").removeClass("nav-close");

    $("#amostra_tabs").removeClass("active");
    $("#amostra_nav").removeClass("active");

    $("#amostra_tabs").addClass("nav-close");
    $("#amostra_nav").addClass("nav-close");

    $("#controle_estudo_tabs").addClass("active");
    $("#controle_estudo_nav").addClass("active");

};

function voltarControle() {

    $("#controle_estudo_tabs").removeClass("active");
    $("#controle_estudo_nav").removeClass("active"); 

    $("#filtro_projeto_tabs").addClass("active");
    $("#filtro_projeto_nav").addClass("active");

};

//HISTÓRICO AMOSTRA

function historico_amostra() {

    $("#continuar").removeClass("nav-close");
    
    var array = [];

    var rowCount = $('#tb_hist_amostra tr').length;
    var n_acao = rowCount - 1;
    var acao = $("#solicitacao").val();
    var responsavel = $("#solicitante").val();

    var hj = new Date();

    var dia = hj.getDate();
    var mes = hj.getMonth() + 1;
    var ano = hj.getFullYear();

    var hoje = (dia + '/'+ mes+ '/'+ ano);

    array.push(n_acao);
    array.push(acao);
    array.push(hoje);
    array.push(responsavel);

    var table = document.getElementById("tb_hist_amostra");
	
	var numOfRows = n_acao;
	
	var numOfCols = 4;
	
	var newRow = table.insertRow(numOfRows);
	
	for (var i = 0; i < numOfCols; i++) {
	
		newCell = newRow.insertCell(i);
		
		newCell.innerHTML = array[i];
	
	}

};

function continue_amostra() {

    historico_amostra();
    voltarAmostra();

};

//BUSCA DE DADOS PARA TELA INICIAL (FILTRO)
function filtro() {

    //Condição de Busca
    var tb_name = "tabelaOrcamento";
    var tbdoc = ($('#number_orc').val())[0]; // Parâmetros dentro da tabela

    //Filtro de Busca 
    var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
    var docConstraint = DatasetFactory.createConstraint("tb1_orc", tbdoc, tbdoc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
    var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

    var docConstraint2 = DatasetFactory.createConstraint("idO", tbdoc, tbdoc, ConstraintType.MUST);

    var arrayConstraint2 = new Array(docConstraint2);

    var array2 = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint2, null);

    //var numeroProjeto = array.values[0].tb1_c7_total;
    var clientePatroc = array2.values[0].client;
    var nomeProjeto = array.values[0].tb_estudo;
    
    //Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("select_orc", tbdoc, tbdoc, ConstraintType.MUST);
    var constraints = new Array(c1);
                
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, constraints, null);

    var numeroProjeto = dataset.values[0].numb_project;

    //Tela de filtro
    $('#number_project').val(numeroProjeto);
    $('#client_patroc_search').val(clientePatroc);
    $('#name_project').val(nomeProjeto);

};

//BUSCA DE DADOS PARA PREENCHIMENTO DO PCP
function pcp() {

    //Condição de Busca
    var tb_name = "tabelaOrcamento";
    var tbdoc = ($('#number_orc').val())[0]; // Parâmetros dentro da tabela

    //Filtro de Busca 
    var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
    var docConstraint = DatasetFactory.createConstraint("tb1_orc", tbdoc, tbdoc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
    var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

    var docConstraint2 = DatasetFactory.createConstraint("idO", tbdoc, tbdoc, ConstraintType.MUST);

    var arrayConstraint2 = new Array(docConstraint2);

    var array2 = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint2, null);

    var clientePatroc = array2.values[0].client;
    var nomeProjeto = array.values[0].tb_estudo

    
    var nTr = $('#tb_projectOrc tr').length;

    if (nTr == 2) {

        wdkAddChild('tb_projectOrc');
    }

    //Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("select_orc", tbdoc, tbdoc, ConstraintType.MUST);
    var constraints = new Array(c1);
                
    //Busca o dataset
    var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, constraints, null);

    var numeroProjeto = dataset.values[0].numb_project;

    //PCP
    $('#nOrc_project').val(tbdoc);
    $('#nProject').val(numeroProjeto);
    $('#cp_project').val(clientePatroc);

    $('#tb_nOrc___1').val(tbdoc);
    $('#tb_codp___1').val(numeroProjeto);
    $('#tb_nProj___1').val(nomeProjeto);
    $('#tb_cp___1').val(clientePatroc);


    var tb_nameSI = "tb_sub_R";

    var tbConstraint = DatasetFactory.createConstraint("tablename", tb_nameSI, tb_nameSI, ConstraintType.MUST); // Usar sempre tablename
    var docConstraint = DatasetFactory.createConstraint("tb2_orc", tbdoc, tbdoc, ConstraintType.MUST); // Nome do campo a usar como parâmetro
    var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

    // Busca no Dataset + Condições de Filtro
    var array3 = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

    var countRow = array3.values.length;

    $('#selectNumber').append($('<option>', {

        value: "",
        text: "Selecione..."
    }));

    for (var i = 0; i < countRow; i++) {

        wdkAddChild('tb_sub');

        var nSub = array3.values[i].tb_n_h
        var descric = array3.values[i].tb_descricao_h
        var respon = array3.values[i].tb_responsavel_h

        $('#tb_nitem___'+(i+1)).val(nSub);
        $('#tb_descSI___'+(i+1)).val(descric);
        $('#tb_respon___'+(i+1)).val(respon);

        $('#selectNumber').append($('<option>', {

            value: nSub,
            text: nSub
        }));

    }

};

//SALVAR INFROMAÇÕES NO HISTÓRICO
function saveAction() {

    PrazoEnc();

    wdkAddChild('tb_hist_projeto');

    var nRow = $('#tb_hist_projeto tr').length - 2;

    var nItem = $('#selectNumber').val();
    var descricao = $('#descricao_move').val();
    var Dprazo = $('#prazo_move').val();
    var responsavel = $('#resp_move').val();
    var Dencerramento = $('#date_move').val();
    var status = $('#status_move').val();

    

    var dia_prazo = Dprazo.substring(8, 12);
    var mes_prazo = Dprazo.substring(5, 7);
    var ano_prazo = Dprazo.substring(0, 4);

    var prazo = dia_prazo + '/' + mes_prazo + '/' + ano_prazo;

    var dia_encer = Dencerramento.substring(8, 12);
    var mes_encer = Dencerramento.substring(5, 7);
    var ano_encer = Dencerramento.substring(0, 4);

    var encerramento = dia_encer + '/' + mes_encer + '/' + ano_encer;
    
    $('#tb_nAcao___'+nRow).val(nRow);
    $('#tb_nitemH___'+nRow).val(nItem);
    $('#tb_descH___'+nRow).val(descricao);
    $('#tb_prazoH___'+nRow).val(prazo);
    $('#tb_respH___'+nRow).val(responsavel);
    $('#tb_encerramento___'+nRow).val(encerramento);
    $('#tb_statusH___'+nRow).val(status);    

    tableRow = $('#tb_sub tr').length - 2;

    for (var i = 1; i <= tableRow; i++) {

        var id = $('#tb_nitem___'+i).val();
        var idSelect = nItem;

        if (id == idSelect) {

            $('#tb_status1___'+i).val(status);
            $('#tb_prazo___'+i).val(prazo);

        }

    }

    statusGeral();

    $('#selectNumber').val("");
    $('#descricao_move').val("");
    $('#prazo_move').val("");
    $('#date_move').val("");
    $('#status_move').val(""); 

};

//STATUS DE PRAZO COM ENCERRAMENTO
function PrazoEnc() {

    var prazo = $('#prazo_move').val();
    var encerramento = $('#date_move').val();

    var nPrazo = (prazo.replace("-", "")).replace("-", "");
    var nEncerramento = (encerramento.replace("-", "")).replace("-", "");

    var data = new Date();

    var dia = data.getDate();               // 1-31
    var mes = (data.getMonth() + 1);        // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();          // 4 dígitos

    hj = ano4.toString() + mes.toString() + dia.toString();

    if (nEncerramento == "") {

        if (nPrazo < hj) {

            $('#status_move').val('Em Aberto');
        }
        else {

            $('#status_move').val('Atrasado');
        }
    }
    else {

        if (nPrazo > nEncerramento) {

            $('#status_move').val('Finalizado');
        }
        else {

            $('#status_move').val('Atrasado');
        }
    }

};

//USUÁRIO RESPONSÁVEL
function usuario() {

    var user = getWKUser();
    var c1 = DatasetFactory.createConstraint("login", user, user, ConstraintType.MUST);
    var constraints = new Array(c1);
    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

    $('#resp_move').val(dataset.values[0].colleagueName);
     
        
};

//STATUS DO PROJETO EM GERAL
function statusGeral() {

    var soma = 0;

    var nRow = $('#tb_sub tr').length - 2;

    for (var i = 1; i <= nRow; i++) {

        var status = $('#tb_status1___'+i).val();

        if (status == 'Em Aberto' || status == "") {

            soma++;
        }
    }

    if (soma > 0) {

        $('#tb_status___1').val("Em Aberto");
        $('#status_project').val("Em Aberto");
    }
    else {

        $('#tb_status___1').val("Finalizado");
        $('#status_project').val("Finalizado");
    }
   
};

//VALIDAÇÃO E ATIVAÇÃO
function validation() {

    var v1 = $('#selectNumber').val();
    var v2 = $('#descricao_move').val();
    var v3 = $('#prazo_move').val();

    if (v1 == "" || v2 == "" || v3 == "") {

        alert('Preencha todos os campos corretamente!!!');
    }
    else {
        saveAction();
    }

}