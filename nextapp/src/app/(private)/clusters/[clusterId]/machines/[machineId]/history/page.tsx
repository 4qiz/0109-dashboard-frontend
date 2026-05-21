import { getMachineAsync } from "@/entities/machine/services/get-machine";
import { getClusterAsync } from "@/entities/cluster/services/get-cluster";
import { getMachineHistoryAsync } from "@/entities/machine/services/get-machine-history";
import { MachineHistory } from "@/features/machine/machine-history";
import { MessageCard } from "@/shared/components/message-card";
import { AlertTriangleIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const DEFAULT_TAKE = 100;

const MachineHistoryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ clusterId: string; machineId: string }>;
  searchParams: Promise<{ skip?: string; take?: string }>;
}) => {
  const { clusterId, machineId } = await params;
  const { skip: skipParam, take: takeParam } = await searchParams;

  const clusterIdNum = Number(clusterId);
  const machineIdNum = Number(machineId);
  const take = takeParam ? Number(takeParam) : DEFAULT_TAKE;
  const skip = skipParam ? Number(skipParam) : 0;

  const [{ machine }, { history, error }, { cluster }] = await Promise.all([
    getMachineAsync(machineIdNum),
    getMachineHistoryAsync(machineIdNum, { take, skip }),
    getClusterAsync(clusterIdNum),
  ]);

  if (!history || error) {
    return (
      <MessageCard
        icon={<AlertTriangleIcon />}
        message={error || "Не удалось загрузить историю изменений"}
      />
    );
  }

  const hostname = machine?.hostname ?? `ПК #${machineIdNum}`;
  const clusterName = cluster?.name ?? `Кластер ${clusterIdNum}`;

  return (
    <MachineHistory
      clusterId={clusterIdNum}
      machineId={machineIdNum}
      hostname={hostname}
      history={history}
      clusterName={clusterName}
    />
  );
};

export default MachineHistoryPage;
