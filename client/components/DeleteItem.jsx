import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_ITEMS_QUERY } from "./Items";

const DELETE_ITEM_MUTATION = gql`
	mutation DELETE_ITEM_MUTATION($id: ID!) {
		deleteItem(id: $id) {
			id
		}
	}
`;

class DeleteItem extends Component {
	updateCache = (cache, payload) => {
		// Manually update cache on the client to match server
		const data = cache.readQuery({ query: GET_ITEMS_QUERY });
		data.items = data.items.filter(
			item => item.id !== payload.data.deleteItem.id
		);
		cache.writeQuery({ query: GET_ITEMS_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={DELETE_ITEM_MUTATION}
				variables={{ id: this.props.itemId }}
				update={this.updateCache}
			>
				{(deleteItem, { error }) => (
					<button
						onClick={() => {
							if (confirm("Are you sure you want to delete this item?")) {
								deleteItem();
							}
						}}
					>
						{this.props.children}
					</button>
				)}
			</Mutation>
		);
	}
}

export { DeleteItem as default };
