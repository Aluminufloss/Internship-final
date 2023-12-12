import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import AuthService from "./services/AuthService";

// const protectedRoutes = ["/user"];

// export default async function middleware(req: NextRequest) {
//   const response = NextResponse.next();
//   const accessToken = req.cookies.get('accessToken')?.value;
//   const refreshToken = req.cookies.get('refreshToken')?.value;
//   let isAuthenticated = true;

//   // console.log("Access", accessToken);

//   try {
//     const responseUser = await AuthService.getMe(
//       refreshToken as string,
//       accessToken as string
//     );

//     const {
//       user,
//       refreshToken: rToken,
//       accessToken: aToken,
//     } = responseUser.data;

//     response.cookies.set('refreshToken', rToken);
//     response.cookies.set('accessToken', aToken);

//     response.headers.set("userEmail", user.email);
//     response.headers.set("userId", user.id!);

//     isAuthenticated = true;
//   } catch (err) {
//     throw err;
//     console.log("Errr", err);
//     response.headers.set("userEmail", "");
//     response.headers.set("userId", "");

//     isAuthenticated = false;
//   }

//   if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }

//   return response;
// }

export default async function middleware(req: NextRequest) {

}