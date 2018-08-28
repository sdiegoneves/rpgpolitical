module.exports = function(application){
	application.post('/autenticar', function(req, res){
		console.log("carregnado");
		application.app.controllers.index.autenticar(application, req, res);
	});

	application.get('/', function(req, res){
		console.log("carrega aqui");
		application.app.controllers.index.index(application, req, res);
	});
}