import Select from "react-select";
import PropTypes from "prop-types";

export default function SelectInput({ options, value, onChange }) {
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
			padding: "2px"
		}),
		input: (provided) => ({
			...provided,
			margin: "0"
		})
	};

	return (
		<Select
			className="basic-single"
			classNamePrefix="select"
			value={options.find((opt) => opt.value === value)} // Use value to select the option
			onChange={(selectedOption) => onChange(selectedOption?.value)} // Update value on change
			options={options}
			styles={customStyles}
		/>
	);
}

SelectInput.propTypes = {
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired
		})
	).isRequired,
	value: PropTypes.string,
	onChange: PropTypes.func.isRequired
};
