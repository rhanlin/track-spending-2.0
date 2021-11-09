import { Either } from 'fp-ts/lib/Either'

import {
  IErrorInputPort,
  IErrorOutputPort
} from '@/core/common/application/interface/iErrorUseCase'

export interface IErrorPresenter {
  present<T>(data: Either<IErrorInputPort, T>): Either<IErrorOutputPort, T>
}
