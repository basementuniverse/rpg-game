import * as constants from '../constants';
import { State } from './State';
import Content from '../content/Content';
import StateManager from './StateManager';
import { ProgressBar } from '../menus/controls/ProgressBar';
import { IntroState } from './IntroState';
import { StateTransitionType } from '../enums';

export class LoadingState extends State {
  private finishedLoadingContent: boolean = false;
  private progressBar: ProgressBar;
  private cooldownTime: number = 3;

  public initialise(): void {
    this.progressBar = new ProgressBar();
    Content.load().then(() => {
      this.finishedLoadingContent = true;
    }).catch((error: string) => {
      constants.DEBUG && console.log(`Unable to load content: ${error}`);
    });
  }

  public update(dt: number): void {
    this.progressBar.update(dt, Content.progress);
    if (this.finishedLoadingContent) {
      this.cooldownTime -= dt;
    }
    if (this.cooldownTime <= 0) {
      StateManager.pop();
      StateManager.push(new IntroState());
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    if (this.transitionType === StateTransitionType.Out) {
      context.globalAlpha = this.transitionAmount;
    }
    this.progressBar.draw(context);
    context.restore();
  }
}
