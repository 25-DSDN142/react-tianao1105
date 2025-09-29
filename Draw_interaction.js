// ----=  HANDS  =----
function prepareInteraction() {
  //bgImage = loadImage('/images/background.png');
}


function drawInteraction(faces, hands) {

  // hands part
  // USING THE GESTURE DETECTORS (check their values in the debug menu)
  // detectHandGesture(hand) returns "Pinch", "Peace", "Thumbs Up", "Pointing", "Open Palm", or "Fist"

  // for loop to capture if there is more than one hand on the screen. This applies the same process to all hands.
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    if (showKeypoints) {
      drawPoints(hand)
      drawConnections(hand)
    }
    
    // console.log(hand);
    //8
    let indexFingerTipX = hand.index_finger_tip.x;
    let indexFingerTipY = hand.index_finger_tip.y;
    //7
    let indexFingerDipX = hand.index_finger_dip.x;
    let indexFingerDipY = hand.index_finger_dip.y;
  
   
    //6
    let indexFingerPipX = hand.index_finger_pip.x;
    let indexFingerPipY = hand.index_finger_pip.y;
  
    //5
    let indexFingerMcpX = hand.index_finger_mcp.x;
    let indexFingerMcpY = hand.index_finger_mcp.y;
    //7-6
    let bone2 = dist(indexFingerDipX, indexFingerDipY, indexFingerPipX, indexFingerPipY);
    //6-5
    let bone3 =dist(indexFingerPipX, indexFingerPipY, indexFingerMcpX, indexFingerMcpY); 
    //8-7
    let bone1 = dist(indexFingerTipX, indexFingerTipY,indexFingerDipX, indexFingerDipY);
    //9
    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
    /*
    Start drawing on the hands here
    */

    // pinchCircle(hand)
    fill(255, 255, 255);
    //8-7
    triangle(indexFingerTipX, indexFingerTipY, indexFingerDipX+bone1/2, indexFingerDipY, indexFingerDipX-bone1/2, indexFingerDipY);
    //7-6
  
   
    let dx = indexFingerMcpX ;
    let dy = indexFingerMcpY ;
    push();
    let rotateAmount;
    rotateAmount= Math.atan2(dx,dy); 
    rotate(rotateAmount);
    rectMode(CENTER);
    rect( (indexFingerPipX+ indexFingerDipX)/2, (indexFingerPipY+ indexFingerDipY)/2,bone1, bone2, bone2/5);
    pop();
    



    /*
    Stop drawing on the hands here
    */
  }



  //------------------------------------------------------------
  //facePart
  // for loop to capture if there is more than one face on the screen. This applies the same process to all faces. 
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i]; // face holds all the keypoints of the face
    if (showKeypoints) {
      drawPoints(face)
    }
    // console.log(face);
    /*
    Once this program has a face, it knows some things about it.
    This includes how to draw a box around the face, and an oval. 
    It also knows where the key points of the following parts are:
     face.leftEye
     face.leftEyebrow
     face.lips
     face.rightEye
     face.rightEyebrow
    */

    /*
    Start drawing on the face here
    */
    let faceWidth = face.faceOval.width;
    let leftEyeCenterX = face.leftEye.centerX;
    let leftEyeCenterY = face.leftEye.centerY;
    let leftEyeWidth = face.leftEye.width;
    let leftEyeHeight = face.leftEye.height;
    let rightEyeCenterX = face.rightEye.centerX;
    let rightEyeCenterY = face.rightEye.centerY;
    let headX = face.keypoints[6].x;
    let headY = face.keypoints[6].y;
    let chinX = face.keypoints[206].x;
    let chinY = face.keypoints[206].y;
    let chinWidth = dist(chinX, chinY, face.keypoints[426].x, face.keypoints[426].y,);
    let chinHeight = dist(chinX, chinY, face.keypoints[149].x, face.keypoints[149].y,);

    noStroke();
    fill(255);
    ellipse(headX, headY, faceWidth, faceWidth);
    rect(chinX, chinY, chinWidth, chinHeight, 10);
    
    fill(0, 0, 0, 90);
  
    ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeWidth);
    ellipse(rightEyeCenterX, rightEyeCenterY, leftEyeWidth, leftEyeWidth);

    fill(225, 225, 0);
    ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight);
    
  
    /*
    Stop drawing on the face here
    */

  }
  //------------------------------------------------------
  // You can make addtional elements here, but keep the face drawing inside the for loop. 
}


function drawConnections(hand) {
  // Draw the skeletal connections
  push()
  for (let j = 0; j < connections.length; j++) {
    let pointAIndex = connections[j][0];
    let pointBIndex = connections[j][1];
    let pointA = hand.keypoints[pointAIndex];
    let pointB = hand.keypoints[pointBIndex];
    stroke(255, 0, 0);
    strokeWeight(2);
    line(pointA.x, pointA.y, pointB.x, pointB.y);
  }
  pop()
}

function pinchCircle(hand) { // adapted from https://editor.p5js.org/ml5/sketches/DNbSiIYKB
  // Find the index finger tip and thumb tip
  let finger = hand.index_finger_tip;
  //let finger = hand.pinky_finger_tip;
  let thumb = hand.thumb_tip;

  // Draw circles at finger positions
  let centerX = (finger.x + thumb.x) / 2;
  let centerY = (finger.y + thumb.y) / 2;
  // Calculate the pinch "distance" between finger and thumb
  let pinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  // This circle's size is controlled by a "pinch" gesture
  fill(0, 255, 0, 200);
  stroke(0);
  strokeWeight(2);
  circle(centerX, centerY, pinch);

}


// This function draw's a dot on all the keypoints. It can be passed a whole face, or part of one. 
function drawPoints(feature) {

  push()
  for (let i = 0; i < feature.keypoints.length; i++) {
    let element = feature.keypoints[i];
    noStroke();
    fill(0, 255, 0);
    circle(element.x, element.y, 5);
  }
  pop()

}