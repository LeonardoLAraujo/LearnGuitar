import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { HttpServer } from "vite";
import ViteExpress from "vite-express";

export class Setting {

	private app: any;
	private _httpServer: HttpServer;
	private io: Server;

	constructor(){
		this.app = express();
		this._httpServer = createServer(this.app);
		this.io = new Server(this._httpServer, {});

		this.setupRoutes();
		this.listenServer();
		this.listenSocket();
	}
	
	private setupRoutes(): void{
		this.app.get("/hello", (_: any, res: any) => {
			res.send("Hello Vite + TypeScript!");
		});
	}	

	listenSocket(): void{
    	this.io.on('connection', (socket: any) => {
        	console.log('user connected =>', socket.id);
		});
	}

	private listenServer(): void{
		ViteExpress.listen(this.app, 3000, () =>
			console.log("Server is listening on port 3000..."),
		);
  	}


}

const app =  new Setting();




