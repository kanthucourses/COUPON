import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CouponMasterComponent } from './masters/coupon-master/coupon-master.component';
import { ProductMasterComponent } from './masters/product-master/product-master.component';
import { ToastrModule } from 'ngx-toastr';
import { ProductCatalogComponent } from './masters/product-catalog/product-catalog.component';
import { CartComponent } from './masters/cart/cart.component';
import { PaymentComponent } from './masters/payment/payment.component';
//import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    CouponMasterComponent,
    ProductMasterComponent,
    ProductCatalogComponent,
    CartComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   // DataTablesModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-center',
      preventDuplicates: true

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
