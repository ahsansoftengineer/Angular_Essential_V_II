export interface ServerMultipleResponse{
  code: number
  data: {
    records: []
    totalRecords: number
  }
  message: string
}
