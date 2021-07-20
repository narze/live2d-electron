
    /*
      Human library
      homepage: <https://github.com/vladmandic/human>
      author: <https://github.com/vladmandic>'
    */
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all2) => {
  __markAsModule(target);
  for (var name in all2)
    __defProp(target, name, { get: all2[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// dist/tfjs.esm.js
var require_tfjs_esm = __commonJS({
  "dist/tfjs.esm.js"(exports) {
    var __create2 = Object.create;
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf2 = Object.getPrototypeOf;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __markAsModule2 = (target) => __defProp2(target, "__esModule", { value: true });
    var __reExport2 = (target, module22, desc) => {
      if (module22 && typeof module22 === "object" || typeof module22 === "function") {
        for (let key of __getOwnPropNames2(module22))
          if (!__hasOwnProp2.call(target, key) && key !== "default")
            __defProp2(target, key, { get: () => module22[key], enumerable: !(desc = __getOwnPropDesc2(module22, key)) || desc.enumerable });
      }
      return target;
    };
    var __toModule2 = (module22) => {
      return __reExport2(__markAsModule2(__defProp2(module22 != null ? __create2(__getProtoOf2(module22)) : {}, "default", module22 && module22.__esModule && "default" in module22 ? { get: () => module22.default, enumerable: true } : { value: module22, enumerable: true })), module22);
    };
    __markAsModule2(exports);
    __reExport2(exports, __toModule2(require("@tensorflow/tfjs-node")));
  }
});

// src/human.ts
__export(exports, {
  Human: () => Human,
  default: () => Human
});

// src/helpers.ts
function join(folder, file) {
  const separator = folder.endsWith("/") ? "" : "/";
  const skipJoin = file.startsWith(".") || file.startsWith("/") || file.startsWith("http:") || file.startsWith("https:") || file.startsWith("file:");
  const path = skipJoin ? `${file}` : `${folder}${separator}${file}`;
  if (!path.toLocaleLowerCase().includes(".json"))
    throw new Error(`Human: ModelPath Error: ${path} Expecting JSON file`);
  return path;
}
function log(...msg) {
  const dt = new Date();
  const ts = `${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt.getSeconds().toString().padStart(2, "0")}.${dt.getMilliseconds().toString().padStart(3, "0")}`;
  if (msg)
    console.log(ts, "Human:", ...msg);
}
var now = () => {
  if (typeof performance !== "undefined")
    return performance.now();
  return parseInt((Number(process.hrtime.bigint()) / 1e3 / 1e3).toString());
};
function mergeDeep(...objects) {
  const isObject = (obj) => obj && typeof obj === "object";
  return objects.reduce((prev, obj) => {
    Object.keys(obj || {}).forEach((key) => {
      const pVal = prev[key];
      const oVal = obj[key];
      if (Array.isArray(pVal) && Array.isArray(oVal))
        prev[key] = pVal.concat(...oVal);
      else if (isObject(pVal) && isObject(oVal))
        prev[key] = mergeDeep(pVal, oVal);
      else
        prev[key] = oVal;
    });
    return prev;
  }, {});
}

// src/config.ts
var config = {
  backend: "webgl",
  modelBasePath: "../models/",
  wasmPath: "../node_modules/@tensorflow/tfjs-backend-wasm/dist/",
  debug: true,
  async: true,
  warmup: "full",
  cacheSensitivity: 0.75,
  skipFrame: false,
  filter: {
    enabled: true,
    width: 0,
    height: 0,
    flip: false,
    return: true,
    brightness: 0,
    contrast: 0,
    sharpness: 0,
    blur: 0,
    saturation: 0,
    hue: 0,
    negative: false,
    sepia: false,
    vintage: false,
    kodachrome: false,
    technicolor: false,
    polaroid: false,
    pixelate: 0
  },
  gesture: {
    enabled: true
  },
  face: {
    enabled: true,
    detector: {
      modelPath: "blazeface.json",
      rotation: true,
      maxDetected: 15,
      skipFrames: 15,
      minConfidence: 0.2,
      iouThreshold: 0.1,
      return: false
    },
    mesh: {
      enabled: true,
      modelPath: "facemesh.json"
    },
    iris: {
      enabled: true,
      modelPath: "iris.json"
    },
    description: {
      enabled: true,
      modelPath: "faceres.json",
      skipFrames: 11,
      minConfidence: 0.1
    },
    emotion: {
      enabled: true,
      minConfidence: 0.1,
      skipFrames: 17,
      modelPath: "emotion.json"
    }
  },
  body: {
    enabled: true,
    modelPath: "movenet-lightning.json",
    maxDetected: 1,
    minConfidence: 0.2,
    skipFrames: 1
  },
  hand: {
    enabled: true,
    rotation: true,
    skipFrames: 18,
    minConfidence: 0.1,
    iouThreshold: 0.1,
    maxDetected: 2,
    landmarks: true,
    detector: {
      modelPath: "handdetect.json"
    },
    skeleton: {
      modelPath: "handskeleton.json"
    }
  },
  object: {
    enabled: false,
    modelPath: "mb3-centernet.json",
    minConfidence: 0.2,
    iouThreshold: 0.4,
    maxDetected: 10,
    skipFrames: 19
  },
  segmentation: {
    enabled: false,
    modelPath: "selfie.json"
  }
};

// src/sysinfo.ts
function info() {
  let platform;
  let agent;
  if (typeof navigator !== "undefined") {
    const raw = navigator.userAgent.match(/\(([^()]+)\)/g);
    if (raw && raw[0]) {
      const platformMatch = raw[0].match(/\(([^()]+)\)/g);
      platform = platformMatch ? platformMatch[0].replace(/\(|\)/g, "") : "";
      agent = navigator.userAgent.replace(raw[0], "");
      if (platform[1])
        agent = agent.replace(raw[1], "");
      agent = agent.replace(/  /g, " ");
    }
  } else if (typeof process !== "undefined") {
    platform = `${process.platform} ${process.arch}`;
    agent = `NodeJS ${process.version}`;
  }
  return { platform, agent };
}

// src/human.ts
var tf21 = __toModule(require_tfjs_esm());

// src/tfjs/backend.ts
var tf = __toModule(require_tfjs_esm());
var config2 = {
  name: "humangl",
  priority: 99,
  canvas: null,
  gl: null,
  width: 1024,
  height: 1024,
  webGLattr: {
    alpha: false,
    antialias: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
    depth: false,
    stencil: false,
    failIfMajorPerformanceCaveat: false,
    desynchronized: true
  }
};
function register() {
  if (!tf.findBackend(config2.name)) {
    log("backend registration:", config2.name);
    try {
      config2.canvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(config2.width, config2.height) : document.createElement("canvas");
    } catch (err) {
      log("error: cannot create canvas:", err);
      return;
    }
    try {
      config2.gl = config2.canvas.getContext("webgl2", config2.webGLattr);
    } catch (err) {
      log("error: cannot get WebGL2 context:", err);
      return;
    }
    try {
      tf.setWebGLContext(2, config2.gl);
    } catch (err) {
      log("error: cannot set WebGL2 context:", err);
      return;
    }
    try {
      const ctx = new tf.GPGPUContext(config2.gl);
      tf.registerBackend(config2.name, () => new tf.MathBackendWebGL(ctx), config2.priority);
    } catch (err) {
      log("error: cannot register WebGL backend:", err);
      return;
    }
    try {
      const kernels = tf.getKernelsForBackend("webgl");
      kernels.forEach((kernelConfig) => {
        const newKernelConfig = { ...kernelConfig, backendName: config2.name };
        tf.registerKernel(newKernelConfig);
      });
    } catch (err) {
      log("error: cannot update WebGL backend registration:", err);
      return;
    }
    try {
      tf.ENV.set("WEBGL_VERSION", 2);
    } catch (err) {
      log("error: cannot set WebGL backend flags:", err);
      return;
    }
    log("backend registered:", config2.name);
  }
}

// src/face.ts
var tf8 = __toModule(require_tfjs_esm());

// src/blazeface/facemesh.ts
var tf5 = __toModule(require_tfjs_esm());

// src/blazeface/blazeface.ts
var tf3 = __toModule(require_tfjs_esm());

// src/blazeface/box.ts
var tf2 = __toModule(require_tfjs_esm());
function scaleBoxCoordinates(box6, factor) {
  const startPoint = [box6.startPoint[0] * factor[0], box6.startPoint[1] * factor[1]];
  const endPoint = [box6.endPoint[0] * factor[0], box6.endPoint[1] * factor[1]];
  return { startPoint, endPoint };
}
function getBoxSize(box6) {
  return [
    Math.abs(box6.endPoint[0] - box6.startPoint[0]),
    Math.abs(box6.endPoint[1] - box6.startPoint[1])
  ];
}
function getBoxCenter(box6) {
  return [
    box6.startPoint[0] + (box6.endPoint[0] - box6.startPoint[0]) / 2,
    box6.startPoint[1] + (box6.endPoint[1] - box6.startPoint[1]) / 2
  ];
}
function cutBoxFromImageAndResize(box6, image18, cropSize) {
  const h = image18.shape[1];
  const w = image18.shape[2];
  const boxes = [[
    box6.startPoint[1] / h,
    box6.startPoint[0] / w,
    box6.endPoint[1] / h,
    box6.endPoint[0] / w
  ]];
  return tf2.image.cropAndResize(image18, boxes, [0], cropSize);
}
function enlargeBox(box6, factor = 1.5) {
  const center = getBoxCenter(box6);
  const size = getBoxSize(box6);
  const newHalfSize = [factor * size[0] / 2, factor * size[1] / 2];
  const startPoint = [center[0] - newHalfSize[0], center[1] - newHalfSize[1]];
  const endPoint = [center[0] + newHalfSize[0], center[1] + newHalfSize[1]];
  return { startPoint, endPoint, landmarks: box6.landmarks };
}
function squarifyBox(box6) {
  const centers = getBoxCenter(box6);
  const size = getBoxSize(box6);
  const maxEdge = Math.max(...size);
  const halfSize = maxEdge / 2;
  const startPoint = [Math.round(centers[0] - halfSize), Math.round(centers[1] - halfSize)];
  const endPoint = [Math.round(centers[0] + halfSize), Math.round(centers[1] + halfSize)];
  return { startPoint, endPoint, landmarks: box6.landmarks };
}
function calculateLandmarksBoundingBox(landmarks) {
  const xs = landmarks.map((d) => d[0]);
  const ys = landmarks.map((d) => d[1]);
  const startPoint = [Math.min(...xs), Math.min(...ys)];
  const endPoint = [Math.max(...xs), Math.max(...ys)];
  return { startPoint, endPoint, landmarks };
}
var createBox = (startEndTensor) => ({
  startPoint: tf2.slice(startEndTensor, [0, 0], [-1, 2]),
  endPoint: tf2.slice(startEndTensor, [0, 2], [-1, 2])
});

// src/blazeface/util.ts
var IDENTITY_MATRIX = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
function normalizeRadians(angle) {
  return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
}
function computeRotation(point1, point2) {
  const radians = Math.PI / 2 - Math.atan2(-(point2[1] - point1[1]), point2[0] - point1[0]);
  return normalizeRadians(radians);
}
function buildTranslationMatrix(x, y) {
  return [[1, 0, x], [0, 1, y], [0, 0, 1]];
}
function dot(v1, v2) {
  let product = 0;
  for (let i = 0; i < v1.length; i++) {
    product += v1[i] * v2[i];
  }
  return product;
}
function getColumnFrom2DArr(arr, columnIndex) {
  const column = [];
  for (let i = 0; i < arr.length; i++) {
    column.push(arr[i][columnIndex]);
  }
  return column;
}
function multiplyTransformMatrices(mat1, mat2) {
  const product = [];
  const size = mat1.length;
  for (let row = 0; row < size; row++) {
    product.push([]);
    for (let col = 0; col < size; col++) {
      product[row].push(dot(mat1[row], getColumnFrom2DArr(mat2, col)));
    }
  }
  return product;
}
function buildRotationMatrix(rotation, center) {
  const cosA = Math.cos(rotation);
  const sinA = Math.sin(rotation);
  const rotationMatrix = [[cosA, -sinA, 0], [sinA, cosA, 0], [0, 0, 1]];
  const translationMatrix = buildTranslationMatrix(center[0], center[1]);
  const translationTimesRotation = multiplyTransformMatrices(translationMatrix, rotationMatrix);
  const negativeTranslationMatrix = buildTranslationMatrix(-center[0], -center[1]);
  return multiplyTransformMatrices(translationTimesRotation, negativeTranslationMatrix);
}
function invertTransformMatrix(matrix) {
  const rotationComponent = [[matrix[0][0], matrix[1][0]], [matrix[0][1], matrix[1][1]]];
  const translationComponent = [matrix[0][2], matrix[1][2]];
  const invertedTranslation = [
    -dot(rotationComponent[0], translationComponent),
    -dot(rotationComponent[1], translationComponent)
  ];
  return [
    rotationComponent[0].concat(invertedTranslation[0]),
    rotationComponent[1].concat(invertedTranslation[1]),
    [0, 0, 1]
  ];
}
function rotatePoint(homogeneousCoordinate, rotationMatrix) {
  return [
    dot(homogeneousCoordinate, rotationMatrix[0]),
    dot(homogeneousCoordinate, rotationMatrix[1])
  ];
}
function generateAnchors(inputSize) {
  const spec = { strides: [inputSize / 16, inputSize / 8], anchors: [2, 6] };
  const anchors3 = [];
  for (let i = 0; i < spec.strides.length; i++) {
    const stride = spec.strides[i];
    const gridRows = Math.floor((inputSize + stride - 1) / stride);
    const gridCols = Math.floor((inputSize + stride - 1) / stride);
    const anchorsNum = spec.anchors[i];
    for (let gridY = 0; gridY < gridRows; gridY++) {
      const anchorY = stride * (gridY + 0.5);
      for (let gridX = 0; gridX < gridCols; gridX++) {
        const anchorX = stride * (gridX + 0.5);
        for (let n = 0; n < anchorsNum; n++) {
          anchors3.push([anchorX, anchorY]);
        }
      }
    }
  }
  return anchors3;
}

// src/blazeface/blazeface.ts
var keypointsCount = 6;
function decodeBounds(boxOutputs, anchors3, inputSize) {
  const boxStarts = tf3.slice(boxOutputs, [0, 1], [-1, 2]);
  const centers = tf3.add(boxStarts, anchors3);
  const boxSizes = tf3.slice(boxOutputs, [0, 3], [-1, 2]);
  const boxSizesNormalized = tf3.div(boxSizes, inputSize);
  const centersNormalized = tf3.div(centers, inputSize);
  const halfBoxSize = tf3.div(boxSizesNormalized, 2);
  const starts = tf3.sub(centersNormalized, halfBoxSize);
  const ends = tf3.add(centersNormalized, halfBoxSize);
  const startNormalized = tf3.mul(starts, inputSize);
  const endNormalized = tf3.mul(ends, inputSize);
  const concatAxis = 1;
  return tf3.concat2d([startNormalized, endNormalized], concatAxis);
}
var BlazeFaceModel = class {
  constructor(model10, config3) {
    this.model = model10;
    this.anchorsData = generateAnchors(model10.inputs[0].shape[1]);
    this.anchors = tf3.tensor2d(this.anchorsData);
    this.inputSize = model10.inputs[0].shape[2];
    this.config = config3;
  }
  async getBoundingBoxes(inputImage) {
    if (!inputImage || inputImage.isDisposedInternal || inputImage.shape.length !== 4 || inputImage.shape[1] < 1 || inputImage.shape[2] < 1)
      return null;
    const [batch, boxes, scores] = tf3.tidy(() => {
      const resizedImage = tf3.image.resizeBilinear(inputImage, [this.inputSize, this.inputSize]);
      const normalizedImage = resizedImage.div(127.5).sub(0.5);
      const res = this.model.execute(normalizedImage);
      let batchOut;
      if (Array.isArray(res)) {
        const sorted = res.sort((a, b) => a.size - b.size);
        const concat384 = tf3.concat([sorted[0], sorted[2]], 2);
        const concat512 = tf3.concat([sorted[1], sorted[3]], 2);
        const concat3 = tf3.concat([concat512, concat384], 1);
        batchOut = concat3.squeeze(0);
      } else {
        batchOut = tf3.squeeze(res);
      }
      const boxesOut = decodeBounds(batchOut, this.anchors, [this.inputSize, this.inputSize]);
      const logits = tf3.slice(batchOut, [0, 0], [-1, 1]);
      const scoresOut = tf3.sigmoid(logits).squeeze().dataSync();
      return [batchOut, boxesOut, scoresOut];
    });
    const nmsTensor = await tf3.image.nonMaxSuppressionAsync(boxes, scores, this.config.face.detector.maxDetected, this.config.face.detector.iouThreshold, this.config.face.detector.minConfidence);
    const nms = nmsTensor.arraySync();
    nmsTensor.dispose();
    const annotatedBoxes = [];
    for (let i = 0; i < nms.length; i++) {
      const confidence = scores[nms[i]];
      if (confidence > this.config.face.detector.minConfidence) {
        const boundingBox = tf3.slice(boxes, [nms[i], 0], [1, -1]);
        const localBox = createBox(boundingBox);
        boundingBox.dispose();
        const anchor = this.anchorsData[nms[i]];
        const landmarks = tf3.tidy(() => tf3.slice(batch, [nms[i], keypointsCount - 1], [1, -1]).squeeze().reshape([keypointsCount, -1]));
        annotatedBoxes.push({ box: localBox, landmarks, anchor, confidence });
      }
    }
    batch.dispose();
    boxes.dispose();
    return {
      boxes: annotatedBoxes,
      scaleFactor: [inputImage.shape[2] / this.inputSize, inputImage.shape[1] / this.inputSize]
    };
  }
};
async function load(config3) {
  const model10 = await tf3.loadGraphModel(join(config3.modelBasePath, config3.face.detector.modelPath), { fromTFHub: config3.face.detector.modelPath.includes("tfhub.dev") });
  const blazeFace = new BlazeFaceModel(model10, config3);
  if (!model10 || !model10.modelUrl)
    log("load model failed:", config3.face.detector.modelPath);
  else if (config3.debug)
    log("load model:", model10.modelUrl);
  return blazeFace;
}

// src/blazeface/facepipeline.ts
var tf4 = __toModule(require_tfjs_esm());

// src/blazeface/coords.ts
var MESH_ANNOTATIONS = {
  silhouette: [
    10,
    338,
    297,
    332,
    284,
    251,
    389,
    356,
    454,
    323,
    361,
    288,
    397,
    365,
    379,
    378,
    400,
    377,
    152,
    148,
    176,
    149,
    150,
    136,
    172,
    58,
    132,
    93,
    234,
    127,
    162,
    21,
    54,
    103,
    67,
    109
  ],
  lipsUpperOuter: [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291],
  lipsLowerOuter: [146, 91, 181, 84, 17, 314, 405, 321, 375, 291],
  lipsUpperInner: [78, 191, 80, 81, 82, 13, 312, 311, 310, 415, 308],
  lipsLowerInner: [78, 95, 88, 178, 87, 14, 317, 402, 318, 324, 308],
  rightEyeUpper0: [246, 161, 160, 159, 158, 157, 173],
  rightEyeLower0: [33, 7, 163, 144, 145, 153, 154, 155, 133],
  rightEyeUpper1: [247, 30, 29, 27, 28, 56, 190],
  rightEyeLower1: [130, 25, 110, 24, 23, 22, 26, 112, 243],
  rightEyeUpper2: [113, 225, 224, 223, 222, 221, 189],
  rightEyeLower2: [226, 31, 228, 229, 230, 231, 232, 233, 244],
  rightEyeLower3: [143, 111, 117, 118, 119, 120, 121, 128, 245],
  rightEyebrowUpper: [156, 70, 63, 105, 66, 107, 55, 193],
  rightEyebrowLower: [35, 124, 46, 53, 52, 65],
  rightEyeIris: [473, 474, 475, 476, 477],
  leftEyeUpper0: [466, 388, 387, 386, 385, 384, 398],
  leftEyeLower0: [263, 249, 390, 373, 374, 380, 381, 382, 362],
  leftEyeUpper1: [467, 260, 259, 257, 258, 286, 414],
  leftEyeLower1: [359, 255, 339, 254, 253, 252, 256, 341, 463],
  leftEyeUpper2: [342, 445, 444, 443, 442, 441, 413],
  leftEyeLower2: [446, 261, 448, 449, 450, 451, 452, 453, 464],
  leftEyeLower3: [372, 340, 346, 347, 348, 349, 350, 357, 465],
  leftEyebrowUpper: [383, 300, 293, 334, 296, 336, 285, 417],
  leftEyebrowLower: [265, 353, 276, 283, 282, 295],
  leftEyeIris: [468, 469, 470, 471, 472],
  midwayBetweenEyes: [168],
  noseTip: [1],
  noseBottom: [2],
  noseRightCorner: [98],
  noseLeftCorner: [327],
  rightCheek: [205],
  leftCheek: [425]
};
var MESH_TO_IRIS_INDICES_MAP = [
  { key: "EyeUpper0", indices: [9, 10, 11, 12, 13, 14, 15] },
  { key: "EyeUpper1", indices: [25, 26, 27, 28, 29, 30, 31] },
  { key: "EyeUpper2", indices: [41, 42, 43, 44, 45, 46, 47] },
  { key: "EyeLower0", indices: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  { key: "EyeLower1", indices: [16, 17, 18, 19, 20, 21, 22, 23, 24] },
  { key: "EyeLower2", indices: [32, 33, 34, 35, 36, 37, 38, 39, 40] },
  { key: "EyeLower3", indices: [54, 55, 56, 57, 58, 59, 60, 61, 62] }
];
var UV468 = [
  [0.499976992607117, 0.652534008026123],
  [0.500025987625122, 0.547487020492554],
  [0.499974012374878, 0.602371990680695],
  [0.482113003730774, 0.471979022026062],
  [0.500150978565216, 0.527155995368958],
  [0.499909996986389, 0.498252987861633],
  [0.499523013830185, 0.40106201171875],
  [0.289712011814117, 0.380764007568359],
  [0.499954998493195, 0.312398016452789],
  [0.499987006187439, 0.269918978214264],
  [0.500023007392883, 0.107050001621246],
  [0.500023007392883, 0.666234016418457],
  [0.5000159740448, 0.679224014282227],
  [0.500023007392883, 0.692348003387451],
  [0.499976992607117, 0.695277988910675],
  [0.499976992607117, 0.70593398809433],
  [0.499976992607117, 0.719385027885437],
  [0.499976992607117, 0.737019002437592],
  [0.499967992305756, 0.781370997428894],
  [0.499816000461578, 0.562981009483337],
  [0.473773002624512, 0.573909997940063],
  [0.104906998574734, 0.254140973091125],
  [0.365929991006851, 0.409575998783112],
  [0.338757991790771, 0.41302502155304],
  [0.311120003461838, 0.409460008144379],
  [0.274657994508743, 0.389131009578705],
  [0.393361985683441, 0.403706014156342],
  [0.345234006643295, 0.344011008739471],
  [0.370094001293182, 0.346076011657715],
  [0.319321990013123, 0.347265005111694],
  [0.297903001308441, 0.353591024875641],
  [0.24779200553894, 0.410809993743896],
  [0.396889001131058, 0.842755019664764],
  [0.280097991228104, 0.375599980354309],
  [0.106310002505779, 0.399955987930298],
  [0.2099249958992, 0.391353011131287],
  [0.355807989835739, 0.534406006336212],
  [0.471751004457474, 0.65040397644043],
  [0.474155008792877, 0.680191993713379],
  [0.439785003662109, 0.657229006290436],
  [0.414617002010345, 0.66654098033905],
  [0.450374007225037, 0.680860996246338],
  [0.428770989179611, 0.682690978050232],
  [0.374971002340317, 0.727805018424988],
  [0.486716985702515, 0.547628998756409],
  [0.485300987958908, 0.527395009994507],
  [0.257764995098114, 0.314490020275116],
  [0.401223003864288, 0.455172002315521],
  [0.429818987846375, 0.548614978790283],
  [0.421351999044418, 0.533740997314453],
  [0.276895999908447, 0.532056987285614],
  [0.483370006084442, 0.499586999416351],
  [0.33721199631691, 0.282882988452911],
  [0.296391993761063, 0.293242990970612],
  [0.169294998049736, 0.193813979625702],
  [0.447580009698868, 0.302609980106354],
  [0.392390012741089, 0.353887975215912],
  [0.354490011930466, 0.696784019470215],
  [0.067304998636246, 0.730105042457581],
  [0.442739009857178, 0.572826027870178],
  [0.457098007202148, 0.584792017936707],
  [0.381974011659622, 0.694710969924927],
  [0.392388999462128, 0.694203019142151],
  [0.277076005935669, 0.271932005882263],
  [0.422551989555359, 0.563233017921448],
  [0.385919004678726, 0.281364023685455],
  [0.383103013038635, 0.255840003490448],
  [0.331431001424789, 0.119714021682739],
  [0.229923993349075, 0.232002973556519],
  [0.364500999450684, 0.189113974571228],
  [0.229622006416321, 0.299540996551514],
  [0.173287004232407, 0.278747975826263],
  [0.472878992557526, 0.666198015213013],
  [0.446828007698059, 0.668527007102966],
  [0.422762006521225, 0.673889994621277],
  [0.445307999849319, 0.580065965652466],
  [0.388103008270264, 0.693961024284363],
  [0.403039008378983, 0.706539988517761],
  [0.403629004955292, 0.693953037261963],
  [0.460041999816895, 0.557139039039612],
  [0.431158006191254, 0.692366003990173],
  [0.452181994915009, 0.692366003990173],
  [0.475387006998062, 0.692366003990173],
  [0.465828001499176, 0.779190003871918],
  [0.472328990697861, 0.736225962638855],
  [0.473087012767792, 0.717857003211975],
  [0.473122000694275, 0.704625964164734],
  [0.473033010959625, 0.695277988910675],
  [0.427942007780075, 0.695277988910675],
  [0.426479011774063, 0.703539967536926],
  [0.423162013292313, 0.711845993995667],
  [0.4183090031147, 0.720062971115112],
  [0.390094995498657, 0.639572978019714],
  [0.013953999616206, 0.560034036636353],
  [0.499913990497589, 0.58014702796936],
  [0.413199990987778, 0.69539999961853],
  [0.409626007080078, 0.701822996139526],
  [0.468080013990402, 0.601534962654114],
  [0.422728985548019, 0.585985004901886],
  [0.463079988956451, 0.593783974647522],
  [0.37211999297142, 0.47341400384903],
  [0.334562003612518, 0.496073007583618],
  [0.411671012639999, 0.546965003013611],
  [0.242175996303558, 0.14767599105835],
  [0.290776997804642, 0.201445996761322],
  [0.327338010072708, 0.256527006626129],
  [0.399509996175766, 0.748921036720276],
  [0.441727995872498, 0.261676013469696],
  [0.429764986038208, 0.187834024429321],
  [0.412198007106781, 0.108901023864746],
  [0.288955003023148, 0.398952007293701],
  [0.218936994671822, 0.435410976409912],
  [0.41278201341629, 0.398970007896423],
  [0.257135003805161, 0.355440020561218],
  [0.427684992551804, 0.437960982322693],
  [0.448339998722076, 0.536936044692993],
  [0.178560003638268, 0.45755398273468],
  [0.247308000922203, 0.457193970680237],
  [0.286267012357712, 0.467674970626831],
  [0.332827985286713, 0.460712015628815],
  [0.368755996227264, 0.447206974029541],
  [0.398963987827301, 0.432654976844788],
  [0.476410001516342, 0.405806005001068],
  [0.189241006970406, 0.523923993110657],
  [0.228962004184723, 0.348950982093811],
  [0.490725994110107, 0.562400996685028],
  [0.404670000076294, 0.485132992267609],
  [0.019469000399113, 0.401564002037048],
  [0.426243007183075, 0.420431017875671],
  [0.396993011236191, 0.548797011375427],
  [0.266469985246658, 0.376977026462555],
  [0.439121007919312, 0.51895797252655],
  [0.032313998788595, 0.644356966018677],
  [0.419054001569748, 0.387154996395111],
  [0.462783008813858, 0.505746960639954],
  [0.238978996872902, 0.779744982719421],
  [0.198220998048782, 0.831938028335571],
  [0.107550002634525, 0.540755033493042],
  [0.183610007166862, 0.740257024765015],
  [0.134409993886948, 0.333683013916016],
  [0.385764002799988, 0.883153975009918],
  [0.490967005491257, 0.579378008842468],
  [0.382384985685349, 0.508572995662689],
  [0.174399003386497, 0.397670984268188],
  [0.318785011768341, 0.39623498916626],
  [0.343364000320435, 0.400596976280212],
  [0.396100014448166, 0.710216999053955],
  [0.187885001301765, 0.588537991046906],
  [0.430987000465393, 0.944064974784851],
  [0.318993002176285, 0.898285031318665],
  [0.266247987747192, 0.869701027870178],
  [0.500023007392883, 0.190576016902924],
  [0.499976992607117, 0.954452991485596],
  [0.366169989109039, 0.398822009563446],
  [0.393207013607025, 0.39553701877594],
  [0.410373002290726, 0.391080021858215],
  [0.194993004202843, 0.342101991176605],
  [0.388664990663528, 0.362284004688263],
  [0.365961998701096, 0.355970978736877],
  [0.343364000320435, 0.355356991291046],
  [0.318785011768341, 0.35834002494812],
  [0.301414996385574, 0.363156020641327],
  [0.058132998645306, 0.319076001644135],
  [0.301414996385574, 0.387449026107788],
  [0.499987989664078, 0.618434011936188],
  [0.415838003158569, 0.624195992946625],
  [0.445681989192963, 0.566076993942261],
  [0.465844005346298, 0.620640993118286],
  [0.49992299079895, 0.351523995399475],
  [0.288718998432159, 0.819945991039276],
  [0.335278987884521, 0.852819979190826],
  [0.440512001514435, 0.902418971061707],
  [0.128294005990028, 0.791940987110138],
  [0.408771991729736, 0.373893976211548],
  [0.455606997013092, 0.451801002025604],
  [0.499877005815506, 0.908990025520325],
  [0.375436991453171, 0.924192011356354],
  [0.11421000212431, 0.615022003650665],
  [0.448662012815475, 0.695277988910675],
  [0.4480200111866, 0.704632043838501],
  [0.447111994028091, 0.715808033943176],
  [0.444831997156143, 0.730794012546539],
  [0.430011987686157, 0.766808986663818],
  [0.406787008047104, 0.685672998428345],
  [0.400738000869751, 0.681069016456604],
  [0.392399996519089, 0.677703022956848],
  [0.367855995893478, 0.663918972015381],
  [0.247923001646996, 0.601333022117615],
  [0.452769994735718, 0.420849978923798],
  [0.43639200925827, 0.359887003898621],
  [0.416164010763168, 0.368713974952698],
  [0.413385987281799, 0.692366003990173],
  [0.228018000721931, 0.683571994304657],
  [0.468268007040024, 0.352671027183533],
  [0.411361992359161, 0.804327011108398],
  [0.499989002943039, 0.469825029373169],
  [0.479153990745544, 0.442654013633728],
  [0.499974012374878, 0.439637005329132],
  [0.432112008333206, 0.493588984012604],
  [0.499886006116867, 0.866917014122009],
  [0.49991300702095, 0.821729004383087],
  [0.456548988819122, 0.819200992584229],
  [0.344549000263214, 0.745438992977142],
  [0.37890899181366, 0.574010014533997],
  [0.374292999505997, 0.780184984207153],
  [0.319687992334366, 0.570737957954407],
  [0.357154995203018, 0.604269981384277],
  [0.295284003019333, 0.621580958366394],
  [0.447750002145767, 0.862477004528046],
  [0.410986006259918, 0.508723020553589],
  [0.31395098567009, 0.775308012962341],
  [0.354128003120422, 0.812552988529205],
  [0.324548006057739, 0.703992962837219],
  [0.189096003770828, 0.646299958229065],
  [0.279776990413666, 0.71465802192688],
  [0.1338230073452, 0.682700991630554],
  [0.336768001317978, 0.644733011722565],
  [0.429883986711502, 0.466521978378296],
  [0.455527991056442, 0.548622965812683],
  [0.437114000320435, 0.558896005153656],
  [0.467287987470627, 0.529924988746643],
  [0.414712011814117, 0.335219979286194],
  [0.37704598903656, 0.322777986526489],
  [0.344107985496521, 0.320150971412659],
  [0.312875986099243, 0.32233202457428],
  [0.283526003360748, 0.333190023899078],
  [0.241245999932289, 0.382785975933075],
  [0.102986000478268, 0.468762993812561],
  [0.267612010240555, 0.424560010433197],
  [0.297879010438919, 0.433175981044769],
  [0.333433985710144, 0.433878004550934],
  [0.366427004337311, 0.426115989685059],
  [0.396012008190155, 0.416696012020111],
  [0.420121014118195, 0.41022801399231],
  [0.007561000064015, 0.480777025222778],
  [0.432949006557465, 0.569517970085144],
  [0.458638995885849, 0.479089021682739],
  [0.473466008901596, 0.545744001865387],
  [0.476087987422943, 0.563830018043518],
  [0.468472003936768, 0.555056989192963],
  [0.433990985155106, 0.582361996173859],
  [0.483518004417419, 0.562983989715576],
  [0.482482999563217, 0.57784903049469],
  [0.42645001411438, 0.389798998832703],
  [0.438998997211456, 0.39649498462677],
  [0.450067013502121, 0.400434017181396],
  [0.289712011814117, 0.368252992630005],
  [0.276670008897781, 0.363372981548309],
  [0.517862021923065, 0.471948027610779],
  [0.710287988185883, 0.380764007568359],
  [0.526226997375488, 0.573909997940063],
  [0.895093023777008, 0.254140973091125],
  [0.634069979190826, 0.409575998783112],
  [0.661242008209229, 0.41302502155304],
  [0.688880026340485, 0.409460008144379],
  [0.725341975688934, 0.389131009578705],
  [0.606630027294159, 0.40370500087738],
  [0.654766023159027, 0.344011008739471],
  [0.629905998706818, 0.346076011657715],
  [0.680678009986877, 0.347265005111694],
  [0.702096998691559, 0.353591024875641],
  [0.75221198797226, 0.410804986953735],
  [0.602918028831482, 0.842862963676453],
  [0.719901978969574, 0.375599980354309],
  [0.893692970275879, 0.399959981441498],
  [0.790081977844238, 0.391354024410248],
  [0.643998026847839, 0.534487962722778],
  [0.528249025344849, 0.65040397644043],
  [0.525849997997284, 0.680191040039062],
  [0.560214996337891, 0.657229006290436],
  [0.585384011268616, 0.66654098033905],
  [0.549625992774963, 0.680860996246338],
  [0.57122802734375, 0.682691991329193],
  [0.624852001667023, 0.72809898853302],
  [0.513050019741058, 0.547281980514526],
  [0.51509702205658, 0.527251958847046],
  [0.742246985435486, 0.314507007598877],
  [0.598631024360657, 0.454979002475739],
  [0.570338010787964, 0.548575043678284],
  [0.578631997108459, 0.533622980117798],
  [0.723087012767792, 0.532054007053375],
  [0.516445994377136, 0.499638974666595],
  [0.662801027297974, 0.282917976379395],
  [0.70362401008606, 0.293271005153656],
  [0.830704987049103, 0.193813979625702],
  [0.552385985851288, 0.302568018436432],
  [0.607609987258911, 0.353887975215912],
  [0.645429015159607, 0.696707010269165],
  [0.932694971561432, 0.730105042457581],
  [0.557260990142822, 0.572826027870178],
  [0.542901992797852, 0.584792017936707],
  [0.6180260181427, 0.694710969924927],
  [0.607590973377228, 0.694203019142151],
  [0.722943007946014, 0.271963000297546],
  [0.577413976192474, 0.563166975975037],
  [0.614082992076874, 0.281386971473694],
  [0.616907000541687, 0.255886018276215],
  [0.668509006500244, 0.119913995265961],
  [0.770092010498047, 0.232020974159241],
  [0.635536015033722, 0.189248979091644],
  [0.77039098739624, 0.299556016921997],
  [0.826722025871277, 0.278755009174347],
  [0.527121007442474, 0.666198015213013],
  [0.553171992301941, 0.668527007102966],
  [0.577238023281097, 0.673889994621277],
  [0.554691970348358, 0.580065965652466],
  [0.611896991729736, 0.693961024284363],
  [0.59696102142334, 0.706539988517761],
  [0.596370995044708, 0.693953037261963],
  [0.539958000183105, 0.557139039039612],
  [0.568841993808746, 0.692366003990173],
  [0.547818005084991, 0.692366003990173],
  [0.52461302280426, 0.692366003990173],
  [0.534089982509613, 0.779141008853912],
  [0.527670979499817, 0.736225962638855],
  [0.526912987232208, 0.717857003211975],
  [0.526877999305725, 0.704625964164734],
  [0.526966989040375, 0.695277988910675],
  [0.572058022022247, 0.695277988910675],
  [0.573521018028259, 0.703539967536926],
  [0.57683801651001, 0.711845993995667],
  [0.581691026687622, 0.720062971115112],
  [0.609944999217987, 0.639909982681274],
  [0.986046016216278, 0.560034036636353],
  [0.5867999792099, 0.69539999961853],
  [0.590372025966644, 0.701822996139526],
  [0.531915009021759, 0.601536989212036],
  [0.577268004417419, 0.585934996604919],
  [0.536915004253387, 0.593786001205444],
  [0.627542972564697, 0.473352015018463],
  [0.665585994720459, 0.495950996875763],
  [0.588353991508484, 0.546862006187439],
  [0.757824003696442, 0.14767599105835],
  [0.709249973297119, 0.201507985591888],
  [0.672684013843536, 0.256581008434296],
  [0.600408971309662, 0.74900496006012],
  [0.55826598405838, 0.261672019958496],
  [0.570303976535797, 0.187870979309082],
  [0.588165998458862, 0.109044015407562],
  [0.711045026779175, 0.398952007293701],
  [0.781069993972778, 0.435405015945435],
  [0.587247014045715, 0.398931980133057],
  [0.742869973182678, 0.355445981025696],
  [0.572156012058258, 0.437651991844177],
  [0.55186802148819, 0.536570012569427],
  [0.821442008018494, 0.457556009292603],
  [0.752701997756958, 0.457181990146637],
  [0.71375697851181, 0.467626988887787],
  [0.66711300611496, 0.460672974586487],
  [0.631101012229919, 0.447153985500336],
  [0.6008620262146, 0.432473003864288],
  [0.523481011390686, 0.405627012252808],
  [0.810747981071472, 0.523926019668579],
  [0.771045982837677, 0.348959028720856],
  [0.509127020835876, 0.562718033790588],
  [0.595292985439301, 0.485023975372314],
  [0.980530977249146, 0.401564002037048],
  [0.573499977588654, 0.420000016689301],
  [0.602994978427887, 0.548687994480133],
  [0.733529984951019, 0.376977026462555],
  [0.560611009597778, 0.519016981124878],
  [0.967685997486115, 0.644356966018677],
  [0.580985009670258, 0.387160003185272],
  [0.537728011608124, 0.505385041236877],
  [0.760966002941132, 0.779752969741821],
  [0.801778972148895, 0.831938028335571],
  [0.892440974712372, 0.54076099395752],
  [0.816350996494293, 0.740260004997253],
  [0.865594983100891, 0.333687007427216],
  [0.614073991775513, 0.883246004581451],
  [0.508952975273132, 0.579437971115112],
  [0.617941975593567, 0.508316040039062],
  [0.825608015060425, 0.397674977779388],
  [0.681214988231659, 0.39623498916626],
  [0.656635999679565, 0.400596976280212],
  [0.603900015354156, 0.710216999053955],
  [0.81208598613739, 0.588539004325867],
  [0.56801301240921, 0.944564998149872],
  [0.681007981300354, 0.898285031318665],
  [0.733752012252808, 0.869701027870178],
  [0.633830010890961, 0.398822009563446],
  [0.606792986392975, 0.39553701877594],
  [0.589659988880157, 0.391062021255493],
  [0.805015981197357, 0.342108011245728],
  [0.611334979534149, 0.362284004688263],
  [0.634037971496582, 0.355970978736877],
  [0.656635999679565, 0.355356991291046],
  [0.681214988231659, 0.35834002494812],
  [0.698584973812103, 0.363156020641327],
  [0.941866993904114, 0.319076001644135],
  [0.698584973812103, 0.387449026107788],
  [0.584177017211914, 0.624107003211975],
  [0.554318010807037, 0.566076993942261],
  [0.534153997898102, 0.62064003944397],
  [0.711217999458313, 0.819975018501282],
  [0.664629995822906, 0.852871000766754],
  [0.559099972248077, 0.902631998062134],
  [0.871706008911133, 0.791940987110138],
  [0.591234028339386, 0.373893976211548],
  [0.544341027736664, 0.451583981513977],
  [0.624562978744507, 0.924192011356354],
  [0.88577002286911, 0.615028977394104],
  [0.551338016986847, 0.695277988910675],
  [0.551980018615723, 0.704632043838501],
  [0.552887976169586, 0.715808033943176],
  [0.555167973041534, 0.730794012546539],
  [0.569944024085999, 0.767035007476807],
  [0.593203008174896, 0.685675978660583],
  [0.599261999130249, 0.681069016456604],
  [0.607599973678589, 0.677703022956848],
  [0.631937980651855, 0.663500010967255],
  [0.752032995223999, 0.601315021514893],
  [0.547226011753082, 0.420395016670227],
  [0.563543975353241, 0.359827995300293],
  [0.583841025829315, 0.368713974952698],
  [0.586614012718201, 0.692366003990173],
  [0.771915018558502, 0.683578014373779],
  [0.531597018241882, 0.352482974529266],
  [0.588370978832245, 0.804440975189209],
  [0.52079701423645, 0.442565023899078],
  [0.567984998226166, 0.493479013442993],
  [0.543282985687256, 0.819254994392395],
  [0.655317008495331, 0.745514988899231],
  [0.621008992195129, 0.574018001556396],
  [0.625559985637665, 0.78031200170517],
  [0.680198013782501, 0.570719003677368],
  [0.64276397228241, 0.604337990283966],
  [0.704662978649139, 0.621529996395111],
  [0.552012026309967, 0.862591981887817],
  [0.589071989059448, 0.508637011051178],
  [0.685944974422455, 0.775357007980347],
  [0.645735025405884, 0.812640011310577],
  [0.675342977046967, 0.703978002071381],
  [0.810858011245728, 0.646304965019226],
  [0.72012197971344, 0.714666962623596],
  [0.866151988506317, 0.682704985141754],
  [0.663187026977539, 0.644596993923187],
  [0.570082008838654, 0.466325998306274],
  [0.544561982154846, 0.548375964164734],
  [0.562758982181549, 0.558784961700439],
  [0.531987011432648, 0.530140042304993],
  [0.585271000862122, 0.335177004337311],
  [0.622952997684479, 0.32277899980545],
  [0.655896008014679, 0.320163011550903],
  [0.687132000923157, 0.322345972061157],
  [0.716481983661652, 0.333200991153717],
  [0.758756995201111, 0.382786989212036],
  [0.897013008594513, 0.468769013881683],
  [0.732392013072968, 0.424547016620636],
  [0.70211398601532, 0.433162987232208],
  [0.66652500629425, 0.433866024017334],
  [0.633504986763, 0.426087975502014],
  [0.603875994682312, 0.416586995124817],
  [0.579657971858978, 0.409945011138916],
  [0.992439985275269, 0.480777025222778],
  [0.567192018032074, 0.569419980049133],
  [0.54136598110199, 0.478899002075195],
  [0.526564002037048, 0.546118021011353],
  [0.523913025856018, 0.563830018043518],
  [0.531529009342194, 0.555056989192963],
  [0.566035985946655, 0.582329034805298],
  [0.51631098985672, 0.563053965568542],
  [0.5174720287323, 0.577877044677734],
  [0.573594987392426, 0.389806985855103],
  [0.560697972774506, 0.395331978797913],
  [0.549755990505219, 0.399751007556915],
  [0.710287988185883, 0.368252992630005],
  [0.723330020904541, 0.363372981548309]
];
var TRI468 = [
  127,
  34,
  139,
  11,
  0,
  37,
  232,
  231,
  120,
  72,
  37,
  39,
  128,
  121,
  47,
  232,
  121,
  128,
  104,
  69,
  67,
  175,
  171,
  148,
  157,
  154,
  155,
  118,
  50,
  101,
  73,
  39,
  40,
  9,
  151,
  108,
  48,
  115,
  131,
  194,
  204,
  211,
  74,
  40,
  185,
  80,
  42,
  183,
  40,
  92,
  186,
  230,
  229,
  118,
  202,
  212,
  214,
  83,
  18,
  17,
  76,
  61,
  146,
  160,
  29,
  30,
  56,
  157,
  173,
  106,
  204,
  194,
  135,
  214,
  192,
  203,
  165,
  98,
  21,
  71,
  68,
  51,
  45,
  4,
  144,
  24,
  23,
  77,
  146,
  91,
  205,
  50,
  187,
  201,
  200,
  18,
  91,
  106,
  182,
  90,
  91,
  181,
  85,
  84,
  17,
  206,
  203,
  36,
  148,
  171,
  140,
  92,
  40,
  39,
  193,
  189,
  244,
  159,
  158,
  28,
  247,
  246,
  161,
  236,
  3,
  196,
  54,
  68,
  104,
  193,
  168,
  8,
  117,
  228,
  31,
  189,
  193,
  55,
  98,
  97,
  99,
  126,
  47,
  100,
  166,
  79,
  218,
  155,
  154,
  26,
  209,
  49,
  131,
  135,
  136,
  150,
  47,
  126,
  217,
  223,
  52,
  53,
  45,
  51,
  134,
  211,
  170,
  140,
  67,
  69,
  108,
  43,
  106,
  91,
  230,
  119,
  120,
  226,
  130,
  247,
  63,
  53,
  52,
  238,
  20,
  242,
  46,
  70,
  156,
  78,
  62,
  96,
  46,
  53,
  63,
  143,
  34,
  227,
  173,
  155,
  133,
  123,
  117,
  111,
  44,
  125,
  19,
  236,
  134,
  51,
  216,
  206,
  205,
  154,
  153,
  22,
  39,
  37,
  167,
  200,
  201,
  208,
  36,
  142,
  100,
  57,
  212,
  202,
  20,
  60,
  99,
  28,
  158,
  157,
  35,
  226,
  113,
  160,
  159,
  27,
  204,
  202,
  210,
  113,
  225,
  46,
  43,
  202,
  204,
  62,
  76,
  77,
  137,
  123,
  116,
  41,
  38,
  72,
  203,
  129,
  142,
  64,
  98,
  240,
  49,
  102,
  64,
  41,
  73,
  74,
  212,
  216,
  207,
  42,
  74,
  184,
  169,
  170,
  211,
  170,
  149,
  176,
  105,
  66,
  69,
  122,
  6,
  168,
  123,
  147,
  187,
  96,
  77,
  90,
  65,
  55,
  107,
  89,
  90,
  180,
  101,
  100,
  120,
  63,
  105,
  104,
  93,
  137,
  227,
  15,
  86,
  85,
  129,
  102,
  49,
  14,
  87,
  86,
  55,
  8,
  9,
  100,
  47,
  121,
  145,
  23,
  22,
  88,
  89,
  179,
  6,
  122,
  196,
  88,
  95,
  96,
  138,
  172,
  136,
  215,
  58,
  172,
  115,
  48,
  219,
  42,
  80,
  81,
  195,
  3,
  51,
  43,
  146,
  61,
  171,
  175,
  199,
  81,
  82,
  38,
  53,
  46,
  225,
  144,
  163,
  110,
  246,
  33,
  7,
  52,
  65,
  66,
  229,
  228,
  117,
  34,
  127,
  234,
  107,
  108,
  69,
  109,
  108,
  151,
  48,
  64,
  235,
  62,
  78,
  191,
  129,
  209,
  126,
  111,
  35,
  143,
  163,
  161,
  246,
  117,
  123,
  50,
  222,
  65,
  52,
  19,
  125,
  141,
  221,
  55,
  65,
  3,
  195,
  197,
  25,
  7,
  33,
  220,
  237,
  44,
  70,
  71,
  139,
  122,
  193,
  245,
  247,
  130,
  33,
  71,
  21,
  162,
  153,
  158,
  159,
  170,
  169,
  150,
  188,
  174,
  196,
  216,
  186,
  92,
  144,
  160,
  161,
  2,
  97,
  167,
  141,
  125,
  241,
  164,
  167,
  37,
  72,
  38,
  12,
  145,
  159,
  160,
  38,
  82,
  13,
  63,
  68,
  71,
  226,
  35,
  111,
  158,
  153,
  154,
  101,
  50,
  205,
  206,
  92,
  165,
  209,
  198,
  217,
  165,
  167,
  97,
  220,
  115,
  218,
  133,
  112,
  243,
  239,
  238,
  241,
  214,
  135,
  169,
  190,
  173,
  133,
  171,
  208,
  32,
  125,
  44,
  237,
  86,
  87,
  178,
  85,
  86,
  179,
  84,
  85,
  180,
  83,
  84,
  181,
  201,
  83,
  182,
  137,
  93,
  132,
  76,
  62,
  183,
  61,
  76,
  184,
  57,
  61,
  185,
  212,
  57,
  186,
  214,
  207,
  187,
  34,
  143,
  156,
  79,
  239,
  237,
  123,
  137,
  177,
  44,
  1,
  4,
  201,
  194,
  32,
  64,
  102,
  129,
  213,
  215,
  138,
  59,
  166,
  219,
  242,
  99,
  97,
  2,
  94,
  141,
  75,
  59,
  235,
  24,
  110,
  228,
  25,
  130,
  226,
  23,
  24,
  229,
  22,
  23,
  230,
  26,
  22,
  231,
  112,
  26,
  232,
  189,
  190,
  243,
  221,
  56,
  190,
  28,
  56,
  221,
  27,
  28,
  222,
  29,
  27,
  223,
  30,
  29,
  224,
  247,
  30,
  225,
  238,
  79,
  20,
  166,
  59,
  75,
  60,
  75,
  240,
  147,
  177,
  215,
  20,
  79,
  166,
  187,
  147,
  213,
  112,
  233,
  244,
  233,
  128,
  245,
  128,
  114,
  188,
  114,
  217,
  174,
  131,
  115,
  220,
  217,
  198,
  236,
  198,
  131,
  134,
  177,
  132,
  58,
  143,
  35,
  124,
  110,
  163,
  7,
  228,
  110,
  25,
  356,
  389,
  368,
  11,
  302,
  267,
  452,
  350,
  349,
  302,
  303,
  269,
  357,
  343,
  277,
  452,
  453,
  357,
  333,
  332,
  297,
  175,
  152,
  377,
  384,
  398,
  382,
  347,
  348,
  330,
  303,
  304,
  270,
  9,
  336,
  337,
  278,
  279,
  360,
  418,
  262,
  431,
  304,
  408,
  409,
  310,
  415,
  407,
  270,
  409,
  410,
  450,
  348,
  347,
  422,
  430,
  434,
  313,
  314,
  17,
  306,
  307,
  375,
  387,
  388,
  260,
  286,
  414,
  398,
  335,
  406,
  418,
  364,
  367,
  416,
  423,
  358,
  327,
  251,
  284,
  298,
  281,
  5,
  4,
  373,
  374,
  253,
  307,
  320,
  321,
  425,
  427,
  411,
  421,
  313,
  18,
  321,
  405,
  406,
  320,
  404,
  405,
  315,
  16,
  17,
  426,
  425,
  266,
  377,
  400,
  369,
  322,
  391,
  269,
  417,
  465,
  464,
  386,
  257,
  258,
  466,
  260,
  388,
  456,
  399,
  419,
  284,
  332,
  333,
  417,
  285,
  8,
  346,
  340,
  261,
  413,
  441,
  285,
  327,
  460,
  328,
  355,
  371,
  329,
  392,
  439,
  438,
  382,
  341,
  256,
  429,
  420,
  360,
  364,
  394,
  379,
  277,
  343,
  437,
  443,
  444,
  283,
  275,
  440,
  363,
  431,
  262,
  369,
  297,
  338,
  337,
  273,
  375,
  321,
  450,
  451,
  349,
  446,
  342,
  467,
  293,
  334,
  282,
  458,
  461,
  462,
  276,
  353,
  383,
  308,
  324,
  325,
  276,
  300,
  293,
  372,
  345,
  447,
  382,
  398,
  362,
  352,
  345,
  340,
  274,
  1,
  19,
  456,
  248,
  281,
  436,
  427,
  425,
  381,
  256,
  252,
  269,
  391,
  393,
  200,
  199,
  428,
  266,
  330,
  329,
  287,
  273,
  422,
  250,
  462,
  328,
  258,
  286,
  384,
  265,
  353,
  342,
  387,
  259,
  257,
  424,
  431,
  430,
  342,
  353,
  276,
  273,
  335,
  424,
  292,
  325,
  307,
  366,
  447,
  345,
  271,
  303,
  302,
  423,
  266,
  371,
  294,
  455,
  460,
  279,
  278,
  294,
  271,
  272,
  304,
  432,
  434,
  427,
  272,
  407,
  408,
  394,
  430,
  431,
  395,
  369,
  400,
  334,
  333,
  299,
  351,
  417,
  168,
  352,
  280,
  411,
  325,
  319,
  320,
  295,
  296,
  336,
  319,
  403,
  404,
  330,
  348,
  349,
  293,
  298,
  333,
  323,
  454,
  447,
  15,
  16,
  315,
  358,
  429,
  279,
  14,
  15,
  316,
  285,
  336,
  9,
  329,
  349,
  350,
  374,
  380,
  252,
  318,
  402,
  403,
  6,
  197,
  419,
  318,
  319,
  325,
  367,
  364,
  365,
  435,
  367,
  397,
  344,
  438,
  439,
  272,
  271,
  311,
  195,
  5,
  281,
  273,
  287,
  291,
  396,
  428,
  199,
  311,
  271,
  268,
  283,
  444,
  445,
  373,
  254,
  339,
  263,
  466,
  249,
  282,
  334,
  296,
  449,
  347,
  346,
  264,
  447,
  454,
  336,
  296,
  299,
  338,
  10,
  151,
  278,
  439,
  455,
  292,
  407,
  415,
  358,
  371,
  355,
  340,
  345,
  372,
  390,
  249,
  466,
  346,
  347,
  280,
  442,
  443,
  282,
  19,
  94,
  370,
  441,
  442,
  295,
  248,
  419,
  197,
  263,
  255,
  359,
  440,
  275,
  274,
  300,
  383,
  368,
  351,
  412,
  465,
  263,
  467,
  466,
  301,
  368,
  389,
  380,
  374,
  386,
  395,
  378,
  379,
  412,
  351,
  419,
  436,
  426,
  322,
  373,
  390,
  388,
  2,
  164,
  393,
  370,
  462,
  461,
  164,
  0,
  267,
  302,
  11,
  12,
  374,
  373,
  387,
  268,
  12,
  13,
  293,
  300,
  301,
  446,
  261,
  340,
  385,
  384,
  381,
  330,
  266,
  425,
  426,
  423,
  391,
  429,
  355,
  437,
  391,
  327,
  326,
  440,
  457,
  438,
  341,
  382,
  362,
  459,
  457,
  461,
  434,
  430,
  394,
  414,
  463,
  362,
  396,
  369,
  262,
  354,
  461,
  457,
  316,
  403,
  402,
  315,
  404,
  403,
  314,
  405,
  404,
  313,
  406,
  405,
  421,
  418,
  406,
  366,
  401,
  361,
  306,
  408,
  407,
  291,
  409,
  408,
  287,
  410,
  409,
  432,
  436,
  410,
  434,
  416,
  411,
  264,
  368,
  383,
  309,
  438,
  457,
  352,
  376,
  401,
  274,
  275,
  4,
  421,
  428,
  262,
  294,
  327,
  358,
  433,
  416,
  367,
  289,
  455,
  439,
  462,
  370,
  326,
  2,
  326,
  370,
  305,
  460,
  455,
  254,
  449,
  448,
  255,
  261,
  446,
  253,
  450,
  449,
  252,
  451,
  450,
  256,
  452,
  451,
  341,
  453,
  452,
  413,
  464,
  463,
  441,
  413,
  414,
  258,
  442,
  441,
  257,
  443,
  442,
  259,
  444,
  443,
  260,
  445,
  444,
  467,
  342,
  445,
  459,
  458,
  250,
  289,
  392,
  290,
  290,
  328,
  460,
  376,
  433,
  435,
  250,
  290,
  392,
  411,
  416,
  433,
  341,
  463,
  464,
  453,
  464,
  465,
  357,
  465,
  412,
  343,
  412,
  399,
  360,
  363,
  440,
  437,
  399,
  456,
  420,
  456,
  363,
  401,
  435,
  288,
  372,
  383,
  353,
  339,
  255,
  249,
  448,
  261,
  255,
  133,
  243,
  190,
  133,
  155,
  112,
  33,
  246,
  247,
  33,
  130,
  25,
  398,
  384,
  286,
  362,
  398,
  414,
  362,
  463,
  341,
  263,
  359,
  467,
  263,
  249,
  255,
  466,
  467,
  260,
  75,
  60,
  166,
  238,
  239,
  79,
  162,
  127,
  139,
  72,
  11,
  37,
  121,
  232,
  120,
  73,
  72,
  39,
  114,
  128,
  47,
  233,
  232,
  128,
  103,
  104,
  67,
  152,
  175,
  148,
  173,
  157,
  155,
  119,
  118,
  101,
  74,
  73,
  40,
  107,
  9,
  108,
  49,
  48,
  131,
  32,
  194,
  211,
  184,
  74,
  185,
  191,
  80,
  183,
  185,
  40,
  186,
  119,
  230,
  118,
  210,
  202,
  214,
  84,
  83,
  17,
  77,
  76,
  146,
  161,
  160,
  30,
  190,
  56,
  173,
  182,
  106,
  194,
  138,
  135,
  192,
  129,
  203,
  98,
  54,
  21,
  68,
  5,
  51,
  4,
  145,
  144,
  23,
  90,
  77,
  91,
  207,
  205,
  187,
  83,
  201,
  18,
  181,
  91,
  182,
  180,
  90,
  181,
  16,
  85,
  17,
  205,
  206,
  36,
  176,
  148,
  140,
  165,
  92,
  39,
  245,
  193,
  244,
  27,
  159,
  28,
  30,
  247,
  161,
  174,
  236,
  196,
  103,
  54,
  104,
  55,
  193,
  8,
  111,
  117,
  31,
  221,
  189,
  55,
  240,
  98,
  99,
  142,
  126,
  100,
  219,
  166,
  218,
  112,
  155,
  26,
  198,
  209,
  131,
  169,
  135,
  150,
  114,
  47,
  217,
  224,
  223,
  53,
  220,
  45,
  134,
  32,
  211,
  140,
  109,
  67,
  108,
  146,
  43,
  91,
  231,
  230,
  120,
  113,
  226,
  247,
  105,
  63,
  52,
  241,
  238,
  242,
  124,
  46,
  156,
  95,
  78,
  96,
  70,
  46,
  63,
  116,
  143,
  227,
  116,
  123,
  111,
  1,
  44,
  19,
  3,
  236,
  51,
  207,
  216,
  205,
  26,
  154,
  22,
  165,
  39,
  167,
  199,
  200,
  208,
  101,
  36,
  100,
  43,
  57,
  202,
  242,
  20,
  99,
  56,
  28,
  157,
  124,
  35,
  113,
  29,
  160,
  27,
  211,
  204,
  210,
  124,
  113,
  46,
  106,
  43,
  204,
  96,
  62,
  77,
  227,
  137,
  116,
  73,
  41,
  72,
  36,
  203,
  142,
  235,
  64,
  240,
  48,
  49,
  64,
  42,
  41,
  74,
  214,
  212,
  207,
  183,
  42,
  184,
  210,
  169,
  211,
  140,
  170,
  176,
  104,
  105,
  69,
  193,
  122,
  168,
  50,
  123,
  187,
  89,
  96,
  90,
  66,
  65,
  107,
  179,
  89,
  180,
  119,
  101,
  120,
  68,
  63,
  104,
  234,
  93,
  227,
  16,
  15,
  85,
  209,
  129,
  49,
  15,
  14,
  86,
  107,
  55,
  9,
  120,
  100,
  121,
  153,
  145,
  22,
  178,
  88,
  179,
  197,
  6,
  196,
  89,
  88,
  96,
  135,
  138,
  136,
  138,
  215,
  172,
  218,
  115,
  219,
  41,
  42,
  81,
  5,
  195,
  51,
  57,
  43,
  61,
  208,
  171,
  199,
  41,
  81,
  38,
  224,
  53,
  225,
  24,
  144,
  110,
  105,
  52,
  66,
  118,
  229,
  117,
  227,
  34,
  234,
  66,
  107,
  69,
  10,
  109,
  151,
  219,
  48,
  235,
  183,
  62,
  191,
  142,
  129,
  126,
  116,
  111,
  143,
  7,
  163,
  246,
  118,
  117,
  50,
  223,
  222,
  52,
  94,
  19,
  141,
  222,
  221,
  65,
  196,
  3,
  197,
  45,
  220,
  44,
  156,
  70,
  139,
  188,
  122,
  245,
  139,
  71,
  162,
  145,
  153,
  159,
  149,
  170,
  150,
  122,
  188,
  196,
  206,
  216,
  92,
  163,
  144,
  161,
  164,
  2,
  167,
  242,
  141,
  241,
  0,
  164,
  37,
  11,
  72,
  12,
  144,
  145,
  160,
  12,
  38,
  13,
  70,
  63,
  71,
  31,
  226,
  111,
  157,
  158,
  154,
  36,
  101,
  205,
  203,
  206,
  165,
  126,
  209,
  217,
  98,
  165,
  97,
  237,
  220,
  218,
  237,
  239,
  241,
  210,
  214,
  169,
  140,
  171,
  32,
  241,
  125,
  237,
  179,
  86,
  178,
  180,
  85,
  179,
  181,
  84,
  180,
  182,
  83,
  181,
  194,
  201,
  182,
  177,
  137,
  132,
  184,
  76,
  183,
  185,
  61,
  184,
  186,
  57,
  185,
  216,
  212,
  186,
  192,
  214,
  187,
  139,
  34,
  156,
  218,
  79,
  237,
  147,
  123,
  177,
  45,
  44,
  4,
  208,
  201,
  32,
  98,
  64,
  129,
  192,
  213,
  138,
  235,
  59,
  219,
  141,
  242,
  97,
  97,
  2,
  141,
  240,
  75,
  235,
  229,
  24,
  228,
  31,
  25,
  226,
  230,
  23,
  229,
  231,
  22,
  230,
  232,
  26,
  231,
  233,
  112,
  232,
  244,
  189,
  243,
  189,
  221,
  190,
  222,
  28,
  221,
  223,
  27,
  222,
  224,
  29,
  223,
  225,
  30,
  224,
  113,
  247,
  225,
  99,
  60,
  240,
  213,
  147,
  215,
  60,
  20,
  166,
  192,
  187,
  213,
  243,
  112,
  244,
  244,
  233,
  245,
  245,
  128,
  188,
  188,
  114,
  174,
  134,
  131,
  220,
  174,
  217,
  236,
  236,
  198,
  134,
  215,
  177,
  58,
  156,
  143,
  124,
  25,
  110,
  7,
  31,
  228,
  25,
  264,
  356,
  368,
  0,
  11,
  267,
  451,
  452,
  349,
  267,
  302,
  269,
  350,
  357,
  277,
  350,
  452,
  357,
  299,
  333,
  297,
  396,
  175,
  377,
  381,
  384,
  382,
  280,
  347,
  330,
  269,
  303,
  270,
  151,
  9,
  337,
  344,
  278,
  360,
  424,
  418,
  431,
  270,
  304,
  409,
  272,
  310,
  407,
  322,
  270,
  410,
  449,
  450,
  347,
  432,
  422,
  434,
  18,
  313,
  17,
  291,
  306,
  375,
  259,
  387,
  260,
  424,
  335,
  418,
  434,
  364,
  416,
  391,
  423,
  327,
  301,
  251,
  298,
  275,
  281,
  4,
  254,
  373,
  253,
  375,
  307,
  321,
  280,
  425,
  411,
  200,
  421,
  18,
  335,
  321,
  406,
  321,
  320,
  405,
  314,
  315,
  17,
  423,
  426,
  266,
  396,
  377,
  369,
  270,
  322,
  269,
  413,
  417,
  464,
  385,
  386,
  258,
  248,
  456,
  419,
  298,
  284,
  333,
  168,
  417,
  8,
  448,
  346,
  261,
  417,
  413,
  285,
  326,
  327,
  328,
  277,
  355,
  329,
  309,
  392,
  438,
  381,
  382,
  256,
  279,
  429,
  360,
  365,
  364,
  379,
  355,
  277,
  437,
  282,
  443,
  283,
  281,
  275,
  363,
  395,
  431,
  369,
  299,
  297,
  337,
  335,
  273,
  321,
  348,
  450,
  349,
  359,
  446,
  467,
  283,
  293,
  282,
  250,
  458,
  462,
  300,
  276,
  383,
  292,
  308,
  325,
  283,
  276,
  293,
  264,
  372,
  447,
  346,
  352,
  340,
  354,
  274,
  19,
  363,
  456,
  281,
  426,
  436,
  425,
  380,
  381,
  252,
  267,
  269,
  393,
  421,
  200,
  428,
  371,
  266,
  329,
  432,
  287,
  422,
  290,
  250,
  328,
  385,
  258,
  384,
  446,
  265,
  342,
  386,
  387,
  257,
  422,
  424,
  430,
  445,
  342,
  276,
  422,
  273,
  424,
  306,
  292,
  307,
  352,
  366,
  345,
  268,
  271,
  302,
  358,
  423,
  371,
  327,
  294,
  460,
  331,
  279,
  294,
  303,
  271,
  304,
  436,
  432,
  427,
  304,
  272,
  408,
  395,
  394,
  431,
  378,
  395,
  400,
  296,
  334,
  299,
  6,
  351,
  168,
  376,
  352,
  411,
  307,
  325,
  320,
  285,
  295,
  336,
  320,
  319,
  404,
  329,
  330,
  349,
  334,
  293,
  333,
  366,
  323,
  447,
  316,
  15,
  315,
  331,
  358,
  279,
  317,
  14,
  316,
  8,
  285,
  9,
  277,
  329,
  350,
  253,
  374,
  252,
  319,
  318,
  403,
  351,
  6,
  419,
  324,
  318,
  325,
  397,
  367,
  365,
  288,
  435,
  397,
  278,
  344,
  439,
  310,
  272,
  311,
  248,
  195,
  281,
  375,
  273,
  291,
  175,
  396,
  199,
  312,
  311,
  268,
  276,
  283,
  445,
  390,
  373,
  339,
  295,
  282,
  296,
  448,
  449,
  346,
  356,
  264,
  454,
  337,
  336,
  299,
  337,
  338,
  151,
  294,
  278,
  455,
  308,
  292,
  415,
  429,
  358,
  355,
  265,
  340,
  372,
  388,
  390,
  466,
  352,
  346,
  280,
  295,
  442,
  282,
  354,
  19,
  370,
  285,
  441,
  295,
  195,
  248,
  197,
  457,
  440,
  274,
  301,
  300,
  368,
  417,
  351,
  465,
  251,
  301,
  389,
  385,
  380,
  386,
  394,
  395,
  379,
  399,
  412,
  419,
  410,
  436,
  322,
  387,
  373,
  388,
  326,
  2,
  393,
  354,
  370,
  461,
  393,
  164,
  267,
  268,
  302,
  12,
  386,
  374,
  387,
  312,
  268,
  13,
  298,
  293,
  301,
  265,
  446,
  340,
  380,
  385,
  381,
  280,
  330,
  425,
  322,
  426,
  391,
  420,
  429,
  437,
  393,
  391,
  326,
  344,
  440,
  438,
  458,
  459,
  461,
  364,
  434,
  394,
  428,
  396,
  262,
  274,
  354,
  457,
  317,
  316,
  402,
  316,
  315,
  403,
  315,
  314,
  404,
  314,
  313,
  405,
  313,
  421,
  406,
  323,
  366,
  361,
  292,
  306,
  407,
  306,
  291,
  408,
  291,
  287,
  409,
  287,
  432,
  410,
  427,
  434,
  411,
  372,
  264,
  383,
  459,
  309,
  457,
  366,
  352,
  401,
  1,
  274,
  4,
  418,
  421,
  262,
  331,
  294,
  358,
  435,
  433,
  367,
  392,
  289,
  439,
  328,
  462,
  326,
  94,
  2,
  370,
  289,
  305,
  455,
  339,
  254,
  448,
  359,
  255,
  446,
  254,
  253,
  449,
  253,
  252,
  450,
  252,
  256,
  451,
  256,
  341,
  452,
  414,
  413,
  463,
  286,
  441,
  414,
  286,
  258,
  441,
  258,
  257,
  442,
  257,
  259,
  443,
  259,
  260,
  444,
  260,
  467,
  445,
  309,
  459,
  250,
  305,
  289,
  290,
  305,
  290,
  460,
  401,
  376,
  435,
  309,
  250,
  392,
  376,
  411,
  433,
  453,
  341,
  464,
  357,
  453,
  465,
  343,
  357,
  412,
  437,
  343,
  399,
  344,
  360,
  440,
  420,
  437,
  456,
  360,
  420,
  363,
  361,
  401,
  288,
  265,
  372,
  353,
  390,
  339,
  249,
  339,
  448,
  255
];
var VTX68 = [
  127,
  234,
  132,
  58,
  172,
  150,
  149,
  148,
  152,
  377,
  378,
  379,
  397,
  288,
  361,
  454,
  356,
  70,
  63,
  105,
  66,
  107,
  336,
  296,
  334,
  293,
  300,
  168,
  6,
  195,
  4,
  98,
  97,
  2,
  326,
  327,
  33,
  160,
  158,
  133,
  153,
  144,
  362,
  385,
  387,
  263,
  373,
  380,
  57,
  40,
  37,
  0,
  267,
  270,
  287,
  321,
  314,
  17,
  84,
  91,
  78,
  81,
  13,
  311,
  308,
  402,
  14,
  178
];
var VTX33 = [33, 133, 362, 263, 1, 62, 308, 159, 145, 386, 374, 6, 102, 331, 2, 13, 14, 70, 105, 107, 336, 334, 300, 54, 10, 284, 50, 280, 234, 454, 58, 288, 152];
var VTX7 = [33, 133, 362, 263, 1, 78, 308];
var UV68 = VTX68.map((x) => UV468[x]);
var UV33 = VTX33.map((x) => UV468[x]);
var UV7 = VTX7.map((x) => UV468[x]);

// src/blazeface/facepipeline.ts
var leftOutline = MESH_ANNOTATIONS["leftEyeLower0"];
var rightOutline = MESH_ANNOTATIONS["rightEyeLower0"];
var eyeLandmarks = {
  leftBounds: [leftOutline[0], leftOutline[leftOutline.length - 1]],
  rightBounds: [rightOutline[0], rightOutline[rightOutline.length - 1]]
};
var meshLandmarks = {
  count: 468,
  mouth: 13,
  symmetryLine: [13, MESH_ANNOTATIONS["midwayBetweenEyes"][0]]
};
var blazeFaceLandmarks = {
  leftEye: 0,
  rightEye: 1,
  nose: 2,
  mouth: 3,
  leftEar: 4,
  rightEar: 5,
  symmetryLine: [3, 2]
};
var irisLandmarks = {
  upperCenter: 3,
  lowerCenter: 4,
  index: 71,
  numCoordinates: 76
};
function replaceRawCoordinates(rawCoords, newCoords, prefix, keys) {
  for (let i = 0; i < MESH_TO_IRIS_INDICES_MAP.length; i++) {
    const { key, indices } = MESH_TO_IRIS_INDICES_MAP[i];
    const originalIndices = MESH_ANNOTATIONS[`${prefix}${key}`];
    if (!keys || keys.includes(key)) {
      for (let j = 0; j < indices.length; j++) {
        const index = indices[j];
        rawCoords[originalIndices[j]] = [
          newCoords[index][0],
          newCoords[index][1],
          (newCoords[index][2] + rawCoords[originalIndices[j]][2]) / 2
        ];
      }
    }
  }
}
var Pipeline = class {
  constructor(boundingBoxDetector, meshDetector, irisModel) {
    var _a, _b;
    this.storedBoxes = [];
    this.boundingBoxDetector = boundingBoxDetector;
    this.meshDetector = meshDetector;
    this.irisModel = irisModel;
    this.boxSize = ((_a = boundingBoxDetector == null ? void 0 : boundingBoxDetector.model) == null ? void 0 : _a.inputs[0].shape[2]) || 0;
    this.meshSize = (meshDetector == null ? void 0 : meshDetector.inputs[0].shape[2]) || ((_b = boundingBoxDetector == null ? void 0 : boundingBoxDetector.model) == null ? void 0 : _b.inputs[0].shape[2]);
    this.irisSize = (irisModel == null ? void 0 : irisModel.inputs[0].shape[1]) || 0;
    this.irisEnlarge = 2.3;
    this.skipped = 0;
    this.detectedFaces = 0;
  }
  transformRawCoords(rawCoords, box6, angle, rotationMatrix) {
    const boxSize = getBoxSize({ startPoint: box6.startPoint, endPoint: box6.endPoint });
    const coordsScaled = rawCoords.map((coord) => [
      boxSize[0] / this.meshSize * (coord[0] - this.meshSize / 2),
      boxSize[1] / this.meshSize * (coord[1] - this.meshSize / 2),
      coord[2]
    ]);
    const coordsRotationMatrix = angle !== 0 ? buildRotationMatrix(angle, [0, 0]) : IDENTITY_MATRIX;
    const coordsRotated = angle !== 0 ? coordsScaled.map((coord) => [...rotatePoint(coord, coordsRotationMatrix), coord[2]]) : coordsScaled;
    const inverseRotationMatrix = angle !== 0 ? invertTransformMatrix(rotationMatrix) : IDENTITY_MATRIX;
    const boxCenter = [...getBoxCenter({ startPoint: box6.startPoint, endPoint: box6.endPoint }), 1];
    return coordsRotated.map((coord) => [
      Math.round(coord[0] + dot(boxCenter, inverseRotationMatrix[0])),
      Math.round(coord[1] + dot(boxCenter, inverseRotationMatrix[1])),
      Math.round(coord[2])
    ]);
  }
  getLeftToRightEyeDepthDifference(rawCoords) {
    const leftEyeZ = rawCoords[eyeLandmarks.leftBounds[0]][2];
    const rightEyeZ = rawCoords[eyeLandmarks.rightBounds[0]][2];
    return leftEyeZ - rightEyeZ;
  }
  getEyeBox(rawCoords, face5, eyeInnerCornerIndex, eyeOuterCornerIndex, flip = false) {
    const box6 = squarifyBox(enlargeBox(calculateLandmarksBoundingBox([rawCoords[eyeInnerCornerIndex], rawCoords[eyeOuterCornerIndex]]), this.irisEnlarge));
    const boxSize = getBoxSize(box6);
    let crop = tf4.image.cropAndResize(face5, [[
      box6.startPoint[1] / this.meshSize,
      box6.startPoint[0] / this.meshSize,
      box6.endPoint[1] / this.meshSize,
      box6.endPoint[0] / this.meshSize
    ]], [0], [this.irisSize, this.irisSize]);
    if (flip && tf4.ENV.flags.IS_BROWSER) {
      crop = tf4.image.flipLeftRight(crop);
    }
    return { box: box6, boxSize, crop };
  }
  getEyeCoords(eyeData, eyeBox, eyeBoxSize, flip = false) {
    const eyeRawCoords = [];
    for (let i = 0; i < irisLandmarks.numCoordinates; i++) {
      const x = eyeData[i * 3];
      const y = eyeData[i * 3 + 1];
      const z = eyeData[i * 3 + 2];
      eyeRawCoords.push([
        (flip ? 1 - x / this.irisSize : x / this.irisSize) * eyeBoxSize[0] + eyeBox.startPoint[0],
        y / this.irisSize * eyeBoxSize[1] + eyeBox.startPoint[1],
        z
      ]);
    }
    return { rawCoords: eyeRawCoords, iris: eyeRawCoords.slice(irisLandmarks.index) };
  }
  getAdjustedIrisCoords(rawCoords, irisCoords, direction) {
    const upperCenterZ = rawCoords[MESH_ANNOTATIONS[`${direction}EyeUpper0`][irisLandmarks.upperCenter]][2];
    const lowerCenterZ = rawCoords[MESH_ANNOTATIONS[`${direction}EyeLower0`][irisLandmarks.lowerCenter]][2];
    const averageZ = (upperCenterZ + lowerCenterZ) / 2;
    return irisCoords.map((coord, i) => {
      let z = averageZ;
      if (i === 2) {
        z = upperCenterZ;
      } else if (i === 4) {
        z = lowerCenterZ;
      }
      return [coord[0], coord[1], z];
    });
  }
  async predict(input, config3) {
    let useFreshBox = false;
    let detector;
    if (this.skipped === 0 || this.skipped > config3.face.detector.skipFrames || !config3.face.mesh.enabled || !config3.skipFrame) {
      detector = await this.boundingBoxDetector.getBoundingBoxes(input);
      this.skipped = 0;
    }
    if (config3.skipFrame)
      this.skipped++;
    if (!config3.skipFrame || detector && detector.boxes && (!config3.face.mesh.enabled || detector.boxes.length !== this.detectedFaces && this.detectedFaces !== config3.face.detector.maxDetected)) {
      this.storedBoxes = [];
      this.detectedFaces = 0;
      for (const possible of detector.boxes) {
        this.storedBoxes.push({ startPoint: possible.box.startPoint.dataSync(), endPoint: possible.box.endPoint.dataSync(), landmarks: possible.landmarks.arraySync(), confidence: possible.confidence });
      }
      if (this.storedBoxes.length > 0)
        useFreshBox = true;
    }
    if (useFreshBox) {
      if (!detector || !detector.boxes || detector.boxes.length === 0) {
        this.storedBoxes = [];
        this.detectedFaces = 0;
        return null;
      }
      for (let i = 0; i < this.storedBoxes.length; i++) {
        const scaledBox = scaleBoxCoordinates({ startPoint: this.storedBoxes[i].startPoint, endPoint: this.storedBoxes[i].endPoint }, detector.scaleFactor);
        const enlargedBox = enlargeBox(scaledBox);
        const squarifiedBox = squarifyBox(enlargedBox);
        const landmarks = this.storedBoxes[i].landmarks;
        const confidence = this.storedBoxes[i].confidence;
        this.storedBoxes[i] = { ...squarifiedBox, confidence, landmarks };
      }
    }
    if (detector && detector.boxes) {
      detector.boxes.forEach((prediction) => {
        prediction.box.startPoint.dispose();
        prediction.box.endPoint.dispose();
        prediction.landmarks.dispose();
      });
    }
    const results = tf4.tidy(() => this.storedBoxes.map((box6, i) => {
      let face5;
      let angle = 0;
      let rotationMatrix;
      if (config3.face.detector.rotation && config3.face.mesh.enabled && tf4.ENV.flags.IS_BROWSER) {
        const [indexOfMouth, indexOfForehead] = box6.landmarks.length >= meshLandmarks.count ? meshLandmarks.symmetryLine : blazeFaceLandmarks.symmetryLine;
        angle = computeRotation(box6.landmarks[indexOfMouth], box6.landmarks[indexOfForehead]);
        const faceCenter = getBoxCenter({ startPoint: box6.startPoint, endPoint: box6.endPoint });
        const faceCenterNormalized = [faceCenter[0] / input.shape[2], faceCenter[1] / input.shape[1]];
        const rotatedImage = tf4.image.rotateWithOffset(input, angle, 0, faceCenterNormalized);
        rotationMatrix = buildRotationMatrix(-angle, faceCenter);
        if (config3.face.mesh.enabled)
          face5 = cutBoxFromImageAndResize({ startPoint: box6.startPoint, endPoint: box6.endPoint }, rotatedImage, [this.meshSize, this.meshSize]).div(255);
        else
          face5 = cutBoxFromImageAndResize({ startPoint: box6.startPoint, endPoint: box6.endPoint }, rotatedImage, [this.boxSize, this.boxSize]).div(255);
      } else {
        rotationMatrix = IDENTITY_MATRIX;
        const clonedImage = input.clone();
        if (config3.face.mesh.enabled)
          face5 = cutBoxFromImageAndResize({ startPoint: box6.startPoint, endPoint: box6.endPoint }, clonedImage, [this.meshSize, this.meshSize]).div(255);
        else
          face5 = cutBoxFromImageAndResize({ startPoint: box6.startPoint, endPoint: box6.endPoint }, clonedImage, [this.boxSize, this.boxSize]).div(255);
      }
      if (!config3.face.mesh.enabled) {
        const prediction2 = {
          mesh: [],
          box: box6,
          faceConfidence: null,
          boxConfidence: box6.confidence,
          confidence: box6.confidence,
          image: face5
        };
        return prediction2;
      }
      const [, confidence, contourCoords] = this.meshDetector.execute(face5);
      const faceConfidence = confidence.dataSync()[0];
      if (faceConfidence < config3.face.detector.minConfidence) {
        this.storedBoxes[i].confidence = faceConfidence;
        return null;
      }
      const coordsReshaped = tf4.reshape(contourCoords, [-1, 3]);
      let rawCoords = coordsReshaped.arraySync();
      if (config3.face.iris.enabled) {
        const { box: leftEyeBox, boxSize: leftEyeBoxSize, crop: leftEyeCrop } = this.getEyeBox(rawCoords, face5, eyeLandmarks.leftBounds[0], eyeLandmarks.leftBounds[1], true);
        const { box: rightEyeBox, boxSize: rightEyeBoxSize, crop: rightEyeCrop } = this.getEyeBox(rawCoords, face5, eyeLandmarks.rightBounds[0], eyeLandmarks.rightBounds[1]);
        const eyePredictions = this.irisModel.predict(tf4.concat([leftEyeCrop, rightEyeCrop]));
        const eyePredictionsData = eyePredictions.dataSync();
        const leftEyeData = eyePredictionsData.slice(0, irisLandmarks.numCoordinates * 3);
        const { rawCoords: leftEyeRawCoords, iris: leftIrisRawCoords } = this.getEyeCoords(leftEyeData, leftEyeBox, leftEyeBoxSize, true);
        const rightEyeData = eyePredictionsData.slice(irisLandmarks.numCoordinates * 3);
        const { rawCoords: rightEyeRawCoords, iris: rightIrisRawCoords } = this.getEyeCoords(rightEyeData, rightEyeBox, rightEyeBoxSize);
        const leftToRightEyeDepthDifference = this.getLeftToRightEyeDepthDifference(rawCoords);
        if (Math.abs(leftToRightEyeDepthDifference) < 30) {
          replaceRawCoordinates(rawCoords, leftEyeRawCoords, "left", null);
          replaceRawCoordinates(rawCoords, rightEyeRawCoords, "right", null);
        } else if (leftToRightEyeDepthDifference < 1) {
          replaceRawCoordinates(rawCoords, leftEyeRawCoords, "left", ["EyeUpper0", "EyeLower0"]);
        } else {
          replaceRawCoordinates(rawCoords, rightEyeRawCoords, "right", ["EyeUpper0", "EyeLower0"]);
        }
        const adjustedLeftIrisCoords = this.getAdjustedIrisCoords(rawCoords, leftIrisRawCoords, "left");
        const adjustedRightIrisCoords = this.getAdjustedIrisCoords(rawCoords, rightIrisRawCoords, "right");
        rawCoords = rawCoords.concat(adjustedLeftIrisCoords).concat(adjustedRightIrisCoords);
      }
      const mesh = this.transformRawCoords(rawCoords, box6, angle, rotationMatrix);
      const storeConfidence = box6.confidence;
      box6 = enlargeBox(calculateLandmarksBoundingBox(mesh), 1.5);
      box6.confidence = storeConfidence;
      if (config3.face.detector.rotation && config3.face.mesh.enabled && config3.face.description.enabled && tf4.ENV.flags.IS_BROWSER) {
        const [indexOfMouth, indexOfForehead] = box6.landmarks.length >= meshLandmarks.count ? meshLandmarks.symmetryLine : blazeFaceLandmarks.symmetryLine;
        angle = computeRotation(box6.landmarks[indexOfMouth], box6.landmarks[indexOfForehead]);
        const faceCenter = getBoxCenter({ startPoint: box6.startPoint, endPoint: box6.endPoint });
        const faceCenterNormalized = [faceCenter[0] / input.shape[2], faceCenter[1] / input.shape[1]];
        const rotatedImage = tf4.image.rotateWithOffset(input.toFloat(), angle, 0, faceCenterNormalized);
        rotationMatrix = buildRotationMatrix(-angle, faceCenter);
        face5 = cutBoxFromImageAndResize({ startPoint: box6.startPoint, endPoint: box6.endPoint }, rotatedImage, [this.meshSize, this.meshSize]).div(255);
      }
      const prediction = {
        mesh,
        box: box6,
        faceConfidence,
        boxConfidence: box6.confidence,
        image: face5
      };
      this.storedBoxes[i] = { ...squarifyBox(box6), confidence: box6.confidence, faceConfidence };
      return prediction;
    }));
    if (config3.face.mesh.enabled)
      this.storedBoxes = this.storedBoxes.filter((a) => a.confidence > config3.face.detector.minConfidence);
    this.detectedFaces = results.length;
    return results;
  }
};

// src/blazeface/facemesh.ts
var faceModels = [null, null, null];
var facePipeline;
async function predict(input, config3) {
  const predictions = await facePipeline.predict(input, config3);
  const results = [];
  let id = 0;
  for (const prediction of predictions || []) {
    if (!prediction || prediction.isDisposedInternal)
      continue;
    const meshRaw = prediction.mesh.map((pt) => [
      pt[0] / (input.shape[2] || 0),
      pt[1] / (input.shape[1] || 0),
      pt[2] / facePipeline.meshSize
    ]);
    const annotations3 = {};
    if (prediction.mesh && prediction.mesh.length > 0) {
      for (const key of Object.keys(MESH_ANNOTATIONS))
        annotations3[key] = MESH_ANNOTATIONS[key].map((index) => prediction.mesh[index]);
    }
    const clampedBox = prediction.box ? [
      Math.trunc(Math.max(0, prediction.box.startPoint[0])),
      Math.trunc(Math.max(0, prediction.box.startPoint[1])),
      Math.trunc(Math.min(input.shape[2] || 0, prediction.box.endPoint[0]) - Math.max(0, prediction.box.startPoint[0])),
      Math.trunc(Math.min(input.shape[1] || 0, prediction.box.endPoint[1]) - Math.max(0, prediction.box.startPoint[1]))
    ] : [0, 0, 0, 0];
    const boxRaw3 = prediction.box ? [
      prediction.box.startPoint[0] / (input.shape[2] || 0),
      prediction.box.startPoint[1] / (input.shape[1] || 0),
      (prediction.box.endPoint[0] - prediction.box.startPoint[0]) / (input.shape[2] || 0),
      (prediction.box.endPoint[1] - prediction.box.startPoint[1]) / (input.shape[1] || 0)
    ] : [0, 0, 0, 0];
    results.push({
      id: id++,
      score: Math.round(100 * prediction.faceConfidence || 100 * prediction.boxConfidence || 0) / 100,
      boxScore: Math.round(100 * prediction.boxConfidence) / 100,
      faceScore: Math.round(100 * prediction.faceConfidence) / 100,
      box: clampedBox,
      boxRaw: boxRaw3,
      mesh: prediction.mesh,
      meshRaw,
      annotations: annotations3,
      image: prediction.image,
      tensor: prediction.image
    });
    if (prediction.coords)
      prediction.coords.dispose();
  }
  return results;
}
async function load2(config3) {
  if (!faceModels[0] && config3.face.enabled || !faceModels[1] && config3.face.mesh.enabled || !faceModels[2] && config3.face.iris.enabled) {
    faceModels = await Promise.all([
      !faceModels[0] && config3.face.enabled ? load(config3) : null,
      !faceModels[1] && config3.face.mesh.enabled ? tf5.loadGraphModel(join(config3.modelBasePath, config3.face.mesh.modelPath), { fromTFHub: config3.face.mesh.modelPath.includes("tfhub.dev") }) : null,
      !faceModels[2] && config3.face.iris.enabled ? tf5.loadGraphModel(join(config3.modelBasePath, config3.face.iris.modelPath), { fromTFHub: config3.face.iris.modelPath.includes("tfhub.dev") }) : null
    ]);
    if (config3.face.mesh.enabled) {
      if (!faceModels[1] || !faceModels[1]["modelUrl"])
        log("load model failed:", config3.face.mesh.modelPath);
      else if (config3.debug)
        log("load model:", faceModels[1]["modelUrl"]);
    }
    if (config3.face.iris.enabled) {
      if (!faceModels[2] || !faceModels[2]["modelUrl"])
        log("load model failed:", config3.face.iris.modelPath);
      else if (config3.debug)
        log("load model:", faceModels[2]["modelUrl"]);
    }
  } else if (config3.debug) {
    if (faceModels[0])
      log("cached model:", faceModels[0].model["modelUrl"]);
    if (faceModels[1])
      log("cached model:", faceModels[1]["modelUrl"]);
    if (faceModels[2])
      log("cached model:", faceModels[2]["modelUrl"]);
  }
  facePipeline = new Pipeline(faceModels[0], faceModels[1], faceModels[2]);
  return faceModels;
}
var triangulation = TRI468;
var uvmap = UV468;

// src/emotion/emotion.ts
var tf6 = __toModule(require_tfjs_esm());
var annotations = ["angry", "disgust", "fear", "happy", "sad", "surprise", "neutral"];
var model;
var last = [];
var lastCount = 0;
var skipped = Number.MAX_SAFE_INTEGER;
var rgb = [0.2989, 0.587, 0.114];
async function load3(config3) {
  if (!model) {
    model = await tf6.loadGraphModel(join(config3.modelBasePath, config3.face.emotion.modelPath));
    if (!model || !model.modelUrl)
      log("load model failed:", config3.face.emotion.modelPath);
    else if (config3.debug)
      log("load model:", model.modelUrl);
  } else if (config3.debug)
    log("cached model:", model.modelUrl);
  return model;
}
async function predict2(image18, config3, idx, count2) {
  if (!model)
    return null;
  if (skipped < config3.face.emotion.skipFrames && config3.skipFrame && lastCount === count2 && last[idx] && last[idx].length > 0) {
    skipped++;
    return last[idx];
  }
  skipped = 0;
  return new Promise(async (resolve) => {
    const resize = tf6.image.resizeBilinear(image18, [model.inputs[0].shape[2], model.inputs[0].shape[1]], false);
    const [red, green, blue] = tf6.split(resize, 3, 3);
    resize.dispose();
    const redNorm = tf6.mul(red, rgb[0]);
    const greenNorm = tf6.mul(green, rgb[1]);
    const blueNorm = tf6.mul(blue, rgb[2]);
    red.dispose();
    green.dispose();
    blue.dispose();
    const grayscale = tf6.addN([redNorm, greenNorm, blueNorm]);
    redNorm.dispose();
    greenNorm.dispose();
    blueNorm.dispose();
    const normalize = tf6.tidy(() => grayscale.sub(0.5).mul(2));
    grayscale.dispose();
    const obj = [];
    if (config3.face.emotion.enabled) {
      const emotionT = await model.predict(normalize);
      const data = emotionT.dataSync();
      tf6.dispose(emotionT);
      for (let i = 0; i < data.length; i++) {
        if (data[i] > config3.face.emotion.minConfidence)
          obj.push({ score: Math.min(0.99, Math.trunc(100 * data[i]) / 100), emotion: annotations[i] });
      }
      obj.sort((a, b) => b.score - a.score);
    }
    normalize.dispose();
    last[idx] = obj;
    lastCount = count2;
    resolve(obj);
  });
}

// src/faceres/faceres.ts
var tf7 = __toModule(require_tfjs_esm());
var model2;
var last2 = [];
var lastCount2 = 0;
var skipped2 = Number.MAX_SAFE_INTEGER;
async function load4(config3) {
  const modelUrl = join(config3.modelBasePath, config3.face.description.modelPath);
  if (!model2) {
    model2 = await tf7.loadGraphModel(modelUrl);
    if (!model2)
      log("load model failed:", config3.face.description.modelPath);
    else if (config3.debug)
      log("load model:", modelUrl);
  } else if (config3.debug)
    log("cached model:", modelUrl);
  return model2;
}
function similarity(embedding1, embedding2, order = 2) {
  if (!embedding1 || !embedding2)
    return 0;
  if ((embedding1 == null ? void 0 : embedding1.length) === 0 || (embedding2 == null ? void 0 : embedding2.length) === 0)
    return 0;
  if ((embedding1 == null ? void 0 : embedding1.length) !== (embedding2 == null ? void 0 : embedding2.length))
    return 0;
  const distance = 5 * embedding1.map((_val, i) => Math.abs(embedding1[i] - embedding2[i]) ** order).reduce((sum, now2) => sum + now2, 0) ** (1 / order);
  const res = Math.max(0, 100 - distance) / 100;
  return res;
}
function match(embedding, db, threshold = 0) {
  let best = { similarity: 0, name: "", source: "", embedding: [] };
  if (!embedding || !db || !Array.isArray(embedding) || !Array.isArray(db))
    return best;
  for (const f of db) {
    if (f.embedding && f.name) {
      const perc = similarity(embedding, f.embedding);
      if (perc > threshold && perc > best.similarity)
        best = { ...f, similarity: perc };
    }
  }
  return best;
}
function enhance(input) {
  const image18 = tf7.tidy(() => {
    const tensor2 = input.image || input.tensor || input;
    if (!(tensor2 instanceof tf7.Tensor))
      return null;
    const box6 = [[0.05, 0.15, 0.85, 0.85]];
    if (!model2.inputs[0].shape)
      return null;
    const crop = tensor2.shape.length === 3 ? tf7.image.cropAndResize(tf7.expandDims(tensor2, 0), box6, [0], [model2.inputs[0].shape[2], model2.inputs[0].shape[1]]) : tf7.image.cropAndResize(tensor2, box6, [0], [model2.inputs[0].shape[2], model2.inputs[0].shape[1]]);
    const norm = crop.mul(255);
    return norm;
  });
  return image18;
}
async function predict3(image18, config3, idx, count2) {
  var _a, _b;
  if (!model2)
    return null;
  if (skipped2 < config3.face.description.skipFrames && config3.skipFrame && lastCount2 === count2 && ((_a = last2[idx]) == null ? void 0 : _a.age) && ((_b = last2[idx]) == null ? void 0 : _b.age) > 0) {
    skipped2++;
    return last2[idx];
  }
  skipped2 = 0;
  return new Promise(async (resolve) => {
    const enhanced = enhance(image18);
    let resT;
    const obj = {
      age: 0,
      gender: "unknown",
      genderScore: 0,
      descriptor: []
    };
    if (config3.face.description.enabled)
      resT = await model2.predict(enhanced);
    tf7.dispose(enhanced);
    if (resT) {
      tf7.tidy(() => {
        const gender = resT.find((t) => t.shape[1] === 1).dataSync();
        const confidence = Math.trunc(200 * Math.abs(gender[0] - 0.5)) / 100;
        if (confidence > config3.face.description.minConfidence) {
          obj.gender = gender[0] <= 0.5 ? "female" : "male";
          obj.genderScore = Math.min(0.99, confidence);
        }
        const age = resT.find((t) => t.shape[1] === 100).argMax(1).dataSync()[0];
        const all2 = resT.find((t) => t.shape[1] === 100).dataSync();
        obj.age = Math.round(all2[age - 1] > all2[age + 1] ? 10 * age - 100 * all2[age - 1] : 10 * age + 100 * all2[age + 1]) / 10;
        const desc = resT.find((t) => t.shape[1] === 1024);
        obj.descriptor = [...desc.dataSync()];
      });
      resT.forEach((t) => tf7.dispose(t));
    }
    last2[idx] = obj;
    lastCount2 = count2;
    resolve(obj);
  });
}

// src/face.ts
var calculateGaze = (face5) => {
  const radians = (pt1, pt2) => Math.atan2(pt1[1] - pt2[1], pt1[0] - pt2[0]);
  if (!face5.annotations["rightEyeIris"] || !face5.annotations["leftEyeIris"])
    return { bearing: 0, strength: 0 };
  const offsetIris = [0, -0.1];
  const eyeRatio = 1;
  const left = face5.mesh[33][2] > face5.mesh[263][2];
  const irisCenter = left ? face5.mesh[473] : face5.mesh[468];
  const eyeCenter = left ? [(face5.mesh[133][0] + face5.mesh[33][0]) / 2, (face5.mesh[133][1] + face5.mesh[33][1]) / 2] : [(face5.mesh[263][0] + face5.mesh[362][0]) / 2, (face5.mesh[263][1] + face5.mesh[362][1]) / 2];
  const eyeSize = left ? [face5.mesh[133][0] - face5.mesh[33][0], face5.mesh[23][1] - face5.mesh[27][1]] : [face5.mesh[263][0] - face5.mesh[362][0], face5.mesh[253][1] - face5.mesh[257][1]];
  const eyeDiff = [
    (eyeCenter[0] - irisCenter[0]) / eyeSize[0] - offsetIris[0],
    eyeRatio * (irisCenter[1] - eyeCenter[1]) / eyeSize[1] - offsetIris[1]
  ];
  let strength = Math.sqrt(eyeDiff[0] ** 2 + eyeDiff[1] ** 2);
  strength = Math.min(strength, face5.boxRaw[2] / 2, face5.boxRaw[3] / 2);
  const bearing = (radians([0, 0], eyeDiff) + Math.PI / 2) % Math.PI;
  return { bearing, strength };
};
var calculateFaceAngle = (face5, imageSize) => {
  const normalize = (v) => {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    v[0] /= length;
    v[1] /= length;
    v[2] /= length;
    return v;
  };
  const subVectors = (a, b) => {
    const x = a[0] - b[0];
    const y = a[1] - b[1];
    const z = a[2] - b[2];
    return [x, y, z];
  };
  const crossVectors = (a, b) => {
    const x = a[1] * b[2] - a[2] * b[1];
    const y = a[2] * b[0] - a[0] * b[2];
    const z = a[0] * b[1] - a[1] * b[0];
    return [x, y, z];
  };
  const rotationMatrixToEulerAngle = (r) => {
    const [r00, r01, r02, r10, r11, r12, r20, r21, r22] = r;
    let thetaX;
    let thetaY;
    let thetaZ;
    if (r10 < 1) {
      if (r10 > -1) {
        thetaZ = Math.asin(r10);
        thetaY = Math.atan2(-r20, r00);
        thetaX = Math.atan2(-r12, r11);
      } else {
        thetaZ = -Math.PI / 2;
        thetaY = -Math.atan2(r21, r22);
        thetaX = 0;
      }
    } else {
      thetaZ = Math.PI / 2;
      thetaY = Math.atan2(r21, r22);
      thetaX = 0;
    }
    return { pitch: 2 * -thetaX, yaw: 2 * -thetaY, roll: 2 * -thetaZ };
  };
  const meshToEulerAngle = (mesh2) => {
    const radians = (a1, a2, b1, b2) => Math.atan2(b2 - a2, b1 - a1);
    const angle2 = {
      pitch: radians(mesh2[10][1], mesh2[10][2], mesh2[152][1], mesh2[152][2]),
      yaw: radians(mesh2[33][0], mesh2[33][2], mesh2[263][0], mesh2[263][2]),
      roll: radians(mesh2[33][0], mesh2[33][1], mesh2[263][0], mesh2[263][1])
    };
    return angle2;
  };
  const mesh = face5.meshRaw;
  if (!mesh || mesh.length < 300)
    return { angle: { pitch: 0, yaw: 0, roll: 0 }, matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1], gaze: { bearing: 0, strength: 0 } };
  const size = Math.max(face5.boxRaw[2] * imageSize[0], face5.boxRaw[3] * imageSize[1]) / 1.5;
  const pts = [mesh[10], mesh[152], mesh[234], mesh[454]].map((pt) => [
    pt[0] * imageSize[0] / size,
    pt[1] * imageSize[1] / size,
    pt[2]
  ]);
  const y_axis = normalize(subVectors(pts[1], pts[0]));
  let x_axis = normalize(subVectors(pts[3], pts[2]));
  const z_axis = normalize(crossVectors(x_axis, y_axis));
  x_axis = crossVectors(y_axis, z_axis);
  const matrix = [
    x_axis[0],
    x_axis[1],
    x_axis[2],
    y_axis[0],
    y_axis[1],
    y_axis[2],
    z_axis[0],
    z_axis[1],
    z_axis[2]
  ];
  const angle = rotationMatrixToEulerAngle(matrix);
  const gaze = mesh.length === 478 ? calculateGaze(face5) : { bearing: 0, strength: 0 };
  return { angle, matrix, gaze };
};
var detectFace = async (parent, input) => {
  var _a, _b, _c, _d, _e, _f;
  let timeStamp;
  let ageRes;
  let genderRes;
  let emotionRes;
  let embeddingRes;
  let descRes;
  const faceRes = [];
  parent.state = "run:face";
  timeStamp = now();
  const faces = await predict(input, parent.config);
  parent.performance.face = Math.trunc(now() - timeStamp);
  if (!input.shape || input.shape.length !== 4)
    return [];
  if (!faces)
    return [];
  for (let i = 0; i < faces.length; i++) {
    parent.analyze("Get Face");
    if (!faces[i].image || faces[i].image["isDisposedInternal"]) {
      log("Face object is disposed:", faces[i].image);
      continue;
    }
    const rotation = calculateFaceAngle(faces[i], [input.shape[2], input.shape[1]]);
    parent.analyze("Start Emotion:");
    if (parent.config.async) {
      emotionRes = parent.config.face.emotion.enabled ? predict2(faces[i].image || tf8.tensor([]), parent.config, i, faces.length) : {};
    } else {
      parent.state = "run:emotion";
      timeStamp = now();
      emotionRes = parent.config.face.emotion.enabled ? await predict2(faces[i].image || tf8.tensor([]), parent.config, i, faces.length) : {};
      parent.performance.emotion = Math.trunc(now() - timeStamp);
    }
    parent.analyze("End Emotion:");
    parent.analyze("Start Description:");
    if (parent.config.async) {
      descRes = parent.config.face.description.enabled ? predict3(faces[i].image || tf8.tensor([]), parent.config, i, faces.length) : [];
    } else {
      parent.state = "run:description";
      timeStamp = now();
      descRes = parent.config.face.description.enabled ? await predict3(faces[i].image || tf8.tensor([]), parent.config, i, faces.length) : [];
      parent.performance.embedding = Math.trunc(now() - timeStamp);
    }
    parent.analyze("End Description:");
    if (parent.config.async) {
      [ageRes, genderRes, emotionRes, embeddingRes, descRes] = await Promise.all([ageRes, genderRes, emotionRes, embeddingRes, descRes]);
    }
    parent.analyze("Finish Face:");
    if (!parent.config.face.iris.enabled && ((_b = (_a = faces[i]) == null ? void 0 : _a.annotations) == null ? void 0 : _b.leftEyeIris) && ((_d = (_c = faces[i]) == null ? void 0 : _c.annotations) == null ? void 0 : _d.rightEyeIris)) {
      delete faces[i].annotations.leftEyeIris;
      delete faces[i].annotations.rightEyeIris;
    }
    const irisSize = ((_e = faces[i].annotations) == null ? void 0 : _e.leftEyeIris) && ((_f = faces[i].annotations) == null ? void 0 : _f.rightEyeIris) ? Math.max(Math.abs(faces[i].annotations.leftEyeIris[3][0] - faces[i].annotations.leftEyeIris[1][0]), Math.abs(faces[i].annotations.rightEyeIris[4][1] - faces[i].annotations.rightEyeIris[2][1])) / input.shape[2] : 0;
    faceRes.push({
      ...faces[i],
      id: i,
      age: descRes.age,
      gender: descRes.gender,
      genderScore: descRes.genderScore,
      embedding: descRes.descriptor,
      emotion: emotionRes,
      iris: irisSize !== 0 ? Math.trunc(500 / irisSize / 11.7) / 100 : 0,
      rotation,
      tensor: parent.config.face.detector.return ? tf8.squeeze(faces[i].image) : null
    });
    tf8.dispose(faces[i].image);
    if (faces[i].image)
      delete faces[i].image;
    parent.analyze("End Face");
  }
  parent.analyze("End FaceMesh:");
  if (parent.config.async) {
    if (parent.performance.face)
      delete parent.performance.face;
    if (parent.performance.age)
      delete parent.performance.age;
    if (parent.performance.gender)
      delete parent.performance.gender;
    if (parent.performance.emotion)
      delete parent.performance.emotion;
  }
  return faceRes;
};

// src/posenet/posenet.ts
var tf9 = __toModule(require_tfjs_esm());

// src/posenet/keypoints.ts
var partNames = [
  "nose",
  "leftEye",
  "rightEye",
  "leftEar",
  "rightEar",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle"
];
var count = partNames.length;
var partIds = partNames.reduce((result, jointName, i) => {
  result[jointName] = i;
  return result;
}, {});
var connectedPartNames = [
  ["leftHip", "leftShoulder"],
  ["leftElbow", "leftShoulder"],
  ["leftElbow", "leftWrist"],
  ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"],
  ["rightHip", "rightShoulder"],
  ["rightElbow", "rightShoulder"],
  ["rightElbow", "rightWrist"],
  ["rightHip", "rightKnee"],
  ["rightKnee", "rightAnkle"],
  ["leftShoulder", "rightShoulder"],
  ["leftHip", "rightHip"]
];
var connectedPartIndices = connectedPartNames.map(([jointNameA, jointNameB]) => [partIds[jointNameA], partIds[jointNameB]]);
var poseChain = [
  ["nose", "leftEye"],
  ["leftEye", "leftEar"],
  ["nose", "rightEye"],
  ["rightEye", "rightEar"],
  ["nose", "leftShoulder"],
  ["leftShoulder", "leftElbow"],
  ["leftElbow", "leftWrist"],
  ["leftShoulder", "leftHip"],
  ["leftHip", "leftKnee"],
  ["leftKnee", "leftAnkle"],
  ["nose", "rightShoulder"],
  ["rightShoulder", "rightElbow"],
  ["rightElbow", "rightWrist"],
  ["rightShoulder", "rightHip"],
  ["rightHip", "rightKnee"],
  ["rightKnee", "rightAnkle"]
];

// src/posenet/utils.ts
function getBoundingBox(keypoints3) {
  const coord = keypoints3.reduce(({ maxX, maxY, minX, minY }, { position: { x, y } }) => ({
    maxX: Math.max(maxX, x),
    maxY: Math.max(maxY, y),
    minX: Math.min(minX, x),
    minY: Math.min(minY, y)
  }), {
    maxX: Number.NEGATIVE_INFINITY,
    maxY: Number.NEGATIVE_INFINITY,
    minX: Number.POSITIVE_INFINITY,
    minY: Number.POSITIVE_INFINITY
  });
  return [coord.minX, coord.minY, coord.maxX - coord.minX, coord.maxY - coord.minY];
}
function scalePoses(poses2, [height, width], [inputResolutionHeight, inputResolutionWidth]) {
  const scaleY = height / inputResolutionHeight;
  const scaleX = width / inputResolutionWidth;
  const scalePose = (pose, i) => ({
    id: i,
    score: pose.score,
    boxRaw: [pose.box[0] / inputResolutionWidth, pose.box[1] / inputResolutionHeight, pose.box[2] / inputResolutionWidth, pose.box[3] / inputResolutionHeight],
    box: [Math.trunc(pose.box[0] * scaleX), Math.trunc(pose.box[1] * scaleY), Math.trunc(pose.box[2] * scaleX), Math.trunc(pose.box[3] * scaleY)],
    keypoints: pose.keypoints.map(({ score: score3, part, position }) => ({
      score: score3,
      part,
      position: [Math.trunc(position.x * scaleX), Math.trunc(position.y * scaleY)],
      positionRaw: [position.x / inputResolutionHeight, position.y / inputResolutionHeight]
    }))
  });
  const scaledPoses = poses2.map((pose, i) => scalePose(pose, i));
  return scaledPoses;
}
var MaxHeap = class {
  constructor(maxSize2, getElementValue) {
    this.priorityQueue = new Array(maxSize2);
    this.numberOfElements = -1;
    this.getElementValue = getElementValue;
  }
  enqueue(x) {
    this.priorityQueue[++this.numberOfElements] = x;
    this.swim(this.numberOfElements);
  }
  dequeue() {
    const max2 = this.priorityQueue[0];
    this.exchange(0, this.numberOfElements--);
    this.sink(0);
    this.priorityQueue[this.numberOfElements + 1] = null;
    return max2;
  }
  empty() {
    return this.numberOfElements === -1;
  }
  size() {
    return this.numberOfElements + 1;
  }
  all() {
    return this.priorityQueue.slice(0, this.numberOfElements + 1);
  }
  max() {
    return this.priorityQueue[0];
  }
  swim(k) {
    while (k > 0 && this.less(Math.floor(k / 2), k)) {
      this.exchange(k, Math.floor(k / 2));
      k = Math.floor(k / 2);
    }
  }
  sink(k) {
    while (2 * k <= this.numberOfElements) {
      let j = 2 * k;
      if (j < this.numberOfElements && this.less(j, j + 1))
        j++;
      if (!this.less(k, j))
        break;
      this.exchange(k, j);
      k = j;
    }
  }
  getValueAt(i) {
    return this.getElementValue(this.priorityQueue[i]);
  }
  less(i, j) {
    return this.getValueAt(i) < this.getValueAt(j);
  }
  exchange(i, j) {
    const t = this.priorityQueue[i];
    this.priorityQueue[i] = this.priorityQueue[j];
    this.priorityQueue[j] = t;
  }
};
function getOffsetPoint(y, x, keypoint, offsets) {
  return {
    y: offsets.get(y, x, keypoint),
    x: offsets.get(y, x, keypoint + count)
  };
}
function getImageCoords(part, outputStride2, offsets) {
  const { heatmapY, heatmapX, id: keypoint } = part;
  const { y, x } = getOffsetPoint(heatmapY, heatmapX, keypoint, offsets);
  return {
    x: part.heatmapX * outputStride2 + x,
    y: part.heatmapY * outputStride2 + y
  };
}
function clamp(a, min, max2) {
  if (a < min)
    return min;
  if (a > max2)
    return max2;
  return a;
}
function squaredDistance(y1, x1, y2, x2) {
  const dy = y2 - y1;
  const dx = x2 - x1;
  return dy * dy + dx * dx;
}
function addVectors(a, b) {
  return { x: a.x + b.x, y: a.y + b.y };
}

// src/posenet/poses.ts
var localMaximumRadius = 1;
var outputStride = 16;
var squaredNmsRadius = 50 ** 2;
function traverse(edgeId, sourceKeypoint, targetId, scores, offsets, displacements, offsetRefineStep = 2) {
  const getDisplacement = (point2) => ({
    y: displacements.get(point2.y, point2.x, edgeId),
    x: displacements.get(point2.y, point2.x, displacements.shape[2] / 2 + edgeId)
  });
  const getStridedIndexNearPoint = (point2, height2, width2) => ({
    y: clamp(Math.round(point2.y / outputStride), 0, height2 - 1),
    x: clamp(Math.round(point2.x / outputStride), 0, width2 - 1)
  });
  const [height, width] = scores.shape;
  const sourceKeypointIndices = getStridedIndexNearPoint(sourceKeypoint.position, height, width);
  const displacement = getDisplacement(sourceKeypointIndices);
  const displacedPoint = addVectors(sourceKeypoint.position, displacement);
  let targetKeypoint = displacedPoint;
  for (let i = 0; i < offsetRefineStep; i++) {
    const targetKeypointIndices = getStridedIndexNearPoint(targetKeypoint, height, width);
    const offsetPoint = getOffsetPoint(targetKeypointIndices.y, targetKeypointIndices.x, targetId, offsets);
    targetKeypoint = addVectors({ x: targetKeypointIndices.x * outputStride, y: targetKeypointIndices.y * outputStride }, { x: offsetPoint.x, y: offsetPoint.y });
  }
  const targetKeyPointIndices = getStridedIndexNearPoint(targetKeypoint, height, width);
  const score3 = scores.get(targetKeyPointIndices.y, targetKeyPointIndices.x, targetId);
  return { position: targetKeypoint, part: partNames[targetId], score: score3 };
}
function decodePose(root, scores, offsets, displacementsFwd, displacementsBwd) {
  const tuples = poseChain.map(([parentJoinName, childJoinName]) => [partIds[parentJoinName], partIds[childJoinName]]);
  const edgesFwd = tuples.map(([, childJointId]) => childJointId);
  const edgesBwd = tuples.map(([parentJointId]) => parentJointId);
  const numParts = scores.shape[2];
  const numEdges = edgesFwd.length;
  const keypoints3 = new Array(numParts);
  const rootPoint = getImageCoords(root.part, outputStride, offsets);
  keypoints3[root.part.id] = {
    score: root.score,
    part: partNames[root.part.id],
    position: rootPoint
  };
  for (let edge = numEdges - 1; edge >= 0; --edge) {
    const sourceId = edgesFwd[edge];
    const targetId = edgesBwd[edge];
    if (keypoints3[sourceId] && !keypoints3[targetId]) {
      keypoints3[targetId] = traverse(edge, keypoints3[sourceId], targetId, scores, offsets, displacementsBwd);
    }
  }
  for (let edge = 0; edge < numEdges; ++edge) {
    const sourceId = edgesBwd[edge];
    const targetId = edgesFwd[edge];
    if (keypoints3[sourceId] && !keypoints3[targetId]) {
      keypoints3[targetId] = traverse(edge, keypoints3[sourceId], targetId, scores, offsets, displacementsFwd);
    }
  }
  return keypoints3;
}
function scoreIsMaximumInLocalWindow(keypointId, score3, heatmapY, heatmapX, scores) {
  const [height, width] = scores.shape;
  let localMaximum = true;
  const yStart = Math.max(heatmapY - localMaximumRadius, 0);
  const yEnd = Math.min(heatmapY + localMaximumRadius + 1, height);
  for (let yCurrent = yStart; yCurrent < yEnd; ++yCurrent) {
    const xStart = Math.max(heatmapX - localMaximumRadius, 0);
    const xEnd = Math.min(heatmapX + localMaximumRadius + 1, width);
    for (let xCurrent = xStart; xCurrent < xEnd; ++xCurrent) {
      if (scores.get(yCurrent, xCurrent, keypointId) > score3) {
        localMaximum = false;
        break;
      }
    }
    if (!localMaximum)
      break;
  }
  return localMaximum;
}
function buildPartWithScoreQueue(minConfidence, scores) {
  const [height, width, numKeypoints] = scores.shape;
  const queue = new MaxHeap(height * width * numKeypoints, ({ score: score3 }) => score3);
  for (let heatmapY = 0; heatmapY < height; ++heatmapY) {
    for (let heatmapX = 0; heatmapX < width; ++heatmapX) {
      for (let keypointId = 0; keypointId < numKeypoints; ++keypointId) {
        const score3 = scores.get(heatmapY, heatmapX, keypointId);
        if (score3 < minConfidence)
          continue;
        if (scoreIsMaximumInLocalWindow(keypointId, score3, heatmapY, heatmapX, scores))
          queue.enqueue({ score: score3, part: { heatmapY, heatmapX, id: keypointId } });
      }
    }
  }
  return queue;
}
function withinRadius(poses2, { x, y }, keypointId) {
  return poses2.some(({ keypoints: keypoints3 }) => {
    var _a;
    const correspondingKeypoint = (_a = keypoints3[keypointId]) == null ? void 0 : _a.position;
    if (!correspondingKeypoint)
      return false;
    return squaredDistance(y, x, correspondingKeypoint.y, correspondingKeypoint.x) <= squaredNmsRadius;
  });
}
function getInstanceScore(existingPoses, keypoints3) {
  const notOverlappedKeypointScores = keypoints3.reduce((result, { position, score: score3 }, keypointId) => {
    if (!withinRadius(existingPoses, position, keypointId))
      result += score3;
    return result;
  }, 0);
  return notOverlappedKeypointScores / keypoints3.length;
}
function decode(offsets, scores, displacementsFwd, displacementsBwd, maxDetected, minConfidence) {
  const poses2 = [];
  const queue = buildPartWithScoreQueue(minConfidence, scores);
  while (poses2.length < maxDetected && !queue.empty()) {
    const root = queue.dequeue();
    const rootImageCoords = getImageCoords(root.part, outputStride, offsets);
    if (withinRadius(poses2, rootImageCoords, root.part.id))
      continue;
    let keypoints3 = decodePose(root, scores, offsets, displacementsFwd, displacementsBwd);
    keypoints3 = keypoints3.filter((a) => a.score > minConfidence);
    const score3 = getInstanceScore(poses2, keypoints3);
    const box6 = getBoundingBox(keypoints3);
    if (score3 > minConfidence)
      poses2.push({ keypoints: keypoints3, box: box6, score: Math.round(100 * score3) / 100 });
  }
  return poses2;
}

// src/posenet/posenet.ts
var model3;
var poseNetOutputs = ["MobilenetV1/offset_2/BiasAdd", "MobilenetV1/heatmap_2/BiasAdd", "MobilenetV1/displacement_fwd_2/BiasAdd", "MobilenetV1/displacement_bwd_2/BiasAdd"];
async function predict4(input, config3) {
  const res = tf9.tidy(() => {
    if (!model3.inputs[0].shape)
      return [];
    const resized = tf9.image.resizeBilinear(input, [model3.inputs[0].shape[2], model3.inputs[0].shape[1]]);
    const normalized = resized.toFloat().div(127.5).sub(1);
    const results = model3.execute(normalized, poseNetOutputs);
    const results3d = results.map((y) => tf9.squeeze(y, [0]));
    results3d[1] = results3d[1].sigmoid();
    return results3d;
  });
  const buffers = await Promise.all(res.map((tensor2) => tensor2.buffer()));
  for (const t of res)
    t.dispose();
  const decoded = await decode(buffers[0], buffers[1], buffers[2], buffers[3], config3.body.maxDetected, config3.body.minConfidence);
  if (!model3.inputs[0].shape)
    return [];
  const scaled = scalePoses(decoded, [input.shape[1], input.shape[2]], [model3.inputs[0].shape[2], model3.inputs[0].shape[1]]);
  return scaled;
}
async function load5(config3) {
  if (!model3) {
    model3 = await tf9.loadGraphModel(join(config3.modelBasePath, config3.body.modelPath));
    if (!model3 || !model3["modelUrl"])
      log("load model failed:", config3.body.modelPath);
    else if (config3.debug)
      log("load model:", model3["modelUrl"]);
  } else if (config3.debug)
    log("cached model:", model3["modelUrl"]);
  return model3;
}

// src/handpose/handpose.ts
var tf13 = __toModule(require_tfjs_esm());

// src/handpose/handdetector.ts
var tf11 = __toModule(require_tfjs_esm());

// src/handpose/box.ts
var tf10 = __toModule(require_tfjs_esm());
function getBoxSize2(box6) {
  return [
    Math.abs(box6.endPoint[0] - box6.startPoint[0]),
    Math.abs(box6.endPoint[1] - box6.startPoint[1])
  ];
}
function getBoxCenter2(box6) {
  return [
    box6.startPoint[0] + (box6.endPoint[0] - box6.startPoint[0]) / 2,
    box6.startPoint[1] + (box6.endPoint[1] - box6.startPoint[1]) / 2
  ];
}
function cutBoxFromImageAndResize2(box6, image18, cropSize) {
  const h = image18.shape[1];
  const w = image18.shape[2];
  const boxes = [[
    box6.startPoint[1] / h,
    box6.startPoint[0] / w,
    box6.endPoint[1] / h,
    box6.endPoint[0] / w
  ]];
  return tf10.image.cropAndResize(image18, boxes, [0], cropSize);
}
function scaleBoxCoordinates2(box6, factor) {
  const startPoint = [box6.startPoint[0] * factor[0], box6.startPoint[1] * factor[1]];
  const endPoint = [box6.endPoint[0] * factor[0], box6.endPoint[1] * factor[1]];
  const palmLandmarks = box6.palmLandmarks.map((coord) => {
    const scaledCoord = [coord[0] * factor[0], coord[1] * factor[1]];
    return scaledCoord;
  });
  return { startPoint, endPoint, palmLandmarks, confidence: box6.confidence };
}
function enlargeBox2(box6, factor = 1.5) {
  const center = getBoxCenter2(box6);
  const size = getBoxSize2(box6);
  const newHalfSize = [factor * size[0] / 2, factor * size[1] / 2];
  const startPoint = [center[0] - newHalfSize[0], center[1] - newHalfSize[1]];
  const endPoint = [center[0] + newHalfSize[0], center[1] + newHalfSize[1]];
  return { startPoint, endPoint, palmLandmarks: box6.palmLandmarks };
}
function squarifyBox2(box6) {
  const centers = getBoxCenter2(box6);
  const size = getBoxSize2(box6);
  const maxEdge = Math.max(...size);
  const halfSize = maxEdge / 2;
  const startPoint = [centers[0] - halfSize, centers[1] - halfSize];
  const endPoint = [centers[0] + halfSize, centers[1] + halfSize];
  return { startPoint, endPoint, palmLandmarks: box6.palmLandmarks };
}

// src/handpose/anchors.ts
var anchors = [
  { x: 0.015625, y: 0.015625 },
  { x: 0.015625, y: 0.015625 },
  { x: 0.046875, y: 0.015625 },
  { x: 0.046875, y: 0.015625 },
  { x: 0.078125, y: 0.015625 },
  { x: 0.078125, y: 0.015625 },
  { x: 0.109375, y: 0.015625 },
  { x: 0.109375, y: 0.015625 },
  { x: 0.140625, y: 0.015625 },
  { x: 0.140625, y: 0.015625 },
  { x: 0.171875, y: 0.015625 },
  { x: 0.171875, y: 0.015625 },
  { x: 0.203125, y: 0.015625 },
  { x: 0.203125, y: 0.015625 },
  { x: 0.234375, y: 0.015625 },
  { x: 0.234375, y: 0.015625 },
  { x: 0.265625, y: 0.015625 },
  { x: 0.265625, y: 0.015625 },
  { x: 0.296875, y: 0.015625 },
  { x: 0.296875, y: 0.015625 },
  { x: 0.328125, y: 0.015625 },
  { x: 0.328125, y: 0.015625 },
  { x: 0.359375, y: 0.015625 },
  { x: 0.359375, y: 0.015625 },
  { x: 0.390625, y: 0.015625 },
  { x: 0.390625, y: 0.015625 },
  { x: 0.421875, y: 0.015625 },
  { x: 0.421875, y: 0.015625 },
  { x: 0.453125, y: 0.015625 },
  { x: 0.453125, y: 0.015625 },
  { x: 0.484375, y: 0.015625 },
  { x: 0.484375, y: 0.015625 },
  { x: 0.515625, y: 0.015625 },
  { x: 0.515625, y: 0.015625 },
  { x: 0.546875, y: 0.015625 },
  { x: 0.546875, y: 0.015625 },
  { x: 0.578125, y: 0.015625 },
  { x: 0.578125, y: 0.015625 },
  { x: 0.609375, y: 0.015625 },
  { x: 0.609375, y: 0.015625 },
  { x: 0.640625, y: 0.015625 },
  { x: 0.640625, y: 0.015625 },
  { x: 0.671875, y: 0.015625 },
  { x: 0.671875, y: 0.015625 },
  { x: 0.703125, y: 0.015625 },
  { x: 0.703125, y: 0.015625 },
  { x: 0.734375, y: 0.015625 },
  { x: 0.734375, y: 0.015625 },
  { x: 0.765625, y: 0.015625 },
  { x: 0.765625, y: 0.015625 },
  { x: 0.796875, y: 0.015625 },
  { x: 0.796875, y: 0.015625 },
  { x: 0.828125, y: 0.015625 },
  { x: 0.828125, y: 0.015625 },
  { x: 0.859375, y: 0.015625 },
  { x: 0.859375, y: 0.015625 },
  { x: 0.890625, y: 0.015625 },
  { x: 0.890625, y: 0.015625 },
  { x: 0.921875, y: 0.015625 },
  { x: 0.921875, y: 0.015625 },
  { x: 0.953125, y: 0.015625 },
  { x: 0.953125, y: 0.015625 },
  { x: 0.984375, y: 0.015625 },
  { x: 0.984375, y: 0.015625 },
  { x: 0.015625, y: 0.046875 },
  { x: 0.015625, y: 0.046875 },
  { x: 0.046875, y: 0.046875 },
  { x: 0.046875, y: 0.046875 },
  { x: 0.078125, y: 0.046875 },
  { x: 0.078125, y: 0.046875 },
  { x: 0.109375, y: 0.046875 },
  { x: 0.109375, y: 0.046875 },
  { x: 0.140625, y: 0.046875 },
  { x: 0.140625, y: 0.046875 },
  { x: 0.171875, y: 0.046875 },
  { x: 0.171875, y: 0.046875 },
  { x: 0.203125, y: 0.046875 },
  { x: 0.203125, y: 0.046875 },
  { x: 0.234375, y: 0.046875 },
  { x: 0.234375, y: 0.046875 },
  { x: 0.265625, y: 0.046875 },
  { x: 0.265625, y: 0.046875 },
  { x: 0.296875, y: 0.046875 },
  { x: 0.296875, y: 0.046875 },
  { x: 0.328125, y: 0.046875 },
  { x: 0.328125, y: 0.046875 },
  { x: 0.359375, y: 0.046875 },
  { x: 0.359375, y: 0.046875 },
  { x: 0.390625, y: 0.046875 },
  { x: 0.390625, y: 0.046875 },
  { x: 0.421875, y: 0.046875 },
  { x: 0.421875, y: 0.046875 },
  { x: 0.453125, y: 0.046875 },
  { x: 0.453125, y: 0.046875 },
  { x: 0.484375, y: 0.046875 },
  { x: 0.484375, y: 0.046875 },
  { x: 0.515625, y: 0.046875 },
  { x: 0.515625, y: 0.046875 },
  { x: 0.546875, y: 0.046875 },
  { x: 0.546875, y: 0.046875 },
  { x: 0.578125, y: 0.046875 },
  { x: 0.578125, y: 0.046875 },
  { x: 0.609375, y: 0.046875 },
  { x: 0.609375, y: 0.046875 },
  { x: 0.640625, y: 0.046875 },
  { x: 0.640625, y: 0.046875 },
  { x: 0.671875, y: 0.046875 },
  { x: 0.671875, y: 0.046875 },
  { x: 0.703125, y: 0.046875 },
  { x: 0.703125, y: 0.046875 },
  { x: 0.734375, y: 0.046875 },
  { x: 0.734375, y: 0.046875 },
  { x: 0.765625, y: 0.046875 },
  { x: 0.765625, y: 0.046875 },
  { x: 0.796875, y: 0.046875 },
  { x: 0.796875, y: 0.046875 },
  { x: 0.828125, y: 0.046875 },
  { x: 0.828125, y: 0.046875 },
  { x: 0.859375, y: 0.046875 },
  { x: 0.859375, y: 0.046875 },
  { x: 0.890625, y: 0.046875 },
  { x: 0.890625, y: 0.046875 },
  { x: 0.921875, y: 0.046875 },
  { x: 0.921875, y: 0.046875 },
  { x: 0.953125, y: 0.046875 },
  { x: 0.953125, y: 0.046875 },
  { x: 0.984375, y: 0.046875 },
  { x: 0.984375, y: 0.046875 },
  { x: 0.015625, y: 0.078125 },
  { x: 0.015625, y: 0.078125 },
  { x: 0.046875, y: 0.078125 },
  { x: 0.046875, y: 0.078125 },
  { x: 0.078125, y: 0.078125 },
  { x: 0.078125, y: 0.078125 },
  { x: 0.109375, y: 0.078125 },
  { x: 0.109375, y: 0.078125 },
  { x: 0.140625, y: 0.078125 },
  { x: 0.140625, y: 0.078125 },
  { x: 0.171875, y: 0.078125 },
  { x: 0.171875, y: 0.078125 },
  { x: 0.203125, y: 0.078125 },
  { x: 0.203125, y: 0.078125 },
  { x: 0.234375, y: 0.078125 },
  { x: 0.234375, y: 0.078125 },
  { x: 0.265625, y: 0.078125 },
  { x: 0.265625, y: 0.078125 },
  { x: 0.296875, y: 0.078125 },
  { x: 0.296875, y: 0.078125 },
  { x: 0.328125, y: 0.078125 },
  { x: 0.328125, y: 0.078125 },
  { x: 0.359375, y: 0.078125 },
  { x: 0.359375, y: 0.078125 },
  { x: 0.390625, y: 0.078125 },
  { x: 0.390625, y: 0.078125 },
  { x: 0.421875, y: 0.078125 },
  { x: 0.421875, y: 0.078125 },
  { x: 0.453125, y: 0.078125 },
  { x: 0.453125, y: 0.078125 },
  { x: 0.484375, y: 0.078125 },
  { x: 0.484375, y: 0.078125 },
  { x: 0.515625, y: 0.078125 },
  { x: 0.515625, y: 0.078125 },
  { x: 0.546875, y: 0.078125 },
  { x: 0.546875, y: 0.078125 },
  { x: 0.578125, y: 0.078125 },
  { x: 0.578125, y: 0.078125 },
  { x: 0.609375, y: 0.078125 },
  { x: 0.609375, y: 0.078125 },
  { x: 0.640625, y: 0.078125 },
  { x: 0.640625, y: 0.078125 },
  { x: 0.671875, y: 0.078125 },
  { x: 0.671875, y: 0.078125 },
  { x: 0.703125, y: 0.078125 },
  { x: 0.703125, y: 0.078125 },
  { x: 0.734375, y: 0.078125 },
  { x: 0.734375, y: 0.078125 },
  { x: 0.765625, y: 0.078125 },
  { x: 0.765625, y: 0.078125 },
  { x: 0.796875, y: 0.078125 },
  { x: 0.796875, y: 0.078125 },
  { x: 0.828125, y: 0.078125 },
  { x: 0.828125, y: 0.078125 },
  { x: 0.859375, y: 0.078125 },
  { x: 0.859375, y: 0.078125 },
  { x: 0.890625, y: 0.078125 },
  { x: 0.890625, y: 0.078125 },
  { x: 0.921875, y: 0.078125 },
  { x: 0.921875, y: 0.078125 },
  { x: 0.953125, y: 0.078125 },
  { x: 0.953125, y: 0.078125 },
  { x: 0.984375, y: 0.078125 },
  { x: 0.984375, y: 0.078125 },
  { x: 0.015625, y: 0.109375 },
  { x: 0.015625, y: 0.109375 },
  { x: 0.046875, y: 0.109375 },
  { x: 0.046875, y: 0.109375 },
  { x: 0.078125, y: 0.109375 },
  { x: 0.078125, y: 0.109375 },
  { x: 0.109375, y: 0.109375 },
  { x: 0.109375, y: 0.109375 },
  { x: 0.140625, y: 0.109375 },
  { x: 0.140625, y: 0.109375 },
  { x: 0.171875, y: 0.109375 },
  { x: 0.171875, y: 0.109375 },
  { x: 0.203125, y: 0.109375 },
  { x: 0.203125, y: 0.109375 },
  { x: 0.234375, y: 0.109375 },
  { x: 0.234375, y: 0.109375 },
  { x: 0.265625, y: 0.109375 },
  { x: 0.265625, y: 0.109375 },
  { x: 0.296875, y: 0.109375 },
  { x: 0.296875, y: 0.109375 },
  { x: 0.328125, y: 0.109375 },
  { x: 0.328125, y: 0.109375 },
  { x: 0.359375, y: 0.109375 },
  { x: 0.359375, y: 0.109375 },
  { x: 0.390625, y: 0.109375 },
  { x: 0.390625, y: 0.109375 },
  { x: 0.421875, y: 0.109375 },
  { x: 0.421875, y: 0.109375 },
  { x: 0.453125, y: 0.109375 },
  { x: 0.453125, y: 0.109375 },
  { x: 0.484375, y: 0.109375 },
  { x: 0.484375, y: 0.109375 },
  { x: 0.515625, y: 0.109375 },
  { x: 0.515625, y: 0.109375 },
  { x: 0.546875, y: 0.109375 },
  { x: 0.546875, y: 0.109375 },
  { x: 0.578125, y: 0.109375 },
  { x: 0.578125, y: 0.109375 },
  { x: 0.609375, y: 0.109375 },
  { x: 0.609375, y: 0.109375 },
  { x: 0.640625, y: 0.109375 },
  { x: 0.640625, y: 0.109375 },
  { x: 0.671875, y: 0.109375 },
  { x: 0.671875, y: 0.109375 },
  { x: 0.703125, y: 0.109375 },
  { x: 0.703125, y: 0.109375 },
  { x: 0.734375, y: 0.109375 },
  { x: 0.734375, y: 0.109375 },
  { x: 0.765625, y: 0.109375 },
  { x: 0.765625, y: 0.109375 },
  { x: 0.796875, y: 0.109375 },
  { x: 0.796875, y: 0.109375 },
  { x: 0.828125, y: 0.109375 },
  { x: 0.828125, y: 0.109375 },
  { x: 0.859375, y: 0.109375 },
  { x: 0.859375, y: 0.109375 },
  { x: 0.890625, y: 0.109375 },
  { x: 0.890625, y: 0.109375 },
  { x: 0.921875, y: 0.109375 },
  { x: 0.921875, y: 0.109375 },
  { x: 0.953125, y: 0.109375 },
  { x: 0.953125, y: 0.109375 },
  { x: 0.984375, y: 0.109375 },
  { x: 0.984375, y: 0.109375 },
  { x: 0.015625, y: 0.140625 },
  { x: 0.015625, y: 0.140625 },
  { x: 0.046875, y: 0.140625 },
  { x: 0.046875, y: 0.140625 },
  { x: 0.078125, y: 0.140625 },
  { x: 0.078125, y: 0.140625 },
  { x: 0.109375, y: 0.140625 },
  { x: 0.109375, y: 0.140625 },
  { x: 0.140625, y: 0.140625 },
  { x: 0.140625, y: 0.140625 },
  { x: 0.171875, y: 0.140625 },
  { x: 0.171875, y: 0.140625 },
  { x: 0.203125, y: 0.140625 },
  { x: 0.203125, y: 0.140625 },
  { x: 0.234375, y: 0.140625 },
  { x: 0.234375, y: 0.140625 },
  { x: 0.265625, y: 0.140625 },
  { x: 0.265625, y: 0.140625 },
  { x: 0.296875, y: 0.140625 },
  { x: 0.296875, y: 0.140625 },
  { x: 0.328125, y: 0.140625 },
  { x: 0.328125, y: 0.140625 },
  { x: 0.359375, y: 0.140625 },
  { x: 0.359375, y: 0.140625 },
  { x: 0.390625, y: 0.140625 },
  { x: 0.390625, y: 0.140625 },
  { x: 0.421875, y: 0.140625 },
  { x: 0.421875, y: 0.140625 },
  { x: 0.453125, y: 0.140625 },
  { x: 0.453125, y: 0.140625 },
  { x: 0.484375, y: 0.140625 },
  { x: 0.484375, y: 0.140625 },
  { x: 0.515625, y: 0.140625 },
  { x: 0.515625, y: 0.140625 },
  { x: 0.546875, y: 0.140625 },
  { x: 0.546875, y: 0.140625 },
  { x: 0.578125, y: 0.140625 },
  { x: 0.578125, y: 0.140625 },
  { x: 0.609375, y: 0.140625 },
  { x: 0.609375, y: 0.140625 },
  { x: 0.640625, y: 0.140625 },
  { x: 0.640625, y: 0.140625 },
  { x: 0.671875, y: 0.140625 },
  { x: 0.671875, y: 0.140625 },
  { x: 0.703125, y: 0.140625 },
  { x: 0.703125, y: 0.140625 },
  { x: 0.734375, y: 0.140625 },
  { x: 0.734375, y: 0.140625 },
  { x: 0.765625, y: 0.140625 },
  { x: 0.765625, y: 0.140625 },
  { x: 0.796875, y: 0.140625 },
  { x: 0.796875, y: 0.140625 },
  { x: 0.828125, y: 0.140625 },
  { x: 0.828125, y: 0.140625 },
  { x: 0.859375, y: 0.140625 },
  { x: 0.859375, y: 0.140625 },
  { x: 0.890625, y: 0.140625 },
  { x: 0.890625, y: 0.140625 },
  { x: 0.921875, y: 0.140625 },
  { x: 0.921875, y: 0.140625 },
  { x: 0.953125, y: 0.140625 },
  { x: 0.953125, y: 0.140625 },
  { x: 0.984375, y: 0.140625 },
  { x: 0.984375, y: 0.140625 },
  { x: 0.015625, y: 0.171875 },
  { x: 0.015625, y: 0.171875 },
  { x: 0.046875, y: 0.171875 },
  { x: 0.046875, y: 0.171875 },
  { x: 0.078125, y: 0.171875 },
  { x: 0.078125, y: 0.171875 },
  { x: 0.109375, y: 0.171875 },
  { x: 0.109375, y: 0.171875 },
  { x: 0.140625, y: 0.171875 },
  { x: 0.140625, y: 0.171875 },
  { x: 0.171875, y: 0.171875 },
  { x: 0.171875, y: 0.171875 },
  { x: 0.203125, y: 0.171875 },
  { x: 0.203125, y: 0.171875 },
  { x: 0.234375, y: 0.171875 },
  { x: 0.234375, y: 0.171875 },
  { x: 0.265625, y: 0.171875 },
  { x: 0.265625, y: 0.171875 },
  { x: 0.296875, y: 0.171875 },
  { x: 0.296875, y: 0.171875 },
  { x: 0.328125, y: 0.171875 },
  { x: 0.328125, y: 0.171875 },
  { x: 0.359375, y: 0.171875 },
  { x: 0.359375, y: 0.171875 },
  { x: 0.390625, y: 0.171875 },
  { x: 0.390625, y: 0.171875 },
  { x: 0.421875, y: 0.171875 },
  { x: 0.421875, y: 0.171875 },
  { x: 0.453125, y: 0.171875 },
  { x: 0.453125, y: 0.171875 },
  { x: 0.484375, y: 0.171875 },
  { x: 0.484375, y: 0.171875 },
  { x: 0.515625, y: 0.171875 },
  { x: 0.515625, y: 0.171875 },
  { x: 0.546875, y: 0.171875 },
  { x: 0.546875, y: 0.171875 },
  { x: 0.578125, y: 0.171875 },
  { x: 0.578125, y: 0.171875 },
  { x: 0.609375, y: 0.171875 },
  { x: 0.609375, y: 0.171875 },
  { x: 0.640625, y: 0.171875 },
  { x: 0.640625, y: 0.171875 },
  { x: 0.671875, y: 0.171875 },
  { x: 0.671875, y: 0.171875 },
  { x: 0.703125, y: 0.171875 },
  { x: 0.703125, y: 0.171875 },
  { x: 0.734375, y: 0.171875 },
  { x: 0.734375, y: 0.171875 },
  { x: 0.765625, y: 0.171875 },
  { x: 0.765625, y: 0.171875 },
  { x: 0.796875, y: 0.171875 },
  { x: 0.796875, y: 0.171875 },
  { x: 0.828125, y: 0.171875 },
  { x: 0.828125, y: 0.171875 },
  { x: 0.859375, y: 0.171875 },
  { x: 0.859375, y: 0.171875 },
  { x: 0.890625, y: 0.171875 },
  { x: 0.890625, y: 0.171875 },
  { x: 0.921875, y: 0.171875 },
  { x: 0.921875, y: 0.171875 },
  { x: 0.953125, y: 0.171875 },
  { x: 0.953125, y: 0.171875 },
  { x: 0.984375, y: 0.171875 },
  { x: 0.984375, y: 0.171875 },
  { x: 0.015625, y: 0.203125 },
  { x: 0.015625, y: 0.203125 },
  { x: 0.046875, y: 0.203125 },
  { x: 0.046875, y: 0.203125 },
  { x: 0.078125, y: 0.203125 },
  { x: 0.078125, y: 0.203125 },
  { x: 0.109375, y: 0.203125 },
  { x: 0.109375, y: 0.203125 },
  { x: 0.140625, y: 0.203125 },
  { x: 0.140625, y: 0.203125 },
  { x: 0.171875, y: 0.203125 },
  { x: 0.171875, y: 0.203125 },
  { x: 0.203125, y: 0.203125 },
  { x: 0.203125, y: 0.203125 },
  { x: 0.234375, y: 0.203125 },
  { x: 0.234375, y: 0.203125 },
  { x: 0.265625, y: 0.203125 },
  { x: 0.265625, y: 0.203125 },
  { x: 0.296875, y: 0.203125 },
  { x: 0.296875, y: 0.203125 },
  { x: 0.328125, y: 0.203125 },
  { x: 0.328125, y: 0.203125 },
  { x: 0.359375, y: 0.203125 },
  { x: 0.359375, y: 0.203125 },
  { x: 0.390625, y: 0.203125 },
  { x: 0.390625, y: 0.203125 },
  { x: 0.421875, y: 0.203125 },
  { x: 0.421875, y: 0.203125 },
  { x: 0.453125, y: 0.203125 },
  { x: 0.453125, y: 0.203125 },
  { x: 0.484375, y: 0.203125 },
  { x: 0.484375, y: 0.203125 },
  { x: 0.515625, y: 0.203125 },
  { x: 0.515625, y: 0.203125 },
  { x: 0.546875, y: 0.203125 },
  { x: 0.546875, y: 0.203125 },
  { x: 0.578125, y: 0.203125 },
  { x: 0.578125, y: 0.203125 },
  { x: 0.609375, y: 0.203125 },
  { x: 0.609375, y: 0.203125 },
  { x: 0.640625, y: 0.203125 },
  { x: 0.640625, y: 0.203125 },
  { x: 0.671875, y: 0.203125 },
  { x: 0.671875, y: 0.203125 },
  { x: 0.703125, y: 0.203125 },
  { x: 0.703125, y: 0.203125 },
  { x: 0.734375, y: 0.203125 },
  { x: 0.734375, y: 0.203125 },
  { x: 0.765625, y: 0.203125 },
  { x: 0.765625, y: 0.203125 },
  { x: 0.796875, y: 0.203125 },
  { x: 0.796875, y: 0.203125 },
  { x: 0.828125, y: 0.203125 },
  { x: 0.828125, y: 0.203125 },
  { x: 0.859375, y: 0.203125 },
  { x: 0.859375, y: 0.203125 },
  { x: 0.890625, y: 0.203125 },
  { x: 0.890625, y: 0.203125 },
  { x: 0.921875, y: 0.203125 },
  { x: 0.921875, y: 0.203125 },
  { x: 0.953125, y: 0.203125 },
  { x: 0.953125, y: 0.203125 },
  { x: 0.984375, y: 0.203125 },
  { x: 0.984375, y: 0.203125 },
  { x: 0.015625, y: 0.234375 },
  { x: 0.015625, y: 0.234375 },
  { x: 0.046875, y: 0.234375 },
  { x: 0.046875, y: 0.234375 },
  { x: 0.078125, y: 0.234375 },
  { x: 0.078125, y: 0.234375 },
  { x: 0.109375, y: 0.234375 },
  { x: 0.109375, y: 0.234375 },
  { x: 0.140625, y: 0.234375 },
  { x: 0.140625, y: 0.234375 },
  { x: 0.171875, y: 0.234375 },
  { x: 0.171875, y: 0.234375 },
  { x: 0.203125, y: 0.234375 },
  { x: 0.203125, y: 0.234375 },
  { x: 0.234375, y: 0.234375 },
  { x: 0.234375, y: 0.234375 },
  { x: 0.265625, y: 0.234375 },
  { x: 0.265625, y: 0.234375 },
  { x: 0.296875, y: 0.234375 },
  { x: 0.296875, y: 0.234375 },
  { x: 0.328125, y: 0.234375 },
  { x: 0.328125, y: 0.234375 },
  { x: 0.359375, y: 0.234375 },
  { x: 0.359375, y: 0.234375 },
  { x: 0.390625, y: 0.234375 },
  { x: 0.390625, y: 0.234375 },
  { x: 0.421875, y: 0.234375 },
  { x: 0.421875, y: 0.234375 },
  { x: 0.453125, y: 0.234375 },
  { x: 0.453125, y: 0.234375 },
  { x: 0.484375, y: 0.234375 },
  { x: 0.484375, y: 0.234375 },
  { x: 0.515625, y: 0.234375 },
  { x: 0.515625, y: 0.234375 },
  { x: 0.546875, y: 0.234375 },
  { x: 0.546875, y: 0.234375 },
  { x: 0.578125, y: 0.234375 },
  { x: 0.578125, y: 0.234375 },
  { x: 0.609375, y: 0.234375 },
  { x: 0.609375, y: 0.234375 },
  { x: 0.640625, y: 0.234375 },
  { x: 0.640625, y: 0.234375 },
  { x: 0.671875, y: 0.234375 },
  { x: 0.671875, y: 0.234375 },
  { x: 0.703125, y: 0.234375 },
  { x: 0.703125, y: 0.234375 },
  { x: 0.734375, y: 0.234375 },
  { x: 0.734375, y: 0.234375 },
  { x: 0.765625, y: 0.234375 },
  { x: 0.765625, y: 0.234375 },
  { x: 0.796875, y: 0.234375 },
  { x: 0.796875, y: 0.234375 },
  { x: 0.828125, y: 0.234375 },
  { x: 0.828125, y: 0.234375 },
  { x: 0.859375, y: 0.234375 },
  { x: 0.859375, y: 0.234375 },
  { x: 0.890625, y: 0.234375 },
  { x: 0.890625, y: 0.234375 },
  { x: 0.921875, y: 0.234375 },
  { x: 0.921875, y: 0.234375 },
  { x: 0.953125, y: 0.234375 },
  { x: 0.953125, y: 0.234375 },
  { x: 0.984375, y: 0.234375 },
  { x: 0.984375, y: 0.234375 },
  { x: 0.015625, y: 0.265625 },
  { x: 0.015625, y: 0.265625 },
  { x: 0.046875, y: 0.265625 },
  { x: 0.046875, y: 0.265625 },
  { x: 0.078125, y: 0.265625 },
  { x: 0.078125, y: 0.265625 },
  { x: 0.109375, y: 0.265625 },
  { x: 0.109375, y: 0.265625 },
  { x: 0.140625, y: 0.265625 },
  { x: 0.140625, y: 0.265625 },
  { x: 0.171875, y: 0.265625 },
  { x: 0.171875, y: 0.265625 },
  { x: 0.203125, y: 0.265625 },
  { x: 0.203125, y: 0.265625 },
  { x: 0.234375, y: 0.265625 },
  { x: 0.234375, y: 0.265625 },
  { x: 0.265625, y: 0.265625 },
  { x: 0.265625, y: 0.265625 },
  { x: 0.296875, y: 0.265625 },
  { x: 0.296875, y: 0.265625 },
  { x: 0.328125, y: 0.265625 },
  { x: 0.328125, y: 0.265625 },
  { x: 0.359375, y: 0.265625 },
  { x: 0.359375, y: 0.265625 },
  { x: 0.390625, y: 0.265625 },
  { x: 0.390625, y: 0.265625 },
  { x: 0.421875, y: 0.265625 },
  { x: 0.421875, y: 0.265625 },
  { x: 0.453125, y: 0.265625 },
  { x: 0.453125, y: 0.265625 },
  { x: 0.484375, y: 0.265625 },
  { x: 0.484375, y: 0.265625 },
  { x: 0.515625, y: 0.265625 },
  { x: 0.515625, y: 0.265625 },
  { x: 0.546875, y: 0.265625 },
  { x: 0.546875, y: 0.265625 },
  { x: 0.578125, y: 0.265625 },
  { x: 0.578125, y: 0.265625 },
  { x: 0.609375, y: 0.265625 },
  { x: 0.609375, y: 0.265625 },
  { x: 0.640625, y: 0.265625 },
  { x: 0.640625, y: 0.265625 },
  { x: 0.671875, y: 0.265625 },
  { x: 0.671875, y: 0.265625 },
  { x: 0.703125, y: 0.265625 },
  { x: 0.703125, y: 0.265625 },
  { x: 0.734375, y: 0.265625 },
  { x: 0.734375, y: 0.265625 },
  { x: 0.765625, y: 0.265625 },
  { x: 0.765625, y: 0.265625 },
  { x: 0.796875, y: 0.265625 },
  { x: 0.796875, y: 0.265625 },
  { x: 0.828125, y: 0.265625 },
  { x: 0.828125, y: 0.265625 },
  { x: 0.859375, y: 0.265625 },
  { x: 0.859375, y: 0.265625 },
  { x: 0.890625, y: 0.265625 },
  { x: 0.890625, y: 0.265625 },
  { x: 0.921875, y: 0.265625 },
  { x: 0.921875, y: 0.265625 },
  { x: 0.953125, y: 0.265625 },
  { x: 0.953125, y: 0.265625 },
  { x: 0.984375, y: 0.265625 },
  { x: 0.984375, y: 0.265625 },
  { x: 0.015625, y: 0.296875 },
  { x: 0.015625, y: 0.296875 },
  { x: 0.046875, y: 0.296875 },
  { x: 0.046875, y: 0.296875 },
  { x: 0.078125, y: 0.296875 },
  { x: 0.078125, y: 0.296875 },
  { x: 0.109375, y: 0.296875 },
  { x: 0.109375, y: 0.296875 },
  { x: 0.140625, y: 0.296875 },
  { x: 0.140625, y: 0.296875 },
  { x: 0.171875, y: 0.296875 },
  { x: 0.171875, y: 0.296875 },
  { x: 0.203125, y: 0.296875 },
  { x: 0.203125, y: 0.296875 },
  { x: 0.234375, y: 0.296875 },
  { x: 0.234375, y: 0.296875 },
  { x: 0.265625, y: 0.296875 },
  { x: 0.265625, y: 0.296875 },
  { x: 0.296875, y: 0.296875 },
  { x: 0.296875, y: 0.296875 },
  { x: 0.328125, y: 0.296875 },
  { x: 0.328125, y: 0.296875 },
  { x: 0.359375, y: 0.296875 },
  { x: 0.359375, y: 0.296875 },
  { x: 0.390625, y: 0.296875 },
  { x: 0.390625, y: 0.296875 },
  { x: 0.421875, y: 0.296875 },
  { x: 0.421875, y: 0.296875 },
  { x: 0.453125, y: 0.296875 },
  { x: 0.453125, y: 0.296875 },
  { x: 0.484375, y: 0.296875 },
  { x: 0.484375, y: 0.296875 },
  { x: 0.515625, y: 0.296875 },
  { x: 0.515625, y: 0.296875 },
  { x: 0.546875, y: 0.296875 },
  { x: 0.546875, y: 0.296875 },
  { x: 0.578125, y: 0.296875 },
  { x: 0.578125, y: 0.296875 },
  { x: 0.609375, y: 0.296875 },
  { x: 0.609375, y: 0.296875 },
  { x: 0.640625, y: 0.296875 },
  { x: 0.640625, y: 0.296875 },
  { x: 0.671875, y: 0.296875 },
  { x: 0.671875, y: 0.296875 },
  { x: 0.703125, y: 0.296875 },
  { x: 0.703125, y: 0.296875 },
  { x: 0.734375, y: 0.296875 },
  { x: 0.734375, y: 0.296875 },
  { x: 0.765625, y: 0.296875 },
  { x: 0.765625, y: 0.296875 },
  { x: 0.796875, y: 0.296875 },
  { x: 0.796875, y: 0.296875 },
  { x: 0.828125, y: 0.296875 },
  { x: 0.828125, y: 0.296875 },
  { x: 0.859375, y: 0.296875 },
  { x: 0.859375, y: 0.296875 },
  { x: 0.890625, y: 0.296875 },
  { x: 0.890625, y: 0.296875 },
  { x: 0.921875, y: 0.296875 },
  { x: 0.921875, y: 0.296875 },
  { x: 0.953125, y: 0.296875 },
  { x: 0.953125, y: 0.296875 },
  { x: 0.984375, y: 0.296875 },
  { x: 0.984375, y: 0.296875 },
  { x: 0.015625, y: 0.328125 },
  { x: 0.015625, y: 0.328125 },
  { x: 0.046875, y: 0.328125 },
  { x: 0.046875, y: 0.328125 },
  { x: 0.078125, y: 0.328125 },
  { x: 0.078125, y: 0.328125 },
  { x: 0.109375, y: 0.328125 },
  { x: 0.109375, y: 0.328125 },
  { x: 0.140625, y: 0.328125 },
  { x: 0.140625, y: 0.328125 },
  { x: 0.171875, y: 0.328125 },
  { x: 0.171875, y: 0.328125 },
  { x: 0.203125, y: 0.328125 },
  { x: 0.203125, y: 0.328125 },
  { x: 0.234375, y: 0.328125 },
  { x: 0.234375, y: 0.328125 },
  { x: 0.265625, y: 0.328125 },
  { x: 0.265625, y: 0.328125 },
  { x: 0.296875, y: 0.328125 },
  { x: 0.296875, y: 0.328125 },
  { x: 0.328125, y: 0.328125 },
  { x: 0.328125, y: 0.328125 },
  { x: 0.359375, y: 0.328125 },
  { x: 0.359375, y: 0.328125 },
  { x: 0.390625, y: 0.328125 },
  { x: 0.390625, y: 0.328125 },
  { x: 0.421875, y: 0.328125 },
  { x: 0.421875, y: 0.328125 },
  { x: 0.453125, y: 0.328125 },
  { x: 0.453125, y: 0.328125 },
  { x: 0.484375, y: 0.328125 },
  { x: 0.484375, y: 0.328125 },
  { x: 0.515625, y: 0.328125 },
  { x: 0.515625, y: 0.328125 },
  { x: 0.546875, y: 0.328125 },
  { x: 0.546875, y: 0.328125 },
  { x: 0.578125, y: 0.328125 },
  { x: 0.578125, y: 0.328125 },
  { x: 0.609375, y: 0.328125 },
  { x: 0.609375, y: 0.328125 },
  { x: 0.640625, y: 0.328125 },
  { x: 0.640625, y: 0.328125 },
  { x: 0.671875, y: 0.328125 },
  { x: 0.671875, y: 0.328125 },
  { x: 0.703125, y: 0.328125 },
  { x: 0.703125, y: 0.328125 },
  { x: 0.734375, y: 0.328125 },
  { x: 0.734375, y: 0.328125 },
  { x: 0.765625, y: 0.328125 },
  { x: 0.765625, y: 0.328125 },
  { x: 0.796875, y: 0.328125 },
  { x: 0.796875, y: 0.328125 },
  { x: 0.828125, y: 0.328125 },
  { x: 0.828125, y: 0.328125 },
  { x: 0.859375, y: 0.328125 },
  { x: 0.859375, y: 0.328125 },
  { x: 0.890625, y: 0.328125 },
  { x: 0.890625, y: 0.328125 },
  { x: 0.921875, y: 0.328125 },
  { x: 0.921875, y: 0.328125 },
  { x: 0.953125, y: 0.328125 },
  { x: 0.953125, y: 0.328125 },
  { x: 0.984375, y: 0.328125 },
  { x: 0.984375, y: 0.328125 },
  { x: 0.015625, y: 0.359375 },
  { x: 0.015625, y: 0.359375 },
  { x: 0.046875, y: 0.359375 },
  { x: 0.046875, y: 0.359375 },
  { x: 0.078125, y: 0.359375 },
  { x: 0.078125, y: 0.359375 },
  { x: 0.109375, y: 0.359375 },
  { x: 0.109375, y: 0.359375 },
  { x: 0.140625, y: 0.359375 },
  { x: 0.140625, y: 0.359375 },
  { x: 0.171875, y: 0.359375 },
  { x: 0.171875, y: 0.359375 },
  { x: 0.203125, y: 0.359375 },
  { x: 0.203125, y: 0.359375 },
  { x: 0.234375, y: 0.359375 },
  { x: 0.234375, y: 0.359375 },
  { x: 0.265625, y: 0.359375 },
  { x: 0.265625, y: 0.359375 },
  { x: 0.296875, y: 0.359375 },
  { x: 0.296875, y: 0.359375 },
  { x: 0.328125, y: 0.359375 },
  { x: 0.328125, y: 0.359375 },
  { x: 0.359375, y: 0.359375 },
  { x: 0.359375, y: 0.359375 },
  { x: 0.390625, y: 0.359375 },
  { x: 0.390625, y: 0.359375 },
  { x: 0.421875, y: 0.359375 },
  { x: 0.421875, y: 0.359375 },
  { x: 0.453125, y: 0.359375 },
  { x: 0.453125, y: 0.359375 },
  { x: 0.484375, y: 0.359375 },
  { x: 0.484375, y: 0.359375 },
  { x: 0.515625, y: 0.359375 },
  { x: 0.515625, y: 0.359375 },
  { x: 0.546875, y: 0.359375 },
  { x: 0.546875, y: 0.359375 },
  { x: 0.578125, y: 0.359375 },
  { x: 0.578125, y: 0.359375 },
  { x: 0.609375, y: 0.359375 },
  { x: 0.609375, y: 0.359375 },
  { x: 0.640625, y: 0.359375 },
  { x: 0.640625, y: 0.359375 },
  { x: 0.671875, y: 0.359375 },
  { x: 0.671875, y: 0.359375 },
  { x: 0.703125, y: 0.359375 },
  { x: 0.703125, y: 0.359375 },
  { x: 0.734375, y: 0.359375 },
  { x: 0.734375, y: 0.359375 },
  { x: 0.765625, y: 0.359375 },
  { x: 0.765625, y: 0.359375 },
  { x: 0.796875, y: 0.359375 },
  { x: 0.796875, y: 0.359375 },
  { x: 0.828125, y: 0.359375 },
  { x: 0.828125, y: 0.359375 },
  { x: 0.859375, y: 0.359375 },
  { x: 0.859375, y: 0.359375 },
  { x: 0.890625, y: 0.359375 },
  { x: 0.890625, y: 0.359375 },
  { x: 0.921875, y: 0.359375 },
  { x: 0.921875, y: 0.359375 },
  { x: 0.953125, y: 0.359375 },
  { x: 0.953125, y: 0.359375 },
  { x: 0.984375, y: 0.359375 },
  { x: 0.984375, y: 0.359375 },
  { x: 0.015625, y: 0.390625 },
  { x: 0.015625, y: 0.390625 },
  { x: 0.046875, y: 0.390625 },
  { x: 0.046875, y: 0.390625 },
  { x: 0.078125, y: 0.390625 },
  { x: 0.078125, y: 0.390625 },
  { x: 0.109375, y: 0.390625 },
  { x: 0.109375, y: 0.390625 },
  { x: 0.140625, y: 0.390625 },
  { x: 0.140625, y: 0.390625 },
  { x: 0.171875, y: 0.390625 },
  { x: 0.171875, y: 0.390625 },
  { x: 0.203125, y: 0.390625 },
  { x: 0.203125, y: 0.390625 },
  { x: 0.234375, y: 0.390625 },
  { x: 0.234375, y: 0.390625 },
  { x: 0.265625, y: 0.390625 },
  { x: 0.265625, y: 0.390625 },
  { x: 0.296875, y: 0.390625 },
  { x: 0.296875, y: 0.390625 },
  { x: 0.328125, y: 0.390625 },
  { x: 0.328125, y: 0.390625 },
  { x: 0.359375, y: 0.390625 },
  { x: 0.359375, y: 0.390625 },
  { x: 0.390625, y: 0.390625 },
  { x: 0.390625, y: 0.390625 },
  { x: 0.421875, y: 0.390625 },
  { x: 0.421875, y: 0.390625 },
  { x: 0.453125, y: 0.390625 },
  { x: 0.453125, y: 0.390625 },
  { x: 0.484375, y: 0.390625 },
  { x: 0.484375, y: 0.390625 },
  { x: 0.515625, y: 0.390625 },
  { x: 0.515625, y: 0.390625 },
  { x: 0.546875, y: 0.390625 },
  { x: 0.546875, y: 0.390625 },
  { x: 0.578125, y: 0.390625 },
  { x: 0.578125, y: 0.390625 },
  { x: 0.609375, y: 0.390625 },
  { x: 0.609375, y: 0.390625 },
  { x: 0.640625, y: 0.390625 },
  { x: 0.640625, y: 0.390625 },
  { x: 0.671875, y: 0.390625 },
  { x: 0.671875, y: 0.390625 },
  { x: 0.703125, y: 0.390625 },
  { x: 0.703125, y: 0.390625 },
  { x: 0.734375, y: 0.390625 },
  { x: 0.734375, y: 0.390625 },
  { x: 0.765625, y: 0.390625 },
  { x: 0.765625, y: 0.390625 },
  { x: 0.796875, y: 0.390625 },
  { x: 0.796875, y: 0.390625 },
  { x: 0.828125, y: 0.390625 },
  { x: 0.828125, y: 0.390625 },
  { x: 0.859375, y: 0.390625 },
  { x: 0.859375, y: 0.390625 },
  { x: 0.890625, y: 0.390625 },
  { x: 0.890625, y: 0.390625 },
  { x: 0.921875, y: 0.390625 },
  { x: 0.921875, y: 0.390625 },
  { x: 0.953125, y: 0.390625 },
  { x: 0.953125, y: 0.390625 },
  { x: 0.984375, y: 0.390625 },
  { x: 0.984375, y: 0.390625 },
  { x: 0.015625, y: 0.421875 },
  { x: 0.015625, y: 0.421875 },
  { x: 0.046875, y: 0.421875 },
  { x: 0.046875, y: 0.421875 },
  { x: 0.078125, y: 0.421875 },
  { x: 0.078125, y: 0.421875 },
  { x: 0.109375, y: 0.421875 },
  { x: 0.109375, y: 0.421875 },
  { x: 0.140625, y: 0.421875 },
  { x: 0.140625, y: 0.421875 },
  { x: 0.171875, y: 0.421875 },
  { x: 0.171875, y: 0.421875 },
  { x: 0.203125, y: 0.421875 },
  { x: 0.203125, y: 0.421875 },
  { x: 0.234375, y: 0.421875 },
  { x: 0.234375, y: 0.421875 },
  { x: 0.265625, y: 0.421875 },
  { x: 0.265625, y: 0.421875 },
  { x: 0.296875, y: 0.421875 },
  { x: 0.296875, y: 0.421875 },
  { x: 0.328125, y: 0.421875 },
  { x: 0.328125, y: 0.421875 },
  { x: 0.359375, y: 0.421875 },
  { x: 0.359375, y: 0.421875 },
  { x: 0.390625, y: 0.421875 },
  { x: 0.390625, y: 0.421875 },
  { x: 0.421875, y: 0.421875 },
  { x: 0.421875, y: 0.421875 },
  { x: 0.453125, y: 0.421875 },
  { x: 0.453125, y: 0.421875 },
  { x: 0.484375, y: 0.421875 },
  { x: 0.484375, y: 0.421875 },
  { x: 0.515625, y: 0.421875 },
  { x: 0.515625, y: 0.421875 },
  { x: 0.546875, y: 0.421875 },
  { x: 0.546875, y: 0.421875 },
  { x: 0.578125, y: 0.421875 },
  { x: 0.578125, y: 0.421875 },
  { x: 0.609375, y: 0.421875 },
  { x: 0.609375, y: 0.421875 },
  { x: 0.640625, y: 0.421875 },
  { x: 0.640625, y: 0.421875 },
  { x: 0.671875, y: 0.421875 },
  { x: 0.671875, y: 0.421875 },
  { x: 0.703125, y: 0.421875 },
  { x: 0.703125, y: 0.421875 },
  { x: 0.734375, y: 0.421875 },
  { x: 0.734375, y: 0.421875 },
  { x: 0.765625, y: 0.421875 },
  { x: 0.765625, y: 0.421875 },
  { x: 0.796875, y: 0.421875 },
  { x: 0.796875, y: 0.421875 },
  { x: 0.828125, y: 0.421875 },
  { x: 0.828125, y: 0.421875 },
  { x: 0.859375, y: 0.421875 },
  { x: 0.859375, y: 0.421875 },
  { x: 0.890625, y: 0.421875 },
  { x: 0.890625, y: 0.421875 },
  { x: 0.921875, y: 0.421875 },
  { x: 0.921875, y: 0.421875 },
  { x: 0.953125, y: 0.421875 },
  { x: 0.953125, y: 0.421875 },
  { x: 0.984375, y: 0.421875 },
  { x: 0.984375, y: 0.421875 },
  { x: 0.015625, y: 0.453125 },
  { x: 0.015625, y: 0.453125 },
  { x: 0.046875, y: 0.453125 },
  { x: 0.046875, y: 0.453125 },
  { x: 0.078125, y: 0.453125 },
  { x: 0.078125, y: 0.453125 },
  { x: 0.109375, y: 0.453125 },
  { x: 0.109375, y: 0.453125 },
  { x: 0.140625, y: 0.453125 },
  { x: 0.140625, y: 0.453125 },
  { x: 0.171875, y: 0.453125 },
  { x: 0.171875, y: 0.453125 },
  { x: 0.203125, y: 0.453125 },
  { x: 0.203125, y: 0.453125 },
  { x: 0.234375, y: 0.453125 },
  { x: 0.234375, y: 0.453125 },
  { x: 0.265625, y: 0.453125 },
  { x: 0.265625, y: 0.453125 },
  { x: 0.296875, y: 0.453125 },
  { x: 0.296875, y: 0.453125 },
  { x: 0.328125, y: 0.453125 },
  { x: 0.328125, y: 0.453125 },
  { x: 0.359375, y: 0.453125 },
  { x: 0.359375, y: 0.453125 },
  { x: 0.390625, y: 0.453125 },
  { x: 0.390625, y: 0.453125 },
  { x: 0.421875, y: 0.453125 },
  { x: 0.421875, y: 0.453125 },
  { x: 0.453125, y: 0.453125 },
  { x: 0.453125, y: 0.453125 },
  { x: 0.484375, y: 0.453125 },
  { x: 0.484375, y: 0.453125 },
  { x: 0.515625, y: 0.453125 },
  { x: 0.515625, y: 0.453125 },
  { x: 0.546875, y: 0.453125 },
  { x: 0.546875, y: 0.453125 },
  { x: 0.578125, y: 0.453125 },
  { x: 0.578125, y: 0.453125 },
  { x: 0.609375, y: 0.453125 },
  { x: 0.609375, y: 0.453125 },
  { x: 0.640625, y: 0.453125 },
  { x: 0.640625, y: 0.453125 },
  { x: 0.671875, y: 0.453125 },
  { x: 0.671875, y: 0.453125 },
  { x: 0.703125, y: 0.453125 },
  { x: 0.703125, y: 0.453125 },
  { x: 0.734375, y: 0.453125 },
  { x: 0.734375, y: 0.453125 },
  { x: 0.765625, y: 0.453125 },
  { x: 0.765625, y: 0.453125 },
  { x: 0.796875, y: 0.453125 },
  { x: 0.796875, y: 0.453125 },
  { x: 0.828125, y: 0.453125 },
  { x: 0.828125, y: 0.453125 },
  { x: 0.859375, y: 0.453125 },
  { x: 0.859375, y: 0.453125 },
  { x: 0.890625, y: 0.453125 },
  { x: 0.890625, y: 0.453125 },
  { x: 0.921875, y: 0.453125 },
  { x: 0.921875, y: 0.453125 },
  { x: 0.953125, y: 0.453125 },
  { x: 0.953125, y: 0.453125 },
  { x: 0.984375, y: 0.453125 },
  { x: 0.984375, y: 0.453125 },
  { x: 0.015625, y: 0.484375 },
  { x: 0.015625, y: 0.484375 },
  { x: 0.046875, y: 0.484375 },
  { x: 0.046875, y: 0.484375 },
  { x: 0.078125, y: 0.484375 },
  { x: 0.078125, y: 0.484375 },
  { x: 0.109375, y: 0.484375 },
  { x: 0.109375, y: 0.484375 },
  { x: 0.140625, y: 0.484375 },
  { x: 0.140625, y: 0.484375 },
  { x: 0.171875, y: 0.484375 },
  { x: 0.171875, y: 0.484375 },
  { x: 0.203125, y: 0.484375 },
  { x: 0.203125, y: 0.484375 },
  { x: 0.234375, y: 0.484375 },
  { x: 0.234375, y: 0.484375 },
  { x: 0.265625, y: 0.484375 },
  { x: 0.265625, y: 0.484375 },
  { x: 0.296875, y: 0.484375 },
  { x: 0.296875, y: 0.484375 },
  { x: 0.328125, y: 0.484375 },
  { x: 0.328125, y: 0.484375 },
  { x: 0.359375, y: 0.484375 },
  { x: 0.359375, y: 0.484375 },
  { x: 0.390625, y: 0.484375 },
  { x: 0.390625, y: 0.484375 },
  { x: 0.421875, y: 0.484375 },
  { x: 0.421875, y: 0.484375 },
  { x: 0.453125, y: 0.484375 },
  { x: 0.453125, y: 0.484375 },
  { x: 0.484375, y: 0.484375 },
  { x: 0.484375, y: 0.484375 },
  { x: 0.515625, y: 0.484375 },
  { x: 0.515625, y: 0.484375 },
  { x: 0.546875, y: 0.484375 },
  { x: 0.546875, y: 0.484375 },
  { x: 0.578125, y: 0.484375 },
  { x: 0.578125, y: 0.484375 },
  { x: 0.609375, y: 0.484375 },
  { x: 0.609375, y: 0.484375 },
  { x: 0.640625, y: 0.484375 },
  { x: 0.640625, y: 0.484375 },
  { x: 0.671875, y: 0.484375 },
  { x: 0.671875, y: 0.484375 },
  { x: 0.703125, y: 0.484375 },
  { x: 0.703125, y: 0.484375 },
  { x: 0.734375, y: 0.484375 },
  { x: 0.734375, y: 0.484375 },
  { x: 0.765625, y: 0.484375 },
  { x: 0.765625, y: 0.484375 },
  { x: 0.796875, y: 0.484375 },
  { x: 0.796875, y: 0.484375 },
  { x: 0.828125, y: 0.484375 },
  { x: 0.828125, y: 0.484375 },
  { x: 0.859375, y: 0.484375 },
  { x: 0.859375, y: 0.484375 },
  { x: 0.890625, y: 0.484375 },
  { x: 0.890625, y: 0.484375 },
  { x: 0.921875, y: 0.484375 },
  { x: 0.921875, y: 0.484375 },
  { x: 0.953125, y: 0.484375 },
  { x: 0.953125, y: 0.484375 },
  { x: 0.984375, y: 0.484375 },
  { x: 0.984375, y: 0.484375 },
  { x: 0.015625, y: 0.515625 },
  { x: 0.015625, y: 0.515625 },
  { x: 0.046875, y: 0.515625 },
  { x: 0.046875, y: 0.515625 },
  { x: 0.078125, y: 0.515625 },
  { x: 0.078125, y: 0.515625 },
  { x: 0.109375, y: 0.515625 },
  { x: 0.109375, y: 0.515625 },
  { x: 0.140625, y: 0.515625 },
  { x: 0.140625, y: 0.515625 },
  { x: 0.171875, y: 0.515625 },
  { x: 0.171875, y: 0.515625 },
  { x: 0.203125, y: 0.515625 },
  { x: 0.203125, y: 0.515625 },
  { x: 0.234375, y: 0.515625 },
  { x: 0.234375, y: 0.515625 },
  { x: 0.265625, y: 0.515625 },
  { x: 0.265625, y: 0.515625 },
  { x: 0.296875, y: 0.515625 },
  { x: 0.296875, y: 0.515625 },
  { x: 0.328125, y: 0.515625 },
  { x: 0.328125, y: 0.515625 },
  { x: 0.359375, y: 0.515625 },
  { x: 0.359375, y: 0.515625 },
  { x: 0.390625, y: 0.515625 },
  { x: 0.390625, y: 0.515625 },
  { x: 0.421875, y: 0.515625 },
  { x: 0.421875, y: 0.515625 },
  { x: 0.453125, y: 0.515625 },
  { x: 0.453125, y: 0.515625 },
  { x: 0.484375, y: 0.515625 },
  { x: 0.484375, y: 0.515625 },
  { x: 0.515625, y: 0.515625 },
  { x: 0.515625, y: 0.515625 },
  { x: 0.546875, y: 0.515625 },
  { x: 0.546875, y: 0.515625 },
  { x: 0.578125, y: 0.515625 },
  { x: 0.578125, y: 0.515625 },
  { x: 0.609375, y: 0.515625 },
  { x: 0.609375, y: 0.515625 },
  { x: 0.640625, y: 0.515625 },
  { x: 0.640625, y: 0.515625 },
  { x: 0.671875, y: 0.515625 },
  { x: 0.671875, y: 0.515625 },
  { x: 0.703125, y: 0.515625 },
  { x: 0.703125, y: 0.515625 },
  { x: 0.734375, y: 0.515625 },
  { x: 0.734375, y: 0.515625 },
  { x: 0.765625, y: 0.515625 },
  { x: 0.765625, y: 0.515625 },
  { x: 0.796875, y: 0.515625 },
  { x: 0.796875, y: 0.515625 },
  { x: 0.828125, y: 0.515625 },
  { x: 0.828125, y: 0.515625 },
  { x: 0.859375, y: 0.515625 },
  { x: 0.859375, y: 0.515625 },
  { x: 0.890625, y: 0.515625 },
  { x: 0.890625, y: 0.515625 },
  { x: 0.921875, y: 0.515625 },
  { x: 0.921875, y: 0.515625 },
  { x: 0.953125, y: 0.515625 },
  { x: 0.953125, y: 0.515625 },
  { x: 0.984375, y: 0.515625 },
  { x: 0.984375, y: 0.515625 },
  { x: 0.015625, y: 0.546875 },
  { x: 0.015625, y: 0.546875 },
  { x: 0.046875, y: 0.546875 },
  { x: 0.046875, y: 0.546875 },
  { x: 0.078125, y: 0.546875 },
  { x: 0.078125, y: 0.546875 },
  { x: 0.109375, y: 0.546875 },
  { x: 0.109375, y: 0.546875 },
  { x: 0.140625, y: 0.546875 },
  { x: 0.140625, y: 0.546875 },
  { x: 0.171875, y: 0.546875 },
  { x: 0.171875, y: 0.546875 },
  { x: 0.203125, y: 0.546875 },
  { x: 0.203125, y: 0.546875 },
  { x: 0.234375, y: 0.546875 },
  { x: 0.234375, y: 0.546875 },
  { x: 0.265625, y: 0.546875 },
  { x: 0.265625, y: 0.546875 },
  { x: 0.296875, y: 0.546875 },
  { x: 0.296875, y: 0.546875 },
  { x: 0.328125, y: 0.546875 },
  { x: 0.328125, y: 0.546875 },
  { x: 0.359375, y: 0.546875 },
  { x: 0.359375, y: 0.546875 },
  { x: 0.390625, y: 0.546875 },
  { x: 0.390625, y: 0.546875 },
  { x: 0.421875, y: 0.546875 },
  { x: 0.421875, y: 0.546875 },
  { x: 0.453125, y: 0.546875 },
  { x: 0.453125, y: 0.546875 },
  { x: 0.484375, y: 0.546875 },
  { x: 0.484375, y: 0.546875 },
  { x: 0.515625, y: 0.546875 },
  { x: 0.515625, y: 0.546875 },
  { x: 0.546875, y: 0.546875 },
  { x: 0.546875, y: 0.546875 },
  { x: 0.578125, y: 0.546875 },
  { x: 0.578125, y: 0.546875 },
  { x: 0.609375, y: 0.546875 },
  { x: 0.609375, y: 0.546875 },
  { x: 0.640625, y: 0.546875 },
  { x: 0.640625, y: 0.546875 },
  { x: 0.671875, y: 0.546875 },
  { x: 0.671875, y: 0.546875 },
  { x: 0.703125, y: 0.546875 },
  { x: 0.703125, y: 0.546875 },
  { x: 0.734375, y: 0.546875 },
  { x: 0.734375, y: 0.546875 },
  { x: 0.765625, y: 0.546875 },
  { x: 0.765625, y: 0.546875 },
  { x: 0.796875, y: 0.546875 },
  { x: 0.796875, y: 0.546875 },
  { x: 0.828125, y: 0.546875 },
  { x: 0.828125, y: 0.546875 },
  { x: 0.859375, y: 0.546875 },
  { x: 0.859375, y: 0.546875 },
  { x: 0.890625, y: 0.546875 },
  { x: 0.890625, y: 0.546875 },
  { x: 0.921875, y: 0.546875 },
  { x: 0.921875, y: 0.546875 },
  { x: 0.953125, y: 0.546875 },
  { x: 0.953125, y: 0.546875 },
  { x: 0.984375, y: 0.546875 },
  { x: 0.984375, y: 0.546875 },
  { x: 0.015625, y: 0.578125 },
  { x: 0.015625, y: 0.578125 },
  { x: 0.046875, y: 0.578125 },
  { x: 0.046875, y: 0.578125 },
  { x: 0.078125, y: 0.578125 },
  { x: 0.078125, y: 0.578125 },
  { x: 0.109375, y: 0.578125 },
  { x: 0.109375, y: 0.578125 },
  { x: 0.140625, y: 0.578125 },
  { x: 0.140625, y: 0.578125 },
  { x: 0.171875, y: 0.578125 },
  { x: 0.171875, y: 0.578125 },
  { x: 0.203125, y: 0.578125 },
  { x: 0.203125, y: 0.578125 },
  { x: 0.234375, y: 0.578125 },
  { x: 0.234375, y: 0.578125 },
  { x: 0.265625, y: 0.578125 },
  { x: 0.265625, y: 0.578125 },
  { x: 0.296875, y: 0.578125 },
  { x: 0.296875, y: 0.578125 },
  { x: 0.328125, y: 0.578125 },
  { x: 0.328125, y: 0.578125 },
  { x: 0.359375, y: 0.578125 },
  { x: 0.359375, y: 0.578125 },
  { x: 0.390625, y: 0.578125 },
  { x: 0.390625, y: 0.578125 },
  { x: 0.421875, y: 0.578125 },
  { x: 0.421875, y: 0.578125 },
  { x: 0.453125, y: 0.578125 },
  { x: 0.453125, y: 0.578125 },
  { x: 0.484375, y: 0.578125 },
  { x: 0.484375, y: 0.578125 },
  { x: 0.515625, y: 0.578125 },
  { x: 0.515625, y: 0.578125 },
  { x: 0.546875, y: 0.578125 },
  { x: 0.546875, y: 0.578125 },
  { x: 0.578125, y: 0.578125 },
  { x: 0.578125, y: 0.578125 },
  { x: 0.609375, y: 0.578125 },
  { x: 0.609375, y: 0.578125 },
  { x: 0.640625, y: 0.578125 },
  { x: 0.640625, y: 0.578125 },
  { x: 0.671875, y: 0.578125 },
  { x: 0.671875, y: 0.578125 },
  { x: 0.703125, y: 0.578125 },
  { x: 0.703125, y: 0.578125 },
  { x: 0.734375, y: 0.578125 },
  { x: 0.734375, y: 0.578125 },
  { x: 0.765625, y: 0.578125 },
  { x: 0.765625, y: 0.578125 },
  { x: 0.796875, y: 0.578125 },
  { x: 0.796875, y: 0.578125 },
  { x: 0.828125, y: 0.578125 },
  { x: 0.828125, y: 0.578125 },
  { x: 0.859375, y: 0.578125 },
  { x: 0.859375, y: 0.578125 },
  { x: 0.890625, y: 0.578125 },
  { x: 0.890625, y: 0.578125 },
  { x: 0.921875, y: 0.578125 },
  { x: 0.921875, y: 0.578125 },
  { x: 0.953125, y: 0.578125 },
  { x: 0.953125, y: 0.578125 },
  { x: 0.984375, y: 0.578125 },
  { x: 0.984375, y: 0.578125 },
  { x: 0.015625, y: 0.609375 },
  { x: 0.015625, y: 0.609375 },
  { x: 0.046875, y: 0.609375 },
  { x: 0.046875, y: 0.609375 },
  { x: 0.078125, y: 0.609375 },
  { x: 0.078125, y: 0.609375 },
  { x: 0.109375, y: 0.609375 },
  { x: 0.109375, y: 0.609375 },
  { x: 0.140625, y: 0.609375 },
  { x: 0.140625, y: 0.609375 },
  { x: 0.171875, y: 0.609375 },
  { x: 0.171875, y: 0.609375 },
  { x: 0.203125, y: 0.609375 },
  { x: 0.203125, y: 0.609375 },
  { x: 0.234375, y: 0.609375 },
  { x: 0.234375, y: 0.609375 },
  { x: 0.265625, y: 0.609375 },
  { x: 0.265625, y: 0.609375 },
  { x: 0.296875, y: 0.609375 },
  { x: 0.296875, y: 0.609375 },
  { x: 0.328125, y: 0.609375 },
  { x: 0.328125, y: 0.609375 },
  { x: 0.359375, y: 0.609375 },
  { x: 0.359375, y: 0.609375 },
  { x: 0.390625, y: 0.609375 },
  { x: 0.390625, y: 0.609375 },
  { x: 0.421875, y: 0.609375 },
  { x: 0.421875, y: 0.609375 },
  { x: 0.453125, y: 0.609375 },
  { x: 0.453125, y: 0.609375 },
  { x: 0.484375, y: 0.609375 },
  { x: 0.484375, y: 0.609375 },
  { x: 0.515625, y: 0.609375 },
  { x: 0.515625, y: 0.609375 },
  { x: 0.546875, y: 0.609375 },
  { x: 0.546875, y: 0.609375 },
  { x: 0.578125, y: 0.609375 },
  { x: 0.578125, y: 0.609375 },
  { x: 0.609375, y: 0.609375 },
  { x: 0.609375, y: 0.609375 },
  { x: 0.640625, y: 0.609375 },
  { x: 0.640625, y: 0.609375 },
  { x: 0.671875, y: 0.609375 },
  { x: 0.671875, y: 0.609375 },
  { x: 0.703125, y: 0.609375 },
  { x: 0.703125, y: 0.609375 },
  { x: 0.734375, y: 0.609375 },
  { x: 0.734375, y: 0.609375 },
  { x: 0.765625, y: 0.609375 },
  { x: 0.765625, y: 0.609375 },
  { x: 0.796875, y: 0.609375 },
  { x: 0.796875, y: 0.609375 },
  { x: 0.828125, y: 0.609375 },
  { x: 0.828125, y: 0.609375 },
  { x: 0.859375, y: 0.609375 },
  { x: 0.859375, y: 0.609375 },
  { x: 0.890625, y: 0.609375 },
  { x: 0.890625, y: 0.609375 },
  { x: 0.921875, y: 0.609375 },
  { x: 0.921875, y: 0.609375 },
  { x: 0.953125, y: 0.609375 },
  { x: 0.953125, y: 0.609375 },
  { x: 0.984375, y: 0.609375 },
  { x: 0.984375, y: 0.609375 },
  { x: 0.015625, y: 0.640625 },
  { x: 0.015625, y: 0.640625 },
  { x: 0.046875, y: 0.640625 },
  { x: 0.046875, y: 0.640625 },
  { x: 0.078125, y: 0.640625 },
  { x: 0.078125, y: 0.640625 },
  { x: 0.109375, y: 0.640625 },
  { x: 0.109375, y: 0.640625 },
  { x: 0.140625, y: 0.640625 },
  { x: 0.140625, y: 0.640625 },
  { x: 0.171875, y: 0.640625 },
  { x: 0.171875, y: 0.640625 },
  { x: 0.203125, y: 0.640625 },
  { x: 0.203125, y: 0.640625 },
  { x: 0.234375, y: 0.640625 },
  { x: 0.234375, y: 0.640625 },
  { x: 0.265625, y: 0.640625 },
  { x: 0.265625, y: 0.640625 },
  { x: 0.296875, y: 0.640625 },
  { x: 0.296875, y: 0.640625 },
  { x: 0.328125, y: 0.640625 },
  { x: 0.328125, y: 0.640625 },
  { x: 0.359375, y: 0.640625 },
  { x: 0.359375, y: 0.640625 },
  { x: 0.390625, y: 0.640625 },
  { x: 0.390625, y: 0.640625 },
  { x: 0.421875, y: 0.640625 },
  { x: 0.421875, y: 0.640625 },
  { x: 0.453125, y: 0.640625 },
  { x: 0.453125, y: 0.640625 },
  { x: 0.484375, y: 0.640625 },
  { x: 0.484375, y: 0.640625 },
  { x: 0.515625, y: 0.640625 },
  { x: 0.515625, y: 0.640625 },
  { x: 0.546875, y: 0.640625 },
  { x: 0.546875, y: 0.640625 },
  { x: 0.578125, y: 0.640625 },
  { x: 0.578125, y: 0.640625 },
  { x: 0.609375, y: 0.640625 },
  { x: 0.609375, y: 0.640625 },
  { x: 0.640625, y: 0.640625 },
  { x: 0.640625, y: 0.640625 },
  { x: 0.671875, y: 0.640625 },
  { x: 0.671875, y: 0.640625 },
  { x: 0.703125, y: 0.640625 },
  { x: 0.703125, y: 0.640625 },
  { x: 0.734375, y: 0.640625 },
  { x: 0.734375, y: 0.640625 },
  { x: 0.765625, y: 0.640625 },
  { x: 0.765625, y: 0.640625 },
  { x: 0.796875, y: 0.640625 },
  { x: 0.796875, y: 0.640625 },
  { x: 0.828125, y: 0.640625 },
  { x: 0.828125, y: 0.640625 },
  { x: 0.859375, y: 0.640625 },
  { x: 0.859375, y: 0.640625 },
  { x: 0.890625, y: 0.640625 },
  { x: 0.890625, y: 0.640625 },
  { x: 0.921875, y: 0.640625 },
  { x: 0.921875, y: 0.640625 },
  { x: 0.953125, y: 0.640625 },
  { x: 0.953125, y: 0.640625 },
  { x: 0.984375, y: 0.640625 },
  { x: 0.984375, y: 0.640625 },
  { x: 0.015625, y: 0.671875 },
  { x: 0.015625, y: 0.671875 },
  { x: 0.046875, y: 0.671875 },
  { x: 0.046875, y: 0.671875 },
  { x: 0.078125, y: 0.671875 },
  { x: 0.078125, y: 0.671875 },
  { x: 0.109375, y: 0.671875 },
  { x: 0.109375, y: 0.671875 },
  { x: 0.140625, y: 0.671875 },
  { x: 0.140625, y: 0.671875 },
  { x: 0.171875, y: 0.671875 },
  { x: 0.171875, y: 0.671875 },
  { x: 0.203125, y: 0.671875 },
  { x: 0.203125, y: 0.671875 },
  { x: 0.234375, y: 0.671875 },
  { x: 0.234375, y: 0.671875 },
  { x: 0.265625, y: 0.671875 },
  { x: 0.265625, y: 0.671875 },
  { x: 0.296875, y: 0.671875 },
  { x: 0.296875, y: 0.671875 },
  { x: 0.328125, y: 0.671875 },
  { x: 0.328125, y: 0.671875 },
  { x: 0.359375, y: 0.671875 },
  { x: 0.359375, y: 0.671875 },
  { x: 0.390625, y: 0.671875 },
  { x: 0.390625, y: 0.671875 },
  { x: 0.421875, y: 0.671875 },
  { x: 0.421875, y: 0.671875 },
  { x: 0.453125, y: 0.671875 },
  { x: 0.453125, y: 0.671875 },
  { x: 0.484375, y: 0.671875 },
  { x: 0.484375, y: 0.671875 },
  { x: 0.515625, y: 0.671875 },
  { x: 0.515625, y: 0.671875 },
  { x: 0.546875, y: 0.671875 },
  { x: 0.546875, y: 0.671875 },
  { x: 0.578125, y: 0.671875 },
  { x: 0.578125, y: 0.671875 },
  { x: 0.609375, y: 0.671875 },
  { x: 0.609375, y: 0.671875 },
  { x: 0.640625, y: 0.671875 },
  { x: 0.640625, y: 0.671875 },
  { x: 0.671875, y: 0.671875 },
  { x: 0.671875, y: 0.671875 },
  { x: 0.703125, y: 0.671875 },
  { x: 0.703125, y: 0.671875 },
  { x: 0.734375, y: 0.671875 },
  { x: 0.734375, y: 0.671875 },
  { x: 0.765625, y: 0.671875 },
  { x: 0.765625, y: 0.671875 },
  { x: 0.796875, y: 0.671875 },
  { x: 0.796875, y: 0.671875 },
  { x: 0.828125, y: 0.671875 },
  { x: 0.828125, y: 0.671875 },
  { x: 0.859375, y: 0.671875 },
  { x: 0.859375, y: 0.671875 },
  { x: 0.890625, y: 0.671875 },
  { x: 0.890625, y: 0.671875 },
  { x: 0.921875, y: 0.671875 },
  { x: 0.921875, y: 0.671875 },
  { x: 0.953125, y: 0.671875 },
  { x: 0.953125, y: 0.671875 },
  { x: 0.984375, y: 0.671875 },
  { x: 0.984375, y: 0.671875 },
  { x: 0.015625, y: 0.703125 },
  { x: 0.015625, y: 0.703125 },
  { x: 0.046875, y: 0.703125 },
  { x: 0.046875, y: 0.703125 },
  { x: 0.078125, y: 0.703125 },
  { x: 0.078125, y: 0.703125 },
  { x: 0.109375, y: 0.703125 },
  { x: 0.109375, y: 0.703125 },
  { x: 0.140625, y: 0.703125 },
  { x: 0.140625, y: 0.703125 },
  { x: 0.171875, y: 0.703125 },
  { x: 0.171875, y: 0.703125 },
  { x: 0.203125, y: 0.703125 },
  { x: 0.203125, y: 0.703125 },
  { x: 0.234375, y: 0.703125 },
  { x: 0.234375, y: 0.703125 },
  { x: 0.265625, y: 0.703125 },
  { x: 0.265625, y: 0.703125 },
  { x: 0.296875, y: 0.703125 },
  { x: 0.296875, y: 0.703125 },
  { x: 0.328125, y: 0.703125 },
  { x: 0.328125, y: 0.703125 },
  { x: 0.359375, y: 0.703125 },
  { x: 0.359375, y: 0.703125 },
  { x: 0.390625, y: 0.703125 },
  { x: 0.390625, y: 0.703125 },
  { x: 0.421875, y: 0.703125 },
  { x: 0.421875, y: 0.703125 },
  { x: 0.453125, y: 0.703125 },
  { x: 0.453125, y: 0.703125 },
  { x: 0.484375, y: 0.703125 },
  { x: 0.484375, y: 0.703125 },
  { x: 0.515625, y: 0.703125 },
  { x: 0.515625, y: 0.703125 },
  { x: 0.546875, y: 0.703125 },
  { x: 0.546875, y: 0.703125 },
  { x: 0.578125, y: 0.703125 },
  { x: 0.578125, y: 0.703125 },
  { x: 0.609375, y: 0.703125 },
  { x: 0.609375, y: 0.703125 },
  { x: 0.640625, y: 0.703125 },
  { x: 0.640625, y: 0.703125 },
  { x: 0.671875, y: 0.703125 },
  { x: 0.671875, y: 0.703125 },
  { x: 0.703125, y: 0.703125 },
  { x: 0.703125, y: 0.703125 },
  { x: 0.734375, y: 0.703125 },
  { x: 0.734375, y: 0.703125 },
  { x: 0.765625, y: 0.703125 },
  { x: 0.765625, y: 0.703125 },
  { x: 0.796875, y: 0.703125 },
  { x: 0.796875, y: 0.703125 },
  { x: 0.828125, y: 0.703125 },
  { x: 0.828125, y: 0.703125 },
  { x: 0.859375, y: 0.703125 },
  { x: 0.859375, y: 0.703125 },
  { x: 0.890625, y: 0.703125 },
  { x: 0.890625, y: 0.703125 },
  { x: 0.921875, y: 0.703125 },
  { x: 0.921875, y: 0.703125 },
  { x: 0.953125, y: 0.703125 },
  { x: 0.953125, y: 0.703125 },
  { x: 0.984375, y: 0.703125 },
  { x: 0.984375, y: 0.703125 },
  { x: 0.015625, y: 0.734375 },
  { x: 0.015625, y: 0.734375 },
  { x: 0.046875, y: 0.734375 },
  { x: 0.046875, y: 0.734375 },
  { x: 0.078125, y: 0.734375 },
  { x: 0.078125, y: 0.734375 },
  { x: 0.109375, y: 0.734375 },
  { x: 0.109375, y: 0.734375 },
  { x: 0.140625, y: 0.734375 },
  { x: 0.140625, y: 0.734375 },
  { x: 0.171875, y: 0.734375 },
  { x: 0.171875, y: 0.734375 },
  { x: 0.203125, y: 0.734375 },
  { x: 0.203125, y: 0.734375 },
  { x: 0.234375, y: 0.734375 },
  { x: 0.234375, y: 0.734375 },
  { x: 0.265625, y: 0.734375 },
  { x: 0.265625, y: 0.734375 },
  { x: 0.296875, y: 0.734375 },
  { x: 0.296875, y: 0.734375 },
  { x: 0.328125, y: 0.734375 },
  { x: 0.328125, y: 0.734375 },
  { x: 0.359375, y: 0.734375 },
  { x: 0.359375, y: 0.734375 },
  { x: 0.390625, y: 0.734375 },
  { x: 0.390625, y: 0.734375 },
  { x: 0.421875, y: 0.734375 },
  { x: 0.421875, y: 0.734375 },
  { x: 0.453125, y: 0.734375 },
  { x: 0.453125, y: 0.734375 },
  { x: 0.484375, y: 0.734375 },
  { x: 0.484375, y: 0.734375 },
  { x: 0.515625, y: 0.734375 },
  { x: 0.515625, y: 0.734375 },
  { x: 0.546875, y: 0.734375 },
  { x: 0.546875, y: 0.734375 },
  { x: 0.578125, y: 0.734375 },
  { x: 0.578125, y: 0.734375 },
  { x: 0.609375, y: 0.734375 },
  { x: 0.609375, y: 0.734375 },
  { x: 0.640625, y: 0.734375 },
  { x: 0.640625, y: 0.734375 },
  { x: 0.671875, y: 0.734375 },
  { x: 0.671875, y: 0.734375 },
  { x: 0.703125, y: 0.734375 },
  { x: 0.703125, y: 0.734375 },
  { x: 0.734375, y: 0.734375 },
  { x: 0.734375, y: 0.734375 },
  { x: 0.765625, y: 0.734375 },
  { x: 0.765625, y: 0.734375 },
  { x: 0.796875, y: 0.734375 },
  { x: 0.796875, y: 0.734375 },
  { x: 0.828125, y: 0.734375 },
  { x: 0.828125, y: 0.734375 },
  { x: 0.859375, y: 0.734375 },
  { x: 0.859375, y: 0.734375 },
  { x: 0.890625, y: 0.734375 },
  { x: 0.890625, y: 0.734375 },
  { x: 0.921875, y: 0.734375 },
  { x: 0.921875, y: 0.734375 },
  { x: 0.953125, y: 0.734375 },
  { x: 0.953125, y: 0.734375 },
  { x: 0.984375, y: 0.734375 },
  { x: 0.984375, y: 0.734375 },
  { x: 0.015625, y: 0.765625 },
  { x: 0.015625, y: 0.765625 },
  { x: 0.046875, y: 0.765625 },
  { x: 0.046875, y: 0.765625 },
  { x: 0.078125, y: 0.765625 },
  { x: 0.078125, y: 0.765625 },
  { x: 0.109375, y: 0.765625 },
  { x: 0.109375, y: 0.765625 },
  { x: 0.140625, y: 0.765625 },
  { x: 0.140625, y: 0.765625 },
  { x: 0.171875, y: 0.765625 },
  { x: 0.171875, y: 0.765625 },
  { x: 0.203125, y: 0.765625 },
  { x: 0.203125, y: 0.765625 },
  { x: 0.234375, y: 0.765625 },
  { x: 0.234375, y: 0.765625 },
  { x: 0.265625, y: 0.765625 },
  { x: 0.265625, y: 0.765625 },
  { x: 0.296875, y: 0.765625 },
  { x: 0.296875, y: 0.765625 },
  { x: 0.328125, y: 0.765625 },
  { x: 0.328125, y: 0.765625 },
  { x: 0.359375, y: 0.765625 },
  { x: 0.359375, y: 0.765625 },
  { x: 0.390625, y: 0.765625 },
  { x: 0.390625, y: 0.765625 },
  { x: 0.421875, y: 0.765625 },
  { x: 0.421875, y: 0.765625 },
  { x: 0.453125, y: 0.765625 },
  { x: 0.453125, y: 0.765625 },
  { x: 0.484375, y: 0.765625 },
  { x: 0.484375, y: 0.765625 },
  { x: 0.515625, y: 0.765625 },
  { x: 0.515625, y: 0.765625 },
  { x: 0.546875, y: 0.765625 },
  { x: 0.546875, y: 0.765625 },
  { x: 0.578125, y: 0.765625 },
  { x: 0.578125, y: 0.765625 },
  { x: 0.609375, y: 0.765625 },
  { x: 0.609375, y: 0.765625 },
  { x: 0.640625, y: 0.765625 },
  { x: 0.640625, y: 0.765625 },
  { x: 0.671875, y: 0.765625 },
  { x: 0.671875, y: 0.765625 },
  { x: 0.703125, y: 0.765625 },
  { x: 0.703125, y: 0.765625 },
  { x: 0.734375, y: 0.765625 },
  { x: 0.734375, y: 0.765625 },
  { x: 0.765625, y: 0.765625 },
  { x: 0.765625, y: 0.765625 },
  { x: 0.796875, y: 0.765625 },
  { x: 0.796875, y: 0.765625 },
  { x: 0.828125, y: 0.765625 },
  { x: 0.828125, y: 0.765625 },
  { x: 0.859375, y: 0.765625 },
  { x: 0.859375, y: 0.765625 },
  { x: 0.890625, y: 0.765625 },
  { x: 0.890625, y: 0.765625 },
  { x: 0.921875, y: 0.765625 },
  { x: 0.921875, y: 0.765625 },
  { x: 0.953125, y: 0.765625 },
  { x: 0.953125, y: 0.765625 },
  { x: 0.984375, y: 0.765625 },
  { x: 0.984375, y: 0.765625 },
  { x: 0.015625, y: 0.796875 },
  { x: 0.015625, y: 0.796875 },
  { x: 0.046875, y: 0.796875 },
  { x: 0.046875, y: 0.796875 },
  { x: 0.078125, y: 0.796875 },
  { x: 0.078125, y: 0.796875 },
  { x: 0.109375, y: 0.796875 },
  { x: 0.109375, y: 0.796875 },
  { x: 0.140625, y: 0.796875 },
  { x: 0.140625, y: 0.796875 },
  { x: 0.171875, y: 0.796875 },
  { x: 0.171875, y: 0.796875 },
  { x: 0.203125, y: 0.796875 },
  { x: 0.203125, y: 0.796875 },
  { x: 0.234375, y: 0.796875 },
  { x: 0.234375, y: 0.796875 },
  { x: 0.265625, y: 0.796875 },
  { x: 0.265625, y: 0.796875 },
  { x: 0.296875, y: 0.796875 },
  { x: 0.296875, y: 0.796875 },
  { x: 0.328125, y: 0.796875 },
  { x: 0.328125, y: 0.796875 },
  { x: 0.359375, y: 0.796875 },
  { x: 0.359375, y: 0.796875 },
  { x: 0.390625, y: 0.796875 },
  { x: 0.390625, y: 0.796875 },
  { x: 0.421875, y: 0.796875 },
  { x: 0.421875, y: 0.796875 },
  { x: 0.453125, y: 0.796875 },
  { x: 0.453125, y: 0.796875 },
  { x: 0.484375, y: 0.796875 },
  { x: 0.484375, y: 0.796875 },
  { x: 0.515625, y: 0.796875 },
  { x: 0.515625, y: 0.796875 },
  { x: 0.546875, y: 0.796875 },
  { x: 0.546875, y: 0.796875 },
  { x: 0.578125, y: 0.796875 },
  { x: 0.578125, y: 0.796875 },
  { x: 0.609375, y: 0.796875 },
  { x: 0.609375, y: 0.796875 },
  { x: 0.640625, y: 0.796875 },
  { x: 0.640625, y: 0.796875 },
  { x: 0.671875, y: 0.796875 },
  { x: 0.671875, y: 0.796875 },
  { x: 0.703125, y: 0.796875 },
  { x: 0.703125, y: 0.796875 },
  { x: 0.734375, y: 0.796875 },
  { x: 0.734375, y: 0.796875 },
  { x: 0.765625, y: 0.796875 },
  { x: 0.765625, y: 0.796875 },
  { x: 0.796875, y: 0.796875 },
  { x: 0.796875, y: 0.796875 },
  { x: 0.828125, y: 0.796875 },
  { x: 0.828125, y: 0.796875 },
  { x: 0.859375, y: 0.796875 },
  { x: 0.859375, y: 0.796875 },
  { x: 0.890625, y: 0.796875 },
  { x: 0.890625, y: 0.796875 },
  { x: 0.921875, y: 0.796875 },
  { x: 0.921875, y: 0.796875 },
  { x: 0.953125, y: 0.796875 },
  { x: 0.953125, y: 0.796875 },
  { x: 0.984375, y: 0.796875 },
  { x: 0.984375, y: 0.796875 },
  { x: 0.015625, y: 0.828125 },
  { x: 0.015625, y: 0.828125 },
  { x: 0.046875, y: 0.828125 },
  { x: 0.046875, y: 0.828125 },
  { x: 0.078125, y: 0.828125 },
  { x: 0.078125, y: 0.828125 },
  { x: 0.109375, y: 0.828125 },
  { x: 0.109375, y: 0.828125 },
  { x: 0.140625, y: 0.828125 },
  { x: 0.140625, y: 0.828125 },
  { x: 0.171875, y: 0.828125 },
  { x: 0.171875, y: 0.828125 },
  { x: 0.203125, y: 0.828125 },
  { x: 0.203125, y: 0.828125 },
  { x: 0.234375, y: 0.828125 },
  { x: 0.234375, y: 0.828125 },
  { x: 0.265625, y: 0.828125 },
  { x: 0.265625, y: 0.828125 },
  { x: 0.296875, y: 0.828125 },
  { x: 0.296875, y: 0.828125 },
  { x: 0.328125, y: 0.828125 },
  { x: 0.328125, y: 0.828125 },
  { x: 0.359375, y: 0.828125 },
  { x: 0.359375, y: 0.828125 },
  { x: 0.390625, y: 0.828125 },
  { x: 0.390625, y: 0.828125 },
  { x: 0.421875, y: 0.828125 },
  { x: 0.421875, y: 0.828125 },
  { x: 0.453125, y: 0.828125 },
  { x: 0.453125, y: 0.828125 },
  { x: 0.484375, y: 0.828125 },
  { x: 0.484375, y: 0.828125 },
  { x: 0.515625, y: 0.828125 },
  { x: 0.515625, y: 0.828125 },
  { x: 0.546875, y: 0.828125 },
  { x: 0.546875, y: 0.828125 },
  { x: 0.578125, y: 0.828125 },
  { x: 0.578125, y: 0.828125 },
  { x: 0.609375, y: 0.828125 },
  { x: 0.609375, y: 0.828125 },
  { x: 0.640625, y: 0.828125 },
  { x: 0.640625, y: 0.828125 },
  { x: 0.671875, y: 0.828125 },
  { x: 0.671875, y: 0.828125 },
  { x: 0.703125, y: 0.828125 },
  { x: 0.703125, y: 0.828125 },
  { x: 0.734375, y: 0.828125 },
  { x: 0.734375, y: 0.828125 },
  { x: 0.765625, y: 0.828125 },
  { x: 0.765625, y: 0.828125 },
  { x: 0.796875, y: 0.828125 },
  { x: 0.796875, y: 0.828125 },
  { x: 0.828125, y: 0.828125 },
  { x: 0.828125, y: 0.828125 },
  { x: 0.859375, y: 0.828125 },
  { x: 0.859375, y: 0.828125 },
  { x: 0.890625, y: 0.828125 },
  { x: 0.890625, y: 0.828125 },
  { x: 0.921875, y: 0.828125 },
  { x: 0.921875, y: 0.828125 },
  { x: 0.953125, y: 0.828125 },
  { x: 0.953125, y: 0.828125 },
  { x: 0.984375, y: 0.828125 },
  { x: 0.984375, y: 0.828125 },
  { x: 0.015625, y: 0.859375 },
  { x: 0.015625, y: 0.859375 },
  { x: 0.046875, y: 0.859375 },
  { x: 0.046875, y: 0.859375 },
  { x: 0.078125, y: 0.859375 },
  { x: 0.078125, y: 0.859375 },
  { x: 0.109375, y: 0.859375 },
  { x: 0.109375, y: 0.859375 },
  { x: 0.140625, y: 0.859375 },
  { x: 0.140625, y: 0.859375 },
  { x: 0.171875, y: 0.859375 },
  { x: 0.171875, y: 0.859375 },
  { x: 0.203125, y: 0.859375 },
  { x: 0.203125, y: 0.859375 },
  { x: 0.234375, y: 0.859375 },
  { x: 0.234375, y: 0.859375 },
  { x: 0.265625, y: 0.859375 },
  { x: 0.265625, y: 0.859375 },
  { x: 0.296875, y: 0.859375 },
  { x: 0.296875, y: 0.859375 },
  { x: 0.328125, y: 0.859375 },
  { x: 0.328125, y: 0.859375 },
  { x: 0.359375, y: 0.859375 },
  { x: 0.359375, y: 0.859375 },
  { x: 0.390625, y: 0.859375 },
  { x: 0.390625, y: 0.859375 },
  { x: 0.421875, y: 0.859375 },
  { x: 0.421875, y: 0.859375 },
  { x: 0.453125, y: 0.859375 },
  { x: 0.453125, y: 0.859375 },
  { x: 0.484375, y: 0.859375 },
  { x: 0.484375, y: 0.859375 },
  { x: 0.515625, y: 0.859375 },
  { x: 0.515625, y: 0.859375 },
  { x: 0.546875, y: 0.859375 },
  { x: 0.546875, y: 0.859375 },
  { x: 0.578125, y: 0.859375 },
  { x: 0.578125, y: 0.859375 },
  { x: 0.609375, y: 0.859375 },
  { x: 0.609375, y: 0.859375 },
  { x: 0.640625, y: 0.859375 },
  { x: 0.640625, y: 0.859375 },
  { x: 0.671875, y: 0.859375 },
  { x: 0.671875, y: 0.859375 },
  { x: 0.703125, y: 0.859375 },
  { x: 0.703125, y: 0.859375 },
  { x: 0.734375, y: 0.859375 },
  { x: 0.734375, y: 0.859375 },
  { x: 0.765625, y: 0.859375 },
  { x: 0.765625, y: 0.859375 },
  { x: 0.796875, y: 0.859375 },
  { x: 0.796875, y: 0.859375 },
  { x: 0.828125, y: 0.859375 },
  { x: 0.828125, y: 0.859375 },
  { x: 0.859375, y: 0.859375 },
  { x: 0.859375, y: 0.859375 },
  { x: 0.890625, y: 0.859375 },
  { x: 0.890625, y: 0.859375 },
  { x: 0.921875, y: 0.859375 },
  { x: 0.921875, y: 0.859375 },
  { x: 0.953125, y: 0.859375 },
  { x: 0.953125, y: 0.859375 },
  { x: 0.984375, y: 0.859375 },
  { x: 0.984375, y: 0.859375 },
  { x: 0.015625, y: 0.890625 },
  { x: 0.015625, y: 0.890625 },
  { x: 0.046875, y: 0.890625 },
  { x: 0.046875, y: 0.890625 },
  { x: 0.078125, y: 0.890625 },
  { x: 0.078125, y: 0.890625 },
  { x: 0.109375, y: 0.890625 },
  { x: 0.109375, y: 0.890625 },
  { x: 0.140625, y: 0.890625 },
  { x: 0.140625, y: 0.890625 },
  { x: 0.171875, y: 0.890625 },
  { x: 0.171875, y: 0.890625 },
  { x: 0.203125, y: 0.890625 },
  { x: 0.203125, y: 0.890625 },
  { x: 0.234375, y: 0.890625 },
  { x: 0.234375, y: 0.890625 },
  { x: 0.265625, y: 0.890625 },
  { x: 0.265625, y: 0.890625 },
  { x: 0.296875, y: 0.890625 },
  { x: 0.296875, y: 0.890625 },
  { x: 0.328125, y: 0.890625 },
  { x: 0.328125, y: 0.890625 },
  { x: 0.359375, y: 0.890625 },
  { x: 0.359375, y: 0.890625 },
  { x: 0.390625, y: 0.890625 },
  { x: 0.390625, y: 0.890625 },
  { x: 0.421875, y: 0.890625 },
  { x: 0.421875, y: 0.890625 },
  { x: 0.453125, y: 0.890625 },
  { x: 0.453125, y: 0.890625 },
  { x: 0.484375, y: 0.890625 },
  { x: 0.484375, y: 0.890625 },
  { x: 0.515625, y: 0.890625 },
  { x: 0.515625, y: 0.890625 },
  { x: 0.546875, y: 0.890625 },
  { x: 0.546875, y: 0.890625 },
  { x: 0.578125, y: 0.890625 },
  { x: 0.578125, y: 0.890625 },
  { x: 0.609375, y: 0.890625 },
  { x: 0.609375, y: 0.890625 },
  { x: 0.640625, y: 0.890625 },
  { x: 0.640625, y: 0.890625 },
  { x: 0.671875, y: 0.890625 },
  { x: 0.671875, y: 0.890625 },
  { x: 0.703125, y: 0.890625 },
  { x: 0.703125, y: 0.890625 },
  { x: 0.734375, y: 0.890625 },
  { x: 0.734375, y: 0.890625 },
  { x: 0.765625, y: 0.890625 },
  { x: 0.765625, y: 0.890625 },
  { x: 0.796875, y: 0.890625 },
  { x: 0.796875, y: 0.890625 },
  { x: 0.828125, y: 0.890625 },
  { x: 0.828125, y: 0.890625 },
  { x: 0.859375, y: 0.890625 },
  { x: 0.859375, y: 0.890625 },
  { x: 0.890625, y: 0.890625 },
  { x: 0.890625, y: 0.890625 },
  { x: 0.921875, y: 0.890625 },
  { x: 0.921875, y: 0.890625 },
  { x: 0.953125, y: 0.890625 },
  { x: 0.953125, y: 0.890625 },
  { x: 0.984375, y: 0.890625 },
  { x: 0.984375, y: 0.890625 },
  { x: 0.015625, y: 0.921875 },
  { x: 0.015625, y: 0.921875 },
  { x: 0.046875, y: 0.921875 },
  { x: 0.046875, y: 0.921875 },
  { x: 0.078125, y: 0.921875 },
  { x: 0.078125, y: 0.921875 },
  { x: 0.109375, y: 0.921875 },
  { x: 0.109375, y: 0.921875 },
  { x: 0.140625, y: 0.921875 },
  { x: 0.140625, y: 0.921875 },
  { x: 0.171875, y: 0.921875 },
  { x: 0.171875, y: 0.921875 },
  { x: 0.203125, y: 0.921875 },
  { x: 0.203125, y: 0.921875 },
  { x: 0.234375, y: 0.921875 },
  { x: 0.234375, y: 0.921875 },
  { x: 0.265625, y: 0.921875 },
  { x: 0.265625, y: 0.921875 },
  { x: 0.296875, y: 0.921875 },
  { x: 0.296875, y: 0.921875 },
  { x: 0.328125, y: 0.921875 },
  { x: 0.328125, y: 0.921875 },
  { x: 0.359375, y: 0.921875 },
  { x: 0.359375, y: 0.921875 },
  { x: 0.390625, y: 0.921875 },
  { x: 0.390625, y: 0.921875 },
  { x: 0.421875, y: 0.921875 },
  { x: 0.421875, y: 0.921875 },
  { x: 0.453125, y: 0.921875 },
  { x: 0.453125, y: 0.921875 },
  { x: 0.484375, y: 0.921875 },
  { x: 0.484375, y: 0.921875 },
  { x: 0.515625, y: 0.921875 },
  { x: 0.515625, y: 0.921875 },
  { x: 0.546875, y: 0.921875 },
  { x: 0.546875, y: 0.921875 },
  { x: 0.578125, y: 0.921875 },
  { x: 0.578125, y: 0.921875 },
  { x: 0.609375, y: 0.921875 },
  { x: 0.609375, y: 0.921875 },
  { x: 0.640625, y: 0.921875 },
  { x: 0.640625, y: 0.921875 },
  { x: 0.671875, y: 0.921875 },
  { x: 0.671875, y: 0.921875 },
  { x: 0.703125, y: 0.921875 },
  { x: 0.703125, y: 0.921875 },
  { x: 0.734375, y: 0.921875 },
  { x: 0.734375, y: 0.921875 },
  { x: 0.765625, y: 0.921875 },
  { x: 0.765625, y: 0.921875 },
  { x: 0.796875, y: 0.921875 },
  { x: 0.796875, y: 0.921875 },
  { x: 0.828125, y: 0.921875 },
  { x: 0.828125, y: 0.921875 },
  { x: 0.859375, y: 0.921875 },
  { x: 0.859375, y: 0.921875 },
  { x: 0.890625, y: 0.921875 },
  { x: 0.890625, y: 0.921875 },
  { x: 0.921875, y: 0.921875 },
  { x: 0.921875, y: 0.921875 },
  { x: 0.953125, y: 0.921875 },
  { x: 0.953125, y: 0.921875 },
  { x: 0.984375, y: 0.921875 },
  { x: 0.984375, y: 0.921875 },
  { x: 0.015625, y: 0.953125 },
  { x: 0.015625, y: 0.953125 },
  { x: 0.046875, y: 0.953125 },
  { x: 0.046875, y: 0.953125 },
  { x: 0.078125, y: 0.953125 },
  { x: 0.078125, y: 0.953125 },
  { x: 0.109375, y: 0.953125 },
  { x: 0.109375, y: 0.953125 },
  { x: 0.140625, y: 0.953125 },
  { x: 0.140625, y: 0.953125 },
  { x: 0.171875, y: 0.953125 },
  { x: 0.171875, y: 0.953125 },
  { x: 0.203125, y: 0.953125 },
  { x: 0.203125, y: 0.953125 },
  { x: 0.234375, y: 0.953125 },
  { x: 0.234375, y: 0.953125 },
  { x: 0.265625, y: 0.953125 },
  { x: 0.265625, y: 0.953125 },
  { x: 0.296875, y: 0.953125 },
  { x: 0.296875, y: 0.953125 },
  { x: 0.328125, y: 0.953125 },
  { x: 0.328125, y: 0.953125 },
  { x: 0.359375, y: 0.953125 },
  { x: 0.359375, y: 0.953125 },
  { x: 0.390625, y: 0.953125 },
  { x: 0.390625, y: 0.953125 },
  { x: 0.421875, y: 0.953125 },
  { x: 0.421875, y: 0.953125 },
  { x: 0.453125, y: 0.953125 },
  { x: 0.453125, y: 0.953125 },
  { x: 0.484375, y: 0.953125 },
  { x: 0.484375, y: 0.953125 },
  { x: 0.515625, y: 0.953125 },
  { x: 0.515625, y: 0.953125 },
  { x: 0.546875, y: 0.953125 },
  { x: 0.546875, y: 0.953125 },
  { x: 0.578125, y: 0.953125 },
  { x: 0.578125, y: 0.953125 },
  { x: 0.609375, y: 0.953125 },
  { x: 0.609375, y: 0.953125 },
  { x: 0.640625, y: 0.953125 },
  { x: 0.640625, y: 0.953125 },
  { x: 0.671875, y: 0.953125 },
  { x: 0.671875, y: 0.953125 },
  { x: 0.703125, y: 0.953125 },
  { x: 0.703125, y: 0.953125 },
  { x: 0.734375, y: 0.953125 },
  { x: 0.734375, y: 0.953125 },
  { x: 0.765625, y: 0.953125 },
  { x: 0.765625, y: 0.953125 },
  { x: 0.796875, y: 0.953125 },
  { x: 0.796875, y: 0.953125 },
  { x: 0.828125, y: 0.953125 },
  { x: 0.828125, y: 0.953125 },
  { x: 0.859375, y: 0.953125 },
  { x: 0.859375, y: 0.953125 },
  { x: 0.890625, y: 0.953125 },
  { x: 0.890625, y: 0.953125 },
  { x: 0.921875, y: 0.953125 },
  { x: 0.921875, y: 0.953125 },
  { x: 0.953125, y: 0.953125 },
  { x: 0.953125, y: 0.953125 },
  { x: 0.984375, y: 0.953125 },
  { x: 0.984375, y: 0.953125 },
  { x: 0.015625, y: 0.984375 },
  { x: 0.015625, y: 0.984375 },
  { x: 0.046875, y: 0.984375 },
  { x: 0.046875, y: 0.984375 },
  { x: 0.078125, y: 0.984375 },
  { x: 0.078125, y: 0.984375 },
  { x: 0.109375, y: 0.984375 },
  { x: 0.109375, y: 0.984375 },
  { x: 0.140625, y: 0.984375 },
  { x: 0.140625, y: 0.984375 },
  { x: 0.171875, y: 0.984375 },
  { x: 0.171875, y: 0.984375 },
  { x: 0.203125, y: 0.984375 },
  { x: 0.203125, y: 0.984375 },
  { x: 0.234375, y: 0.984375 },
  { x: 0.234375, y: 0.984375 },
  { x: 0.265625, y: 0.984375 },
  { x: 0.265625, y: 0.984375 },
  { x: 0.296875, y: 0.984375 },
  { x: 0.296875, y: 0.984375 },
  { x: 0.328125, y: 0.984375 },
  { x: 0.328125, y: 0.984375 },
  { x: 0.359375, y: 0.984375 },
  { x: 0.359375, y: 0.984375 },
  { x: 0.390625, y: 0.984375 },
  { x: 0.390625, y: 0.984375 },
  { x: 0.421875, y: 0.984375 },
  { x: 0.421875, y: 0.984375 },
  { x: 0.453125, y: 0.984375 },
  { x: 0.453125, y: 0.984375 },
  { x: 0.484375, y: 0.984375 },
  { x: 0.484375, y: 0.984375 },
  { x: 0.515625, y: 0.984375 },
  { x: 0.515625, y: 0.984375 },
  { x: 0.546875, y: 0.984375 },
  { x: 0.546875, y: 0.984375 },
  { x: 0.578125, y: 0.984375 },
  { x: 0.578125, y: 0.984375 },
  { x: 0.609375, y: 0.984375 },
  { x: 0.609375, y: 0.984375 },
  { x: 0.640625, y: 0.984375 },
  { x: 0.640625, y: 0.984375 },
  { x: 0.671875, y: 0.984375 },
  { x: 0.671875, y: 0.984375 },
  { x: 0.703125, y: 0.984375 },
  { x: 0.703125, y: 0.984375 },
  { x: 0.734375, y: 0.984375 },
  { x: 0.734375, y: 0.984375 },
  { x: 0.765625, y: 0.984375 },
  { x: 0.765625, y: 0.984375 },
  { x: 0.796875, y: 0.984375 },
  { x: 0.796875, y: 0.984375 },
  { x: 0.828125, y: 0.984375 },
  { x: 0.828125, y: 0.984375 },
  { x: 0.859375, y: 0.984375 },
  { x: 0.859375, y: 0.984375 },
  { x: 0.890625, y: 0.984375 },
  { x: 0.890625, y: 0.984375 },
  { x: 0.921875, y: 0.984375 },
  { x: 0.921875, y: 0.984375 },
  { x: 0.953125, y: 0.984375 },
  { x: 0.953125, y: 0.984375 },
  { x: 0.984375, y: 0.984375 },
  { x: 0.984375, y: 0.984375 },
  { x: 0.03125, y: 0.03125 },
  { x: 0.03125, y: 0.03125 },
  { x: 0.09375, y: 0.03125 },
  { x: 0.09375, y: 0.03125 },
  { x: 0.15625, y: 0.03125 },
  { x: 0.15625, y: 0.03125 },
  { x: 0.21875, y: 0.03125 },
  { x: 0.21875, y: 0.03125 },
  { x: 0.28125, y: 0.03125 },
  { x: 0.28125, y: 0.03125 },
  { x: 0.34375, y: 0.03125 },
  { x: 0.34375, y: 0.03125 },
  { x: 0.40625, y: 0.03125 },
  { x: 0.40625, y: 0.03125 },
  { x: 0.46875, y: 0.03125 },
  { x: 0.46875, y: 0.03125 },
  { x: 0.53125, y: 0.03125 },
  { x: 0.53125, y: 0.03125 },
  { x: 0.59375, y: 0.03125 },
  { x: 0.59375, y: 0.03125 },
  { x: 0.65625, y: 0.03125 },
  { x: 0.65625, y: 0.03125 },
  { x: 0.71875, y: 0.03125 },
  { x: 0.71875, y: 0.03125 },
  { x: 0.78125, y: 0.03125 },
  { x: 0.78125, y: 0.03125 },
  { x: 0.84375, y: 0.03125 },
  { x: 0.84375, y: 0.03125 },
  { x: 0.90625, y: 0.03125 },
  { x: 0.90625, y: 0.03125 },
  { x: 0.96875, y: 0.03125 },
  { x: 0.96875, y: 0.03125 },
  { x: 0.03125, y: 0.09375 },
  { x: 0.03125, y: 0.09375 },
  { x: 0.09375, y: 0.09375 },
  { x: 0.09375, y: 0.09375 },
  { x: 0.15625, y: 0.09375 },
  { x: 0.15625, y: 0.09375 },
  { x: 0.21875, y: 0.09375 },
  { x: 0.21875, y: 0.09375 },
  { x: 0.28125, y: 0.09375 },
  { x: 0.28125, y: 0.09375 },
  { x: 0.34375, y: 0.09375 },
  { x: 0.34375, y: 0.09375 },
  { x: 0.40625, y: 0.09375 },
  { x: 0.40625, y: 0.09375 },
  { x: 0.46875, y: 0.09375 },
  { x: 0.46875, y: 0.09375 },
  { x: 0.53125, y: 0.09375 },
  { x: 0.53125, y: 0.09375 },
  { x: 0.59375, y: 0.09375 },
  { x: 0.59375, y: 0.09375 },
  { x: 0.65625, y: 0.09375 },
  { x: 0.65625, y: 0.09375 },
  { x: 0.71875, y: 0.09375 },
  { x: 0.71875, y: 0.09375 },
  { x: 0.78125, y: 0.09375 },
  { x: 0.78125, y: 0.09375 },
  { x: 0.84375, y: 0.09375 },
  { x: 0.84375, y: 0.09375 },
  { x: 0.90625, y: 0.09375 },
  { x: 0.90625, y: 0.09375 },
  { x: 0.96875, y: 0.09375 },
  { x: 0.96875, y: 0.09375 },
  { x: 0.03125, y: 0.15625 },
  { x: 0.03125, y: 0.15625 },
  { x: 0.09375, y: 0.15625 },
  { x: 0.09375, y: 0.15625 },
  { x: 0.15625, y: 0.15625 },
  { x: 0.15625, y: 0.15625 },
  { x: 0.21875, y: 0.15625 },
  { x: 0.21875, y: 0.15625 },
  { x: 0.28125, y: 0.15625 },
  { x: 0.28125, y: 0.15625 },
  { x: 0.34375, y: 0.15625 },
  { x: 0.34375, y: 0.15625 },
  { x: 0.40625, y: 0.15625 },
  { x: 0.40625, y: 0.15625 },
  { x: 0.46875, y: 0.15625 },
  { x: 0.46875, y: 0.15625 },
  { x: 0.53125, y: 0.15625 },
  { x: 0.53125, y: 0.15625 },
  { x: 0.59375, y: 0.15625 },
  { x: 0.59375, y: 0.15625 },
  { x: 0.65625, y: 0.15625 },
  { x: 0.65625, y: 0.15625 },
  { x: 0.71875, y: 0.15625 },
  { x: 0.71875, y: 0.15625 },
  { x: 0.78125, y: 0.15625 },
  { x: 0.78125, y: 0.15625 },
  { x: 0.84375, y: 0.15625 },
  { x: 0.84375, y: 0.15625 },
  { x: 0.90625, y: 0.15625 },
  { x: 0.90625, y: 0.15625 },
  { x: 0.96875, y: 0.15625 },
  { x: 0.96875, y: 0.15625 },
  { x: 0.03125, y: 0.21875 },
  { x: 0.03125, y: 0.21875 },
  { x: 0.09375, y: 0.21875 },
  { x: 0.09375, y: 0.21875 },
  { x: 0.15625, y: 0.21875 },
  { x: 0.15625, y: 0.21875 },
  { x: 0.21875, y: 0.21875 },
  { x: 0.21875, y: 0.21875 },
  { x: 0.28125, y: 0.21875 },
  { x: 0.28125, y: 0.21875 },
  { x: 0.34375, y: 0.21875 },
  { x: 0.34375, y: 0.21875 },
  { x: 0.40625, y: 0.21875 },
  { x: 0.40625, y: 0.21875 },
  { x: 0.46875, y: 0.21875 },
  { x: 0.46875, y: 0.21875 },
  { x: 0.53125, y: 0.21875 },
  { x: 0.53125, y: 0.21875 },
  { x: 0.59375, y: 0.21875 },
  { x: 0.59375, y: 0.21875 },
  { x: 0.65625, y: 0.21875 },
  { x: 0.65625, y: 0.21875 },
  { x: 0.71875, y: 0.21875 },
  { x: 0.71875, y: 0.21875 },
  { x: 0.78125, y: 0.21875 },
  { x: 0.78125, y: 0.21875 },
  { x: 0.84375, y: 0.21875 },
  { x: 0.84375, y: 0.21875 },
  { x: 0.90625, y: 0.21875 },
  { x: 0.90625, y: 0.21875 },
  { x: 0.96875, y: 0.21875 },
  { x: 0.96875, y: 0.21875 },
  { x: 0.03125, y: 0.28125 },
  { x: 0.03125, y: 0.28125 },
  { x: 0.09375, y: 0.28125 },
  { x: 0.09375, y: 0.28125 },
  { x: 0.15625, y: 0.28125 },
  { x: 0.15625, y: 0.28125 },
  { x: 0.21875, y: 0.28125 },
  { x: 0.21875, y: 0.28125 },
  { x: 0.28125, y: 0.28125 },
  { x: 0.28125, y: 0.28125 },
  { x: 0.34375, y: 0.28125 },
  { x: 0.34375, y: 0.28125 },
  { x: 0.40625, y: 0.28125 },
  { x: 0.40625, y: 0.28125 },
  { x: 0.46875, y: 0.28125 },
  { x: 0.46875, y: 0.28125 },
  { x: 0.53125, y: 0.28125 },
  { x: 0.53125, y: 0.28125 },
  { x: 0.59375, y: 0.28125 },
  { x: 0.59375, y: 0.28125 },
  { x: 0.65625, y: 0.28125 },
  { x: 0.65625, y: 0.28125 },
  { x: 0.71875, y: 0.28125 },
  { x: 0.71875, y: 0.28125 },
  { x: 0.78125, y: 0.28125 },
  { x: 0.78125, y: 0.28125 },
  { x: 0.84375, y: 0.28125 },
  { x: 0.84375, y: 0.28125 },
  { x: 0.90625, y: 0.28125 },
  { x: 0.90625, y: 0.28125 },
  { x: 0.96875, y: 0.28125 },
  { x: 0.96875, y: 0.28125 },
  { x: 0.03125, y: 0.34375 },
  { x: 0.03125, y: 0.34375 },
  { x: 0.09375, y: 0.34375 },
  { x: 0.09375, y: 0.34375 },
  { x: 0.15625, y: 0.34375 },
  { x: 0.15625, y: 0.34375 },
  { x: 0.21875, y: 0.34375 },
  { x: 0.21875, y: 0.34375 },
  { x: 0.28125, y: 0.34375 },
  { x: 0.28125, y: 0.34375 },
  { x: 0.34375, y: 0.34375 },
  { x: 0.34375, y: 0.34375 },
  { x: 0.40625, y: 0.34375 },
  { x: 0.40625, y: 0.34375 },
  { x: 0.46875, y: 0.34375 },
  { x: 0.46875, y: 0.34375 },
  { x: 0.53125, y: 0.34375 },
  { x: 0.53125, y: 0.34375 },
  { x: 0.59375, y: 0.34375 },
  { x: 0.59375, y: 0.34375 },
  { x: 0.65625, y: 0.34375 },
  { x: 0.65625, y: 0.34375 },
  { x: 0.71875, y: 0.34375 },
  { x: 0.71875, y: 0.34375 },
  { x: 0.78125, y: 0.34375 },
  { x: 0.78125, y: 0.34375 },
  { x: 0.84375, y: 0.34375 },
  { x: 0.84375, y: 0.34375 },
  { x: 0.90625, y: 0.34375 },
  { x: 0.90625, y: 0.34375 },
  { x: 0.96875, y: 0.34375 },
  { x: 0.96875, y: 0.34375 },
  { x: 0.03125, y: 0.40625 },
  { x: 0.03125, y: 0.40625 },
  { x: 0.09375, y: 0.40625 },
  { x: 0.09375, y: 0.40625 },
  { x: 0.15625, y: 0.40625 },
  { x: 0.15625, y: 0.40625 },
  { x: 0.21875, y: 0.40625 },
  { x: 0.21875, y: 0.40625 },
  { x: 0.28125, y: 0.40625 },
  { x: 0.28125, y: 0.40625 },
  { x: 0.34375, y: 0.40625 },
  { x: 0.34375, y: 0.40625 },
  { x: 0.40625, y: 0.40625 },
  { x: 0.40625, y: 0.40625 },
  { x: 0.46875, y: 0.40625 },
  { x: 0.46875, y: 0.40625 },
  { x: 0.53125, y: 0.40625 },
  { x: 0.53125, y: 0.40625 },
  { x: 0.59375, y: 0.40625 },
  { x: 0.59375, y: 0.40625 },
  { x: 0.65625, y: 0.40625 },
  { x: 0.65625, y: 0.40625 },
  { x: 0.71875, y: 0.40625 },
  { x: 0.71875, y: 0.40625 },
  { x: 0.78125, y: 0.40625 },
  { x: 0.78125, y: 0.40625 },
  { x: 0.84375, y: 0.40625 },
  { x: 0.84375, y: 0.40625 },
  { x: 0.90625, y: 0.40625 },
  { x: 0.90625, y: 0.40625 },
  { x: 0.96875, y: 0.40625 },
  { x: 0.96875, y: 0.40625 },
  { x: 0.03125, y: 0.46875 },
  { x: 0.03125, y: 0.46875 },
  { x: 0.09375, y: 0.46875 },
  { x: 0.09375, y: 0.46875 },
  { x: 0.15625, y: 0.46875 },
  { x: 0.15625, y: 0.46875 },
  { x: 0.21875, y: 0.46875 },
  { x: 0.21875, y: 0.46875 },
  { x: 0.28125, y: 0.46875 },
  { x: 0.28125, y: 0.46875 },
  { x: 0.34375, y: 0.46875 },
  { x: 0.34375, y: 0.46875 },
  { x: 0.40625, y: 0.46875 },
  { x: 0.40625, y: 0.46875 },
  { x: 0.46875, y: 0.46875 },
  { x: 0.46875, y: 0.46875 },
  { x: 0.53125, y: 0.46875 },
  { x: 0.53125, y: 0.46875 },
  { x: 0.59375, y: 0.46875 },
  { x: 0.59375, y: 0.46875 },
  { x: 0.65625, y: 0.46875 },
  { x: 0.65625, y: 0.46875 },
  { x: 0.71875, y: 0.46875 },
  { x: 0.71875, y: 0.46875 },
  { x: 0.78125, y: 0.46875 },
  { x: 0.78125, y: 0.46875 },
  { x: 0.84375, y: 0.46875 },
  { x: 0.84375, y: 0.46875 },
  { x: 0.90625, y: 0.46875 },
  { x: 0.90625, y: 0.46875 },
  { x: 0.96875, y: 0.46875 },
  { x: 0.96875, y: 0.46875 },
  { x: 0.03125, y: 0.53125 },
  { x: 0.03125, y: 0.53125 },
  { x: 0.09375, y: 0.53125 },
  { x: 0.09375, y: 0.53125 },
  { x: 0.15625, y: 0.53125 },
  { x: 0.15625, y: 0.53125 },
  { x: 0.21875, y: 0.53125 },
  { x: 0.21875, y: 0.53125 },
  { x: 0.28125, y: 0.53125 },
  { x: 0.28125, y: 0.53125 },
  { x: 0.34375, y: 0.53125 },
  { x: 0.34375, y: 0.53125 },
  { x: 0.40625, y: 0.53125 },
  { x: 0.40625, y: 0.53125 },
  { x: 0.46875, y: 0.53125 },
  { x: 0.46875, y: 0.53125 },
  { x: 0.53125, y: 0.53125 },
  { x: 0.53125, y: 0.53125 },
  { x: 0.59375, y: 0.53125 },
  { x: 0.59375, y: 0.53125 },
  { x: 0.65625, y: 0.53125 },
  { x: 0.65625, y: 0.53125 },
  { x: 0.71875, y: 0.53125 },
  { x: 0.71875, y: 0.53125 },
  { x: 0.78125, y: 0.53125 },
  { x: 0.78125, y: 0.53125 },
  { x: 0.84375, y: 0.53125 },
  { x: 0.84375, y: 0.53125 },
  { x: 0.90625, y: 0.53125 },
  { x: 0.90625, y: 0.53125 },
  { x: 0.96875, y: 0.53125 },
  { x: 0.96875, y: 0.53125 },
  { x: 0.03125, y: 0.59375 },
  { x: 0.03125, y: 0.59375 },
  { x: 0.09375, y: 0.59375 },
  { x: 0.09375, y: 0.59375 },
  { x: 0.15625, y: 0.59375 },
  { x: 0.15625, y: 0.59375 },
  { x: 0.21875, y: 0.59375 },
  { x: 0.21875, y: 0.59375 },
  { x: 0.28125, y: 0.59375 },
  { x: 0.28125, y: 0.59375 },
  { x: 0.34375, y: 0.59375 },
  { x: 0.34375, y: 0.59375 },
  { x: 0.40625, y: 0.59375 },
  { x: 0.40625, y: 0.59375 },
  { x: 0.46875, y: 0.59375 },
  { x: 0.46875, y: 0.59375 },
  { x: 0.53125, y: 0.59375 },
  { x: 0.53125, y: 0.59375 },
  { x: 0.59375, y: 0.59375 },
  { x: 0.59375, y: 0.59375 },
  { x: 0.65625, y: 0.59375 },
  { x: 0.65625, y: 0.59375 },
  { x: 0.71875, y: 0.59375 },
  { x: 0.71875, y: 0.59375 },
  { x: 0.78125, y: 0.59375 },
  { x: 0.78125, y: 0.59375 },
  { x: 0.84375, y: 0.59375 },
  { x: 0.84375, y: 0.59375 },
  { x: 0.90625, y: 0.59375 },
  { x: 0.90625, y: 0.59375 },
  { x: 0.96875, y: 0.59375 },
  { x: 0.96875, y: 0.59375 },
  { x: 0.03125, y: 0.65625 },
  { x: 0.03125, y: 0.65625 },
  { x: 0.09375, y: 0.65625 },
  { x: 0.09375, y: 0.65625 },
  { x: 0.15625, y: 0.65625 },
  { x: 0.15625, y: 0.65625 },
  { x: 0.21875, y: 0.65625 },
  { x: 0.21875, y: 0.65625 },
  { x: 0.28125, y: 0.65625 },
  { x: 0.28125, y: 0.65625 },
  { x: 0.34375, y: 0.65625 },
  { x: 0.34375, y: 0.65625 },
  { x: 0.40625, y: 0.65625 },
  { x: 0.40625, y: 0.65625 },
  { x: 0.46875, y: 0.65625 },
  { x: 0.46875, y: 0.65625 },
  { x: 0.53125, y: 0.65625 },
  { x: 0.53125, y: 0.65625 },
  { x: 0.59375, y: 0.65625 },
  { x: 0.59375, y: 0.65625 },
  { x: 0.65625, y: 0.65625 },
  { x: 0.65625, y: 0.65625 },
  { x: 0.71875, y: 0.65625 },
  { x: 0.71875, y: 0.65625 },
  { x: 0.78125, y: 0.65625 },
  { x: 0.78125, y: 0.65625 },
  { x: 0.84375, y: 0.65625 },
  { x: 0.84375, y: 0.65625 },
  { x: 0.90625, y: 0.65625 },
  { x: 0.90625, y: 0.65625 },
  { x: 0.96875, y: 0.65625 },
  { x: 0.96875, y: 0.65625 },
  { x: 0.03125, y: 0.71875 },
  { x: 0.03125, y: 0.71875 },
  { x: 0.09375, y: 0.71875 },
  { x: 0.09375, y: 0.71875 },
  { x: 0.15625, y: 0.71875 },
  { x: 0.15625, y: 0.71875 },
  { x: 0.21875, y: 0.71875 },
  { x: 0.21875, y: 0.71875 },
  { x: 0.28125, y: 0.71875 },
  { x: 0.28125, y: 0.71875 },
  { x: 0.34375, y: 0.71875 },
  { x: 0.34375, y: 0.71875 },
  { x: 0.40625, y: 0.71875 },
  { x: 0.40625, y: 0.71875 },
  { x: 0.46875, y: 0.71875 },
  { x: 0.46875, y: 0.71875 },
  { x: 0.53125, y: 0.71875 },
  { x: 0.53125, y: 0.71875 },
  { x: 0.59375, y: 0.71875 },
  { x: 0.59375, y: 0.71875 },
  { x: 0.65625, y: 0.71875 },
  { x: 0.65625, y: 0.71875 },
  { x: 0.71875, y: 0.71875 },
  { x: 0.71875, y: 0.71875 },
  { x: 0.78125, y: 0.71875 },
  { x: 0.78125, y: 0.71875 },
  { x: 0.84375, y: 0.71875 },
  { x: 0.84375, y: 0.71875 },
  { x: 0.90625, y: 0.71875 },
  { x: 0.90625, y: 0.71875 },
  { x: 0.96875, y: 0.71875 },
  { x: 0.96875, y: 0.71875 },
  { x: 0.03125, y: 0.78125 },
  { x: 0.03125, y: 0.78125 },
  { x: 0.09375, y: 0.78125 },
  { x: 0.09375, y: 0.78125 },
  { x: 0.15625, y: 0.78125 },
  { x: 0.15625, y: 0.78125 },
  { x: 0.21875, y: 0.78125 },
  { x: 0.21875, y: 0.78125 },
  { x: 0.28125, y: 0.78125 },
  { x: 0.28125, y: 0.78125 },
  { x: 0.34375, y: 0.78125 },
  { x: 0.34375, y: 0.78125 },
  { x: 0.40625, y: 0.78125 },
  { x: 0.40625, y: 0.78125 },
  { x: 0.46875, y: 0.78125 },
  { x: 0.46875, y: 0.78125 },
  { x: 0.53125, y: 0.78125 },
  { x: 0.53125, y: 0.78125 },
  { x: 0.59375, y: 0.78125 },
  { x: 0.59375, y: 0.78125 },
  { x: 0.65625, y: 0.78125 },
  { x: 0.65625, y: 0.78125 },
  { x: 0.71875, y: 0.78125 },
  { x: 0.71875, y: 0.78125 },
  { x: 0.78125, y: 0.78125 },
  { x: 0.78125, y: 0.78125 },
  { x: 0.84375, y: 0.78125 },
  { x: 0.84375, y: 0.78125 },
  { x: 0.90625, y: 0.78125 },
  { x: 0.90625, y: 0.78125 },
  { x: 0.96875, y: 0.78125 },
  { x: 0.96875, y: 0.78125 },
  { x: 0.03125, y: 0.84375 },
  { x: 0.03125, y: 0.84375 },
  { x: 0.09375, y: 0.84375 },
  { x: 0.09375, y: 0.84375 },
  { x: 0.15625, y: 0.84375 },
  { x: 0.15625, y: 0.84375 },
  { x: 0.21875, y: 0.84375 },
  { x: 0.21875, y: 0.84375 },
  { x: 0.28125, y: 0.84375 },
  { x: 0.28125, y: 0.84375 },
  { x: 0.34375, y: 0.84375 },
  { x: 0.34375, y: 0.84375 },
  { x: 0.40625, y: 0.84375 },
  { x: 0.40625, y: 0.84375 },
  { x: 0.46875, y: 0.84375 },
  { x: 0.46875, y: 0.84375 },
  { x: 0.53125, y: 0.84375 },
  { x: 0.53125, y: 0.84375 },
  { x: 0.59375, y: 0.84375 },
  { x: 0.59375, y: 0.84375 },
  { x: 0.65625, y: 0.84375 },
  { x: 0.65625, y: 0.84375 },
  { x: 0.71875, y: 0.84375 },
  { x: 0.71875, y: 0.84375 },
  { x: 0.78125, y: 0.84375 },
  { x: 0.78125, y: 0.84375 },
  { x: 0.84375, y: 0.84375 },
  { x: 0.84375, y: 0.84375 },
  { x: 0.90625, y: 0.84375 },
  { x: 0.90625, y: 0.84375 },
  { x: 0.96875, y: 0.84375 },
  { x: 0.96875, y: 0.84375 },
  { x: 0.03125, y: 0.90625 },
  { x: 0.03125, y: 0.90625 },
  { x: 0.09375, y: 0.90625 },
  { x: 0.09375, y: 0.90625 },
  { x: 0.15625, y: 0.90625 },
  { x: 0.15625, y: 0.90625 },
  { x: 0.21875, y: 0.90625 },
  { x: 0.21875, y: 0.90625 },
  { x: 0.28125, y: 0.90625 },
  { x: 0.28125, y: 0.90625 },
  { x: 0.34375, y: 0.90625 },
  { x: 0.34375, y: 0.90625 },
  { x: 0.40625, y: 0.90625 },
  { x: 0.40625, y: 0.90625 },
  { x: 0.46875, y: 0.90625 },
  { x: 0.46875, y: 0.90625 },
  { x: 0.53125, y: 0.90625 },
  { x: 0.53125, y: 0.90625 },
  { x: 0.59375, y: 0.90625 },
  { x: 0.59375, y: 0.90625 },
  { x: 0.65625, y: 0.90625 },
  { x: 0.65625, y: 0.90625 },
  { x: 0.71875, y: 0.90625 },
  { x: 0.71875, y: 0.90625 },
  { x: 0.78125, y: 0.90625 },
  { x: 0.78125, y: 0.90625 },
  { x: 0.84375, y: 0.90625 },
  { x: 0.84375, y: 0.90625 },
  { x: 0.90625, y: 0.90625 },
  { x: 0.90625, y: 0.90625 },
  { x: 0.96875, y: 0.90625 },
  { x: 0.96875, y: 0.90625 },
  { x: 0.03125, y: 0.96875 },
  { x: 0.03125, y: 0.96875 },
  { x: 0.09375, y: 0.96875 },
  { x: 0.09375, y: 0.96875 },
  { x: 0.15625, y: 0.96875 },
  { x: 0.15625, y: 0.96875 },
  { x: 0.21875, y: 0.96875 },
  { x: 0.21875, y: 0.96875 },
  { x: 0.28125, y: 0.96875 },
  { x: 0.28125, y: 0.96875 },
  { x: 0.34375, y: 0.96875 },
  { x: 0.34375, y: 0.96875 },
  { x: 0.40625, y: 0.96875 },
  { x: 0.40625, y: 0.96875 },
  { x: 0.46875, y: 0.96875 },
  { x: 0.46875, y: 0.96875 },
  { x: 0.53125, y: 0.96875 },
  { x: 0.53125, y: 0.96875 },
  { x: 0.59375, y: 0.96875 },
  { x: 0.59375, y: 0.96875 },
  { x: 0.65625, y: 0.96875 },
  { x: 0.65625, y: 0.96875 },
  { x: 0.71875, y: 0.96875 },
  { x: 0.71875, y: 0.96875 },
  { x: 0.78125, y: 0.96875 },
  { x: 0.78125, y: 0.96875 },
  { x: 0.84375, y: 0.96875 },
  { x: 0.84375, y: 0.96875 },
  { x: 0.90625, y: 0.96875 },
  { x: 0.90625, y: 0.96875 },
  { x: 0.96875, y: 0.96875 },
  { x: 0.96875, y: 0.96875 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.0625, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.1875, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.3125, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.4375, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.5625, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.6875, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.8125, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.9375, y: 0.0625 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.0625, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.1875, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.3125, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.4375, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.5625, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.6875, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.8125, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.9375, y: 0.1875 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.0625, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.1875, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.3125, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.4375, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.5625, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.6875, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.8125, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.9375, y: 0.3125 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.0625, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.1875, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.3125, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.4375, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.5625, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.6875, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.8125, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.9375, y: 0.4375 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.0625, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.1875, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.3125, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.4375, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.5625, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.6875, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.8125, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.9375, y: 0.5625 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.0625, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.1875, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.3125, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.4375, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.5625, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.6875, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.8125, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.9375, y: 0.6875 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.0625, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.1875, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.3125, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.4375, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.5625, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.6875, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.8125, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.9375, y: 0.8125 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.0625, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.1875, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.3125, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.4375, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.5625, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.6875, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.8125, y: 0.9375 },
  { x: 0.9375, y: 0.9375 },
  { x: 0.9375, y: 0.9375 },
  { x: 0.9375, y: 0.9375 },
  { x: 0.9375, y: 0.9375 },
  { x: 0.9375, y: 0.9375 },
  { x: 0.9375, y: 0.9375 }
];

// src/handpose/handdetector.ts
var HandDetector = class {
  constructor(model10) {
    var _a;
    this.model = model10;
    this.anchors = anchors.map((anchor) => [anchor.x, anchor.y]);
    this.anchorsTensor = tf11.tensor2d(this.anchors);
    this.inputSize = (_a = this.model) == null ? void 0 : _a.inputs[0].shape[2];
    this.inputSizeTensor = tf11.tensor1d([this.inputSize, this.inputSize]);
    this.doubleInputSizeTensor = tf11.tensor1d([this.inputSize * 2, this.inputSize * 2]);
  }
  normalizeBoxes(boxes) {
    return tf11.tidy(() => {
      const boxOffsets = tf11.slice(boxes, [0, 0], [-1, 2]);
      const boxSizes = tf11.slice(boxes, [0, 2], [-1, 2]);
      const boxCenterPoints = tf11.add(tf11.div(boxOffsets, this.inputSizeTensor), this.anchorsTensor);
      const halfBoxSizes = tf11.div(boxSizes, this.doubleInputSizeTensor);
      const startPoints = tf11.mul(tf11.sub(boxCenterPoints, halfBoxSizes), this.inputSizeTensor);
      const endPoints = tf11.mul(tf11.add(boxCenterPoints, halfBoxSizes), this.inputSizeTensor);
      return tf11.concat2d([startPoints, endPoints], 1);
    });
  }
  normalizeLandmarks(rawPalmLandmarks, index) {
    return tf11.tidy(() => {
      const landmarks = tf11.add(tf11.div(rawPalmLandmarks.reshape([-1, 7, 2]), this.inputSizeTensor), this.anchors[index]);
      return tf11.mul(landmarks, this.inputSizeTensor);
    });
  }
  async getBoxes(input, config3) {
    const batched = this.model.predict(input);
    const predictions = tf11.squeeze(batched);
    batched.dispose();
    const scoresT = tf11.tidy(() => tf11.sigmoid(tf11.slice(predictions, [0, 0], [-1, 1])).squeeze());
    const scores = scoresT.dataSync();
    const rawBoxes = tf11.slice(predictions, [0, 1], [-1, 4]);
    const boxes = this.normalizeBoxes(rawBoxes);
    rawBoxes.dispose();
    const filteredT = await tf11.image.nonMaxSuppressionAsync(boxes, scores, config3.hand.maxDetected, config3.hand.iouThreshold, config3.hand.minConfidence);
    const filtered = filteredT.arraySync();
    scoresT.dispose();
    filteredT.dispose();
    const hands = [];
    for (const index of filtered) {
      if (scores[index] >= config3.hand.minConfidence) {
        const matchingBox = tf11.slice(boxes, [index, 0], [1, -1]);
        const rawPalmLandmarks = tf11.slice(predictions, [index, 5], [1, 14]);
        const palmLandmarks = tf11.tidy(() => this.normalizeLandmarks(rawPalmLandmarks, index).reshape([-1, 2]));
        rawPalmLandmarks.dispose();
        hands.push({ box: matchingBox, palmLandmarks, confidence: scores[index] });
      }
    }
    predictions.dispose();
    boxes.dispose();
    return hands;
  }
  async estimateHandBounds(input, config3) {
    const inputHeight = input.shape[1];
    const inputWidth = input.shape[2];
    const image18 = tf11.tidy(() => input.resizeBilinear([this.inputSize, this.inputSize]).div(127.5).sub(1));
    const predictions = await this.getBoxes(image18, config3);
    image18.dispose();
    const hands = [];
    if (!predictions || predictions.length === 0)
      return hands;
    for (const prediction of predictions) {
      const boxes = prediction.box.dataSync();
      const startPoint = boxes.slice(0, 2);
      const endPoint = boxes.slice(2, 4);
      const palmLandmarks = prediction.palmLandmarks.arraySync();
      prediction.box.dispose();
      prediction.palmLandmarks.dispose();
      hands.push(scaleBoxCoordinates2({ startPoint, endPoint, palmLandmarks, confidence: prediction.confidence }, [inputWidth / this.inputSize, inputHeight / this.inputSize]));
    }
    return hands;
  }
};

// src/handpose/handpipeline.ts
var tf12 = __toModule(require_tfjs_esm());

// src/handpose/util.ts
function normalizeRadians2(angle) {
  return angle - 2 * Math.PI * Math.floor((angle + Math.PI) / (2 * Math.PI));
}
function computeRotation2(point1, point2) {
  const radians = Math.PI / 2 - Math.atan2(-(point2[1] - point1[1]), point2[0] - point1[0]);
  return normalizeRadians2(radians);
}
var buildTranslationMatrix2 = (x, y) => [[1, 0, x], [0, 1, y], [0, 0, 1]];
function dot2(v1, v2) {
  let product = 0;
  for (let i = 0; i < v1.length; i++) {
    product += v1[i] * v2[i];
  }
  return product;
}
function getColumnFrom2DArr2(arr, columnIndex) {
  const column = [];
  for (let i = 0; i < arr.length; i++) {
    column.push(arr[i][columnIndex]);
  }
  return column;
}
function multiplyTransformMatrices2(mat1, mat2) {
  const product = [];
  const size = mat1.length;
  for (let row = 0; row < size; row++) {
    product.push([]);
    for (let col = 0; col < size; col++) {
      product[row].push(dot2(mat1[row], getColumnFrom2DArr2(mat2, col)));
    }
  }
  return product;
}
function buildRotationMatrix2(rotation, center) {
  const cosA = Math.cos(rotation);
  const sinA = Math.sin(rotation);
  const rotationMatrix = [[cosA, -sinA, 0], [sinA, cosA, 0], [0, 0, 1]];
  const translationMatrix = buildTranslationMatrix2(center[0], center[1]);
  const translationTimesRotation = multiplyTransformMatrices2(translationMatrix, rotationMatrix);
  const negativeTranslationMatrix = buildTranslationMatrix2(-center[0], -center[1]);
  return multiplyTransformMatrices2(translationTimesRotation, negativeTranslationMatrix);
}
function invertTransformMatrix2(matrix) {
  const rotationComponent = [[matrix[0][0], matrix[1][0]], [matrix[0][1], matrix[1][1]]];
  const translationComponent = [matrix[0][2], matrix[1][2]];
  const invertedTranslation = [
    -dot2(rotationComponent[0], translationComponent),
    -dot2(rotationComponent[1], translationComponent)
  ];
  return [
    rotationComponent[0].concat(invertedTranslation[0]),
    rotationComponent[1].concat(invertedTranslation[1]),
    [0, 0, 1]
  ];
}
function rotatePoint2(homogeneousCoordinate, rotationMatrix) {
  return [
    dot2(homogeneousCoordinate, rotationMatrix[0]),
    dot2(homogeneousCoordinate, rotationMatrix[1])
  ];
}

// src/handpose/handpipeline.ts
var palmBoxEnlargeFactor = 5;
var handBoxEnlargeFactor = 1.65;
var palmLandmarkIds = [0, 5, 9, 13, 17, 1, 2];
var palmLandmarksPalmBase = 0;
var palmLandmarksMiddleFingerBase = 2;
var HandPipeline = class {
  constructor(handDetector, handPoseModel2) {
    var _a;
    this.handDetector = handDetector;
    this.handPoseModel = handPoseModel2;
    this.inputSize = (_a = this.handPoseModel) == null ? void 0 : _a.inputs[0].shape[2];
    this.storedBoxes = [];
    this.skipped = 0;
    this.detectedHands = 0;
  }
  calculateLandmarksBoundingBox(landmarks) {
    const xs = landmarks.map((d) => d[0]);
    const ys = landmarks.map((d) => d[1]);
    const startPoint = [Math.min(...xs), Math.min(...ys)];
    const endPoint = [Math.max(...xs), Math.max(...ys)];
    return { startPoint, endPoint };
  }
  getBoxForPalmLandmarks(palmLandmarks, rotationMatrix) {
    const rotatedPalmLandmarks = palmLandmarks.map((coord) => rotatePoint2([...coord, 1], rotationMatrix));
    const boxAroundPalm = this.calculateLandmarksBoundingBox(rotatedPalmLandmarks);
    return enlargeBox2(squarifyBox2(boxAroundPalm), palmBoxEnlargeFactor);
  }
  getBoxForHandLandmarks(landmarks) {
    const boundingBox = this.calculateLandmarksBoundingBox(landmarks);
    const boxAroundHand = enlargeBox2(squarifyBox2(boundingBox), handBoxEnlargeFactor);
    boxAroundHand.palmLandmarks = [];
    for (let i = 0; i < palmLandmarkIds.length; i++) {
      boxAroundHand.palmLandmarks.push(landmarks[palmLandmarkIds[i]].slice(0, 2));
    }
    return boxAroundHand;
  }
  transformRawCoords(rawCoords, box22, angle, rotationMatrix) {
    const boxSize = getBoxSize2(box22);
    const scaleFactor = [boxSize[0] / this.inputSize, boxSize[1] / this.inputSize, (boxSize[0] + boxSize[1]) / this.inputSize / 2];
    const coordsScaled = rawCoords.map((coord) => [
      scaleFactor[0] * (coord[0] - this.inputSize / 2),
      scaleFactor[1] * (coord[1] - this.inputSize / 2),
      scaleFactor[2] * coord[2]
    ]);
    const coordsRotationMatrix = buildRotationMatrix2(angle, [0, 0]);
    const coordsRotated = coordsScaled.map((coord) => {
      const rotated = rotatePoint2(coord, coordsRotationMatrix);
      return [...rotated, coord[2]];
    });
    const inverseRotationMatrix = invertTransformMatrix2(rotationMatrix);
    const boxCenter = [...getBoxCenter2(box22), 1];
    const originalBoxCenter = [
      dot2(boxCenter, inverseRotationMatrix[0]),
      dot2(boxCenter, inverseRotationMatrix[1])
    ];
    return coordsRotated.map((coord) => [
      Math.trunc(coord[0] + originalBoxCenter[0]),
      Math.trunc(coord[1] + originalBoxCenter[1]),
      Math.trunc(coord[2])
    ]);
  }
  async estimateHands(image18, config3) {
    let useFreshBox = false;
    let boxes;
    if (this.skipped === 0 || this.skipped > config3.hand.skipFrames || !config3.hand.landmarks || !config3.skipFrame) {
      boxes = await this.handDetector.estimateHandBounds(image18, config3);
      this.skipped = 0;
    }
    if (config3.skipFrame)
      this.skipped++;
    if (boxes && boxes.length > 0 && (boxes.length !== this.detectedHands && this.detectedHands !== config3.hand.maxDetected || !config3.hand.landmarks)) {
      this.detectedHands = 0;
      this.storedBoxes = [...boxes];
      if (this.storedBoxes.length > 0)
        useFreshBox = true;
    }
    const hands = [];
    for (let i = 0; i < this.storedBoxes.length; i++) {
      const currentBox = this.storedBoxes[i];
      if (!currentBox)
        continue;
      if (config3.hand.landmarks) {
        const angle = config3.hand.rotation ? computeRotation2(currentBox.palmLandmarks[palmLandmarksPalmBase], currentBox.palmLandmarks[palmLandmarksMiddleFingerBase]) : 0;
        const palmCenter = getBoxCenter2(currentBox);
        const palmCenterNormalized = [palmCenter[0] / image18.shape[2], palmCenter[1] / image18.shape[1]];
        const rotatedImage = config3.hand.rotation && tf12.ENV.flags.IS_BROWSER ? tf12.image.rotateWithOffset(image18, angle, 0, palmCenterNormalized) : image18.clone();
        const rotationMatrix = buildRotationMatrix2(-angle, palmCenter);
        const newBox = useFreshBox ? this.getBoxForPalmLandmarks(currentBox.palmLandmarks, rotationMatrix) : currentBox;
        const croppedInput = cutBoxFromImageAndResize2(newBox, rotatedImage, [this.inputSize, this.inputSize]);
        const handImage = croppedInput.div(255);
        croppedInput.dispose();
        rotatedImage.dispose();
        const [confidenceT, keypoints3] = await this.handPoseModel.predict(handImage);
        handImage.dispose();
        const confidence = confidenceT.dataSync()[0];
        confidenceT.dispose();
        if (confidence >= config3.hand.minConfidence) {
          const keypointsReshaped = tf12.reshape(keypoints3, [-1, 3]);
          const rawCoords = keypointsReshaped.arraySync();
          keypoints3.dispose();
          keypointsReshaped.dispose();
          const coords3 = this.transformRawCoords(rawCoords, newBox, angle, rotationMatrix);
          const nextBoundingBox = this.getBoxForHandLandmarks(coords3);
          this.storedBoxes[i] = { ...nextBoundingBox, confidence };
          const result = {
            landmarks: coords3,
            confidence,
            box: { topLeft: nextBoundingBox.startPoint, bottomRight: nextBoundingBox.endPoint }
          };
          hands.push(result);
        } else {
          this.storedBoxes[i] = null;
        }
        keypoints3.dispose();
      } else {
        const enlarged = enlargeBox2(squarifyBox2(currentBox), handBoxEnlargeFactor);
        const result = {
          confidence: currentBox.confidence,
          box: { topLeft: enlarged.startPoint, bottomRight: enlarged.endPoint }
        };
        hands.push(result);
      }
    }
    this.storedBoxes = this.storedBoxes.filter((a) => a !== null);
    this.detectedHands = hands.length;
    return hands;
  }
};

// src/handpose/handpose.ts
var meshAnnotations = {
  thumb: [1, 2, 3, 4],
  indexFinger: [5, 6, 7, 8],
  middleFinger: [9, 10, 11, 12],
  ringFinger: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20],
  palmBase: [0]
};
var handDetectorModel;
var handPoseModel;
var handPipeline;
async function predict5(input, config3) {
  const predictions = await handPipeline.estimateHands(input, config3);
  if (!predictions)
    return [];
  const hands = [];
  for (let i = 0; i < predictions.length; i++) {
    const annotations3 = {};
    if (predictions[i].landmarks) {
      for (const key of Object.keys(meshAnnotations)) {
        annotations3[key] = meshAnnotations[key].map((index) => predictions[i].landmarks[index]);
      }
    }
    const keypoints3 = predictions[i].landmarks;
    let box6 = [Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER, 0, 0];
    let boxRaw3 = [0, 0, 0, 0];
    if (keypoints3 && keypoints3.length > 0) {
      for (const pt of keypoints3) {
        if (pt[0] < box6[0])
          box6[0] = pt[0];
        if (pt[1] < box6[1])
          box6[1] = pt[1];
        if (pt[0] > box6[2])
          box6[2] = pt[0];
        if (pt[1] > box6[3])
          box6[3] = pt[1];
      }
      box6[2] -= box6[0];
      box6[3] -= box6[1];
      boxRaw3 = [box6[0] / (input.shape[2] || 0), box6[1] / (input.shape[1] || 0), box6[2] / (input.shape[2] || 0), box6[3] / (input.shape[1] || 0)];
    } else {
      box6 = predictions[i].box ? [
        Math.trunc(Math.max(0, predictions[i].box.topLeft[0])),
        Math.trunc(Math.max(0, predictions[i].box.topLeft[1])),
        Math.trunc(Math.min(input.shape[2] || 0, predictions[i].box.bottomRight[0]) - Math.max(0, predictions[i].box.topLeft[0])),
        Math.trunc(Math.min(input.shape[1] || 0, predictions[i].box.bottomRight[1]) - Math.max(0, predictions[i].box.topLeft[1]))
      ] : [0, 0, 0, 0];
      boxRaw3 = [
        predictions[i].box.topLeft[0] / (input.shape[2] || 0),
        predictions[i].box.topLeft[1] / (input.shape[1] || 0),
        (predictions[i].box.bottomRight[0] - predictions[i].box.topLeft[0]) / (input.shape[2] || 0),
        (predictions[i].box.bottomRight[1] - predictions[i].box.topLeft[1]) / (input.shape[1] || 0)
      ];
    }
    hands.push({ id: i, score: Math.round(100 * predictions[i].confidence) / 100, box: box6, boxRaw: boxRaw3, keypoints: keypoints3, annotations: annotations3 });
  }
  return hands;
}
async function load6(config3) {
  if (!handDetectorModel || !handPoseModel) {
    [handDetectorModel, handPoseModel] = await Promise.all([
      config3.hand.enabled ? tf13.loadGraphModel(join(config3.modelBasePath, config3.hand.detector.modelPath), { fromTFHub: config3.hand.detector.modelPath.includes("tfhub.dev") }) : null,
      config3.hand.landmarks ? tf13.loadGraphModel(join(config3.modelBasePath, config3.hand.skeleton.modelPath), { fromTFHub: config3.hand.skeleton.modelPath.includes("tfhub.dev") }) : null
    ]);
    if (config3.hand.enabled) {
      if (!handDetectorModel || !handDetectorModel["modelUrl"])
        log("load model failed:", config3.hand.detector.modelPath);
      else if (config3.debug)
        log("load model:", handDetectorModel["modelUrl"]);
      if (!handPoseModel || !handPoseModel["modelUrl"])
        log("load model failed:", config3.hand.skeleton.modelPath);
      else if (config3.debug)
        log("load model:", handPoseModel["modelUrl"]);
    }
  } else {
    if (config3.debug)
      log("cached model:", handDetectorModel["modelUrl"]);
    if (config3.debug)
      log("cached model:", handPoseModel["modelUrl"]);
  }
  const handDetector = new HandDetector(handDetectorModel);
  handPipeline = new HandPipeline(handDetector, handPoseModel);
  return [handDetectorModel, handPoseModel];
}

// src/blazepose/blazepose.ts
var tf14 = __toModule(require_tfjs_esm());

// src/blazepose/annotations.ts
var full = [
  "nose",
  "leftEyeInside",
  "leftEye",
  "leftEyeOutside",
  "rightEyeInside",
  "rightEye",
  "rightEyeOutside",
  "leftEar",
  "rightEar",
  "leftMouth",
  "rightMouth",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftPalm",
  "rightPalm",
  "leftIndex",
  "rightIndex",
  "leftPinky",
  "rightPinky",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
  "leftHeel",
  "rightHeel",
  "leftFoot",
  "rightFoot",
  "midHip",
  "forehead",
  "leftThumb",
  "leftHand",
  "rightThumb",
  "rightHand"
];
var upper = [
  "nose",
  "leftEyeInside",
  "leftEye",
  "leftEyeOutside",
  "rightEyeInside",
  "rightEye",
  "rightEyeOutside",
  "leftEar",
  "rightEar",
  "leftMouth",
  "rightMouth",
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "left:15",
  "right:16",
  "left:17",
  "right:18",
  "left:19",
  "right:20",
  "left:21",
  "right:22",
  "leftChest",
  "rightChest",
  "neck",
  "forehead",
  "left:27",
  "right:28",
  "left:29",
  "right:30"
];

// src/blazepose/blazepose.ts
var model4;
async function load7(config3) {
  if (!model4) {
    model4 = await tf14.loadGraphModel(join(config3.modelBasePath, config3.body.modelPath));
    model4["width"] = parseInt(model4["signature"].inputs["input_1:0"].tensorShape.dim[2].size);
    model4["height"] = parseInt(model4["signature"].inputs["input_1:0"].tensorShape.dim[1].size);
    if (!model4 || !model4["modelUrl"])
      log("load model failed:", config3.body.modelPath);
    else if (config3.debug)
      log("load model:", model4["modelUrl"]);
  } else if (config3.debug)
    log("cached model:", model4["modelUrl"]);
  return model4;
}
async function predict6(image18, config3) {
  var _a;
  if (!model4)
    return [];
  if (!config3.body.enabled)
    return [];
  const imgSize = { width: image18.shape[2] || 0, height: image18.shape[1] || 0 };
  const resize = tf14.image.resizeBilinear(image18, [model4["width"], model4["height"]], false);
  const normalize = tf14.div(resize, [255]);
  resize.dispose();
  const resT = await model4.predict(normalize);
  const points = ((_a = resT.find((t) => t.size === 195 || t.size === 155)) == null ? void 0 : _a.dataSync()) || [];
  resT.forEach((t) => t.dispose());
  normalize.dispose();
  const keypoints3 = [];
  const labels2 = (points == null ? void 0 : points.length) === 195 ? full : upper;
  const depth = 5;
  for (let i = 0; i < points.length / depth; i++) {
    keypoints3.push({
      id: i,
      part: labels2[i],
      position: [
        Math.trunc(imgSize.width * points[depth * i + 0] / 255),
        Math.trunc(imgSize.height * points[depth * i + 1] / 255),
        Math.trunc(points[depth * i + 2]) + 0
      ],
      positionRaw: [
        points[depth * i + 0] / 255,
        points[depth * i + 1] / 255,
        points[depth * i + 2] + 0
      ],
      score: (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 3])))) / 100,
      presence: (100 - Math.trunc(100 / (1 + Math.exp(points[depth * i + 4])))) / 100
    });
  }
  const x = keypoints3.map((a) => a.position[0]);
  const y = keypoints3.map((a) => a.position[1]);
  const box6 = [
    Math.min(...x),
    Math.min(...y),
    Math.max(...x) - Math.min(...x),
    Math.max(...y) - Math.min(...x)
  ];
  const boxRaw3 = [0, 0, 0, 0];
  const score3 = keypoints3.reduce((prev, curr) => curr.score > prev ? curr.score : prev, 0);
  return [{ id: 0, score: score3, box: box6, boxRaw: boxRaw3, keypoints: keypoints3 }];
}

// src/efficientpose/efficientpose.ts
var tf15 = __toModule(require_tfjs_esm());
var model5;
var keypoints = [];
var box4 = [0, 0, 0, 0];
var boxRaw = [0, 0, 0, 0];
var score = 0;
var skipped3 = Number.MAX_SAFE_INTEGER;
var bodyParts = ["head", "neck", "rightShoulder", "rightElbow", "rightWrist", "chest", "leftShoulder", "leftElbow", "leftWrist", "pelvis", "rightHip", "rightKnee", "rightAnkle", "leftHip", "leftKnee", "leftAnkle"];
async function load8(config3) {
  if (!model5) {
    model5 = await tf15.loadGraphModel(join(config3.modelBasePath, config3.body.modelPath));
    if (!model5 || !model5["modelUrl"])
      log("load model failed:", config3.body.modelPath);
    else if (config3.debug)
      log("load model:", model5["modelUrl"]);
  } else if (config3.debug)
    log("cached model:", model5["modelUrl"]);
  return model5;
}
function max2d(inputs, minScore) {
  const [width, height] = inputs.shape;
  return tf15.tidy(() => {
    const mod = (a, b) => tf15.sub(a, tf15.mul(tf15.div(a, tf15.scalar(b, "int32")), tf15.scalar(b, "int32")));
    const reshaped = tf15.reshape(inputs, [height * width]);
    const newScore = tf15.max(reshaped, 0).dataSync()[0];
    if (newScore > minScore) {
      const coords3 = tf15.argMax(reshaped, 0);
      const x = mod(coords3, width).dataSync()[0];
      const y = tf15.div(coords3, tf15.scalar(width, "int32")).dataSync()[0];
      return [x, y, newScore];
    }
    return [0, 0, newScore];
  });
}
async function predict7(image18, config3) {
  if (skipped3 < config3.body.skipFrames && config3.skipFrame && Object.keys(keypoints).length > 0) {
    skipped3++;
    return [{ id: 0, score, box: box4, boxRaw, keypoints }];
  }
  skipped3 = 0;
  return new Promise(async (resolve) => {
    const tensor2 = tf15.tidy(() => {
      if (!model5.inputs[0].shape)
        return null;
      const resize = tf15.image.resizeBilinear(image18, [model5.inputs[0].shape[2], model5.inputs[0].shape[1]], false);
      const enhance2 = tf15.mul(resize, 2);
      const norm = enhance2.sub(1);
      return norm;
    });
    let resT;
    if (config3.body.enabled)
      resT = await model5.predict(tensor2);
    tensor2.dispose();
    if (resT) {
      keypoints.length = 0;
      const squeeze7 = resT.squeeze();
      tf15.dispose(resT);
      const stack2 = squeeze7.unstack(2);
      tf15.dispose(squeeze7);
      for (let id = 0; id < stack2.length; id++) {
        const [x2, y2, partScore] = max2d(stack2[id], config3.body.minConfidence);
        if (score > config3.body.minConfidence) {
          keypoints.push({
            score: Math.round(100 * partScore) / 100,
            part: bodyParts[id],
            positionRaw: [
              x2 / model5.inputs[0].shape[2],
              y2 / model5.inputs[0].shape[1]
            ],
            position: [
              Math.round(image18.shape[2] * x2 / model5.inputs[0].shape[2]),
              Math.round(image18.shape[1] * y2 / model5.inputs[0].shape[1])
            ]
          });
        }
      }
      stack2.forEach((s) => tf15.dispose(s));
    }
    score = keypoints.reduce((prev, curr) => curr.score > prev ? curr.score : prev, 0);
    const x = keypoints.map((a) => a.position[0]);
    const y = keypoints.map((a) => a.position[1]);
    box4 = [
      Math.min(...x),
      Math.min(...y),
      Math.max(...x) - Math.min(...x),
      Math.max(...y) - Math.min(...y)
    ];
    const xRaw = keypoints.map((a) => a.positionRaw[0]);
    const yRaw = keypoints.map((a) => a.positionRaw[1]);
    boxRaw = [
      Math.min(...xRaw),
      Math.min(...yRaw),
      Math.max(...xRaw) - Math.min(...xRaw),
      Math.max(...yRaw) - Math.min(...yRaw)
    ];
    resolve([{ id: 0, score, box: box4, boxRaw, keypoints }]);
  });
}

// src/movenet/movenet.ts
var tf16 = __toModule(require_tfjs_esm());
var model6;
var keypoints2 = [];
var box5 = [0, 0, 0, 0];
var boxRaw2 = [0, 0, 0, 0];
var score2 = 0;
var skipped4 = Number.MAX_SAFE_INTEGER;
var bodyParts2 = ["nose", "leftEye", "rightEye", "leftEar", "rightEar", "leftShoulder", "rightShoulder", "leftElbow", "rightElbow", "leftWrist", "rightWrist", "leftHip", "rightHip", "leftKnee", "rightKnee", "leftAnkle", "rightAnkle"];
async function load9(config3) {
  if (!model6) {
    model6 = await tf16.loadGraphModel(join(config3.modelBasePath, config3.body.modelPath));
    if (!model6 || !model6["modelUrl"])
      log("load model failed:", config3.body.modelPath);
    else if (config3.debug)
      log("load model:", model6["modelUrl"]);
  } else if (config3.debug)
    log("cached model:", model6["modelUrl"]);
  return model6;
}
async function predict8(image18, config3) {
  if (skipped4 < config3.body.skipFrames && config3.skipFrame && Object.keys(keypoints2).length > 0) {
    skipped4++;
    return [{ id: 0, score: score2, box: box5, boxRaw: boxRaw2, keypoints: keypoints2 }];
  }
  skipped4 = 0;
  return new Promise(async (resolve) => {
    const tensor2 = tf16.tidy(() => {
      if (!model6.inputs[0].shape)
        return null;
      const resize = tf16.image.resizeBilinear(image18, [model6.inputs[0].shape[2], model6.inputs[0].shape[1]], false);
      const cast2 = tf16.cast(resize, "int32");
      return cast2;
    });
    let resT;
    if (config3.body.enabled)
      resT = await model6.predict(tensor2);
    tensor2.dispose();
    if (resT) {
      keypoints2.length = 0;
      const res = resT.arraySync();
      tf16.dispose(resT);
      const kpt3 = res[0][0];
      for (let id = 0; id < kpt3.length; id++) {
        score2 = kpt3[id][2];
        if (score2 > config3.body.minConfidence) {
          keypoints2.push({
            score: Math.round(100 * score2) / 100,
            part: bodyParts2[id],
            positionRaw: [
              kpt3[id][1],
              kpt3[id][0]
            ],
            position: [
              Math.round((image18.shape[2] || 0) * kpt3[id][1]),
              Math.round((image18.shape[1] || 0) * kpt3[id][0])
            ]
          });
        }
      }
    }
    score2 = keypoints2.reduce((prev, curr) => curr.score > prev ? curr.score : prev, 0);
    const x = keypoints2.map((a) => a.position[0]);
    const y = keypoints2.map((a) => a.position[1]);
    box5 = [
      Math.min(...x),
      Math.min(...y),
      Math.max(...x) - Math.min(...x),
      Math.max(...y) - Math.min(...y)
    ];
    const xRaw = keypoints2.map((a) => a.positionRaw[0]);
    const yRaw = keypoints2.map((a) => a.positionRaw[1]);
    boxRaw2 = [
      Math.min(...xRaw),
      Math.min(...yRaw),
      Math.max(...xRaw) - Math.min(...xRaw),
      Math.max(...yRaw) - Math.min(...yRaw)
    ];
    resolve([{ id: 0, score: score2, box: box5, boxRaw: boxRaw2, keypoints: keypoints2 }]);
  });
}

// src/object/nanodet.ts
var tf17 = __toModule(require_tfjs_esm());

// src/object/labels.ts
var labels = [
  { class: 1, label: "person" },
  { class: 2, label: "bicycle" },
  { class: 3, label: "car" },
  { class: 4, label: "motorcycle" },
  { class: 5, label: "airplane" },
  { class: 6, label: "bus" },
  { class: 7, label: "train" },
  { class: 8, label: "truck" },
  { class: 9, label: "boat" },
  { class: 10, label: "traffic light" },
  { class: 11, label: "fire hydrant" },
  { class: 12, label: "stop sign" },
  { class: 13, label: "parking meter" },
  { class: 14, label: "bench" },
  { class: 15, label: "bird" },
  { class: 16, label: "cat" },
  { class: 17, label: "dog" },
  { class: 18, label: "horse" },
  { class: 19, label: "sheep" },
  { class: 20, label: "cow" },
  { class: 21, label: "elephant" },
  { class: 22, label: "bear" },
  { class: 23, label: "zebra" },
  { class: 24, label: "giraffe" },
  { class: 25, label: "backpack" },
  { class: 26, label: "umbrella" },
  { class: 27, label: "handbag" },
  { class: 28, label: "tie" },
  { class: 29, label: "suitcase" },
  { class: 30, label: "frisbee" },
  { class: 31, label: "skis" },
  { class: 32, label: "snowboard" },
  { class: 33, label: "sports ball" },
  { class: 34, label: "kite" },
  { class: 35, label: "baseball bat" },
  { class: 36, label: "baseball glove" },
  { class: 37, label: "skateboard" },
  { class: 38, label: "surfboard" },
  { class: 39, label: "tennis racket" },
  { class: 40, label: "bottle" },
  { class: 41, label: "wine glass" },
  { class: 42, label: "cup" },
  { class: 43, label: "fork" },
  { class: 44, label: "knife" },
  { class: 45, label: "spoon" },
  { class: 46, label: "bowl" },
  { class: 47, label: "banana" },
  { class: 48, label: "apple" },
  { class: 49, label: "sandwich" },
  { class: 50, label: "orange" },
  { class: 51, label: "broccoli" },
  { class: 52, label: "carrot" },
  { class: 53, label: "hot dog" },
  { class: 54, label: "pizza" },
  { class: 55, label: "donut" },
  { class: 56, label: "cake" },
  { class: 57, label: "chair" },
  { class: 58, label: "couch" },
  { class: 59, label: "potted plant" },
  { class: 60, label: "bed" },
  { class: 61, label: "dining table" },
  { class: 62, label: "toilet" },
  { class: 63, label: "tv" },
  { class: 64, label: "laptop" },
  { class: 65, label: "mouse" },
  { class: 66, label: "remote" },
  { class: 67, label: "keyboard" },
  { class: 68, label: "cell phone" },
  { class: 69, label: "microwave" },
  { class: 70, label: "oven" },
  { class: 71, label: "toaster" },
  { class: 72, label: "sink" },
  { class: 73, label: "refrigerator" },
  { class: 74, label: "book" },
  { class: 75, label: "clock" },
  { class: 76, label: "vase" },
  { class: 77, label: "scissors" },
  { class: 78, label: "teddy bear" },
  { class: 79, label: "hair drier" },
  { class: 80, label: "toothbrush" }
];

// src/object/nanodet.ts
var model7;
var last3 = [];
var skipped5 = Number.MAX_SAFE_INTEGER;
var scaleBox = 2.5;
async function load10(config3) {
  if (!model7) {
    model7 = await tf17.loadGraphModel(join(config3.modelBasePath, config3.object.modelPath));
    const inputs = Object.values(model7.modelSignature["inputs"]);
    model7.inputSize = Array.isArray(inputs) ? parseInt(inputs[0].tensorShape.dim[2].size) : null;
    if (!model7.inputSize)
      throw new Error(`Human: Cannot determine model inputSize: ${config3.object.modelPath}`);
    if (!model7 || !model7.modelUrl)
      log("load model failed:", config3.object.modelPath);
    else if (config3.debug)
      log("load model:", model7.modelUrl);
  } else if (config3.debug)
    log("cached model:", model7.modelUrl);
  return model7;
}
async function process2(res, inputSize, outputShape, config3) {
  let id = 0;
  let results = [];
  for (const strideSize of [1, 2, 4]) {
    tf17.tidy(() => {
      var _a, _b;
      const baseSize = strideSize * 13;
      const scoresT = (_a = res.find((a) => a.shape[1] === baseSize ** 2 && a.shape[2] === labels.length)) == null ? void 0 : _a.squeeze();
      const featuresT = (_b = res.find((a) => a.shape[1] === baseSize ** 2 && a.shape[2] < labels.length)) == null ? void 0 : _b.squeeze();
      const boxesMax = featuresT.reshape([-1, 4, featuresT.shape[1] / 4]);
      const boxIdx = boxesMax.argMax(2).arraySync();
      const scores = scoresT.arraySync();
      for (let i = 0; i < scoresT.shape[0]; i++) {
        for (let j = 0; j < scoresT.shape[1]; j++) {
          const score3 = scores[i][j];
          if (score3 > config3.object.minConfidence && j !== 61) {
            const cx = (0.5 + Math.trunc(i % baseSize)) / baseSize;
            const cy = (0.5 + Math.trunc(i / baseSize)) / baseSize;
            const boxOffset = boxIdx[i].map((a) => a * (baseSize / strideSize / inputSize));
            const [x, y] = [
              cx - scaleBox / strideSize * boxOffset[0],
              cy - scaleBox / strideSize * boxOffset[1]
            ];
            const [w, h] = [
              cx + scaleBox / strideSize * boxOffset[2] - x,
              cy + scaleBox / strideSize * boxOffset[3] - y
            ];
            let boxRaw3 = [x, y, w, h];
            boxRaw3 = boxRaw3.map((a) => Math.max(0, Math.min(a, 1)));
            const box6 = [
              boxRaw3[0] * outputShape[0],
              boxRaw3[1] * outputShape[1],
              boxRaw3[2] * outputShape[0],
              boxRaw3[3] * outputShape[1]
            ];
            const result = {
              id: id++,
              score: Math.round(100 * score3) / 100,
              class: j + 1,
              label: labels[j].label,
              box: box6.map((a) => Math.trunc(a)),
              boxRaw: boxRaw3
            };
            results.push(result);
          }
        }
      }
    });
  }
  res.forEach((t) => tf17.dispose(t));
  const nmsBoxes = results.map((a) => [a.boxRaw[1], a.boxRaw[0], a.boxRaw[3], a.boxRaw[2]]);
  const nmsScores = results.map((a) => a.score);
  let nmsIdx = [];
  if (nmsBoxes && nmsBoxes.length > 0) {
    const nms = await tf17.image.nonMaxSuppressionAsync(nmsBoxes, nmsScores, config3.object.maxDetected, config3.object.iouThreshold, config3.object.minConfidence);
    nmsIdx = nms.dataSync();
    tf17.dispose(nms);
  }
  results = results.filter((_val, idx) => nmsIdx.includes(idx)).sort((a, b) => b.score - a.score);
  return results;
}
async function predict9(image18, config3) {
  if (skipped5 < config3.object.skipFrames && config3.skipFrame && last3.length > 0) {
    skipped5++;
    return last3;
  }
  skipped5 = 0;
  return new Promise(async (resolve) => {
    const outputSize = [image18.shape[2], image18.shape[1]];
    const resize = tf17.image.resizeBilinear(image18, [model7.inputSize, model7.inputSize], false);
    const norm = resize.div(255);
    const transpose = norm.transpose([0, 3, 1, 2]);
    norm.dispose();
    resize.dispose();
    let objectT;
    if (config3.object.enabled)
      objectT = await model7.predict(transpose);
    transpose.dispose();
    const obj = await process2(objectT, model7.inputSize, outputSize, config3);
    last3 = obj;
    resolve(obj);
  });
}

// src/object/centernet.ts
var tf18 = __toModule(require_tfjs_esm());
var model8;
var last4 = [];
var skipped6 = Number.MAX_SAFE_INTEGER;
async function load11(config3) {
  if (!model8) {
    model8 = await tf18.loadGraphModel(join(config3.modelBasePath, config3.object.modelPath));
    const inputs = Object.values(model8.modelSignature["inputs"]);
    model8.inputSize = Array.isArray(inputs) ? parseInt(inputs[0].tensorShape.dim[2].size) : null;
    if (!model8.inputSize)
      throw new Error(`Human: Cannot determine model inputSize: ${config3.object.modelPath}`);
    if (!model8 || !model8.modelUrl)
      log("load model failed:", config3.object.modelPath);
    else if (config3.debug)
      log("load model:", model8.modelUrl);
  } else if (config3.debug)
    log("cached model:", model8.modelUrl);
  return model8;
}
async function process3(res, inputSize, outputShape, config3) {
  if (!res)
    return [];
  const results = [];
  const detections = res.arraySync();
  const squeezeT = tf18.squeeze(res);
  res.dispose();
  const arr = tf18.split(squeezeT, 6, 1);
  squeezeT.dispose();
  const stackT = tf18.stack([arr[1], arr[0], arr[3], arr[2]], 1);
  const boxesT = stackT.squeeze();
  const scoresT = arr[4].squeeze();
  const classesT = arr[5].squeeze();
  arr.forEach((t) => t.dispose());
  const nmsT = await tf18.image.nonMaxSuppressionAsync(boxesT, scoresT, config3.object.maxDetected, config3.object.iouThreshold, config3.object.minConfidence);
  boxesT.dispose();
  scoresT.dispose();
  classesT.dispose();
  const nms = nmsT.dataSync();
  nmsT.dispose();
  let i = 0;
  for (const id of nms) {
    const score3 = Math.trunc(100 * detections[0][id][4]) / 100;
    const classVal = detections[0][id][5];
    const label = labels[classVal].label;
    const boxRaw3 = [
      detections[0][id][0] / inputSize,
      detections[0][id][1] / inputSize,
      detections[0][id][2] / inputSize,
      detections[0][id][3] / inputSize
    ];
    const box6 = [
      Math.trunc(boxRaw3[0] * outputShape[0]),
      Math.trunc(boxRaw3[1] * outputShape[1]),
      Math.trunc(boxRaw3[2] * outputShape[0]),
      Math.trunc(boxRaw3[3] * outputShape[1])
    ];
    results.push({ id: i++, score: score3, class: classVal, label, box: box6, boxRaw: boxRaw3 });
  }
  return results;
}
async function predict10(input, config3) {
  if (skipped6 < config3.object.skipFrames && config3.skipFrame && last4.length > 0) {
    skipped6++;
    return last4;
  }
  skipped6 = 0;
  return new Promise(async (resolve) => {
    const outputSize = [input.shape[2], input.shape[1]];
    const resize = tf18.image.resizeBilinear(input, [model8.inputSize, model8.inputSize]);
    const objectT = config3.object.enabled ? model8.execute(resize, ["tower_0/detections"]) : null;
    resize.dispose();
    const obj = await process3(objectT, model8.inputSize, outputSize, config3);
    last4 = obj;
    resolve(obj);
  });
}

// src/gesture/gesture.ts
var body = (res) => {
  if (!res)
    return [];
  const gestures = [];
  for (let i = 0; i < res.length; i++) {
    const leftWrist = res[i].keypoints.find((a) => a.part === "leftWrist");
    const rightWrist = res[i].keypoints.find((a) => a.part === "rightWrist");
    const nose = res[i].keypoints.find((a) => a.part === "nose");
    if (nose && leftWrist && rightWrist && leftWrist.position.y < nose.position.y && rightWrist.position.y < nose.position.y)
      gestures.push({ body: i, gesture: "i give up" });
    else if (nose && leftWrist && leftWrist.position.y < nose.position.y)
      gestures.push({ body: i, gesture: "raise left hand" });
    else if (nose && rightWrist && rightWrist.position.y < nose.position.y)
      gestures.push({ body: i, gesture: "raise right hand" });
    const leftShoulder = res[i].keypoints.find((a) => a.part === "leftShoulder");
    const rightShoulder = res[i].keypoints.find((a) => a.part === "rightShoulder");
    if (leftShoulder && rightShoulder)
      gestures.push({ body: i, gesture: `leaning ${leftShoulder.position.y > rightShoulder.position.y ? "left" : "right"}` });
  }
  return gestures;
};
var face = (res) => {
  if (!res)
    return [];
  const gestures = [];
  for (let i = 0; i < res.length; i++) {
    if (res[i].mesh && res[i].mesh.length > 0) {
      const eyeFacing = res[i].mesh[33][2] - res[i].mesh[263][2];
      if (Math.abs(eyeFacing) < 10)
        gestures.push({ face: i, gesture: "facing center" });
      else
        gestures.push({ face: i, gesture: `facing ${eyeFacing < 0 ? "left" : "right"}` });
      const openLeft = Math.abs(res[i].mesh[374][1] - res[i].mesh[386][1]) / Math.abs(res[i].mesh[443][1] - res[i].mesh[450][1]);
      if (openLeft < 0.2)
        gestures.push({ face: i, gesture: "blink left eye" });
      const openRight = Math.abs(res[i].mesh[145][1] - res[i].mesh[159][1]) / Math.abs(res[i].mesh[223][1] - res[i].mesh[230][1]);
      if (openRight < 0.2)
        gestures.push({ face: i, gesture: "blink right eye" });
      const mouthOpen = Math.min(100, 500 * Math.abs(res[i].mesh[13][1] - res[i].mesh[14][1]) / Math.abs(res[i].mesh[10][1] - res[i].mesh[152][1]));
      if (mouthOpen > 10)
        gestures.push({ face: i, gesture: `mouth ${Math.trunc(mouthOpen)}% open` });
      const chinDepth = res[i].mesh[152][2];
      if (Math.abs(chinDepth) > 10)
        gestures.push({ face: i, gesture: `head ${chinDepth < 0 ? "up" : "down"}` });
    }
  }
  return gestures;
};
var iris = (res) => {
  if (!res)
    return [];
  const gestures = [];
  for (let i = 0; i < res.length; i++) {
    if (!res[i].annotations || !res[i].annotations.leftEyeIris || !res[i].annotations.rightEyeIris)
      continue;
    const sizeXLeft = res[i].annotations.leftEyeIris[3][0] - res[i].annotations.leftEyeIris[1][0];
    const sizeYLeft = res[i].annotations.leftEyeIris[4][1] - res[i].annotations.leftEyeIris[2][1];
    const areaLeft = Math.abs(sizeXLeft * sizeYLeft);
    const sizeXRight = res[i].annotations.rightEyeIris[3][0] - res[i].annotations.rightEyeIris[1][0];
    const sizeYRight = res[i].annotations.rightEyeIris[4][1] - res[i].annotations.rightEyeIris[2][1];
    const areaRight = Math.abs(sizeXRight * sizeYRight);
    let center = false;
    const difference = Math.abs(areaLeft - areaRight) / Math.max(areaLeft, areaRight);
    if (difference < 0.25) {
      center = true;
      gestures.push({ iris: i, gesture: "facing center" });
    }
    const rightIrisCenterX = Math.abs(res[i].mesh[33][0] - res[i].annotations.rightEyeIris[0][0]) / res[i].box[2];
    const leftIrisCenterX = Math.abs(res[i].mesh[263][0] - res[i].annotations.leftEyeIris[0][0]) / res[i].box[2];
    if (leftIrisCenterX > 0.06 || rightIrisCenterX > 0.06)
      center = false;
    if (leftIrisCenterX > 0.06)
      gestures.push({ iris: i, gesture: "looking right" });
    if (rightIrisCenterX > 0.06)
      gestures.push({ iris: i, gesture: "looking left" });
    const rightIrisCenterY = Math.abs(res[i].mesh[145][1] - res[i].annotations.rightEyeIris[0][1]) / res[i].box[3];
    const leftIrisCenterY = Math.abs(res[i].mesh[374][1] - res[i].annotations.leftEyeIris[0][1]) / res[i].box[3];
    if (leftIrisCenterY < 0.01 || rightIrisCenterY < 0.01 || leftIrisCenterY > 0.022 || rightIrisCenterY > 0.022)
      center = false;
    if (leftIrisCenterY < 0.01 || rightIrisCenterY < 0.01)
      gestures.push({ iris: i, gesture: "looking down" });
    if (leftIrisCenterY > 0.022 || rightIrisCenterY > 0.022)
      gestures.push({ iris: i, gesture: "looking up" });
    if (center)
      gestures.push({ iris: i, gesture: "looking center" });
  }
  return gestures;
};
var hand = (res) => {
  if (!res)
    return [];
  const gestures = [];
  for (let i = 0; i < res.length; i++) {
    const fingers = [];
    for (const [finger, pos] of Object.entries(res[i]["annotations"])) {
      if (finger !== "palmBase" && Array.isArray(pos))
        fingers.push({ name: finger.toLowerCase(), position: pos[0] });
    }
    if (fingers && fingers.length > 0) {
      const closest = fingers.reduce((best, a) => best.position[2] < a.position[2] ? best : a);
      const highest = fingers.reduce((best, a) => best.position[1] < a.position[1] ? best : a);
      gestures.push({ hand: i, gesture: `${closest.name} forward ${highest.name} up` });
    }
  }
  return gestures;
};

// src/image/image.ts
var tf19 = __toModule(require_tfjs_esm());

// src/image/imagefx.js
function GLProgram(gl, vertexSource, fragmentSource) {
  const _collect = function(source, prefix, collection) {
    const r = new RegExp("\\b" + prefix + " \\w+ (\\w+)", "ig");
    source.replace(r, (match2, name) => {
      collection[name] = 0;
      return match2;
    });
  };
  const _compile = function(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error("Filter: GL compile failed", gl.getShaderInfoLog(shader));
    return shader;
  };
  this.uniform = {};
  this.attribute = {};
  const _vsh = _compile(vertexSource, gl.VERTEX_SHADER);
  const _fsh = _compile(fragmentSource, gl.FRAGMENT_SHADER);
  this.id = gl.createProgram();
  gl.attachShader(this.id, _vsh);
  gl.attachShader(this.id, _fsh);
  gl.linkProgram(this.id);
  if (!gl.getProgramParameter(this.id, gl.LINK_STATUS))
    throw new Error("Filter: GL link failed", gl.getProgramInfoLog(this.id));
  gl.useProgram(this.id);
  _collect(vertexSource, "attribute", this.attribute);
  for (const a in this.attribute)
    this.attribute[a] = gl.getAttribLocation(this.id, a);
  _collect(vertexSource, "uniform", this.uniform);
  _collect(fragmentSource, "uniform", this.uniform);
  for (const u in this.uniform)
    this.uniform[u] = gl.getUniformLocation(this.id, u);
}
function GLImageFilter(params) {
  if (!params)
    params = {};
  let _drawCount = 0;
  let _sourceTexture = null;
  let _lastInChain = false;
  let _currentFramebufferIndex = -1;
  let _tempFramebuffers = [null, null];
  let _filterChain = [];
  let _width = -1;
  let _height = -1;
  let _vertexBuffer = null;
  let _currentProgram = null;
  const _filter = {};
  const _canvas = params.canvas || document.createElement("canvas");
  const _shaderProgramCache = {};
  const DRAW = { INTERMEDIATE: 1 };
  const gl = _canvas.getContext("webgl");
  if (!gl)
    throw new Error("Filter: getContext() failed");
  this.addFilter = function(name) {
    const args = Array.prototype.slice.call(arguments, 1);
    const filter = _filter[name];
    _filterChain.push({ func: filter, args });
  };
  this.reset = function() {
    _filterChain = [];
  };
  const _resize = function(width, height) {
    if (width === _width && height === _height) {
      return;
    }
    _canvas.width = width;
    _width = width;
    _canvas.height = height;
    _height = height;
    if (!_vertexBuffer) {
      const vertices = new Float32Array([
        -1,
        -1,
        0,
        1,
        1,
        -1,
        1,
        1,
        -1,
        1,
        0,
        0,
        -1,
        1,
        0,
        0,
        1,
        -1,
        1,
        1,
        1,
        1,
        1,
        0
      ]);
      _vertexBuffer = gl.createBuffer(), gl.bindBuffer(gl.ARRAY_BUFFER, _vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    }
    gl.viewport(0, 0, _width, _height);
    _tempFramebuffers = [null, null];
  };
  const _createFramebufferTexture = function(width, height) {
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    const renderbuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.bindTexture(gl.TEXTURE_2D, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { fbo, texture };
  };
  const _getTempFramebuffer = function(index) {
    _tempFramebuffers[index] = _tempFramebuffers[index] || _createFramebufferTexture(_width, _height);
    return _tempFramebuffers[index];
  };
  const _draw = function(flags = null) {
    var _a, _b;
    let source = null;
    let target = null;
    let flipY = false;
    if (_drawCount === 0) {
      source = _sourceTexture;
    } else {
      source = (_a = _getTempFramebuffer(_currentFramebufferIndex)) == null ? void 0 : _a.texture;
    }
    _drawCount++;
    if (_lastInChain && !(flags & DRAW.INTERMEDIATE)) {
      target = null;
      flipY = _drawCount % 2 === 0;
    } else {
      _currentFramebufferIndex = (_currentFramebufferIndex + 1) % 2;
      target = (_b = _getTempFramebuffer(_currentFramebufferIndex)) == null ? void 0 : _b.fbo;
    }
    gl.bindTexture(gl.TEXTURE_2D, source);
    gl.bindFramebuffer(gl.FRAMEBUFFER, target);
    gl.uniform1f(_currentProgram.uniform.flipY, flipY ? -1 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  };
  this.apply = function(image18) {
    _resize(image18.width, image18.height);
    _drawCount = 0;
    if (!_sourceTexture)
      _sourceTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, _sourceTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image18);
    if (_filterChain.length === 0) {
      _draw();
      return _canvas;
    }
    for (let i = 0; i < _filterChain.length; i++) {
      _lastInChain = i === _filterChain.length - 1;
      const f = _filterChain[i];
      f.func.apply(this, f.args || []);
    }
    return _canvas;
  };
  const _compileShader = function(fragmentSource) {
    if (_shaderProgramCache[fragmentSource]) {
      _currentProgram = _shaderProgramCache[fragmentSource];
      gl.useProgram(_currentProgram.id);
      return _currentProgram;
    }
    const SHADER = {};
    SHADER.VERTEX_IDENTITY = [
      "precision highp float;",
      "attribute vec2 pos;",
      "attribute vec2 uv;",
      "varying vec2 vUv;",
      "uniform float flipY;",
      "void main(void) {",
      "vUv = uv;",
      "gl_Position = vec4(pos.x, pos.y*flipY, 0.0, 1.);",
      "}"
    ].join("\n");
    SHADER.FRAGMENT_IDENTITY = [
      "precision highp float;",
      "varying vec2 vUv;",
      "uniform sampler2D texture;",
      "void main(void) {",
      "gl_FragColor = texture2D(texture, vUv);",
      "}"
    ].join("\n");
    _currentProgram = new GLProgram(gl, SHADER.VERTEX_IDENTITY, fragmentSource);
    const floatSize = Float32Array.BYTES_PER_ELEMENT;
    const vertSize = 4 * floatSize;
    gl.enableVertexAttribArray(_currentProgram.attribute.pos);
    gl.vertexAttribPointer(_currentProgram.attribute.pos, 2, gl.FLOAT, false, vertSize, 0 * floatSize);
    gl.enableVertexAttribArray(_currentProgram.attribute.uv);
    gl.vertexAttribPointer(_currentProgram.attribute.uv, 2, gl.FLOAT, false, vertSize, 2 * floatSize);
    _shaderProgramCache[fragmentSource] = _currentProgram;
    return _currentProgram;
  };
  _filter.colorMatrix = function(matrix) {
    const m = new Float32Array(matrix);
    m[4] /= 255;
    m[9] /= 255;
    m[14] /= 255;
    m[19] /= 255;
    const shader = m[18] === 1 && m[3] === 0 && m[8] === 0 && m[13] === 0 && m[15] === 0 && m[16] === 0 && m[17] === 0 && m[19] === 0 ? _filter.colorMatrix.SHADER.WITHOUT_ALPHA : _filter.colorMatrix.SHADER.WITH_ALPHA;
    const program = _compileShader(shader);
    gl.uniform1fv(program.uniform.m, m);
    _draw();
  };
  _filter.colorMatrix.SHADER = {};
  _filter.colorMatrix.SHADER.WITH_ALPHA = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D texture;",
    "uniform float m[20];",
    "void main(void) {",
    "vec4 c = texture2D(texture, vUv);",
    "gl_FragColor.r = m[0] * c.r + m[1] * c.g + m[2] * c.b + m[3] * c.a + m[4];",
    "gl_FragColor.g = m[5] * c.r + m[6] * c.g + m[7] * c.b + m[8] * c.a + m[9];",
    "gl_FragColor.b = m[10] * c.r + m[11] * c.g + m[12] * c.b + m[13] * c.a + m[14];",
    "gl_FragColor.a = m[15] * c.r + m[16] * c.g + m[17] * c.b + m[18] * c.a + m[19];",
    "}"
  ].join("\n");
  _filter.colorMatrix.SHADER.WITHOUT_ALPHA = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D texture;",
    "uniform float m[20];",
    "void main(void) {",
    "vec4 c = texture2D(texture, vUv);",
    "gl_FragColor.r = m[0] * c.r + m[1] * c.g + m[2] * c.b + m[4];",
    "gl_FragColor.g = m[5] * c.r + m[6] * c.g + m[7] * c.b + m[9];",
    "gl_FragColor.b = m[10] * c.r + m[11] * c.g + m[12] * c.b + m[14];",
    "gl_FragColor.a = c.a;",
    "}"
  ].join("\n");
  _filter.brightness = function(brightness) {
    const b = (brightness || 0) + 1;
    _filter.colorMatrix([
      b,
      0,
      0,
      0,
      0,
      0,
      b,
      0,
      0,
      0,
      0,
      0,
      b,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.saturation = function(amount) {
    const x = (amount || 0) * 2 / 3 + 1;
    const y = (x - 1) * -0.5;
    _filter.colorMatrix([
      x,
      y,
      y,
      0,
      0,
      y,
      x,
      y,
      0,
      0,
      y,
      y,
      x,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.desaturate = function() {
    _filter.saturation(-1);
  };
  _filter.contrast = function(amount) {
    const v = (amount || 0) + 1;
    const o = -128 * (v - 1);
    _filter.colorMatrix([
      v,
      0,
      0,
      0,
      o,
      0,
      v,
      0,
      0,
      o,
      0,
      0,
      v,
      0,
      o,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.negative = function() {
    _filter.contrast(-2);
  };
  _filter.hue = function(rotation) {
    rotation = (rotation || 0) / 180 * Math.PI;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const lumR = 0.213;
    const lumG = 0.715;
    const lumB = 0.072;
    _filter.colorMatrix([
      lumR + cos * (1 - lumR) + sin * -lumR,
      lumG + cos * -lumG + sin * -lumG,
      lumB + cos * -lumB + sin * (1 - lumB),
      0,
      0,
      lumR + cos * -lumR + sin * 0.143,
      lumG + cos * (1 - lumG) + sin * 0.14,
      lumB + cos * -lumB + sin * -0.283,
      0,
      0,
      lumR + cos * -lumR + sin * -(1 - lumR),
      lumG + cos * -lumG + sin * lumG,
      lumB + cos * (1 - lumB) + sin * lumB,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.desaturateLuminance = function() {
    _filter.colorMatrix([
      0.2764723,
      0.929708,
      0.0938197,
      0,
      -37.1,
      0.2764723,
      0.929708,
      0.0938197,
      0,
      -37.1,
      0.2764723,
      0.929708,
      0.0938197,
      0,
      -37.1,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.sepia = function() {
    _filter.colorMatrix([
      0.393,
      0.7689999,
      0.18899999,
      0,
      0,
      0.349,
      0.6859999,
      0.16799999,
      0,
      0,
      0.272,
      0.5339999,
      0.13099999,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.brownie = function() {
    _filter.colorMatrix([
      0.5997023498159715,
      0.34553243048391263,
      -0.2708298674538042,
      0,
      47.43192855600873,
      -0.037703249837783157,
      0.8609577587992641,
      0.15059552388459913,
      0,
      -36.96841498319127,
      0.24113635128153335,
      -0.07441037908422492,
      0.44972182064877153,
      0,
      -7.562075277591283,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.vintagePinhole = function() {
    _filter.colorMatrix([
      0.6279345635605994,
      0.3202183420819367,
      -0.03965408211312453,
      0,
      9.651285835294123,
      0.02578397704808868,
      0.6441188644374771,
      0.03259127616149294,
      0,
      7.462829176470591,
      0.0466055556782719,
      -0.0851232987247891,
      0.5241648018700465,
      0,
      5.159190588235296,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.kodachrome = function() {
    _filter.colorMatrix([
      1.1285582396593525,
      -0.3967382283601348,
      -0.03992559172921793,
      0,
      63.72958762196502,
      -0.16404339962244616,
      1.0835251566291304,
      -0.05498805115633132,
      0,
      24.732407896706203,
      -0.16786010706155763,
      -0.5603416277695248,
      1.6014850761964943,
      0,
      35.62982807460946,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.technicolor = function() {
    _filter.colorMatrix([
      1.9125277891456083,
      -0.8545344976951645,
      -0.09155508482755585,
      0,
      11.793603434377337,
      -0.3087833385928097,
      1.7658908555458428,
      -0.10601743074722245,
      0,
      -70.35205161461398,
      -0.231103377548616,
      -0.7501899197440212,
      1.847597816108189,
      0,
      30.950940869491138,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.polaroid = function() {
    _filter.colorMatrix([
      1.438,
      -0.062,
      -0.062,
      0,
      0,
      -0.122,
      1.378,
      -0.122,
      0,
      0,
      -0.016,
      -0.016,
      1.483,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.shiftToBGR = function() {
    _filter.colorMatrix([
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0
    ]);
  };
  _filter.convolution = function(matrix) {
    const m = new Float32Array(matrix);
    const pixelSizeX = 1 / _width;
    const pixelSizeY = 1 / _height;
    const program = _compileShader(_filter.convolution.SHADER);
    gl.uniform1fv(program.uniform.m, m);
    gl.uniform2f(program.uniform.px, pixelSizeX, pixelSizeY);
    _draw();
  };
  _filter.convolution.SHADER = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D texture;",
    "uniform vec2 px;",
    "uniform float m[9];",
    "void main(void) {",
    "vec4 c11 = texture2D(texture, vUv - px);",
    "vec4 c12 = texture2D(texture, vec2(vUv.x, vUv.y - px.y));",
    "vec4 c13 = texture2D(texture, vec2(vUv.x + px.x, vUv.y - px.y));",
    "vec4 c21 = texture2D(texture, vec2(vUv.x - px.x, vUv.y) );",
    "vec4 c22 = texture2D(texture, vUv);",
    "vec4 c23 = texture2D(texture, vec2(vUv.x + px.x, vUv.y) );",
    "vec4 c31 = texture2D(texture, vec2(vUv.x - px.x, vUv.y + px.y) );",
    "vec4 c32 = texture2D(texture, vec2(vUv.x, vUv.y + px.y) );",
    "vec4 c33 = texture2D(texture, vUv + px );",
    "gl_FragColor = ",
    "c11 * m[0] + c12 * m[1] + c22 * m[2] +",
    "c21 * m[3] + c22 * m[4] + c23 * m[5] +",
    "c31 * m[6] + c32 * m[7] + c33 * m[8];",
    "gl_FragColor.a = c22.a;",
    "}"
  ].join("\n");
  _filter.detectEdges = function() {
    _filter.convolution.call(this, [
      0,
      1,
      0,
      1,
      -4,
      1,
      0,
      1,
      0
    ]);
  };
  _filter.sobelX = function() {
    _filter.convolution.call(this, [
      -1,
      0,
      1,
      -2,
      0,
      2,
      -1,
      0,
      1
    ]);
  };
  _filter.sobelY = function() {
    _filter.convolution.call(this, [
      -1,
      -2,
      -1,
      0,
      0,
      0,
      1,
      2,
      1
    ]);
  };
  _filter.sharpen = function(amount) {
    const a = amount || 1;
    _filter.convolution.call(this, [
      0,
      -1 * a,
      0,
      -1 * a,
      1 + 4 * a,
      -1 * a,
      0,
      -1 * a,
      0
    ]);
  };
  _filter.emboss = function(size) {
    const s = size || 1;
    _filter.convolution.call(this, [
      -2 * s,
      -1 * s,
      0,
      -1 * s,
      1,
      1 * s,
      0,
      1 * s,
      2 * s
    ]);
  };
  _filter.blur = function(size) {
    const blurSizeX = size / 7 / _width;
    const blurSizeY = size / 7 / _height;
    const program = _compileShader(_filter.blur.SHADER);
    gl.uniform2f(program.uniform.px, 0, blurSizeY);
    _draw(DRAW.INTERMEDIATE);
    gl.uniform2f(program.uniform.px, blurSizeX, 0);
    _draw();
  };
  _filter.blur.SHADER = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D texture;",
    "uniform vec2 px;",
    "void main(void) {",
    "gl_FragColor = vec4(0.0);",
    "gl_FragColor += texture2D(texture, vUv + vec2(-7.0*px.x, -7.0*px.y))*0.0044299121055113265;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-6.0*px.x, -6.0*px.y))*0.00895781211794;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-5.0*px.x, -5.0*px.y))*0.0215963866053;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-4.0*px.x, -4.0*px.y))*0.0443683338718;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-3.0*px.x, -3.0*px.y))*0.0776744219933;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-2.0*px.x, -2.0*px.y))*0.115876621105;",
    "gl_FragColor += texture2D(texture, vUv + vec2(-1.0*px.x, -1.0*px.y))*0.147308056121;",
    "gl_FragColor += texture2D(texture, vUv                             )*0.159576912161;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 1.0*px.x,  1.0*px.y))*0.147308056121;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 2.0*px.x,  2.0*px.y))*0.115876621105;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 3.0*px.x,  3.0*px.y))*0.0776744219933;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 4.0*px.x,  4.0*px.y))*0.0443683338718;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 5.0*px.x,  5.0*px.y))*0.0215963866053;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 6.0*px.x,  6.0*px.y))*0.00895781211794;",
    "gl_FragColor += texture2D(texture, vUv + vec2( 7.0*px.x,  7.0*px.y))*0.0044299121055113265;",
    "}"
  ].join("\n");
  _filter.pixelate = function(size) {
    const blurSizeX = size / _width;
    const blurSizeY = size / _height;
    const program = _compileShader(_filter.pixelate.SHADER);
    gl.uniform2f(program.uniform.size, blurSizeX, blurSizeY);
    _draw();
  };
  _filter.pixelate.SHADER = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform vec2 size;",
    "uniform sampler2D texture;",
    "vec2 pixelate(vec2 coord, vec2 size) {",
    "return floor( coord / size ) * size;",
    "}",
    "void main(void) {",
    "gl_FragColor = vec4(0.0);",
    "vec2 coord = pixelate(vUv, size);",
    "gl_FragColor += texture2D(texture, coord);",
    "}"
  ].join("\n");
}

// src/image/image.ts
var maxSize = 2048;
var inCanvas;
var outCanvas;
var fx;
function process4(input, config3) {
  let tensor2;
  if (!input)
    throw new Error("Human: Input is missing");
  if (!(input instanceof tf19.Tensor) && !(typeof Image !== "undefined" && input instanceof Image) && !(typeof ImageData !== "undefined" && input instanceof ImageData) && !(typeof ImageBitmap !== "undefined" && input instanceof ImageBitmap) && !(typeof HTMLImageElement !== "undefined" && input instanceof HTMLImageElement) && !(typeof HTMLMediaElement !== "undefined" && input instanceof HTMLMediaElement) && !(typeof HTMLVideoElement !== "undefined" && input instanceof HTMLVideoElement) && !(typeof HTMLCanvasElement !== "undefined" && input instanceof HTMLCanvasElement) && !(typeof OffscreenCanvas !== "undefined" && input instanceof OffscreenCanvas)) {
    throw new Error("Human: Input type is not recognized");
  }
  if (input instanceof tf19.Tensor) {
    if (input.shape && input.shape.length === 4 && input.shape[0] === 1 && input.shape[3] === 3)
      tensor2 = tf19.clone(input);
    else
      throw new Error(`Human: Input tensor shape must be [1, height, width, 3] and instead was ${input.shape}`);
  } else {
    const originalWidth = input["naturalWidth"] || input["videoWidth"] || input["width"] || input["shape"] && input["shape"][1] > 0;
    const originalHeight = input["naturalHeight"] || input["videoHeight"] || input["height"] || input["shape"] && input["shape"][2] > 0;
    if (!originalWidth || !originalHeight)
      return { tensor: null, canvas: inCanvas };
    let targetWidth = originalWidth;
    let targetHeight = originalHeight;
    if (targetWidth > maxSize) {
      targetWidth = maxSize;
      targetHeight = targetWidth * originalHeight / originalWidth;
    }
    if (targetHeight > maxSize) {
      targetHeight = maxSize;
      targetWidth = targetHeight * originalWidth / originalHeight;
    }
    if (config3.filter.width > 0)
      targetWidth = config3.filter.width;
    else if (config3.filter.height > 0)
      targetWidth = originalWidth * (config3.filter.height / originalHeight);
    if (config3.filter.height > 0)
      targetHeight = config3.filter.height;
    else if (config3.filter.width > 0)
      targetHeight = originalHeight * (config3.filter.width / originalWidth);
    if (!targetWidth || !targetHeight)
      throw new Error("Human: Input cannot determine dimension");
    if (!inCanvas || (inCanvas == null ? void 0 : inCanvas.width) !== targetWidth || (inCanvas == null ? void 0 : inCanvas.height) !== targetHeight) {
      inCanvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(targetWidth, targetHeight) : document.createElement("canvas");
      if ((inCanvas == null ? void 0 : inCanvas.width) !== targetWidth)
        inCanvas.width = targetWidth;
      if ((inCanvas == null ? void 0 : inCanvas.height) !== targetHeight)
        inCanvas.height = targetHeight;
    }
    const ctx = inCanvas.getContext("2d");
    if (input instanceof ImageData) {
      ctx.putImageData(input, 0, 0);
    } else {
      if (config3.filter.flip && typeof ctx.translate !== "undefined") {
        ctx.translate(originalWidth, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(input, 0, 0, originalWidth, originalHeight, 0, 0, inCanvas == null ? void 0 : inCanvas.width, inCanvas == null ? void 0 : inCanvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      } else {
        ctx.drawImage(input, 0, 0, originalWidth, originalHeight, 0, 0, inCanvas == null ? void 0 : inCanvas.width, inCanvas == null ? void 0 : inCanvas.height);
      }
    }
    if (config3.filter.enabled) {
      if (!fx || !outCanvas || inCanvas.width !== outCanvas.width || (inCanvas == null ? void 0 : inCanvas.height) !== (outCanvas == null ? void 0 : outCanvas.height)) {
        outCanvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(inCanvas == null ? void 0 : inCanvas.width, inCanvas == null ? void 0 : inCanvas.height) : document.createElement("canvas");
        if ((outCanvas == null ? void 0 : outCanvas.width) !== (inCanvas == null ? void 0 : inCanvas.width))
          outCanvas.width = inCanvas == null ? void 0 : inCanvas.width;
        if ((outCanvas == null ? void 0 : outCanvas.height) !== (inCanvas == null ? void 0 : inCanvas.height))
          outCanvas.height = inCanvas == null ? void 0 : inCanvas.height;
        fx = tf19.ENV.flags.IS_BROWSER ? new GLImageFilter({ canvas: outCanvas }) : null;
      }
      if (!fx)
        return { tensor: null, canvas: inCanvas };
      fx.reset();
      fx.addFilter("brightness", config3.filter.brightness);
      if (config3.filter.contrast !== 0)
        fx.addFilter("contrast", config3.filter.contrast);
      if (config3.filter.sharpness !== 0)
        fx.addFilter("sharpen", config3.filter.sharpness);
      if (config3.filter.blur !== 0)
        fx.addFilter("blur", config3.filter.blur);
      if (config3.filter.saturation !== 0)
        fx.addFilter("saturation", config3.filter.saturation);
      if (config3.filter.hue !== 0)
        fx.addFilter("hue", config3.filter.hue);
      if (config3.filter.negative)
        fx.addFilter("negative");
      if (config3.filter.sepia)
        fx.addFilter("sepia");
      if (config3.filter.vintage)
        fx.addFilter("brownie");
      if (config3.filter.sepia)
        fx.addFilter("sepia");
      if (config3.filter.kodachrome)
        fx.addFilter("kodachrome");
      if (config3.filter.technicolor)
        fx.addFilter("technicolor");
      if (config3.filter.polaroid)
        fx.addFilter("polaroid");
      if (config3.filter.pixelate !== 0)
        fx.addFilter("pixelate", config3.filter.pixelate);
      fx.apply(inCanvas);
    } else {
      outCanvas = inCanvas;
      if (fx)
        fx = null;
    }
    let pixels;
    if (outCanvas.data) {
      const shape = [outCanvas.height, outCanvas.width, 3];
      pixels = tf19.tensor3d(outCanvas.data, shape, "int32");
    } else if (outCanvas instanceof ImageData) {
      pixels = tf19.browser ? tf19.browser.fromPixels(outCanvas) : null;
    } else if (config3.backend === "webgl" || config3.backend === "humangl") {
      const tempCanvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(targetWidth, targetHeight) : document.createElement("canvas");
      tempCanvas.width = targetWidth;
      tempCanvas.height = targetHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx == null ? void 0 : tempCtx.drawImage(outCanvas, 0, 0);
      pixels = tf19.browser ? tf19.browser.fromPixels(tempCanvas) : null;
    } else {
      const tempCanvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(targetWidth, targetHeight) : document.createElement("canvas");
      tempCanvas.width = targetWidth;
      tempCanvas.height = targetHeight;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx == null ? void 0 : tempCtx.drawImage(outCanvas, 0, 0);
      const data = tempCtx == null ? void 0 : tempCtx.getImageData(0, 0, targetWidth, targetHeight);
      pixels = tf19.browser ? tf19.browser.fromPixels(data) : null;
    }
    if (pixels) {
      const casted = pixels.toFloat();
      tensor2 = casted.expandDims(0);
      pixels.dispose();
      casted.dispose();
    }
  }
  const canvas2 = config3.filter.return ? outCanvas : null;
  return { tensor: tensor2, canvas: canvas2 };
}

// src/draw/draw.ts
var draw_exports = {};
__export(draw_exports, {
  all: () => all,
  body: () => body2,
  canvas: () => canvas,
  face: () => face2,
  gesture: () => gesture,
  hand: () => hand2,
  object: () => object,
  options: () => options,
  person: () => person
});
var options = {
  color: "rgba(173, 216, 230, 0.6)",
  labelColor: "rgba(173, 216, 230, 1)",
  shadowColor: "black",
  font: 'small-caps 14px "Segoe UI"',
  lineHeight: 24,
  lineWidth: 6,
  pointSize: 2,
  roundRect: 28,
  drawPoints: false,
  drawLabels: true,
  drawBoxes: true,
  drawPolygons: true,
  drawGaze: true,
  fillPolygons: false,
  useDepth: true,
  useCurves: false,
  bufferedOutput: true
};
var rad2deg = (theta) => Math.round(theta * 180 / Math.PI);
function point(ctx, x, y, z = 0, localOptions) {
  ctx.fillStyle = localOptions.useDepth && z ? `rgba(${127.5 + 2 * z}, ${127.5 - 2 * z}, 255, 0.3)` : localOptions.color;
  ctx.beginPath();
  ctx.arc(x, y, localOptions.pointSize, 0, 2 * Math.PI);
  ctx.fill();
}
function rect(ctx, x, y, width, height, localOptions) {
  ctx.beginPath();
  if (localOptions.useCurves) {
    const cx = (x + x + width) / 2;
    const cy = (y + y + height) / 2;
    ctx.ellipse(cx, cy, width / 2, height / 2, 0, 0, 2 * Math.PI);
  } else {
    ctx.lineWidth = localOptions.lineWidth;
    ctx.moveTo(x + localOptions.roundRect, y);
    ctx.lineTo(x + width - localOptions.roundRect, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + localOptions.roundRect);
    ctx.lineTo(x + width, y + height - localOptions.roundRect);
    ctx.quadraticCurveTo(x + width, y + height, x + width - localOptions.roundRect, y + height);
    ctx.lineTo(x + localOptions.roundRect, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - localOptions.roundRect);
    ctx.lineTo(x, y + localOptions.roundRect);
    ctx.quadraticCurveTo(x, y, x + localOptions.roundRect, y);
    ctx.closePath();
  }
  ctx.stroke();
}
function lines(ctx, points = [], localOptions) {
  if (points === void 0 || points.length === 0)
    return;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (const pt of points) {
    const z = pt[2] || 0;
    ctx.strokeStyle = localOptions.useDepth && z ? `rgba(${127.5 + 2 * z}, ${127.5 - 2 * z}, 255, 0.3)` : localOptions.color;
    ctx.fillStyle = localOptions.useDepth && z ? `rgba(${127.5 + 2 * z}, ${127.5 - 2 * z}, 255, 0.3)` : localOptions.color;
    ctx.lineTo(pt[0], Math.round(pt[1]));
  }
  ctx.stroke();
  if (localOptions.fillPolygons) {
    ctx.closePath();
    ctx.fill();
  }
}
function curves(ctx, points = [], localOptions) {
  if (points === void 0 || points.length === 0)
    return;
  if (!localOptions.useCurves || points.length <= 2) {
    lines(ctx, points, localOptions);
    return;
  }
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 0; i < points.length - 2; i++) {
    const xc = (points[i][0] + points[i + 1][0]) / 2;
    const yc = (points[i][1] + points[i + 1][1]) / 2;
    ctx.quadraticCurveTo(points[i][0], points[i][1], xc, yc);
  }
  ctx.quadraticCurveTo(points[points.length - 2][0], points[points.length - 2][1], points[points.length - 1][0], points[points.length - 1][1]);
  ctx.stroke();
  if (localOptions.fillPolygons) {
    ctx.closePath();
    ctx.fill();
  }
}
async function gesture(inCanvas2, result, drawOptions) {
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  ctx.font = localOptions.font;
  ctx.fillStyle = localOptions.color;
  let i = 1;
  for (let j = 0; j < result.length; j++) {
    let where = [];
    let what = [];
    [where, what] = Object.entries(result[j]);
    if (what.length > 1 && what[1].length > 0) {
      const who = where[1] > 0 ? `#${where[1]}` : "";
      const label = `${where[0]} ${who}: ${what[1]}`;
      if (localOptions.shadowColor && localOptions.shadowColor !== "") {
        ctx.fillStyle = localOptions.shadowColor;
        ctx.fillText(label, 8, 2 + i * localOptions.lineHeight);
      }
      ctx.fillStyle = localOptions.labelColor;
      ctx.fillText(label, 6, 0 + i * localOptions.lineHeight);
      i += 1;
    }
  }
}
async function face2(inCanvas2, result, drawOptions) {
  var _a, _b, _c, _d;
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  for (const f of result) {
    ctx.font = localOptions.font;
    ctx.strokeStyle = localOptions.color;
    ctx.fillStyle = localOptions.color;
    if (localOptions.drawBoxes)
      rect(ctx, f.box[0], f.box[1], f.box[2], f.box[3], localOptions);
    const labels2 = [];
    labels2.push(`face: ${Math.trunc(100 * f.score)}%`);
    if (f.genderScore)
      labels2.push(`${f.gender || ""} ${Math.trunc(100 * f.genderScore)}%`);
    if (f.age)
      labels2.push(`age: ${f.age || ""}`);
    if (f.iris)
      labels2.push(`distance: ${f.iris}`);
    if (f.emotion && f.emotion.length > 0) {
      const emotion3 = f.emotion.map((a) => `${Math.trunc(100 * a.score)}% ${a.emotion}`);
      if (emotion3.length > 3)
        emotion3.length = 3;
      labels2.push(emotion3.join(" "));
    }
    if (f.rotation && f.rotation.angle && f.rotation.gaze) {
      if (f.rotation.angle.roll)
        labels2.push(`roll: ${rad2deg(f.rotation.angle.roll)}\xB0 yaw:${rad2deg(f.rotation.angle.yaw)}\xB0 pitch:${rad2deg(f.rotation.angle.pitch)}\xB0`);
      if (f.rotation.gaze.bearing)
        labels2.push(`gaze: ${rad2deg(f.rotation.gaze.bearing)}\xB0`);
    }
    if (labels2.length === 0)
      labels2.push("face");
    ctx.fillStyle = localOptions.color;
    for (let i = labels2.length - 1; i >= 0; i--) {
      const x = Math.max(f.box[0], 0);
      const y = i * localOptions.lineHeight + f.box[1];
      if (localOptions.shadowColor && localOptions.shadowColor !== "") {
        ctx.fillStyle = localOptions.shadowColor;
        ctx.fillText(labels2[i], x + 5, y + 16);
      }
      ctx.fillStyle = localOptions.labelColor;
      ctx.fillText(labels2[i], x + 4, y + 15);
    }
    ctx.lineWidth = 1;
    if (f.mesh && f.mesh.length > 0) {
      if (localOptions.drawPoints) {
        for (const pt of f.mesh)
          point(ctx, pt[0], pt[1], pt[2], localOptions);
      }
      if (localOptions.drawPolygons) {
        ctx.lineWidth = 1;
        for (let i = 0; i < TRI468.length / 3; i++) {
          const points = [
            TRI468[i * 3 + 0],
            TRI468[i * 3 + 1],
            TRI468[i * 3 + 2]
          ].map((index) => f.mesh[index]);
          lines(ctx, points, localOptions);
        }
        if (f.annotations && f.annotations["leftEyeIris"]) {
          ctx.strokeStyle = localOptions.useDepth ? "rgba(255, 200, 255, 0.3)" : localOptions.color;
          ctx.beginPath();
          const sizeX = Math.abs(f.annotations["leftEyeIris"][3][0] - f.annotations["leftEyeIris"][1][0]) / 2;
          const sizeY = Math.abs(f.annotations["leftEyeIris"][4][1] - f.annotations["leftEyeIris"][2][1]) / 2;
          ctx.ellipse(f.annotations["leftEyeIris"][0][0], f.annotations["leftEyeIris"][0][1], sizeX, sizeY, 0, 0, 2 * Math.PI);
          ctx.stroke();
          if (localOptions.fillPolygons) {
            ctx.fillStyle = localOptions.useDepth ? "rgba(255, 255, 200, 0.3)" : localOptions.color;
            ctx.fill();
          }
        }
        if (f.annotations && f.annotations["rightEyeIris"]) {
          ctx.strokeStyle = localOptions.useDepth ? "rgba(255, 200, 255, 0.3)" : localOptions.color;
          ctx.beginPath();
          const sizeX = Math.abs(f.annotations["rightEyeIris"][3][0] - f.annotations["rightEyeIris"][1][0]) / 2;
          const sizeY = Math.abs(f.annotations["rightEyeIris"][4][1] - f.annotations["rightEyeIris"][2][1]) / 2;
          ctx.ellipse(f.annotations["rightEyeIris"][0][0], f.annotations["rightEyeIris"][0][1], sizeX, sizeY, 0, 0, 2 * Math.PI);
          ctx.stroke();
          if (localOptions.fillPolygons) {
            ctx.fillStyle = localOptions.useDepth ? "rgba(255, 255, 200, 0.3)" : localOptions.color;
            ctx.fill();
          }
        }
        if (localOptions.drawGaze && ((_b = (_a = f.rotation) == null ? void 0 : _a.gaze) == null ? void 0 : _b.strength) && ((_d = (_c = f.rotation) == null ? void 0 : _c.gaze) == null ? void 0 : _d.bearing) && f.annotations["leftEyeIris"] && f.annotations["rightEyeIris"] && f.annotations["leftEyeIris"][0] && f.annotations["rightEyeIris"][0]) {
          ctx.strokeStyle = "pink";
          ctx.beginPath();
          const leftGaze = [
            f.annotations["leftEyeIris"][0][0] + Math.sin(f.rotation.gaze.bearing) * f.rotation.gaze.strength * f.box[3],
            f.annotations["leftEyeIris"][0][1] + Math.cos(f.rotation.gaze.bearing) * f.rotation.gaze.strength * f.box[2]
          ];
          ctx.moveTo(f.annotations["leftEyeIris"][0][0], f.annotations["leftEyeIris"][0][1]);
          ctx.lineTo(leftGaze[0], leftGaze[1]);
          const rightGaze = [
            f.annotations["rightEyeIris"][0][0] + Math.sin(f.rotation.gaze.bearing) * f.rotation.gaze.strength * f.box[3],
            f.annotations["rightEyeIris"][0][1] + Math.cos(f.rotation.gaze.bearing) * f.rotation.gaze.strength * f.box[2]
          ];
          ctx.moveTo(f.annotations["rightEyeIris"][0][0], f.annotations["rightEyeIris"][0][1]);
          ctx.lineTo(rightGaze[0], rightGaze[1]);
          ctx.stroke();
        }
      }
    }
  }
}
async function body2(inCanvas2, result, drawOptions) {
  var _a;
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  ctx.lineJoin = "round";
  for (let i = 0; i < result.length; i++) {
    ctx.strokeStyle = localOptions.color;
    ctx.fillStyle = localOptions.color;
    ctx.lineWidth = localOptions.lineWidth;
    ctx.font = localOptions.font;
    if (localOptions.drawBoxes && result[i].box && ((_a = result[i].box) == null ? void 0 : _a.length) === 4) {
      rect(ctx, result[i].box[0], result[i].box[1], result[i].box[2], result[i].box[3], localOptions);
      if (localOptions.drawLabels) {
        if (localOptions.shadowColor && localOptions.shadowColor !== "") {
          ctx.fillStyle = localOptions.shadowColor;
          ctx.fillText(`body ${100 * result[i].score}%`, result[i].box[0] + 3, 1 + result[i].box[1] + localOptions.lineHeight, result[i].box[2]);
        }
        ctx.fillStyle = localOptions.labelColor;
        ctx.fillText(`body ${100 * result[i].score}%`, result[i].box[0] + 2, 0 + result[i].box[1] + localOptions.lineHeight, result[i].box[2]);
      }
    }
    if (localOptions.drawPoints) {
      for (let pt = 0; pt < result[i].keypoints.length; pt++) {
        ctx.fillStyle = localOptions.useDepth && result[i].keypoints[pt].position[2] ? `rgba(${127.5 + 2 * (result[i].keypoints[pt].position[2] || 0)}, ${127.5 - 2 * (result[i].keypoints[pt].position[2] || 0)}, 255, 0.5)` : localOptions.color;
        point(ctx, result[i].keypoints[pt].position[0], result[i].keypoints[pt].position[1], 0, localOptions);
      }
    }
    if (localOptions.drawLabels) {
      ctx.font = localOptions.font;
      if (result[i].keypoints) {
        for (const pt of result[i].keypoints) {
          ctx.fillStyle = localOptions.useDepth && pt.position[2] ? `rgba(${127.5 + 2 * pt.position[2]}, ${127.5 - 2 * pt.position[2]}, 255, 0.5)` : localOptions.color;
          ctx.fillText(`${pt.part} ${Math.trunc(100 * pt.score)}%`, pt.position[0] + 4, pt.position[1] + 4);
        }
      }
    }
    if (localOptions.drawPolygons && result[i].keypoints) {
      let part;
      const points = [];
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "leftShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      curves(ctx, points, localOptions);
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "rightShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightHip");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftHip");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      if (points.length === 4)
        lines(ctx, points, localOptions);
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "leftHip");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftKnee");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftAnkle");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftHeel");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftFoot");
      if (part)
        points.push([part.position[0], part.position[1]]);
      curves(ctx, points, localOptions);
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "rightHip");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightKnee");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightAnkle");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightHeel");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightFoot");
      if (part)
        points.push([part.position[0], part.position[1]]);
      curves(ctx, points, localOptions);
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "leftShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftElbow");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftWrist");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "leftPalm");
      if (part)
        points.push([part.position[0], part.position[1]]);
      curves(ctx, points, localOptions);
      points.length = 0;
      part = result[i].keypoints.find((a) => a.part === "rightShoulder");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightElbow");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightWrist");
      if (part)
        points.push([part.position[0], part.position[1]]);
      part = result[i].keypoints.find((a) => a.part === "rightPalm");
      if (part)
        points.push([part.position[0], part.position[1]]);
      curves(ctx, points, localOptions);
    }
  }
}
async function hand2(inCanvas2, result, drawOptions) {
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  ctx.lineJoin = "round";
  ctx.font = localOptions.font;
  for (const h of result) {
    if (localOptions.drawBoxes) {
      ctx.strokeStyle = localOptions.color;
      ctx.fillStyle = localOptions.color;
      rect(ctx, h.box[0], h.box[1], h.box[2], h.box[3], localOptions);
      if (localOptions.drawLabels) {
        if (localOptions.shadowColor && localOptions.shadowColor !== "") {
          ctx.fillStyle = localOptions.shadowColor;
          ctx.fillText("hand", h.box[0] + 3, 1 + h.box[1] + localOptions.lineHeight, h.box[2]);
        }
        ctx.fillStyle = localOptions.labelColor;
        ctx.fillText("hand", h.box[0] + 2, 0 + h.box[1] + localOptions.lineHeight, h.box[2]);
      }
      ctx.stroke();
    }
    if (localOptions.drawPoints) {
      if (h.keypoints && h.keypoints.length > 0) {
        for (const pt of h.keypoints) {
          ctx.fillStyle = localOptions.useDepth ? `rgba(${127.5 + 2 * pt[2]}, ${127.5 - 2 * pt[2]}, 255, 0.5)` : localOptions.color;
          point(ctx, pt[0], pt[1], 0, localOptions);
        }
      }
    }
    if (localOptions.drawLabels) {
      const addHandLabel = (part, title) => {
        ctx.fillStyle = localOptions.useDepth ? `rgba(${127.5 + 2 * part[part.length - 1][2]}, ${127.5 - 2 * part[part.length - 1][2]}, 255, 0.5)` : localOptions.color;
        ctx.fillText(title, part[part.length - 1][0] + 4, part[part.length - 1][1] + 4);
      };
      ctx.font = localOptions.font;
      addHandLabel(h.annotations["indexFinger"], "index");
      addHandLabel(h.annotations["middleFinger"], "middle");
      addHandLabel(h.annotations["ringFinger"], "ring");
      addHandLabel(h.annotations["pinky"], "pinky");
      addHandLabel(h.annotations["thumb"], "thumb");
      addHandLabel(h.annotations["palmBase"], "palm");
    }
    if (localOptions.drawPolygons) {
      const addHandLine = (part) => {
        if (!part)
          return;
        for (let i = 0; i < part.length; i++) {
          ctx.beginPath();
          ctx.strokeStyle = localOptions.useDepth ? `rgba(${127.5 + 2 * part[i][2]}, ${127.5 - 2 * part[i][2]}, 255, 0.5)` : localOptions.color;
          ctx.moveTo(part[i > 0 ? i - 1 : 0][0], part[i > 0 ? i - 1 : 0][1]);
          ctx.lineTo(part[i][0], part[i][1]);
          ctx.stroke();
        }
      };
      ctx.lineWidth = localOptions.lineWidth;
      addHandLine(h.annotations["indexFinger"]);
      addHandLine(h.annotations["middleFinger"]);
      addHandLine(h.annotations["ringFinger"]);
      addHandLine(h.annotations["pinky"]);
      addHandLine(h.annotations["thumb"]);
    }
  }
}
async function object(inCanvas2, result, drawOptions) {
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  ctx.lineJoin = "round";
  ctx.font = localOptions.font;
  for (const h of result) {
    if (localOptions.drawBoxes) {
      ctx.strokeStyle = localOptions.color;
      ctx.fillStyle = localOptions.color;
      rect(ctx, h.box[0], h.box[1], h.box[2], h.box[3], localOptions);
      if (localOptions.drawLabels) {
        const label = `${Math.round(100 * h.score)}% ${h.label}`;
        if (localOptions.shadowColor && localOptions.shadowColor !== "") {
          ctx.fillStyle = localOptions.shadowColor;
          ctx.fillText(label, h.box[0] + 3, 1 + h.box[1] + localOptions.lineHeight, h.box[2]);
        }
        ctx.fillStyle = localOptions.labelColor;
        ctx.fillText(label, h.box[0] + 2, 0 + h.box[1] + localOptions.lineHeight, h.box[2]);
      }
      ctx.stroke();
    }
  }
}
async function person(inCanvas2, result, drawOptions) {
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  const ctx = inCanvas2.getContext("2d");
  if (!ctx)
    return;
  ctx.lineJoin = "round";
  ctx.font = localOptions.font;
  for (let i = 0; i < result.length; i++) {
    if (localOptions.drawBoxes) {
      ctx.strokeStyle = localOptions.color;
      ctx.fillStyle = localOptions.color;
      rect(ctx, result[i].box[0], result[i].box[1], result[i].box[2], result[i].box[3], localOptions);
      if (localOptions.drawLabels) {
        const label = `person #${i}`;
        if (localOptions.shadowColor && localOptions.shadowColor !== "") {
          ctx.fillStyle = localOptions.shadowColor;
          ctx.fillText(label, result[i].box[0] + 3, 1 + result[i].box[1] + localOptions.lineHeight, result[i].box[2]);
        }
        ctx.fillStyle = localOptions.labelColor;
        ctx.fillText(label, result[i].box[0] + 2, 0 + result[i].box[1] + localOptions.lineHeight, result[i].box[2]);
      }
      ctx.stroke();
    }
  }
}
async function canvas(inCanvas2, outCanvas2) {
  if (!inCanvas2 || !outCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement) || !(outCanvas2 instanceof HTMLCanvasElement))
    return;
  const outCtx = inCanvas2.getContext("2d");
  outCtx == null ? void 0 : outCtx.drawImage(inCanvas2, 0, 0);
}
async function all(inCanvas2, result, drawOptions) {
  const timestamp = now();
  const localOptions = mergeDeep(options, drawOptions);
  if (!result || !inCanvas2)
    return;
  if (!(inCanvas2 instanceof HTMLCanvasElement))
    return;
  face2(inCanvas2, result.face, localOptions);
  body2(inCanvas2, result.body, localOptions);
  hand2(inCanvas2, result.hand, localOptions);
  object(inCanvas2, result.object, localOptions);
  gesture(inCanvas2, result.gesture, localOptions);
  result.performance.draw = Math.trunc(now() - timestamp);
}

// src/persons.ts
function join2(faces, bodies, hands, gestures, shape) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
  let id = 0;
  const persons2 = [];
  for (const face5 of faces) {
    const person2 = { id: id++, face: face5, body: null, hands: { left: null, right: null }, gestures: [], box: [0, 0, 0, 0] };
    for (const body4 of bodies) {
      if (face5.box[0] > body4.box[0] && face5.box[0] < body4.box[0] + body4.box[2] && face5.box[1] + face5.box[3] > body4.box[1] && face5.box[1] + face5.box[3] < body4.box[1] + body4.box[3]) {
        person2.body = body4;
      }
    }
    if (person2.body) {
      for (const hand3 of hands) {
        if (hand3.box[0] + hand3.box[2] > person2.body.box[0] && hand3.box[0] + hand3.box[2] < person2.body.box[0] + person2.body.box[2] && hand3.box[1] + hand3.box[3] > person2.body.box[1] && hand3.box[1] + hand3.box[3] < person2.body.box[1] + person2.body.box[3]) {
          if (person2.hands)
            person2.hands.left = hand3;
        }
        if (hand3.box[0] < person2.body.box[0] + person2.body.box[2] && hand3.box[0] > person2.body.box[0] && hand3.box[1] + hand3.box[3] > person2.body.box[1] && hand3.box[1] + hand3.box[3] < person2.body.box[1] + person2.body.box[3]) {
          if (person2.hands)
            person2.hands.right = hand3;
        }
      }
    }
    for (const gesture3 of gestures) {
      if (gesture3["face"] !== void 0 && gesture3["face"] === face5.id)
        (_a = person2.gestures) == null ? void 0 : _a.push(gesture3);
      else if (gesture3["iris"] !== void 0 && gesture3["iris"] === face5.id)
        (_b = person2.gestures) == null ? void 0 : _b.push(gesture3);
      else if (gesture3["body"] !== void 0 && gesture3["body"] === ((_c = person2.body) == null ? void 0 : _c.id))
        (_d = person2.gestures) == null ? void 0 : _d.push(gesture3);
      else if (gesture3["hand"] !== void 0 && gesture3["hand"] === ((_f = (_e = person2.hands) == null ? void 0 : _e.left) == null ? void 0 : _f.id))
        (_g = person2.gestures) == null ? void 0 : _g.push(gesture3);
      else if (gesture3["hand"] !== void 0 && gesture3["hand"] === ((_i = (_h = person2.hands) == null ? void 0 : _h.right) == null ? void 0 : _i.id))
        (_j = person2.gestures) == null ? void 0 : _j.push(gesture3);
    }
    const x = [];
    const y = [];
    const extractXY = (box6) => {
      if (box6 && box6.length === 4) {
        x.push(box6[0], box6[0] + box6[2]);
        y.push(box6[1], box6[1] + box6[3]);
      }
    };
    extractXY((_k = person2.face) == null ? void 0 : _k.box);
    extractXY((_l = person2.body) == null ? void 0 : _l.box);
    extractXY((_n = (_m = person2.hands) == null ? void 0 : _m.left) == null ? void 0 : _n.box);
    extractXY((_p = (_o = person2.hands) == null ? void 0 : _o.right) == null ? void 0 : _p.box);
    const minX = Math.min(...x);
    const minY = Math.min(...y);
    person2.box = [minX, minY, Math.max(...x) - minX, Math.max(...y) - minY];
    if (shape && shape.length === 4)
      person2.boxRaw = [person2.box[0] / shape[2], person2.box[1] / shape[1], person2.box[2] / shape[2], person2.box[3] / shape[1]];
    persons2.push(person2);
  }
  return persons2;
}

// src/interpolate.ts
var bufferedResult = { face: [], body: [], hand: [], gesture: [], object: [], persons: [], performance: {}, timestamp: 0 };
function calc(newResult) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const elapsed = Date.now() - newResult.timestamp;
  const bufferedFactor = elapsed < 1e3 ? 8 - Math.log(elapsed) : 1;
  bufferedResult.canvas = newResult.canvas;
  if (!bufferedResult.body || newResult.body.length !== bufferedResult.body.length) {
    bufferedResult.body = JSON.parse(JSON.stringify(newResult.body));
  } else {
    for (let i = 0; i < newResult.body.length; i++) {
      const box6 = newResult.body[i].box.map((b, j) => ((bufferedFactor - 1) * bufferedResult.body[i].box[j] + b) / bufferedFactor);
      const boxRaw3 = newResult.body[i].boxRaw.map((b, j) => ((bufferedFactor - 1) * bufferedResult.body[i].boxRaw[j] + b) / bufferedFactor);
      const keypoints3 = newResult.body[i].keypoints.map((keypoint, j) => ({
        score: keypoint.score,
        part: keypoint.part,
        position: [
          bufferedResult.body[i].keypoints[j] ? ((bufferedFactor - 1) * bufferedResult.body[i].keypoints[j].position[0] + keypoint.position[0]) / bufferedFactor : keypoint.position[0],
          bufferedResult.body[i].keypoints[j] ? ((bufferedFactor - 1) * bufferedResult.body[i].keypoints[j].position[1] + keypoint.position[1]) / bufferedFactor : keypoint.position[1]
        ],
        positionRaw: [
          bufferedResult.body[i].keypoints[j] ? ((bufferedFactor - 1) * bufferedResult.body[i].keypoints[j].positionRaw[0] + keypoint.positionRaw[0]) / bufferedFactor : keypoint.position[0],
          bufferedResult.body[i].keypoints[j] ? ((bufferedFactor - 1) * bufferedResult.body[i].keypoints[j].positionRaw[1] + keypoint.positionRaw[1]) / bufferedFactor : keypoint.position[1]
        ]
      }));
      bufferedResult.body[i] = { ...newResult.body[i], box: box6, boxRaw: boxRaw3, keypoints: keypoints3 };
    }
  }
  if (!bufferedResult.hand || newResult.hand.length !== bufferedResult.hand.length) {
    bufferedResult.hand = JSON.parse(JSON.stringify(newResult.hand));
  } else {
    for (let i = 0; i < newResult.hand.length; i++) {
      const box6 = newResult.hand[i].box.map((b, j) => ((bufferedFactor - 1) * bufferedResult.hand[i].box[j] + b) / bufferedFactor);
      const boxRaw3 = newResult.hand[i].boxRaw.map((b, j) => ((bufferedFactor - 1) * bufferedResult.hand[i].boxRaw[j] + b) / bufferedFactor);
      const keypoints3 = newResult.hand[i].keypoints.map((landmark, j) => landmark.map((coord, k) => ((bufferedFactor - 1) * bufferedResult.hand[i].keypoints[j][k] + coord) / bufferedFactor));
      const keys = Object.keys(newResult.hand[i].annotations);
      const annotations3 = {};
      for (const key of keys) {
        annotations3[key] = newResult.hand[i].annotations[key].map((val, j) => val.map((coord, k) => ((bufferedFactor - 1) * bufferedResult.hand[i].annotations[key][j][k] + coord) / bufferedFactor));
      }
      bufferedResult.hand[i] = { ...newResult.hand[i], box: box6, boxRaw: boxRaw3, keypoints: keypoints3, annotations: annotations3 };
    }
  }
  if (!bufferedResult.face || newResult.face.length !== bufferedResult.face.length) {
    bufferedResult.face = JSON.parse(JSON.stringify(newResult.face));
  } else {
    for (let i = 0; i < newResult.face.length; i++) {
      const box6 = newResult.face[i].box.map((b, j) => ((bufferedFactor - 1) * bufferedResult.face[i].box[j] + b) / bufferedFactor);
      const boxRaw3 = newResult.face[i].boxRaw.map((b, j) => ((bufferedFactor - 1) * bufferedResult.face[i].boxRaw[j] + b) / bufferedFactor);
      const rotation = { matrix: [0, 0, 0, 0, 0, 0, 0, 0, 0], angle: { roll: 0, yaw: 0, pitch: 0 }, gaze: { bearing: 0, strength: 0 } };
      rotation.matrix = (_a = newResult.face[i].rotation) == null ? void 0 : _a.matrix;
      rotation.angle = {
        roll: ((bufferedFactor - 1) * (((_c = (_b = bufferedResult.face[i].rotation) == null ? void 0 : _b.angle) == null ? void 0 : _c.roll) || 0) + (((_e = (_d = newResult.face[i].rotation) == null ? void 0 : _d.angle) == null ? void 0 : _e.roll) || 0)) / bufferedFactor,
        yaw: ((bufferedFactor - 1) * (((_g = (_f = bufferedResult.face[i].rotation) == null ? void 0 : _f.angle) == null ? void 0 : _g.yaw) || 0) + (((_i = (_h = newResult.face[i].rotation) == null ? void 0 : _h.angle) == null ? void 0 : _i.yaw) || 0)) / bufferedFactor,
        pitch: ((bufferedFactor - 1) * (((_k = (_j = bufferedResult.face[i].rotation) == null ? void 0 : _j.angle) == null ? void 0 : _k.pitch) || 0) + (((_m = (_l = newResult.face[i].rotation) == null ? void 0 : _l.angle) == null ? void 0 : _m.pitch) || 0)) / bufferedFactor
      };
      rotation.gaze = {
        bearing: ((bufferedFactor - 1) * (((_o = (_n = bufferedResult.face[i].rotation) == null ? void 0 : _n.gaze) == null ? void 0 : _o.bearing) || 0) + (((_q = (_p = newResult.face[i].rotation) == null ? void 0 : _p.gaze) == null ? void 0 : _q.bearing) || 0)) / bufferedFactor,
        strength: ((bufferedFactor - 1) * (((_s = (_r = bufferedResult.face[i].rotation) == null ? void 0 : _r.gaze) == null ? void 0 : _s.strength) || 0) + (((_u = (_t = newResult.face[i].rotation) == null ? void 0 : _t.gaze) == null ? void 0 : _u.strength) || 0)) / bufferedFactor
      };
      bufferedResult.face[i] = { ...newResult.face[i], rotation, box: box6, boxRaw: boxRaw3 };
    }
  }
  if (!bufferedResult.object || newResult.object.length !== bufferedResult.object.length) {
    bufferedResult.object = JSON.parse(JSON.stringify(newResult.object));
  } else {
    for (let i = 0; i < newResult.object.length; i++) {
      const box6 = newResult.object[i].box.map((b, j) => ((bufferedFactor - 1) * bufferedResult.object[i].box[j] + b) / bufferedFactor);
      const boxRaw3 = newResult.object[i].boxRaw.map((b, j) => ((bufferedFactor - 1) * bufferedResult.object[i].boxRaw[j] + b) / bufferedFactor);
      bufferedResult.object[i] = { ...newResult.object[i], box: box6, boxRaw: boxRaw3 };
    }
  }
  const newPersons = newResult.persons;
  if (!bufferedResult.persons || newPersons.length !== bufferedResult.persons.length) {
    bufferedResult.persons = JSON.parse(JSON.stringify(newPersons));
  } else {
    for (let i = 0; i < newPersons.length; i++) {
      bufferedResult.persons[i].box = newPersons[i].box.map((box6, j) => ((bufferedFactor - 1) * bufferedResult.persons[i].box[j] + box6) / bufferedFactor);
    }
  }
  bufferedResult.gesture = newResult.gesture;
  bufferedResult.performance = newResult.performance;
  return bufferedResult;
}

// src/segmentation/segmentation.ts
var tf20 = __toModule(require_tfjs_esm());
var model9;
var busy = false;
async function load12(config3) {
  if (!model9) {
    model9 = await tf20.loadGraphModel(join(config3.modelBasePath, config3.segmentation.modelPath));
    if (!model9 || !model9["modelUrl"])
      log("load model failed:", config3.segmentation.modelPath);
    else if (config3.debug)
      log("load model:", model9["modelUrl"]);
  } else if (config3.debug)
    log("cached model:", model9["modelUrl"]);
  return model9;
}
async function predict11(input) {
  var _a, _b;
  const width = ((_a = input.tensor) == null ? void 0 : _a.shape[1]) || 0;
  const height = ((_b = input.tensor) == null ? void 0 : _b.shape[2]) || 0;
  if (!input.tensor)
    return null;
  if (!model9 || !model9.inputs[0].shape)
    return null;
  const resizeInput = tf20.image.resizeBilinear(input.tensor, [model9.inputs[0].shape[1], model9.inputs[0].shape[2]], false);
  const norm = resizeInput.div(255);
  const res = model9.predict(norm);
  tf20.dispose(resizeInput);
  tf20.dispose(norm);
  const squeeze7 = tf20.squeeze(res, 0);
  let resizeOutput;
  if (squeeze7.shape[2] === 2) {
    const softmax = squeeze7.softmax();
    const [bg, fg] = tf20.unstack(softmax, 2);
    const expand = fg.expandDims(2);
    const pad = expand.expandDims(0);
    tf20.dispose(softmax);
    tf20.dispose(bg);
    tf20.dispose(fg);
    const crop = tf20.image.cropAndResize(pad, [[0, 0, 0.5, 0.5]], [0], [width, height]);
    resizeOutput = crop.squeeze(0);
    tf20.dispose(crop);
    tf20.dispose(expand);
    tf20.dispose(pad);
  } else {
    resizeOutput = tf20.image.resizeBilinear(squeeze7, [width, height]);
  }
  if (typeof document === "undefined")
    return resizeOutput.dataSync();
  const overlay = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : document.createElement("canvas");
  overlay.width = width;
  overlay.height = height;
  if (tf20.browser)
    await tf20.browser.toPixels(resizeOutput, overlay);
  tf20.dispose(resizeOutput);
  tf20.dispose(squeeze7);
  tf20.dispose(res);
  const alphaCanvas = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : document.createElement("canvas");
  alphaCanvas.width = width;
  alphaCanvas.height = height;
  const ctxAlpha = alphaCanvas.getContext("2d");
  ctxAlpha.filter = "blur(8px";
  await ctxAlpha.drawImage(overlay, 0, 0);
  const alpha = ctxAlpha.getImageData(0, 0, width, height).data;
  const original = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(width, height) : document.createElement("canvas");
  original.width = width;
  original.height = height;
  const ctx = original.getContext("2d");
  if (input.canvas)
    await ctx.drawImage(input.canvas, 0, 0);
  ctx.globalCompositeOperation = "darken";
  ctx.filter = "blur(8px)";
  await ctx.drawImage(overlay, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";
  input.canvas = original;
  return alpha;
}
async function process5(input, background, config3) {
  var _a;
  if (busy)
    return null;
  busy = true;
  if (!model9)
    await load12(config3);
  const img = process4(input, config3);
  const alpha = await predict11(img);
  tf20.dispose(img.tensor);
  if (background && alpha) {
    const tmp = process4(background, config3);
    const bg = tmp.canvas;
    tf20.dispose(tmp.tensor);
    const fg = img.canvas;
    const fgData = (_a = fg.getContext("2d")) == null ? void 0 : _a.getImageData(0, 0, fg.width, fg.height).data;
    const c = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(fg.width, fg.height) : document.createElement("canvas");
    c.width = fg.width;
    c.height = fg.height;
    const ctx = c.getContext("2d");
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(bg, 0, 0, c.width, c.height);
    const cData = ctx.getImageData(0, 0, c.width, c.height);
    for (let i = 0; i < c.width * c.height; i++) {
      cData.data[4 * i + 0] = (255 - alpha[4 * i + 0]) / 255 * cData.data[4 * i + 0] + alpha[4 * i + 0] / 255 * fgData[4 * i + 0];
      cData.data[4 * i + 1] = (255 - alpha[4 * i + 1]) / 255 * cData.data[4 * i + 1] + alpha[4 * i + 1] / 255 * fgData[4 * i + 1];
      cData.data[4 * i + 2] = (255 - alpha[4 * i + 2]) / 255 * cData.data[4 * i + 2] + alpha[4 * i + 2] / 255 * fgData[4 * i + 2];
      cData.data[4 * i + 3] = (255 - alpha[4 * i + 3]) / 255 * cData.data[4 * i + 3] + alpha[4 * i + 3] / 255 * fgData[4 * i + 3];
    }
    ctx.putImageData(cData, 0, 0);
    img.canvas = c;
  }
  busy = false;
  return img.canvas;
}

// src/sample.ts
var face3 = `
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`;
var body3 = `
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
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAa2p1UYo5adbz+xbxMlvqJ1OqjDHLXree0ejmzNrWm953tPmTPWbWneZ7yoy5YhjrXXTjH8s75N
mtkyxt0VZM2/m175N1V03yTKubMLXVXybeYLLX2VXy7eam+b0bOg4VquJW+rry4/O9uyZOq3UjVm
9r25axMzPaIdvhns1kzbZddM0p5Y47z8/R2+HcF03Doi1a8+Xzvbv+TotJnjDXkt+K8ODHp8cY8N
IpSO0RCwF2YAAAAAAAAACvUZYw6fJkntWN3k8dfHz2vLucdz8mkjFE9bz1+UOZosX1UzPm0nqI/W
MYo9FlcPNklfFGeH/NshLGun+Cz6PtHZtVZWlRLS+jxPkRpIn7rdoupHTdA5s6SI+7H6Mfo+32Y2
+To3neSIiZ7A0IjPXpXLePlMotGW3272t85datKzHZjbTVnsDj+FG/2Y/RlGP4R+jo20u7H6N1Ql
o+H8I/REY957R+jpfReiK6eOYHLtj2tttH6KrY/6Y/R2c+kjeJiFVtLG24hxpw7/AHY/RRkw9O37
O99Hrt1YX0tfOBLjcGp4XF8c+u8fs9c4dcVcGemSI61nd3IneN1orQAAAAAAAAAAAAABFqxes1tE
TE9JiUgPKcX4RbRXnNgiZwWnrH4XPi28PdXpW9JraImsxtMS8pxXhF9DecuGJtgmf+1TWW2N/la1
L7N7T5e3Vy6W3hsYcvLbqzbO9jvvCzvDR0+XeO7crO6FmGSvRThy/RtVXJ92elvk2rRvDUzU7pl4
izsd2J3jeBpcNz+Lg5LT7+Pp+Xk3W7js5eAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADs0NTrN96Yp6edkW8Wzm6+LNTq4pvTHO9vOfRoWtt
1mes95YWvs1s2fZldddOczLPLn2ju0MmebT3YZc2/mpm3qqllN1drsbZIhr3yzvtHf4AsvlYYseb
V5Yx4KTe0+UQ6nDvZ3UazbJqd8OKeu33peq0eh0+hxcmnxxWPOfOfm0mP+steT/ji8N9mKY9suum
L37+HHaPm9DSlaVitKxWsdohI0Y22gAgAAAAAAAAAABXnyRhw3yT92Nwef4xm8bVzET0rPJH5d12
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
AOZE/OsPS29nuH27YrV+VpeV9pdPXhOtw49NG9Mld55+vXcTPd42I47qo7xSfyWV9oM8d8VJ/VxM
d8l46xWF9cV7en6o/qLfxp2I9ob+eCv/AHMo9op89P8A/wBORGmyT5R+qfo2X8P7n9Q/jTsx7RR5
6ef+4/8AuHftg/8A6cWcOSO9J/WEbWr3pY7Efzp2Lcfv5YK/9zWy8d1E/ZpSv5Oba1/+Hb9lc+LP
bFt87I7E/wAabWbiurvEx4nL/pjZzc2bJkn372t85ZXx55/BX85lucC0vPxnTxlnnjm32mOiZqUu
LJ2p4TwnVavNWaYbRTfre0bQ99pcH0bT0xb78vmtiIiNojaErMwAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAHnfarF7umzRHaZrLjYrdIen9ocPi8JyTt1xzF4eUw23rCm3R4r6bMy
wt6kdTaWLdjswmNoZontsCm0K5XWjopnuDC0dGpqG5bs08/daKV672MjbSaif6oh6Z5f2LtvptRX
0tEvUN3Jfo8f7cYve0eX4zV7B5z20xc/C8eSPuZIRficfXlcPaG7ino08HWIbePpLF2NuiyOyrHK
3fZFSwuovHVfaVF4QK5YWTM9UT0EKry6Ps1Tn4zjn8NZn9nOtLseydObiWW34cf918fWfk+PYANn
KAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAq1WKM+ly4p+/WYeBxTNd6zG0xO0
vobw3FcP0bi2em20Tbmj5Srr418V9sa2Z7qKyzi07MXUylhaU7yjqhLCeiq3ddaFNxFYW7NLNG8t
zya+WO6Va9J7FW66mvwidnrXiPY3Ny8RyUn71Jj9Ht3RPjk19HK9pMHj8D1ER3rHN+jqqtTjjNps
uOe16zAifXzfTz7kNyndpYazS9qT0mszDdoxrsi6m8LazMq6zDOsq1ZEyrt1WWlXaUCqyq0rbKbi
Fdp6PReyFd8uqv8ACsfy83aXrPZHHto89/xX2/SP/dpj6y8vx6EBq5gAAAAAAAAAAAAAAAAAAAAA
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
NO67NbkhzNVnmInqzaOZrL93JyZeV0M1++7S02jvxDWxhxx033tPpC8Z6rrezWjmZyazJG2/u03h
2vFibTHoqvamiwVwY+nLGzV0+SZ1Mx8G0/45tOhzJ5lXMc3UVXRdlF1HP+iYsDPLPPy49/tz1+Te
pSIr0ho6ak5Ms5J8o2q6NImOrHV7XX488ypzTtHXo0s9t6zG7c1G1qz6ubeZiZ3UatXJG3yauSO7
cvMTEx5tPLb3prPRMVr0HB8vicNxf0+7+kt+LOJwTJyY/Bnz3tH93X36N58cWvq6LSyiyndMSlC7
mZcymLJiwLosmJVRLKLAtiU7q4lMSCzc3YxJuDMRuAlKAEgAAAlAkAAAAAABKAEgAAAAAJAAAAAA
AAAAAAAEgAAAAAAAAAAAAAkAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAhIAAACAAAASgAAAAAAEAAAA
hGzJAImGMwzQDDZjNVuyNgUTVhNGxysZqDVmiu1G5NN2M4waM0+DCaN2cbGcQNGaMZq3JxMJxA1J
qx2bU4kU09slorWNwa20z02RXHbJbl26QvtFovbHWkxEdJt5y2MOHlr2U1W3jx+1hiw8vSO63lmI
XRTaEWmtY6snRHO1VpmJ+DjavpSZl2s8b7y4HFcnh0n0gha5ebJN55KRM2mdoiPN6fh+kpwXh0Wy
RHj5Otp/s5Ps1p62y31+em9aTMYt/OfVfxTiPjZ52naI7fBrI5t66xz5+a1rW7yx0eSL6iZjtEOX
qNbSletom3lENjh2fbHzbbWt3iVozruc+5ztWubf4M4ybpQ2Oboyrva0Vjza8WdDR4OkXt3n9ldX
kaePP9VtYqctYhdvt5oivTeCZ2YOxXk6ubqMfV0b9mrljfqlFcq88k7z2U5axeItDa1OPessuC8P
ya7XRWYnwqdbT/ZMilvIu4dpslNdixXja8Y5tt85djZdbDWnGOesRtXFtuw6T27No5Kx2OrKYQlC
ExKJgBnEpiyvdlEgsizKLKollFgWxLKJVRLKJBbEp3VxLKJBnuMWQJEbpBIAAAJAAAABIAAAAAAA
lAJAAAAAAAAAAAAAASAAAAAAAAAAAAAJAAAABAJABAlAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAA
AAABAJQAAAAgAABAAI2EoBGyJhkgGPKxmqxAKpownHC+YRMdN5BrTj67R3bOn01o7p01Iv71u89o
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
2Q==`;

// package.json
var version = "2.0.1";

// src/human.ts
var _numTensors, _analyzeMemoryLeaks, _checkSanity, _firstRun, _lastInputSum, _lastCacheDiff, _sanity, _checkBackend, _skipFrame, _warmupBitmap, _warmupCanvas, _warmupNode;
var Human = class {
  constructor(userConfig) {
    __privateAdd(this, _numTensors, void 0);
    __privateAdd(this, _analyzeMemoryLeaks, void 0);
    __privateAdd(this, _checkSanity, void 0);
    __privateAdd(this, _firstRun, void 0);
    __privateAdd(this, _lastInputSum, void 0);
    __privateAdd(this, _lastCacheDiff, void 0);
    this.analyze = (...msg) => {
      if (!__privateGet(this, _analyzeMemoryLeaks))
        return;
      const currentTensors = this.tf.engine().state.numTensors;
      const previousTensors = __privateGet(this, _numTensors);
      __privateSet(this, _numTensors, currentTensors);
      const leaked = currentTensors - previousTensors;
      if (leaked !== 0)
        log(...msg, leaked);
    };
    __privateAdd(this, _sanity, (input) => {
      if (!__privateGet(this, _checkSanity))
        return null;
      if (!input)
        return "input is not defined";
      if (this.tf.ENV.flags.IS_NODE && !(input instanceof tf21.Tensor))
        return "input must be a tensor";
      try {
        this.tf.getBackend();
      } catch (e) {
        return "backend not loaded";
      }
      return null;
    });
    __privateAdd(this, _checkBackend, async (force = false) => {
      var _a;
      if (this.config.backend && this.config.backend.length > 0 && force || this.tf.getBackend() !== this.config.backend) {
        const timeStamp = now();
        this.state = "backend";
        if (this.config.backend && this.config.backend.length > 0) {
          if (typeof window === "undefined" && typeof WorkerGlobalScope !== "undefined" && this.config.debug)
            log("running inside web worker");
          if (this.tf.ENV.flags.IS_BROWSER && this.config.backend === "tensorflow")
            this.config.backend = "webgl";
          if (this.tf.ENV.flags.IS_NODE && (this.config.backend === "webgl" || this.config.backend === "humangl"))
            this.config.backend = "tensorflow";
          if (this.config.debug)
            log("setting backend:", this.config.backend);
          if (this.config.backend === "wasm") {
            if (this.config.debug)
              log("wasm path:", this.config.wasmPath);
            if (typeof ((_a = this.tf) == null ? void 0 : _a.setWasmPaths) !== "undefined")
              this.tf.setWasmPaths(this.config.wasmPath);
            else
              throw new Error("Human: WASM backend is not loaded");
            const simd = await this.tf.env().getAsync("WASM_HAS_SIMD_SUPPORT");
            const mt = await this.tf.env().getAsync("WASM_HAS_MULTITHREAD_SUPPORT");
            if (this.config.debug)
              log(`wasm execution: ${simd ? "SIMD" : "no SIMD"} ${mt ? "multithreaded" : "singlethreaded"}`);
            if (this.config.debug && !simd)
              log("warning: wasm simd support is not enabled");
          }
          if (this.config.backend === "humangl")
            register();
          try {
            await this.tf.setBackend(this.config.backend);
          } catch (err) {
            log("error: cannot set backend:", this.config.backend, err);
          }
        }
        this.tf.enableProdMode();
        if (this.tf.getBackend() === "webgl" || this.tf.getBackend() === "humangl") {
          this.tf.ENV.set("CHECK_COMPUTATION_FOR_ERRORS", false);
          this.tf.ENV.set("WEBGL_CPU_FORWARD", true);
          this.tf.ENV.set("WEBGL_PACK_DEPTHWISECONV", true);
          if (typeof this.config["deallocate"] !== "undefined" && this.config["deallocate"]) {
            log("changing webgl: WEBGL_DELETE_TEXTURE_THRESHOLD:", true);
            this.tf.ENV.set("WEBGL_DELETE_TEXTURE_THRESHOLD", 0);
          }
          const gl = await this.tf.backend().getGPGPUContext().gl;
          if (this.config.debug)
            log(`gl version:${gl.getParameter(gl.VERSION)} renderer:${gl.getParameter(gl.RENDERER)}`);
        }
        await this.tf.ready();
        this.performance.backend = Math.trunc(now() - timeStamp);
      }
    });
    this.next = (result) => calc(result || this.result);
    __privateAdd(this, _skipFrame, async (input) => {
      if (this.config.cacheSensitivity === 0)
        return false;
      const resizeFact = 32;
      const reduced = input.resizeBilinear([Math.trunc(input.shape[1] / resizeFact), Math.trunc(input.shape[2] / resizeFact)]);
      const reducedData = reduced.dataSync();
      let sum = 0;
      for (let i = 0; i < reducedData.length / 3; i++)
        sum += reducedData[3 * i + 2];
      reduced.dispose();
      const diff = 100 * (Math.max(sum, __privateGet(this, _lastInputSum)) / Math.min(sum, __privateGet(this, _lastInputSum)) - 1);
      __privateSet(this, _lastInputSum, sum);
      const skipFrame = diff < Math.max(this.config.cacheSensitivity, __privateGet(this, _lastCacheDiff));
      __privateSet(this, _lastCacheDiff, diff > 10 * this.config.cacheSensitivity ? 0 : diff);
      return skipFrame;
    });
    __privateAdd(this, _warmupBitmap, async () => {
      const b64toBlob = (base64, type = "application/octet-stream") => fetch(`data:${type};base64,${base64}`).then((res2) => res2.blob());
      let blob;
      let res;
      switch (this.config.warmup) {
        case "face":
          blob = await b64toBlob(face3);
          break;
        case "full":
          blob = await b64toBlob(body3);
          break;
        default:
          blob = null;
      }
      if (blob) {
        const bitmap = await createImageBitmap(blob);
        res = await this.detect(bitmap, this.config);
        bitmap.close();
      }
      return res;
    });
    __privateAdd(this, _warmupCanvas, async () => new Promise((resolve) => {
      let src;
      let size = 0;
      switch (this.config.warmup) {
        case "face":
          size = 256;
          src = "data:image/jpeg;base64," + face3;
          break;
        case "full":
        case "body":
          size = 1200;
          src = "data:image/jpeg;base64," + body3;
          break;
        default:
          src = null;
      }
      const img = new Image();
      img.onload = async () => {
        const canvas2 = typeof OffscreenCanvas !== "undefined" ? new OffscreenCanvas(size, size) : document.createElement("canvas");
        canvas2.width = img.naturalWidth;
        canvas2.height = img.naturalHeight;
        const ctx = canvas2.getContext("2d");
        ctx == null ? void 0 : ctx.drawImage(img, 0, 0);
        const res = await this.detect(canvas2, this.config);
        resolve(res);
      };
      if (src)
        img.src = src;
      else
        resolve(null);
    }));
    __privateAdd(this, _warmupNode, async () => {
      const atob = (str) => Buffer.from(str, "base64");
      let img;
      if (this.config.warmup === "face")
        img = atob(face3);
      if (this.config.warmup === "body" || this.config.warmup === "full")
        img = atob(body3);
      if (!img)
        return null;
      let res;
      if (typeof tf21["node"] !== "undefined") {
        const data = tf21["node"].decodeJpeg(img);
        const expanded = data.expandDims(0);
        this.tf.dispose(data);
        res = await this.detect(expanded, this.config);
        this.tf.dispose(expanded);
      } else {
        if (this.config.debug)
          log("Warmup tfjs-node not loaded");
      }
      return res;
    });
    this.config = mergeDeep(config, userConfig || {});
    this.tf = tf21;
    this.draw = draw_exports;
    this.version = version;
    this.state = "idle";
    __privateSet(this, _numTensors, 0);
    __privateSet(this, _analyzeMemoryLeaks, false);
    __privateSet(this, _checkSanity, false);
    __privateSet(this, _firstRun, true);
    __privateSet(this, _lastCacheDiff, 0);
    this.performance = { backend: 0, load: 0, image: 0, frames: 0, cached: 0, changed: 0, total: 0, draw: 0 };
    this.models = {
      face: null,
      posenet: null,
      blazepose: null,
      efficientpose: null,
      movenet: null,
      handpose: null,
      age: null,
      gender: null,
      emotion: null,
      embedding: null,
      nanodet: null,
      centernet: null,
      faceres: null,
      segmentation: null
    };
    this.image = (input) => process4(input, this.config);
    this.faceTriangulation = triangulation;
    this.faceUVMap = uvmap;
    this.sysinfo = info();
    __privateSet(this, _lastInputSum, 1);
  }
  similarity(embedding1, embedding2) {
    return similarity(embedding1, embedding2);
  }
  segmentation(input, background) {
    return process5(input, background, this.config);
  }
  enhance(input) {
    return enhance(input);
  }
  match(faceEmbedding, db, threshold = 0) {
    return match(faceEmbedding, db, threshold);
  }
  async load(userConfig) {
    this.state = "load";
    const timeStamp = now();
    if (userConfig)
      this.config = mergeDeep(this.config, userConfig);
    if (__privateGet(this, _firstRun)) {
      if (this.config.debug)
        log(`version: ${this.version}`);
      if (this.config.debug)
        log(`tfjs version: ${this.tf.version_core}`);
      if (this.config.debug)
        log("platform:", this.sysinfo.platform);
      if (this.config.debug)
        log("agent:", this.sysinfo.agent);
      await __privateGet(this, _checkBackend).call(this, true);
      if (this.tf.ENV.flags.IS_BROWSER) {
        if (this.config.debug)
          log("configuration:", this.config);
        if (this.config.debug)
          log("tf flags:", this.tf.ENV.flags);
      }
    }
    if (this.config.async) {
      [
        this.models.face,
        this.models.emotion,
        this.models.handpose,
        this.models.posenet,
        this.models.blazepose,
        this.models.efficientpose,
        this.models.movenet,
        this.models.nanodet,
        this.models.centernet,
        this.models.faceres,
        this.models.segmentation
      ] = await Promise.all([
        this.models.face || (this.config.face.enabled ? load2(this.config) : null),
        this.models.emotion || (this.config.face.enabled && this.config.face.emotion.enabled ? load3(this.config) : null),
        this.models.handpose || (this.config.hand.enabled ? load6(this.config) : null),
        this.models.posenet || (this.config.body.enabled && this.config.body.modelPath.includes("posenet") ? load5(this.config) : null),
        this.models.blazepose || (this.config.body.enabled && this.config.body.modelPath.includes("blazepose") ? load7(this.config) : null),
        this.models.efficientpose || (this.config.body.enabled && this.config.body.modelPath.includes("efficientpose") ? load8(this.config) : null),
        this.models.movenet || (this.config.body.enabled && this.config.body.modelPath.includes("movenet") ? load9(this.config) : null),
        this.models.nanodet || (this.config.object.enabled && this.config.object.modelPath.includes("nanodet") ? load10(this.config) : null),
        this.models.centernet || (this.config.object.enabled && this.config.object.modelPath.includes("centernet") ? load11(this.config) : null),
        this.models.faceres || (this.config.face.enabled && this.config.face.description.enabled ? load4(this.config) : null),
        this.models.segmentation || (this.config.segmentation.enabled ? load12(this.config) : null)
      ]);
    } else {
      if (this.config.face.enabled && !this.models.face)
        this.models.face = await load2(this.config);
      if (this.config.face.enabled && this.config.face.emotion.enabled && !this.models.emotion)
        this.models.emotion = await load3(this.config);
      if (this.config.hand.enabled && !this.models.handpose)
        this.models.handpose = await load6(this.config);
      if (this.config.body.enabled && !this.models.posenet && this.config.body.modelPath.includes("posenet"))
        this.models.posenet = await load5(this.config);
      if (this.config.body.enabled && !this.models.blazepose && this.config.body.modelPath.includes("blazepose"))
        this.models.blazepose = await load7(this.config);
      if (this.config.body.enabled && !this.models.efficientpose && this.config.body.modelPath.includes("efficientpose"))
        this.models.efficientpose = await load7(this.config);
      if (this.config.body.enabled && !this.models.movenet && this.config.body.modelPath.includes("movenet"))
        this.models.movenet = await load9(this.config);
      if (this.config.object.enabled && !this.models.nanodet && this.config.object.modelPath.includes("nanodet"))
        this.models.nanodet = await load10(this.config);
      if (this.config.object.enabled && !this.models.centernet && this.config.object.modelPath.includes("centernet"))
        this.models.centernet = await load11(this.config);
      if (this.config.face.enabled && this.config.face.description.enabled && !this.models.faceres)
        this.models.faceres = await load4(this.config);
      if (this.config.segmentation.enabled && !this.models.segmentation)
        this.models.segmentation = await load12(this.config);
    }
    if (__privateGet(this, _firstRun)) {
      if (this.config.debug)
        log("tf engine state:", this.tf.engine().state.numBytes, "bytes", this.tf.engine().state.numTensors, "tensors");
      __privateSet(this, _firstRun, false);
    }
    const current = Math.trunc(now() - timeStamp);
    if (current > (this.performance.load || 0))
      this.performance.load = current;
  }
  async detect(input, userConfig) {
    return new Promise(async (resolve) => {
      this.state = "config";
      let timeStamp;
      let elapsedTime;
      this.config = mergeDeep(this.config, userConfig);
      this.state = "check";
      const error = __privateGet(this, _sanity).call(this, input);
      if (error) {
        log(error, input);
        resolve({ error });
      }
      const timeStart = now();
      await __privateGet(this, _checkBackend).call(this);
      await this.load();
      timeStamp = now();
      let process6 = process4(input, this.config);
      this.performance.image = Math.trunc(now() - timeStamp);
      this.analyze("Get Image:");
      if (this.config.segmentation.enabled && process6 && process6.tensor) {
        this.analyze("Start Segmentation:");
        this.state = "run:segmentation";
        timeStamp = now();
        await predict11(process6);
        elapsedTime = Math.trunc(now() - timeStamp);
        if (elapsedTime > 0)
          this.performance.segmentation = elapsedTime;
        if (process6.canvas) {
          process6.tensor.dispose();
          process6 = process4(process6.canvas, this.config);
        }
        this.analyze("End Segmentation:");
      }
      if (!process6 || !process6.tensor) {
        log("could not convert input to tensor");
        resolve({ error: "could not convert input to tensor" });
        return;
      }
      timeStamp = now();
      this.config.skipFrame = await __privateGet(this, _skipFrame).call(this, process6.tensor);
      if (!this.performance.frames)
        this.performance.frames = 0;
      if (!this.performance.cached)
        this.performance.cached = 0;
      this.performance.frames++;
      if (this.config.skipFrame)
        this.performance.cached++;
      this.performance.changed = Math.trunc(now() - timeStamp);
      this.analyze("Check Changed:");
      let faceRes;
      let bodyRes;
      let handRes;
      let objectRes;
      if (this.config.async) {
        faceRes = this.config.face.enabled ? detectFace(this, process6.tensor) : [];
        if (this.performance.face)
          delete this.performance.face;
      } else {
        this.state = "run:face";
        timeStamp = now();
        faceRes = this.config.face.enabled ? await detectFace(this, process6.tensor) : [];
        elapsedTime = Math.trunc(now() - timeStamp);
        if (elapsedTime > 0)
          this.performance.face = elapsedTime;
      }
      this.analyze("Start Body:");
      if (this.config.async) {
        if (this.config.body.modelPath.includes("posenet"))
          bodyRes = this.config.body.enabled ? predict4(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("blazepose"))
          bodyRes = this.config.body.enabled ? predict6(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("efficientpose"))
          bodyRes = this.config.body.enabled ? predict7(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("movenet"))
          bodyRes = this.config.body.enabled ? predict8(process6.tensor, this.config) : [];
        if (this.performance.body)
          delete this.performance.body;
      } else {
        this.state = "run:body";
        timeStamp = now();
        if (this.config.body.modelPath.includes("posenet"))
          bodyRes = this.config.body.enabled ? await predict4(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("blazepose"))
          bodyRes = this.config.body.enabled ? await predict6(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("efficientpose"))
          bodyRes = this.config.body.enabled ? await predict7(process6.tensor, this.config) : [];
        else if (this.config.body.modelPath.includes("movenet"))
          bodyRes = this.config.body.enabled ? await predict8(process6.tensor, this.config) : [];
        elapsedTime = Math.trunc(now() - timeStamp);
        if (elapsedTime > 0)
          this.performance.body = elapsedTime;
      }
      this.analyze("End Body:");
      this.analyze("Start Hand:");
      if (this.config.async) {
        handRes = this.config.hand.enabled ? predict5(process6.tensor, this.config) : [];
        if (this.performance.hand)
          delete this.performance.hand;
      } else {
        this.state = "run:hand";
        timeStamp = now();
        handRes = this.config.hand.enabled ? await predict5(process6.tensor, this.config) : [];
        elapsedTime = Math.trunc(now() - timeStamp);
        if (elapsedTime > 0)
          this.performance.hand = elapsedTime;
      }
      this.analyze("End Hand:");
      this.analyze("Start Object:");
      if (this.config.async) {
        if (this.config.object.modelPath.includes("nanodet"))
          objectRes = this.config.object.enabled ? predict9(process6.tensor, this.config) : [];
        else if (this.config.object.modelPath.includes("centernet"))
          objectRes = this.config.object.enabled ? predict10(process6.tensor, this.config) : [];
        if (this.performance.object)
          delete this.performance.object;
      } else {
        this.state = "run:object";
        timeStamp = now();
        if (this.config.object.modelPath.includes("nanodet"))
          objectRes = this.config.object.enabled ? await predict9(process6.tensor, this.config) : [];
        else if (this.config.object.modelPath.includes("centernet"))
          objectRes = this.config.object.enabled ? await predict10(process6.tensor, this.config) : [];
        elapsedTime = Math.trunc(now() - timeStamp);
        if (elapsedTime > 0)
          this.performance.object = elapsedTime;
      }
      this.analyze("End Object:");
      if (this.config.async)
        [faceRes, bodyRes, handRes, objectRes] = await Promise.all([faceRes, bodyRes, handRes, objectRes]);
      let gestureRes = [];
      if (this.config.gesture.enabled) {
        timeStamp = now();
        gestureRes = [...face(faceRes), ...body(bodyRes), ...hand(handRes), ...iris(faceRes)];
        if (!this.config.async)
          this.performance.gesture = Math.trunc(now() - timeStamp);
        else if (this.performance.gesture)
          delete this.performance.gesture;
      }
      this.performance.total = Math.trunc(now() - timeStart);
      this.state = "idle";
      this.result = {
        face: faceRes,
        body: bodyRes,
        hand: handRes,
        gesture: gestureRes,
        object: objectRes,
        performance: this.performance,
        canvas: process6.canvas,
        timestamp: Date.now(),
        get persons() {
          var _a;
          return join2(faceRes, bodyRes, handRes, gestureRes, (_a = process6 == null ? void 0 : process6.tensor) == null ? void 0 : _a.shape);
        }
      };
      tf21.dispose(process6.tensor);
      resolve(this.result);
    });
  }
  async warmup(userConfig) {
    const t0 = now();
    if (userConfig)
      this.config = mergeDeep(this.config, userConfig);
    if (!this.config.warmup || this.config.warmup === "none")
      return { error: "null" };
    let res;
    if (typeof createImageBitmap === "function")
      res = await __privateGet(this, _warmupBitmap).call(this);
    else if (typeof Image !== "undefined")
      res = await __privateGet(this, _warmupCanvas).call(this);
    else
      res = await __privateGet(this, _warmupNode).call(this);
    const t1 = now();
    if (this.config.debug)
      log("Warmup", this.config.warmup, Math.round(t1 - t0), "ms", res);
    return res;
  }
};
_numTensors = new WeakMap();
_analyzeMemoryLeaks = new WeakMap();
_checkSanity = new WeakMap();
_firstRun = new WeakMap();
_lastInputSum = new WeakMap();
_lastCacheDiff = new WeakMap();
_sanity = new WeakMap();
_checkBackend = new WeakMap();
_skipFrame = new WeakMap();
_warmupBitmap = new WeakMap();
_warmupCanvas = new WeakMap();
_warmupNode = new WeakMap();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Human
});
