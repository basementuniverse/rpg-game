import { State } from './State';
import { StateTransitionType } from '../enums';

export default class StateManager {
  private states: State[] = [];

  public push(state: State): State {
    this.states.push(state);

    // Make sure the state has a reference to the state manager
    state.stateManager = this;

    // Initialise the state and start transitioning in
    state.initialise();
    state.transitionIn();
    return state;
  }

  public pop(): State | null {
    if (this.states.length > 0) {
      let last: number = this.states.length - 1;

      // Remove the top-most state that isn't currently transitioning out
      while (last > 0 && this.states[last].transitionType === StateTransitionType.Out) {
        last--;
      }
      if (last >= 0) {
        const state = this.states[last];

        // Start transitioning out
        state.transitionOut();
        return state;
      }
    }
    return null;
  }

  public clear(): void {
    this.states.forEach(state => {
      if (state.transitionType !== StateTransitionType.Out) {
        state.transitionOut();
      }
    });
  }

  public update(dt: number): void {
    if (this.states.length > 0) {

      // Only update the top-most state that isn't currently transitioning out
      for (let i = this.states.length; i--;) {
        if (this.states[i].transitionType !== StateTransitionType.Out) {
          this.states[i].update(dt);
          break;
        }
      }

      // Update all state transitions
      this.states.forEach(state => {
        state.updateTransition(dt);
      });

      // Remove any disposed states
      this.states = this.states.filter(state => !state.disposed);
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    if (this.states.length > 0) {
      const drawStates = [this.states[this.states.length - 1]];
      let transparentStateIndex = this.states.length - 1;

      // Create a list of states that need to be drawn (transparent states also display
      // the state underneath them in the stack)
      while (
        transparentStateIndex > 0 &&
        this.states[transparentStateIndex].transparent
      ) {
        drawStates.push(this.states[--transparentStateIndex]);
      }

      // Draw states in reverse order i.e. bottom to top
      for (let i = drawStates.length; i--;) {
        drawStates[i].draw(context);
      }
    }
  }
}
