const express = require( 'express' );
const cors = require('cors');

const { dbConection } = require('../db/config');

console.clear();

class Server {


    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.listen();

        // CONFIGS
        this.configs();

        // DB
        this.dataBase();

        // Routes
        this.routes();
    };

    configs(){
        this.app.use( cors() );
        this.app.use( express.static('public') );
        this.app.use( express.json() );
    }

    async dataBase(){
        await dbConection();
    }
    
    routes(){
        this.app.use( '/api/auth', require('../routes/auth') );
        this.app.use( '/api/events', require('../routes/events') );
    };

    listen(){
        this.app.listen( this.port, () => {
            console.log( 'app running on port', this.port );
        });

    };


};

module.exports = Server;