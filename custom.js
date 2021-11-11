var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
const log = console.log;
Object.filter = (obj, predicate) => 
    Object.keys(obj)
          .filter( key => predicate(obj[key]) )
          .reduce( (res, key) => (res[key] = obj[key], res), {} );

function resize() {
  
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
}

// resize();


function distance(x1, y1, x2, y2) {

  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

};
const togle = (variable, value1, value2) => {

  let _v = variable;

  _v = variable == value1 ? value2 : value1;

  return _v;

};

function degToRad(deg) {
  return deg * Math.PI / 180;
}


function onClick(shape, callback) {
    document.onmousedown = e => {
        let x = e.clientX - canvas.getBoundingClientRect().left;
        let y = e.clientY - canvas.getBoundingClientRect().top;
        if (shape.type == "rect") {
            if ((x >= shape.x && x <= shape.x + shape.w) && (y >= shape.y && y <= shape.y + shape.h)) {
                callback();
            }

        } else if (shape.type == "circle") {
            let xx = x - shape.x;
            let yy = y - shape.y;
            let dist = Math.sqrt((xx * xx) + (yy * yy));

            if (dist < shape.radius) {
                callback()
            }
        }

    }
}
class SHAPE {

  #rotation;

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
    this.angle = rotation;
    this.#rotation = this.angle * (Math.PI / 180);
    this.vx = vx;
    this.vy = vy;



  }

  setRotation(angle) {

    this.angle = angle;

    this.#rotation = this.angle * (Math.PI / 180)

    return this;

  }

  update() {

    this.#rotation = this.angle * (Math.PI / 180);

    if (this.gravitySpeed != undefined) {
      this.gravity += this.gravitySpeed;
    }

    if (this.type.toLowerCase() == "circle") {
      this.ctx.save();
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
      this.ctx.restore();
    } else if (this.type.toLowerCase() == "ellipse") {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.ellipse(this.x, this.y, this.rx, this.ry, this.#rotation, this.starting_angle, this.ending_engle);
      if (this.stroked) {
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.stroke();
      }
      if (this.filled) {
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
      }
      this.ctx.closePath();
      this.ctx.restore();
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
      this.ctx.strokeStyle =  this.strokeColor || this.color;
      this.ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2));
      this.ctx.rotate(this.#rotation);
      this.ctx.translate(-(this.x + (this.w / 2)), -(this.y + (this.h / 2)));
      this.ctx.rect(this.x, this.y, this.w, this.h);
      this.ctx.stroke();
    } else {
      this.ctx.fillStyle = this.color;
      this.ctx.save();
      this.ctx.translate(this.x + (this.w / 2), this.y + (this.h / 2));
      this.ctx.rotate(this.#rotation);
      this.ctx.translate(-(this.x + (this.w / 2)), -(this.y + (this.h / 2)));
      this.ctx.fillRect(this.x, this.y, this.w, this.h)
      if (this.stroked) {

        this.ctx.stroke();
      }
      this.ctx.restore();
    }

    this.y += this.vy * Math.sin(this.angle);
    this.x += this.vx * Math.cos(this.angle);
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

class Polygon{

  constructor(centerX , centerY , sideCount , size , color , rotationDegrees = -90){

    this.rotationDegrees = rotationDegrees;
    this.radians = this.rotationDegrees * Math.PI / 180;
    this.centerX = centerX;
    this.centerY = centerY;
    this.sideCount = sideCount;
    this.size = size;
    this.color = color;
    this.vx = 0;
    this.vy = 0;

  }

  update(){

    // this.rotationDegrees += 1;
    // this.vx += 1;

    this.radians = this.rotationDegrees * ( Math.PI / 180 );

    ctx.translate(this.centerX,this.centerY);

    ctx.rotate(this.radians);

    ctx.beginPath();

    ctx.moveTo (this.size * Math.cos(0), this.size * Math.sin(0));          

    for (var i = 1 ; i <= this.sideCount ; i += 1) {
      
        ctx.lineTo (this.size * Math.cos(i * 2 * Math.PI / this.sideCount), this.size * Math.sin(i * 2 * Math.PI / this.sideCount)); 

    }

    ctx.closePath();

    ctx.fillStyle = this.color;

    ctx.fill();

    ctx.rotate(-this.radians);
    ctx.translate(-this.centerX,-this.centerY);

    this.centerX += this.vx * Math.cos(this.radians);
    this.centerY += this.vy * Math.sin(this.radians);

  }

}

class Parallelogram {

    constructor({ x, y, w, h }) {

        this.x = x,
            this.y = y,
            this.w = w;
        this.h = h;
        this.color = "#333";
        this.ctx = ctx || document.querySelector("canvas");
        this.curve = 50;

    }

    update() {

        this.ctx.beginPath();

        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.w, this.y);
        this.ctx.lineTo(this.x + this.w + (this.curve), this.y + this.h);
        this.ctx.lineTo(this.x + (this.curve), this.y + this.h);
        this.ctx.lineTo(this.x, this.y)

        this.ctx.closePath();
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

}

class Arrow {

    constructor({ x, y, x2, y2 }) {

        this.x = x;
        this.y = y;
        this.color = "#333";
        this.ctx = ctx || document.querySelector("canvas");
        this.x2 = x2;
        this.y2 = y2;
        // this.w = w;
        // this.h = h;
        // this.curve = 50;

    }
    update() {

        var ctx = this.ctx;
        var headlen = 15; // length of head in pixels
        var dx = this.x2 - this.x;
        var dy = this.y2 - this.y;
        var angle = Math.atan2(dy, dx);
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - headlen * Math.cos(angle - Math.PI / 6), this.y2 - headlen * Math.sin(angle - Math.PI / 6));
        ctx.moveTo(this.x2, this.y2);
        ctx.lineTo(this.x2 - headlen * Math.cos(angle + Math.PI / 6), this.y2 - headlen * Math.sin(angle + Math.PI / 6));

        ctx.strokeStyle = this.color;
        ctx.stroke();

    }

}

class Diamond {

    constructor(x, y, w, h) {

        this.x = x;
        this.y = y;
        this.w = w / 2;
        this.h = h / 2;

    }

    update() {

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.lineTo(this.x, this.y + (this.h * 2));
        ctx.lineTo(this.x - this.w, this.y + this.h);
        ctx.lineTo(this.x, this.y);

        ctx.closePath();
        ctx.strokeStyle = "#333";
        ctx.fillStyle = "#333";
        ctx.fill();

    }

}

class joystick {
  constructor(x, y, w, h, bgColor = "rgb(0,0,0,0.3)", padRadius, PadColor, Xaxis = true, Yaxis = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.Xaxis = Xaxis;
    this.Yaxis = Yaxis;
    this.type = "rect";
    this.h = h;
    this.PadColor = PadColor;
    this.bgColor = bgColor;
    this.padRadius = padRadius;
    this.joystick = new SHAPE({
      x: this.x,
      y: this.y,
      w: this.w,
      h: this.h,
      color: this.bgColor
    })
    this.mouseActions = {
      Over: false,
      Clicked: false
    }
    this.startingXpos = this.joystick.x + this.joystick.w / 2;
    this.startingYpos = this.joystick.y + this.joystick.h / 2;
    this.pad = new SHAPE({
      type: "circle",
      x: this.startingXpos,
      y: this.startingYpos,
      radius: this.padRadius,
      color: this.PadColor
    })

  }
  setCoords(coordX, coordY) {
    if (this.mouseActions.Clicked) {
      if (coordX >= this.x && coordY >= this.y && coordX <= this.x + this.w && coordY <= this.y + this.h) {
        this.mouseActions.Over = true;
        this.pad.x = coordX;
        this.pad.y = coordY;

      }
    } else {
      this.mouseActions.Over = false;
      this.pad.x = this.startingXpos;
      this.pad.y = this.startingYpos;
    }

  }
  controller(shape, speedx, speedy) {
    if (this.Xaxis) {
      if (this.pad.x >= this.x && this.pad.x < this.x + this.w / 3) {
        shape.x -= speedx;
      } else if (this.pad.x > this.x + this.w / 1.5 && this.pad.x < this.x + this.w) {
        shape.x += speedx;
      }
    }
    if (this.Yaxis) {
      if (this.pad.y >= this.y && this.pad.y < this.y + this.h / 3) {
        shape.y -= speedy;
      } else if (this.pad.y > this.y + this.h / 1.5 && this.pad.y < this.y + this.h) {
        shape.y += speedy;
      }
    }

  }
  update() {
    this.joystick.update();
    this.pad.update();
  }
}
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
class image {
    constructor(img, x, y, w, h) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    update() {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }
}
// }
class MAP {
    constructor(map) {
        this.map = map;
        this.splitMap = this.map.split("\n");
        this.splitMap.shift();
        this.spaceX__ = 7;
        this.spaceY__ = 6;
        this.psizew = (canvas.width - (this.spaceX__ * (this.splitMap[maxLength(this.splitMap)].length))) / (this.splitMap[maxLength(this.splitMap)].length);//- (this.spaceX__ * (this.splitMap[maxLength(this.splitMap)].length))
        this.psizeh = (canvas.height - (this.spaceY__ * this.splitMap.length)) / (this.splitMap.length);//- (this.spaceY__ * this.splitMap.length)
        this.spacex = this.psizew + this.spaceX__;
        this.spacey = this.psizeh + this.spaceY__;
        this.sizeAverage = (this.psizeh + this.psizew) / 2;
        this.sizeArea = this.psizeh * this.psizew;
        this.obs = [];
        this.ending = [];
        this.keys = [];
        this.walls = [];
    }
    update() {

        if (this.map.includes(".")) {
            this.player = new SHAPE({
                x: indexInArray(this.splitMap, ".")[0][1] * this.spacex,
                y: indexInArray(this.splitMap, ".")[0][0] * this.spacey,
                w: this.psizew,
                h: this.psizeh,
                color: "black"
            })

        }
        if (this.map.includes("#")) {
            this.obstacles = indexInArray(this.splitMap, "#");
            for (var r = 0; r < this.obstacles.length; r++) {
                // for (var c = 0; c < this.obstacles[r].length ; c++) {
                this.obs.push(new SHAPE({
                    x: this.obstacles[r][1] * this.spacex,
                    y: this.obstacles[r][0] * this.spacey,
                    w: this.psizew + 5,
                    h: this.psizeh + 5,
                    color: COLORS.BLOOD,
                }))
                // }
            }

        }
        if (this.map.includes("+")) {
            this.end = indexInArray(this.splitMap, "+");
            for (var r = 0; r < this.end.length; r++) {
                let i = new Image();
                i.src = "https://cdn.discordapp.com/icons/747793220137648228/ca0a808f6a0465333681439278167f02.png?size=128";
                this.ending.push(new image(
                    i,
                    this.end[r][1] * this.spacex,
                    this.end[r][0] * this.spacey,
                    this.psizew,
                    this.psizeh
                ))
            }
        }
        if (this.map.includes("-")) {
            this.wall = indexInArray(this.splitMap, "-");
            for (var r = 0; r < this.wall.length; r++) {
                this.walls.push(new SHAPE({
                    x: this.wall[r][1] * this.spacex,
                    y: this.wall[r][0] * this.spacey,
                    w: this.psizew + 5,
                    h: this.psizeh + 5,
                    color: COLORS.DARKMAGENTA,
                }))
            }
        }
        if (this.map.includes("*")) {
            this.touchedAllKeys = 0;
            this.key = indexInArray(this.splitMap, "*");
            for (var r = 0; r < this.key.length; r++) {
                this.keys.push(new SHAPE({
                    x: this.key[r][1] * this.spacex,
                    y: this.key[r][0] * this.spacey,
                    w: this.psizew + 5,
                    h: this.psizeh + 5,
                    color: COLORS.LIMEGREEN,
                }))
            }
        }
    }
}

class HTML {
    constructor() {
        this.elements_ = [];
    }
    static bodyAppend({
        element,
        properties = {},
        position = undefined
    }) {
        if (typeof element === "string") {
            let elemt_ = Object.assign(document.createElement(element), properties);
            if (position) {
                document.body.insertBefore(elemt_, document.body.children[position - 1]);
                console.log("appending");
            } else {
                document.body.appendChild(elemt_);
                console.log("appending");
            }

        } else if (Array.isArray(element)) {
            if (position) {
                for (var i = 0; i < element.length; i++) {
                    var childs = Object.assign(document.createElement(element[i]), properties);
                    document.body.insertBefore(childs, document.body.children[position - 1 + i]);
                    console.log("appending");
                }
            } else {
                for (var i = 0; i < element.length; i++) {
                    var childs = Object.assign(document.createElement(element[i]), properties);
                    document.body.appendChild(childs)
                    console.log("appending");
                }
            }
        }


    }
    static removeChild(child_or_node, parent = undefined) {
        let elem = document.querySelector(child_or_node);
        let parent_ = document.querySelector(parent);
        if (elem.parentNode && !parent_) {
            elem.parentNode.removeChild(elem);
        } else {
            parent_.removeChild(elem);
        }
    }
    static append({
        parent,
        parent_node_number,
        child,
        properties = {}
    }) {
        let parent_ = document.querySelectorAll(parent) || document.querySelector("body");

        if (typeof parent_node_number == "number") {
            let child_ = Object.assign(document.createElement(child), properties);
            parent_[parent_node_number - 1].appendChild(child_);
        } else if (Array.isArray(parent_node_number)) {

            for (let item of parent_node_number) {
                let child_ = Object.assign(document.createElement(child), properties);
                parent_[item - 1].appendChild(child_);
            }
        } else {
            for (let i = 0; i < parent_.length; i++) {
                let child_ = Object.assign(document.createElement(child), properties);
                parent_[i].appendChild(child_);
            }

        }
    }
    static style(element, styles) {
        let child_ = document.querySelectorAll(element);
        let style_ = styles;
        for (let chil_ of child_) {

            chil_.style = style_;
        }
    }

}
function rgb(red, green = undefined, blue = undefined) {
    if (red && green && blue) {
        return `rgb(${red},${green},${blue})`;
    } else {
        return `rgb(${red},${red},${red})`
    }
}

function getSiblings(e) {
  
  let siblings = [];
  
  if (!e.parentNode) {
    return siblings;
  }
  
  let sibling = e.parentNode.firstChild;
  
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};
function randomNum(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randomColor(){
  return rgb(randomNum(255, 0), randomNum(255, 0), randomNum(255, 0));
}

function max_Array(arr, callback = (a) => {
    return a.length
}) {
    this.lengths = arr.map(callback);
    return this.lengths.indexOf(Math.max(...this.lengths));
}
function min_Array(arr, callback = (a) => {
    return a.length
}) {
    this.lengths = arr.map(callback);
    return this.lengths.indexOf(Math.min(...this.lengths));
}
function isClass(variabe) {
    if (variabe.prototype && variabe.prototype.constructor && variabe.prototype.constructor.toString().substr(0, 5) === "class") {
        return true;
    } else {
        return false;
    }
}
function isFunction(variabe) {
    if (variabe.prototype && variabe.prototype.constructor && variabe.prototype.constructor.toString().substr(0, 8) === "function") {
        return true;
    } else {
        return false;
    }
}
function collision(shape1, shape2) {
  let w1 = shape1.type.includes("rect") ? shape1.w : shape1.type == "circle" ? shape1.radius : shape1.type == "ellipse" ? shape1.rx : undefined;
  let w2 = shape2.type.includes("rect") ? shape2.w : shape2.type == "circle" ? shape2.radius : shape2.type == "ellipse" ? shape2.rx : undefined;
  let h1 = shape1.type.includes("rect") ? shape1.h : shape1.type == "circle" ? shape1.radius : shape1.type == "ellipse" ? shape1.ry : undefined;
  let h2 = shape2.type.includes("rect") ? shape2.h : shape2.type == "circle" ? shape2.radius : shape2.type == "ellipse" ? shape2.ry : undefined;
  if (shape1.x < shape2.x + w2 &&
    shape1.x + w1 > shape2.x &&
    shape1.y < shape2.y + h2 &&
    shape1.y + h1 > shape2.y) {
    return true;
  };

  return false;
};
function circlesCollision(circle1, circle2) {
  let x = circle1.x - circle2.x;
  let y = circle1.y - circle2.y;
  let dist = Math.sqrt((x * x) + (y * y));

  if (dist < circle1.radius + circle2.radius) {
    return true;
  }
  return false;
}
function collisionDetectRect(shape1, shape2, callback, callback2) {
  if (collision(shape1, shape2)) {
    callback()
  }else{
    if(callback2){
      callback2();
    }
  }
}
function collisionDetectCircle(circle1, circle2, callback, callback2) {
  if (circlesCollision(circle1, circle2)) {
    callback()
  }else{
    if(callback2){
      callback2();
    }
  }
}
function circleRect(cx, cy, radius, rx, ry, rw, rh) {

  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx){
         testX = rx; 
  }else if (cx > rx+rw){ 
    testX = rx+rw;   // right edge
  }
  if (cy < ry){
    testY = ry;      // top edge
  }else if (cy > ry+rh) {
    testY = ry+rh;   // bottom edge
  }

  // get distance from closest edges
  var distX = cx-testX;
  var distY = cy-testY;
  var distance = Math.sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  }
  return false;
}

