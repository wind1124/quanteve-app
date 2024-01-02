import QRCode from "qrcode.react";

export default function Code(props) {
  const size = props.size || 250;
  const bgColor = props.bgColor || "#4D3813";
  const fgColor = props.fgColor || "white";
  return (
    <QRCode
      value={props.value}
      size={size}
      bgColor={bgColor}
      fgColor={fgColor}
    />
  );
}
