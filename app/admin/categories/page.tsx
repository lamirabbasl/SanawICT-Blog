"use client";

import {
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useGetCategories,
} from "@/hooks/useReactQuery";

import ControllPanel from "@/components/ControllPanel";

function ViolationReportsPage() {
  const {
    data: reportCases,
    isLoading: isReportCaseLoading,
    isError: isReportCaseError,
  } = useGetCategories();

  const { mutateAsync: deleteReportCase } = useDeleteCategory();
  const { mutateAsync: createReportCase } = useCreateCategory();
  const { mutateAsync: editReportCase } = useEditCategory();

  return (
    <ControllPanel
      items={reportCases?.data?.categories || []}
      isLoading={isReportCaseLoading}
      isError={isReportCaseError}
      onDeleteItem={deleteReportCase}
      onCreateItem={(name: string) => createReportCase(name)}
      onEditItem={(id: number, name: string) => editReportCase({ id, name })}
      title="گزارش ها"
      addButtonLabel="افزودن دسته بندی جدید"
    />
  );
}

export default ViolationReportsPage;
