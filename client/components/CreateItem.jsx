import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
	mutation CREATE_ITEM_MUTATION(
		$title: String!
		$description: String!
		$price: Int!
		$image: String
		$largeImage: String
	) {
		createItem(
			title: $title
			description: $description
			price: $price
			image: $image
			largeImage: $largeImage
		) {
			id
		}
	}
`;

class CreateItem extends Component {
	state = {
		title: "",
		description: "",
		price: 0,
		image: "",
		largeImage: "",
	};

	handleChange = event => {
		// TODO: use Regex to ensure value entered in price field is number
		// currently 'e' is considered a number

		const { name, type, value } = event.target;
		const parsedValue = type === "number" ? parseFloat(value) : value;

		this.setState({ [name]: parsedValue });
	};

	uploadFile = async event => {
		// TODO: Ensure form submit waits for url to come back
		const file = event.target.files[0];
		const data = new FormData();

		data.append("file", file);
		data.append("upload_preset", "munchies");

		const res = await fetch(
			"https://api.cloudinary.com/v1_1/munchies/image/upload",
			{ method: "POST", body: data }
		);

		const savedFile = await res.json();
		console.log(savedFile);

		this.setState({
			image: savedFile.secure_url,
			largeImage: savedFile.eager[0].secure_url,
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
				{(createItem, { loading, error }) => (
					<Form
						onSubmit={async event => {
							event.preventDefault();
							const res = await createItem();
							Router.push({
								pathname: "/item",
								query: { id: res.data.createItem.id },
							});
						}}
					>
						<Error error={error} />
						<fieldset disabled={loading} aria-busy={loading}>
							<label htmlFor="file">
								Image
								<input
									type="file"
									id="file"
									name="file"
									placeholder="Upload an Image"
									onChange={this.uploadFile}
									required
								/>
								{/* TODO: Add loading spinner after upload */}
								{this.state.image && (
									<img
										src={this.state.image}
										width="200px"
										alt="Upload preview"
									/>
								)}
							</label>

							<label htmlFor="title">
								Title
								<input
									type="text"
									id="title"
									name="title"
									placeholder="Title"
									value={this.state.title}
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
									value={this.state.price}
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
									value={this.state.description}
									onChange={this.handleChange}
									required
								/>
							</label>
							<button type="submit">Submit</button>
						</fieldset>
					</Form>
				)}
			</Mutation>
		);
	}
}

export { CREATE_ITEM_MUTATION, CreateItem as default };
