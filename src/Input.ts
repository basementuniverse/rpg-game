import { Key } from './enums';
import { vec } from '@basementuniverse/commonjs';

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

  private constructor() {
    window.addEventListener('mousedown', () => {
      this.mouseState.button = true;
    });
    window.addEventListener('mouseup', () => {
      this.mouseState.button = false;
    });
    window.addEventListener('touchstart', () => {
      this.mouseState.button = true;
    });
    window.addEventListener('touchend', () => {
      this.mouseState.button = false;
    });
    window.addEventListener('mousemove', e => {
      this.mouseState.position.x = e.offsetX;
      this.mouseState.position.y = e.offsetY;
    });
    window.addEventListener('keydown', e => {
      this.keyboardState[e.code as Key] = true;
    });
    window.addEventListener('keyup', e => {
      this.keyboardState[e.code as Key] = false;
    });
    window.addEventListener('wheel', e => {
      this.mouseState.wheel = e.deltaY > 0 ? 1 : -1;
    });
  }

  /**
   * Initialise the input manager for managing mouse and keyboard input
   */
  public static initialise(): void {
    Input.instance = new Input();
  }

  private static getInstance(): Input {
    if (Input.instance === undefined) {
      throw new Error('Input manager not properly initialised');
    }
    return Input.instance;
  }

  /**
   * Update the state of the input devices
   */
  public static update(): void {
    const instance = Input.getInstance();
    instance.previousKeyboardState = Object.assign({}, instance.keyboardState);
    instance.previousMouseState = {
      button: instance.mouseState.button,
      position: vec.cpy(instance.mouseState.position),
      wheel: 0,
    };
  }

  /**
   * Check if a key is currently pressed down
   */
  public static keyDown(key?: Key): boolean {
    const instance = Input.getInstance();

    // Check if any key is down
    if (key == null) {
      for (const k in instance.keyboardState) {
        if (instance.keyboardState[k as Key]) {
          return true;
        }
      }
      return false;
    }
    return !!instance.keyboardState[key];
  }

  /**
   * Check if a key has been pressed since the last frame
   */
  public static keyPressed(key?: Key): boolean {
    const instance = Input.getInstance();

    // Check if any key was pressed
    if (key == null) {
      for (const k in instance.keyboardState) {
        if (
          instance.keyboardState[k as Key] &&
          (
            !(k in instance.previousKeyboardState) ||
            !instance.previousKeyboardState[k as Key]
          )
        ) {
          return true;
        }
      }
      return false;
    }
    return !!instance.keyboardState[key] && !instance.previousKeyboardState[key];
  }

  /**
   * Check if a key has been released since the last frame
   */
  public static keyReleased(key?: Key): boolean {
    const instance = Input.getInstance();

    // Check if any key was released
    if (key == null) {
      for (const k in instance.keyboardState) {
        if (
          !instance.keyboardState[k as Key] &&
          !!instance.previousKeyboardState[k as Key]
        ) {
          return true;
        }
      }
      return false;
    }
    return !instance.keyboardState[key] && !!instance.previousKeyboardState[key];
  }

  /**
   * Check if a mouse button is currently pressed down
   */
  public static mouseDown(): boolean {
    const instance = Input.getInstance();
    return !!instance.mouseState.button;
  }

  /**
   * Check if a mouse button has been pressed since the last frame
   */
  public static mousePressed(): boolean {
    const instance = Input.getInstance();
    return !!instance.mouseState.button && !instance.previousMouseState.button;
  }

  /**
   * Check if a mouse button has been released since the last frame
   */
  public static mouseReleased(): boolean {
    const instance = Input.getInstance();
    return !instance.mouseState.button && !!instance.previousMouseState.button;
  }

  /**
   * Check if the mousewheel is scrolling up
   */
  public static mouseWheelUp(): boolean {
    const instance = Input.getInstance();
    return instance.mouseState.wheel > 0;
  }

  /**
   * Check if the mousewheel is scrolling down
   */
  public static mouseWheelDown(): boolean {
    const instance = Input.getInstance();
    return instance.mouseState.wheel < 0;
  }

  /**
   * Get the current mouse position in screen-space
   */
  public static mousePosition(): vec {
    const instance = Input.getInstance();
    return instance.mouseState.position;
  }
}
