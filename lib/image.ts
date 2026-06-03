export function normalizeDbImageSrc(image?: string) {
  if (!image) return undefined;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  if (image.startsWith('/')) {
    return `/api/images?src=${encodeURIComponent(image)}`;
  }

  return image;
}
