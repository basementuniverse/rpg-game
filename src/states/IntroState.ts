import { State } from './State';
import { ContentManager } from '../managers';
import Debug from '../Debug';

export class IntroState extends State {
  private finishedLoadingContent: boolean = false;

  public constructor() {
    super({
      transitionTime: 2,
    });
  }

  public initialise(): void {
    ContentManager.load().then(() => {
      this.finishedLoadingContent = true;
    }).catch((error: string) => {
      console.log(`Unable to load content: ${error}`);
    });
  }

  public update(): void {
    Debug.value('progress', ContentManager.progress);
    if (this.finishedLoadingContent) {
      Debug.value('finished', 'yes');
    }
  }

  public draw(context: CanvasRenderingContext2D): void {
    //
  }
}
