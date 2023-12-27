import { AuthRespone } from "@/models/response/Auth/AuthResponse";
import AuthService from "@/services/AuthService";
import { AxiosResponse } from "axios";
import { GetServerSidePropsContext, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";
import cookie from "cookie";
import { CommentResponse } from "@/models/response/Comment/CommentResponse";
import { BookResponse } from "@/models/response/Book/BookResponse";

type CheckTokensResult = {
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
  aToken: string;
  rToken: string;
};

type QueryProps = {
  page?: string;
}

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
      ratingFlags[i - 1] = "full";
    } else {
      if (i - 0.5 <= Number(rating)) {
        ratingFlags[i - 1] = "half";
      } else {
        ratingFlags[i - 1] = "empty";
      }
    }
  }

  return ratingFlags;
}

export function correctPrice(price: number): string {
  const priceCorrect = Number.isInteger(price)
    ? `$ ${price}.00 USD`
    : price.toString().length === 3
    ? `$ ${price}0 USD`
    : `$ ${price} USD`;

  return priceCorrect;
}

export function checkTokens(
  response: AxiosResponse<AuthRespone | CommentResponse | BookResponse, any>,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
): CheckTokensResult {
  if (response.config && response.config.headers) {
    const rToken = response.config.headers.token as string;
    const authorizationHeader = response.config.headers.Authorization as string;
    const aToken = authorizationHeader.split(" ")[1];

    if (typeof rToken !== "undefined") {
      context.res.setHeader("Set-Cookie", [
        `refreshToken=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`,
        cookie.serialize("accessToken", aToken, {
          httpOnly: true,
          maxAge: 1 * 1 * 15 * 60 * 1000,
        }),
        cookie.serialize("refreshToken", rToken, {
          httpOnly: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        }),
      ]);
    } else {
      return { context, aToken, rToken: "" };
    }

    return { context, aToken, rToken };
  } else {
    console.log("You don't have headers in your response");
    return { context, aToken: "", rToken: "" };
  }
}

export function checkPage(queryPage: QueryProps) {
  
}