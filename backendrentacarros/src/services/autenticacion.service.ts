import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Asesor } from '../models';
import { AsesorRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository
  ) {}

  /*
   * Add service methods here
   */

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

  }
}
