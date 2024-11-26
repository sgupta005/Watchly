import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import prisma from "@/db";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Profile({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = await auth();
  const userData = await prisma.user.findFirst({
    where: {
      id: id || userId!,
    },
    include: {
      movieBoards: true,
    },
  });

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row">
        <Avatar className="mx-auto size-72">
          <AvatarImage
            src={userData.profileImageUrl || ""}
            alt={userData.name || ""}
          />
          <AvatarFallback>{userData.name?.charAt(0) || "F"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-2 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
            <Button variant={"link"}>Edit Profile</Button>
          </div>
          <hr />

          <div className="mt-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">Movie Boards</h2>
            {userData.movieBoards.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userData.movieBoards.map((board) => (
                  <div key={board.id} className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold">{board.title}</h3>
                    <p className="text-muted-foreground">{board.description}</p>
                  </div>
                ))}
              </div>
            )}
            {userData.movieBoards.length == 0 && (
              <p className="text-muted-foreground">
                You haven&apos;t added any movie boards yet. Add some movie
                boards to get started!
              </p>
            )}
          </div>

          {userData.movieBoards.length == 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-xl font-bold">Favorites</h2>
              <p className="text-muted-foreground">
                You haven&apos;t added any movie boards yet. Add some movie
                boards to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
