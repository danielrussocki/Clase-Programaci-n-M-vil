import { IonicModule, ModalController } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { RegularNoteModule } from '../modales/regular-note/regular-note.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RegularNoteModule
  ],
  declarations: [Tab1Page],
  exports: [Tab1Page, ModalController, FormsModule, ReactiveFormsModule, IonicModule]
})
export class Tab1PageModule {}
