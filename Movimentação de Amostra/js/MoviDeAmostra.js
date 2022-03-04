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
    var mes = data.getMonth() +1;          // 0-11 (zero=janeiro)
    var ano4 = data.getFullYear();      // 4 dígitos
    
    // Formata a data e a hora (note o mês + 1)

    if(mes < 10) {
        mes = '0'+mes;
    }
    if(dia < 10) {
        dia = '0'+dia;
    }

    var str_data = dia+'/'+mes+'/'+ano4

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
    console.log(dataset);

    $('#'+id0).val(dataset.values[0].select_orc);
    $('#'+id1).val(dataset.values[0].name_prod);
    $('#'+id2).val(dataset.values[0].date_receb);
    $('#'+id3).val(dataset.values[0].fip_sn);
    $('#'+id4).val(dataset.values[0].formula_sn);
    $('#cod_amt').val(dataset.values[0].numb_project);
    $('#medida_solict').val(dataset.values[0].qnt_fracionada);
    $('#medida_regist').val(dataset.values[0].qnt_fracionada);
    
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
    var cod = $('#cod_amt').val();

    $('#tb_nAcao___'+rowCount).val(rowCount);
    $('#tb_acao___'+rowCount).val(acao);
    $('#tb_date___'+rowCount).val(hj);
    $('#tb_resp___'+rowCount).val(resp);
    $('#tb_quant___'+rowCount).val(quant);
    $('#tb_unid___'+rowCount).val(unid);
    $('#tb_cod___'+rowCount).val(cod);

    $('#acao').val("");
    $('#qtd_regist').val("");

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

$(document).on('change', "#solicitacao",
    function descFormId() {
		
		var name = $('#solicitacao').val();
		var dataset = DatasetFactory.getDataset("processAttachment", null, null, null);
		var nRow = dataset.values.length;
	
		var nProcess = dataset.values[nRow-1]['processAttachmentPK.processInstanceId'];
	
		$('#descForm').val(nProcess+1+' - '+name);
		
    }
);
