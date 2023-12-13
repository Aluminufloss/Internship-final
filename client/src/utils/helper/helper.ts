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

export function encodeImageToBase64String<T extends File>(image: T): Promise<string> {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Problem parsing input file."));
    };

    reader.onload = () => {

      resolve(reader.result as string);
    };

    reader.readAsDataURL(image);
  });
}