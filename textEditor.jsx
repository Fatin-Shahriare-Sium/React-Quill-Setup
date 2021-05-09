import React,{useState} from 'react'
import ReactQuill,{Quill} from 'react-quill'
import ImageUploader from "quill-image-uploader";
import ImageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', ImageResize)
Quill.register("modules/imageUploader",ImageUploader)
const TextEditor = () => {
    let[text,setText]=useState('')
    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'video',
      'color',
      "link",
      'resize'
    ];
    
  
    const modules = {
      toolbar: [
        [{ 'font': [] }, { 'size': [] }],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'super' }, { 'script': 'sub' }],
        [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block' ],
        [{ 'list': 'ordered' }, { 'list': 'bullet'}, { 'indent': '-1' }, { 'indent': '+1' }],
        [ 'direction', { 'align': [] }],
        [ 'link', 'image', 'video', 'formula' ],
        [ 'clean' ]
      ],
      imageUploader: {
        upload: file => {
            // return 'https://res.cloudinary.com/sium/image/upload/v1620553545/kqcqwdf20pa6nhkopvq1.jpg'
            console.log('file',file);
        
          return new Promise((resolve, reject) => {
           
            const formData = new FormData();
            formData.append("file", file);
            formData.append('upload_preset', 'taskman');
            fetch(
              "https://api.Cloudinary.com/v1_1/sium/image/upload",
              {
                method: "POST",
                body: formData
              }
            )
              .then(response => response.json())
              .then(result => {
                console.log(result);
                resolve(result.url);
              })
              .catch(error => {
                reject("Upload failed");
                console.error("Error:", error);
              });
          });
        }
    },
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize']
     }
    
    };
    return (
        <div>
            <ReactQuill
            value={text}
            modules={modules}
            formats={formats}
            onChange={(event)=>console.log(event)}
            />
        </div>
    )
}

export default TextEditor;
