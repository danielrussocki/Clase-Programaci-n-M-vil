import { Component } from '@angular/core';
import { ActionSheetController, ModalController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { RegularNoteComponent } from '../modales/regular-note/regular-note.component';
import { NotasService } from '../services/notas.service';
import { Notas } from '../models/Notas';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  logo: string = "./assets/img/paper.png";
  items: Notas[] = [];

  constructor(
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    public routerOutlet: IonRouterOutlet,
    public notasService: NotasService,
    public alertController: AlertController
  ) {}

  ionViewWillEnter(){
    this.notasService.getAllNotes().subscribe(
      user => {
        this.items.push(user)
      }
    )
  }

  editarNota(id){
    this.notasService.getDataSimpleNote(id).subscribe(
      async (nota) => {
        const modal = await this.modalController.create({
          component: RegularNoteComponent,
          swipeToClose: true,
          presentingElement: this.routerOutlet.nativeEl,
          componentProps: {
            id_nota: nota.id_nota,
            titulo_nota: nota.titulo_nota,
            descripcion_nota: nota.descripcion_nota,
            tipo_nota: nota.tipo_nota
          }
        });
        modal.onDidDismiss().then(() => {
          this.reloadData();
        });
        return await modal.present();
      }
    )
  }

  async addNote(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Añadir',
      buttons: [{
        text: 'Nueva nota',
        icon: 'create-outline',
        handler: () => {
          this.regularNote();
        }
      },{
        text: 'Lista de tareas',
        icon: 'checkbox-outline',
        handler: () => {
          console.log('Añadiendo lista de tareas');
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancelar');
        }
      }]
    });
    await actionSheet.present();
  }

  async regularNote(){
    const modal = await this.modalController.create({
      component: RegularNoteComponent,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl
    });
    modal.onDidDismiss().then(() => {
      this.reloadData();
    });
    return await modal.present();
  }

  async deleteNote(id: number){
    const alert = await this.alertController.create({
      header: 'Estás seguro?',
      subHeader: 'No podrás recuperar los datos.',
      message: '¿Deseas eliminar la nota?',
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Eliminar',
        handler: () => {
          this.notasService.deleteSimpleNote(id).subscribe(
            res => {
            console.log(res)
            this.reloadData();
          }, err => {
            console.log(err)
          })
        }
      }]
    });
    await alert.present();
  }

  reloadData(){
    this.items = [];
    this.notasService.getAllNotes().subscribe(
      user => {
        this.items.push(user)
      }
    )
  }

}
