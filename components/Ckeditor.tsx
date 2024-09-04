"use client";

import { useState, useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Token from "@/utility/token";

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

export default function Ckeditor() {
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<ClassicEditor | null>(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorData, setEditorData] = useState<string>("");

  const [title, setTitle] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [tags, setTags] = useState("");
  const [readTimeAsMin, setReadTimeAsMin] = useState(1);
  const [categoryId, setCategoryId] = useState(1);

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
        accept: "application/json",
        "content-type": "*/*",
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
            categoryId,
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
    <div>
      <div className="main-container relative  w-screen h-screen flex flex-col gap-6 items-center justify-center ">
        <div className=" flex  flex-row-reverse items-start mb-28">
          <div className=" flex flex-col">
            <label htmlFor="" className=" font-vazir">
              عنوان مقاله
            </label>
            <input
              type="text"
              placeholder="asmn"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Meta Title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <input
            type="number"
            placeholder="Read Time (min)"
            value={readTimeAsMin}
            onChange={(e) => setReadTimeAsMin(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Category ID"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          />
        </div>

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
                        "300px",
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
      <button onClick={handleSaveArticle}>Save Article</button>
    </div>
  );
}
