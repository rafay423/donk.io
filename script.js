const log = console.log;
const canvas = document.querySelector("canvas"),
      ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

var keys = {};

document.onkeydown=(e)=>{

  keys[e.key] = true;

};

document.onkeyup=(e)=>{

  keys[e.key] = false;

};

class SHAPE {
  constructor({
    ctx,
    x,
    y,
    w,
    h,
    z = 0,
    color,
    type,
    starting_angle = undefined,
    ending_engle = undefined,
    radius = undefined,
    rx,
    ry,
    stroked = false,
    strokeColor = "#000",
    filled = true,
    rotation = 1,
    physics = false,
    vx = 0,
    vy = 0

  }) {
    this.ctx = ctx || document.querySelector("canvas").getContext("2d");
    this.physics = physics;
    if (this.physics) {
      this.gravitySpeed = 0.5;
      this.gravity = 0;
      this.damping = 0.74;
      this.traction = 0.8;
      this.gravitySpeed_ = 0.5;
      this.gravity_ = 0;
      this.damping_ = 0.74;
      this.traction_ = 0.8;
    }
    this.z = z;
    this.x = x || 0;
    this.y = y || 0;
    this.stroked = stroked;
    this.filled = filled;
    this.color = color || "black";
    this.strokeColor = strokeColor;
    this.type = type || "rect";
    this.starting_angle = starting_angle || 0;
    this.ending_engle = ending_engle || 2 * Math.PI;
    this.radius = radius || 0;
    this.w = w || 20;
    this.rx = rx || 0;
    this.ry = ry || 0;
    this.h = h || 20;
    this.rotation = rotation * Math.PI / 180;
    this.vx = vx;
    this.vy = vy;



  }
  update() {
    if (this.gravitySpeed != undefined) {
      this.gravity += this.gravitySpeed;
    }

    if (this.type.toLowerCase() == "circle") {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, this.starting_angle, this.ending_engle);
      if (this.stroked) {
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
      }
      if (this.filled) {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
      this.ctx.closePath()
    } else if (this.type.toLowerCase() == "ellipse") {
      this.ctx.beginPath();
      this.ctx.ellipse(this.x, this.y, this.rx, this.ry, this.rotation, this.starting_angle, this.ending_engle);
      if (this.stroked) {
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
      }
      if (this.filled) {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
      this.ctx.closePath();
    } else if (this.type.toLowerCase() == "transparent-cube") {
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(this.x + this.w, this.y);
      this.ctx.lineTo(this.x + this.w, this.y + this.h);
      this.ctx.lineTo(this.x, this.y + this.h)
      this.ctx.lineTo(this.x, this.y)
      /////////////////////////////////////////////////////
      this.ctx.lineTo(this.x + this.z, this.y + this.z)
      this.ctx.moveTo(this.x + this.w, this.y)
      this.ctx.lineTo(this.z + this.w + this.x, this.z + this.y)
      this.ctx.moveTo(this.x, this.y + this.h);
      this.ctx.lineTo(this.x + this.z, this.y + this.z + this.h)
      this.ctx.moveTo(this.x + this.w, this.y + this.h)
      this.ctx.lineTo(this.x + this.z + this.w, this.y + this.z + this.h)
      //////////////////////////////////////////////////////
      this.ctx.moveTo(this.x + this.z, this.y + this.z)
      this.ctx.lineTo(this.x + this.z + this.w, this.y + this.z)
      this.ctx.lineTo(this.x + this.z + this.w, this.y + this.z + this.h)
      this.ctx.lineTo(this.x + this.z, this.y + this.z + this.h)
      this.ctx.lineTo(this.x + this.z, this.y + this.z)
      this.ctx.stroke()

    } else if (this.type.toLowerCase() == "cube") {
      this.ctx.lineWidth = 0.5;
      this.ctx.fillStyle = this.color;
      this.ctx.strokeStyle = "white"
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, this.y)
      this.ctx.lineTo(this.x, this.y + this.h)
      this.ctx.lineTo(this.x + this.w, this.y + this.h);
      this.ctx.lineTo(this.x + this.w, this.y);
      this.ctx.closePath()
      this.ctx.fill()
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, this.y)
      this.ctx.lineTo(this.x + this.z, this.y + this.z)
      this.ctx.lineTo(this.w + this.z + this.x, this.y + this.z)
      this.ctx.lineTo(this.x + this.w, this.y)
      this.ctx.stroke()
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.beginPath()
      this.ctx.moveTo(this.x + this.z, this.y + this.z)
      this.ctx.lineTo(this.x + this.z, this.y + this.h + this.z)
      this.ctx.lineTo(this.x + this.w + this.z, this.y + this.z + this.h)
      this.ctx.lineTo(this.x + this.z + this.w, this.y + this.z)
      this.ctx.stroke()
      this.ctx.fill()
      this.ctx.closePath()
      this.ctx.beginPath()
      this.ctx.moveTo(this.x, this.y + this.h)
      this.ctx.lineTo(this.x + this.z, this.y + this.z + this.h)
      this.ctx.lineTo(this.x + this.z, this.y + this.h)
      this.ctx.fill()
      this.ctx.moveTo(this.x + this.z, this.y + this.z)
      this.ctx.lineTo(this.x + this.z + this.w, this.y + this.z)
      this.ctx.stroke()
    } else if (this.type.toLowerCase() == "strokerect") {
      ctx.strokeStyle = this.color;
      ctx.rect(this.x, this.y, this.w, this.h);
      ctx.stroke();
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(this.x, this.y, this.w, this.h)
      if (this.stroked) {

        this.ctx.stroke();
      }
    }

