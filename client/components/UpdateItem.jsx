import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const UPDATE_ITEM_MUTATION = gql`
	mutation UPDATE_ITEM_MUTATION(
		$id: ID!
		$title: String
		$description: String
		$price: Int
	) {
		updateItem(
			id: $id
			title: $title
			description: $description
			price: $price
		) {
			id
			title
			description
			price
		}
	}
`;

const GET_ITEM_QUERY = gql`
	query GET_ITEM_QUERY($id: ID!) {
		item(where: { id: $id }) {
			id
			title
			description
			price
			largeImage
		}
	}
`;

class UpdateItem extends Component {
	state = {};

	handleChange = event => {
		// TODO: use Regex to ensure value entered in price field is number
		// currently 'e' is considered a number

		const { name, type, value } = event.target;
		const parsedValue = type === "number" ? parseFloat(value) : value;

		this.setState({ [name]: parsedValue });
	};

	updateItem = async (event, updateItemMutation) => {
		event.preventDefault();
		const res = await updateItemMutation({
			variables: {
				id: this.props.itemId,
				...this.state,
			},
		});
	};

	render() {
		return (
			<Query query={GET_ITEM_QUERY} variables={{ id: this.props.itemId }}>
				{({ data, loading }) => {
					if (loading) return <p>Loading...</p>;
					if (!data.item)
						return <p>No item found for ID {this.props.itemId}</p>;
					return (
						<Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
							{(updateItem, { loading, error }) => (
								<Form onSubmit={event => this.updateItem(event, updateItem)}>
									<Error error={error} />
									<fieldset disabled={loading} aria-busy={loading}>
										<label htmlFor="title">
											Title
											<input
												type="text"
												id="title"
												name="title"
												placeholder="Title"
												defaultValue={data.item.title}
												onChange={this.handleChange}
												required
											/>
										</label>

										<label htmlFor="price">
											Price
											<input
												type="number"
												id="price"
												name="price"
												placeholder="Price"
												defaultValue={data.item.price}
												onChange={this.handleChange}
												required
											/>
										</label>

										<label htmlFor="description">
											Description
											<textarea
												id="description"
												name="description"
												placeholder="Describe your product"
												defaultValue={data.item.description}
												onChange={this.handleChange}
												required
											/>
										</label>
										<button type="submit">
											Sav{loading ? "ing" : "e"} Changes
										</button>
									</fieldset>
								</Form>
							)}
						</Mutation>
					);
				}}
			</Query>
		);
	}
}

export { UPDATE_ITEM_MUTATION, GET_ITEM_QUERY, UpdateItem as default };
