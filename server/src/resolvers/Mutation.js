const Mutations = {
	async createItem(parent, args, { db }, info) {
		// TODO: Authenticate and authorize user
		const item = await db.mutation.createItem({ data: { ...args } }, info);

		return item;
	},
	updateItem(parent, args, { db }, info) {
		const updates = { ...args };
		delete updates.id;

		return db.mutation.updateItem(
			{
				data: updates,
				where: { id: args.id },
			},
			info
		);
	},
};

module.exports = Mutations;