    this.y += this.vy;
    this.x += this.vx;
  }
  onmousedown(callback) {
    document.onmousedown = e => {
      let x = e.clientX - canvas.getBoundingClientRect().left;
      let y = e.clientY - canvas.getBoundingClientRect().top;
      if (this.type == "rect") {
        if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
          callback();
        }

      } else if (this.type == "circle") {
        let xx = x - this.x;
        let yy = y - this.y;
        let dist = Math.sqrt((xx * xx) + (yy * yy));

        if (dist < this.radius) {
          callback()
        }
      }

    }
  }
  onclick(callback) {
    document.onclick = e => {
      let x = e.clientX - canvas.getBoundingClientRect().left;
      let y = e.clientY - canvas.getBoundingClientRect().top;
      if (this.type == "rect") {
        if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
          callback();
        }

      } else if (this.type == "circle") {
        let xx = x - this.x;
        let yy = y - this.y;
        let dist = Math.sqrt((xx * xx) + (yy * yy));

        if (dist < this.radius) {
          callback()
        }
      }

    }
  }
  onmouseup(callback) {
    document.onmouseup = e => {
      let x = e.clientX - canvas.getBoundingClientRect().left;
      let y = e.clientY - canvas.getBoundingClientRect().top;
      if (this.type == "rect") {
        if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
          callback();
        }

      } else if (this.type == "circle") {
        let xx = x - this.x;
        let yy = y - this.y;
        let dist = Math.sqrt((xx * xx) + (yy * yy));

        if (dist < this.radius) {
          callback()
        }
      }

    }
  }
  onmousemove(callback) {
    document.onmousemove = e => {
      let x = e.clientX - canvas.getBoundingClientRect().left;
      let y = e.clientY - canvas.getBoundingClientRect().top;
      if (this.type == "rect") {
        if (x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h) {
          callback();
        }

      } else if (this.type == "circle") {
        let xx = x - this.x;
        let yy = y - this.y;
        let dist = Math.sqrt((xx * xx) + (yy * yy));

        if (dist < this.radius) {
          callback()
        }
      }

    }
  }
}


function circleRect(circle, rect, callback1,callback2) {

  var testX = circle.x;
  var testY = circle.y;

  if (circle.x < rect.x){
         testX = rect.x; 
  }else if (circle.x > rect.x + rect.w){ 
    testX = rect.x + rect.w;   // right edge
  }
  if (circle.y < rect.y){
    testY = rect.y;      // top edge
  }else if (circle.y > rect.y + rect.h) {
    testY = rect.y+rect.h;   // bottom edge
  }

  var distX = circle.x-testX;
  var distY = circle.y-testY;
  var distance = Math.sqrt( (distX*distX) + (distY*distY) );

  if (distance <= circle.radius) {

    callback1 ? callback1(distX, distY, distance) : undefined;

  }else{

    callback2 ? callback2(distX, distY, distance) : undefined;

  }

}

