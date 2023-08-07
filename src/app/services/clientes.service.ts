import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ClienteResponse } from '../interfaces/cliente';
import { MascotaResponse } from '../interfaces/mascota';
import { VacunaResponse } from '../interfaces/vacuna';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }

  getclientes(){
      return this.http.get<ClienteResponse[]>('https://www.hostcatedral.com/api/appCatalogoLibro/public/getClientes')
  }

  getmascotas(id: string){
    return this.http.get<MascotaResponse[]>('https://www.hostcatedral.com/api/appCatalogoLibro/public/getMascotasPorCliente/'+id)
  }

  getvacuna(id:string){
    return this.http.get<VacunaResponse[]>('https://www.hostcatedral.com/api/appCatalogoLibro/public/getVacunasPorMascota/'+id)
  }
}
