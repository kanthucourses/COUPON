import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestType } from '../models/requestType';
import { BaseServiceService } from '../shared/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

 
  getAllCouponMasterDataUrl = 'http://localhost:9999/couponMaster/getAllCouponMasterData';
  getCouponMasterDataByCouponCodeUrl = "http://localhost:9999/couponMaster/getCouponMasterDataByCouponCode?couponCode="
  saveCouponMasterDataUrl = 'http://localhost:9999/couponMaster/saveCouponMasterData';
  updateCouponMasterDataUrl = 'http://localhost:9999/couponMaster/updateCouponMasterData';
  deleteCouponMasterDataUrl = 'http://localhost:9999/couponMaster/deleteCouponMasterDataById?id=';
  applyCouponCodeUrl = "http://localhost:9999/couponMaster/applyCouponCode?couponCode="

  constructor(private baseService: BaseServiceService) {

  }

  getAllCouponMasterData(): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.getAllCouponMasterDataUrl , null)
  }
  getCouponMasterDataByCouponCode(couponCode: any): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.getCouponMasterDataByCouponCodeUrl + couponCode , null)
  }
  saveCouponMasterData(data): Observable<any> {
    return this.baseService.Execute(RequestType.POST, this.saveCouponMasterDataUrl, data)
  }
  updateCouponMasterData(data): Observable<any> {
    return this.baseService.Execute(RequestType.PUT, this.updateCouponMasterDataUrl, data)
  }
  deleteCouponMasterDataById(id): Observable<any> {
    return this.baseService.Execute(RequestType.DELETE, this.deleteCouponMasterDataUrl + id, null)
  }
  applyCouponCode(couponCode: any): Observable<any> {
    return this.baseService.Execute(RequestType.GET, this.applyCouponCodeUrl + couponCode , null)
  }

}
