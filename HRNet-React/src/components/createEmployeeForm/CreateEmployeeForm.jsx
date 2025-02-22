import { useState } from "react";
import Modal from "react-amazing-modal-component";
import DatePicker from "react-datepicker";
import Select from "react-select";

import "../../style/components/_createemployeeform.scss";
import "../../style/components/_modal.scss";
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

	const stateList = [
		{ value: "AL", label: "Alabama" },
		{ value: "AK", label: "Alaska" },
		{ value: "AS", label: "American Samoa" },
		{ value: "AZ", label: "Arizona" },
		{ value: "AR", label: "Arkansas" },
		{ value: "CA", label: "California" },
		{ value: "CO", label: "Colorado" },
		{ value: "CT", label: "Connecticut" },
		{ value: "DE", label: "Delaware" },
		{ value: "DC", label: "District Of Columbia" },
		{ value: "FM", label: "Federated States Of Micronesia" },
		{ value: "FL", label: "Florida" },
		{ value: "GA", label: "Georgia" },
		{ value: "GU", label: "Guam" },
		{ value: "HI", label: "Hawaii" },
		{ value: "ID", label: "Idaho" },
		{ value: "IL", label: "Illinois" },
		{ value: "IN", label: "Indiana" },
		{ value: "IA", label: "Iowa" },
		{ value: "KS", label: "Kansas" },
		{ value: "KY", label: "Kentucky" },
		{ value: "LA", label: "Louisiana" },
		{ value: "ME", label: "Maine" },
		{ value: "MH", label: "Marshall Islands" },
		{ value: "MD", label: "Maryland" },
		{ value: "MA", label: "Massachusetts" },
		{ value: "MI", label: "Michigan" },
		{ value: "MN", label: "Minnesota" },
		{ value: "MS", label: "Mississippi" },
		{ value: "MO", label: "Missouri" },
		{ value: "MT", label: "Montana" },
		{ value: "NE", label: "Nebraska" },
		{ value: "NV", label: "Nevada" },
		{ value: "NH", label: "New Hampshire" },
		{ value: "NJ", label: "New Jersey" },
		{ value: "NM", label: "New Mexico" },
		{ value: "NY", label: "New York" },
		{ value: "NC", label: "North Carolina" },
		{ value: "ND", label: "North Dakota" },
		{ value: "MP", label: "Northern Mariana Islands" },
		{ value: "OH", label: "Ohio" },
		{ value: "OK", label: "Oklahoma" },
		{ value: "OR", label: "Oregon" },
		{ value: "PW", label: "Palau" },
		{ value: "PA", label: "Pennsylvania" },
		{ value: "PR", label: "Puerto Rico" },
		{ value: "RI", label: "Rhode Island" },
		{ value: "SC", label: "South Carolina" },
		{ value: "SD", label: "South Dakota" },
		{ value: "TN", label: "Tennessee" },
		{ value: "TX", label: "Texas" },
		{ value: "UT", label: "Utah" },
		{ value: "VT", label: "Vermont" },
		{ value: "VI", label: "Virgin Islands" },
		{ value: "VA", label: "Virginia" },
		{ value: "WA", label: "Washington" },
		{ value: "WV", label: "West Virginia" },
		{ value: "WI", label: "Wisconsin" },
		{ value: "WY", label: "Wyoming" }
	];

	const dptList = [
		{ value: "Sales", label: "Sales" },
		{ value: "Marketing", label: "Marketing" },
		{ value: "Engineering", label: "Engineering" },
		{ value: "Human Resources", label: "Human Resources" },
		{ value: "Legal", label: "Legal" }
	];

	const customStyles = {
		control: (provided) => ({
			...provided,
			backgroundColor: "white",
			border: "1px solid #8f8f9d",
			borderRadius: "2px",
			minHeight: "25px",
			height: "16px",
			boxShadow: "none",
			"&:hover": {
				borderColor: "#888"
			},
			margin: "0 0 5px 0",
			fontSize: "13px"
		}),
		dropdownIndicator: (provided) => ({
			...provided,
			padding: "2px",
			height: "24px",
			width: "19px",
			color: "#9898a5"
		}),
		indicatorSeparator: () => ({
			display: "none"
		}),
		menu: (provided) => ({
			...provided,
			borderRadius: "2px",
			boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
			fontSize: "13px",
			margin: "0"
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isSelected ? "#93ac18" : "white",
			color: state.isSelected ? "white" : "black",
			"&:hover": {
				backgroundColor: "#93ac18",
				color: "white"
			}
		}),
		valueContainer: (provided) => ({
			...provided,
			padding: "2px" // Adjust this to modify the padding
		}),
		input: (provided) => ({
			...provided,
			margin: "0" // Adjust this to modify the margin
		})
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
				<Select
					className="basic-single"
					classNamePrefix="select"
					defaultValue={stateList[0]}
					name="state"
					options={stateList}
					styles={customStyles}
				/>

				<label htmlFor="zip-code">Zip Code</label>
				<input type="number" id="zipCode" value={formData.zipCode} onChange={handleChange} />
			</fieldset>

			<label htmlFor="department">Department</label>
			<Select
				className="basic-single"
				classNamePrefix="select"
				defaultValue={dptList[0]}
				name="state"
				options={dptList}
				styles={customStyles}
			/>

			<button type="submit" className="save-btn">
				Save
			</button>
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<p>Employee created!</p>
			</Modal>
		</form>
	);
}
