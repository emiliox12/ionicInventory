import { LoadingController } from '@ionic/angular';
import { InventoryService } from './../services/inventory.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './inventory-item/product';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  inventory: Product[];
  canLoad = true;

  constructor(private inventoryService: InventoryService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize(){
    await this.presentLoading();
    this.inventoryService.onInventoryChange.subscribe(inv => {
      this.inventory = inv;
      if (this.canLoad){
        this.loadingCtrl.dismiss();
      }
    });
    this.inventoryService.getInventory();
  }



  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });
    await loading.present();
    loading.onDidDismiss().then( () => {
      this.canLoad = false;
    });


  }

}
