import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesor, AsesorRelations, Vehiculo, Administrador} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {AdministradorRepository} from './administrador.repository';

export class AsesorRepository extends DefaultCrudRepository<
  Asesor,
  typeof Asesor.prototype.id,
  AsesorRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculo, typeof Asesor.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Asesor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Asesor, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
