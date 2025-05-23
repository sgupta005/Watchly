"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import React, { useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { VisibilityOption } from "@prisma/client";

export default function ChangeVisibility({
  onToggle,
  defaultValue,
}: {
  onToggle: (newVisibility: VisibilityOption) => Promise<void>;
  defaultValue: VisibilityOption;
}) {
  const [value, setValue] = React.useState<VisibilityOption>(defaultValue);
  const debouncedValue = useDebounce<VisibilityOption>(value, 500); // 500ms delay

  useEffect(() => {
    if (debouncedValue !== defaultValue) {
      onToggle(debouncedValue);
    }
  }, [debouncedValue, onToggle, defaultValue]);

  const handleToggle = (checked: boolean) => {
    const newVisibility = checked ? "PUBLIC" : "PRIVATE";
    setValue(newVisibility);
  };

  return (
    <div className="mt-4 flex w-full flex-col items-start rounded-xl border p-4">
      <div className="flex w-full items-center justify-between">
        <Label htmlFor="visibility-toggle" className="text-sm font-medium">
          Board Visibility
        </Label>
        <Switch
          id="visibility-toggle"
          checked={value === "PUBLIC"}
          onCheckedChange={handleToggle}
        />
      </div>
      <p className="mt-4 text-sm font-medium">
        {value === "PUBLIC" ? "Public" : "Private"}
      </p>
      <p className="text-left text-sm text-muted-foreground">
        {value === "PUBLIC"
          ? "This board is visible in your profile and in search results."
          : "Only you can view this board."}
      </p>
    </div>
  );
}
