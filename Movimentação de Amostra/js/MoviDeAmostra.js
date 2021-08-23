window.onload = function() {   

    usuario('solicitante');
    hoje('date_solict');
    navegation(getWKNumState());

};

//USUÁRIO ACESSANDO
function usuario(id) {

    var user = getWKUser();

    var c1 = DatasetFactory.createConstraint("login", user, user, ConstraintType.MUST);

    var constraints = new Array(c1);

    var dataset = DatasetFactory.getDataset("colleague", null, constraints, null);

    $('#'+id).val(dataset.values[0].colleagueName);
};

//DATA DE HOJE
function hoje(id) {

    // Obtém a data/hora atual
	var data = new Date();
	
    // Guarda cada pedaço em uma variável
    var dia = data.getDate();           // 1-31
    var mes = data.getMonth();          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();      // 4 dígitos
    
    // Formata a data e a hora (note o mês + 1)

    if(mes > 9) {
        if (dia > 9) {
            var str_data = dia + '/' + (mes+1) + '/' + ano4;
        }
        var str_data = '0' + dia + '/' + (mes+1) + '/' + ano4;
    }
    else if (dia < 9) {
        var str_data = '0' + dia + '/' + '0' + (mes+1) + '/' + ano4;
    }
    else {
        var str_data = dia + '/' + '0' + (mes+1) + '/' + ano4;
    }

    $('#'+id).val(str_data);
    return str_data;

};

function busca(id0, id1, id2, id3, id4) {

    var cod = ($('#cod_interno').val())[0];
   
    //Monta as constraints para consulta
    var c1 = DatasetFactory.createConstraint("lote_int", cod, cod, ConstraintType.MUST);
    var constraints = new Array(c1);

    //Busca o dataset
    var dataset = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, constraints, null);

    $('#'+id0).val(dataset.values[0].select_orc);
    $('#'+id1).val(dataset.values[0].name_prod);
    $('#'+id2).val(dataset.values[0].date_receb);
    $('#'+id3).val(dataset.values[0].fip_sn);
    $('#'+id4).val(dataset.values[0].formula_sn);

    $('#cod_externo').val(($('#cod_interno').val())[0]);
    
    var nO = dataset.values[0].select_orc;

    //Monta as constraints para consulta
    var c2 = DatasetFactory.createConstraint("tablename", 'tabelaOrcamento', 'tabelaOrcamento', ConstraintType.MUST);
    var c3 = DatasetFactory.createConstraint("tb1_orc", nO, nO, ConstraintType.MUST);
    var constraints = new Array(c2, c3);

    //Busca o dataset
    var dataset2 = DatasetFactory.getDataset("DSCadastroGeral", null, constraints, null);
 
    $('#resp_setor').val(dataset2.values[0].tb_estudo);


};

$(document).on('change', "#cod_interno",
    function inputValueIsNull() {
        busca('nOrcamento', 'nome_amostra', 'date_rece', 'fip', 'formula');
    }
);

function table() {

    wdkAddChild('tb_hist_amostra');

    var rowCount = $('#tb_hist_amostra tr').length - 2;
    var acao = $('#acao').val();
    var hj = hoje();
    var resp = getWKUser();
    var quant = $('#qtd_regist').val();
    var unid = $('#medida_regist').val();

    $('#tb_nAcao___'+rowCount).val(rowCount);
    $('#tb_acao___'+rowCount).val(acao);
    $('#tb_date___'+rowCount).val(hj);
    $('#tb_resp___'+rowCount).val(resp);
    $('#tb_quant___'+rowCount).val(quant);
    $('#tb_unid___'+rowCount).val(unid);

    $('#acao').val("");
    $('#qtd_regist').val("");
    $('#medida_regist').val("");

};

function navegation(numState) {

    if (numState == 4 || numState == 2) {

        $('#div_moveEstoq').removeClass('nav-close');
        $('#div_buttonSave').removeClass('nav-close');
        $('#div_historico').removeClass('nav-close');

        $('#qtd_solict').prop('readonly', true);

        $('#cod_interno').addClass('off');
        $('#solicitacao').addClass('off');
        $('#medida_solict').addClass('off');

    }
    else if(numState == 5) {

        $('#div_moveEstoq').removeClass('nav-close');
        $('#div_buttonSave').removeClass('nav-close');
        $('#div_descarte').removeClass('nav-close');
        $('#div_historico').removeClass('nav-close');

        $('#qtd_solict').prop('readonly', true);

        $('#cod_interno').addClass('off');
        $('#solicitacao').addClass('off');
        $('#medida_solict').addClass('off');

    }

};

