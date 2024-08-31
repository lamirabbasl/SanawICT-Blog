"use client";

import {
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useGetCategories,
} from "@/hooks/useReactQuery";
import { MdAdd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

function Page() {
  const { data, isLoading, isError, refetch } = useGetCategories();
  const { mutateAsync: deleteCategory, isError: isDeleteError } =
    useDeleteCategory();

  const { mutateAsync: createCategory, isError: isCreateError } =
    useCreateCategory();

  const { mutateAsync: editCategory, isError: isEditError } = useEditCategory();

  const [newCategory, setNewCategory] = useState<string>("");
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [deleteTab, setDeleteTab] = useState<"confirm" | "settings">("confirm");
  const [deleteId, setDeleteID] = useState<number>(0);
  const [deleteName, setDeleteName] = useState<string>("");
  const [editCategoryName, setEditCategoryName] = useState<string>("");

  const handleOpenDelete = (id: number, name: string) => {
    setOpenDelete(true);
    setDeleteTab("confirm");
    setDeleteName(name);
    setDeleteID(id);
  };

  const handleEditCategory = async (name: string) => {
    try {
      await editCategory({ name, id: deleteId });
      setOpenDelete(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory(deleteId);
      setOpenDelete(false);
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleCreateCategory = async (name: string) => {
    try {
      await createCategory(name);
      setOpenAdd(false);
      setNewCategory(""); // Clear the input after submission
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };

  return (
    <div
      className={
        openAdd || openDelete
          ? "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 relative bg-opacity-50 z-50 backdrop-blur"
          : "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 z-20 relative"
      }
    >
      <div className="absolute top-[120px] right-8 flex-row-reverse flex flex-wrap gap-5 w-5/6">
        {data?.data?.categories.map((category: any, index: any) => (
          <div
            className="relative inline-flex rounded-full bg-secondery px-3 pt-2 pb-1 cursor-default justify-center"
            key={index}
          >
            <div
              className="absolute cursor-pointer flex justify-center items-center -top-1 -right-2 rounded-full"
              onClick={() => handleOpenDelete(category.id, category.name)}
            >
              <IoIosSettings className="text-[20px]" />
            </div>
            <p className="text-[15px] whitespace-nowrap">{category.name}</p>
          </div>
        ))}
        {data && (
          <div
            className="inline-flex rounded-full p-[2px] bg-[#3CE1C4] items-center text-white cursor-pointer justify-center"
            onClick={() => setOpenAdd(true)}
          >
            <MdAdd className="text-[33px]" />
          </div>
        )}
      </div>

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
                حذف دسته بندی
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
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
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
                    onClick={() => handleEditCategory(editCategoryName)}
                    disabled={!editCategoryName.trim()}
                  >
                    تایید
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding New Category */}
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
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
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
                onClick={() => handleCreateCategory(newCategory)}
                disabled={!newCategory.trim()}
              >
                تایید
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
