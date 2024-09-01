import ControllPanel from "@/components/ControllPanel";
import {
  useCreateViolationReportCase,
  useDelteViolationReportCase,
  useEditeViolationReportCase,
  useGetViolationReportCases,
  useGetViolationReports,
} from "@/hooks/useReactQuery";

function ViolationReportsPage() {
  const {
    data: reportCases,
    isLoading: isReportCaseLoading,
    isError: isReportCaseError,
  } = useGetViolationReportCases();

  const {
    data: report,
    isLoading: isReportLoading,
    isError: isReportError,
  } = useGetViolationReports();

  const { mutateAsync: deleteReportCase } = useDelteViolationReportCase();
  const { mutateAsync: createReportCase } = useCreateViolationReportCase();
  const { mutateAsync: editReportCase } = useEditeViolationReportCase();

  return (
    <div>
      <ControllPanel
        items={reportCases?.data?.violationReportCases || []}
        isLoading={isReportCaseLoading}
        isError={isReportCaseError}
        onDeleteItem={deleteReportCase}
        onCreateItem={(name: string) => createReportCase(name)}
        onEditItem={(id: number, name: string) => editReportCase({ id, name })}
        title="گزارش ها"
        addButtonLabel="افزودن دسته بندی جدید"
      />
      {}
    </div>
  );
}

export default ViolationReportsPage;
