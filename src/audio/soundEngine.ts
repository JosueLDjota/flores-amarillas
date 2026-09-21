/**
 * Audio Synthesizer Engine using Web Audio API.
 * 100% self-contained, offline, and responsive without external mp3 downloads.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private musicInterval: number | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        // Master gain for SFX
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);

        // Master gain for Ambient Music
        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        this.musicGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public init() {
    this.getContext();
  }

  public toggleMusic(): boolean {
    if (this.isMusicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isMusicPlaying;
  }

  public setMute(mute: boolean) {
    this.isMuted = mute;
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setTargetAtTime(mute ? 0 : 0.25, this.ctx.currentTime, 0.2);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setTargetAtTime(mute ? 0 : 0.4, this.ctx.currentTime, 0.2);
    }
  }

  /**
   * Generates a dreamy, warm, romantic ambient chord progression
   * using gentle sine waves, rich harmonic overtone filtering, and slow envelopes.
   */
  public startMusic() {
    const ctx = this.getContext();
    if (!ctx || !this.musicGain) return;
    this.isMusicPlaying = true;

    // Frequencies in Hz for pentatonic / warm romantic chords: F#maj9, C#maj7, D#min9, Bmaj7
    const chords = [
      [185.00, 233.08, 277.18, 349.23, 440.00], // Warm golden chord 1
      [138.59, 174.61, 207.65, 261.63, 329.63], // Deep romantic chord 2
      [155.56, 185.00, 233.08, 277.18, 369.99], // Emotional chord 3
      [123.47, 146.83, 185.00, 233.08, 293.66], // Resolving chord 4
    ];

    let currentChordIndex = 0;

    const playChord = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;
      const notes = chords[currentChordIndex];
      currentChordIndex = (currentChordIndex + 1) % chords.length;

      const now = this.ctx.currentTime;
      const duration = 5.8;

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.musicGain) return;
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq * (1 + (Math.random() * 0.004 - 0.002)), now);

        // Warm low pass filter to give filmic intimacy
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600 + i * 150, now);
        filter.frequency.exponentialRampToValueAtTime(300, now + duration);

        // Smooth attack and release envelope
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.04 / (i + 1), now + 1.8);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    };

    playChord();
    this.musicInterval = window.setInterval(playChord, 5200);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  /**
   * Delicate crystal sound for button clicks and micro-interactions
   */
  public playChime(pitchMultiplier = 1) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const baseFreq = 880 * pitchMultiplier; // A5 note
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.12);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  /**
   * Harmonious warm swell when adding a flower or switching scenes
   */
  public playBloom() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const freqs = [329.63, 415.30, 493.88, 659.25]; // E major add9
    const now = ctx.currentTime;

    freqs.forEach((f, idx) => {
      if (!ctx || !this.sfxGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const delay = idx * 0.05;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + delay);

      gain.gain.setValueAtTime(0.0001, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.06, now + delay + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.9);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now + delay);
      osc.stop(now + delay + 1.0);
    });
  }

  /**
   * Sparkle sound for romantic mode or surprise button
   */
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const baseF = [784, 987, 1175, 1318, 1568];
    const now = ctx.currentTime;

    baseF.forEach((f, i) => {
      if (!ctx || !this.sfxGain) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const time = now + i * 0.04;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.08, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(time);
      osc.stop(time + 0.3);
    });
  }

  /**
   * Soft, warm, cinematic firework explosion with muffled bass & golden crackle
   */
  public playFireworkSound() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx || !this.sfxGain) return;

    const now = ctx.currentTime;
    
    // Low frequency thud
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.45);

    oscGain.gain.setValueAtTime(0.18, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(oscGain);
    oscGain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.55);

    // Filtered noise for crackle/sparkle
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.15));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, now + 0.1);
    filter.Q.setValueAtTime(3, now + 0.1);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.04, now + 0.05);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.sfxGain);

    noise.start(now + 0.05);
  }
}

export const soundEngine = new SoundEngine();
