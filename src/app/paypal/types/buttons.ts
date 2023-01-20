import { SubscriptionRequest, SubscriptionResponse } from './subscription';
import { PaymentRequest, PaymentResponse } from './payments';
import { OrderRequest, OrderResponse } from './order';
import { Funding } from './common';

// @see { https://github.com/krakenjs/zoid/blob/master/docs/api.md }
export interface Buttons {
  
  state: any;
  show: () => Promise<void>;
  hide: () => Promise<void>;
  focus: () => Promise<void>;
  close: () => Promise<void>;

  render: (container: string|HTMLElement) =>  Promise<void>;

  updateProps(config: ButtonsConfig): Promise<void>;

  isEligible : () => boolean;
}

export interface ButtonsConfig {

  enableStandardCardFields?: boolean;

  fundingSource?: Funding;

  style?: ButtonsStyle;

  onInit?: (data: OnInitData, actions: OnInitActions) => Promise<void>|void;

  onError?: (err: OnErrorData) => Promise<void>|void;

  onClick?: (data: OnClickData, actions: OnClickActions) => Promise<boolean|void>|void;

  createOrder?: (data: CreateOrderData, actions: CreateOrderActions) => Promise<string>;

//   createSubscription?: (data: CreateSubscriptionData, actions: CreateSubscriptionActions) => Promise<string>;

  onApprove?: (arg0: OnApproveData, arg1: OnApproveActions) => Promise<void>|void;

  onCancel?: (arg0: OnCancelData, arg1: OnCancelActions) => Promise<void>|void;

  onShippingChange?: (arg0: OnShippingChangeData, arg1: OnShippingChangeActions) => Promise<void>|void;
}

// @see { https://developer.paypal.com/docs/checkout/integration-features/customize-button }
export interface ButtonsStyle {
  layout?: ButtonsLayout;
  label?: ButtonsLabel;
  shape?: ButtonsShape;
  color?: ButtonsColor;
  height?: number; //25..55
  tagline?: boolean;
}

export type ButtonsLayout = string;
// export type ButtonsLabel = 'paypal' | 'checkout' | 'buynow'| 'pay' | 'installment';
export type ButtonsLabel = string;
// export type ButtonsColor = 'gold' | 'blue' | 'silver' | 'white' | 'black';
export type ButtonsColor = string;
// export type ButtonsShape = 'pill' | 'rect';
export type ButtonsShape = string;

export type OnInitData = any;

export interface OnInitActions {
  enable: () => Promise<void>;
  disable: () => Promise<void>;
}

export type OnErrorData = any;

export interface OnClickData {
  fundingSource: Funding;
}

export interface OnClickActions{
  resolve: () => Promise<boolean>;
  reject: () => Promise<boolean>;
}

export type CreateOrderData = any;

export interface CreateOrderActions {
  order: { 
    create: (arg0: OrderRequest) => Promise<string> 
  },
  payment?: { 
    create: (arg0: PaymentRequest) => Promise<string> 
  }
}

// export type CreateSubscriptionData = any;

// export type CreateSubscriptionActions = {
//   subscription : {
//     create : (arg0: SubscriptionRequest) => Promise<string>,
//     revise : (arg0: string, arg1: any) => Promise<string>
//   }
// }

export interface OnApproveData {
  orderID: string,
  payerID?: string,
  paymentID?: string,
  subscriptionID?: string,
  billingToken?: string
}

export interface OnApproveActions {
  order: {
    capture: () => Promise<OrderResponse>,
    authorize: () => Promise<OrderResponse>,
    patch: () => Promise<OrderResponse>,
    get: () => Promise<OrderResponse>
  },
  payment?: {
    execute : () => Promise<PaymentResponse>,
    patch : () => Promise<PaymentResponse>,
    get : () => Promise<PaymentResponse>
  },
  subscription : {
    get: () => Promise<SubscriptionResponse>,
    activate: () => Promise<SubscriptionResponse>
  },
  restart: () => Promise<void>,
  redirect: (arg0: string) => Promise<void>
}

export interface OnCancelData {
  orderID: string
}

export interface OnCancelActions {
  redirect: (arg0: string) => Promise<void>
}

export interface OnShippingChangeData {
  orderID: string
  paymentID: string
  paymentToken: string;
  shipping_address: any;
  selected_shipping_method?: any;
};

export interface OnShippingChangeActions {
  resolve: () => Promise<void>,
  reject: (arg0: any) => Promise<void>,
  order: {
    patch : () => Promise<OrderResponse>
  }
}