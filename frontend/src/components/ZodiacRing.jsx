import React from "react";

const ZodiacCard = ({ name, date, symbol, gradient }) => {
  return (
    <div
      className={`rounded-2xl p-6 w-52 h-72 flex flex-col justify-between items-center shadow-lg transition-transform transform hover:scale-105 ${gradient}`}
    >
      <div className="text-6xl">{symbol}</div>
      <div className="text-xl font-semibold text-white">{name}</div>
      <div className="text-sm text-white/80">{date}</div>
    </div>
  );
};

export default ZodiacCard;
