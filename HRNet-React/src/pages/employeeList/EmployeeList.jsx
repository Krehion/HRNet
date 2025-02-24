import { useState } from "react";
import { useAtom } from "jotai";
import { employeeListAtom } from "../../store/employeeAtom";
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
		cell: (info) => {
			const value = info.getValue();
			if (!value) return "N/A"; // Handle missing data gracefully
			const date = value instanceof Date ? value : new Date(value); // Convert if needed
			return date.toLocaleDateString();
		},
		footer: (info) => info.column.id,
		sortingFn: "datetime"
	}),
	columnHelper.accessor("department", {
		header: () => <span>Department</span>,
		footer: (info) => info.column.id,
		sortingFn: "alphanumeric"
	}),
	columnHelper.accessor("dateOfBirth", {
		header: "Date of birth",
		cell: (info) => {
			const value = info.getValue();
			if (!value) return "N/A";
			const date = value instanceof Date ? value : new Date(value);
			return date.toLocaleDateString();
		},
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
	const [employeeList] = useAtom(employeeListAtom);
	const [searchQuery, setSearchQuery] = useState(""); // Store search input

	const table = useReactTable({
		data: employeeList,
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
						Showing {Math.min(pageIndex * pageSize + 1, employeeList.length)}
						&nbsp;to&nbsp;
						{Math.min((pageIndex + 1) * pageSize, employeeList.length)}
						&nbsp;of&nbsp;
						{employeeList.length} entries
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
