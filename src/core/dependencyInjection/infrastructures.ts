import HttpInfrastructure from '@/core/common/adapter/HttpInfrastructure'
import StorageInfrastructure from '@/core/common/adapter/StorageInfrastructure'
import { IInfrastructures } from '@/core/dependencyInjection/interface/iInfrastructures'

function createInfrastructures(): IInfrastructures {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    storage: new StorageInfrastructure((globalThis as any)?.localStorage),
    http: HttpInfrastructure.getInstance()
  }
}

export default createInfrastructures
