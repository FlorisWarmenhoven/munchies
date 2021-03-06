const { forwardTo } = require("prisma-binding");

const Query = {
	item: forwardTo("db"),
	items: forwardTo("db"),
	itemsConnection: forwardTo("db"),
};

module.exports = Query;
