window.onload = function() {

};

function orcamento() {



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

    $('#name_prod').val(array2.values[0].tb_descricaoItem);

//TABELA ORCAMENTO - ORÇAMENTO

    var tb_name = "tabelaOrcamento";

    //Filtro de Busca 
    var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
    var docConstraint = DatasetFactory.createConstraint("tb1_orc", orcamento, orcamento, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
    var arrayConstraint = new Array(tbConstraint, docConstraint); // Tranformas as duas constraint em Array

    var constraintArray =  DatasetFactory.createConstraint("idO", orcamento, orcamento, ConstraintType.MUST);
    var arrayOrcament = new Array(constraintArray);

    // Busca no Dataset + Condições de Filtro
    var array = DatasetFactory.getDataset("DSCadastroGeral", null, arrayOrcament, null);

    var projectN = array.values[0].nProj;  
    
    $('#numb_project').val(projectN);
    


/*catch (e) {
    alert('Houve um erro inesperado com esse orçamento, tente novamente');
    console.log('Erro --> '+e);
}*/

}

$(document).on('change', "#select_orc",
    function inputValueIsNull() {
        orcamento();
    }
);

function onlyN(string) {
    var numsStr = string.replace(/[^0-9]/g,'');
    return parseInt(numsStr);
}

function numbZero(number) {
    n = parseInt(number);
    if (n < 10) {
        n = '00'+n;
    }
    else if (n < 100) {
        n = '0'+n;
    }
    
    return n;
}

$(document).on('change', "#cod_amt",
    function descFormId() {
		
		var name = $('#cod_amt').val();
        var nProject = $('#numb_project').val();
		var dataset = DatasetFactory.getDataset("processAttachment", null, null, null);
		var nRow = dataset.values.length;
	
		var nProcess = dataset.values[nRow-1]['processAttachmentPK.processInstanceId'];
	
		$('#descForm').val(nProcess+1+' - '+name+' - '+nProject);
		
    }
);
