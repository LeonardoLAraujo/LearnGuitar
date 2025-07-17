import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import ViteExpress from "vite-express";
import MySQL from "../base/mysql";
import { MysqlError } from "mysql";
import cors from "cors";
import { ObjectUser } from "../model/user";

const IP = "10.113.26.78";

export class Setting {

	private app: any;
	private _httpServer: any;
	private io: Server;
	private mysqlInstance: MySQL;

	constructor(mysql: MySQL){
		this.mysqlInstance = mysql;
		this.app = express();
		this._httpServer = createServer(this.app);
		this.io = new Server(this._httpServer, {});

		this.listenSocket();
		this.setupRoutes();
	}
	
	private setupRoutes(): void{
		this.app.use(cors());
		this.app.use(express.json());
    	this.app.use(express.urlencoded({ extended: true }));
		
		this.app.post("/users", (_req: any, resp: any) => {
			try{
				this.mysqlInstance.getConnection().query("select * from user", (_error: MysqlError, response: any) => {
					return resp.json(response);
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/loginUser", (req: any, resp: any) => {
			try{
				const selectUser: string = "SELECT * FROM user WHERE email=? AND password=?";

				this.mysqlInstance.getConnection().query({
					sql: selectUser,
					values: [req.body.email, req.body.password]
				}, (error: MysqlError, result: any) => {

					if(error != null){
						throw error;
					}

					if(result){
						return resp.json({id: result[0].id, username: result[0].username, email: result[0].email, photo: result[0].photo})
					}

				});
			}catch(error){		
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/createUser", (req: any, resp: any) => {
			try{
				const searchUser = "SELECT * FROM user WHERE username=? OR email=?";

				const insertUser = "INSERT INTO user(username, email, password) VALUES(?, ?, ?)";

				this.mysqlInstance.getConnection().query({
					sql: searchUser,
					values: [req.body.name, req.body.email],
				}, (error: MysqlError, result: any) => {

					if(error != null){
						throw error;
					}
		
					let erroText: string = "";
					let isErrorCreateAccount: boolean = false;

					result.forEach((user: ObjectUser) => {
						if(req.body.name == user.username){
							erroText = "Username já em Uso!";
							isErrorCreateAccount = true;
						}

						if(req.body.email == user.email){
							erroText = "Email Incorreto, tente Novamente!";
							isErrorCreateAccount = true;
						}
					
					});

					if(isErrorCreateAccount){
						return resp.json({ success: false, registerMessage: erroText});
					}else{
						this.mysqlInstance.getConnection().query({
							sql: insertUser,
							values: [req.body.name, req.body.email, req.body.password]
						}, (error: MysqlError, response) => {
							if(error != null){
								throw error;
							}

							if(response){
								return resp.json({ success: false, registerMessage: 'Usuário Cadastrado com Sucesso!'});
							}
						});
					}
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/createPost", (req: any, resp: any) => {
			try{
				const insertPost = "INSERT INTO post(user_id, text) VALUES(?, ?)";

				this.mysqlInstance.getConnection().query({
					sql: insertPost,
					values: [req.body.userId, req.body.text]
				}, (error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json({sucess: true, message: "Postado com Sucesso!"})
					}
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/allPost", (_req: any, resp: any) => {
			try{
				this.mysqlInstance.getConnection().query(`SELECT IFNULL (
															(
																SELECT JSON_ARRAYAGG(
																	JSON_OBJECT(
																		'id', p.id,
																		'text', p.text,
																		'userId', u.id,
																		'username', u.username,
																		'photoUser', u.photo,
																		'date', p.date
																	)
																)
																FROM post p
																JOIN USER u ON p.user_id = u.id
															),
															JSON_ARRAY()
														) AS POSTS`, 
				(error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json(result[0].POSTS);
					}
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});
	}	

	listenSocket(): void{
    	this.io.on('connection', (socket: any) => {
        	console.log('user connected =>', socket.id);

			socket.on('disconnect', () => {
				console.log(`user => ${socket.id} was disconnected`);
			});

			socket.on("logIn", () => {
				this.io.emit('logou', "logou");
			});
		});
	}

	public listenServer(): void{
		const server = this._httpServer.listen(3000, IP, () => {	
			console.log('Server i slistenning port: ' + 3000);
		});

		ViteExpress.bind(this.app, server);
  	}


}

const mysqlInstance = new MySQL();

const app = new Setting(mysqlInstance);
app.listenServer();

mysqlInstance.createConnection();



