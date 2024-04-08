export default function MediaItem(props: any) {
  console.log('pros---', props)
  return <>
    <img src={props.data.cover_image_url} alt={props.data.cover_image_url} />
  </>
}