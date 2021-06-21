import { State } from './State';
import * as config from '../config.json';
import { StateTransitionType } from '../enums';

export class IntroState extends State {
  public constructor() {
    super({
      transitionTime: 1,
    });
  }

  public initialise(): void {
    //
  }

  public update(): void {
    //
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    context.fillStyle = '#38f';
    context.fillRect(0, 0, context.canvas.width * config.scaleFactor, context.canvas.height * config.scaleFactor);
    context.restore();
  }
}
