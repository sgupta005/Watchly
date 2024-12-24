"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/providers/auth-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { deleteFriend } from "../_actions/actions";
import { CrossIcon, PlusIcon } from "lucide-react";

type FriendsProp = {
  id: string;
  requester: {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
  };
  addressed: {
    id: string;
    name: string;
    email: string;
    profileImageUrl?: string;
  };
};

export default function FriendCard({ friend }: { friend: FriendsProp }) {
  const { userDetails } = useContext(AuthContext);
  const userId = userDetails?.id;
  const friendData =
    friend.requester.id === userId ? friend.addressed : friend.requester;
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDeleting(true);
    try {
      await deleteFriend(userId!, friend.id);
      router.refresh();
    } catch (error) {
      console.error("Failed to delete friend:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Link
          href={"/profile/" + friendData.id}
          className="flex items-center gap-3 md:gap-5"
        >
          <Avatar>
            <AvatarImage
              src={friendData.profileImageUrl || ""}
              alt={friendData.name || ""}
            />
            <AvatarFallback>{friendData.name?.charAt(0) || "F"}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl md:text-2xl">
              {friendData.name}
            </CardTitle>
            <p className="block text-sm text-muted-foreground">
              {friendData.email}
            </p>
          </div>
        </Link>
        <Button variant="link" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            "Deleting..."
          ) : (
            <PlusIcon className="size-5 rotate-45" />
          )}
        </Button>
      </div>
      <hr />
    </div>
  );
}
