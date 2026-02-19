"use client";

import { DiskVolumeDto } from "@/entities/disk/dto/disk-dto";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { HardDrive } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui/chart";

interface VolumeChartCardProps {
  volume: DiskVolumeDto;
}

export function VolumeChartCard({ volume }: VolumeChartCardProps) {
  const usedSpace = volume.sizeGB - volume.freeSpaceGB;

  const data = [
    {
      name: "used",
      value: Number(usedSpace.toFixed(2)),
      fill: "var(--chart-1)",
    },
    {
      name: "free",
      value: Number(volume.freeSpaceGB.toFixed(2)),
      fill: "var(--chart-2)",
    },
  ];

  const chartConfig = {
    used: {
      label: "Занято",
      color: "var(--chart-1)",
    },
    free: {
      label: "Свободно",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  const getVolumeLabel = () =>
    volume.letter ? `${volume.letter}:` : `Раздел ${volume.partitionNumber}`;

  const formatSize = (gb: number) =>
    gb < 1 ? `${(gb * 1024).toFixed(0)} МБ` : `${gb.toFixed(2)} ГБ`;

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
            <CardTitle className="text-base truncate">
              Раздел {volume.partitionNumber}
              {volume.letter && (
                <Badge className="ml-2">{`${volume.letter}:\\`}</Badge>
              )}
            </CardTitle>
          </div>
          <Badge variant="outline" className="shrink-0">
            {volume.fileSystem}
          </Badge>
        </div>

        {volume.label && (
          <p className="text-sm text-muted-foreground truncate">
            {volume.label}
          </p>
        )}
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-55"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(v) => formatSize(v as number)}
                />
              }
            />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={85}
              stroke="none"
              startAngle={90}
              endAngle={-270}
            />

            {/* Центр с процентом */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-lg font-semibold"
            >
              {volume.usePercentage.toFixed(0)}%
            </text>
          </PieChart>
        </ChartContainer>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Тип:</span>
            <span>{volume.type}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Общий размер:</span>
            <span>{formatSize(volume.sizeGB)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Свободно:</span>
            <span className="text-chart-2">
              {formatSize(volume.freeSpaceGB)}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Занято:</span>
            <span className="text-chart-1">{formatSize(usedSpace)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
