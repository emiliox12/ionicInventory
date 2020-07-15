import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InventoryService } from 'src/app/services/inventory.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  name: string;
  description: string;
  quantity: number;
  unitaryPrice: number;
  sendable;

  constructor(private inventoryService: InventoryService,
              private router: Router,
              private toastController: ToastController) { }

  ngOnInit() {

  }

  async onSendProduct(){
    this.inventoryService.sendNewProduct({
      name: this.name,
      size: this.quantity,
      unitaryPrice: this.unitaryPrice,
      description: this.description
    });
    const toast = await this.toastController.create({
      header: 'Toast header',
      color: 'success',
      position: 'middle',
      keyboardClose: true,
      message: 'A new product has been created',
      duration: 2000
    });
    toast.present();
    this.router.navigate(['/inventory']);
  }

}
