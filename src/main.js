// https://editor.p5js.org/jonfroehlich/sketches/d2euV09i
// https://p5js.org/reference/p5.sound/p5.FFT/
// https://editor.p5js.org/hao/sketches/8OhA3cn1J

// https://github.com/espeak-ng/espeak-ng
// https://github.com/abbr/text2wav.node.js
// https://github.com/ianmarmour/espeak-ng.js
// https://espeak.sourceforge.net/
// https://huggingface.co/tasks/text-to-speech
// https://strobotnik.com/unity/klattersynth/

// https://github.com/xenova/phonemizer.js/
// https://github.com/hexgrad/kokoro/tree/main/kokoro.js

// https://huggingface.co/docs/transformers.js/en/index

import './style.css'
import p5 from 'p5'

import sketch from './sketch'

globalThis.p5 = p5

//* hacky solution, but p5 global variable doesn't load intime
//* if using normal p5 sound import
//* p5 needs to be global for sound addon to import
await import('p5/lib/addons/p5.sound')

new p5(sketch)
