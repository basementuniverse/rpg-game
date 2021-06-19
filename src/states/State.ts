import { StateTransitionType } from '../enums';

export type StateOptions = {
  transitionTime: number,
  transparent: boolean
};

export abstract class State {
  private readonly defaultOptions: StateOptions = {
    transitionTime: 1,
    transparent: false,
  };

  public transitionType: StateTransitionType = StateTransitionType.None;
  public transitionAmount: number = 0;
  public transitionTime: number;
  public transparent: boolean;
  public disposed: boolean = false;

  public testName: string = '';

  public constructor(options: Partial<StateOptions> = {}) {
    const actualOptions = Object.assign({}, this.defaultOptions, options);
    this.transitionTime = actualOptions.transitionTime;
    this.transparent = actualOptions.transparent;
  }

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

  public abstract initialise(): void;

  public abstract update(dt: number): void;

  public abstract draw(context: CanvasRenderingContext2D): void;
}
