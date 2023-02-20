let display = (input_string) => {
    let output = document.createElement("div");
    output.innerText = input_string;
    return output.innerHTML;
}

let function_object = 
{
    alertDialog: () => {
        let dialog = document.getElementById("dialog");
        dialog.innerHTML = "";
        dialog.open = true;
        dialog.innerHTML = "<p>Alert custom button is clicked</p>";

        let OkBtn = document.createElement("button");
        OkBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            dialog.open = false;
        });
        OkBtn.innerHTML = "OK";
        dialog.appendChild(OkBtn);
    },
    
    confirmDialog: () => {
        let dialog = document.getElementById("dialog");
        dialog.innerHTML = "";
        dialog.open = true;
        dialog.innerHTML = "<p>Confirm custom button is clicked</p>";

        let OkBtn = document.createElement("button");
        OkBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            dialog.open = false;
            let output = document.getElementById("output_custom");
            output.innerHTML = "The value returned by the confirm method is : False;"
        });
        OkBtn.innerHTML = "OK";
        dialog.appendChild(OkBtn);

        let cancelBtn = document.createElement("button");
        cancelBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            dialog.open = false;
            let output = document.getElementById("output_custom");
            output.innerHTML = "The value returned by the confirm method is : True;"
        });
        cancelBtn.innerHTML = "cancel";
        dialog.appendChild(cancelBtn);
    },
    
    promptDialog: () => {
        let dialog = document.getElementById("dialog");
        dialog.innerHTML = "";
        dialog.open = true;
        dialog.innerHTML = "<p>Prompt custom button is clicked, enter your text</p>";

        let textinput = document.createElement("input");
        textinput.type = "text";
        dialog.appendChild(textinput);

        let OkBtn = document.createElement("button");
        OkBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            let output = document.getElementById("output_custom");
            let input = OkBtn.previousSibling.value;
            if(input === "") input = "User did not enter anything";
            output.innerHTML = `${display(input)}`;
            dialog.open = false;
        });
        OkBtn.innerHTML = "OK";
        dialog.appendChild(OkBtn);

        let cancelBtn = document.createElement("button");
        cancelBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            dialog.open = false;
        });
        cancelBtn.innerText = "cancel";
        dialog.appendChild(cancelBtn);
    },
    
    saferpromptDialog: () => {
        let dialog = document.getElementById("dialog");
        dialog.innerHTML = "";
        dialog.open = true;
        dialog.innerHTML = "<p>Safer prompt custom button is clicked, enter your text</p>";

        let textinput = document.createElement("input");
        textinput.type = "text";
        dialog.appendChild(textinput);

        let OkBtn = document.createElement("button");
        OkBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            let output = document.getElementById("output_custom");
            let input = OkBtn.previousSibling.value;
            if(input === "") input = "User did not enter anything";
            input = DOMPurify.sanitize(input);
            output.innerText = `${display(input)}`;
            dialog.open = false;
        });
        OkBtn.innerHTML = "OK";
        dialog.appendChild(OkBtn);

        let cancelBtn = document.createElement("button");
        cancelBtn.addEventListener("click", function(){
            let dialog = document.getElementById("dialog");
            dialog.open = false;
        });
        cancelBtn.innerHTML = "cancel";
        dialog.appendChild(cancelBtn);
    }
};

export { 
    function_object,
    display
 };