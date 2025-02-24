import { useState } from "react";
import { useAtom } from "jotai";
import { employeeListAtom } from "../../store/employeeAtom";
import SuccessModal from "../successModal/SuccessModal";
import DatePicker from "react-datepicker";
import SelectInput from "../selectInput/SelectInput";
import stateList from "../../data/stateList";
import dptList from "../../data/dptList";

import "../../style/components/_createemployeeform.scss";
import "../../style/components/_datepicker.scss";

export default function CreateEmployeeForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [employeeList, setEmployeeList] = useAtom(employeeListAtom); // Global state for employees

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		dateOfBirth: new Date(),
		startDate: new Date(),
		street: "",
		city: "",
		state: stateList[0], // Default state
		zipCode: "",
		department: dptList[0] // Default department
	});

	// Handle text input changes
	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value
		});
	};

	// Handle form submission
	const handleSubmit = (event) => {
		event.preventDefault(); // Prevent page refresh

		// Create new employee object
		const newEmployee = {
			firstName: formData.firstName,
			lastName: formData.lastName,
			dateOfBirth: new Date(formData.dateOfBirth),
			startDate: new Date(formData.startDate),
			street: formData.street,
			city: formData.city,
			state: formData.state,
			zipCode: formData.zipCode,
			department: formData.department
		};

		setEmployeeList([...employeeList, newEmployee]); // Update global employee list

		setIsModalOpen(true); // Open success modal
	};

	return (
		<form id="create-employee" onSubmit={handleSubmit}>
			<label htmlFor="first-name">First Name</label>
			<input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

			<label htmlFor="last-name">Last Name</label>
			<input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

			<label htmlFor="date-of-birth">Date of Birth</label>
			<DatePicker
				showIcon
				selected={formData.dateOfBirth}
				onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
				icon="fa fa-calendar"
			/>

			<label htmlFor="start-date">Start Date</label>
			<DatePicker
				showIcon
				selected={formData.startDate}
				onChange={(date) => setFormData({ ...formData, startDate: date })}
				icon="fa fa-calendar"
			/>

			<fieldset>
				<legend>Address</legend>
				<label htmlFor="street">Street</label>
				<input type="text" id="street" value={formData.street} onChange={handleChange} />

				<label htmlFor="city">City</label>
				<input type="text" id="city" value={formData.city} onChange={handleChange} />

				<label htmlFor="state">State</label>
				<SelectInput
					options={stateList}
					defaultValue={stateList[0]}
					onChange={(value) => setFormData({ ...formData, state: value })}
				/>

				<label htmlFor="zip-code">Zip Code</label>
				<input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
			</fieldset>

			<label htmlFor="department">Department</label>
			<SelectInput
				options={dptList}
				defaultValue={dptList[0]}
				value={formData.department}
				onChange={(value) => setFormData({ ...formData, department: value })}
			/>

			<button type="submit" className="save-btn">
				Save
			</button>
			<SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
		</form>
	);
}
