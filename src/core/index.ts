import controllers from '@core/dependencyInjection/controllers'
import infrastructures from '@core/dependencyInjection/infrastructures'
import { IControllers } from '@core/dependencyInjection/interface/iController'
import presenters from '@core/dependencyInjection/presenters'
import repositories from '@core/dependencyInjection/repositories'
import useCases from '@core/dependencyInjection/useCases'

const cInfrastructures = infrastructures()
const cRepositories = repositories(cInfrastructures)
const cPresenters = presenters()
const cUseCases = useCases(cRepositories, cPresenters)
const cController = controllers(cUseCases)

const core: IControllers = {}

export default core