const COLORS = {
    RED: "#f00",
    BLUE: "#00f",
    GREEN: "#0f0",
    DARKRED: "#8B0000",
    FIREBRICK: "#B22222",
    CRIMSON: "#DC143C",
    LIGHTSALMON: "#FFA07A",
    DARKSALMON: "#E9967A",
    ORANGE: "#FFA500",
    YELLOW: "#FFFF00",
    LAVANDER: "#E6E6FA",
    VIOLET: "#EE82EE",
    MAGENTA: "#FF00FF",
    DARKMAGENTA: "#800080",
    INDIGO: "#4B0082",
    GREENYELLOW: "#ADFF2F",
    LIMEGREEN: "#32CD32",
    FORESTGREEN: "#228B22",
    AQUA: "#00FFFF",
    STEELBLUE: "#4682B4",
    DODGERBLUE: "#1E90FF",
    NAVYBLUE: "#000080",
    GOLDENRODE: "#DAA520",
    CHOCOLATE: "#D2691E",
    SNOW: "#FFFAFA",
    WHITE: "#fff",
    BLACK: "#000",
    AZURE: "#F0FFFF",
    SILVER: "#C0C0C0",
    GRAY: "#808080",
    DARKCRIMSON: "#7C1914",
    PALECRIMSON: "#701F1F",
    DARKBRICK: "#440E0C",
    MAROON: "#990000",
    BLOOD: "#841B17"
}
Object.freeze(COLORS);
function indexOf2d(_2darray, character) {
    for (let r = 0; r < _2darray.length; r++) {
        for (let c = 0; c < _2darray[r].length; c++) {
            if (_2darray[r][c] == character) {
                return [r, c];
            }
        }
    }

}

function indexInArray(array, character) {
    let arr__ = []
    for (let c = 0; c < array.length; c++) {
        for (let r = 0; r < array[c].length; r++) {
            if (array[c][r] == character) {
                arr__.push([c, r]);
            }
        }
    }
    return arr__;
}


function maxLength(arr, callback = (a) => {
    return a.length
}) {
    this.lengths = arr.map(callback);
    return this.lengths.indexOf(Math.max(...this.lengths));
}
function minLength(arr, callback = (a) => {
    return a.length
}) {
    this.lengths = arr.map(callback);
    return this.lengths.indexOf(Math.min(...this.lengths));
}
class Player{

  constructor( x, y, color, radius, weight, vx, vy, friction, ctx ){

    this.x = x;
    this.y = y;
    this.ctx = ctx || document.querySelector("canvas").getContext("2d");
    this.color = color;
    this.radius = radius;
    this.weight = weight;
    this.friction = friction || 1;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.collided = false;
    this.jumped = true;
    this.gravitySpeed = 0.5;
    this.spy = 0.5;
    this.spx = 0.3;
    this.collidedFromRight = false;
    this.collidedFromLeft = false;
    
  }

  jump(speed){

    let speed_ = speed;

    if (this.jumped == false) {

      this.spy -= ( speed_ ) - (this.weight * 0.01);
      this.jumped = true;

    }

  }

  gravity(...grounds){

    this.spy += this.gravitySpeed;    //gravity
    this.y += this.spy + ( this.weight / 10 );
    this.spy *= 0.987;    //friction

    this.spx += this.vx/2;
    this.x += this.spx;
    this.friction = 0.93;
    this.spx *= this.friction;

    for(let ground of grounds) {
      // log(ground)
      circleRect(this, ground, (X, Y, D) => {

        if(Y > -this.radius && Y < 0){

          this.jumped = false;
          this.y = ground.y - this.radius;
          this.spy = 0;

          // break;
        }

      })

    }

  }

  update(){

    this.ctx.beginPath();

    this.ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI );

    this.ctx.fillStyle = this.color;

    this.ctx.fill();

    this.ctx.closePath();

    this.x += this.vx;
    this.y += this.vy;

  }

}

class Scene {

