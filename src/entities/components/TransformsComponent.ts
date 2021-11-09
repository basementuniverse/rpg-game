import { vec } from '@basementuniverse/commonjs';
import Component, { ComponentData } from './Component';

export type TransformsComponentData = ComponentData & {
  position: vec;
  size: vec;
};

export class TransformsComponent extends Component {
  public constructor(
    public position: vec,
    public size: vec
  ) {
    super('transforms');
  }

  public serialize(): TransformsComponentData {
    return {
      ...super.serialize(),
      position: this.position,
      size: this.size,
    };
  }

  public static deserialize(data: TransformsComponentData): TransformsComponent {
    return new TransformsComponent(
      data.position,
      data.size
    );
  }
}
