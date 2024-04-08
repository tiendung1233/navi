import React from 'react'; // Make sure to import React
import { useStore } from '~/libs/external-store';
import { feedLayoutSetting } from '~/util/store';

export default function FeedPreview(props: { videoTiktok: any, numberVideoTiktok: number }) {
  const { videoTiktok, numberVideoTiktok } = props;
  const { spacing, item_in_column } = useStore(feedLayoutSetting, state => state)
  const gridTemplateColumns = item_in_column > numberVideoTiktok ? numberVideoTiktok : item_in_column
  console.log('gridTemplateColumns', numberVideoTiktok);
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)`,
    gap: `${spacing}px`,
  };

  const imgStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Correctly typed as a CSS property value
  };

  return (
    <div style={gridStyle} className="video-tiktok-grid">
      {videoTiktok?.map((item: any, index: number) => (
        <img
          key={index} // Adding a key for list items
          src={item.cover_image_url}
          alt="Video cover"
          style={imgStyle}
        />
      ))}
    </div>
  );
}
