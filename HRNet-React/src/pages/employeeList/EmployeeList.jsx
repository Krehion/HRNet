import { useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel
} from "@tanstack/react-table";

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
		zipCode: "12345"
	},
	{
		firstName: "Jane",
		lastName: "Smith",
		startDate: new Date("2018-06-15"),
		department: "Marketing",
		birthDate: new Date("1990-02-28"),
		street: "456 Wide Boulevard",
		city: "Bigtown",
		state: "AL",
		zipCode: "67890"
	},
	{
		firstName: "Mark",
		lastName: "Lang",
		startDate: new Date("2010-03-10"),
		department: "Legal",
		birthDate: new Date("1999-09-21"),
		street: "78 New Road",
		city: "Smallburg",
		state: "AL",
		zipCode: "54321"
	},
	{
		firstName: "Alice",
		lastName: "Johnson",
		startDate: new Date("2012-05-18"),
		department: "HR",
		birthDate: new Date("1987-03-12"),
		street: "24 Oak Street",
		city: "Springfield",
		state: "CA",
		zipCode: "90210"
	},
	{
		firstName: "Robert",
		lastName: "Brown",
		startDate: new Date("2008-09-23"),
		department: "IT",
		birthDate: new Date("1985-11-07"),
		street: "67 Maple Avenue",
		city: "Techville",
		state: "TX",
		zipCode: "75001"
	},
	{
		firstName: "Emma",
		lastName: "Davis",
		startDate: new Date("2019-07-02"),
		department: "Finance",
		birthDate: new Date("1993-05-14"),
		street: "12 Birch Lane",
		city: "Moneytown",
		state: "NY",
		zipCode: "10001"
	},
	{
		firstName: "Michael",
		lastName: "Wilson",
		startDate: new Date("2015-04-09"),
		department: "Operations",
		birthDate: new Date("1988-06-25"),
		street: "89 Cedar Road",
		city: "Industria",
		state: "OH",
		zipCode: "43001"
	},
	{
		firstName: "Sophia",
		lastName: "Martinez",
		startDate: new Date("2021-03-17"),
		department: "Customer Support",
		birthDate: new Date("1997-09-10"),
		street: "102 River Street",
		city: "Helpdesk",
		state: "FL",
		zipCode: "32801"
	},
	{
		firstName: "William",
		lastName: "Anderson",
		startDate: new Date("2016-11-30"),
		department: "Marketing",
		birthDate: new Date("1990-12-20"),
		street: "88 Sunset Blvd",
		city: "Adtown",
		state: "NV",
		zipCode: "89501"
	},
	{
		firstName: "Olivia",
		lastName: "Thomas",
		startDate: new Date("2014-08-21"),
		department: "Legal",
		birthDate: new Date("1984-07-02"),
		street: "45 Pine Circle",
		city: "Courtland",
		state: "GA",
		zipCode: "30301"
	},
	{
		firstName: "James",
		lastName: "White",
		startDate: new Date("2011-01-05"),
		department: "IT",
		birthDate: new Date("1979-02-11"),
		street: "501 Tech Street",
		city: "Cybercity",
		state: "WA",
		zipCode: "98001"
	},
	{
		firstName: "Isabella",
		lastName: "Harris",
		startDate: new Date("2020-06-25"),
		department: "Sales",
		birthDate: new Date("1992-08-15"),
		street: "78 Elm Drive",
		city: "Bargainburg",
		state: "IL",
		zipCode: "60601"
	},
	{
		firstName: "Benjamin",
		lastName: "Clark",
		startDate: new Date("2013-02-14"),
		department: "Finance",
		birthDate: new Date("1982-10-30"),
		street: "92 Ocean Avenue",
		city: "Bankville",
		state: "NJ",
		zipCode: "07001"
	},
	{
		firstName: "Charlotte",
		lastName: "Lewis",
		startDate: new Date("2017-09-29"),
		department: "HR",
		birthDate: new Date("1991-03-07"),
		street: "100 Ivy Lane",
		city: "Careertown",
		state: "PA",
		zipCode: "19101"
	},
	{
		firstName: "Daniel",
		lastName: "Walker",
		startDate: new Date("2018-12-11"),
		department: "Operations",
		birthDate: new Date("1986-11-05"),
		street: "7 Rainy Street",
		city: "Workland",
		state: "MA",
		zipCode: "02101"
	},
	{
		firstName: "Mia",
		lastName: "Hall",
		startDate: new Date("2009-05-06"),
		department: "Legal",
		birthDate: new Date("1977-07-22"),
		street: "55 Redwood Road",
		city: "Justiceville",
		state: "MI",
		zipCode: "48101"
	},
	{
		firstName: "Henry",
		lastName: "Allen",
		startDate: new Date("2016-01-19"),
		department: "Customer Support",
		birthDate: new Date("1989-09-12"),
		street: "30 Foggy Lane",
		city: "Supportville",
		state: "CO",
		zipCode: "80001"
	},
	{
		firstName: "Amelia",
		lastName: "Young",
		startDate: new Date("2022-04-28"),
		department: "Marketing",
		birthDate: new Date("1995-04-03"),
		street: "303 Sapphire Street",
		city: "Creative City",
		state: "OR",
		zipCode: "97201"
	},
	{
		firstName: "Ethan",
		lastName: "King",
		startDate: new Date("2015-10-08"),
		department: "Sales",
		birthDate: new Date("1983-12-14"),
		street: "98 Rose Road",
		city: "Dealstown",
		state: "MN",
		zipCode: "55101"
	},
	{
		firstName: "Harper",
		lastName: "Scott",
		startDate: new Date("2010-08-12"),
		department: "IT",
		birthDate: new Date("1980-06-01"),
		street: "15 Boulder Drive",
		city: "Techville",
		state: "MO",
		zipCode: "63001"
	},
	{
		firstName: "Alexander",
		lastName: "Green",
		startDate: new Date("2012-02-27"),
		department: "HR",
		birthDate: new Date("1975-10-20"),
		street: "48 Meadow Lane",
		city: "Recruitown",
		state: "IN",
		zipCode: "46201"
	},
	{
		firstName: "Ella",
		lastName: "Adams",
		startDate: new Date("2019-05-05"),
		department: "Finance",
		birthDate: new Date("1996-02-23"),
		street: "200 Harmony Avenue",
		city: "Moneytown",
		state: "KY",
		zipCode: "40201"
	},
	{
		firstName: "Matthew",
		lastName: "Nelson",
		startDate: new Date("2006-11-15"),
		department: "Operations",
		birthDate: new Date("1981-09-17"),
		street: "99 Sunset Way",
		city: "Workland",
		state: "LA",
		zipCode: "70101"
	},
	{
		firstName: "Avery",
		lastName: "Baker",
		startDate: new Date("2021-07-20"),
		department: "Customer Support",
		birthDate: new Date("1998-05-19"),
		street: "64 Oakridge Road",
		city: "Helpville",
		state: "TN",
		zipCode: "37201"
	},
	{
		firstName: "Jackson",
		lastName: "Perez",
		startDate: new Date("2013-04-02"),
		department: "Legal",
		birthDate: new Date("1979-11-08"),
		street: "501 Pinewood Drive",
		city: "Lawtown",
		state: "OK",
		zipCode: "73101"
	},
	{
		firstName: "Scarlett",
		lastName: "Roberts",
		startDate: new Date("2010-10-31"),
		department: "Marketing",
		birthDate: new Date("1987-01-27"),
		street: "77 Oceanview Lane",
		city: "Adville",
		state: "SC",
		zipCode: "29201"
	},
	{
		firstName: "Lucas",
		lastName: "Turner",
		startDate: new Date("2008-12-25"),
		department: "Finance",
		birthDate: new Date("1984-08-05"),
		street: "34 Forest Path",
		city: "Moneytown",
		state: "AR",
		zipCode: "72201"
	}
];

