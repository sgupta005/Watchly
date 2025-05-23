"use client";
import React from "react";
import TopRatedMedia from "./_components/TopRatedMedia";
import SelectMediaTypeButton from "../dashboard/_components/SelectMediaTypeButton";
import SelectExploreCategory from "./_components/SelectExploreCategory";
import LatestMedia from "./_components/LatestMedia";
import PopularMedia from "./_components/PopularMedia";

export default function Explore() {
  const [mediaType, setMediaType] = React.useState(
    localStorage.getItem("mediaType") || "Movies",
  );
  const [exploreCategory, setExploreCategory] = React.useState(
    localStorage.getItem("exploreCategory") || "latest",
  );
  return (
    <div>
      <div className="container py-12">
        <h1 className="mb-4 text-3xl font-extrabold">Explore {mediaType}</h1>
        <div className="flex items-center gap-3">
          <SelectMediaTypeButton
            mediaType={mediaType}
            setMediaType={setMediaType}
          />
          <SelectExploreCategory
            exploreCategory={exploreCategory}
            setExploreCategory={setExploreCategory}
          />
        </div>
        {exploreCategory == "top-rated" && (
          <TopRatedMedia mediaType={mediaType} />
        )}
        {exploreCategory == "latest" && <LatestMedia mediaType={mediaType} />}
        {exploreCategory == "popular" && <PopularMedia mediaType={mediaType} />}
      </div>
    </div>
  );
}
