import { Link } from "react-router-dom";
import CreateEmployeeForm from "../../components/createEmployeeForm/CreateEmployeeForm";

import "../../style/layout/_createemployee.scss";

export default function CreateEmployee() {
	return (
		<div className="global-container index-bkgd">
			<div className="form-container">
				<div className="logo-container">
					<img src="/src/assets/logo.png" className="logo" />
					<h1>HRNet</h1>
				</div>
				<div role="separator" className="separator"></div>
				<h2>Create employee</h2>

				<CreateEmployeeForm />

				<Link to="employee-list">View current employees</Link>
			</div>
		</div>
	);
}
