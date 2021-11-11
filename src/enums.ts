export enum ContentItemType {
  Image = 'image',
  Sound = 'sound',
  Font = 'font',
  EntityData = 'entityData',
  MapData = 'mapData',
}

export enum StateTransitionType {
  In,
  Out,
  None,
}

export enum Key {
  Up = 'ArrowUp',
  Down = 'ArrowDown',
  Left = 'ArrowLeft',
  Right = 'ArrowRight',
  Space = 'Space',
  Enter = 'Enter',
  Shift = 'Shift',
  Control = 'Control',
  Escape = 'Escape',
  Digit0 = 'Digit0',
  Digit1 = 'Digit1',
  Digit2 = 'Digit2',
  Digit3 = 'Digit3',
  Digit4 = 'Digit4',
  Digit5 = 'Digit5',
  Digit6 = 'Digit6',
  Digit7 = 'Digit7',
  Digit8 = 'Digit8',
  Digit9 = 'Digit9',
}

export enum Anchor {
  TopLeft,
  TopCenter,
  TopRight,
  CenterLeft,
  Center,
  CenterRight,
  BottomLeft,
  BottomCenter,
  BottomRight,
}

export enum ComponentComparisonType {
  Some,
  All,
  None,
}
