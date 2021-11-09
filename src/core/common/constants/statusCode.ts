/**
 * 存放 api 回傳的狀態碼，分成兩種
 * 1. 四碼數字為 server 回傳的錯誤代碼
 * 2. client-四碼數字開頭為 client 檢核錯誤
 */

export enum StatusCode {
  network = 'client-0001',
  // global
  // 成功
  success = '0000',
  // 參數錯誤
  parameter = '1000',
  //檔案格式不符
  fileType = '4001',
  // 檔案內容格式不符
  fileContent = '4004',
  // 無權限
  unauthorized = '9000',
  // Token 已被註銷
  tokenCancel = '9001',
  // Token 過期
  tokenExpire = '9002',
  // 系統存取失敗
  system = '9999'
}
