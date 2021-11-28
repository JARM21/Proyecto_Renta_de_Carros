import {injectable, /* inject, */ BindingScope} from '@loopback/core';
<<<<<<< HEAD
import { AnyType, repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Administrador, Asesor, Cliente } from '../models';
import { AdministradorRepository, AsesorRepository, ClienteRepository } from '../repositories';

const jwt = require("jsonwebtoken")
=======
import { repository } from '@loopback/repository';
import { Asesor } from '../models';
import { AsesorRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
>>>>>>> 9dfb473cdd777b563392f9972116bfd4e7229c3e

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
<<<<<<< HEAD
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
=======
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository
>>>>>>> 9dfb473cdd777b563392f9972116bfd4e7229c3e
  ) {}

  /*
   * Add service methods here
   */
<<<<<<< HEAD
  IdentificarUsuario(usuario: string, clave: string, tipo: string) {
    let user = null;
    try {
      switch(tipo) {
        case "admin":
          user = this.administradorRepository.findOne({where: {correo: usuario, clave : clave}});
          break;
        case "asesor":
          user = this.asesorRepository.findOne({where: {correo: usuario, clave : clave}});
          break;
        case "cliente":
          user = this.clienteRepository.findOne({where: {correo: usuario, clave : clave}});
          break;
      }
      if(user) {
        return user
      }
      return false
    } catch {
      return false;
    }
  }

  GenerarToken(user: Administrador | Cliente | Asesor) {
    let token = jwt.sign({
      id: user.id,
      correo: user.correo,
      nombres: user.nombres + " " + user.apellidos,
      tipo: typeof(user)
    }, Llaves.claveJWT);

    return token;
  }

  ValidarToken(token: string) {
    try {
      let data = jwt.verify(token, Llaves.claveJWT);
      return data;
    } catch {
      return false;
    }
=======

  GenerarClave(){
    let clave = generador(8, false); // 8 longitud de la clave y el false la intensidad de la clave
    return clave;
  }
  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
 
  }

  IdentificarAsesor(usuario: string, clave: string){
    try{
      let p = this.asesorRepository.findOne({where:{correo: usuario, clave: clave}});
      if(p){
        return p;

      }
      return false;

    }catch{
      return false;

    }
  }

  GenerarTokenJWT(asesor: Asesor){
    let token = jwt.sign({
      data:{
        id: asesor.id,
        correo: asesor.correo,
        
        nombre: asesor.nombres + " " + asesor.apellidos
      }
    },
    Llaves.claveJWT)
    return token;
  
  }

  ValidarTokenJWT(token: string){
    try{
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;

    }catch{
      return false;
    }

>>>>>>> 9dfb473cdd777b563392f9972116bfd4e7229c3e
  }
}
