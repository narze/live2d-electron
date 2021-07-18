// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

import * as PIXI from "pixi.js"
import { InternalModel, Live2DModel } from "pixi-live2d-display"

interface IModelData {
  dragging: boolean
  _pointerX: number
  _pointerY: number
}

// register the Ticker to support automatic updating of Live2D models
Live2DModel.registerTicker(PIXI.Ticker)

async function main() {
  const app = new PIXI.Application({
    view: document.getElementById("canvas") as HTMLCanvasElement,
    resizeTo: window,
    autoStart: true,
    transparent: true,
  })

  const model = await Live2DModel.from(
    "models/wanko/runtime/wanko_touch.model3.json"
  )

  const modelData: Record<string, IModelData> = {}
  modelData[model.name] = {
    dragging: false,
    _pointerX: 0,
    _pointerY: 0,
  }

  model.x = -300
  model.y = -420
  app.stage.addChild(model)
  model.scale.set(1)
  model.name

  draggable(model, modelData[model.name])
}

function draggable(
  model: Live2DModel<InternalModel>,
  modelData: {
    dragging: boolean
    _pointerX: number
    _pointerY: number
  }
) {
  model.buttonMode = true
  model.on("pointerdown", (e: any) => {
    modelData.dragging = true
    modelData._pointerX = e.data.global.x - model.x
    modelData._pointerY = e.data.global.y - model.y
  })
  model.on("pointermove", (e: any) => {
    if (modelData.dragging) {
      model.position.x = e.data.global.x - modelData._pointerX
      model.position.y = e.data.global.y - modelData._pointerY
    }
  })
  model.on("pointerupoutside", () => (modelData.dragging = false))
  model.on("pointerup", () => (modelData.dragging = false))
}

main()
