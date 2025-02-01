"use client";

import { Table } from "@tanstack/react-table";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-2">
      <div className="flex-1 text-sm text-muted-foreground ml-4">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
        {table.getFilteredRowModel().rows.length} row(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            name=""
            id=""
            className="border border-input bg-background px-3 py-1 text-sm rounded-md"
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center justify-center space-x-2 px-4">
          <button
            className="rounded-full p-1 hover:bg-crust"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <span className="sr-only">Go to first page</span> */}
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            className="rounded-full p-1 hover:bg-crust"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {/* <span className="sr-only">Go to previous page</span> */}
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            className="rounded-full p-1 hover:bg-crust"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {/* <span className="sr-only">Go to next page</span> */}
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            className="rounded-full p-1 hover:bg-crust"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {/* <span className="sr-only">Go to last page</span> */}
            <ChevronsRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
