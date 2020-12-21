const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
let pointsDb;

let {top:topOffSet}=canvas.getBoundingClientRect();

canvas.height=window.innerHeight-topOffSet;
canvas.width=window.innerWidth;

window.addEventListener("resize",function(){
    
canvas.height=window.innerHeight-topOffSet;
canvas.width=window.innerWidth;

});
let isPenDown=false;
canvas.addEventListener("mousedown",function(event){
    isPenDown=true;
    let x=event.clientX;
    let y=event.clientY-topOffSet;
    ctx.beginPath();
    ctx.moveTo(x,y);
    let obj={
        mouseid:"md",
        

    }
});

canvas.addEventListener("mousemove",function(e){
if(isPenDown){
    let x = e.clientX;
        let y= e.clientY-topOffSet;
        ctx.lineTo(x,y);
        ctx.stroke();
    }
});

canvas.addEventListener("mouseup" , function(e){
   isPenDown = false;
});
