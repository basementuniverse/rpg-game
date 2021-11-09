import { vec } from '@basementuniverse/commonjs';
import * as constants from '../constants';
import Content from '../content/Content';
import { StateTransitionType } from '../enums';
import Game from '../Game';
import { ProgressBar } from '../ui/components';
import { GameState, IntroState, MainMenuState } from '.';
import State from './State';
import StateManager from './StateManager';

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
    this.progressBar.position = vec.map(vec.mul(Game.screen, 1 / 2), Math.floor);
    this.progressBar.progress = Content.progress;
    this.progressBar.update(dt);
    if (this.finishedLoadingContent) {
      console.log('finished loading');
      this.cooldownTime -= dt;
    }

    // TODO remove cooldownTime, finish when the loading bar reaches 100%
    if (this.cooldownTime <= 0) {
      console.log('finished cooldown');
      StateManager.pop();
      setTimeout(() => {
        // TODO loading state goes to intro or main menu state
        // const nextState = constants.SKIP_INTRO
        //   ? new MainMenuState()
        //   : new IntroState();
        // StateManager.push(nextState);
        StateManager.push(new GameState());
      }, LoadingState.INTRO_DELAY * 1000);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    if (this.transitionType !== StateTransitionType.None) {
      context.globalAlpha = this.transitionAmount;
    }
    this.progressBar.draw(context);
    context.restore();
  }
}
