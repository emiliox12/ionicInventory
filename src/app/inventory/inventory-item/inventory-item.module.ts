import { ApiRequestService } from './../../services/api-request.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryItemPageRoutingModule } from './inventory-item-routing.module';

import { InventoryItemPage } from './inventory-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryItemPageRoutingModule
  ],
  declarations: [InventoryItemPage]
})
export class InventoryItemPageModule {}
