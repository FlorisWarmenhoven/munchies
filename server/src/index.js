require("dotenv").config({ path: "dev.env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TODO: Use Express Middleware to handle cookies (JWT) and populate current user

server.start(
	{
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL,
		},
	},
	resp => {
		console.log(`Server is now live on port http://localhost:${resp.port}`);
	}
);
