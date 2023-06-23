
let poseNet; // will hold the poseNet data
let video; // will hold the webcam data
let pose; // will hold the data for the current pose (I think).
let particles = [];
let particlesExist = false;

function setup() {

  createCanvas(640, 420);
 
  video = createCapture(VIDEO);
  video.hide(); // hiding the video as instead we will draw it frame by frame later. 
  
  poseNet = ml5.poseNet(video,modelLoaded); // passing the video and a callback function.
  poseNet.on('pose',gotPoses);
}



function draw() {


  background(220);
  // The following two statements basically flip the image so that it mirrors the target.
  translate(width,0);
  scale(-1,1);
  
  image(video, 0,0);
  
  //check if pose has data and if so do something
  if(pose){
    /*
    NOTE it would be helpful to calculate the distance between the target and the camera.
    this way any images drawn over the video can be scaled appropriatly.
    for this you could calculate the distance between the eyes or the ears. 
    the bigger the distance the closer the user is to the camera. 
    */
    
    let scale = dist(pose.leftEar.x, pose.leftEar.y , pose.rightEar.x, pose.rightEar.y);
    
    // tracking and drawing over the eyes ears and nose;
   
    strokeWeight = 1.0;
    stroke (205,0,0); 
  
    circle(pose.nose.x, pose.nose.y, scale/.8);
		

   
    
    // emit the particles from eyes only if model is sure that it
    // is detecting the eyes
    if(pose.leftEye.confidence > 0 && pose.rightEye.confidence > 0){
      createParticles(scale);
      
    }
    
  }
  
}



function createParticles(scale){
  for (let i = 0; i < 5; i ++){
    let particle = new Particle(pose.rightEye.x + random(-5,5), pose.rightEye.y, scale / 20 , 255);
    let particle2 = new Particle(pose.leftEye.x + random(-5,5), pose.leftEye.y, scale / 20, 255);
  
    particles.push(particle);
    particles.push(particle2);
  }
}
function particlesRun(){
    if(particles.length > 0){
      for(i = particles.length - 1; i >= 0; i--){
        particles[i].draw();
        particles[i].emit();
        if(particles[i].dead()){
          particles.splice(i,1);
        }
        
      }
    }
}

function modelLoaded(){
  console.log("Pose net loaded! :D "); 
}

function gotPoses(poses){
  // Check to see if machine is picking up any poses
  // by checking to see if the array isn't empty.
  console.log(poses)
  
  if(poses.length > 0){
    pose = poses[0].pose;  
  }

}

