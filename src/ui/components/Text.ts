import { vec } from '@basementuniverse/commonjs';
import { Anchor } from '../../enums';
import Component, { ComponentOptions } from './Component';

type TextOptions = ComponentOptions & {
  size: number;
  font: string;
  padding: number;
  colour: Colour;
  strokeWidth: number;
  strokeColour: Colour;
};

export class Text extends Component {
  public text: string;
  public options: TextOptions;
  private readonly defaultOptions: TextOptions = {
    anchor: Anchor.Center,
    size: 30,
    font: 'sans-serif',
    padding: 4,
    colour: '#000',
    strokeWidth: 0,
    strokeColour: '#fff',
  };

  public constructor(
    text: string,
    position: vec = vec(),
    options: Partial<TextOptions> = {}
  ) {
    super(position);
    this.text = text;
    this.options = Object.assign({}, this.defaultOptions, options);
    this.context.font = `${this.options.size}px ${this.options.font}`;
    this.context.textBaseline = 'top';
    this.canvas.width = this.context.measureText(text).width + this.options.padding * 2;
    this.canvas.height = this.options.size + this.options.padding * 2;
  }

  public update(): void {
    if (this.options.parent) {
      this.position = this.options.parent.position;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.drawText();
    const position = vec.map(vec.add(this.position, this.anchorOffset), Math.floor);
    context.drawImage(this.canvas, position.x, position.y);
  }

  private drawText(): void {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.font = `${this.options.size}px ${this.options.font}`;
    this.context.textBaseline = 'top';
    if (this.options.strokeWidth > 0) {
      this.context.lineWidth = this.options.strokeWidth;
      this.context.lineCap = 'round';
      this.context.lineJoin = 'round';
      this.context.strokeStyle = this.options.strokeColour;
      this.context.strokeText(this.text, this.options.padding, this.options.padding);
    }
    this.context.fillStyle = this.options.colour;
    this.context.fillText(this.text, this.options.padding, this.options.padding);
    this.context.restore();
  }
}
