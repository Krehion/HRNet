import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEmployee from "../../pages/createEmployee/CreateEmployee";
import EmployeeList from "../../pages/employeeList/EmployeeList";

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="" element={<CreateEmployee />} />
				<Route path="employee-list" element={<EmployeeList />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
