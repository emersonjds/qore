"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui-shadcn/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { Skeleton } from "@/components/ui-shadcn/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  isLoading?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (pagination: PaginationState) => void;
  manualPagination?: boolean;
  facetedFilters?: {
    column: string;
    title: string;
    options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Buscar...",
  isLoading = false,
  pageCount,
  pagination: controlledPagination,
  onPaginationChange,
  manualPagination = false,
  facetedFilters,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [internalPagination, setInternalPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const pagination = controlledPagination ?? internalPagination;

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount ?? -1,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      if (onPaginationChange) {
        onPaginationChange(newPagination);
      } else {
        setInternalPagination(newPagination);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
    getPaginationRowModel: manualPagination ? undefined : getPaginationRowModel(),
    getSortedRowModel: manualPagination ? undefined : getSortedRowModel(),
    manualPagination,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchKey={searchKey}
        searchPlaceholder={searchPlaceholder}
        facetedFilters={facetedFilters}
      />
      <div className="rounded-xl border border-gray-200 dark:border-gray-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: pagination.pageSize }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((_, j) => (
                    <TableCell key={`skeleton-cell-${j}`}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-500 dark:text-gray-400"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
