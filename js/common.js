/* function ajaxUpload() {
  return Promise.resolve({
    uploadedImageUrl: "https://test.jpg"
  });
}

images_upload_handler: function(blobInfo, success, failure) {
  ajaxUpload(blobInfo.blob()).then(data => {
    success(data.uploadedImageUrl);
  });
} */

tinymce.init({
  selector: "#tinymce5",
  plugins:
    "print preview powerpaste importcss searchreplace autolink autosave directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
  menubar: "file edit view insert format tools table help",
  toolbar:
    "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview print | insertfile image media template link anchor codesample | ltr rtl",
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: "30s",
  autosave_prefix: "{path}{query}-{id}-",
  autosave_restore_when_empty: true,
  autosave_retention: "20m",
  image_advtab: true,
  importcss_append: true,
  height: 800,
  templates: [
    {
      title: "New Table",
      description: "creates a new table",
      content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>'
    },
    {
      title: "Starting my story",
      description: "A cure for writers block",
      content: "Once upon a time..."
    },
    {
      title: "New list with dates",
      description: "New List with dates",
      content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>'
    }
  ],
  template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
  template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
  image_caption: false,
  quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
  noneditable_noneditable_class: "mceNonEditable",
  toolbar_mode: "sliding",
  contextmenu: "link image imagetools table",
  // powerpaste
  powerpaste_word_import: "propmt",
  powerpaste_html_import: "propmt",
  powerpaste_allow_local_images: true,
  setup: function(editor) {
    editor.on("submit", function(e) {
      if (typeof editor.getBody().querySelectorAll("img")[0] !== "undefined") {
        var onlyImage = "<img src='" + editor.getBody().querySelectorAll("img")[0].src + "' alt='image' />";
        tinymce.activeEditor.setContent(onlyImage);
        alert(onlyImage);
      }
    });
  }
});
