export interface IUrlApp {
  url: string
}
export interface IFeedOptionSetiing {
  option: string
}
export interface IAccountTiktok {
  accessToken: string
  expiresIn: number
  openId: string
  refreshExpiresIn: number
  refreshToken: string
  tokenType: string
}

export interface IFeedSetting {
  layout: string,
  spacing: number,
  item_in_column: number,
  status: string[],
  title: string,
}