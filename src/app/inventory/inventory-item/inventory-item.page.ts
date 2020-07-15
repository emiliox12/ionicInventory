import { Product } from './product';
import { ApiRequestService } from './../../services/api-request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from './../../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-inventory-item',
  templateUrl: './inventory-item.page.html',
  styleUrls: ['./inventory-item.page.scss'],
})
export class InventoryItemPage implements OnInit {
  product: Product = {} as Product;
  editables = {
    name: false,
    desc: false,
    quantity: false,
    UP: false,
    getElement: (s) => {
      if (s === 'name'){
        this.editables.name = true;
      } else if (s === 'desc'){
        this.editables.desc = true;
      }  else if (s === 'quantity'){
        this.editables.quantity = true;
      }  else if (s === 'UP'){
        this.editables.UP = true;
      }
      return;
    }
  };


  constructor(
    private inventoryService: InventoryService,
    private route: ActivatedRoute,
    private apiRequest: ApiRequestService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        return;
      }
      const id = paramMap.get('id');
      this.getProduct(id);
    });
  }
  async getProduct(id){
    this.product = await this.inventoryService.getItem(id);
    if (!this.product?.name){
      this.router.navigate(['/inventory']);
    }
  }

  onEdit(edit: string) {
    this.editables.getElement(edit);
  }

  blur(){
    this.editables.name = false;
    this.editables.desc = false;
    this.editables.quantity = false;
    this.editables.UP = false;
  }

  async onUpdateProduct(){
    this.inventoryService.updateProduct(this.product.id, {
        name: this.product.name,
        size: this.product.size,
        unitaryPrice: this.product.unitaryPrice,
        description: this.product.description
      });
    const toast = await this.toastController.create({
        header: this.product.name,
        color: 'medium',
        position: 'middle',
        keyboardClose: true,
        message: 'The product has been updated',
        duration: 2000
      });
    toast.present();
    this.router.navigate(['/inventory']);
  }

  onDeleteProduct(){
    this.inventoryService.deleteProduct(this.product.id);
    this.router.navigate(['/inventory']);
  }

}
