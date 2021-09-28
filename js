let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

/* ctx.fillStyle = "green";
ctx.fillRect(0,0,50,50);

ctx.fillStyle = "pink";
ctx.fillRect(50,0,50,50);

ctx.fillStyle = "pink";
ctx.fillRect(0,50,50,50);

ctx.fillStyle = "black";
ctx.fillRect(50,50,50,50);

ctx.fillStyle = "green";
ctx.fillRect(100,0,50,50);

ctx.fillStyle = "green";
ctx.fillRect(0,100,50,50);

ctx.fillStyle = "green";
ctx.fillRect(100,100,50,50);

ctx.fillStyle = "pink";
ctx.fillRect(50,100,50,50);

ctx.fillStyle = "pink";
ctx.fillRect(100,50,50,50);
 */

let water = 0;
let land = 1;
let bane = 2;
let planet = 3;
let player = 4;
let win = 5;
let playerPosition = {x:0, y:0}

let arr = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,4,2,0,2,0,0,0,0,1,0,0,0,3,0,0,0,0,0,1],
    [1,2,0,0,2,0,0,0,0,3,0,0,0,0,0,1,0,3,0,1],
    [1,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,1,0,0,1],
    [1,2,2,2,2,0,0,1,1,0,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,3,0,1],
    [1,0,0,0,1,0,3,0,1,0,0,1,0,0,3,0,0,0,0,1],
    [1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,1,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,3,0,0,0,0,0,0,1,0,0,0,0,0,3,0,0,0,1],
    [1,0,0,3,0,0,0,0,3,0,0,3,0,0,0,1,0,3,0,1],
    [1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,3,0,0,1],
    [1,0,0,0,3,0,0,0,0,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,1,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,3,0,0,1,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,1,0,0,0,0,1,1,1,0,1,0,0,0,0,0,1],
    [1,3,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,1,0,0,0,0,0,3,0,0,0,0,0,0,0,1,0,0,1,1],
    [1,0,0,0,3,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,3,0,0,0,1],
    [1,0,0,1,0,0,0,3,0,0,0,3,0,0,0,0,0,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,3,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,0,3,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,1,1,0,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,0,1],
    [1,0,0,1,0,0,0,3,0,0,3,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,0,0,1,0,0,0,0,0,0,0,2,2,2,2,1],
    [1,0,0,1,0,0,0,0,0,0,0,1,1,0,0,2,0,0,0,1],
    [1,0,0,0,0,0,3,0,0,3,0,1,0,0,0,2,0,2,2,1],
    [1,0,0,3,0,0,0,0,3,1,0,0,0,0,0,2,0,2,5,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
   
];
//tilføj billede
let bil = new Image();
bil.src='fly.png';



function drawMaze() {
    

//ctx.fillRect(X-aksen,Y-aksen,50 - størrelse,50 - størrelse) Starter øverst venstre hjørne!
//multidemisionelt array


for(let x = 0; x < arr.length; x++){
    for(let y = 0; y < arr[x].length; y++){

        if(arr[x][y]== water){
            ctx.fillStyle = "midnightblue";
            ctx.fillRect(x*25,y*25,25,25);

        }
        else if(arr[x][y]==land){
            ctx.fillStyle = "black";
            ctx.fillRect(x*25,y*25,25,25);
        }
        else if(arr[x][y]==bane){
            ctx.fillStyle = "darkviolet";
            ctx.fillRect(x*25,y*25,25,25);
        }
        else if(arr[x][y]==planet){
            ctx.fillStyle = "gold";
            ctx.fillRect(x*25,y*25,25,25);
        }
        else if(arr[x][y] == player){
            playerPosition.x=x
            playerPosition.y=y
            ctx.drawImage(bil,x*25,y*25,25,25);
        }
        else if(arr[x][y]==win){
            ctx.fillStyle = "darkviolet";
            ctx.fillRect(x*25,y*25,25,25);
        }
}
}
}
let point = 0;
let  feltBane = true;

