import { createContext, useEffect, useState } from "react";
import { initialState } from "../utils/initialQrState";

export const QrContext = createContext({
  qrContext: {},
  handleBasicChanges: function (key, value) {},
  handleSubChanges: function (key, subKey, value) {},
});

const qrData = localStorage.getItem("qrData");

const QrContextProvider = ({ children }) => {
  const [QrContextValues, setQrContextValues] = useState({
    width: 0,
    height: 0,
    data: "",
    margin: 0,
    image: "", // URL/base64 for center logo/image
    shape: "", //'square' 'circle'
    borderRadius: "",
    withBg: null,
    qrOptions: {
      typeNumber: 0, // QR Code version (0 = auto)
      errorCorrectionLevel: "", // "L" | "M" | "Q" | "H"
    },

    imageOptions: {
      hideBackgroundDots: null, // remove dots under logo
      imageSize: 0.2, // relative size of logo (0–1)
      margin: 0, // spacing around logo
      crossOrigin: "", // useful for loading external images
    },

    dotsOptions: {
      color: "", // dot color (solid)
      gradient: null, // optional gradient (see below)
      type: "", // "square" | "dots" | "rounded" | "classy" | "classy-rounded" | "extra-rounded"
    },

    backgroundOptions: {
      color: "", // background color
      gradient: null, // optional gradient
    },

    cornersSquareOptions: {
      color: "", // color of outer corner squares
      gradient: null,
      type: "", // "square" | "dot" | "extra-rounded"
    },

    cornersDotOptions: {
      color: "", // color of inner corner dots
      gradient: null,
      type: "", // "square" | "dot"
    },
  });

  function handleBasicChanges(key, value) {
    setQrContextValues((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  }

  function handleSubChanges(key, subKey, value) {
    setQrContextValues((prev) => {
      return {
        ...prev,
        [key]: { ...prev[key], [subKey]: value },
      };
    });
  }

  useEffect(() => {
    localStorage.setItem("qrData", JSON.stringify(QrContextValues));
  }, [handleBasicChanges, handleSubChanges]);

  useEffect(() => {
    if (qrData) {
      setQrContextValues(JSON.parse(qrData));
    } else {
      setQrContextValues(initialState);
    }
  }, []);

  const contextValues = {
    qrContext: QrContextValues,
    handleBasicChanges,
    handleSubChanges,
  };

  return <QrContext value={contextValues}>{children}</QrContext>;
};

export default QrContextProvider;
