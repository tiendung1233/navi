import type { IUrlApp } from '~/types/urlConfig'
import { createStore } from '../../app/libs/external-store'

export const urlApp = createStore<IUrlApp>({
  url: ''
})


