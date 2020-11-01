import { vec } from "@basementuniverse/commonjs";
import * as config from './config.json';

type DebugOptions = {
  margin: number,
  padding: number,
  font: string,
  lineHeight: number,
  foregroundColour: Colour,
  backgroundColour: Colour,
  defaultValue: DebugValue,
  defaultMarker: DebugMarker
};

type DebugValue = {
  label?: string,
  value?: number | string,
  align: 'left' | 'right',
  showLabel: boolean,
  padding?: number,
  font?: string,
  foregroundColour?: Colour,
  backgroundColour?: Colour
};

type DebugMarker = {
  label?: string,
  value?: number | string,
  position?: vec,
  showLabel: boolean,
  showValue: boolean,
  showMarker: boolean,
  markerSize: number,
  markerStyle: 'x' | '+' | '.',
  markerColour: Colour,
  space: 'world' | 'screen',
  padding?: number,
  font?: string,
  labelOffset: vec,
  foregroundColour?: Colour,
  backgroundColour?: Colour
};

export default class Debug {
  private static instance: Debug;
  private values: Map<string, DebugValue>;
  private markers: Map<string, DebugMarker>;
  private options: DebugOptions
  private readonly defaultOptions: DebugOptions = {
    margin: 10,
    padding: 4,
    font: '10pt Lucida Console, monospace',
    lineHeight: 12,
    foregroundColour: '#fff',
    backgroundColour: '#3338',
    defaultValue: {
      align: 'left',
      showLabel: true
    },
    defaultMarker: {
      showLabel: true,
      showValue: true,
      showMarker: true,
      markerSize: 6,
      markerStyle: 'x',
      markerColour: '#ccc',
      space: 'world',
      labelOffset: vec(10)
    }
  };

  private constructor(options: Partial<DebugOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options);
    this.values = new Map<string, DebugValue>();
    this.markers = new Map<string, DebugMarker>();
  }

  /**
   * Initialise the debug renderer for displaying values and markers
   * @param options Rendering options
   */
  public static initialise(options: Partial<DebugOptions> = {}): void {
    Debug.instance = new Debug(options);
  }

  private static getInstance(): Debug {
    if (Debug.instance == null) {
      Debug.initialise();
    }
    return Debug.instance;
  }

  /**
   * Show a debug value
   * @param label The label for this value
   * @param value The current value
   * @param options Rendering options
   */
  public static value(label: string, value: string | number, options: Partial<DebugValue> = {}): void {
    const debug = Debug.getInstance();
    debug.values.set(label, Object.assign(
      { label, value },
      debug.defaultOptions.defaultValue,
      options
    ));
  }

  /**
   * Show a marker in world or screen space
   * @param label The label for this marker
   * @param value The current value
   * @param position The position of this marker
   * @param options Rendering options
   */
  public static marker(label: string, value: string | number, position: vec, options: Partial<DebugMarker> = {}): void {
    const debug = Debug.getInstance();
    debug.markers.set(label, Object.assign(
      { label, value, position },
      debug.defaultOptions.defaultMarker,
      options
    ));
  }

  /**
   * Render debug values and markers onto the context
   * @param context The rendering context
   */
  public static draw(context: CanvasRenderingContext2D): void {
    const debug = Debug.getInstance();

    // Draw world-space markers
    context.save();
    context.scale(1 / config.scaleFactor, 1 / config.scaleFactor);
    debug.markers.forEach(marker => {
      if (marker.space === 'world') {
        debug.drawMarker(context, marker);
      }
    });
    context.restore();

    // Draw values and screen-space markers
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    let position: vec;
    let leftY = debug.options.margin;
    let rightY = debug.options.margin;
    const lineHeight = (debug.options.lineHeight + debug.options.padding * 2);
    debug.values.forEach(value => {
      switch (value.align) {
        case 'left':
          position = vec(debug.options.margin, leftY);
          leftY += lineHeight;
          break;
        case 'right':
          position = vec(context.canvas.clientWidth - debug.options.margin, rightY);
          rightY += lineHeight;
          break;
      }
      debug.drawLabel(
        context,
        (value.showLabel ? `${value.label}: ` : '') + `${value.value}`,
        position,
        value.align,
        value.padding ?? debug.options.padding,
        value.font ?? debug.options.font,
        value.foregroundColour ?? debug.options.foregroundColour,
        value.backgroundColour ?? debug.options.backgroundColour
      );
    });
    debug.markers.forEach(marker => {
      if (marker.space === 'screen') {
        debug.drawMarker(context, marker);
      }
    });
    context.restore();

    // Clear values and markers ready for next frame
    debug.values.clear();
    debug.markers.clear();
  }

  private drawMarker(context: CanvasRenderingContext2D, marker: DebugMarker): void {
    context.save();
    const position = vec.mul(marker.position ?? vec(), config.scaleFactor);
    if (marker.showLabel || marker.showValue) {
      this.drawLabel(
        context,
        (marker.showLabel ? `${marker.label}: ` : '') + (marker.showValue ? `${marker.value}` : ''),
        vec.add(position ?? vec(), marker.labelOffset),
        'left',
        marker.padding ?? this.options.padding,
        marker.font ?? this.options.font,
        marker.foregroundColour ?? this.options.foregroundColour,
        marker.backgroundColour ?? this.options.backgroundColour
      );
    }
    if (marker.showMarker) {
      context.lineWidth = 2;
      context.strokeStyle = context.fillStyle = marker.markerColour as string;
      switch (marker.markerStyle) {
        case 'x':
          this.drawCross(context, position, marker.markerSize);
          break;
        case '+':
          this.drawPlus(context, position, marker.markerSize);
          break;
        case '.':
          this.drawDot(context, position, marker.markerSize);
          break;
      }
    }
    context.restore();
  }

  private drawLabel(
    context: CanvasRenderingContext2D,
    text: string,
    position: vec,
    align: 'left' | 'right',
    padding: number,
    font: string,
    foregroundColour: Colour,
    backgroundColour: Colour
  ): void {
    context.save();
    context.font = font;
    context.textBaseline = 'top';
    const backgroundSize = {
      width: context.measureText(text).width + padding * 2,
      height: this.options.lineHeight + padding * 2
    };
    const x = align === 'right' ? (position.x - backgroundSize.width) : position.x;

    // Draw background
    context.fillStyle = backgroundColour as string;
    context.fillRect(
      x - padding,
      position.y - padding,
      backgroundSize.width,
      backgroundSize.height
    );

    // Draw text
    context.fillStyle = foregroundColour as string;
    context.fillText(text, x, position.y);
    context.restore();
  }

  private drawCross(context: CanvasRenderingContext2D, position: vec, size: number): void {
    context.beginPath();
    const halfSize = size / 2;
    context.moveTo(position.x - halfSize, position.y - halfSize);
    context.lineTo(position.x + halfSize, position.y + halfSize);
    context.moveTo(position.x - halfSize, position.y + halfSize);
    context.lineTo(position.x + halfSize, position.y - halfSize);
    context.stroke();
  }

  private drawPlus(context: CanvasRenderingContext2D, position: vec, size: number): void {
    context.beginPath();
    const halfSize = size / 2;
    context.moveTo(position.x, position.y - halfSize);
    context.lineTo(position.x, position.y + halfSize);
    context.moveTo(position.x - halfSize, position.y);
    context.lineTo(position.x + halfSize, position.y);
    context.stroke();
  }

  private drawDot(context: CanvasRenderingContext2D, position: vec, size: number): void {
    context.beginPath();
    context.arc(position.x, position.y, size / 2, 0, Math.PI * 2);
    context.fill();
  }
}
