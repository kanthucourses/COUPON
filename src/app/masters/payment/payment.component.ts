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
   couponStatus : string;
   isCouponValid : boolean;

  constructor(private productService : ProductService,
    private couponService : CouponService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.totalAmount = this.productService.getTotalPrice();
    })
    this.grandTotal = this.totalAmount;
  }

  applyCoupon(event){
    this.couponvalue = 0;
    this.isCouponValid = false;
    let couponCode = this.couponCodeInput;
    this.couponService.applyCouponCode(couponCode).subscribe(data => {
      if (data['status'] == 0) {
        this.toastr.success(data['statusMsg']); 
        this.couponvalue = data['data']['couponMaster']['couponValue'];
        if(this.grandTotal > this.couponvalue){
          this.grandTotal = this.totalAmount -  this.couponvalue;
          this.couponStatus = data['statusMsg'];
          this.isCouponValid =true;
        } 
        else if (this.grandTotal < this.couponvalue){
          this.couponStatus = "order summary should be more than coupon value";
          this.couponvalue = 0;
        }
      }
      else{
        this.toastr.success(data['statusMsg']);
        this.couponStatus = data['statusMsg'];
        this.couponvalue = 0;
        this.grandTotal = this.totalAmount -  this.couponvalue;
        this.grandTotal;
      }
  })
}

}
