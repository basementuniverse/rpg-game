import { vec } from '@basementuniverse/commonjs';
import GameWorker from 'worker-loader!../workers';
import * as config from '../config.json';
import Content from '../content/Content';
import { Key, StateTransitionType } from '../enums';
import Game from '../Game';
import Input from '../Input';
import { Image } from '../ui/components';
import MenuItem from '../ui/MenuItem';
import { GameState } from '.';
import State from './State';
import StateManager from './StateManager';

export class MainMenuState extends State {
  private background: HTMLImageElement;
  private backgroundPattern: CanvasPattern | null;
  private titleBanner: Image;

  private testMenuItem: MenuItem;
  private testTime: number = 0;

  private testWorker: GameWorker;

  public initialise(): void {
    this.background = Content.get<HTMLImageElement>('menu_background');
    this.titleBanner = new Image('menu_title');
    this.testMenuItem = new MenuItem('Test Button');

    this.testWorker = new GameWorker();
    this.testWorker.postMessage('menu');
    this.testWorker.postMessage('test');
    this.testWorker.postMessage('monkey');
    this.testWorker.onmessage = event => {
      console.log(event.data);
    };
  }

  public update(dt: number): void {
    this.testMenuItem.position = vec.map(vec.mul(Game.screen, 1 / 2), Math.floor);
    this.testMenuItem.update(dt);
    this.testTime += dt;
    this.testMenuItem.selected = Math.sin(this.testTime / 2) > 0;
    if (Input.keyPressed(Key.Space)) {
      StateManager.pop();
      StateManager.push(new GameState());
    }
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
