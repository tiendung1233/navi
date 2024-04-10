import type { IFeedOptionSetiing, IUrlApp, IFeedSetting } from '~/types/urlConfig'
import { createStore } from '../../app/libs/external-store'

export const urlApp = createStore<IUrlApp>({
  url: ''
})

export const feedOptionSetting = createStore<IFeedOptionSetiing>({
  option: 'general'
})

export const feedSetting = createStore<IFeedSetting>({
  layout: 'grid',
  spacing: 10,
  item_in_column: 5,
  status: ['active'],
  title: '',
})

export const activeSlideState = createStore({
  key: 'activeSlideState',
  activeSlide: 1
})