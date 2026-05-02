"use client";
import React, { useState } from "react";

interface EmailFilterButtonProps {
  onFilterChange: (filters: {
    status: "all" | "sent" | "students_without_emails";
  }) => void;
  currentFilters: {
    status: "all" | "sent" | "students_without_emails";
  };
}

export function EmailFilterButton({ onFilterChange, currentFilters }: EmailFilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleStatusChange = (status: "all" | "sent" | "students_without_emails") => {
    onFilterChange({ status });
  };

  const clearFilters = () => {
    onFilterChange({ status: "all" });
    setIsOpen(false);
  };

  const hasActiveFilters = currentFilters.status !== "all";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
          hasActiveFilters
            ? "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
        }`}
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            •
          </span>
        )}
        <svg
          className="ml-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 dark:ring-gray-700">
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Email Status
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "All Emails" },
                  { value: "sent", label: "Sent Emails" },
                  { value: "students_without_emails", label: "Student who hasn't received any email" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="status"
                      value={option.value}
                      checked={currentFilters.status === option.value}
                      onChange={() => handleStatusChange(option.value as any)}
                      className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Clear Filters
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
