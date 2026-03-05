async function loadMessage(){

const res = await fetch("/api");

const data = await res.json();

document.getElementById("message").innerText = data.message;

}