const Mutations = {
	async createItem(parent, args, { db }, info) {
		// TODO: Authenticate and authorize user
		const item = await db.mutation.createItem({ data: { ...args } }, info);

		return item;
	},
};

module.exports = Mutations;
