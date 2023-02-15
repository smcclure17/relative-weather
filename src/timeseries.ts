export interface Point<T> {
  time: Date;
  value: T;
}

export class Timeseries<T> {
  constructor(public readonly points: { time: Date; value: T }[]) {
    this.points = points.sort((a, b) => a.time.getTime() - b.time.getTime());
  }

  hasData(): this is NotEmptyTimeseries<T> {
    return this.points.length > 0;
  }

  removeNulls(fn?: (points: Point<T>[]) => Point<T>[]): Timeseries<T> {
    if (fn) {
      return new Timeseries(fn(this.points));
    }
    return new Timeseries(this.points.filter(p => p.value !== null));
  }

  getDataForDate(date: Date): Timeseries<T> {
    const points =  this.points.filter((p) => {
      return p.time.toLocaleString().split(",")[0] === date.toLocaleString().split(",")[0];
    })
    if (points) {
      return new Timeseries(points);
    }
    throw new Error(`No data for date ${date}`);
  }

  get first(): Point<T> | undefined {
    return this.points[0];
  }

  get last(): Point<T> | undefined {
    return this.points[this.points.length - 1];
  }

  get min(): Point<T> | undefined {
      return this.points.reduce((min, p) => (p.value < min.value ? p : min));
  }

  get max(): Point<T> | undefined {
    return this.points.reduce((max, p) => (p.value > max.value ? p : max));
  }

  get length(): number {
    return this.points.length;
  }
}

export interface NotEmptyTimeseries<T> extends Timeseries<T> {
  first: Point<T>;
  last: Point<T>;
  min: Point<T>;
  max: Point<T>;
  length: number;
}
