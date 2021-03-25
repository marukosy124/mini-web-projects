var content;

// load content to textbox
function init() {
  content = document.getElementById("textbox");
}

// get color for changing font color
function getColor(type) {
  if (type == "font") {
    return document.getElementById("colorpicker-font").value;
  } else {
    return document.getElementById("colorpicker-highlight").value;
  }
}

// format content
function formatDoc(sCmd, sValue) {
  document.execCommand(sCmd, false, sValue);
  content.focus();
}
