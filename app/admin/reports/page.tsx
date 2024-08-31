"use client";

import {
  useCreateViolationReportCase,
  useDelteViolationReportCase,
  useEditeViolationReportCase,
  useGetViolationReportCases,
  useGetViolationReports,
} from "@/hooks/useReactQuery";
import { MdAdd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

function Page() {
  const {
    data: reports,
    isLoading: isReportLoadig,
    isError: isReportError,
  } = useGetViolationReports();
  const {
    data: reportCases,
    isLoading: isReporCasetLoadig,
    isError: isReporCasetError,
  } = useGetViolationReportCases();

  const { mutateAsync: deleteReportCase, isError: isDeleteReportError } =
    useDelteViolationReportCase();

  const { mutateAsync: createReportCase, isError: isCreateReportError } =
    useCreateViolationReportCase();

  const { mutateAsync: editReportCase, isError: isEditReportCaseError } =
    useEditeViolationReportCase();

  const [newReportCase, setNewReportCase] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteTab, setDeleteTab] = useState<"confirm" | "settings">("confirm");
  const [deleteId, setDeleteID] = useState<number>(0);
  const [deleteName, setDeleteName] = useState<string>("");
  const [editReportCaseName, setEditReportCaseName] = useState<string>("");

  const handleOpenDelete = (id: number, name: string) => {
    setOpenDelete(true);
    setDeleteName(name);
    setDeleteID(id);
  };

  const handleEditCategory = async (name: string) => {
    try {
      await editReportCase({ name, id: deleteId });
      setOpenDelete(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteReportCase(deleteId);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCreateCategory = async (name: string) => {
    try {
      await createReportCase(name);
      setOpenAdd(false);
      setNewReportCase(""); // Clear the input after submission
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div
      className={
        openAdd || openDelete
          ? "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 z-50 relative bg-opacity-50 backdrop-blur"
          : "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 z-20 relative"
      }
    >
      <div className=" absolute top-[120px] right-8 flex-row-reverse flex flex-wrap gap-5  w-1/3 ">
        {reportCases?.data?.violationReportCases.map(
          (reportCase: any, index: any) => (
            <div
              className="relative inline-flex rounded-full bg-secondery px-3 pt-2 pb-1 cursor-default justify-center"
              key={index}
            >
              <div
                className="absolute cursor-pointer flex justify-center items-center -top-1 -right-2 rounded-full"
                onClick={() => handleOpenDelete(reportCase.id, reportCase.name)}
              >
                <IoIosSettings className="text-[20px]" />
              </div>
              <p className="text-[15px] whitespace-nowrap">{reportCase.name}</p>
            </div>
          )
        )}
        {reportCases && (
          <div
            className="inline-flex rounded-full p-[2px] bg-[#3CE1C4] items-center text-white cursor-pointer justify-center"
            onClick={() => setOpenAdd(true)}
          >
            <MdAdd className="text-[33px]" />
          </div>
        )}
      </div>

      {/* Modal for delete a category */}

      {/* Modal for Delete Category */}
      {openDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] relative">
            <div className="flex justify-around mb-4">
              <button
                className={`px-4 py-1 rounded-md ${
                  deleteTab === "confirm"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDeleteTab("confirm")}
              >
                حدف دسته بندی
              </button>
              <button
                className={`px-4 py-1 rounded-md ${
                  deleteTab === "settings"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDeleteTab("settings")}
              >
                ویرایش دسته بندی
              </button>
            </div>

            {deleteTab === "confirm" && (
              <div>
                <h2 className="text-lg text-right font-bold mb-4 ">
                  حذف شود؟ {deleteName} آیا
                </h2>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-1 bg-gray-500 text-white rounded-md"
                    onClick={() => setOpenDelete(false)}
                  >
                    انصراف
                  </button>
                  <button
                    className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                    onClick={() => handleDeleteCategory()}
                  >
                    تایید
                  </button>
                </div>
              </div>
            )}

            {deleteTab === "settings" && (
              <div>
                <h2 className="text-lg text-right font-bold mb-4 ">
                  {deleteName} ویرایش
                </h2>
                <input
                  type="text"
                  className="w-full h-[40px] p-2 border ring-1 ring-black focus:ring-[#3CE1C4] focus:outline-none border-gray-300 rounded-md mb-4 text-right"
                  placeholder="نام دسته بندی را وارد کنید"
                  value={editReportCaseName}
                  onChange={(e) => setEditReportCaseName(e.target.value)}
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-1 bg-gray-500 text-white rounded-md"
                    onClick={() => setOpenDelete(false)}
                  >
                    انصراف
                  </button>
                  <button
                    className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                    onClick={() => handleEditCategory(editReportCaseName)}
                    disabled={!editReportCaseName.trim()}
                  >
                    تایید
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for adding new category */}
      {openAdd && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] relative">
            <h2 className="text-lg text-right font-bold mb-4 ">
              افزودن دسته بندی جدید
            </h2>
            <input
              type="text"
              className="w-full h-[40px] p-2 border ring-1 ring-black focus:ring-[#3CE1C4] focus:outline-none border-gray-300 rounded-md mb-4 text-right"
              placeholder="نام دسته بندی را وارد کنید"
              value={newReportCase}
              onChange={(e) => setNewReportCase(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-1 bg-gray-500 text-white rounded-md"
                onClick={() => setOpenAdd(false)}
              >
                انصراف
              </button>
              <button
                className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                onClick={() => handleCreateCategory(newReportCase)}
                disabled={!newReportCase.trim()}
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" absolute top-0 left-[930px] flex flex-col justify-center items-center w-[1px] h-screen bg-gray-200"></div>
      <div className=" absolute top-[100px] left-[530px] flex flex-col justify-center items-center w-28 h-10 ">
        <h2 className="text-center font-bold">گزارش ها</h2>
        {/* {reports.data.violationReports.map((reports: any, index: number) => {
          <div></div>;
        })} */}
      </div>
    </div>
  );
}

export default Page;
