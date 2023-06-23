class Particle{
  constructor(x,y,width,lifespan){
    this.x = x;
    this.y = y;
    this.width = width;
    this.lifespan = lifespan;
    this.col;
    this.red;
    this.green;
    this.blue;
}
	
	circle (){
		color = fill, (205,0,0)
	}
  draw(){
    //randomly generate a color
    this.red = random(0,255);
    this.green = random(0,255);
    this.blue = random(0,255);
    
    this.col = color(this.red, this.green,this.blue, this.lifespan);
    stroke(this.col);
		fill(205,0,0)
    strokeWeight = 2.0;
    square(this.x, this.y,this.width);
  }
  emit(){
    // particles will flow upwards;
     this.x += random(-0.5, 0.5);
     this.y += random(-2.0, -5.0);
     // this.width += (this.lifespan - 255);
  }
  
  dead(){
    if(this.lifespan < 0 || this.y < 0){
      return true;
    }  
    else {
      this.lifespan -= 3.0;
      return false;
    }
  }
    
}