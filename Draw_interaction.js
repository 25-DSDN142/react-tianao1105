// ----=  HANDS  =----
//The display of fireworks is achieved through the use of AI for the switching process.
// Fist作为 Puppet 显示切换的全局状态
let puppetVisible = false;
let bothFistPrev = false; // 上升沿检测，避免长按重复触发/Rising edge detection to prevent repeated triggering due to long press

// 右手食指烟花The right index finger of the hand lighting the fireworks
let particles = [];
const MAX_PARTICLES = 250;
let rightIndexPrev = null; // 上一帧右手食指位置，用于滑动速度The position of the right index finger in the previous frame, used for controlling the sliding speed

// 食指滑动轨迹（渐隐折线）The sliding trajectory of the index finger (gradually fading curve)
let rightTrail = [];
const TRAIL_LIFE = 60;
const MAX_TRAIL_POINTS = 60;

function prepareInteraction() {
  bgImage = loadImage('/images/background.png');
}


function drawInteraction(faces, hands) {
image(bgImage, 0, 0, width, height);

  // 两只手都为 Fist 时在上升沿切换 puppetVisible
  let fists = 0;
  for (let i = 0; i < hands.length; i++) {
    let g = (typeof detectHandGesture === 'function') ? detectHandGesture(hands[i]) : null;
    if (g === 'Fist') fists++;
  }
  let bothFistNow = fists >= 2;
  if (bothFistNow && !bothFistPrev) {
    puppetVisible = !puppetVisible;
  }
  bothFistPrev = bothFistNow;

  // 左手 Pinch + 右手 Pointing
  let leftIsPinch = false;
  let rightIsPointing = false;
  let rightIndexPos = null;
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let g = (typeof detectHandGesture === 'function') ? detectHandGesture(hand) : null;
    if (hand.handedness === 'Left' && g === 'Pinch') leftIsPinch = true;
    if (hand.handedness === 'Right') {
      if (g === 'Pointing') rightIsPointing = true;
      if (hand.index_finger_tip) rightIndexPos = { x: hand.index_finger_tip.x, y: hand.index_finger_tip.y };
    }
  }
  // 触发条件满足时，在右手食指生成短寿命粒子/When the triggering condition is met, short-lived particles are generated on the index finger of the right hand.
  //The particle effects are based on the examples of others in P5.JS and have been modified accordingly.
  if (leftIsPinch && rightIsPointing && rightIndexPos) {
    let baseVX = 0, baseVY = 0;
    if (rightIndexPrev) {
      baseVX = (rightIndexPos.x - rightIndexPrev.x) * 0.5;
      baseVY = (rightIndexPos.y - rightIndexPrev.y) * 0.5;
    }
    //Limit the total number of particles to avoid stalling caused by accumulation.
    if (particles.length > MAX_PARTICLES) {
      particles.splice(0, particles.length - MAX_PARTICLES);
    }
    for (let k = 0; k < 8; k++) {
      let ang = random(TWO_PI);
      let spd = random(0.3, 1.8);
      let life = random(45, 70);
      particles.push({
        x: rightIndexPos.x,
        y: rightIndexPos.y,
        vx: baseVX + cos(ang) * spd,
        vy: baseVY + sin(ang) * spd,
        life: life,
        maxLife: life,
        size: random(3.5, 6),
        color: [random(200, 255), random(120, 255), random(20, 150)]
      });
    }
  }
  // 记录右手食指上一帧位置Record the position of the right index finger in the previous frame
  rightIndexPrev = rightIndexPos ? rightIndexPos : null;

  // 轨迹点采样Trajectory point sampling：左手 Pinch + 右手 Pointing 生效时追加一个点
  if (leftIsPinch && rightIsPointing && rightIndexPos) {
    const minDist = 1.5; // 采样间隔阈值，避免过密// Sampling interval threshold to avoid excessive density
    const head = rightTrail[rightTrail.length - 1];
    if (!head || dist(head.x, head.y, rightIndexPos.x, rightIndexPos.y) > minDist) {
      rightTrail.push({ x: rightIndexPos.x, y: rightIndexPos.y, life: TRAIL_LIFE });
      if (rightTrail.length > MAX_TRAIL_POINTS) rightTrail.shift();
    }
  }

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
    // 计算矩形中心点/ Calculate the center point of the rectangle
     let centerX = (indexFingerPipX + indexFingerDipX) / 2; 
     let centerY = (indexFingerPipY + indexFingerDipY) / 2;
    // 计算旋转角度 /Calculate the rotation angle
    // 根据手指方向旋转Rotate according to the direction of the finger
    let dx = indexFingerDipX - indexFingerPipX;
    let dy = indexFingerDipY - indexFingerPipY;
    let rotateAmount = Math.atan2(dy, dx);
  
    rectMode(CENTER);
    
    translate(centerX, centerY);
    rotate(rotateAmount);
  
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
    triangle(pinkyFingerTipX, pinkyFingerTipY, pinkyFingerDipX + pinkybone1/3, pinkyFingerDipY,  pinkyFingerDipX - pinkybone1/3, pinkyFingerDipY);

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


    //puppet
    if (puppetVisible) {
    noFill();
    stroke(255);
    strokeWeight(2);
    
    //4
    line(thumbTipX, thumbTipY, thumbTipX, thumbTipY+300);
    //8
    line(indexFingerTipX, indexFingerTipY, indexFingerTipX, indexFingerTipY+150);
    //12
    line(middleFingerTipX, middleFingerTipY, middleFingerTipX, middleFingerTipY+150);
    //16
    line(ringFingerTipX, ringFingerTipY, ringFingerTipX, ringFingerTipY+150);
    //20
    line(pinkyFingerTipX, pinkyFingerTipY, pinkyFingerTipX, pinkyFingerTipY+300);
    //puppet body
    fill(194, 190, 163);
    stroke(194, 190, 163);
    ellipse(middleFingerTipX, middleFingerTipY+150, 80, 80);
    strokeWeight(50);
    line(middleFingerTipX, middleFingerTipY+200,middleFingerTipX, middleFingerTipY+300)
    strokeWeight(20);

    line(middleFingerTipX, middleFingerTipY+180, indexFingerTipX, indexFingerTipY+150);
    line(middleFingerTipX, middleFingerTipY+180, ringFingerTipX, ringFingerTipY+150);

    line(middleFingerTipX, middleFingerTipY+300,  thumbTipX, thumbTipY+300);
    line(middleFingerTipX, middleFingerTipY+300, pinkyFingerTipX, pinkyFingerTipY+300);
    }
    

    /*
    Stop drawing on the hands here
    */
  }

  // 更新并绘制粒子Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    // 运动学：轻微阻尼（更小的阻尼使轨迹更长）Kinematics: Slight damping (smaller damping results in a longer trajectory)AI provides
    const oldX = p.x;
    const oldY = p.y;
    p.vx *= 0.985;
    p.vy *= 0.985;
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 1;

    // 绘制运动轨迹线段Draw the trajectory line segments
    const alpha = map(p.life, 0, p.maxLife, 0, 255);
    push();
    stroke(p.color[0], p.color[1], p.color[2], alpha * 0.5);
    strokeWeight(p.size * 0.5);
    line(oldX, oldY, p.x, p.y);
    pop();

    // 仅绘制核心点Only draw the core points
    push();
    noStroke();
    fill(p.color[0], p.color[1], p.color[2], alpha * 0.9);
    circle(p.x, p.y, p.size);
    pop();

    // 移除粒子Remove particles
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }

  // 绘制右手食指的轨迹折线Draw the trajectory line of the right index finger
  if (rightTrail.length > 1) {
    push();
    noFill();
    for (let i = 1; i < rightTrail.length; i++) {
      const a = rightTrail[i - 1];
      const b = rightTrail[i];
      const lifeAvg = (a.life + b.life) * 0.5;
      const t = constrain(lifeAvg / TRAIL_LIFE, 0, 1);
      const alpha = 220 * t;              // 渐隐
      const w = 1 + 6 * t;                // 渐细
      stroke(255, 255, 255, alpha);
      strokeWeight(w);
      line(a.x, a.y, b.x, b.y);
    }
    pop();

    // update and clean
    for (let i = rightTrail.length - 1; i >= 0; i--) {
      rightTrail[i].life -= 1;
      if (rightTrail[i].life <= 0) rightTrail.splice(i, 1);
    }
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
    let rightEyeWidth = face.rightEye.width;
    let rightEyeHeight = face.rightEye.height;
    let chinX = face.keypoints[206].x;
    let chinY = face.keypoints[206].y;
    let chinWidth = dist(chinX, chinY, face.keypoints[426].x, face.keypoints[426].y,);
    let chinHeight = dist(chinX, chinY, face.keypoints[149].x, face.keypoints[149].y,);

    stroke(135);
    strokeWeight(8);

    fill(255);
    //head
    beginShape();
    vertex(face.keypoints[10].x, face.keypoints[10].y);
    bezierVertex(face.keypoints[67].x, face.keypoints[67].y,face.keypoints[103].x, face.keypoints[103].y,face.keypoints[71].x, face.keypoints[71].y);
    bezierVertex(face.keypoints[127].x, face.keypoints[127].y,face.keypoints[234].x, face.keypoints[234].y,face.keypoints[186].x, face.keypoints[186].y);
    vertex(face.keypoints[170].x, face.keypoints[170].y);
    vertex(face.keypoints[395].x, face.keypoints[395].y);
    vertex(face.keypoints[410].x, face.keypoints[410].y);
    bezierVertex(face.keypoints[454].x, face.keypoints[454].y,face.keypoints[356].x, face.keypoints[356].y,face.keypoints[301].x, face.keypoints[301].y);
    bezierVertex(face.keypoints[297].x, face.keypoints[297].y,face.keypoints[338].x, face.keypoints[338].y,face.keypoints[10].x, face.keypoints[10].y);
    endShape();
    //nose
    stroke(0,0,0,50);
    strokeWeight(8);
    fill(170)
    beginShape();
    vertex(face.keypoints[197].x, face.keypoints[197].y);
    bezierVertex(face.keypoints[129].x, face.keypoints[129].y,face.keypoints[64].x, face.keypoints[64].y,face.keypoints[219].x, face.keypoints[219].y);
    bezierVertex(face.keypoints[237].x, face.keypoints[237].y,face.keypoints[44].x, face.keypoints[44].y,face.keypoints[4].x, face.keypoints[4].y);
    bezierVertex(face.keypoints[274].x, face.keypoints[274].y,face.keypoints[457].x, face.keypoints[457].y,face.keypoints[439].x, face.keypoints[439].y);
    bezierVertex(face.keypoints[294].x, face.keypoints[294].y,face.keypoints[358].x, face.keypoints[358].y,face.keypoints[197].x, face.keypoints[197].y);
    endShape();
    //mouth
    line(face.keypoints[80].x, face.keypoints[80].y,face.keypoints[88].x, face.keypoints[88].y);
    line(face.keypoints[81].x, face.keypoints[81].y,face.keypoints[178].x, face.keypoints[178].y);
    line(face.keypoints[82].x, face.keypoints[82].y,face.keypoints[87].x, face.keypoints[87].y);
    line(face.keypoints[13].x, face.keypoints[13].y,face.keypoints[14].x, face.keypoints[14].y);
    line(face.keypoints[312].x, face.keypoints[312].y,face.keypoints[317].x, face.keypoints[317].y);
    line(face.keypoints[311].x, face.keypoints[311].y,face.keypoints[402].x, face.keypoints[402].y);
    line(face.keypoints[310].x, face.keypoints[310].y,face.keypoints[318].x, face.keypoints[318].y);
    //eyes
    fill(0, 0, 0, 90);
    ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight*2.5);
    ellipse(rightEyeCenterX, rightEyeCenterY, rightEyeWidth, rightEyeHeight*2.5);

    fill(225, 225, 0);
    //ellipse(leftEyeCenterX, leftEyeCenterY, leftEyeWidth, leftEyeHeight);
    
  
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