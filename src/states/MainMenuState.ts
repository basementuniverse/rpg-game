import { vec } from '@basementuniverse/commonjs';
import * as config from '../config.json';
import Content from '../content/Content';
import { StateTransitionType } from '../enums';
import Game from '../Game';
import MenuItem from '../ui/MenuItem';
import State from './State';

export class MainMenuState extends State {
  private background: HTMLImageElement;
  private backgroundPattern: CanvasPattern | null;

  private testMenuItem: MenuItem;
  private testTime: number = 0;

  public initialise(): void {
    this.background = Content.get<HTMLImageElement>('menu_background');
    this.testMenuItem = new MenuItem(vec(100, 100), 'Test Button');
  }

  public update(dt: number): void {
    this.testMenuItem.position = vec.map(vec.mul(Game.screen, 1 / 2), Math.floor);
    this.testMenuItem.update(dt);
    this.testTime += dt;
    this.testMenuItem.selected = Math.sin(this.testTime / 2) > 0;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    if (!this.backgroundPattern) {
      this.backgroundPattern = context.createPattern(this.background, 'repeat');
    }
    if (this.backgroundPattern) {
      context.fillStyle = this.backgroundPattern;
      context.fillRect(
        0,
        0,
        context.canvas.width * config.scaleFactor,
        context.canvas.height * config.scaleFactor
      );
    }
    this.testMenuItem.draw(context);
    context.restore();
  }
}
