import p5 from 'p5'

const sketch = (/** @type {p5} */ s) => {
  /** @type {p5.SoundFile} */ let sound
  /** @type {p5.FFT} */ let fft

  s.preload = () => {
    sound = s.loadSound('/voice.mp3')
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
