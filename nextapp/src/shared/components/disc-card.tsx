import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { appRoutes } from "../constants/app-routes";
import { cn } from "@/shared/lib/utils";

interface DiskCardProps {
  idCluster: number;
  idMachine: number;
  idDisk: number;
  name: string;
  masterComputer: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: string;
}

const getStatusVisual = (status: string) => {
  switch (status.toUpperCase()) {
    case "OK":
      return {
        cardClass: "",
        edgeGradientClass: "",
        iconClass: "text-emerald-500/90",
        srLabel: "OK",
      };

    case "WARNING":
      return {
        cardClass:
          "border-orange-400/60 bg-gradient-to-br from-orange-500/10 via-background to-background",
        edgeGradientClass: "from-transparent via-amber-400/10 to-orange-400/25",
        iconClass: "text-amber-500/95",
        srLabel: "WARNING",
      };

    case "CRITICAL":
      return {
        cardClass:
          "border-red-400/70 bg-gradient-to-br from-red-500/10 via-background to-background",
        edgeGradientClass: "from-transparent via-red-400/15 to-rose-500/25",
        iconClass: "text-red-500",
        srLabel: "CRITICAL",
      };

    default:
      return {
        cardClass:
          "border-border bg-gradient-to-br from-muted/60 via-background to-background",
        edgeGradientClass:
          "from-transparent via-muted-foreground/10 to-muted-foreground/25",
        iconClass: "text-muted-foreground",
        srLabel: "UNKNOWN",
      };
  }
};

export function DiskCard({
  idCluster,
  idMachine,
  idDisk,
  name,
  masterComputer,
  serial,
  busType,
  diskType,
  operationalStatus,
}: DiskCardProps) {
  const isCritical = operationalStatus.toUpperCase() === "CRITICAL";
  const statusVisual = getStatusVisual(operationalStatus);

  return (
    <Link
      href={appRoutes.disk(idCluster, idMachine, idDisk)}
      className="block group"
    >
      <Card
        className={cn(
          "relative overflow-hidden transition-all duration-300 cursor-pointer  hover:shadow-xl",
          statusVisual.cardClass,
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-[46%] bg-linear-to-r transition-opacity",
            " duration-2200 group-hover:opacity-100",
            statusVisual.edgeGradientClass,
            isCritical
              ? "animate-[pulse_3.8s_ease-in-out_infinite]"
              : "animate-[pulse_6s_ease-in-out_infinite]",
          )}
        />

        <CardHeader className="relative flex flex-row items-start justify-between gap-3 w-full">
          <div className="space-y-2 flex-1 min-w-0 ">
            <div className="flex items-center gap-2">
              <CardTitle
                className="text-lg truncate text-wrap line-clamp-1 overflow-hidden"
                title={name}
              >
                {name}
              </CardTitle>
              <span
                role="status"
                aria-label={statusVisual.srLabel}
                title={statusVisual.srLabel}
                className={statusVisual.iconClass}
              >
                <div
                  className="h-3 w-3 rounded-full bg-current"
                  aria-hidden="true"
                />
              </span>
            </div>

            <p className="text-sm text-muted-foreground truncate">{serial}</p>
          </div>
          <ChevronRight className="h-6 w-6 text-muted-foreground shrink-0 transition-transform duration-900 group-hover:translate-x-0.5" />
        </CardHeader>
        <CardContent className="relative">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{masterComputer}</Badge>
            <Badge variant="outline">{busType}</Badge>
            {diskType && <Badge variant="outline">{diskType}</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
