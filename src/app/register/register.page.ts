import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerImg: string = "./assets/img/paper.png";
  registerForm: FormGroup;
  submitted: boolean = false;
  success: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCtrl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  registrar(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    let nuevoUsuario = {
      nombre: this.registerForm.controls.nombre.value,
      apellidos: this.registerForm.controls.nombre.value,
      correo: this.registerForm.controls.correo.value,
      password: this.registerForm.controls.password.value
    };
    this.success = true;
    this.authService.registerUser(nuevoUsuario).subscribe(
      res => {
        this.registerForm.reset();
        this.navCtrl.navigateRoot('/login');
      },
      err => console.log(err)
    )
  }

}
