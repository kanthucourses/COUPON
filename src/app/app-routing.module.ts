import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './masters/cart/cart.component';
import { CouponMasterComponent } from './masters/coupon-master/coupon-master.component';
import { PaymentComponent } from './masters/payment/payment.component';
import { ProductCatalogComponent } from './masters/product-catalog/product-catalog.component';
import { ProductMasterComponent } from './masters/product-master/product-master.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: '/couponMaster',
    pathMatch: 'full'
  },
  {
    path: 'couponMaster',
    component: CouponMasterComponent
  },
  {
    path: 'productMaster',
    component: ProductMasterComponent
  },
  {
    path: 'productCatalog',
    component: ProductCatalogComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'payment',
    component: PaymentComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
