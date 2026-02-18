import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChevronRight, HardDrive } from "lucide-react";
import { Badge } from "@/shared/ui/badge";

interface DiskCardProps {
  idDisk: number;
  name: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: string;
}

export function DiskCard({
  idDisk,
  name,
  serial,
  busType,
  diskType,
  healthStatus,
  operationalStatus,
}: DiskCardProps) {
  const getHealthColor = (status: string) => {
    if (status.toLowerCase() === "healthy" || status.toLowerCase() === "ok") {
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    }
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
  };

  return (
    <Link href={`/disk/${idDisk}`} className="block">
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <HardDrive className="h-5 w-5 text-primary shrink-0" />
                <CardTitle className="text-lg truncate">{name}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground truncate">{serial}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{busType}</Badge>
            {diskType && <Badge variant="outline">{diskType}</Badge>}
            <Badge className={getHealthColor(healthStatus)}>
              {healthStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
