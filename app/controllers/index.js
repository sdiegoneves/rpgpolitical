module.exports.index = function(application, req, res){
	
	res.render('index', {validacao:{}});
}

module.exports.autenticar = function(application, req, res){	
	var dadosForm = req.body;

	req.assert('usuario', 'usuario nao pode ser vazio').notEmpty();
	req.assert('senha', 'senha nao pode ser vazio').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.render('index',  {validacao:erros});
		return;
	}

	var connection = application.config.dbConnection;
	var usuariosDAO = new application.app.models.UsuariosDAO(connection);

	usuariosDAO.autentica(dadosForm, req, res);

	//res.send("ok na session");

}