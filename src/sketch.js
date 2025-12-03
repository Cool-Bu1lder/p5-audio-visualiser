import p5 from 'p5'

const sketch = (/** @type {p5} */ s) => {
  /** @type {p5.SoundFile} */ let sound
  let fft

  s.preload = () => {
    sound = s.loadSound('/voice.mp3')
  }

  s.setup = () => {
    let cnv = s.createCanvas(100, 100)
    cnv.mouseClicked(togglePlay)
    fft = new p5.FFT()
    sound.amp(0.2)
  }

  s.draw = () => {
    s.background(220)

    let spectrum = fft.analyze()
    s.noStroke()
    s.fill(255, 0, 255)
    for (let i = 0; i < spectrum.length; i++) {
      let x = s.map(i, 0, spectrum.length, 0, s.width)
      let h = -s.height + s.map(spectrum[i], 0, 255, s.height, 0)
      s.rect(x, s.height, s.width / spectrum.length, h)
    }

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
