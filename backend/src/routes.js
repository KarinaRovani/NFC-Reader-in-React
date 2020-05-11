const express = require('express');

//const SessionController = require('./controllers/SessionController');
const ProdutoController = require('./controllers/ProdutoController');
const NfcController = require('./controllers/NfcController');
//const ProfileController = require('./controllers/ProfileController');

const routes = express.Router();

//routes.post('/sessions', SessionController.create);

routes.get('/produto', ProdutoController.index);
routes.post('/produto', ProdutoController.create);
routes.delete('/produto/:idProduto', ProdutoController.delete);

routes.get('/nfc', NfcController.index);
routes.post('/nfc', NfcController.create);
//routes.delete('/nfc/:id',NfcController.delete);
    
module.exports = routes;