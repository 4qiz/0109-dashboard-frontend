import { DiskPropertyDto } from "@/entities/disk/dto/disk-dto";

import { Card, CardContent } from "@/shared/ui/card";

export const DiskSmartSummary = ({
  diskProps,
}: {
  diskProps: DiskPropertyDto[];
}) => {
  if (diskProps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {diskProps.map((prop) => (
          <Card
            key={prop.propertyName}
            className={`py-3 ${prop.isStale ? "opacity-60 bg-muted" : ""}`}
          >
            <CardContent className="px-4">
              <p className="text-xs text-muted-foreground">
                {prop.displayName}
              </p>
              <p className="text-lg font-semibold">{prop.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
