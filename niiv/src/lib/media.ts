export function youTubeThumb(url?: string) {
  if (!url) return undefined;
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/i);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : undefined;
}
