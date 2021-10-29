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
  private name: string;

  public constructor() {}
}
