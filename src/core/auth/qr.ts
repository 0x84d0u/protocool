import QRCode from "qrcode";
import { Errors } from "..";


export interface Options {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  type?: "image/png" | "image/jpeg" | "image/webp";
}


export const gen = async (
  data: string,
  options: Options = {}
): Promise<string> => {
  try {
    return await QRCode.toDataURL(data, {
      width: options.width ?? 256,
      margin: options.margin ?? 4,
      errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
      type: options.type ?? "image/png",
    });
  } catch (error) {
    throw new Errors.Custom("QR generation failed", "QR_GENERATION_ERROR", 500, { error });
  }
};

export const genBuffer = async (
  data: string,
  options: Options = {}
): Promise<Buffer> => {
  try {
    return await QRCode.toBuffer(data, {
      width: options.width ?? 256,
      margin: options.margin ?? 4,
      errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
    });
  } catch (error) {
    throw new Errors.Custom("QR buffer generation failed", "QR_BUFFER_ERROR", 500, { error });
  }
};


export const genSvg = async (
  data: string,
  options: Options = {}
): Promise<string> => {
  try {
    return await QRCode.toString(data, {
      type: "svg",
      width: options.width ?? 256,
      margin: options.margin ?? 4,
      errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
    });
  } catch (error) {
    throw new Errors.Custom("QR SVG generation failed", "QR_SVG_ERROR", 500, { error });
  }
};


// export const generateQrFile = async (
//   filePath: string,
//   data: string,
//   options: Options = {}
// ): Promise<void> => {
//   try {
//     await QRCode.toFile(filePath, data, {
//       width: options.width ?? 256,
//       margin: options.margin ?? 4,
//       errorCorrectionLevel: options.errorCorrectionLevel ?? "M",
//       type: options.type ?? "image/png",
//     });
//   } catch (error) {
//     throw new AbstractError("QR file generation failed", "QR_FILE_ERROR", 500, { error });
//   }
// };
