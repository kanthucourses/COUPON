import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  
  public products : any = [];
  public grandTotal !: number;
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.productService.getTotalPrice();
    })
  }
  removeProduct(item: any){
    this.productService.removeCartItem(item);
  }
  emptycart(){
    this.productService.removeAllCart();
  }

}
