"use client";

import React, { useState } from "react";
import {
  useGetViolationReportCases,
  useReportArticle,
} from "@/hooks/useReactQuery";

function Report({
  articleId,
  onClose,
}: {
  articleId: number;
  onClose: () => void;
}) {
  const {
    data,
    isLoading: isCasesLoading,
    isError,
  } = useGetViolationReportCases();
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { mutateAsync, isError: isMutationError } = useReportArticle();

  const handleReportSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const violationReportCaseId = parseInt(selectedReport, 10);

      if (isNaN(violationReportCaseId)) {
        throw new Error("Invalid report case selected");
      }

      // Mutate to report the article
      await mutateAsync({
        articleId,
        description,
        violationReportCaseId,
      });

      // Close the modal after successful submission
      onClose();
    } catch (error) {
      console.error("Failed to submit report:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">گreport a violation</h2>

        <form onSubmit={handleReportSubmit}>
          <select
            className="w-full flex items-center h-[40px] text-right p-2 border border-gray-300 rounded-md mb-4"
            value={selectedReport}
            onChange={(e) => setSelectedReport(e.target.value)}
            disabled={isCasesLoading}
          >
            <option value="" disabled>
              انتخاب نوع تخلف
            </option>
            {data?.data.violationReportCases.map(
              (report: any, index: number) => (
                <option value={report.id} key={index}>
                  {report.name}
                </option>
              )
            )}
          </select>

          <textarea
            placeholder="توضیحات خود را وارد کنید"
            className="w-full h-[100px] text-right p-2 border border-gray-300 rounded-md mb-4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={onClose}
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={!selectedReport || !description} // Disable button if fields are empty
            >
              گزارش تخلف
            </button>
          </div>

          {isMutationError && (
            <div className="text-red-500 mt-4">
              ارسال گزارش با خطا مواجه شد.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Report;
