/**
 *                 ApplicationServer
 *             (Do not change this code)
 * Require Modules to setup the REST Api
 * - `express` Express.js is a Web Framework
 * - `morgan` Isn't required but help with debugging and logging
 * - `body-parser` This module allows to parse the body of the post request into a JSON
 */
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
/**
 * Require the Blockchain class. This allow us to have only one instance of the class.
 */
const BlockChain = require('./src/blockchain.js');

class ApplicationServer {

	constructor() {
		//Express application object
		this.app = express();
		//Blockchain class object
		this.blockchain = new BlockChain.Blockchain();
		//Method that initialized the express framework.
		this.initExpress();
		//Method that initialized middleware modules
		this.initExpressMiddleWare();
		//Method that initialized the controllers where you defined the endpoints
		this.initControllers();
		//Method that run the express application.
		this.start();
	}

	initExpress() {
		this.app.set("port", 8000);
	}

	initExpressMiddleWare() {
		this.app.use(morgan("dev"));
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(bodyParser.json());
	}

	initControllers() {
        require("./BlockchainController.js")(this.app, this.blockchain);
	}

	start() {
		let self = this;

		// request genesis block
		this.app.get('/get-genesis-block', function (req, res) {
			res.json({
				'block':this.blockchain
			})
		  })

		// POST call to requestValidation
		this.app.post('/requestValidation', function (req, res) {
			res.send('TEST')
		  })
		
		// sign message
		this.app.post('/signMessage', function (req, res) {
			res.send('TEST')
		  })

	    // submit star
		this.app.post('/submitStar', function (req, res) {
			res.send('TEST')
		  })

		// get stars by address
		this.app.get('/getByAddress/', function (req, res) {
			// res.json({
			// 	'message':req.query.message
			// })
		  })

		this.app.listen(this.app.get("port"), () => {
			console.log(`Server Listening for ports: ${self.app.get("port")}`);
		});
	}

}

new ApplicationServer();