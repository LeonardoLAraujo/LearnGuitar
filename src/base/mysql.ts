import mysql from 'mysql2';

export default class MySQL {

    private connection!: mysql.Connection;

    getConnection(): mysql.Connection {
        return this.connection;
    }

    createConnection(){
        const config = { 
            host:  "localhost",
            user: 'root',
            password: '12345', 
            database: 'learnguitar',
            port: 3308
        }

        this.connection  = mysql.createConnection(config);

        this.connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar no MySQL:', err);
                setTimeout(() => this.createConnection(), 2000); 
            } else {
                console.log('MySQL connected with id ' + this.connection.threadId);
            }
        });

        this.connection.on('error', (err) => {
            console.error('MySQL error:', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('Tentando reconectar...');
                this.createConnection(); 
            } else {
                throw err;
            }
        });
    }

    closeConnect(){
        this.connection.end();
    }

}
