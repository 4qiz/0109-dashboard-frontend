import { getDiskAsync } from "@/entities/disk/services/get-disk";
import { DiskDetails } from "@/features/disk/disk-details";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const DiskPage = async ({
  params,
}: {
  params: Promise<{ clusterId: string; machineId: string; diskId: string }>;
}) => {
  const { diskId } = await params;
  const { disk, error } = await getDiskAsync(Number(diskId));
  console.log("DiskPage params:", disk);
  if (!disk || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Диск не найден"}
      />
    );
  }

  return <DiskDetails disk={disk} />;
};

export default DiskPage;
