// app.js

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Heading } from '@ckeditor/ckeditor5-heading';
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
      Heading,
      Paragraph,
      Bold,
      Underline,
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
      "heading",
      "|",
      'undo',
      'redo',
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
    heading: {
      options: [
        { model: 'paragraph', title: 'Párrafo' },
        { model: 'heading1', view: 'h1', title: 'Título 1' },
        { model: 'heading2', view: 'h2', title: 'Título 2' },
        { model: 'heading3', view: 'h3', title: 'Título 3' },
      ]
    },
    mediaEmbed: {
      previewsInData: true,
    },
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
