import * as Hammer from 'hammerjs';
import { MouseButton } from "./enums";
import { vec } from "@basementuniverse/commonjs";
import { Key } from './enums';

type MouseState = {
  buttons: {
    [key in MouseButton]: boolean
  },
  position: vec,
  wheel: number
};

export default class InputManager {
  private static instance: InputManager;
  private hammer: HammerManager;
  private keyboardState: Map<string, boolean> = new Map<string, boolean>();
  private previousKeyboardState: Map<string, boolean>;
  private mouseState: MouseState = {
    buttons: {
      [MouseButton.Left]: false,
      [MouseButton.Middle]: false,
      [MouseButton.Right]: false
    },
    position: vec(),
    wheel: 0
  };
  private previousMouseState: MouseState;

  private constructor(canvas: HTMLCanvasElement) {
    this.hammer = new Hammer.Manager(canvas, {
      recognizers: [
        [Hammer.Tap]
      ]
    });

    // Set up input event handlers
    this.hammer.on('tap', e => {
      // e.center
    });
    window.addEventListener('mousemove', e => {
      // vec(e.offsetX, e.offsetY)
    });
    window.addEventListener('keydown', e => {
      this.keyboardState.set(e.code, true);
    });
    window.addEventListener('keyup', e => {
      this.keyboardState.set(e.code, false);
    });
    window.addEventListener('wheel', e => {
      // e.deltaY > 0 ? 1 : -1
    });
  }

  /**
   * Initialise the input manager for managing mouse and keyboard input
   * @param canvas The game canvas
   */
  public static initialise(canvas: HTMLCanvasElement): void {
    InputManager.instance = new InputManager(canvas);
  }

  private static getInstance(): InputManager {
    if (InputManager.instance == null) {
      throw new Error('Input manager not properly initialised');
    }
    return InputManager.instance;
  }

  /**
   * Update the state of the input devices
   */
  public static update(): void {
    const input = InputManager.getInstance();
    input.previousKeyboardState = Object.assign({}, input.keyboardState);
    input.previousMouseState = {
      buttons: {
        [MouseButton.Left]: input.mouseState.buttons[MouseButton.Left],
        [MouseButton.Middle]: input.mouseState.buttons[MouseButton.Middle],
        [MouseButton.Right]: input.mouseState.buttons[MouseButton.Right]
      },
      position: vec.cpy(input.mouseState.position),
      wheel: input.mouseState.wheel
    };
  }

  /**
   * Check if a key is currently pressed down
   * @param key The key to check, or any key if not specified
   */
  public static keyDown(key?: Key): boolean {
    const input = InputManager.getInstance();

    // Check if any key is down
    if (key == null) {
      for (let [, down] of input.keyboardState.entries()) {
        if (down) {
          return true;
        }
      }
      return false;
    }
    return !!input.keyboardState.get(key);
  }

  /**
   * Check if a key has been pressed since the last frame
   * @param key The key to check, or any key if not specified
   */
  public static keyPressed(key?: Key): boolean {
    const input = InputManager.getInstance();

    // Check if any key was pressed
    if (key == null) {
      for (let [k, down] of input.keyboardState.entries()) {
        if (down && (!input.previousKeyboardState.has(k) || !input.previousKeyboardState.get(k))) {
          return true;
        }
      }
      return false;
    }
    return !!input.keyboardState.get(key) && !input.previousKeyboardState.get(key);
  }

  /**
   * Check if a mouse button is currently pressed down
   * @param button The mouse button to check
   */
  public static mouseDown(button: MouseButton): boolean {
    return false;
  }

  /**
   * Check if a mouse button has been pressed since the last frame
   * @param button The mouse button to check
   */
  public static mousePressed(button: MouseButton): boolean {
    return false;
  }

  /**
   * Check if the mousewheel is scrolling up
   */
  public static mouseWheelUp(): boolean {
    return false;
  }

  /**
   * Check if the mousewheel is scrolling down
   */
  public static mouseWheelDown(): boolean {
    return false;
  }
}
