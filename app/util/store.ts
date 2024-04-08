import type { IFeedOptionSetiing, IUrlApp } from '~/types/urlConfig'
import { createStore } from '../../app/libs/external-store'

export const urlApp = createStore<IUrlApp>({
  url: ''
})

export const feedOptionSetting = createStore<IFeedOptionSetiing>({
  option: 'general'
})

export const feedLayoutSetting = createStore({
  layout: 'grid',
  spacing: 10,
  item_in_column: 5,
})