import "../../style/components/_createemployeeform.scss";

import { useState } from "react";

export default function CreateEmployeeForm() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		dateOfBirth: "",
		startDate: "",
		street: "",
		city: "",
		state: "",
		zipCode: "",
		department: ""
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value
		});
	};

	return (
		<form id="create-employee">
			<label htmlFor="first-name">First Name</label>
			<input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

			<label htmlFor="last-name">Last Name</label>
			<input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

			<label htmlFor="date-of-birth">Date of Birth</label>
			<input type="date" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

			<label htmlFor="start-date">Start Date</label>
			<input type="date" id="startDate" value={formData.startDate} onChange={handleChange} />

			<fieldset>
				<legend>Address</legend>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" value={formData.street} onChange={handleChange} />

				<label htmlFor="city">City</label>
				<input type="text" id="city" value={formData.city} onChange={handleChange} />

				<label htmlFor="state">State</label>
				<select id="state" value={formData.state} onChange={handleChange}>
					<option value="">Select a state</option>
					<option value="NY">New York</option>
					<option value="CA">California</option>
				</select>

				<label htmlFor="zip-code">Zip Code</label>
				<input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
			</fieldset>

			<label htmlFor="department">Department</label>
			<select id="department" value={formData.department} onChange={handleChange}>
				<option value="Sales">Sales</option>
				<option value="Marketing">Marketing</option>
				<option value="Engineering">Engineering</option>
				<option value="Human Resources">Human Resources</option>
				<option value="Legal">Legal</option>
			</select>

			<button type="submit">Save</button>
		</form>
	);
}
