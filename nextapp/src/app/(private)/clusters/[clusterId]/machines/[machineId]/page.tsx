import { getMachineAsync } from "@/entities/machine/services/get-machine";
import { MachineDetails } from "@/features/machine/machine-details";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const MachinePage = async ({
  params,
}: {
  params: Promise<{ clusterId: string; machineId: string }>;
}) => {
  const { clusterId, machineId } = await params;
  const { machine, error } = await getMachineAsync(Number(machineId));

  if (!machine || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Кластер не найден"}
      />
    );
  }

  return <MachineDetails machine={machine} idCluster={Number(clusterId)} />;
};

export default MachinePage;
