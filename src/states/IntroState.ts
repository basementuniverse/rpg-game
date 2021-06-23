import { State } from './State';
import { StateTransitionType } from '../enums';
import Input from '../Input';
import StateManager from './StateManager';
import { MainMenuState } from '.';
import { vec } from '@basementuniverse/commonjs';
import { Image } from '../menus/components';

export class IntroState extends State {
  private static readonly TRANSITION_TIME: number = 5;
  private static readonly SKIPLOCK_TIME: number = 4;
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

  public draw(context: CanvasRenderingContext2D, screen: vec): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    this.logo.position = vec.map(vec.mul(screen, 1 / 2), Math.floor);
    this.logo.draw(context);
    context.restore();
  }
}
