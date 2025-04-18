"use client";
import LoadingScreen from "@/app/_components/LoadingScreen";
import { Button } from "@/components/ui/button";
import { formatShowDate, getGenreById } from "@/lib/functions";
import { TMDBShowDetails } from "@/types/tmdb";
import { MonitorPlay } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getMediaDetails, getTrailer } from "../../_actions/actions";
import MediaCrudButtons from "../../_components/MediaCrudButtons";
import TrailerFrame from "../../_components/TrailerFrame";

export default function Show({ params }: { params: { id: string } }) {
  const imagePrefix = "https://image.tmdb.org/t/p/w500";
  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<TMDBShowDetails | null>(null);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [trailerFrame, setTrailerFrame] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [response, trailerResponse] = await Promise.all([
          getMediaDetails({ mediaType: "tv", mediaId: id }),
          getTrailer({ mediaId: id, mediaType: "tv" }),
        ]);

        setDetails(response);
        const filteredTrailer = trailerResponse?.results?.find(
          (result: any) => result.type === "Trailer",
        );

        setTrailer(filteredTrailer ? filteredTrailer.key : null);
      } catch (error) {
        console.error("Failed to fetch show details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <LoadingScreen />;

  if (!details)
    return (
      <div>
        <h1 className="pt-16 text-center text-3xl font-bold text-foreground/80">
          Show Not Found
        </h1>
        <p className="text-center font-medium text-foreground/50">
          The show you are looking for does not exist.
        </p>
      </div>
    );

  const movieBackdrop = `${imagePrefix}${details?.backdrop_path}`;

  return (
    <div className="-mt-16 min-h-screen pb-16 text-white">
      <div
        className="fixed inset-0 z-[-2] scale-110 overflow-y-auto bg-cover bg-center bg-no-repeat blur-lg"
        style={{
          backgroundImage: movieBackdrop ? `url(${movieBackdrop})` : "none",
        }}
      />
      <div className="fixed inset-0 z-[-1] scale-110 bg-gradient-to-t from-black/100 via-black/40 to-black/10 backdrop-blur-lg"></div>
      <div className="container grid w-full grid-cols-1 pt-28 lg:grid-cols-4 lg:gap-6">
        <div className="col-span-1 mb-8 flex w-full flex-col items-center justify-center">
          <Image
            loading="lazy"
            src={imagePrefix + details?.poster_path}
            alt={details.name}
            width={500}
            height={500}
            className="mx-auto aspect-auto min-h-[400px] w-[300px] rounded-lg object-cover shadow-2xl shadow-black/70"
          />
          {trailer && (
            <Button
              className="mt-4 flex w-full max-w-sm items-center justify-center gap-3 bg-yellow-500 text-black hover:bg-yellow-600"
              onClick={() => setTrailerFrame(true)}
            >
              Watch Trailer <MonitorPlay className="size-5" />
            </Button>
          )}
          {trailerFrame && (
            <TrailerFrame
              video_key={trailer || ""}
              onClose={() => setTrailerFrame(false)}
            />
          )}
        </div>

        <div className="col-span-3">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
            <div className="max-w-3xl text-5xl font-black">{details?.name}</div>
            <p className="font-medium text-white/80">
              {formatShowDate(details!.first_air_date)}
            </p>
          </div>
          <div className="my-2 font-semibold text-white/80">
            {details?.tagline}
          </div>
          <div className="mb-2 mt-1">
            {details?.genres?.map((genreId: { id: number; name: string }) => {
              const genreName = getGenreById(genreId.id);
              if (!genreName) return null;
              return (
                <span
                  key={genreId.id}
                  className="mr-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700"
                >
                  {genreName}
                </span>
              );
            })}
          </div>

          <div className="mb-3 mt-1 flex items-center gap-3 font-medium text-white/80">
            <div>Rating: {(details?.vote_average).toFixed(2)}/10</div>
          </div>
          <p className="max-w-2xl text-lg">{details?.overview}</p>
          <div className="mt-8 w-full">
            <MediaCrudButtons
              details={details}
              title={details?.name}
              mediaType="show"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
