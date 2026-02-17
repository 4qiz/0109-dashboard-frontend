import { InfoIcon } from "lucide-react";
import { Card, CardContent } from "@/shared/ui/card";
import { AlertTitle } from "@/shared/ui/alert";

export const MessageCard = ({
  icon,
  message,
}: {
  message: string;
  icon?: React.ReactNode;
}) => {
  return (
    <div className="flex justify-center items-center">
      <Card className="w-full md:w-80">
        <CardContent className="flex flex-col justify-center items-center gap-3 p-6">
          {icon || <InfoIcon />}
          <AlertTitle>{message}</AlertTitle>
        </CardContent>
      </Card>
    </div>
  );
};
