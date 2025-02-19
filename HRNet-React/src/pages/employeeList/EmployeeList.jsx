import { useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

import { Link } from "react-router-dom";

import "../../style/layout/_employeelist.scss";

const defaultData = [
	{
		firstName: "John",
		lastName: "Doe",
		startDate: new Date("2005-10-20"),
		department: "Sales",
		birthDate: new Date("1983-07-10"),
		street: "123 Main Street",
		city: "Cityville",
		state: "AL",
		zipCode: 1
	},
	{
		firstName: "Jane",
		lastName: "Smith",
		startDate: new Date("2018-06-15"),
		department: "Marketing",
		birthDate: new Date("1990-02-28"),
		street: "456 Fake Boulevard",
		city: "Bigtown",
		state: "AL",
		zipCode: 1
	},
	{
		firstName: "Mark",
		lastName: "Lang",
		startDate: new Date("2010-03-10"),
		department: "Legal",
		birthDate: new Date("1999-09-21"),
		street: "78 New Road",
		city: "Largeburg",
		state: "AL",
		zipCode: 1
	}
];

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("firstName", {
		header: () => <span>First name</span>,
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor((row) => row.lastName, {
		id: "lastName",
		cell: (info) => <i>{info.getValue()}</i>,
		header: () => <span>Last name</span>,
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("startDate", {
		header: () => <span>Start date</span>,
		cell: (info) => info.getValue().toLocaleDateString(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("department", {
		header: () => <span>Department</span>,
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("birthDate", {
		header: "Date of birth",
		cell: (info) => info.getValue().toLocaleDateString(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("street", {
		header: "Street",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("city", {
		header: "City",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("state", {
		header: "State",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("zipCode", {
		header: "Zip code",
		footer: (info) => info.column.id
	})
];

export default function EmployeeList() {
	const [data] = useState([...defaultData]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel()
	});
	return (
		<div className="global-container list-bkgd">
			<div className="list-container">
				<h1>Current employees</h1>
				<table>
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr key={row.id}>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
								))}
							</tr>
						))}
					</tbody>
					<tfoot>{/* footer here */}</tfoot>
				</table>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
