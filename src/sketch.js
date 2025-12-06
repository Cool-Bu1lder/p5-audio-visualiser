import p5 from 'p5'
import { pipeline } from '@huggingface/transformers'

const onProgress = (progressInfo) => {
  if (progressInfo.status === 'progress') {
    const loaded = progressInfo.loaded
    const total = progressInfo.total
    const file = progressInfo.file

    const percent = total ? Math.round((loaded / total) * 100) : 0

    console.log(`Downloading ${file}: ${percent}% (${loaded}/${total} bytes)`)
  } else if (progressInfo.status === 'done') {
    console.log(`Finished loading ${progressInfo.file}.`)
  } else if (progressInfo.status === 'ready') {
    console.log('Model is fully loaded and ready for inference!')
  }
}

// https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.TextGenerationPipeline
const generator = await pipeline(
  'text2text-generation',
  'Xenova/LaMini-Flan-T5-783M',
  {
    progress_callback: onProgress,
  },
)
const textInput = 'Ask questions to learn more about humans'
const output = await generator(textInput, {
  max_new_tokens: 20,
})

// https://huggingface.co/docs/transformers.js/api/pipelines#module_pipelines.TextToAudioPipeline
const synthesizer = await pipeline(
  'text-to-speech',
  'onnx-community/Supertonic-TTS-ONNX',
  {
    progress_callback: onProgress,
  },
)
const speaker_embeddings =
  'https://huggingface.co/onnx-community/Supertonic-TTS-ONNX/resolve/main/voices/F1.bin'
const audio = await synthesizer(output[0].generated_text, {
  speaker_embeddings,
})

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
