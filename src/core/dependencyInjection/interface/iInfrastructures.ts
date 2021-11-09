import { IHttpInfrastructure } from '@core/common/adapter/interface/iHttpInfrastructure'
import { IStorageInfrastructure } from '@core/common/adapter/interface/iStorageInfrastructure'

export interface IInfrastructures {
  http: IHttpInfrastructure
  storage: IStorageInfrastructure
}
