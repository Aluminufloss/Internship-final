import AuthService from "@/services/AuthService";

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

export function encodeImageToBase64String<T extends File>(
  image: T
): Promise<string> {
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

export function convertRating(rating: number): string {
  const ratingRound = Math.round(rating * 10) / 10;
  const resultRating =
    String(ratingRound).length === 3
      ? String(ratingRound + "0")
      : String(ratingRound).length === 1
        ? String(ratingRound + ".00")
        : String(ratingRound);
  return resultRating;
}

export function countRating(rating: string): string[] {
  const ratingFlags = new Array(5);

  for (let i = 1; i <= 5; i++) {
    if (i <= Number(rating)) {
      ratingFlags[i - 1] = 'full';
    } else {
      if (i - 0.5 <= Number(rating)) {
        ratingFlags[i - 1] = 'half';
      } else {
        ratingFlags[i - 1] = 'empty';
      }
    }
  }

  return ratingFlags;
}
