export type ComponentData = {
  name: string;
};

export const ComponentDataSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
  },
};

export default abstract class Component {
  public constructor(
    public name: string
  ) {}

  protected serialize(): ComponentData {
    return {
      name: this.name,
    };
  }
}
