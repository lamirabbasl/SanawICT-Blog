"use client";

import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Token from "@/utility/token";
import { IoRemove } from "react-icons/io5";

import {
  ClassicEditor,
  Alignment,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BlockQuote,
  Bold,
  PageBreak,
  Code,
  Essentials,
  Heading,
  Highlight,
  Font,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  SimpleUploadAdapter,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo,
  EditorConfig,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";
import { useGetCategories } from "@/hooks/useReactQuery";

export default function Ckeditor() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<ClassicEditor | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorData, setEditorData] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");

  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [readTimeAsMin, setReadTimeAsMin] = useState(0);
  const [categoryId, setCategoryId] = useState(1);
  const [selected, setSelected] = useState<number>();
  const { data, isLoading, isError, refetch } = useGetCategories();

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();

    if (tags.length >= 6) {
      alert("You can only add up to 6 tags.");
      return;
    }

    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // Remove the selected tag from the array
  };

  const setCategory = (id: number) => {
    setSelected(id);
    setCategoryId(id);
  };

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig: EditorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "|",
        "bold",
        "italic",
        "underline",
        "code",
        "|",
        "alignment:left",
        "alignment:right",
        "alignment:center",
        "alignment:justify",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "highlight",
        "blockQuote",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
        "|",
        "pageBreak",
        "|",
        "accessibilityHelp",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      Alignment,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      PageBreak,
      Code,
      Essentials,
      Heading,
      Highlight,
      Font,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      SimpleUploadAdapter,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
      Undo,
    ],
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    simpleUpload: {
      uploadUrl: `/api/articles/fileUpload`,

      headers: {
        Authorization: `Bearer ${Token}`,
      },
    },
    fontFamily: {
      options: [
        "default",
        "vazir",
        "lalezar",
        "Arial, Helvetica, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Lucida Sans Unicode, Lucida Grande, sans-serif",
        "Tahoma, Geneva, sans-serif",
        "Times New Roman, Times, serif",
        "Trebuchet MS, Helvetica, sans-serif",
        "Verdana, Geneva, sans-serif",
      ],
    },

    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    placeholder: "Type or paste your content here!",
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };

  const handleSaveArticle = async () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current;
      const content = editorInstance.getData();

      try {
        const response = await fetch("/api/articles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
          body: JSON.stringify({
            title,
            metaTitle,
            content,
            tags,
            readTimeAsMin,
            categoryId: categoryId,
          }),
        });

        if (response.ok) {
          console.log("Article saved successfully!");
        } else {
          console.error("Failed to save the article.");
        }
      } catch (error) {
        console.error("Error occurred while saving the article:", error);
      }
    }
  };

  return (
    <div className="pb-28 w-screen">
      <div className="main-container  relative text-xs w-screen h-screen flex flex-col gap-6 items-center justify-center ">
        <form className=" flex  max-md:flex-col w-5/6  max-md:mt-[270px] text-[18px] max-md:gap-9 flex-row-reverse items-center mb-28  max-md:mb-6 gap-16  justify-center  font-vazir">
          <div className=" flex flex-col gap-6 ">
            <label htmlFor="title" className=" text-right">
              عنوان مقاله
            </label>
            <input
              id="title"
              type="text"
              placeholder="عنوان را وارد کنید"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className=" border-b-2 border-green-500 text-xs ring-gray-300 placeholder:text-right  placeholder:text-xs focus:text-right  rounded-sm  outline-none"
            />
          </div>
          <div className=" flex flex-col gap-6 ">
            <label htmlFor="metaTitle" className=" text-right">
              خلاصه مقاله
            </label>
            <input
              placeholder="متن را وارد کنید"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              className=" border-b-2 border-green-500  text-xs placeholder:text-right  placeholder:text-xs focus:text-right  rounded-sm   outline-none"
            />
          </div>
          <div className="flex flex-col relative gap-6">
            <label htmlFor="tags" className="text-right">
              تگ ها
            </label>
            <div className=" flex   flex-row-reverse gap-3 justify-center items-center">
              <input
                type="text"
                placeholder="تگ را مقاله را وارد کنید"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update input value on change
                className="border-b-2 border-green-500 text-xs placeholder:text-right placeholder:text-xs focus:text-right rounded-sm outline-none"
              />
              <button
                onClick={handleAddTag}
                className="bg-green-500 text-xs text-white px-2 py-1 rounded ml-2"
              >
                افزودن
              </button>
            </div>

            <div className=" absolute -bottom-16 flex flex-wrap h-10 gap-2 ">
              {tags.map((tag, index) => (
                <div className=" relative">
                  <span
                    key={index}
                    className="inline-block  bg-gray-200 text-xs text-black px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                  <IoRemove
                    className=" absolute -top-2 cursor-pointer -right-2 text-[20px] text-red-500  bg-white border-2 rounded-full"
                    onClick={() => handleRemoveTag(tag)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className=" flex flex-col max-md:mt-20 gap-6 justify-center items-center">
            <label htmlFor="tags" className="">
              مدت زمان مطالعه
            </label>
            <input
              type="number"
              value={readTimeAsMin}
              onChange={(e) => setReadTimeAsMin(Number(e.target.value))}
              className=" w-6 text-center  border-b-2  border-green-500 text-xs placeholder:text-right  placeholder:text-xs focus:text-center  rounded-sm outline-none"
            />
          </div>

          <div className="flex mr-20 mt-10 rounded-xl max-md:mt-20  max-md:w-full relative flex-wrap w-1/6 items-center flex-row-reverse gap-2 bg-primary ">
            <p className=" absolute  -top-10 right-[70px] max-md:right-[80px]">
              دسته بندی
            </p>
            {data?.data?.categories.map((category: any, index: number) => (
              <div
                className={
                  selected == category.id
                    ? " flex rounded-full bg-gray-600 text-white px-3 pt-2 pb-1 cursor-pointer"
                    : " flex rounded-full bg-secondery px-3 pt-2 pb-1 cursor-pointer"
                }
                key={index}
                onClick={() => setCategory(category.id)}
              >
                <p className=" text-center text-[12px]">{category.name}</p>
              </div>
            ))}
          </div>
        </form>

        <div
          className="editor-container editor-container_classic-editor"
          ref={editorContainerRef}
        >
          <div className="editor-container__editor">
            <div ref={editorContainerRef}>
              {isLayoutReady ? (
                <CKEditor
                  editor={ClassicEditor}
                  config={editorConfig}
                  onReady={(editor) => {
                    editorRef.current = editor;
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        "height",
                        "400px",
                        editor.editing.view.document.getRoot()
                      );
                    });
                  }}
                  data={editorData}
                  onChange={(_, editor) => {
                    setEditorData(editor.getData());
                  }}
                />
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-screen  items-center justify-center">
        <button
          onClick={handleSaveArticle}
          className="  rounded-md  px-3 py-1  text-white font-vazir bg-green-500"
        >
          انتشار مقاله
        </button>
      </div>
    </div>
  );
}
