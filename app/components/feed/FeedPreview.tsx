import React from 'react'; // Make sure to import React
import { useStore } from '~/libs/external-store';
import { feedSetting } from '~/util/store';
import MediaItem from './MediaItem';
import Carousel, { useCarousel } from './Carousel';

interface IFeedPreview {
  numberVideoTiktok: number
  videoTiktok: []
}
const CAROUSEL_ID = 'ProductSlider'

export default function FeedPreview(props: IFeedPreview) {
  const { videoTiktok, numberVideoTiktok } = props;
  const { spacing, item_in_column, title, layout } = useStore(feedSetting, state => state)
  const { sliderRef, next, prev } = useCarousel(CAROUSEL_ID)
  const gridTemplateColumns = item_in_column > numberVideoTiktok ? numberVideoTiktok : item_in_column
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)`,
    gap: `${spacing}px`,
  };



  return (
    <>
      <div>{title} </div>
      {layout === 'grid' &&
        (<div style={gridStyle} className="video-tiktok-grid">
          {videoTiktok?.map((item: any, index: number) => (
            <MediaItem url={item.cover_image_url} key={index} videoUrl={item.embed_link} />
          ))}
        </div>)
      }
      {layout === 'slideshow' &&
        (<div >
          <Carousel
            className="slide slide-multiple"
            id={CAROUSEL_ID}
            ref={sliderRef}
            style={{ ['--item' as any]: '3.4', ['--gap' as any]: '1rem', width: '100%' }}
          >
            {videoTiktok?.map((item: any, index: number) => {
              return (
                <div className="slide__item" key={index}>
                  <MediaItem url={item.cover_image_url} key={index} videoUrl={item.embed_link} />
                </div>
              )
            })}
          </Carousel>
          <div className="nav">
            <button
              className="nav-button nav-button-prev"
              onClick={() => prev()}
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.0004 24C17.6164 24 17.2324 23.853 16.9399 23.5605L9.43988 16.0605C8.85337 15.474 8.85337 14.526 9.43988 13.9395L16.9399 6.43951C17.5264 5.85301 18.4744 5.85301 19.0609 6.43951C19.6474 7.02601 19.6474 7.97401 19.0609 8.56051L12.6214 15L19.0609 21.4395C19.6474 22.026 19.6474 22.974 19.0609 23.5605C18.7684 23.853 18.3844 24 18.0004 24Z"
                />
              </svg>
            </button>
            <button
              className="nav-button nav-button-next"
              onClick={() => next()}
            >
              <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.0004 24C11.6164 24 11.2324 23.853 10.9399 23.5605C10.3534 22.974 10.3534 22.026 10.9399 21.4395L17.3794 15L10.9399 8.56051C10.3534 7.97401 10.3534 7.02601 10.9399 6.43951C11.5264 5.85301 12.4744 5.85301 13.0609 6.43951L20.5609 13.9395C21.1474 14.526 21.1474 15.474 20.5609 16.0605L13.0609 23.5605C12.7684 23.853 12.3844 24 12.0004 24Z"
                />
              </svg>
            </button>
          </div>
        </div>)
      }

    </>

  );
}
