import { vec } from '@basementuniverse/commonjs';
import { Anchor } from '../../enums';

export type ComponentOptions = {
  anchor: Anchor;
};

export abstract class Component {
  public position: vec;
  public options: ComponentOptions & Record<string, unknown>;
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D;

  public constructor(position: vec = vec()) {
    this.position = position;

    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (context !== null) {
      this.context = context;
    } else {
      throw new Error("Couldn't get a 2d context.");
    }
  }

  protected get anchorOffset(): vec {
    switch (this.options.anchor) {
      case Anchor.TopLeft:
        return vec(0, 0);
      case Anchor.TopCenter:
        return vec(-this.canvas.width / 2, 0);
      case Anchor.TopRight:
        return vec(-this.canvas.width, 0);
      case Anchor.CenterLeft:
        return vec(0, -this.canvas.height / 2);
      case Anchor.Center:
        return vec(-this.canvas.width / 2, -this.canvas.height / 2);
      case Anchor.CenterRight:
        return vec(-this.canvas.width, -this.canvas.height / 2);
      case Anchor.BottomLeft:
        return vec(0, -this.canvas.height);
      case Anchor.BottomCenter:
        return vec(-this.canvas.width / 2, -this.canvas.height);
      case Anchor.BottomRight:
        return vec(this.canvas.width / 2, -this.canvas.height);
    }
  }

  public abstract update(dt: number): void;

  public abstract draw(context: CanvasRenderingContext2D): void;
}
