var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

var x= canvas.width/2;
var y= canvas.height-30;

var dx =2;
var dy= -2;
var ballRadius= 10;

//paleta//
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//variables para tocar las teclas direccionales
var rightPressed = false;
var leftPressed = false;

var brickRowCount= 3;
var brickColumnCount= 5;
var brickWidth= 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;


//agregar eventos de presionado y soltado de teclas
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);

//Esta funcion determina si se presiona una tecla
function keyDownHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = true;
  } else if(event.keyCode == 37) {
    leftPressed = true;
  }
}
//esta funcion determina si se una tecla
function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  } else if (event.keyCode == 37) {
    leftPressed = false;
  }
}

//Esta funcion dibuja una paleta//
function drawPaddle(){
  context.beginPath();
  context.rect(paddleX, canvas.height-paddleHeight, paddleWidth,paddleHeight);
  context.fillStyle="#0095DD";
  context.fill();
  context.closePath();
}

//esta funcion dibuja bloques
function drawBricks(){
  for (var row = 0; row <brickRowCount; row++) {
      for(var column = 0; column < brickColumnCount;column++){
      var brickX = (column*(brickWidth+brickPadding))+ brickOffsetLeft;
      var brickY = (row*(brickHeight+brickPadding))+ brickOffsetTop;

  //Dibujar bloque
      context.beginPath();
      context.rect(brickX,brickY,brickWidth,brickHeight);
      context.fillStyle="#0095DD";
      context.fill();
      context.closePath();
  }


}
}
//Esta funcion dibuja un circulo en la posicion x,y
function drawBall(){
  context.beginPath();
  context.arc(x, y, ballRadius, 0, Math.PI*2,false);
  context.fillStyle="#0095DD";
  context.fill();
  context.closePath();
}

  function draw(){
    context.clearRect(0,0,canvas.width,canvas.height);

//se lllama a la funcion de dibujar bloques
drawBricks();

    //se llama a la funcion de dibujarun circulo
    drawBall();

    //se llama a la funcion a dibujar la paleta
    drawPaddle();

  //verificar si llego al limite izquierdo/derecho
    if (x + dx >canvas.width-ballRadius  || x + dx < ballRadius){
      dx = -dx;
  }

  if (y + dy < ballRadius){
    dy= -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if(x > paddleX && paddleX + paddleWidth){
      dy= -dy;
    }else {
    alert("Se acabo el juego PERDISTE");
    document.location.reload();
  }
  }

  //verificar si se toco la tecla dirreccional derecha
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x+=dx;
  y+=dy;
}

setInterval(draw,10);
