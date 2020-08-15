import { Component, OnInit, NgModule, Input } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Notas } from '../../models/Notas';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-regular-note',
  templateUrl: './regular-note.component.html',
  styleUrls: ['./regular-note.component.scss'],
})
export class RegularNoteComponent implements OnInit {

  @Input() id_nota: number;
  @Input() titulo_nota: string;
  @Input() descripcion_nota: string;
  @Input() tipo_nota: number;

  messageForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  nota: Notas;
  data: any = {
    titulo: '',
    descripcion: ''
  };
  insertar: boolean = true;

  constructor(
    private notasService: NotasService,
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.messageForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    // console.log(this.id_nota, this.titulo_nota, this.descripcion_nota, this.tipo_nota)
    if(this.id_nota && this.titulo_nota && this.descripcion_nota && this.tipo_nota){
      this.insertar = false;
      this.messageForm.controls.titulo.setValue(this.titulo_nota);
      this.messageForm.controls.descripcion.setValue(this.descripcion_nota);
    }
  }

  addNote(){
    this.submitted = true;
    this.nota = {
      id_nota: 0,
      titulo_nota: this.messageForm.controls.titulo.value,
      descripcion_nota: this.messageForm.controls.descripcion.value,
      tipo_nota: 1
    }
    if(this.messageForm.invalid) {
      return;
    }
    this.success = true;
    delete this.nota.id_nota;
    this.notasService.createSimpleNote(
      this.nota
    ).subscribe(
      res => {
        this.submitted = false;
        this.success = false;
        this.messageForm.reset();
        this.closeModal();
        console.log(res)
      },
      err => {
        console.error(err)
      }
    )
  }

  editNote(){
    this.submitted = true;
    this.nota = {
      id_nota: this.id_nota,
      titulo_nota: this.messageForm.controls.titulo.value,
      descripcion_nota: this.messageForm.controls.descripcion.value,
      tipo_nota: 1
    }
    if(this.messageForm.invalid) {
      return;
    }
    this.success = true;
    this.notasService.editSimpleNote(
      this.nota
    ).subscribe(
      res => {
        this.submitted = false;
        this.success = false;
        this.messageForm.reset();
        this.closeModal();
        console.log(res)
      },
      err => {
        console.error(err)
      }
    )
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
