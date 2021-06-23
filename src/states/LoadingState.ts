import * as constants from '../constants';
import { State } from './State';
import { StateTransitionType } from '../enums';
import Content from '../content/Content';
import StateManager from './StateManager';
import { ProgressBar } from '../menus/components';
import { IntroState } from '.';
import { vec } from '@basementuniverse/commonjs';

export class LoadingState extends State {
  private static readonly TRANSITION_TIME: number = 0.5;
  private static readonly COOLDOWN_TIME: number = 3;
  private static readonly INTRO_DELAY: number = 1;

  private finishedLoadingContent: boolean;
  private progressBar: ProgressBar;
  private cooldownTime: number;

  public constructor() {
    super({
      transitionTime: LoadingState.TRANSITION_TIME,
    });
  }

  public initialise(): void {
    this.finishedLoadingContent = false;
    this.progressBar = new ProgressBar();
    this.cooldownTime = LoadingState.COOLDOWN_TIME;
    Content.load().then(() => {
      this.finishedLoadingContent = true;
    }).catch((error: string) => {
      constants.DEBUG && console.log(`Unable to load content: ${error}`);
    });
  }

  public update(dt: number): void {
    this.progressBar.progress = Content.progress;
    this.progressBar.update(dt);
    if (this.finishedLoadingContent) {
      this.cooldownTime -= dt;
    }
    if (this.cooldownTime <= 0) {
      StateManager.pop();
      setTimeout(() => {
        StateManager.push(new IntroState());
      }, LoadingState.INTRO_DELAY * 1000);
    }
  }

  public draw(context: CanvasRenderingContext2D, screen: vec): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    this.progressBar.position = vec.map(vec.mul(screen, 1 / 2), Math.floor);
    this.progressBar.draw(context);
    context.restore();
  }
}