  constructor (map){

    this.map = map;

    this.splitMap = this.map.split("/");

    this.bcode  = this.splitMap.shift().replace("b", "").split("-");

    this.splitMap.forEach(_code => {

      if(_code.startsWith("p")){

        this.pcode  = _code.replace("p", "").split(",").reduce((p, c, i) => {

          p[i] = c.split("-");

          let h = p[i][1].includes(";") ? p[i][1].split(";") : undefined;

          p[i][1] = h ? h[0] : p[i][1];

          if(h){

            if( h[1].includes("w") ) {

              p[i][2] = h[1].includes("h") ? parseInt(h[1].substr(h[1].indexOf("w") + 1, h[1].indexOf("h") - 1)) : parseInt(h[1].substr(h[1].indexOf("w") + 1));

            }
            if( h[1].includes("h") ) {

              p[i][3] = parseInt(h[1].substr(h[1].indexOf("h") + 1));

            }


          }

          return p;

        }, []);
      
      } else if(_code.startsWith("l")){

        this.lcode  = _code.replace("l", "").split(",").reduce((p, c, i) => {

          p[i] = c.split("-");

          let h = p[i][1].includes(";") ? p[i][1].split(";") : undefined;

          p[i][1] = h ? h[0] : p[i][1];

          if(h){

            if( h[1].includes("w") ) {

              p[i][2] = h[1].includes("h") ? parseInt(h[1].substr(h[1].indexOf("w") + 1, h[1].indexOf("h") - 1)) : parseInt(h[1].substr(h[1].indexOf("w") + 1));

            }
            if( h[1].includes("h") ) {

              p[i][3] = parseInt(h[1].substr(h[1].indexOf("h") + 1));

            }


          }

          return p;

        }, []);

      } else if(_code.startsWith("w")){

        this.wcode  = _code.replace("w", "").split(",").reduce((p, c, i) => {

          p[i] = c.split("-");

          let h = p[i][1].includes(";") ? p[i][1].split(";") : undefined;

          p[i][1] = h ? h[0] : p[i][1];

          if(h){

            if( h[1].includes("w") ) {

              p[i][2] = h[1].includes("h") ? parseInt(h[1].substr(h[1].indexOf("w") + 1, h[1].indexOf("h") - 1)) : parseInt(h[1].substr(h[1].indexOf("w") + 1));

            }
            if( h[1].includes("h") ) {

              p[i][3] = parseInt(h[1].substr(h[1].indexOf("h") + 1));

            }


          }

          return p;

        }, []);

      } else if(_code.startsWith("W")){

        this.wacode  = _code.replace("w", "").split(",").reduce((p, c, i) => {

          p[i] = c.split("-");

          let h = p[i][1].includes(";") ? p[i][1].split(";") : undefined;

          p[i][1] = h ? h[0] : p[i][1];

          if(h){

            if( h[1].includes("w") ) {

              p[i][2] = h[1].includes("h") ? parseInt(h[1].substr(h[1].indexOf("w") + 1, h[1].indexOf("h") - 1)) : parseInt(h[1].substr(h[1].indexOf("w") + 1));

            }
            if( h[1].includes("h") ) {

              p[i][3] = parseInt(h[1].substr(h[1].indexOf("h") + 1));

            }


          }

          return p;

        }, []);

      }

    })

    this.platformerWidth = 80;
    this.platformerHeight = 20;
    this.playerRadius = 10;
    this.wallWidth = 20;
    this.wallHeight = 100;
    this.lavaWidth = 100;
    this.lavaHeight = this.platformerHeight;
    
    this.platformers = [];
    this.walls = [];
    this.lavas = [];
    this.wins = [];


  }
  update(){

    // if(this.map.includes(".")){

      this.player = new Player(

        parseInt(this.bcode[0]),
        parseInt(this.bcode[1]),
        "aqua",
        this.playerRadius,
        10,
        0,
        0,
        0.95,
        ctx

      );

      if(this.pcode){

        this.pcode.forEach(p => {

          this.platformers.push(new SHAPE({

            x: parseInt(p[0]),
            y: parseInt(p[1]),
            w: p[2] ? p[2] : this.platformerWidth,
            h: p[3] ? p[3] : this.platformerHeight,
            color: COLORS.GREEN,

          }));

        });

      }

      if(this.lcode){

        this.lcode.forEach(l => {

          this.lavas.push(new SHAPE({

            x: parseInt(l[0]),
            y: parseInt(l[1]),
            w:  l[2] ? l[2] : this.lavaWidth,
            h:  l[3] ? l[3] : this.lavaHeight,
            color: COLORS.RED,

          }));

        });
      
      }
      
      if(this.wcode){

        this.wcode.forEach(w => {

          this.wins.push(new SHAPE({

            x: parseInt(w[0]),
            y: parseInt(w[1]),
            w:  w[2] ? w[2] : this.wallWidth,
            h:  w[3] ? w[3] : this.wallHeight,
            color: COLORS.GOLDENRODE,

          }));

        });

      }

      if(this.wacode){

        this.wacode.forEach(wa => {

          this.walls.push(new SHAPE({

            x: parseInt(wa[0]),
            y: parseInt(wa[1]),
            w:  wa[2] ? wa[2] : this.wallWidth,
            h:  wa[3] ? wa[3] : this.wallHeight,
            color: COLORS.MAGENTA,

          }));

        });

      }

  }
  
}


