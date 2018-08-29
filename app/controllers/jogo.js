module.exports.jogo = function(application, req, res){
	if (req.session.autorizado !== true) {
		res.render('index', {validacao:{}});
	} 

	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	var usuario = req.session.usuario;
	var casa 	= req.session.casa;

	JogoDAO.iniciaJogo(res, usuario, casa);
}

module.exports.sair = function(application, req, res){
	req.session.destroy(function(error){
		res.render('index', {validacao:{}});
	});
}

module.exports.suditos = function(application, req, res){
	res.render('aldeoes', {validacao:{}});
}


module.exports.pergaminhos = function(application, req, res){
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	var usuario = req.session.usuario;

	JogoDAO.getAcoes(usuario, res);

}

module.exports.ordenar_acao_sudito = function(application, req, res){
	var dadosForm = req.body;

	req.assert('acao', 'Acao deve ser informada').notEmpty();
	req.assert('quantidade', 'A quantidade deve ser informada').notEmpty();

	var erros = req.validationErrors();

	if (erros) {
		res.redirect('jogo');
	}

	
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	dadosForm.usuario = req.session.usuario;

	console.log(dadosForm);
	console.log(req.session);
	JogoDAO.acao(dadosForm,res);

	res.redirect('jogo');
}