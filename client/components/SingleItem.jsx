import React, { Component } from "react";
import { Query } from "react-apollo";
import Head from "next/head";
import { GET_ITEM_QUERY } from "../components/UpdateItem";
import styled from "styled-components";
import Error from "./ErrorMessage";

const SingleItemStyles = styled.div`
	max-width: 1200px;
	margin: 2rem auto;
	box-shadow: ${props => props.theme.bs};
	display: grid;
	grid-auto-columns: 1fr;
	grid-auto-flow: column;
	min-height: 800px;
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.details {
		margin: 3rem;
		font-size: 2rem;
	}
`;

class SingleItem extends Component {
	render() {
		return (
			<Query query={GET_ITEM_QUERY} variables={{ id: this.props.itemId }}>
				{({ error, loading, data }) => {
					const item = data.item;

					if (error) return <Error error={error} />;
					if (loading) return <p>Loading...</p>;
					if (!item) return <p>Item was not found.</p>;

					return (
						<SingleItemStyles>
							<Head>
								<title>Munchies | {item.title}</title>
							</Head>
							<img src={item.largeImage} alt={item.title} />
							<div className="details">
								<h2>Viewing {item.title}</h2>
								<p>{item.description}</p>
							</div>
						</SingleItemStyles>
					);
				}}
			</Query>
		);
	}
}

export { SingleItem as default };
