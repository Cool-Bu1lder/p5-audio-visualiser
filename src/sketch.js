import p5 from 'p5'

//--------------------------------------------

import { KokoroTTS } from 'kokoro-js'

const model_id = 'onnx-community/Kokoro-82M-v1.0-ONNX'
const tts = await KokoroTTS.from_pretrained(model_id, {
  dtype: 'q8', // Options: "fp32", "fp16", "q8", "q4", "q4f16"
  device: 'wasm', // Options: "wasm", "webgpu" (web) or "cpu" (node). If using "webgpu", we recommend using dtype="fp32".
})

const text =
  "Life is like a box of chocolates. You never know what you're gonna get."
const audio = await tts.generate(text, {
  // Use `tts.list_voices()` to list all available voices
  //voice: 'af_heart',
  voice: 'am_santa',
})

console.log(tts.list_voices())

//--------------------------------------------

const sketch = (/** @type {p5} */ s) => {
  /** @type {p5.SoundFile} */ let sound
  /** @type {p5.FFT} */ let fft

  s.preload = () => {
    sound = new p5.SoundFile()
    const rawChannelData = audio.audio
    const channelDataArray = [rawChannelData]
    const sampleRate = audio.sampling_rate
    sound.setBuffer(channelDataArray)
    sound.rate(sampleRate / sound.sampleRate())
  }

  s.setup = () => {
    let cnv = s.createCanvas(500, 500)
    cnv.mouseClicked(togglePlay)
    fft = new p5.FFT()
  }

  s.draw = () => {
    s.background(220)

    let waveform = fft.waveform()
    s.noFill()
    s.beginShape()
    s.stroke(20)
    for (let i = 0; i < waveform.length; i++) {
      let x = s.map(i, 0, waveform.length, 0, s.width)
      let y = s.map(waveform[i], -1, 1, 0, s.height)
      s.vertex(x, y)
    }
    s.endShape()

    s.text('tap to play', 20, 20)
  }

  function togglePlay() {
    if (sound.isPlaying()) {
      sound.pause()
    } else {
      sound.loop()
    }
  }
}

export default sketch
