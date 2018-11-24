const { forwardTo } = require("prisma-binding");

const Query = {
	items: forwardTo("db"),

	// async items(parent, args, { db }, info) {
	// 	const items = await db.query.items();

	// 	return items;
	// },
};

module.exports = Query;