function collisionDetectCircleRect(circle, rect, callback, callback2){

  if(circleRect(circle.x, circle.y, circle.radius, rect.x, rect.y, rect.w, rect.h)){
    if(callback) callback();
  }else{
    if(callback2) callback2();
  }
  


}
var keys = {};
document.onkeydown=(e)=>{
  keys[e.key] = true;
}
document.onkeyup=(e)=>{
  keys[e.key] = false;
}
function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i].x === value.x && arr[i].y === value.y) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

function lightOrDark(color) {

    var r, g, b, hsp;
    
    if (color.match(/^rgb/)) {

        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    if (hsp>127.5) {

        return '#000';
    } 
    else {

        return '#fff';
    }
}

function align(posX, posY, width, height) {
  alignedPosX = (Math.floor(posX / (width)) * width)
  alignedPosY = (Math.floor(posY / (height)) * height)

  return ([alignedPosX, alignedPosY])
}
class Triangle {

  constructor(x1, y1, x2, y2, x3, y3, color, angle = 0, radius) {

    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.w = this.x3 - this.x2;
    this.h = this.y3 - this.y1;
    this.color = color;
    this.angle = angle;
    this.rotation = this.angle * (Math.PI / 180);
    this.radius = radius || 5;
    this.center = {

      x: ( this.x1 + this.x2 + this.x3 ) / 3,
      y: ( this.y1 + this.y2 + this.y3 ) / 3,

    };

    this.circle = new SHAPE({x:this.center.x,y:this.center.y,type:"circle",radius:this.radius});

  }

  update() {

    

    ctx.beginPath();

    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.lineTo(this.x3, this.y3);

    ctx.closePath();

    ctx.fillStyle = this.color;
    ctx.fill();

    this.circle.update();


  }

}

var jumped = true;
var spy = 0;

function jump(shape, ground_, jumpSpeed = 20) {

  if (jumped == false) {
    spy -= jumpSpeed;
    jumped = true;
  }

}
function gravityAndFriction(...objects) {
    objects.forEach(object => {

        spy += 0.5;    //gravity
        object.y += spy;
        spy *= 0.93;    //friction

        if (object.y > ground.y - object.h) {
            jumped = false;
            object.y = ground.y - object.h;
            spy = 0;
        }
    })
}

function indexInObject(key , object){

  return Object.keys(object).indexOf(key);

}
function codeGenerator(length){

  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  var text = "";

  for(let i = 0; i < length; i++){

    text += letters.charAt(Math.floor(Math.random() * letters.length));

  }

  return text;

};
function forEach(obj, callback) {

    var __result_array__ = [];

    if (Array.isArray(obj)) {

        for (let i = 0; i < obj.length; i++) {

            __result_array__.push(callback(obj[i], i, obj));

        }

        return __result_array__;
    } else {

        Object.entries(obj).forEach(entry => {

            let [key, value] = entry;

            __result_array__.push(callback(key, value, obj));

        })

	return __result_array__;

    }

};




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




const X_RATIO = document.querySelector("input#xratio");
const Y_RATIO = document.querySelector("input#yratio");
const SEND_DATA_BTN = document.querySelector("input#send");
const GET_MAP_BTN = document.querySelector("input#get");
const SELECTION = document.querySelector("select");
const NAME = document.querySelector("input#name");
const PRE = document.querySelector("pre");
const DISABLED_BTN = document.querySelector("button.disable");


const blocks = [ ];
const [ width , height , playerRadius , wallHeight ] = [ 80 , 20 , 10 , 100 ];
const map = [ ];
const grid = [ ];
var canDraw = false;


// const drawGrid = (X, Y, width, height) => {

//   for(let i = 0 ; i < X ; i++){

//     ctx.strokeStyle = "white";
//     ctx.moveTo((i + 1) * width, 0);
//     ctx.lineTo((i + 1) * width, Y * height);
//     ctx.stroke();

//     for(let j = 0 ; j < Y ; j++){

//       ctx.strokeStyle = "white";
//       ctx.moveTo(0 , (j + 1) * height);
//       ctx.lineTo(X * width, (j + 1) * height);
//       ctx.stroke();

//     };

//   };

// };
const drawGrid = (X, Y, width, height) => {

  for(let i = 0 ; i < X ; i++){

    ctx.strokeStyle = "white";
    ctx.moveTo((i + 1) * width, 0);
    ctx.lineTo((i + 1) * width, Y * height);
    ctx.stroke();

  };

  for(let j = 0 ; j < Y ; j++){

    ctx.strokeStyle = "white";
    ctx.moveTo(0, (j + 1) * height);
    ctx.lineTo(X * width, (j + 1) * height);
    ctx.stroke();

  };

};

const setMap = () => {

  for(let i = 0 ; i < X_RATIO.value ; i++){

    map[i] = [];

    for(let j = 0 ; j < Y_RATIO.value ; j++){

      map[i][j] = "";

    }

  }
  
  canDraw = true;


};

SELECTION.onclick = (e) => {

  let index = SELECTION.selectedIndex;

  let width  = index == 0 ? 80 : index == 1 ? 20 : index == 2 ? 100 : 20;
  let height = index == 0 ? 20 : index == 1 ? 20 : index == 2 ? 20  : 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  canDraw ? drawGrid(canvas.width / width, canvas.height / height, width, height) : undefined;

  update();

};

SEND_DATA_BTN.onclick = (e) => {

  if(X_RATIO.value && Y_RATIO.value){

    canvas.width = X_RATIO.value * (width);
    canvas.height = Y_RATIO.value * (height);

    drawGrid(canvas.width / width, canvas.height / height, width, height);

    setMap();

  };

};


canvas.onclick = (e) => {

  let currentIndex = SELECTION.selectedIndex;

  if (canDraw) {

    if(currentIndex == 0){

      let [ posX, posY ] = align(e.pageX, e.pageY, width, height);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid(canvas.width / width, canvas.height / height, width, height);

      let block = new SHAPE({

        x : posX,
        y : posY,
        w : width,
        h : height,
        color : "green",
        rotation : 0

      });

      blocks.push(block);

      map[ block.y / block.h ][ block.x / block.w ] = "-";

      update();

    } else if(currentIndex == 1){
      
      let [ posX, posY ] = align(e.pageX, e.pageY, playerRadius * 2, playerRadius * 2);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid(canvas.width / 20, canvas.height / 20, 20, 20);

      let block = new SHAPE({

        x : posX + playerRadius,
        y : posY + playerRadius,
        radius : playerRadius,
        color : "aqua",
        rotation : 0,
        type : "circle"

      });

      blocks.push(block);

      map[ Math.floor(block.y / 20) ][ Math.floor(block.x / 80) ] = ".";

      update();

    } else if(currentIndex == 2){
      
      let [ posX, posY ] = align(e.pageX, e.pageY, 100, 20);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawGrid(canvas.width / 100, canvas.height / 20, 100, 20);

      let block = new SHAPE({

        x : posX,
        y : posY,
        w : 100,
        h : 20,
        color : "red",
        rotation : 0,
        type : "rect"

      })

      blocks.push(block);

      map[ Math.floor( block.y / 20 ) ][ Math.floor( block.x / 80 ) ] = "_"

      update();

    } else if(currentIndex == 3){
      
      let [ posX, posY ] = align(e.pageX, e.pageY, 20, 100);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid(canvas.width / 20, canvas.height / 100, 20, 100);

      let block = new SHAPE({

        x : posX,
        y : posY,
        w : 20,
        h : 100,
        color : COLORS.MAGENTA,
        rotation : 0,
        type : "rect"

      })

      blocks.push(block);

      map[ Math.floor( block.y / 20 ) ][ Math.floor( block.x / 80 ) ] = "|"

      update();

    }

  }

};
















const update = () => {

  blocks.forEach(block => block.update());

  // grid.forEach(block => block.update());

};

update();