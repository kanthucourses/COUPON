import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RequestType } from '../models/requestType';
import { BaseServiceService } from '../shared/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getAllProductMasterDataUrl = 'http://localhost:9999/productMaster/getAllProductMasterData';
  getProductMasterDataByProductIdUrl = "http://localhost:9999/productMaster/getProductMasterDataByProductId?productId="
  saveProductMasterDataUrl = 'http://localhost:9999/productMaster/saveProductMasterData';
  updateProductMasterDataUrl = 'http://localhost:9999/productMaster/updateProductMasterData';
  deleteProductMasterDataUrl = 'http://localhost:9999/productMaster/deleteProductMasterDataById?id=';

  constructor(private baseService: BaseServiceService) {

  }

  getAllProductMasterData(): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.getAllProductMasterDataUrl, null)
  }
  getLocByLocationId(productId: any): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.getProductMasterDataByProductIdUrl + productId, null)
  }
  saveProductMasterData(data): Observable<any> {
    return this.baseService.Execute(RequestType.POST, this.saveProductMasterDataUrl, data)
  }
  updateProductMasterData(data): Observable<any> {
    return this.baseService.Execute(RequestType.PUT, this.updateProductMasterDataUrl, data)
  }
  deleteProductMasterDataById(id): Observable<any> {
    return this.baseService.Execute(RequestType.DELETE, this.deleteProductMasterDataUrl + id, null)
  }


  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  productExist:boolean = false;

  addtoCart(product: any) {
    //product['quantity'] = 0;
    this.productExist = false;

    if (this.cartItemList.length === 0) {
      product['quantity'] = 1;
      this.cartItemList.push(product);
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }
    else {
      console.log(JSON.stringify(this.cartItemList));
      for (let i = 0; i < this.cartItemList.length; i++) {
        console.log(JSON.stringify(this.cartItemList[i]));
        console.log(JSON.stringify(product));
        if (this.cartItemList[i].productName === product.productName) {
          console.log("success");
          this.cartItemList[i].quantity++;
          this.productExist =true;
          this.productList.next(this.cartItemList);
          console.log(JSON.stringify(this.cartItemList));
        }
      }
      console.log(this.productExist);
if(!this.productExist){
  console.log("new prod");
  product['quantity'] = 1;
  this.cartItemList.push(product);
  this.productList.next(this.cartItemList);
}
 
      this.getTotalPrice();
    }
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += (a.quantity * a.productPrice);
    })
    return grandTotal;
  }

 
  getProducts() {
    return this.productList.asObservable();
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      console.log(a);
      if (product.productName === a.productName) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

}
