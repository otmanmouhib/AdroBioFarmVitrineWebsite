export function normalizeDbImageSrc(image?: string) {
  if (!image) return undefined;
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  // Raw ObjectId strings from Mongo image references are served through /api/images?id=...
  if (/^[a-fA-F0-9]{24}$/.test(image)) {
    return `/api/images?id=${encodeURIComponent(image)}`;
  }

  if (image.startsWith('/')) {
    return `/api/images?src=${encodeURIComponent(image)}`;
  }

  return image;
}
