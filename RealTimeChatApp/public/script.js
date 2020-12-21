let chatContent=document.querySelector(".text-Container")
let send=document.querySelector("#send");
let chat=document.querySelector("#input-chat");
let chatBox=document.querySelector(".chat-box")

let userName=document.querySelector("#input-name");
let joinChat=document.querySelector(".join-chat");
let chatInputDiv=document.querySelector(".name-Container")
let user;
joinChat.addEventListener("click",function(){
     user=userName.value;
    if(user){
        socket.emit("joined-chat",user);
        console.log("clicked");
         chatContent.classList.remove("hide");
         chatInputDiv.classList.add("hide");
    }
});

send.addEventListener("click",function(){
let chatMessage=chat.value
if(chatMessage){

    socket.emit("chat-send",{user,chatMessage});
    addChat("right",{user,chatMessage});
    chatBox.scrollTop=chatBox.scrollHeight;
    chat.value="";


}
});