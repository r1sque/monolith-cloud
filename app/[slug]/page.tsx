export default function File({
  params
}: {
  params: { slug: string }
}) {
  return (
    <h1>Uploaded {params.slug}</h1>
  );
}
