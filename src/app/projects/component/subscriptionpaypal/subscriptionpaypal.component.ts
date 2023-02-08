import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, forwardRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { concat } from 'rxjs';
import { OnApprove, PayPalProcessor } from 'src/app/paypal/paypal.component';
import { OnApproveActions, OnApproveData, OnCancelData, OnErrorData } from 'src/app/paypal/types/buttons';
import { OrderRequest } from 'src/app/paypal/types/order';
import { StorageService } from '../../api/service/storage.service';
import { ThemoviedbService } from '../../api/service/themoviedb.service';

@Component({
  selector: 'app-subscriptionpaypal',
  templateUrl: './subscriptionpaypal.component.html',
  styleUrls: ['./subscriptionpaypal.component.scss'],
  providers: [{provide: PayPalProcessor, useExisting: forwardRef(() => SubscriptionpaypalComponent)}, ]
})
export class SubscriptionpaypalComponent implements OnInit, OnApprove {
  progress: number = 0.25;
  selectedPlan: any;
  plans: any = [
    {
      id: 1,
      name: 'Daily Plan',
      amount: 0.8
    },
    {
      id: 2,
      name: 'Weekly Plan',
      amount: 5,
    },
    {
      id: 3,
      name: 'Monthly Plan',
      amount: 10
    }
  ]

  width = 220;
  height = 35;
  shape = 'rect';
  color = 'gold';
  label = 'checkout';
  layout = 'vertical';
  
  order: any;
  user: any;
  constructor(private storage: StorageService,
    private service: ThemoviedbService,
    private router: Router) { }

  ngOnInit() {
    this.storage.get('user').then(resp => {
      console.log(resp);
      
      this.user = resp;
    });
  }

  onApprove(data: OnApproveData, actions: OnApproveActions) {
    
    console.log('Transaction Approved:', data);

    // Captures the trasnaction
    return actions.order.capture().then(details => {

      console.log('Transaction completed by', details);
      this.goPremium(details);

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

  viewPlans() {
    this.progress += 0.25;
    
  }

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    const initorder = {
      intent: 'CAPTURE', 
      // payer: {
      //   name: {
      //     given_name: "PayPal",
      //     surname: "Customer"
      //   },
      //   address: {
      //     address_line_1: '123 ABC Street',
      //     address_line_2: 'Apt 2',
      //     admin_area_2: 'San Jose',
      //     admin_area_1: 'CA',
      //     postal_code: '95121',
      //     country_code: 'US'
      //   },
      //   email_address: "customer@domain.com",
      //   phone: {
      //     phone_type: "MOBILE",
      //     phone_number: {
      //       national_number: "14082508100"
      //     }
      //   }
      // },
      purchase_units: [{
        custom_id: String(this.selectedPlan.id),
        amount: {
          currency_code: 'USD',
          value: String(this.selectedPlan.amount),
          // breakdown: {
          //   item_total: { 
          //     currency_code: "USD",
          //     value: "100"
          //   }

          // }
        },
        // items: [{
        //   name: this.selectedPlan.name,
        //   description: 'movie subscription',
        //   unit_amount: {
        //     currency_code: 'USD',
        //     // value: String(this.selectedPlan.amount),
        //     value: '50'
        //   },
        //   quantity: '2'
        // }],
        // shipping: {
        //   address: {
        //     address_line_1: '2211 N First Street',
        //     address_line_2: 'Building 17',
        //     admin_area_2: 'San Jose',
        //     admin_area_1: 'CA',
        //     postal_code: '95131',
        //     country_code: 'US'
        //   }
        // }
      }]
    };
    this.order = initorder;
    this.progress += 0.25;
    // this.goPremium();
  }
  
  goPremium(transaction: any) {
    let trans = {
      transId: transaction.id,
      planid: this.selectedPlan.id,
      userid: this.user.id
    }
    this.service.addSub(trans).subscribe(resp =>{
      console.log(resp);
      if (resp.code === 0){
        this.storage.remove('user');
        this.storage.set('user', resp.user);
        this.router.navigate(['tabs', 'popular']);
      } else {

      }
    })
  }
}


