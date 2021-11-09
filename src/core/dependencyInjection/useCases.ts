import { IPresenters } from '@/core/dependencyInjection/interface/iPresenters'
import { IRepositories } from '@/core/dependencyInjection/interface/iRepositories'
import { IUseCases } from '@/core/dependencyInjection/interface/iUseCases'

function createUseCases(repositories: IRepositories, presenters: IPresenters): IUseCases {
  return {}
}

export default createUseCases
