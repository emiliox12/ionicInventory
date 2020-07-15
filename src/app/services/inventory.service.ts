import { Product } from './../inventory/inventory-item/product';
import { ApiRequestService } from './api-request.service';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private inventory: Product[] = [];
  serviceUrl = 'http://test2-env.eba-tvw4kr2m.us-east-1.elasticbeanstalk.com/api/v1/products/';
  onInventoryChange = new Subject<Product[]>();

  constructor(private apiRequestService: ApiRequestService) {}

  async getInventory(){
    this.inventory = [];
    const responce = await this.apiRequestService.callApiGet(this.serviceUrl);
    this.inventory = responce.data.map(item => {
      return new Product(item.sid, item.name, item.size, item.unitaryPrice, item.description);
    });
    console.log(this.inventory);
    this.onInventoryChange.next(this.inventory.slice());
  }


  async getItem(id: string){
    const res = await this.apiRequestService.callApiGet(this.serviceUrl + id);
    const item = res.data;
    return new Product(item.sid, item.name, item.size, item.unitaryPrice, item.description);
  }

  async sendNewProduct(product){
    const res = await this.apiRequestService.callApiPost(this.serviceUrl, product);
    const newProd = res.data;
    console.log(newProd);
    this.inventory.push(new Product(newProd.sid, newProd.name, newProd.size, newProd.unitaryPrice, newProd.description));
    this.onInventoryChange.next(this.inventory);
  }

  deleteProduct(id){
    this.inventory = this.inventory.filter(product => {
      return product.id !== id;
    });
    this.apiRequestService.callApiDelete(this.serviceUrl + id);
    this.onInventoryChange.next(this.inventory.slice());
  }

  async updateProduct(id, product){
    const res = await this.apiRequestService.callApiPut(this.serviceUrl + id, product);
    const p = res.data;
    const newProd = new Product(p.sid, p.name, p.size, p.unitaryPrice, p.description);
    this.inventory = this.inventory.map(prod => {
      if (prod.id === id) {
        return newProd;
      }else {
        return prod;
      }
    });
    this.onInventoryChange.next(this.inventory);
    console.log(this.inventory);
  }
}
