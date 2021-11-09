import { AxiosRequestConfig } from 'axios'
import { Either } from 'fp-ts/lib/Either'

// constants
import { IErrorInputPort } from '@/core/common/application/interface/iErrorUseCase'
import { StatusCode } from '@/core/common/constants/statusCode'

// types

export interface RequestConfig extends AxiosRequestConfig {
  withAuth?: boolean
  onUploadProgress?: (progressEvent: ProgressEvent) => void
}

export interface ResponseResult<T> {
  serverTime: string
  statusCode: StatusCode
  statusMessage: string
  statusCodeTitle: string
  result: T
}

export interface IHttpInfrastructure {
  token: string
  request<T>(requestConfig: RequestConfig): Promise<Either<IErrorInputPort, ResponseResult<T>>>
}
