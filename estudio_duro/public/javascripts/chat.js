const socket = io();
const form_nuevo = document.getElementById('form');
const input_nuevo = document.getElementById('input');
const messages_nuevo = document.getElementById('messages');

socket.on('chat', (msg) => { //recibir mensaje
    const emisor = msg.emisor;
    const mensaje = msg.message;

    const contenedorMensajes = document.getElementById('chat');
    let item = document.createElement("li");
    const mensaje_emitir = `${emisor.value}: ${mensaje}`
    item.textContent = mensaje_emitir;
    contenedorMensajes.appendChild(item);

    //renderOtherMessage(emisor, mensaje);
});

function enviarMensaje(emisor){
    const mensaje = document.getElementById("mensaje");
    console.log(`message: ${mensaje}, emisor: ${emisor}`);
    socket.emit('chat', {
        message: mensaje.value,
        emisor: emisor
    });

    const contenedorMensajes = document.getElementById('chat');
    let item = document.createElement("li");
    const mensaje_emitir = `yo: ${mensaje.value}`
    item.textContent = mensaje_emitir;
    contenedorMensajes.appendChild(item);
    //renderMyMessage(mensaje.value);
    mensaje.value = "";
}
document.getElementById("formularioChat").addEventListener('submit', (e) => {
    e.preventDefault();
}); // que no recargue página

/*function renderMyMessage(message){
    console.log("entra");
    const messagesContainer = document.getElementById('messagesContainer');

    let item = document.createElement("li");

    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    let info_label = document.createElement("label");
    info_label.textContent = message;
    info_label.className = "info-message";  

    let author_label = document.createElement("label");
    author_label.textContent = "YOU";
    author_label.className = "author-message my-message";

    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    item.appendChild(contentDiv);
    item.className = "my-message message";
    
    messagesContainer.appendChild(item);
}*/

/*function renderOtherMessage(emisor, message){
    const messagesContainer = document.getElementById('messagesContainer');

    let item = document.createElement("li");

    let contentDiv = document.createElement("div");
    contentDiv.className = "content-message";

    let info_label = document.createElement("label");
    info_label.textContent = message;
    info_label.className = "info-message";  

    let author_label = document.createElement("label");
    author_label.textContent = emisor;
    author_label.className = "author-message other-message";

    contentDiv.appendChild(author_label);
    contentDiv.appendChild(info_label);

    item.appendChild(contentDiv);
    item.className = "other-message message";
    
    messagesContainer.appendChild(item);
}
*/


