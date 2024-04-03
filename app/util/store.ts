import type { IAccountTiktok, IUrlApp } from '~/types/urlConfig'
import { createStore } from '../../app/libs/external-store'

export const urlApp = createStore<IUrlApp>({
  url: ''
})

export const accountTiktok = createStore<IAccountTiktok>({
  accessToken: '',
  expiresIn: 0,
  openId: '',
  refreshExpiresIn: 0,
  refreshToken: '',
  tokenType: ''
})

