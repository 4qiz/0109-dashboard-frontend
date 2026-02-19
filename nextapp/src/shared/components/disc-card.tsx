import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ChevronRight, HardDrive } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { appRoutes } from "../constants/app-routes";

interface DiskCardProps {
  idCluster: number;
  idMachine: number;
  idDisk: number;
  name: string;
  serial: string;
  busType: string;
  diskType: string;
  healthStatus: string;
  operationalStatus: string;
}

export function DiskCard({
  idCluster,
  idMachine,
  idDisk,
  name,
  serial,
  busType,
  diskType,
  operationalStatus,
}: DiskCardProps) {
  const getOperationalColor = (status: string) => {
    switch (status.toUpperCase()) {
      case "OK":
        return "bg-green-500/10 text-green-700 dark:text-green-400";

      case "WARNING":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";

      case "CRITICAL":
        return "bg-red-500/10 text-red-700 dark:text-red-400";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Link href={appRoutes.disk(idCluster, idMachine, idDisk)} className="block">
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

            <Badge className={getOperationalColor(operationalStatus)}>
              {operationalStatus}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
