import { KokoroTTS } from 'kokoro-js'

const model_id = 'onnx-community/Kokoro-82M-v1.0-ONNX'
const tts = await KokoroTTS.from_pretrained(model_id, {
  dtype: 'q4', // Options: "fp32", "fp16", "q8", "q4", "q4f16"
  device: 'wasm', // Options: "wasm", "webgpu" (web) or "cpu" (node). If using "webgpu", we recommend using dtype="fp32".
})

const text = 'The quick brown forx jumped over the lazy dog'
const audio = await tts.generate(text, {
  // Use `tts.list_voices()` to list all available voices
  voice: 'af_bella',
})
