import mysql from 'mysql';

export default class MySQL{

    private connection!: mysql.Connection;

    getConnection(): mysql.Connection {
        return this.connection;
    }

    createConnection(){
        const config = { 
            host:  "localhost",
            user: 'root',
            password: '', 
            database: 'learnguitar' 
        }

        this.connection  = mysql.createConnection(config);
    }

    connect(){
        this.connection.connect(() => {
            console.log('MySQL connected with id ' + this.connection.threadId);
        });
    }

    closeConnect(){
        this.connection.end();
    }

}