import { Link } from "react-router-dom";

import "../../style/layout/_employeelist.scss";

export default function CreateEmployee() {
	return (
		<div className="global-container list-bkgd">
			<div className="list-container">
				<h1>Current employees</h1>
				{/* List */}
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
