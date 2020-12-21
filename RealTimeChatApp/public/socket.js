

socket.on("user-joined",function(name){
let joinDiv=document.createElement("div");
console.log("disconnected");
joinDiv.classList.add("chat");
joinDiv.classList.add("joined");
joinDiv.innerHTML=`${name} joined the chat`;
chatBox.append(joinDiv);

});

socket.on("recieve-chat",function(userObj){
addChat("left",userObj);
});

socket.on("leave-event",function(name){
    console.log("left");
    
let lDiv=document.createElement("div");
lDiv.classList.add("chat");
lDiv.classList.add("leaved");
lDiv.innerHTML=`${name} left the chat`;
chatBox.append(lDiv);
console.log("hello");
});

function addChat(sender,userObj){

    let chatDiv=document.createElement("div");
    chatDiv.classList.add("chat");
    chatDiv.classList.add(sender);

    let chatName=document.createElement("div");
    chatName.classList.add("name");
    chatName.innerHTML=userObj.user;

    let chatText=document.createElement("div");
    chatText.classList.add("text");
    chatText.innerHTML=userObj.chatMessage;

    chatDiv.append(chatName);
    chatDiv.append(chatText);
    chatBox.append(chatDiv);
}

