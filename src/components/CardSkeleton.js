import React from "react";
import Skeleton from "react-loading-skeleton";

export default function CardSkeleton({ cards }) {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div className="row justify-content-center align-item-center" key={i}>
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <Skeleton box width={310} height={460} />
        </div>
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <Skeleton box width={310} height={460} />
        </div>

        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <Skeleton box width={310} height={460} />
        </div>
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
          <Skeleton box width={310} height={460} />
        </div>
      </div>
    ));
}
