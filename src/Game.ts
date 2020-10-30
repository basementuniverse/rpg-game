import * as config from './config.json';
import * as constants from './constants';
import Debug from './Debug';
import StateManager from './StateManager';
import { vec } from '@basementuniverse/commonjs';

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastFrameTime: number;
  private lastFrameCountTime: number;
  private frameRate: number = 0;
  private frameCount: number = 0;

  // TEST
  private testImage: HTMLImageElement;
  private testOffset: number = 0;
  private testTime: number = 0;

  public stateManager: StateManager;

  constructor(container: HTMLElement | null) {
    if (container === null) {
      throw new Error('A valid container element must be specified.');
    }
    if (container.tagName.toLowerCase() !== 'canvas') {
      throw new Error('Container element must be a canvas.');
    }
    this.canvas = container as HTMLCanvasElement;

    // Get a 2d context
    const context = this.canvas.getContext('2d');
    if (context !== null) {
      this.context = context;
    } else {
      throw new Error("Couldn't get a 2d context.");
    }

    // Handle resize
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    // Initialise subsystems...
    Debug.initialise();
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Disable image smoothing for pixelated graphics
    this.context.imageSmoothingEnabled = false;
  }

  public initialise(): void {

    // Load content assets and push loading state

    // TEST
    this.testImage = new Image();
    this.testImage.src = '../images/error.png';

    // Start the game loop
    this.lastFrameTime = this.lastFrameCountTime = performance.now();
    this.loop();
  }

  private loop(): void {
    const now = performance.now();
    const elapsedTime = Math.min(now - this.lastFrameTime, constants.FPS_MIN);

    // Calculate framerate
    if (now - this.lastFrameCountTime >= 1000) {
      this.lastFrameCountTime = now;
      this.frameRate = this.frameCount;
      this.frameCount = 0;
    }
    this.frameCount++;
    this.lastFrameTime = now;
    if (config.showFPS) {
      Debug.value('FPS', this.frameRate);
    }

    // Do game loop
    this.update(elapsedTime);
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private update(dt: number): void {
    // TEST
    this.testTime += dt;
    this.testOffset = Math.sin(this.testTime / 10) * 100;
    Debug.marker('world', this.testTime, vec(30, 30));
    Debug.marker('screen', 'hello!', vec(100, 100), {
      showLabel: false,
      space: 'screen',
      markerStyle: '+'
    });
    Debug.marker('screen2', 'hello2!', vec(100, 130), {
      space: 'screen',
      markerStyle: '.'
    });
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // TEST
    this.context.setTransform(config.scaleFactor, 0, 0, config.scaleFactor, 100 + this.testOffset, 100);
    this.context.drawImage(this.testImage, 0, 0);

    Debug.draw(this.context, this.canvas.width);
  }
}
