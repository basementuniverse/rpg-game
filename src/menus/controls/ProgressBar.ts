import * as config from '../../config.json';
import { vec } from '@basementuniverse/commonjs';
import { roundedRectangle } from '../../utilities';

type ProgressBarOptions = {
  size: vec;
  ease: number,
  padding: number;
  borderColour: Colour;
  borderWidth: number;
  borderRadius: number;
  barColour: Colour;
  barRadius: number;
};

export class ProgressBar {
  private options: ProgressBarOptions;
  private readonly defaultOptions: ProgressBarOptions = {
    size: vec(120, 14),
    ease: 0.9,
    padding: 4,
    borderColour: '#b75',
    borderWidth: 2,
    borderRadius: 6,
    barColour: '#fec',
    barRadius: 3,
  };

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private position: vec;
  private targetProgress: number = 0;
  private actualProgress: number = 0;

  public constructor(
    position: vec = vec(0.5, 0.5),
    options: Partial<ProgressBarOptions> = {}
  ) {
    this.position = position;
    this.options = Object.assign({}, this.defaultOptions, options);

    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (context !== null) {
      this.context = context;
    } else {
      throw new Error("Couldn't get a 2d context.");
    }
    this.canvas.width = this.options.size.x;
    this.canvas.height = this.options.size.y;
  }

  public update(dt: number, progress: number): void {
    this.targetProgress = progress;
    const delta = this.targetProgress - this.actualProgress;
    this.actualProgress += delta * dt * this.options.ease;
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.drawProgressBar();
    context.drawImage(
      this.canvas,
      Math.floor((context.canvas.width / config.scaleFactor) * this.position.x - this.canvas.width / 2),
      Math.floor((context.canvas.height / config.scaleFactor) * this.position.y - this.canvas.height / 2)
    );
  }

  private drawProgressBar(): void {
    this.context.save();
    this.context.clearRect(0, 0, this.options.size.x, this.options.size.y);

    // Draw border
    this.context.strokeStyle = this.options.borderColour;
    this.context.lineWidth = this.options.borderWidth;
    roundedRectangle(
      this.context,
      vec(0, 0),
      this.options.size,
      this.options.borderRadius
    );
    this.context.stroke();

    // Draw progress bar
    this.context.fillStyle = this.options.barColour;
    const width = (this.options.size.x - (2 * this.options.padding)) * this.actualProgress;
    roundedRectangle(
      this.context,
      vec(this.options.padding),
      vec(
        width,
        this.options.size.y - (2 * this.options.padding)
      ),
      Math.min(width, this.options.barRadius)
    );
    this.context.fill();
    this.context.restore();
  }
}
