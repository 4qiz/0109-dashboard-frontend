"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PropertyListProps {
  properties: Array<{ propertyName: string; value: string }>;
  title?: string;
  collapsed?: boolean; // по умолчанию false
}

export function PropertyList({
  properties,
  title,
  collapsed = false,
}: PropertyListProps) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const formatPropertyName = (name: string) => {
    return name.replace(/_/g, " ");
  };

  return (
    <Card>
      {title && (
        <CardHeader
          className="cursor-pointer select-none flex items-center justify-between"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          <CardTitle className="">{title}</CardTitle>
          {/* Expand Icon */}
          <div className="ml-2 shrink-0 ">
            {isCollapsed ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
      )}

      {!isCollapsed && (
        <CardContent className={title ? "" : "pt-6"}>
          <div className="space-y-3">
            {properties.map((prop, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {formatPropertyName(prop.propertyName)}
                  </p>
                  <p className="text-sm break-all">{prop.value}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
