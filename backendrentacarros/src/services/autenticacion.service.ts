import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { AnyType, repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Administrador, Asesor, Cliente } from '../models';
import { AdministradorRepository, AsesorRepository, ClienteRepository } from '../repositories';

const jwt = require("jsonwebtoken")

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ) {}

  /*
   * Add service methods here
   */
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
  }
}
