import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC!,
  privateKey: process.env.IMAGEKIT_PRIVATE!,
  urlEndpoint: "https://ik.imagekit.io/v8i5pif0b",
});
