export function getMediaQuery(minWidth: number): string {
  return `@media (min-width: ${minWidth}px)`;
}

export const mediaValues = {
  desktop: 720,
  extraDesktop: 940,
  ld: 1090, // large desktop
  extraLd: 1435,
};

const media = {
  custom: getMediaQuery,
  desktop: getMediaQuery(mediaValues.desktop),
  extraDesktop: getMediaQuery(mediaValues.extraDesktop),
  ld: getMediaQuery(mediaValues.ld),
  extraLd: getMediaQuery(mediaValues.extraLd),
};

export default media;

export function getIsMobile(): boolean {
  return !window.matchMedia("(min-width: 720px)").matches;
}

export function encodeImageFileAsURL(image: File) {
  const reader = new FileReader();

  reader.onloadend = function () {
    console.log("RESULT", reader.result);
    return reader.result;
  };

  reader.readAsDataURL(image);
}

export function getUserAvatar(id: string) {
  
}
