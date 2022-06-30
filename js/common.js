function customColorList() {
  return [
    { name: "custom_color_black", color: "#000000" },
    { name: "custom_color_blue", color: "#2880b9" },
    { name: "custom_color_white", color: "#ffffff" },
    { name: "custom_color_red", color: "#e74c3c" },
  ];
}

function customColor(editor, colorObject) {
  var colorClassName = colorObject["name"];
  var colorName = colorObject["color"];
  editor.ui.registry.addButton(colorClassName, {
    text: '<span class="' + colorClassName + '"></span>',
    tooltip: "custom color",
    onAction: function () {
      tinymce.activeEditor.execCommand("ForeColor", false, colorObject.color);
    },
    onSetup: function () {
      var $dom = tinymce.dom.DomQuery;
      var $locatorEl = $dom(editor.getContainer()).find("." + colorClassName);
      var $buttonEl = $locatorEl.closest("button");
      $buttonEl.css({ "background-color": colorName, width: "18px", height: "18px", margin: "0 3px", cursor: "pointer", border: "1px solid #000" });
      $locatorEl.remove();
    },
  });
}

tinymce.init({
  selector: "#tinymce5",
  height: 400,
  plugins:
    "powerpaste importcss searchreplace autosave directionality visualblocks image table charmap hr pagebreak nonbreaking anchor link media wordcount template hr code fullscreen help emoticons",
  menubar: "file edit view insert format tools table help",
  toolbar:
    "restoredraft | undo redo | formatselect | bold italic strikethrough underline | custom_color_black custom_color_blue custom_color_white custom_color_red forecolor backcolor | numlist bullist | fontsizeselect | alignleft aligncenter alignright alignjustify | outdent indent | removeformat | emoticons | link image youtube table | audiotag iframe hr template code | fullscreen",
  default_target_link: "_blank",
  contextmenu: "link searchreplace image table",
  placeholder: "Contents",
  toolbar_sticky: true,
  autosave_ask_before_unload: false,
  autosave_interval: "30s",
  autosave_prefix: "{path}{query}-{id}-",
  autosave_restore_when_empty: false,
  autosave_retention: "20m",
  media_dimensions: false,
  media_poster: false,
  indentation: "3rem",
  body_class: "contents_area",
  object_resizing: ":not(table)",
  content_css: [""],
  table_default_attributes: {
    class: "tableLayoutNormal",
  },
  extended_valid_elements: "i[*],audio[controls|controlslist]",
  entity_encoding: "raw",
  force_br_newlines: true,
  force_p_newlines: false,
  forced_root_block: "div",
  powerpaste_word_import: "propmt",
  powerpaste_html_import: "propmt",
  powerpaste_allow_local_images: false,
  paste_data_images: true,
  paste_preprocess: function (plugin, args) {
    args.content = args.content
      .replace(/font-(family|size):.*?;/g, "")
      .replace(/<iframe.*?<\/iframe>/g, "")
      .replace(/width:+(\s)*0px/g, "")
      .replace(/<form.*?<\/form>/g, "");
  },
  fontsize_formats: "10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 24px 36px 48px",
  setup: function (ed) {
    ed.on("FullscreenStateChanged", function (e) {
      if (!$(".modal").is(":visible")) return;
      var $modalDialog = $(".modal");
      if (e.state) {
        $modalDialog.addClass("fullscreen");
      } else {
        $modalDialog.removeClass("fullscreen");
      }
    });
    ed.on("keydown", function (event) {
      if (9 !== event.keyCode) {
        return;
      }
      if (event.shiftKey) {
        ed.execCommand("Outdent");
      } else {
        ed.execCommand("Indent");
      }
      event.preventDefault();
    });
    var customColors = customColorList();
    for (var i = 0; i < customColors.length; i++) {
      customColor(ed, customColors[i]);
    }
  },
});