var map = `b100-100/p180-150/W300-120`;

var MPL = new Scene(map);


var ground = new SHAPE({

  x: -130,
  y: (canvas.height / 1.4) + 10,
  w: canvas.width,
  h: canvas.height,
  color: "black",

})


var alpha = 1;


const movement = function(player1){

  if(keys["a"]){

    player1.vx = !player1.collidedFromLeft ? -0.6 : ( player1.friction = 0, 0 );
    alpha = 0.6;

  }else if(keys["d"]){

    player1.vx = !player1.collidedFromRight ? 0.6 : ( player1.friction = 0 , 0 );
    alpha = 0.6;

  }else{

    player1.vx = 0;

  }
  
  if(keys["w"]){

    player1.jump(8);
    alpha = 1;

  }else{

    player1.vy = 0;

  }
  

};




const collision = (player1, ...platformers) => {

  for(let platformer of platformers){

    circleRect(player1, platformer, (X, Y, D) => {

      if(X > -player1.radius && X < 0){

        player1.collidedFromRight = true;
        player1.x = platformer.x - player1.radius - 0.1;

      } 
      if(X < player1.radius && X > 0){

        player1.collidedFromLeft = true;
        player1.x = platformer.x + platformer.w + player1.radius + 0.1;

      }

      if(Y < player1.radius && Y > 0){

        player1.y = platformer.y + platformer.h + player1.radius + 0.1;

      }

    }, (X, Y, D) => {

      player1.collidedFromRight = false;
      player1.collidedFromLeft = false;


    });

  }

};

function Out(player, ...grounds){

  grounds.forEach(ground => {

    circleRect(player, ground, () => {

      MPL.update();
      cancelAnimationFrame(loop)
      // loop();

    })

  })

}

function Win(levels){

  

}

MPL.update();

// ground.w = MPL.splitMap[maxLength(MPL.splitMap)].length * 90;
// ground.y = MPL.splitMap.length * 30;

const loop = () => {

  ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(0, -( MPL.player.y - (canvas.height / 2) ));
  if(MPL.player.x > 700) {

    ctx.translate(-( MPL.player.x - 700), 0);

  }

  
  // platformer.update();
  // player1.update();
  // platformer2.update();
  // platformer3.update();
  // player1.gravity(ground, platformer, platformer2, platformer3);
  // collision(platformer, platformer2, platformer3);

  ground.update();
  

  ctx.shadowBlur = 5;
  ctx.shadowColor = "green";
  MPL.platformers?.length ? MPL.platformers.forEach(p => p.update()) : undefined;

  ctx.shadowColor = COLORS.MAGENTA;
  MPL.walls?.length ? MPL.walls.forEach(p => p.update()) : undefined;

  ctx.shadowColor = "red";
  MPL.lavas?.length ? MPL.lavas.forEach(p => p.update()) : undefined;

  ctx.shadowColor = COLORS.GOLDENRODE;
  MPL.wins?.length ? MPL.wins.forEach(p => p.update()) : undefined;

  ctx.shadowColor = MPL.player.color;
  MPL.player.update();

  MPL.player.gravity(...MPL.platformers);
  movement(MPL.player);
  collision(MPL.player, ...MPL.platformers, ...MPL.walls);

  Out(MPL.player, ...MPL.lavas, ground);

  ctx.restore();

  window.requestAnimationFrame(loop);

};

loop();