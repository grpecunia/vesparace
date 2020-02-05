document.querySelector("#start-button").onclick = function() {
  //Start button is clicked
  this.remove(); //removes start button
  startGame(); //calls startGame
  startLines();
  startObj();
};


document.onkeypress = function(e) {
    console.log(e.keyCode);
  };

// document.onclick = function(e) {
  //   //
  //   console.log(e.x, e.y);
  // };
  
  const canvas = document.querySelector("#canvas"); //Get the canvas
  var img = new Image(); //load an image element
  
  canvas.width = window.innerWidth; //Set canvas width and height
  canvas.height = window.innerHeight;
  
  const ctx = canvas.getContext("2d"); //Get the context

  let loop;

  function startGame() {
    // console.log("START");
    img.onload = function() {
      //Load the car for the first time
      ctx.drawImage(img, car.x, car.y, car.width, car.height);
    };
    img.src = "./images/car.png";
    
    window.requestAnimationFrame(animate); //Starts the animation infinite loop
  }
  
  document.querySelector('#start-button').onclick()

function drawBoard() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height); //draws the green grass
  ctx.fillStyle = "black";
  ctx.fillRect(100, 0, canvas.width *.85, canvas.height); //draws the road
  ctx.fillStyle = "gold";
  ctx.fillRect(canvas.width * 0.1, 0, 15, canvas.height);
  ctx.fillStyle = "gold";
  ctx.fillRect(canvas.width * 0.9, 0, 15, canvas.height);
  ctx.font = "32px OpenSans";
  ctx.fillText("Score = " + objs.length, canvas.width * 0.15, 50);
}



let lines = [];
function drawLines() {
  lines.forEach(line=>{
      ctx.fillStyle = line.color
      ctx.fillRect(line.x, line.y+=5, line.width, line.height);
    })
}

function startLines() {
  setInterval(() => {
    let line = {
        x: canvas.width / 2 - 5,
        y: 0,
        width: 15,
        height: 20,
        color: "gold"
      };
    lines.push(line)
  }, 200);  
}

function startObj() {
  setInterval(() => {
    let obj = {
      x: Math.random() * canvas.width,
      y: 0,
      width: Math.random() * 300 + 50,
      height: Math.random() * 100 + 50,
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
      direction: Math.random() >= 0.5
    };
    objs.push(obj)
  }, 3000);
}

let objs = []
function drawObjs() {
  objs.forEach(obj=>{
    // ctx.fillStyle = obj.color;
    ctx.fill()
    if (obj.direction == true) {
      // ctx.beginPath();
      ctx.fillStyle = obj.color;
      // ctx.arc(obj.x++, obj.y++, 50, 0, 2 * Math.PI);
      ctx.fillRect(obj.x--, obj.y++, obj.width, obj.height);
    } else ctx.beginPath();
      // ctx.beginPath();
      ctx.fillStyle = obj.color;
      // ctx.arc(obj.x--, obj.y++, 50, 0, 2 * Math.PI);
    ctx.fillRect(obj.x++, obj.y++, obj.width, obj.height);
  })
}

let score = objs.length;

function stopGame() {
    window.cancelAnimationFrame(loop);
    drawBoard();
    ctx.font = "48px OpenSans";
    ctx.fillText("GAME OVER!", canvas.width *.40, canvas.height/2);
}

function crash() {
  //console.log(obj)
  objs.forEach(obj => {
    //if(car.x == obj.x || car.y == obj.y ){
      if (
        car.x < obj.x + obj.width &&
        car.x + car.width > obj.x &&
        car.y < obj.y + obj.height &&
        car.y + car.height > obj.y
      ) {
        // collision detected!
      console.log("Crash Bro!!");
      stopGame() 
       
    }
  }) 
}

let car = {
  //Car object - also can be converted to a Class
  x: canvas.width / 2 - 50,
  y: canvas.height - 200,
  width: 100,
  height: 160
};

function drawCar() {
  ctx.drawImage(img, car.x, car.y, car.width, car.height); //draws the car depending on the coords in the obj above
}

document.onkeydown = function(e) {
  //controls -- up down left and right ...
  switch (
    e.keyCode //changes the car object
  ) {
    case 38: //UP
      if ( car.y <= 0){
        car.y = car.y
      } else
      car.y -= 15;
      break;
    case 40: //DOWN
      if (car.y >= canvas.height - 180){
        car.y = car.y
      } else
      car.y += 15;
      break;
    case 37: //LEFT
      if (car.x <= 100){
        car.x = car.x
      } else
      car.x -= 15;
      break;
    case 39: //RIGHT
      if (car.x >= canvas.width - 180){
        car.x = car.x;
      } else
      car.x += 15;
      break;
    case 32: shotFired();
      break;
  }
};

function shotFired() {
  //fire shot
  let shot = {
    //
    x: car.x + car.width / 2, ///shots are always fired from the location of the car
    y: car.y,
    width: 5,
    height: 8,
    color: "white"
  };
  shots.push(shot); //add this shot to an array of shots
}
let shots = []
function drawShots() {
  shots.forEach(shot => {
    //Loop through our shots array
    ctx.fillStyle = shot.color;
    ctx.fillRect(shot.x, (shot.y -= 5), shot.width, shot.height); //decrement each shot in the shot array - move shot up screen
  });
}

function checkShotCollision() {
  objs.forEach((obj, i) => {
    //loop through all the obstacles
    shots.forEach((shot, j) => {
      //loop through all the shots
      if (
        shot.x < obj.x + obj.width &&
        shot.x + shot.width > obj.x &&
        shot.y < obj.y + obj.height &&
        shot.y + shot.height > obj.y
      ) {
        console.log("shot collision detected!", i, j);
        objs.splice(i, 1); //destroys obstacle
        shots.splice(j, 1); //destroys the shot
      }
    });
  });
}


function animate() {
  loop = window.requestAnimationFrame(animate); //continues the loop

  ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the whole canvas, the car, the board everything in the canvas
  drawBoard(); //redraws the board over and over and over again
  drawLines();
  drawObjs();
  drawCar(); //redraws the car over and over and over again
  crash()
  drawShots();
  checkShotCollision();
}
