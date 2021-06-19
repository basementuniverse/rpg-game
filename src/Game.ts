import * as config from './config.json';
import * as constants from './constants';
import Debug from './Debug';
import {
  ContentManager,
  InputManager,
  StateManager,
} from './managers';
import { IntroState } from './states';

export default class Game {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private lastFrameTime: number;
  private lastFrameCountTime: number;
  private frameRate: number = 0;
  private frameCount: number = 0;

  public constructor(container: HTMLElement | null) {
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
  }

  private resize(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Disable image smoothing for pixelated graphics
    this.context.imageSmoothingEnabled = false;
  }

  /**
   * Initialise the game and start playing
   */
  public initialise(): void {

    // Initialise subsystems
    Debug.initialise();
    ContentManager.initialise();
    InputManager.initialise(this.canvas);
    StateManager.initialise();

    // Start game loop
    this.lastFrameTime = this.lastFrameCountTime = performance.now();
    this.loop();

    // Push the intro state
    StateManager.push(new IntroState());
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
      Debug.value('FPS', this.frameRate, { align: 'right' });
    }

    // Do game loop
    this.update(elapsedTime);
    this.draw();
    window.requestAnimationFrame(this.loop.bind(this));
  }

  private update(dt: number): void {
    StateManager.update(dt);
    InputManager.update();
  }

  private draw(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.setTransform(config.scaleFactor, 0, 0, config.scaleFactor, 0, 0);
    StateManager.draw(this.context);
    Debug.draw(this.context);
  }
}
