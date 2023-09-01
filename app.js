// app.js

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { AutoLink, Link, LinkImage } from "@ckeditor/ckeditor5-link";
import {
  AutoImage,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
} from "@ckeditor/ckeditor5-image";
import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "@ckeditor/ckeditor5-basic-styles";


ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      Essentials,
      Paragraph,
      Bold,
      Italic,
      Image,
      ImageResize,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      SimpleUploadAdapter,
      LinkImage,
      ImageUpload,
      MediaEmbed,
    ],
    toolbar: [
      'undo',
      'redo',
      'imageStyle:full',
      "|",
      "alignment",
      "|",
      "bold",
      "italic",
      "underline",
      "imageUpload",
      "link",
      "mediaEmbed",
    ],
    simpleUpload: {
      uploadUrl: 'upload.php'
    },
    image: {
      toolbar: [
        "imageTextAlternative",
        "toggleImageCaption",
        "imageStyle:inline",
        "imageStyle:block",
        "imageStyle:side",
        "linkImage"
      ],
    },
  })
  .then(editor => {
    window.editor = editor;
    async function obtenerContenidoArchivo() {
      try {
        const response = await fetch('./data/db.txt');

        if (!response.ok) return

        const data = await response.text();
        window.editor.setData(data);
      } catch (error) {
        console.error('Hubo un problema:', error);
      }
    }

    obtenerContenidoArchivo();

  })
  .catch(error => {
    console.error(error.stack);
  });
