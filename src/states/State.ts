import { StateTransitionType } from '../enums';

export type StateOptions = {
  transitionTime: number,
};

export abstract class State {
  private readonly defaultOptions: StateOptions = {
    transitionTime: 2,
  };

  public transitionType: StateTransitionType = StateTransitionType.None;
  public transitionAmount: number = 0;
  public transitionTime: number;
  public transparent: boolean;
  public disposed: boolean = false;

  public constructor(options: Partial<StateOptions> = {}) {
    const actualOptions = Object.assign({}, this.defaultOptions, options);
    this.transitionTime = actualOptions.transitionTime;
  }

  public dispose(): void {
    this.disposed = true;
  }

  public transitionIn(): void {
    this.transitionType = StateTransitionType.In;
  }

  public transitionOut(): void {
    this.transitionType = StateTransitionType.Out;
  }

  public updateTransition(dt: number): void {
    const amount: number = dt / this.transitionTime;

    // Transitioning in
    if (this.transitionType === StateTransitionType.In) {
      if (this.transitionAmount < 1) {
        this.transitionAmount = Math.clamp(this.transitionAmount + amount);
      } else {
        this.transitionType = StateTransitionType.None;
      }
    }

    // Transitioning out
    if (this.transitionType === StateTransitionType.Out) {
      if (this.transitionAmount > 0) {
        this.transitionAmount = Math.clamp(this.transitionAmount - amount);
      } else {
        this.dispose();
      }
    }
  }

  public abstract initialise(): void;

  public abstract update(dt: number): void;

  public abstract draw(context: CanvasRenderingContext2D): void;
}
