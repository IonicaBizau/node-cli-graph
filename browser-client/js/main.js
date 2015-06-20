window.addEventListener("load", function () {
    var editor = ace.edit("editor");
    var session = editor.getSession();

    function runCode (code) {
        eval(code);
        document.querySelector("pre").innerHTML = __graph;
    }

    //setup editor
    editor.setTheme("ace/theme/textmate");
    editor.setFontSize(13);
    session.setMode("ace/mode/javascript");

    // auto-complete
    ace.require("ace/ext/language_tools");
    editor.setOptions({
        enableBasicAutocompletion: true,
    });

    editor.commands.on("afterExec", function(e){
         if (e.command.name == "insertstring"&& e.args === ".") {
             editor.execCommand("startAutocomplete")
         }
    });

    // click handler
    document.querySelector(".run-code-btn").addEventListener("click", function () {
        runCode(editor.getValue());
    });
});
