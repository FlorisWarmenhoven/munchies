const { Prisma } = require("prisma-binding");

const db = new Prisma({
	typeDefs: "src/grenerated/prisma.graphql",
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: proces.env.PRISMA_SECRET,
});

module.exports = db;
