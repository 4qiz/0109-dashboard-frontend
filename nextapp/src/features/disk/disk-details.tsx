import { DiskDto } from "@/entities/disk/dto/disk-dto";
import { BackButton } from "@/shared/components/back-button";
import { PropertyList } from "@/shared/components/property-list";
import { Badge } from "@/shared/ui/badge";
import { HardDrive, Info } from "lucide-react";

export const DiskDetails = ({ disk }: { disk: DiskDto }) => {
  const properties = disk.props;

  const getHealthColor = (status: string) => {
    if (status.toLowerCase() === "healthy" || status.toLowerCase() === "ok") {
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    }
    return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="space-y-3">
            <BackButton />
            <div className="flex items-center gap-3">
              <HardDrive className="h-6 w-6 text-primary" />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl truncate">{disk.name}</h1>
                <p className="text-sm text-muted-foreground truncate">
                  {disk.serial}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Disk Summary */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            <h2 className="text-xl">Сводка</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{disk.busType}</Badge>
            {disk.diskType && <Badge variant="outline">{disk.diskType}</Badge>}
            <Badge className={getHealthColor(disk.healthStatus)}>
              {disk.healthStatus}
            </Badge>
            <Badge variant="secondary">{disk.operationalStatus}</Badge>
          </div>

          {/* {machineName && (
            <p className="text-sm text-muted-foreground">
              Установлен на: <span className="text-foreground">{machineName}</span>
            </p>
          )} */}
        </div>

        {/* All Properties */}
        <div className="space-y-4">
          <h2 className="text-xl">Все свойства</h2>
          <PropertyList properties={properties} />
        </div>
      </div>
    </div>
  );
};
