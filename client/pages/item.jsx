import SingleItem from "../components/SingleItem";
import { GET_ITEM_QUERY } from "../components/UpdateItem";
const Item = props => (
	<div>
		<SingleItem itemId={props.query.id} />
	</div>
);

export { Item as default };
