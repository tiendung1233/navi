export interface IInstagramPost {
  _id: string
  id: string
  cursor?: string
  caption?: string
  children?: any
  like_count?: number
  comments_count?: number
  hashtag?: string
  pin?: boolean
  hidden?: boolean
  media_type: string
  media_url?: string
  thumbnail_url?: string
  naturalHeight?: number
  naturalWidth?: number
  permalink: string
  hashtag?: string
  shopifyMediaId?: string
  shopifyThumbnailId?: string
  timestamp: string
  username?: string
  taggedProducts?: ITagProduct[]
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
}
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ui-modal': {
        id: string
        variant: string
        children: React.ReactNode
      }
    }
  }
}