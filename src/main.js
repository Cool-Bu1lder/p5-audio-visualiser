import './style.css'
import p5 from 'p5'

// https://editor.p5js.org/jonfroehlich/sketches/d2euV09i
// https://p5js.org/reference/p5.sound/p5.FFT/

const sketch = (/** @type {p5} */ s) => {
  s.setup = () => {
    s.createCanvas(100, 100)
  }

  s.draw = () => {
    s.background(0, 0, 0)
  }
}

new p5(sketch)
