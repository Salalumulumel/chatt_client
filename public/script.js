const messageField = document.getElementById("messages");
const inputField = document.getElementById("text");
const server = "http://10.0.2.191:3000/"

latestArrayLength = 0

function getText() {
    xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", `${server}/text`, true);

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText);
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<p>${array[i]}</p>`; 
            }
            latestArrayLength = array.length
        } 
    }
    xmlhttp.send();
}

function sendMessage() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        message: inputField.value
    }));
}

const interval = setInterval(function() {
    getText();
}, 1000);