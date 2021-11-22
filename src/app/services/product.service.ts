import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    return this.baseService.Execute(RequestType.GET, this.getAllProductMasterDataUrl , null)
  }
  getLocByLocationId(productId: any): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.getProductMasterDataByProductIdUrl + productId , null)
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
}