const columnHelper = createColumnHelper();

const columns = [
	columnHelper.accessor("firstName", {
		header: () => <span>First name</span>,
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor((row) => row.lastName, {
		id: "lastName",
		cell: (info) => info.getValue(),
		header: () => <span>Last name</span>,
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor("startDate", {
		header: () => <span>Start date</span>,
		cell: (info) => info.getValue().toLocaleDateString(),
		footer: (info) => info.column.id,
		sortingFn: "datetime"
	}),
	columnHelper.accessor("department", {
		header: () => <span>Department</span>,
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor("birthDate", {
		header: "Date of birth",
		cell: (info) => info.getValue().toLocaleDateString(),
		footer: (info) => info.column.id,
		sortingFn: "datetime"
	}),
	columnHelper.accessor("street", {
		header: "Street",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id
	}),
	columnHelper.accessor("city", {
		header: "City",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor("state", {
		header: "State",
		cell: (info) => info.getValue(),
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor("zipCode", {
		header: "Zip code",
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	})
];

export default function EmployeeList() {
	const [data] = useState([...defaultData]);
	const [searchQuery, setSearchQuery] = useState(""); // Store search input

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(), // Enables sorting
		getFilteredRowModel: getFilteredRowModel(), // Enables filtering
		globalFilterFn: "includesString", // Filtering function
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			globalFilter: searchQuery
		},
		onGlobalFilterChange: setSearchQuery
	});

	const { pageIndex, pageSize } = table.getState().pagination;

	// Update global filter whenever search input changes
	const handleSearch = (e) => {
		setSearchQuery(e.target.value);
		table.setGlobalFilter(e.target.value);
	};

	return (
		<div className="global-container list-bkgd">
			<div className="list-container">
				<h1>Current employees</h1>
				<div className="list-controls">
					<label className="list-controls__length">
						Show&nbsp;
						<select value={pageSize} onChange={(e) => table.setPageSize(Number(e.target.value))}>
							{[10, 25, 50, 100].map((size) => (
								<option key={size} value={size}>
									{size}
								</option>
							))}
						</select>
						&nbsp;entries
					</label>
					<label className="list-controls__filter">
						Search:&nbsp;
						<input type="search" value={searchQuery} onChange={handleSearch} />
					</label>
				</div>
				<table className="employee-table">
					<thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										colSpan={header.colSpan}
										{...(header.column.getCanSort() && {
											className: "sortable",
											onClick: header.column.getToggleSortingHandler()
										})}>
										{header.isPlaceholder ? null : (
											<div className="header-content">
												{flexRender(header.column.columnDef.header, header.getContext())}
												<i
													className={`fa-solid ${
														{
															asc: "fa-sort-up",
															desc: "fa-sort-down"
														}[header.column.getIsSorted()] ?? "fa-sort"
													}`}></i>
											</div>
										)}
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
				</table>
				<div className="employee-table--footer">
					<div className="list-counter">
						Showing {Math.min(pageIndex * pageSize + 1, data.length)}
						&nbsp;to&nbsp;
						{Math.min((pageIndex + 1) * pageSize, data.length)}
						&nbsp;of&nbsp;
						{data.length} entries
					</div>
					<div className="pagination">
						<button
							className="pagination--btn"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}>
							{"<<"}
						</button>
						<button
							className="pagination--btn"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							{"<"}
						</button>
						<span>
							Page&nbsp;
							<strong>
								{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
							</strong>
						</span>
						<button className="pagination--btn" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
							{">"}
						</button>
						<button
							className="pagination--btn"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}>
							{">>"}
						</button>
					</div>
				</div>
				<Link to="/">Home</Link>
			</div>
		</div>
	);
}
