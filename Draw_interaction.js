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
    //indexFinger
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
    //8-7
    let indexbone1 = dist(indexFingerTipX, indexFingerTipY,indexFingerDipX, indexFingerDipY);
    //7-6
    let indexbone2 = dist(indexFingerDipX, indexFingerDipY, indexFingerPipX, indexFingerPipY);
    //6-5
    let indexbone3 =dist(indexFingerPipX, indexFingerPipY, indexFingerMcpX, indexFingerMcpY); 
    /*
    Start drawing on the hands here
    */
    // pinchCircle(hand)
    fill(255, 255, 255);
    stroke(0);
    strokeWeight(6);
    //6-5
    push();
    let centerX2 = (indexFingerMcpX + indexFingerPipX) / 2;
    let centerY2 = (indexFingerMcpY + indexFingerPipY) / 2;
    let dx2 = indexFingerPipX - indexFingerMcpX;
    let dy2 = indexFingerPipY - indexFingerMcpY;
    let rotateAmount2 = Math.atan2(dy2, dx2);

    rectMode(CENTER);
    translate(centerX2, centerY2);
    rotate(rotateAmount2);
    rect(0, 0, indexbone3, indexbone3/4, indexbone3/10);
    pop();
    //7-6
    push();
    // 计算矩形中心点
     let centerX = (indexFingerPipX + indexFingerDipX) / 2; 
     let centerY = (indexFingerPipY + indexFingerDipY) / 2;
    // 计算旋转角度 - 通常使用 atan2(dy, dx)
    // 假设您想要根据手指方向旋转
    let dx = indexFingerDipX - indexFingerPipX;
    let dy = indexFingerDipY - indexFingerPipY;
    let rotateAmount = Math.atan2(dy, dx);
    // 设置矩形模式
    rectMode(CENTER);
    // 移动到矩形中心并旋转
    translate(centerX, centerY);
    rotate(rotateAmount);
    // 在原点绘制矩形（因为已经translate到中心点了）
    rect(0, 0, indexbone2, indexbone2/3, indexbone2/5);
    pop();
     //8-7
    triangle(indexFingerTipX, indexFingerTipY, indexFingerDipX+indexbone1/3, indexFingerDipY-1, indexFingerDipX-indexbone1/3, indexFingerDipY-1);
    //thumbFinger
    //4
    let thumbTipX = hand.thumb_tip.x;
    let thumbTipY = hand.thumb_tip.y;
    //3
    let thumbIpX = hand.thumb_ip.x;
    let thumbIpY = hand.thumb_ip.y;
    //2
    let thumbMcpX = hand.thumb_mcp.x;
    let thumbMcpY = hand.thumb_mcp.y;
    //1
    let thumbCmcX = hand.thumb_cmc.x;
    let thumbCmcY = hand.thumb_cmc.y;
    //4-3
    let Thumbbone1 = dist(thumbTipX, thumbTipY, thumbIpX, thumbIpY);
    //3-2
    let Thumbbone2 = dist(thumbIpX, thumbIpY, thumbMcpX, thumbMcpY);
    //2-1
    let Thumbbone3 = dist(thumbMcpX, thumbMcpY, thumbCmcX, thumbCmcY);
    fill(255, 255, 255);

    // 4-3
    triangle(thumbTipX, thumbTipY, thumbIpX + Thumbbone1/3, thumbIpY-1, thumbIpX - Thumbbone1/3, thumbIpY-1);
    // 绘制第一段骨骼 (3-2)
    push();
    // 计算矩形中心点
    let thumbCenterX1 = (thumbMcpX + thumbIpX) / 2;
    let thumbCenterY1 = (thumbMcpY + thumbIpY) / 2;
    // 计算旋转角度
    let thumbDx1 = thumbIpX - thumbMcpX;
    let thumbDy1 = thumbIpY - thumbMcpY;
    let thumbRotateAmount1 = Math.atan2(thumbDy1, thumbDx1);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(thumbCenterX1, thumbCenterY1);
    rotate(thumbRotateAmount1);
    rect(0, 0, Thumbbone2, Thumbbone2/3, Thumbbone2/5);
    pop();
    // 绘制第二段骨骼 (2-1)
    push();
    // 计算矩形中心点
    let thumbCenterX2 = (thumbCmcX + thumbMcpX) / 2;
    let thumbCenterY2 = (thumbCmcY + thumbMcpY) / 2;
    // 计算旋转角度
    let thumbDx2 = thumbMcpX - thumbCmcX;
    let thumbDy2 = thumbMcpY - thumbCmcY;
    let thumbRotateAmount2 = Math.atan2(thumbDy2, thumbDx2);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(thumbCenterX2, thumbCenterY2);
    rotate(thumbRotateAmount2);
    rect(0, 0, Thumbbone3, Thumbbone3/4, Thumbbone3/10);
    pop();

    //middleFinger
    //12
    let middleFingerTipX = hand.middle_finger_tip.x;
    let middleFingerTipY = hand.middle_finger_tip.y;
    //11
    let middleFingerDipX = hand.middle_finger_dip.x;
    let middleFingerDipY = hand.middle_finger_dip.y;
    //10
    let middleFingerPipX = hand.middle_finger_pip.x;
    let middleFingerPipY = hand.middle_finger_pip.y;
    //9
    let middleFingerMcpX = hand.middle_finger_mcp.x;
    let middleFingerMcpY = hand.middle_finger_mcp.y;
    //12-11
    let middlebone1 = dist(middleFingerTipX, middleFingerTipY, middleFingerDipX, middleFingerDipY);
    //11-10
    let middlebone2 = dist(middleFingerDipX, middleFingerDipY, middleFingerPipX, middleFingerPipY);
    //10-9
    let middlebone3 = dist(middleFingerPipX, middleFingerPipY, middleFingerMcpX, middleFingerMcpY);
    // 设置填充颜色
    fill(255, 255, 255);
    // 绘制指尖三角形 (12-11)
    triangle( middleFingerTipX, middleFingerTipY, middleFingerDipX + middlebone1/3, middleFingerDipY, middleFingerDipX - middlebone1/3, middleFingerDipY);
    // 绘制第一段骨骼 (11-10)
    push();
    // 计算矩形中心点
    let middleCenterX1 = (middleFingerPipX + middleFingerDipX) / 2;
    let middleCenterY1 = (middleFingerPipY + middleFingerDipY) / 2;
    // 计算旋转角度
    let middleDx1 = middleFingerDipX - middleFingerPipX;
    let middleDy1 = middleFingerDipY - middleFingerPipY;
    let middleRotateAmount1 = Math.atan2(middleDy1, middleDx1);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(middleCenterX1, middleCenterY1);
    rotate(middleRotateAmount1);
    rect(0, 0, middlebone2, middlebone2/3, middlebone2/5);
    pop();
    // 绘制第二段骨骼 (10-9)
    push();
    // 计算矩形中心点
    let middleCenterX2 = (middleFingerMcpX + middleFingerPipX) / 2;
    let middleCenterY2 = (middleFingerMcpY + middleFingerPipY) / 2;
    // 计算旋转角度
    let middleDx2 = middleFingerPipX - middleFingerMcpX;
    let middleDy2 = middleFingerPipY - middleFingerMcpY;
    let middleRotateAmount2 = Math.atan2(middleDy2, middleDx2);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(middleCenterX2, middleCenterY2);
    rotate(middleRotateAmount2);
    rect(0, 0, middlebone3, middlebone3/4, middlebone3/10);
    pop();

    //ringFinger
    //16
    let ringFingerTipX = hand.ring_finger_tip.x;
    let ringFingerTipY = hand.ring_finger_tip.y;
    //15
    let ringFingerDipX = hand.ring_finger_dip.x;
    let ringFingerDipY = hand.ring_finger_dip.y;
    //14
    let ringFingerPipX = hand.ring_finger_pip.x;
    let ringFingerPipY = hand.ring_finger_pip.y;
    //13
    let ringFingerMcpX = hand.ring_finger_mcp.x;
    let ringFingerMcpY = hand.ring_finger_mcp.y;
    //16-15
    let ringbone1 = dist(ringFingerTipX, ringFingerTipY, ringFingerDipX, ringFingerDipY);
    //15-14
    let ringbone2 = dist(ringFingerDipX, ringFingerDipY, ringFingerPipX, ringFingerPipY);
    //14-13
    let ringbone3 = dist(ringFingerPipX, ringFingerPipY, ringFingerMcpX, ringFingerMcpY);

    /*
    开始绘制无名指骨骼
    */

    // 设置填充颜色
    fill(255, 255, 255);

    // 绘制指尖三角形 (16-15)
    triangle(ringFingerTipX, ringFingerTipY, ringFingerDipX + ringbone1/3, ringFingerDipY, ringFingerDipX - ringbone1/3, ringFingerDipY);
    // 绘制第一段骨骼 (15-14)
    push();
    // 计算矩形中心点
    let ringCenterX1 = (ringFingerPipX + ringFingerDipX) / 2;
    let ringCenterY1 = (ringFingerPipY + ringFingerDipY) / 2;
    // 计算旋转角度
    let ringDx1 = ringFingerDipX - ringFingerPipX;
    let ringDy1 = ringFingerDipY - ringFingerPipY;
    let ringRotateAmount1 = Math.atan2(ringDy1, ringDx1);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(ringCenterX1, ringCenterY1);
    rotate(ringRotateAmount1);
    rect(0, 0, ringbone2, ringbone2/3, ringbone2/5);
    pop();
    // 绘制第二段骨骼 (14-13)
    push();
    // 计算矩形中心点
    let ringCenterX2 = (ringFingerMcpX + ringFingerPipX) / 2;
    let ringCenterY2 = (ringFingerMcpY + ringFingerPipY) / 2;
    // 计算旋转角度
    let ringDx2 = ringFingerPipX - ringFingerMcpX;
    let ringDy2 = ringFingerPipY - ringFingerMcpY;
    let ringRotateAmount2 = Math.atan2(ringDy2, ringDx2);
    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(ringCenterX2, ringCenterY2);
    rotate(ringRotateAmount2);
    rect(0, 0, ringbone3, ringbone3/4, ringbone3/10);
    pop();

    //pinky
    //20
    let pinkyFingerTipX = hand.pinky_finger_tip.x;
    let pinkyFingerTipY = hand.pinky_finger_tip.y;
    //19
    let pinkyFingerDipX = hand.pinky_finger_dip.x;
    let pinkyFingerDipY = hand.pinky_finger_dip.y;
    //18
    let pinkyFingerPipX = hand.pinky_finger_pip.x;
    let pinkyFingerPipY = hand.pinky_finger_pip.y;
    //17
    let pinkyFingerMcpX = hand.pinky_finger_mcp.x;
    let pinkyFingerMcpY = hand.pinky_finger_mcp.y;
    //20-19
    let pinkybone1 = dist(pinkyFingerTipX, pinkyFingerTipY, pinkyFingerDipX, pinkyFingerDipY);
    //19-18
    let pinkybone2 = dist(pinkyFingerDipX, pinkyFingerDipY, pinkyFingerPipX, pinkyFingerPipY);
    //18-17
    let pinkybone3 = dist(pinkyFingerPipX, pinkyFingerPipY, pinkyFingerMcpX, pinkyFingerMcpY);
    // 设置填充颜色
    fill(255, 255, 255);

    // 绘制指尖三角形 (20-19)
    triangle(
        pinkyFingerTipX, pinkyFingerTipY, 
        pinkyFingerDipX + pinkybone1/3, pinkyFingerDipY, 
        pinkyFingerDipX - pinkybone1/3, pinkyFingerDipY
    );

    // 绘制第一段骨骼 (19-18)
    push();
    // 计算矩形中心点
    let pinkyCenterX1 = (pinkyFingerPipX + pinkyFingerDipX) / 2;
    let pinkyCenterY1 = (pinkyFingerPipY + pinkyFingerDipY) / 2;

    // 计算旋转角度
    let pinkyDx1 = pinkyFingerDipX - pinkyFingerPipX;
    let pinkyDy1 = pinkyFingerDipY - pinkyFingerPipY;
    let pinkyRotateAmount1 = Math.atan2(pinkyDy1, pinkyDx1);

    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(pinkyCenterX1, pinkyCenterY1);
    rotate(pinkyRotateAmount1);
    rect(0, 0, pinkybone2, pinkybone2/3, pinkybone2/5);
    pop();

    // 绘制第二段骨骼 (18-17)
    push();
    // 计算矩形中心点
    let pinkyCenterX2 = (pinkyFingerMcpX + pinkyFingerPipX) / 2;
    let pinkyCenterY2 = (pinkyFingerMcpY + pinkyFingerPipY) / 2;

    // 计算旋转角度
    let pinkyDx2 = pinkyFingerPipX - pinkyFingerMcpX;
    let pinkyDy2 = pinkyFingerPipY - pinkyFingerMcpY;
    let pinkyRotateAmount2 = Math.atan2(pinkyDy2, pinkyDx2);

    // 设置矩形模式并绘制
    rectMode(CENTER);
    translate(pinkyCenterX2, pinkyCenterY2);
    rotate(pinkyRotateAmount2);
    rect(0, 0, pinkybone3, pinkybone3/4, pinkybone3/10);
    pop();

    //palm
    //0
    let wristX = hand.wrist.x;
    let wristY = hand.wrist.y;
    //0-1
    let plambone1=dist(wristX, wristY, thumbCmcX, thumbCmcY);
    //0-5
    let plambone2=dist(wristX, wristY, indexFingerMcpX, indexFingerMcpY);
    //0-9
    let plambone3=dist(wristX, wristY, middleFingerMcpX, middleFingerMcpY);
    //0-13
    let plambone4=dist(wristX, wristY, ringFingerMcpX, ringFingerMcpY);
    //0-17
    let plambone5=dist(wristX, wristY, pinkyFingerMcpX, pinkyFingerMcpY);
    // 设置填充颜色
    fill(255,255,255);

    // 绘制手腕到拇指根部的骨骼 (0-1)
    push();
    let palmCenterX1 = (wristX + thumbCmcX) / 2;
    let palmCenterY1 = (wristY + thumbCmcY) / 2;
    let palmDx1 = thumbCmcX - wristX;
    let palmDy1 = thumbCmcY - wristY;
    let palmRotateAmount1 = Math.atan2(palmDy1, palmDx1);

    rectMode(CENTER);
    translate(palmCenterX1, palmCenterY1);
    rotate(palmRotateAmount1);
    rect(0, 0, plambone1, plambone1/4, plambone1/8);
    pop();

    // 绘制手腕到食指根部的骨骼 (0-5)
    push();
    let palmCenterX2 = (wristX + indexFingerMcpX) / 2;
    let palmCenterY2 = (wristY + indexFingerMcpY) / 2;
    let palmDx2 = indexFingerMcpX - wristX;
    let palmDy2 = indexFingerMcpY - wristY;
    let palmRotateAmount2 = Math.atan2(palmDy2, palmDx2);

    rectMode(CENTER);
    translate(palmCenterX2, palmCenterY2);
    rotate(palmRotateAmount2);
    rect(0, 0, plambone2, plambone2/8, plambone2/16);
    pop();

    // 绘制手腕到中指根部的骨骼 (0-9)
    push();
    let palmCenterX3 = (wristX + middleFingerMcpX) / 2;
    let palmCenterY3 = (wristY + middleFingerMcpY) / 2;
    let palmDx3 = middleFingerMcpX - wristX;
    let palmDy3 = middleFingerMcpY - wristY;
    let palmRotateAmount3 = Math.atan2(palmDy3, palmDx3);

    rectMode(CENTER);
    translate(palmCenterX3, palmCenterY3);
    rotate(palmRotateAmount3);
    rect(0, 0, plambone3, plambone3/8, plambone3/16);
    pop();

    // 绘制手腕到无名指根部的骨骼 (0-13)
    push();
    let palmCenterX4 = (wristX + ringFingerMcpX) / 2;
    let palmCenterY4 = (wristY + ringFingerMcpY) / 2;
    let palmDx4 = ringFingerMcpX - wristX;
    let palmDy4 = ringFingerMcpY - wristY;
    let palmRotateAmount4 = Math.atan2(palmDy4, palmDx4);

    rectMode(CENTER);
    translate(palmCenterX4, palmCenterY4);
    rotate(palmRotateAmount4);
    rect(0, 0, plambone4, plambone4/8, plambone4/16);
    pop();

    // 绘制手腕到小指根部的骨骼 (0-17)
    push();
    let palmCenterX5 = (wristX + pinkyFingerMcpX) / 2;
    let palmCenterY5 = (wristY + pinkyFingerMcpY) / 2;
    let palmDx5 = pinkyFingerMcpX - wristX;
    let palmDy5 = pinkyFingerMcpY - wristY;
    let palmRotateAmount5 = Math.atan2(palmDy5, palmDx5);

    rectMode(CENTER);
    translate(palmCenterX5, palmCenterY5);
    rotate(palmRotateAmount5);
    rect(0, 0, plambone5, plambone5/8, plambone5/16);
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