document.addEventListener("keyup", function(event){
switch(event.keyCode){
    case 37:
        if(arr[playerPosition.x-1][playerPosition.y] == water){
            arr[playerPosition.x-1][playerPosition.y] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=false;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=false;
            }
        
        }else if(arr[playerPosition.x-1][playerPosition.y] == bane ){
            arr[playerPosition.x-1][playerPosition.y] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
           }
           else{
               arr[playerPosition.x][playerPosition.y] = water 
               feltBane=true;  
           }

        }else if (arr[playerPosition.x-1][playerPosition.y] == land ){
         arr[playerPosition.x][playerPosition.y] = water
              /*  if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=true;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=true;
            } */
    
            document.getElementById("gameOver").style.display = "block"
            setTimeout(function() {
               
                window.location.reload(1);  
            
            }, 2000);
            
        

            
        }else if(arr[playerPosition.x-1][playerPosition.y] == planet){
                arr[playerPosition.x-1][playerPosition.y] = player
                arr[playerPosition.x][playerPosition.y] = water 
                let resultat= point+=1;
                console.log(resultat);
                document.getElementById("print").innerHTML = "Point: " + resultat;
    
        }else if(arr[playerPosition.x-1][playerPosition.y] == win){
                arr[playerPosition.x-1][playerPosition.y] = player
                arr[playerPosition.x][playerPosition.y] = bane
                document.getElementById("win").style.display = "block";
                let resultat= point+=1;
                let visResultat = resultat.toString();
                document.getElementById("win").style.display = "block";
                document.getElementById("win").innerHTML = "<h1>TILLYKKE DET LYKKEDES DIG AT FÅ RUMVÆSNET HJEM! Du fik </h1>" + "<h1>" + visResultat + "</h1>" + "<h1>Point</h1>";
                }
        
        drawMaze ()

        break;
    case 38:
        if(arr[playerPosition.x][playerPosition.y-1] == bane){
            arr[playerPosition.x][playerPosition.y-1] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
           }
           else{
               arr[playerPosition.x][playerPosition.y] = water 
               feltBane=true;  
           }

        }else if (arr[playerPosition.x][playerPosition.y-1] == water){
            arr[playerPosition.x][playerPosition.y-1] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=false;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=false;
            }


        }else if (arr[playerPosition.x][playerPosition.y-1] == land ){
            arr[playerPosition.x][playerPosition.y] = water
       /*      if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=true;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=true;
            } */
            document.getElementById("gameOver").style.display = "block"
            setTimeout(function() {
               
                window.location.reload(1);  
            
            }, 2000);
            
        }else if(arr[playerPosition.x][playerPosition.y-1] == planet){
            arr[playerPosition.x][playerPosition.y-1] = player
            arr[playerPosition.x][playerPosition.y] = water 
            let resultat= point+=1;
            console.log(resultat);
            document.getElementById("print").innerHTML = "Point: " + resultat;

        }else if(arr[playerPosition.x][playerPosition.y-1] == win){
            arr[playerPosition.x][playerPosition.y-1] = player
            arr[playerPosition.x][playerPosition.y] = bane
            document.getElementById("win").style.display = "block" + resultat;
            let resultat= point+=1;
            let visResultat = resultat.toString();
            document.getElementById("win").style.display = "block";
            document.getElementById("win").innerHTML = "<h1>TILLYKKE DET LYKKEDES DIG AT FÅ RUMVÆSNET HJEM! Du fik </h1>" + "<h1>" + visResultat + "</h1>" + "<h1>Point</h1>";
        }

        drawMaze ()

        break;
    case 39:
        if(arr[playerPosition.x+1][playerPosition.y] == bane){
            arr[playerPosition.x+1][playerPosition.y] = player
            if(feltBane==true){
                 arr[playerPosition.x][playerPosition.y] = bane
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water 
                feltBane=true;  
            }
        
    
        } else if (arr[playerPosition.x+1][playerPosition.y] == water){
            arr[playerPosition.x+1][playerPosition.y] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=false;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=false;
            }

        }else if (arr[playerPosition.x+1][playerPosition.y] == land ){
           arr[playerPosition.x][playerPosition.y] = water
           /* if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=true;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=true;
            } */
            document.getElementById("gameOver").style.display = "block"
            setTimeout(function() {
               
                window.location.reload(1);  
            
            }, 2000);
            
        }else if(arr[playerPosition.x+1][playerPosition.y] == planet){
            arr[playerPosition.x+1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = water 
            let resultat= point+=1;
            console.log(resultat);
            document.getElementById("print").innerHTML = "Point: " + resultat;

        }else if(arr[playerPosition.x+1][playerPosition.y] == win){
            arr[playerPosition.x+1][playerPosition.y] = player
            arr[playerPosition.x][playerPosition.y] = bane
            document.getElementById("win").style.display = "block"
            let resultat= point+=1;
            let visResultat = resultat.toString();
            document.getElementById("win").style.display = "block";
            document.getElementById("win").innerHTML = "<h1>TILLYKKE DET LYKKEDES DIG AT FÅ RUMVÆSNET HJEM! Du fik </h1>" + "<h1>" + visResultat + "</h1>" + "<h1>Point</h1>";
        }

        drawMaze ()

        break;
    case 40:
        if(arr[playerPosition.x][playerPosition.y+1] == bane){
            arr[playerPosition.x][playerPosition.y+1] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
           }
           else{
               arr[playerPosition.x][playerPosition.y] = water 
               feltBane=true;  
           }

        } else if (arr[playerPosition.x][playerPosition.y+1] == water){
            arr[playerPosition.x][playerPosition.y+1] = player
            if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=false;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=false;
            }

        }else if (arr[playerPosition.x][playerPosition.y+1] == land ){
            arr[playerPosition.x][playerPosition.y] = water
          /*  if(feltBane==true){
                arr[playerPosition.x][playerPosition.y] = bane
                feltBane=true;
            }
            else{
                arr[playerPosition.x][playerPosition.y] = water
                feltBane=true;
            } */
            document.getElementById("gameOver").style.display =
            setTimeout(function() {
               
                window.location.reload(1);  
            
            }, 2000);

            
        }else if(arr[playerPosition.x][playerPosition.y+1] == planet){
            arr[playerPosition.x][playerPosition.y+1] = player
            arr[playerPosition.x][playerPosition.y] = water 
            let resultat= point+=1;
            console.log(resultat);
            document.getElementById("print").innerHTML = "Point: " +  resultat;

        }else if(arr[playerPosition.x][playerPosition.y+1] == win){
            arr[playerPosition.x][playerPosition.y+1] = player
            arr[playerPosition.x][playerPosition.y] = bane
            let resultat= point+=1;
            let visResultat = resultat.toString();
            document.getElementById("win").style.display = "block";
            document.getElementById("win").innerHTML = "<h1>TILLYKKE DET LYKKEDES DIG AT FÅ RUMVÆSNET HJEM! Du fik </h1>" + "<h1>" + visResultat + "</h1>" + "<h1>Point</h1>";
          
        }
    
        drawMaze ()
        break;

        default:
        console.log("hvad laver du????")
}
}) 
drawMaze();
window.addEventListener("load",drawMaze);
