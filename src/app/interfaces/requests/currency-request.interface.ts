export enum CurrencyCode {
  UAH = 'UAH',
  USD = 'USD',
  EUR = 'EUR',
}

export interface CurrencyRequest {
  function?: string;
  from_symbol?: CurrencyCode;
  to_symbol?: CurrencyCode;
}

