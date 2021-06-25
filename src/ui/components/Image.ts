import { vec } from '@basementuniverse/commonjs';
import Content from '../../content/Content';
import { Anchor } from '../../enums';
import Component, { ComponentOptions } from './Component';

type ImageOptions = ComponentOptions;

export class Image extends Component {
  private image: HTMLImageElement;
  public options: ImageOptions;
  protected readonly defaultOptions: ImageOptions = {
    anchor: Anchor.Center,
  };

  public constructor(
    imageName: string,
    position: vec = vec(),
    options: Partial<ImageOptions> = {}
  ) {
    super(position);
    this.options = Object.assign({}, this.defaultOptions, options);
    this.image = Content.get<HTMLImageElement>(imageName);
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
  }

  public update(): void {
    if (this.options.parent) {
      this.position = this.options.parent.position;
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    this.drawImage();
    const position = vec.map(vec.add(this.position, this.anchorOffset), Math.floor);
    context.drawImage(this.canvas, position.x, position.y);
  }

  private drawImage(): void {
    this.context.save();
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(this.image, 0, 0);
    this.context.restore();
  }
}
