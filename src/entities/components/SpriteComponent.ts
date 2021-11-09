import Component, { ComponentData } from './Component';

export type SpriteComponentData = ComponentData & {
  tempColour: Colour;
};

export class SpriteComponent extends Component {
  public constructor(
    public tempColour: Colour
  ) {
    super('sprite');
  }
  
  public serialize(): SpriteComponentData {
    return {
      ...super.serialize(),
      tempColour: this.tempColour,
    };
  }

  public static deserialize(data: SpriteComponentData): SpriteComponent {
    return new SpriteComponent(
      data.tempColour
    );
  }
}
