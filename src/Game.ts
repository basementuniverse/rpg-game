import * as PIXI from 'pixi.js';
import * as config from './config.json';

export default class Game {
  private container: HTMLElement;
  public application: PIXI.Application;

  constructor(container: HTMLElement | null) {
    if (null === container) {
      throw new Error('A valid container element must be specified.');
    }
    this.container = container;

    // Initialise PIXI application
    this.application = new PIXI.Application({
      backgroundColor: 0x0,
      antialias: false,
      resolution: (window.devicePixelRatio || 1) * config.scaleFactor
    });
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
    PIXI.settings.ROUND_PIXELS = true;

    // Add PIXI canvas to the container element
    this.container.appendChild(this.application.view);

    // Handle resize
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  private resize(): void {
    this.application.renderer.resize(
      Math.floor(window.innerWidth / config.scaleFactor),
      Math.floor(window.innerHeight / config.scaleFactor)
    );
  }

  public initialise(): void {

    // Start the game loop
    this.application.ticker.add(dt => {
      this.update(dt * PIXI.settings.TARGET_FPMS);
      this.draw();
    });
  }

  private update(dt: number): void {
    //
  }

  private draw(): void {
    //
  }
}
