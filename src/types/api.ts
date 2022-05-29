export interface metaResponse {
  error?: {}
  message: Array<string> | string,
  status: number
}

export interface apiResponse<DataType> {
  data: DataType
  meta: metaResponse
}

export interface PaginationData {
  page: string
  limit: string
  search?: string
  extraOpts?: any
}
