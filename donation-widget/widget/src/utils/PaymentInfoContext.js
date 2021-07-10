import { createContext } from 'react';

const PaymentInfoContext = createContext();

export const PaymentInfoContextProvider =
  PaymentInfoContext.Provider;

export default PaymentInfoContext;
