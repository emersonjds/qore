"use client";

import * as React from "react";
import { type Table } from "@tanstack/react-table";
import { X, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui-shadcn/button";
import { Input } from "@/components/ui-shadcn/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchKey?: string;
  searchPlaceholder?: string;
  facetedFilters?: {
    column: string;
    title: string;
    options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  }[];
}

export function DataTableToolbar<TData>({
  table,
  searchKey,
  searchPlaceholder = "Buscar...",
  facetedFilters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={
              (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="h-9 w-[150px] lg:w-[250px]"
          />
        )}
        {facetedFilters?.map((filter) => {
          const column = table.getColumn(filter.column);
          if (!column) return null;
          return (
            <DataTableFacetedFilter
              key={filter.column}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          );
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar filtros
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
