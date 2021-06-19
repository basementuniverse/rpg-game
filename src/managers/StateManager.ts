import { State } from '../states/State';
import { StateTransitionType } from '../enums';

export class StateManager {
  private static instance: StateManager;
  private states: State[] = [];

  private constructor() {}

  public static initialise(): void {
    StateManager.instance = new StateManager();
  }

  private static getInstance(): StateManager {
    if (StateManager.instance === undefined) {
      throw new Error('State manager not properly initialised');
    }
    return StateManager.instance;
  }

  public static push(state: State): State {
    const instance = StateManager.getInstance();
    instance.states.push(state);

    // Initialise the state and start transitioning in
    state.initialise();
    state.transitionIn();
    return state;
  }

  public static pop(): State | null {
    const instance = StateManager.getInstance();
    if (instance.states.length > 0) {
      let last: number = instance.states.length - 1;

      // Remove the top-most state that isn't currently transitioning out
      while (last > 0 && instance.states[last].transitionType === StateTransitionType.Out) {
        last--;
      }
      if (last >= 0) {
        const state = instance.states[last];

        // Start transitioning out
        state.transitionOut();
        return state;
      }
    }
    return null;
  }

  public static clear(): void {
    const instance = StateManager.getInstance();
    instance.states.forEach(state => {
      if (state.transitionType !== StateTransitionType.Out) {
        state.transitionOut();
      }
    });
  }

  public static update(dt: number): void {
    const instance = StateManager.getInstance();
    if (instance.states.length > 0) {

      // Only update the top-most state that isn't currently transitioning out
      for (let i = instance.states.length; i--;) {
        if (instance.states[i].transitionType !== StateTransitionType.Out) {
          instance.states[i].update(dt);
          break;
        }
      }

      // Update all state transitions
      instance.states.forEach(state => {
        state.updateTransition(dt);
      });

      // Remove any disposed states
      instance.states = instance.states.filter(state => !state.disposed);
    }
  }

  public static draw(context: CanvasRenderingContext2D): void {
    const instance = StateManager.getInstance();
    if (instance.states.length > 0) {
      const drawStates = [instance.states[instance.states.length - 1]];
      let transparentStateIndex = instance.states.length - 1;

      // Create a list of states that need to be drawn (transparent states also display
      // the state underneath them in the stack)
      while (
        transparentStateIndex > 0 &&
        instance.states[transparentStateIndex].transparent
      ) {
        drawStates.push(instance.states[--transparentStateIndex]);
      }

      // Draw states in reverse order i.e. bottom to top
      for (let i = drawStates.length; i--;) {
        drawStates[i].draw(context);
      }
    }
  }
}
