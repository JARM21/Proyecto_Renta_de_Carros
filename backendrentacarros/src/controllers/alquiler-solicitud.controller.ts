import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Alquiler,
  Solicitud,
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerSolicitudController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @get('/alquilers/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Solicitud> {
    return this.alquilerRepository.solicitud(id);
  }
}
