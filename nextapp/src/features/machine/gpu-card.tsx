"use client";

import { GpuDto } from "@/entities/machine/dto/machine-dto";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const GpuCard = ({ gpu }: { gpu: GpuDto }) => {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none flex items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <CardTitle className="text-base">
          {gpu.name} <Badge className="">{gpu.memSize} GB</Badge>
        </CardTitle>
        {/* Expand Icon */}
        <div className="ml-2 shrink-0 ">
          {open ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>

      {open && (
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Производитель</p>
              <p className="text-sm">{gpu.vendor}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Процессор</p>
              <p className="text-sm">{gpu.processor}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Ревизия GPU</p>
              <p className="text-sm">{gpu.gpuRevision}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Тех. процесс</p>
              <p className="text-sm">{gpu.processSize} нм</p>
            </div>
          </div>

          {gpu.releaseDate && (
            <>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Дата выпуска</p>
                <p className="text-sm">{gpu.releaseDate}</p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <p className="text-xs text-muted-foreground">Шина</p>
            <p className="text-sm">{gpu.bus}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Расположение</p>
            <p className="text-sm font-mono">{gpu.location}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p>Память</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Объем</p>
                <p className="text-sm">{gpu.memSize} МБ</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Тип</p>
                <p className="text-sm">{gpu.memType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Производитель</p>
                <p className="text-sm">{gpu.memVendor}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Шина памяти</p>
                <p className="text-sm">{gpu.memBusWidth} бит</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Драйвер</p>
            <div className="space-y-1">
              <p className="text-sm break-all">{gpu.driverVersion}</p>
              <p className="text-xs text-muted-foreground">{gpu.driverDate}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
