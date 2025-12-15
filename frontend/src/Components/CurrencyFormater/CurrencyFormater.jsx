import React from "react";
import numeral from "numeral";

function currencyFormatter(price) {
  const formatedPrice = numeral(price).format("$0, 0.0");
  return <div>{formatedPrice}</div>;
}
export default currencyFormatter;
