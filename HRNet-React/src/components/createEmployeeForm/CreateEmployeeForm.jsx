import { useState } from "react";
import SuccessModal from "../successModal/SuccessModal";
import DatePicker from "react-datepicker";
import SelectInput from "../selectInput/SelectInput";
import stateList from "../../data/stateList";
import dptList from "../../data/dptList";

import "../../style/components/_createemployeeform.scss";
import "../../style/components/_datepicker.scss";

export default function CreateEmployeeForm() {
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.id]: event.target.value
		});
	};

	const [startDate, setStartDate] = useState(new Date());
	const [birthDate, setBirthDate] = useState(new Date());

	const handleSubmit = (event) => {
		event.preventDefault(); // avoid page refresh
		console.log("Form submitted:", formData); // handle data storage here later
		setIsModalOpen(true); // Open modal after submitting
	};

	return (
		<form id="create-employee" onSubmit={handleSubmit}>
			<label htmlFor="first-name">First Name</label>
			<input type="text" id="firstName" value={formData.firstName} onChange={handleChange} />

			<label htmlFor="last-name">Last Name</label>
			<input type="text" id="lastName" value={formData.lastName} onChange={handleChange} />

			<label htmlFor="date-of-birth">Date of Birth</label>
			<DatePicker showIcon selected={birthDate} onChange={(date) => setBirthDate(date)} icon="fa fa-calendar" />

			<label htmlFor="start-date">Start Date</label>
			<DatePicker showIcon selected={startDate} onChange={(date) => setStartDate(date)} icon="fa fa-calendar" />

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
