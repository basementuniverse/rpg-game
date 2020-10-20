import { vec, mat } from '../lib/common';
import * as PIXI from '../lib/pixi';

export default class Game {
  container: HTMLElement = null;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  initialise(): void {
    console.log(`Hello, world! Make sure libraries are loaded: ${vec.str(vec.add(vec(1, 2), vec(3, 4)))}`);
  }
}
