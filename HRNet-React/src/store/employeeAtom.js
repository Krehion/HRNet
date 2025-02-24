import { atom } from "jotai";

export const employeesAtom = atom([]); // Holds the employee list

export const fetchEmployeesAtom = atom(null, async (get, set) => {
	try {
		const response = await fetch("http://localhost:3001/employees");
		const data = await response.json();
		set(employeesAtom, data); // Store fetched employees in Jotai state
	} catch (error) {
		console.error("Error fetching employees:", error);
	}
});

export const addEmployeeAtom = atom(null, async (get, set, newEmployee) => {
	const response = await fetch("http://localhost:3001/employees", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(newEmployee)
	});
	if (response.ok) {
		set(employeesAtom, [...get(employeesAtom), newEmployee]); // Update Jotai state
	}
});
