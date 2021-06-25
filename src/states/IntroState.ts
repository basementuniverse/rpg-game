import { vec } from '@basementuniverse/commonjs';
import { StateTransitionType } from '../enums';
import Game from '../Game';
import Input from '../Input';
import { Image } from '../ui/components';
import { MainMenuState } from '.';
import State from './State';
import StateManager from './StateManager';

export class IntroState extends State {
  private static readonly TRANSITION_TIME: number = 5;
  private static readonly SKIPLOCK_TIME: number = 2;
  private static readonly AUTOSKIP_TIME: number = 10;

  private logo: Image;
  private skipLockTime: number;
  private autoSkipTime: number;

  public constructor() {
    super({
      transitionTime: IntroState.TRANSITION_TIME,
    });
  }

  public initialise(): void {
    this.skipLockTime = IntroState.SKIPLOCK_TIME;
    this.autoSkipTime = IntroState.AUTOSKIP_TIME;
    this.logo = new Image('logo');
  }

  public update(dt: number): void {
    this.logo.position = vec.map(vec.mul(Game.screen, 1 / 2), Math.floor);
    this.logo.update();
    this.skipLockTime -= dt;
    this.autoSkipTime -= dt;
    if (
      (this.skipLockTime <= 0 && Input.keyPressed()) ||
      this.autoSkipTime <= 0
    ) {
      StateManager.pop();
      StateManager.push(new MainMenuState());
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    this.logo.draw(context);
    context.restore();
  }
}
