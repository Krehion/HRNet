import { useState } from "react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel
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
		zipCode: 12345
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
		zipCode: 67890
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
		zipCode: 54321
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
		globalFilterFn: (row, columnId, filterValue) => {
			// Convert everything to lowercase for case-insensitive search
			const cellValue = String(row.getValue(columnId)).toLowerCase();
			return cellValue.includes(filterValue.toLowerCase());
		}
	});

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
						<select
							value={table.getState().pagination.pageSize}
							onChange={(e) => table.setPageSize(Number(e.target.value))}>
							<option value="10">10</option>
							<option value="25">25</option>
							<option value="50">50</option>
							<option value="100">100</option>
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
						Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
						&nbsp;to&nbsp;
						{Math.min(
							(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
							table.getPrePaginationRowModel().rows.length
						)}
						&nbsp;of&nbsp;
						{table.getPrePaginationRowModel().rows.length} entries
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
