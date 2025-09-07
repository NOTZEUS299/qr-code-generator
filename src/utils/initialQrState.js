export const initialState = {
  width: 300,
  height: 300,
  data: "http://github.com/NOTZEUS299",
  margin: 20,
  image: "https://avatars.githubusercontent.com/u/113411879?v=4", // URL/base64 for center logo/image
  shape: "square", //'square' 'circle'
  borderRadius: "20",
  withBg: true,
  qrOptions: {
    typeNumber: 0, // QR Code version (0 = auto)
    errorCorrectionLevel: "Q", // "L" | "M" | "Q" | "H"
  },

  imageOptions: {
    hideBackgroundDots: true, // remove dots under logo
    imageSize: 0.4, // relative size of logo (0–1)
    margin: 10, // spacing around logo
    crossOrigin: "anonymous", // useful for loading external images
  },

  dotsOptions: {
    color: "#ffffff", // dot color (solid)
    gradient: null, // optional gradient (see below)
    type: "dots", // "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded"
  },

  backgroundOptions: {
    color: "#00644d", // background color
    gradient: null, // optional gradient
  },

  cornersSquareOptions: {
    color: "#ffffff", // color of outer corner squares
    gradient: null,
    type: "extra-rounded", // "square" | "dot" | "extra-rounded"
  },

  cornersDotOptions: {
    color: "#ffffff", // color of inner corner dots
    gradient: null,
    type: "dot", // "square" | "dot"
  },
};
