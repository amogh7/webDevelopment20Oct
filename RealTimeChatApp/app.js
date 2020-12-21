let express=require("express");
let app=express();
let http=require("http").createServer(app);
let io=require('socket.io')(http);

app.use(express.static('public'));

app.get('/',function(req,res){
    res.sendFile(__dirname+"/public/index.html");
    // res.redirect("/index.html");
})
let users=[];
io.on('connection',function(socket){
    console.log(`${socket.id} connected`);
    socket.on("joined-chat",function(name){
        socket.broadcast.emit("user-joined",name);
        users.push({ id:socket.id , name});
    });

    socket.on("chat-send",function(userObj){
        socket.broadcast.emit("recieve-chat",userObj);

    });

    socket.on('disconnect',function(){
       console.log("disconnected");
        let user=users.filter(function(obj){
            return obj.id==socket.id;
        });
        if(user.length==1){
            console.log("length>1");
        socket.broadcast.emit("leave-event",user[0].name);
    }
        users=users.filter(function(obj){
            return obj.id!=socket.id;
        });
    });

});

http.listen(3000,function(){
    console.log('listening on :3000');
});

