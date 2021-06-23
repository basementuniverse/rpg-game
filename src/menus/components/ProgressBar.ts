import { vec } from '@basementuniverse/commonjs';
import { Anchor } from '../../enums';
import { roundedRectangle } from '../../utilities';
import { Component, ComponentOptions } from './Component';

type ProgressBarOptions = ComponentOptions & {
  size: vec;
  ease: number,
  padding: number;
  borderColour: Colour;
  borderWidth: number;
  borderRadius: number;
  barColour: Colour;
  barRadius: number;
};

export class ProgressBar extends Component {
  public progress: number = 0;
  private actualProgress: number = 0;
  public options: ProgressBarOptions;
  protected readonly defaultOptions: ProgressBarOptions = {
    anchor: Anchor.Center,
    size: vec(120, 14),
    ease: 0.9,
    padding: 4,
    borderColour: '#b75',
    borderWidth: 2,
    borderRadius: 6,
    barColour: '#fec',
    barRadius: 3,
  };

  public constructor(
    position: vec = vec(),
    options: Partial<ProgressBarOptions> = {}
  ) {
    super(position);
    this.options = Object.assign({}, this.defaultOptions, options);
    this.canvas.width = this.options.size.x;
    this.canvas.height = this.options.size.y;
  }

  public update(dt: number): void {
    const delta = this.progress - this.actualProgress;
    this.actualProgress += delta * dt * this.options.ease;
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.drawProgressBar();
    const position = vec.map(vec.add(this.position, this.anchorOffset), Math.floor);
    context.drawImage(this.canvas, position.x, position.y);
  }

  private drawProgressBar(): void {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

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
