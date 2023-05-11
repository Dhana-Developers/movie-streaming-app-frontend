import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, forwardRef } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { concat } from 'rxjs';
import { OnApprove, PayPalProcessor } from 'src/app/paypal/paypal.component';
import { OnApproveActions, OnApproveData, OnCancelData, OnErrorData } from 'src/app/paypal/types/buttons';
import { OrderRequest } from 'src/app/paypal/types/order';
import { StorageService } from '../../api/service/storage.service';
import { ThemoviedbService } from '../../api/service/themoviedb.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MpesaPageForm } from './mpesa.form';

@Component({
  selector: 'app-subscriptionpaypal',
  templateUrl: './subscriptionpaypal.component.html',
  styleUrls: ['./subscriptionpaypal.component.scss'],
  providers: [{provide: PayPalProcessor, useExisting: forwardRef(() => SubscriptionpaypalComponent)}, ]
})
export class SubscriptionpaypalComponent implements OnInit, OnApprove {
  progress: number = 0.25;
  selectedPlan: any;
  mpesa: boolean = false;
  paypal: boolean = false;
  intasend: boolean = false;
  mpesaContact!: string;
  error!: string;
  loading: boolean = false;
  form!: any;

  plans: any = [
    {
      id: 1,
      name: 'Daily Plan',
      amount: 0.01
    },
    {
      id: 2,
      name: 'Weekly Plan',
      amount: 5,
    },
    {
      id: 3,
      name: 'Monthly Plan',
      amount: 50
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
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder) { 
      this.form = FormGroup;
    }

  ngOnInit() {
    this.storage.get('user').then(resp => {
      console.log(resp);
      
      this.user = resp;
    });
    this.form = new MpesaPageForm(this.formBuilder).createForm();
    
  }

  onApprove(data: OnApproveData, actions: OnApproveActions) {
    
    console.log('Transaction Approved:', data);

    // Captures the trasnaction
    return actions.order.capture().then(details => {

      console.log('Transaction completed by', details);
      this.goPremiumPaypal(details);

      // Call your server to handle the transaction
      return Promise.reject('Transaction aborted by the server');
    });
  }

  async onCancel(data: OnCancelData) {
    const toastError = await this.toastCtrl.create({
      message: 'Transaction cancelled',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });
    console.log('Transaction Cancelled:', data);
    await toastError.present(); 
  }

  onError(data: OnErrorData) { 

    console.log('Transaction Error:', data); 
  }

  viewPlans() {
    this.progress += 0.25;
    
  }

  selectPlan(plan: any) {
    this.selectedPlan = plan;
    this.progress += 0.25;
    // this.goPremium();
  }

  selectIntasend(){
    this.intasend = true;
    this.progress = 0.85

    new window.IntaSend({
      // Replace with your Publishable Key
      publicAPIKey: "ISPubKey_test_91ffc81a-8ac4-419e-8008-7091caa8d73f",
      live: false //set to true when going live
    })
    .on("COMPLETE", (results: any) => console.log("Do something on success", results))
    .on("FAILED", (results: any) => console.log("Do something on failure", results))
    .on("IN-PROGRESS", (results: any) => console.log("Payment in progress status", results))
  }

  selectMpesa(){
    this.mpesa = true;
    this.progress = 0.85
  }

  selectPaypal(){
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
    
    this.paypal = true;
    this.progress = 0.85
  }
  
  async goPremiumPaypal(transaction: any) {
    this.loading = true;
    let trans = {
      transId: transaction.id,
      planid: this.selectedPlan.id,
      userid: this.user.id
    }

    const toastSuccess = await this.toastCtrl.create({
      message: 'subscription successful',
      duration: 2000,
      position: 'middle',
      color: 'success'
    });

    const toastError = await this.toastCtrl.create({
      message: 'Error subscription unsuccessful please contact support',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });
    await this.service.addSubPaypal(trans).subscribe(resp =>{
      console.log(resp);
      if (resp.code === 0){
        this.storage.remove('user');
        this.storage.set('user', resp.user);
        window.location.reload();
        toastSuccess.present();
        // this.router.navigate(['tabs', 'popular']);
      } else {
        toastError.present();
      }
    })
  }

  async payMpesa() {
    this.loading = true;
    let trans = {
      userid: this.user.id,
      plan: this.selectedPlan,
      payerContact: '254'.concat(this.form.get('phoneNumber').value.slice(1))
    }
    console.log(trans);
    
    const prompt = await this.toastCtrl.create({
      message: 'processing transaction check prompt on your phone',
      duration: 2000,
      position: 'middle',
      color: 'secondary'
    });
    
    const toastSuccess = await this.toastCtrl.create({
      message: 'subscription successful',
      duration: 2000,
      position: 'middle',
      color: 'success'
    });

    const toastError = await this.toastCtrl.create({
      message: 'an error occured please try again',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });

    const toastCancel = await this.toastCtrl.create({
      message: 'transaction cancelled',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });

    const toastTimeout = await this.toastCtrl.create({
      message: 'transaction timed out please try again',
      duration: 2000,
      position: 'middle',
      color: 'danger'
    });

    prompt.present();
    await this.service.addSubMpesa(trans).subscribe(resp =>{
      
      console.log(resp);
      if (resp.code === 0){
        this.storage.remove('user');
        this.storage.set('user', resp.user);
        toastSuccess.present();
        this.loading = false;
        window.location.reload();
        // this.router.navigate(['tabs', 'popular']);
      } else if (resp.code === 1) {
        this.loading = false;
        toastError.present();
      } else if (resp.code === 32) {
        this.loading = false;
        toastCancel.present();
      } else if (resp.code === 37) {
        this.loading = false;
        toastTimeout.present();
      } else if (resp.code === 25) {
        this.loading = false;
        toastError.present();
      }
    })
  }
}


