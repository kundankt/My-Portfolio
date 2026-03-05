async function runModel(endpoint, inputId, btnElement, isFile = false) {
    const outputBox = document.getElementById(`output-${endpoint}`);
    const inputElement = document.getElementById(inputId);
    
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = `Processing...`;
    btnElement.disabled = true;
    outputBox.style.display = "none";

    const formData = new FormData();
    
    if (isFile) {
        if(inputElement.files.length === 0) {
            showError("Please select a file first!", outputBox, btnElement, originalHTML);
            return;
        }
        formData.append("file", inputElement.files[0]);
    } else {
        if(inputElement.value.trim() === "") {
            showError("Please enter some input!", outputBox, btnElement, originalHTML);
            return;
        }
        let key = "text";
        if(endpoint === 'diffusion') key = "prompt";
        if(endpoint === 'predict') key = "data_val";
        formData.append(key, inputElement.value);
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}/`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();

        if(data.status === "success") {
            outputBox.innerText = data.result;
            outputBox.style.borderLeftColor = "#10b981"; // Green color
            outputBox.style.display = "block";
        }
    } catch (error) {
        showError("Error: Backend API is offline or not connected.", outputBox, btnElement, originalHTML);
    } finally {
        btnElement.innerHTML = originalHTML;
        btnElement.disabled = false;
    }
}

function showError(msg, outputBox, btnElement, originalHTML) {
    outputBox.innerText = msg;
    outputBox.style.borderLeftColor = "#ef4444"; // Red color
    outputBox.style.display = "block";
    btnElement.innerHTML = originalHTML;
    btnElement.disabled = false;
}