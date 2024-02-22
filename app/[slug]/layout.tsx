import { Metadata } from 'next';
import { fetchBlob, calculateSizeAndUnit } from '@/lib/utils';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const blob = await fetchBlob(params.slug);

  const [size, unit] = calculateSizeAndUnit(blob.size);

  const metadata: Metadata = {
    title: `${blob.pathname} | Monolith Cloud`,
    openGraph: {
      siteName: 'Monolith Cloud',
      type: 'website',
      title: blob.pathname,
      description: `Uploaded at ${blob.uploadedAt.toDateString()} | ${size} ${unit}`,
      url: `https://monolith-cloud.vercel.app/${params.slug}`,
    }
  };
  const openGraph = metadata.openGraph!;

  if (blob.contentType.startsWith('image/')) {
    openGraph.images = [{
      url: blob.url,
      alt: blob.pathname,
    }];
  } else if (blob.contentType.startsWith('video/')) {
    // @ts-ignore
    openGraph.type = 'video.other'
    openGraph.videos = blob.url;
  } else if (blob.contentType.startsWith('audio/')) {
    // @ts-ignore
    openGraph.type = 'music.song'
    openGraph.audio = [blob.url];
  }

  return metadata;
}

export default function FilePageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
