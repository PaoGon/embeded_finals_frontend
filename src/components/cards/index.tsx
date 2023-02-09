import { FC } from "react";

import { ICards } from "./models";

import "./styles.css";

const COLORS = [
  " ",
  "orangeBg",
  "yellowBg",
  "alligatorBg",
  "deepYellowBg",
  "kowloonBg",
  "softBlueBg",
  "redBg",
];

const Cards: FC<ICards> = ({ title, titleVal, icons, bgIcons, peso, kph }) => {
  const checkIconBackGround = COLORS.includes(bgIcons || "")
    ? bgIcons
    : COLORS[0];

  return (
    <div className="cards">
      <div className="txt-container">
        <p className="title">{title}</p>
        <p className="title-value">
          <span className="peso-sign">{peso}</span>
          {titleVal}
          <span className="kph-sign">{kph}</span>
        </p>
      </div>
      <div className="icon-container">
        <p className={`im-power ${checkIconBackGround}`}>
          <span className="spn">{icons}</span>
        </p>
      </div>
    </div>
  );
};

export default Cards;
