let facemesh;
let predictions = [];
const FACEMESH_POINTS = [409,270,269,267,0,37,39,40,185,61,146,91,181,84,17,314,405,321,375,291];

function setup() {
  // 置中畫布
  let cnv = createCanvas(640, 480);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

  // 啟用視訊
  let video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 載入facemesh模型
  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on('predict', results => {
    predictions = results;
  });
}

function modelReady() {
  // 模型載入完成
}

function draw() {
  background(220);

  // 畫出facemesh線條
  drawFacemeshLines();
}

function drawFacemeshLines() {
  if (predictions.length > 0) {
    let keypoints = predictions[0].scaledMesh;

    stroke('#ff006e');
    strokeWeight(15);
    for (let i = 0; i < FACEMESH_POINTS.length - 1; i++) {
      let idx1 = FACEMESH_POINTS[i];
      let idx2 = FACEMESH_POINTS[i + 1];
      let [x1, y1] = keypoints[idx1];
      let [x2, y2] = keypoints[idx2];
      line(x1, y1, x2, y2);
    }
  }
}
