window.addEventListener("load", function () {
    var editor = ace.edit("editor");
    var session = editor.getSession();

    /**
     * runCode
     * The function that sends the code to the server side and waits for the response.
     *
     * @name runCode
     * @function
     * @param {String} code The code that is passed on the server side via HTTP request.
     * @param {Function} callback The callback function that is called after the response comes.
     * @return {XMLHttpRequest} The XHR that is made.
     */
    function runCode (code, callback) {
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
