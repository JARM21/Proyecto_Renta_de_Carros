import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Alquiler extends Entity {
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
  id_solicitud: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha_ocupacion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor_diario: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_alquiler: string;

  @belongsTo(() => Solicitud)
  solicitudId: string;

  constructor(data?: Partial<Alquiler>) {
    super(data);
  }
}

export interface AlquilerRelations {
  // describe navigational properties here
}

export type AlquilerWithRelations = Alquiler & AlquilerRelations;
