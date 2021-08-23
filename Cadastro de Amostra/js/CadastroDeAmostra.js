window.onload = function() {

    nProjeto();

};

function orcamento() {

try {

//TABELA ORÇAMENTO

    var orcamento = ($('#select_orc').val())[0];
    var c1 = DatasetFactory.createConstraint("idO", orcamento, orcamento, ConstraintType.MUST);
    var constraint = new Array(c1);
    var dataset = DatasetFactory.getDataset("DSCadastroGeral", null, constraint, null);

    $('#client_patroc').val(dataset.values[0].client);
   
//TABELA ORÇAMENTO - DADOS TÉCNICOS

    //Condição de Busca
    var tb_name2 = "tabelaOrcamento2";
    var tb2Constraint = DatasetFactory.createConstraint("tablename", tb_name2, tb_name2, ConstraintType.MUST);
    var docConstraint2 = DatasetFactory.createConstraint("tb3_orc", orcamento, orcamento, ConstraintType.MUST);
    var array2Constraint = new Array(tb2Constraint, docConstraint2);
    var array2 = DatasetFactory.getDataset("DSCadastroGeral", null, array2Constraint, null);
    
    var const_t = new Array(tb2Constraint);
    var array3 = DatasetFactory.getDataset("DSCadastroGeral", null, const_t, null); 

    console.log(orcamento);
    console.log(array2);
    console.log(array3);

    $('#name_prod').val(array2.values[0].tb_descricaoItem);

//TABELA ORCAMENTO - ORÇAMENTO

    var tb_name = "tabelaOrcamento";

    //Filtro de Busca 
    var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
    var docConstraint = DatasetFactory.createConstraint("tb1_orc", orcamento, orcamento, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
    var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConstraint, null);

    var codPatroc = dataset.values[0].codClientP;

    $('#lote_int').val($('#cod_amt').val() + '/' + codPatroc + '/' + orcamento);
}

catch (e) {
    alert('Houve um erro inesperado com esse orçamento, notifeque e tente mais tarde');
    console.log('Erro --> '+e);
}

}

$(document).on('change', "#select_orc",
    function inputValueIsNull() {
        orcamento();
    }
);

function nProjeto() {
    
    var array = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, null, null);

    var array2 = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, null, null);

    $('#numb_project').val('NP-' + ((array.values.length) + 1));
    $('#cod_amt').val('AMT-' + ((array2.values.length) + 1));


};
