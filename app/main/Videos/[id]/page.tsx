import VideoFetching from "../../../../components/Videos/VideoFetching"

interface Params {
  params: Promise<{ id: string }>
}

export default async function VideoDetailsPage({ params }: Params) {
  const { id } = await params
  return <VideoFetching id={id} />
}