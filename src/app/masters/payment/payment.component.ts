import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CouponService } from 'src/app/services/coupon.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

   products : any = [];
   totalAmount !: number;
   grandTotal !: number;
   couponCodeInput: string;
   couponData : any;
   couponvalue !: number;

  constructor(private productService : ProductService,
    private couponService : CouponService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.totalAmount = this.productService.getTotalPrice();
    })
  }

  applyCoupon(event){
    let couponCode = this.couponCodeInput;
    this.couponService.applyCouponCode(couponCode).subscribe(data => {
      if (data['status'] == 0) {
        this.toastr.success(data['statusMsg']); 
        this.couponvalue = data['data']['couponMaster']['couponValue'];
        this.grandTotal = this.totalAmount -  this.couponvalue;
      }
      else{
        this.toastr.success(data['statusMsg']);
        this.couponvalue = null;
        this.grandTotal = this.totalAmount -  this.couponvalue;
        this.grandTotal;
      }
  })
}

}
