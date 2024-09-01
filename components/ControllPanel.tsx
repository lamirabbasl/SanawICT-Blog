"use client";

import { MdAdd } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { useState } from "react";

interface DataItem {
  id: number;
  name: string;
}

interface GenericPageProps {
  items: DataItem[];
  isLoading: boolean;
  isError: boolean;
  onDeleteItem: (id: number) => Promise<void>;
  onCreateItem: (name: string) => Promise<void>;
  onEditItem: (id: number, name: string) => Promise<void>;
  title: string;
  addButtonLabel: string;
}

function ControllPanel({
  items,
  isLoading,
  isError,
  onDeleteItem,
  onCreateItem,
  onEditItem,
  title,
  addButtonLabel,
}: GenericPageProps) {
  const [newItemName, setNewItemName] = useState<string>("");
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [deleteModalTab, setDeleteModalTab] = useState<"confirm" | "edit">(
    "confirm"
  );
  const [selectedItemId, setSelectedItemId] = useState<number>(0);
  const [selectedItemName, setSelectedItemName] = useState<string>("");
  const [editItemName, setEditItemName] = useState<string>("");

  const handleOpenDeleteModal = (id: number, name: string) => {
    setIsDeleteModalOpen(true);
    setSelectedItemName(name);
    setSelectedItemId(id);
  };

  const handleEditItem = async (name: string) => {
    try {
      await onEditItem(selectedItemId, name);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to edit item:", error);
    }
  };

  const handleDeleteItem = async () => {
    try {
      await onDeleteItem(selectedItemId);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleCreateItem = async (name: string) => {
    try {
      await onCreateItem(name);
      setIsAddModalOpen(false);
      setNewItemName(""); // Clear the input after submission
    } catch (error) {
      console.error("Failed to create item:", error);
    }
  };

  return (
    <div
      className={
        isAddModalOpen || isDeleteModalOpen
          ? "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 z-50 relative bg-opacity-50 backdrop-blur"
          : "w-screen h-screen flex items-center justify-center flex-row-reverse gap-2 bg-primary shadow-md pr-6 z-20 relative"
      }
    >
      <div className="absolute top-[120px] right-8 flex-row-reverse flex flex-wrap gap-5 w-1/3">
        {items.map((item, index) => (
          <div
            className="relative inline-flex rounded-full bg-secondery px-3 pt-2 pb-1 cursor-default justify-center"
            key={index}
          >
            <div
              className="absolute cursor-pointer flex justify-center items-center -top-1 -right-2 rounded-full"
              onClick={() => handleOpenDeleteModal(item.id, item.name)}
            >
              <IoIosSettings className="text-[20px]" />
            </div>
            <p className="text-[15px] whitespace-nowrap">{item.name}</p>
          </div>
        ))}
        <div
          className="inline-flex rounded-full p-[2px] bg-[#3CE1C4] items-center text-white cursor-pointer justify-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <MdAdd className="text-[33px]" />
        </div>
      </div>

      {/* Modal for Delete/Edit Item */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] relative">
            <div className="flex justify-around mb-4">
              <button
                className={`px-4 py-1 rounded-md ${
                  deleteModalTab === "confirm"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDeleteModalTab("confirm")}
              >
                حذف
              </button>
              <button
                className={`px-4 py-1 rounded-md ${
                  deleteModalTab === "edit"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
                onClick={() => setDeleteModalTab("edit")}
              >
                ویرایش
              </button>
            </div>

            {deleteModalTab === "confirm" && (
              <div>
                <h2 className="text-lg text-right font-bold mb-4 ">
                  حذف شود؟ {selectedItemName} آیا
                </h2>
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-1 bg-gray-500 text-white rounded-md"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    انصراف
                  </button>
                  <button
                    className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                    onClick={handleDeleteItem}
                  >
                    تایید
                  </button>
                </div>
              </div>
            )}

            {deleteModalTab === "edit" && (
              <div>
                <h2 className="text-lg text-right font-bold mb-4 ">
                  {selectedItemName} ویرایش
                </h2>
                <input
                  type="text"
                  className="w-full h-[40px] p-2 border ring-1 ring-black focus:ring-[#3CE1C4] focus:outline-none border-gray-300 rounded-md mb-4 text-right"
                  placeholder="نام جدید را وارد کنید"
                  value={editItemName}
                  onChange={(e) => setEditItemName(e.target.value)}
                />
                <div className="flex justify-end gap-4">
                  <button
                    className="px-4 py-1 bg-gray-500 text-white rounded-md"
                    onClick={() => setIsDeleteModalOpen(false)}
                  >
                    انصراف
                  </button>
                  <button
                    className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                    onClick={() => handleEditItem(editItemName)}
                    disabled={!editItemName.trim()}
                  >
                    تایید
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding New Item */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] relative">
            <h2 className="text-lg text-right font-bold mb-4 ">
              {addButtonLabel}
            </h2>
            <input
              type="text"
              className="w-full h-[40px] p-2 border ring-1 ring-black focus:ring-[#3CE1C4] focus:outline-none border-gray-300 rounded-md mb-4 text-right"
              placeholder="نام جدید را وارد کنید"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-1 bg-gray-500 text-white rounded-md"
                onClick={() => setIsAddModalOpen(false)}
              >
                انصراف
              </button>
              <button
                className="px-4 py-1 bg-[#3CE1C4] font-bold text-white rounded-md"
                onClick={() => handleCreateItem(newItemName)}
                disabled={!newItemName.trim()}
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

export default ControllPanel;
