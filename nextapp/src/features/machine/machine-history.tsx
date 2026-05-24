import {
  MachineHistoryDto,
  MACHINE_HISTORY_CHANGE_TYPE,
} from "@/entities/machine/dto/machine-history-dto";
import { appRoutes } from "@/shared/constants/app-routes";
import { pluralizeRu } from "@/shared/lib/pluralize-ru";
import { cn } from "@/shared/lib/utils";
import { Header } from "@/shared/components/header";
import { Card, CardContent } from "@/shared/ui/card";
import { Monitor } from "lucide-react";
import Link from "next/link";
import {
  getChangeStyles,
  getLowerLineGradient,
  getUpperLineGradient,
  HistoryEntryCard,
} from "./history-entry-card";
import { MachineRowMenu } from "./machine-row-menu";
import { MachineBreadcrumb } from "@/shared/components/machine-breadcrumb";

const changeTypeLabels: Record<string, string> = {
  [MACHINE_HISTORY_CHANGE_TYPE.Added]: "Добавлено",
  [MACHINE_HISTORY_CHANGE_TYPE.Removed]: "Удалено",
  [MACHINE_HISTORY_CHANGE_TYPE.Updated]: "Изменено",
};

export const MachineHistory = ({
  clusterId,
  machineId,
  hostname,
  history,
  clusterName,
}: {
  clusterId: number;
  machineId: number;
  hostname: string;
  history: MachineHistoryDto;
  clusterName: string;
}) => {
  const sortedItems = [...history.items].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime(),
  );

  const changeWord = pluralizeRu(
    history.total,
    "изменение",
    "изменения",
    "изменений",
  );
  const summaryText =
    history.total > sortedItems.length
      ? `Показано ${sortedItems.length} из ${history.total} ${changeWord}`
      : `${history.total} ${changeWord}`;

  const nextSkip = history.skip + history.take;

  return (
    <div className="min-h-screen container mx-auto max-w-4xl">
      <Header
        title={hostname}
        description={`ID: ${machineId}`}
        icon={<Monitor className="h-6 w-6 text-primary shrink-0" />}
      />

      <div className="px-4 py-6 space-y-6">
        <MachineBreadcrumb
          clusterName={clusterName}
          clusterId={clusterId}
          machineId={machineId}
          machineHostname={hostname}
          type="history"
        />

        <MachineRowMenu
          clusterId={clusterId}
          machineId={machineId}
          activePage="history"
        />

        <p className="text-sm text-muted-foreground">{summaryText}</p>

        {sortedItems.length === 0 ? (
          <Card>
            <CardContent className=" text-center text-muted-foreground">
              Изменений компонентов пока нет
            </CardContent>
          </Card>
        ) : (
          <ol className="relative space-y-4">
            {sortedItems.map((item, index) => {
              const { dot } = getChangeStyles(item.changeType);
              const isFirst = index === 0;
              const isLast = index === sortedItems.length - 1;

              return (
                <li key={item.idRecord} className="flex gap-3 overflow-visible">
                  <div
                    className="relative w-4 shrink-0 self-stretch"
                    aria-hidden
                  >
                    {!isFirst && (
                      <span
                        className={cn(
                          "absolute left-1.75 top-0 w-px -translate-x-1/2",
                          "bottom-[calc(50%-7px)]",
                          getUpperLineGradient(item.changeType),
                        )}
                      />
                    )}
                    {!isLast && (
                      <span
                        className={cn(
                          "absolute left-1.75 top-[calc(50%+7px)] w-px -translate-x-1/2",
                          "-bottom-4",
                          getLowerLineGradient(item.changeType),
                        )}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute left-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full border-2 border-background flex items-center justify-center",
                        dot,
                      )}
                      title={changeTypeLabels[item.changeType]}
                    ></span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <HistoryEntryCard item={item} />
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        {history.hasNext && (
          <div className="flex justify-center pt-2">
            <Link
              href={`${appRoutes.machineHistory(clusterId, machineId)}?skip=${nextSkip}&take=${history.take}`}
              className="text-sm text-primary hover:underline"
            >
              Показать ещё
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
