export interface Currency {
  date: string;
  value: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
