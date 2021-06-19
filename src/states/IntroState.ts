import { State } from './State';

export class IntroState extends State {
  public constructor() {
    super({
      transitionTime: 2,
    });
  }

  public initialise(): void {
    //
  }

  public update(dt: number): void {
    console.log(dt);
  }

  public draw(context: CanvasRenderingContext2D): void {
    console.log(context);
  }
}
