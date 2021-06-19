import StateManager from './StateManager';
import { StateTransitionType } from '../enums';

export type StateOptions = {
  transitionTime: number,
  transparent: boolean
};

export abstract class State {
  private readonly defaultOptions: StateOptions = {
    transitionTime: 5,
    transparent: false
  };

  public stateManager: StateManager;
  public transitionType: StateTransitionType = StateTransitionType.None;
  public transitionAmount: number = 0;
  public transitionTime: number;
  public transparent: boolean;
  public disposed: boolean = false;

  public testName: string = '';

  constructor(options: Partial<StateOptions> = {}) {
    const actualOptions = Object.assign({}, this.defaultOptions, options);
    this.transitionTime = actualOptions.transitionTime;
    this.transparent = actualOptions.transparent;
  }

  public initialise(): void {}

  public dispose(): void {
    this.disposed = true;
  }

  public transitionIn(): void {
    this.transitionType = StateTransitionType.In;
    this.transitionAmount = 0;
  }

  public transitionOut(): void {
    this.transitionType = StateTransitionType.Out;
    this.transitionAmount = 0;
  }

  public updateTransition(dt: number): void {
    const amount: number = dt / this.transitionTime;
    if (this.transitionAmount < 1) {
      this.transitionAmount = Math.clamp(this.transitionAmount + amount);

    // Dispose this state if it has finished transitioning out
    } else if (this.transitionType === StateTransitionType.Out) {
      this.dispose();

    // Otherwise, the state has finished transitioning in
    } else {
      this.transitionType = StateTransitionType.None;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(dt: number): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public draw(context: CanvasRenderingContext2D): void {}
}
