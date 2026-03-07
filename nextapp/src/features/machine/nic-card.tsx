import { NicDto } from "@/entities/machine/dto/machine-dto";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Network, WifiHigh, SignalHigh } from "lucide-react";

interface NICCardProps {
  nic: NicDto;
}

export function NICCard({ nic }: NICCardProps) {
  const isUp = nic.status.toLowerCase() === "up";

  return (
    <Card
      className={cn(
        "overflow-hidden transition-colors ",
        !isUp && "bg-muted/50",
      )}
    >
      <CardHeader>
        {/* Header with icon and status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div
              className={cn(
                "p-2 rounded-lg shrink-0",
                isUp ? "bg-primary/10" : "bg-muted",
              )}
            >
              <Network
                className={cn(
                  "h-5 w-5",
                  isUp ? "text-primary" : "text-muted-foreground",
                )}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium truncate">{nic.name}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {nic.description}
              </p>
            </div>
          </div>
          <Badge
            variant={isUp ? "default" : "destructive"}
            className={cn("shrink-0")}
          >
            {nic.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-3">
          {/* Main info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* MAC Address */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">MAC адрес</p>
              <div className="flex items-center gap-1.5">
                <SignalHigh className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <p className="text-sm font-mono break-all">{nic.macAddress}</p>
              </div>
            </div>

            {/* Link Speed */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Скорость</p>
              <div className="flex items-center gap-1.5">
                <WifiHigh className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <p className="text-sm">{nic.linkSpeed}</p>
              </div>
            </div>

            {/* Media Type */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Тип медиа</p>
              <p className="text-sm">{nic.mediaType}</p>
            </div>

            {/* Driver Info */}
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Версия драйвера</p>
              <p className="text-sm font-mono">{nic.driverInfo}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
