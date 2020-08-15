import { NgModule } from '@angular/core';
import { RegularNoteComponent } from './regular-note.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [ RegularNoteComponent ],
    exports: [ RegularNoteComponent ]
})
export class RegularNoteModule {}