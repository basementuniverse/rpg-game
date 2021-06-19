import { Key } from "./enums";
import { vec } from "@basementuniverse/commonjs";

type MouseState = {
  button: boolean,
  position: vec,
  wheel: number
};

type KeyboardState = {
  [key in Key]?: boolean
};

export default class Input {
  private static instance: Input;
  private keyboardState: KeyboardState = {};
  private previousKeyboardState: KeyboardState = {};
  private mouseState: MouseState = { button: false, position: vec(), wheel: 0 };
  private previousMouseState: MouseState = { button: false, position: vec(), wheel: 0 };

  private constructor(canvas: HTMLCanvasElement) {
    canvas.addEventListener('mousedown', () => {
      this.mouseState.button = true;
    });
    canvas.addEventListener('mouseup', () => {
      this.mouseState.button = false;
    });
    canvas.addEventListener('touchstart', () => {
      this.mouseState.button = true;
    });
    canvas.addEventListener('touchend', () => {
      this.mouseState.button = false;
    });
    canvas.addEventListener('mousemove', e => {
      this.mouseState.position.x = e.offsetX;
      this.mouseState.position.y = e.offsetY;
    });
    canvas.addEventListener('keydown', e => {
      this.keyboardState[e.code as Key] = true;
    });
    canvas.addEventListener('keyup', e => {
      this.keyboardState[e.code as Key] = false;
    });
    canvas.addEventListener('wheel', e => {
      this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
    });
  }

  /**
   * Initialise the input manager for managing mouse and keyboard input
   * @param canvas The game canvas
   */
  public static initialise(canvas: HTMLCanvasElement): void {
    Input.instance = new Input(canvas);
  }

  private static getInstance(): Input {
    if (Input.instance == null) {
      throw new Error('Input manager not properly initialised');
    }
    return Input.instance;
  }

  /**
   * Update the state of the input devices
   */
  public static update(): void {
    const input = Input.getInstance();
    input.previousKeyboardState = Object.assign({}, input.keyboardState);
    input.previousMouseState = {
      button: input.mouseState.button,
      position: vec.cpy(input.mouseState.position),
      wheel: 0
    };
  }

  /**
   * Check if a key is currently pressed down
   * @param key The key to check, or any key if not specified
   */
  public static keyDown(key?: Key): boolean {
    const input = Input.getInstance();

    // Check if any key is down
    if (key == null) {
      for (const k in input.keyboardState) {
        if (input.keyboardState[k as Key]) {
          return true;
        }
      }
      return false;
    }
    return !!input.keyboardState[key];
  }

  /**
   * Check if a key has been pressed since the last frame
   * @param key The key to check, or any key if not specified
   */
  public static keyPressed(key?: Key): boolean {
    const input = Input.getInstance();

    // Check if any key was pressed
    if (key == null) {
      for (const k in input.keyboardState) {
        if (
          input.keyboardState[k as Key] &&
          (
            !(k in input.previousKeyboardState) ||
            !input.previousKeyboardState[k as Key]
          )
        ) {
          return true;
        }
      }
      return false;
    }
    return !!input.keyboardState[key] && !input.previousKeyboardState[key];
  }

  /**
   * Check if a key has been released since the last frame
   * @param key The key to check, or any key if not specified
   */
  public static keyReleased(key?: Key): boolean {
    const input = Input.getInstance();

    // Check if any key was released
    if (key == null) {
      for (const k in input.keyboardState) {
        if (
          !input.keyboardState[k as Key] &&
          !!input.previousKeyboardState[k as Key]
        ) {
          return true;
        }
      }
      return false;
    }
    return !input.keyboardState[key] && !!input.previousKeyboardState[key];
  }

  /**
   * Check if a mouse button is currently pressed down
   */
  public static mouseDown(): boolean {
    const input = Input.getInstance();
    return !!input.mouseState.button;
  }

  /**
   * Check if a mouse button has been pressed since the last frame
   */
  public static mousePressed(): boolean {
    const input = Input.getInstance();
    return !!input.mouseState.button && !input.previousMouseState.button;
  }

  /**
   * Check if a mouse button has been released since the last frame
   */
  public static mouseReleased(): boolean {
    const input = Input.getInstance();
    return !input.mouseState.button && !!input.previousMouseState.button;
  }

  /**
   * Check if the mousewheel is scrolling up
   */
  public static mouseWheelUp(): boolean {
    const input = Input.getInstance();
    return input.mouseState.wheel > 0;
  }

  /**
   * Check if the mousewheel is scrolling down
   */
  public static mouseWheelDown(): boolean {
    const input = Input.getInstance();
    return input.mouseState.wheel < 0;
  }

  /**
   * Get the current mouse position in screen-space
   */
  public static mousePosition(): vec {
    const input = Input.getInstance();
    return input.mouseState.position;
  }
}
