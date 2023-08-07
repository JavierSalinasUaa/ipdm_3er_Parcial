import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { ClienteResponse } from '../interfaces/cliente';
import { MascotaResponse } from '../interfaces/mascota';
import { VacunaResponse } from '../interfaces/vacuna';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  clientes : ClienteResponse [] =[];
  mascotas : MascotaResponse [] =[];
  vacunas : VacunaResponse [] =[];
  idCliente : string = "";
  idMascota : string = "";
  mensaje : string = "";
  constructor(private serviceCliente: ClientesService,
    private alertController: AlertController) { 
    this.buscarCli();   
  }
  ngOnInit() {
    
  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Atencion',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

buscarCli(){
  this.serviceCliente.getclientes().subscribe(
    data=>{
      console.log(data)
      this.clientes = data
    }
  )
}
buscarMasc(){
    this.serviceCliente.getmascotas(this.idCliente).subscribe(
      data=>{
        console.log(data)
        this.mascotas = data;
      }
    )
}

buscarVac(){
  this.serviceCliente.getvacuna(this.idMascota).subscribe(
    data=>{
      console.log(data)
      this.vacunas = data;
      if(this.vacunas.length == 0){
        this.mensaje = "La mascota no tiene vacunas aplicadas"
        this.presentAlert(this.mensaje);
      }
    }
  )
}
handleChange(e : any) {
  console.log(e.detail.value);
  this.idCliente = e.detail.value;
}

handleChangeVac(e : any) {
  console.log(e.detail.value);
  this.idMascota = e.detail.value;
}

limpiarVac(){
  this.vacunas = [];
}

}
