import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, Vehiculo, Alquiler} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VehiculoRepository} from './vehiculo.repository';
import {AlquilerRepository} from './alquiler.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.id>;

  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly alquiler: HasOneRepositoryFactory<Alquiler, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>,
  ) {
    super(Solicitud, dataSource);
    this.alquiler = this.createHasOneRepositoryFactoryFor('alquiler', alquilerRepositoryGetter);
    this.registerInclusionResolver('alquiler', this.alquiler.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
