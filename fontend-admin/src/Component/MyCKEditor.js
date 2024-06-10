import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export default function MyCKEditorComponent({ value, onChange }) {
  return (
    <div className="khung-my-ckeditor">
      <div className="my-ckeditor">
        <CKEditor
          editor={Editor}
          data={value}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            onChange(data); // Gọi hàm onChange được truyền từ component cha
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        />
      </div>
    </div>
  );
}
