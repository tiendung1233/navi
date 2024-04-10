import { Button } from '@shopify/polaris'
import { styled } from 'styled-components'
import ModalTagProduct from './ModalTagProduct'
interface MediaItemProps {
  url: string
  key: number
  videoUrl: string
}

export default function MediaItem(props: MediaItemProps) {
  const { url, key, videoUrl } = props
  return (
    <>
      <MediaWrapper key={key} >
        <img src={url} alt={url} style={imgStyle} />
        <div className="media-action-wrapper">

          <Button id={'tag_product_btn'} size="slim" onClick={() => {

            (document.getElementById('ui-modal') as any).show()
          }}>
            Tag product
          </Button>
        </div>
      </MediaWrapper>
      <ModalTagProduct videoUrl={videoUrl} />
    </>
  )
}

const MediaWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 4px;
  overflow: hidden;

  .media-action-wrapper {
    visibility: hidden;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 8px;
    overflow: hidden;
    z-index: 400;

    .Polaris-Button--plain.Polaris-Button--iconOnly svg {
      fill: white !important;
    }

    .Polaris-Choice {
      padding: 0;
    }

    .Polaris-Inline {
      margin-bottom: -4px;
    }

    .Polaris-Button--sizeSlim {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: max-content;
    }

    .pin-unfilled {
      display: none;
    }
  }

  &:hover {
    img {
      filter: brightness(45%);
    }

    .media-action-wrapper {
      visibility: visible;
    }

    .Polaris-Checkbox {
      visibility: visible;
    }

    .pin-unfilled {
      display: block;
    }
  }

  img {
    display: block;
    max-width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    transition: filter 0.3s ease-out;
  }

  .bottom-row-item {
    visibility: visible;
  }

  .circle-border .Polaris-Icon::before,
  svg.circle-border::before {
    content: "''";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.4);
    scale: 1.2;
  }

  .bottom-row-item:has(.custom-circle-border) {
    transform: translateY(-4px);
  }

  .bottom-row-item.circle-border .Polaris-Button__Content {
    height: 20px;
  }

  .custom-circle-border {
    background-color: rgba(0, 0, 0, 0.4);
    width: 24px;
    height: 24px;
    border-radius: 50%;

    > svg {
      transform: translateY(25%) scale(1.15);
    }

    > svg.polaris-play-icon {
      transform: translate(8%, 36%);
    }
  }

`;
const imgStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Correctly typed as a CSS property value
};