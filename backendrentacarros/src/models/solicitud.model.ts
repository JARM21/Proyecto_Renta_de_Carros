import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Vehiculo} from './vehiculo.model';
import {Alquiler} from './alquiler.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_vehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @hasOne(() => Alquiler)
  alquiler: Alquiler;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
