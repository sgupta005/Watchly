"use client";
import React, { useEffect } from "react";
import ExploreMediaCard from "./ExploreMediaCard";
import { getLatestMedia } from "../_actions/actions";
import { Pagination } from "@/components/ui/pagination";
import PaginationComponent from "./Pagination";
export default function LatestMedia({ mediaType }: { mediaType: string }) {
  const [latestMedia, setLatestMedia] = React.useState<any[]>([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function handleGetTopRatedMedia() {
      if (!mediaType) return;
      setLoading(true);
      const media = mediaType == "Movies" ? "movie" : "tv";
      const response = await getLatestMedia({ mediaType: media, pageNumber });
      if (response) {
        setLatestMedia(response.results);
      }
      setLoading(false);
    }
    handleGetTopRatedMedia();
  }, [mediaType, pageNumber]);

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {!loading &&
          latestMedia.map((media) => (
            <ExploreMediaCard
              mediaType={mediaType}
              key={media.id}
              media={media}
            />
          ))}
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div
              key={i}
              className="h-[300px] w-[240px] animate-pulse rounded-lg bg-gray-200 text-gray-900"
            ></div>
          ))}
      </div>
      <div className="mt-8 flex justify-center">
        <PaginationComponent
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
