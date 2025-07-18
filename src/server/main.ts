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

		this.app.post("/createComment", (req: any, resp: any) => {
			
			try{
				const insertComment = "INSERT INTO comment(post_id, user_id, response_post_user_id, text) VALUES(?, ?, ?, ?)";

				this.mysqlInstance.getConnection().query({
					sql: insertComment,
					values: [req.body.postId, req.body.userId, req.body.responsePostUserId, req.body.comment]
				}, (error: MysqlError, result) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json({sucess: true, message: "Comentario Enviado com Sucesso!"});
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
																						'date', p.date,
																						'countComment', (SELECT COUNT(c.id) FROM comment c WHERE p.id = c.post_id ),
																						'countLike', (SELECT COUNT(l.id) FROM likePost l WHERE p.id = l.post_id )
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

		this.app.post("/allComment", (req: any, resp: any) => {
			try{
				this.mysqlInstance.getConnection().query(`SELECT IFNULL (
																			(
																				SELECT JSON_ARRAYAGG(
																					JSON_OBJECT(
																						'id', c.id,
																						'text', c.text,
																						'userId', c.id,
																						'response_post_user_id', c.response_post_user_id,
																						'post_id', c.post_id,
																						'username', u.username,
																						'photoUser', u.photo,
																						'date', c.date,
																						'countLike', (SELECT COUNT(l.id) FROM likeComment l WHERE c.id = l.comment_id )
																					)
																				)
																				FROM comment c, USER u
																				WHERE c.user_id = u.id AND c.post_id = ${req.body.postId}
																			),
																			JSON_ARRAY()
																		) AS COMMENT`, 
				(error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json(result[0].COMMENT);
					}
				});

			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/likePost", (req: any, resp: any) => {
			try{
				const INSERT_LIKE_POST = "INSERT INTO likePost(post_id, user_id) VALUES(?, ?)";

				this.mysqlInstance.getConnection().query({
					sql: INSERT_LIKE_POST,
					values: [req.body.postId, req.body.userId]
				}, (error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						resp.json({sucess: true, message: "Like"});
					}
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/likedPost", (req: any, resp: any) => {
			try{
				this.mysqlInstance.getConnection().query(`DELETE FROM likePost WHERE post_id=${req.body.postId}`, (error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json({sucess: true, message: "Disliked"});
					}
				})
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/userLikePostCurrent", (req: any, resp: any) => {
			try{

				this.mysqlInstance.getConnection().query(`SELECT * FROM likePost l WHERE l.post_id = ${req.body.postId} AND l.user_id = ${req.body.userId}`, 
					(error: MysqlError, result: any) => {
						if(error != null){
							throw error;
						}

						if(result){
							return resp.json(result);
						}
					}
				)

			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/likeComment", (req: any, resp: any) => {
			try{
				const INSERT_LIKE_POST = "INSERT INTO likeComment(comment_id, user_id) VALUES(?, ?)";

				this.mysqlInstance.getConnection().query({
					sql: INSERT_LIKE_POST,
					values: [req.body.commentId, req.body.userId]
				}, (error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						resp.json({sucess: true, message: "Like"});
					}
				});
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/likedComment", (req: any, resp: any) => {
			try{
				this.mysqlInstance.getConnection().query(`DELETE FROM likeComment WHERE comment_id=${req.body.commentId}`, (error: MysqlError, result: any) => {
					if(error != null){
						throw error;
					}

					if(result){
						return resp.json({sucess: true, message: "Disliked"});
					}
				})
			}catch(error){
				console.log(`Error: ${error}`);
			}
		});

		this.app.post("/userLikeCommentCurrent", (req: any, resp: any) => {
			try{

				this.mysqlInstance.getConnection().query(`SELECT * FROM likeComment l WHERE l.comment_id = ${req.body.commentId} AND l.user_id = ${req.body.userId}`, 
					(error: MysqlError, result: any) => {
						if(error != null){
							throw error;
						}

						if(result){
							return resp.json(result);
						}
					}
				)

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



