import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

interface PropertyListProps {
  properties: Array<{ propertyName: string; value: string }>;
  title?: string;
}

export function PropertyList({ properties, title }: PropertyListProps) {
  const formatPropertyName = (name: string) => {
    return name.replace(/_/g, " ");
  };

  return (
    <Card>
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
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
    </Card>
  );
}
