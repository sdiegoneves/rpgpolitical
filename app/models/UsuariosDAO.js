function UsuariosDAO(connection){
	this._connection = connection();
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.insert(usuario);

			mongoclient.close();
		});
	});
}


UsuariosDAO.prototype.autentica = function(usuario, req, res){
	this._connection.open( function(err, mongoclient){
		mongoclient.collection("usuarios", function(err, collection){
			collection.find(usuario).toArray(function(error, result){
				if (result[0] != undefined) {				
					req.session.autorizado = true;

					req.session.usuario = result[0].usuario;
					req.session.casa = result[0].casa;

					res.redirect('jogo');
					
				} else {
					res.render('index');
				}

			});

			mongoclient.close();
		});
	});

}

module.exports = function(){
	return UsuariosDAO;
}