import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Alquiler, AlquilerRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class AlquilerRepository extends DefaultCrudRepository<
  Alquiler,
  typeof Alquiler.prototype.id,
  AlquilerRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof Alquiler.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Alquiler, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
