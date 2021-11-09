import { either } from 'fp-ts'
import { Either } from 'fp-ts/lib/Either'
import { flow } from 'fp-ts/lib/function'

import { IErrorPresenter } from '@/core/common/adapter/interface/iErrorPresenter'
import {
  IErrorInputPort,
  IErrorOutputPort
} from '@/core/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/core/common/constants/statusCode'

class ErrorPresenter implements IErrorPresenter {
  protected convertErrorToViewMessage(statusCode: StatusCode): string {
    switch (statusCode) {
      case StatusCode.success:
        return '成功'
      case StatusCode.parameter:
        return '傳入參數異常'
      case StatusCode.system:
        return '系統繁忙中 請稍後再試'
      default:
        return '系統繁忙中 請稍後再試'
    }
  }

  present<T>(data: Either<IErrorInputPort, T>): Either<IErrorOutputPort, T> {
    return flow((data: Either<IErrorInputPort, T>) =>
      either.mapLeft((error: IErrorInputPort) => ({
        ...error,
        errorMessage: this.convertErrorToViewMessage(error.statusCode)
      }))<T>(data)
    )(data)
  }
}

export default ErrorPresenter
