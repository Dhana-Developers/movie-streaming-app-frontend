import { Component, OnInit, forwardRef } from '@angular/core';
import { OnApprove, PayPalProcessor } from 'src/app/paypal/paypal.component';
import { OnApproveActions, OnApproveData, OnCancelData, OnErrorData } from 'src/app/paypal/types/buttons';
import { OrderRequest } from 'src/app/paypal/types/order';

@Component({
  selector: 'app-subscriptionpaypal',
  templateUrl: './subscriptionpaypal.component.html',
  styleUrls: ['./subscriptionpaypal.component.scss'],
  providers: [{provide: PayPalProcessor, useExisting: forwardRef(() => SubscriptionpaypalComponent)}]
})
export class SubscriptionpaypalComponent implements OnInit, OnApprove {

  width = 220;
  height = 35;
  shape = 'rect';
  color = 'gold';
  label = 'checkout';
  layout = 'vertical';

  order: OrderRequest = {
    intent: 'CAPTURE', 
    payer: {
      name: {
        given_name: "PayPal",
        surname: "Customer"
      },
      address: {
        address_line_1: '123 ABC Street',
        address_line_2: 'Apt 2',
        admin_area_2: 'San Jose',
        admin_area_1: 'CA',
        postal_code: '95121',
        country_code: 'US'
      },
      email_address: "customer@domain.com",
      phone: {
        phone_type: "MOBILE",
        phone_number: {
          national_number: "14082508100"
        }
      }
    },
    purchase_units: [{
      custom_id: 'wallet10',
      amount: {
        currency_code: 'USD',
        value: '9.99'
      },
      shipping: {
        address: {
          address_line_1: '2211 N First Street',
          address_line_2: 'Building 17',
          admin_area_2: 'San Jose',
          admin_area_1: 'CA',
          postal_code: '95131',
          country_code: 'US'
        }
      }
    }]
  };

  constructor() { }

  ngOnInit() {}

  onApprove(data: OnApproveData, actions: OnApproveActions) {
    
    console.log('Transaction Approved:', data);

    // Captures the trasnaction
    return actions.order.capture().then(details => {

      console.log('Transaction completed by', details);

      // Call your server to handle the transaction
      return Promise.reject('Transaction aborted by the server');
    });
  }

  onCancel(data: OnCancelData) {

    console.log('Transaction Cancelled:', data); 
  }

  onError(data: OnErrorData) { 

    console.log('Transaction Error:', data); 
  }


}
