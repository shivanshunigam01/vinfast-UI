import { useCallback, useEffect, useState } from "react";
import { Car, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  fetchBookingAvailableVehicles,
  type BookingFleetMeta,
  type BookingFleetVehicle,
} from "@/lib/tdLogApi";

function fleetUnavailableLabel(reason?: string | null): string {
  switch (reason) {
    case "booked_same_slot":
      return "In use for this slot";
    case "locked":
      return "Locked";
    case "unavailable_until_later":
      return "Unavailable until later";
    default:
      if (reason?.startsWith("status_")) return reason.replace("status_", "").replace(/_/g, " ");
      return reason ? reason.replace(/_/g, " ") : "Not assignable";
  }
}

type Props = {
  bookingId: string;
  preferredModel?: string;
  branchName?: string;
  terminal?: boolean;
  canAssign: boolean;
  saving?: boolean;
  currentVehicleLabel?: string | null;
  onAssign: (vehicleId: string) => Promise<void>;
};

/** Slot-aware demo fleet list + vehicle assignment (TD Bookings & My Test Drives). */
export function TdBookingDemoFleetPanel({
  bookingId,
  preferredModel,
  branchName,
  terminal = false,
  canAssign,
  saving = false,
  currentVehicleLabel,
  onAssign,
}: Props) {
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [availableVehicles, setAvailableVehicles] = useState<BookingFleetVehicle[]>([]);
  const [fleetMeta, setFleetMeta] = useState<BookingFleetMeta | null>(null);
  const [assignVehicleId, setAssignVehicleId] = useState("");

  const loadAvailableVehicles = useCallback(async () => {
    if (!bookingId) {
      setAvailableVehicles([]);
      setFleetMeta(null);
      return;
    }
    setVehiclesLoading(true);
    try {
      const { vehicles, meta } = await fetchBookingAvailableVehicles(bookingId);
      setAvailableVehicles(vehicles);
      setFleetMeta(meta);
    } catch {
      setAvailableVehicles([]);
      setFleetMeta(null);
    } finally {
      setVehiclesLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    void loadAvailableVehicles();
  }, [loadAvailableVehicles]);

  return (
    <>
      <div className="rounded-lg border border-blue-500/25 bg-blue-500/5 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Demo fleet for this slot</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Based on branch slot config, model master, and the customer&apos;s booked date/time. Check which demo cars you
          can assign before allocating an executive.
        </p>
        {vehiclesLoading ? (
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading fleet…
          </p>
        ) : fleetMeta ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <div className="rounded-md border border-border/50 bg-background/60 px-2.5 py-2">
              <p className="text-muted-foreground">Model</p>
              <p className="font-medium">{fleetMeta.model || preferredModel || "—"}</p>
              {fleetMeta.variant ? (
                <p className="text-[10px] text-muted-foreground">Trim: {fleetMeta.variant}</p>
              ) : null}
            </div>
            <div className="rounded-md border border-border/50 bg-background/60 px-2.5 py-2">
              <p className="text-muted-foreground">Branch</p>
              <p className="font-medium">{fleetMeta.branchName || branchName || "—"}</p>
            </div>
            <div className="rounded-md border border-border/50 bg-background/60 px-2.5 py-2">
              <p className="text-muted-foreground">Slot capacity</p>
              <p className="font-medium">
                {fleetMeta.fleetCapacity ?? 0} car(s) · {fleetMeta.slotBookingsAtTime ?? 0} booking(s) at this time
              </p>
            </div>
            <div className="rounded-md border border-border/50 bg-background/60 px-2.5 py-2">
              <p className="text-muted-foreground">Assignable now</p>
              <p className="font-medium text-green-600 dark:text-green-400">
                {fleetMeta.assignableCount ?? 0} of {fleetMeta.fleetTotalForModel ?? 0}
              </p>
            </div>
          </div>
        ) : null}
        {!vehiclesLoading && availableVehicles.length === 0 ? (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            No demo fleet tagged for this model at the branch — add cars under Demo Fleet / Model Master, or reschedule to
            another slot.
          </p>
        ) : null}
        {!vehiclesLoading && availableVehicles.length > 0 ? (
          <div className="rounded-md border border-border/50 overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="text-left font-medium px-2 py-1.5">Registration</th>
                  <th className="text-left font-medium px-2 py-1.5">Model / trim</th>
                  <th className="text-left font-medium px-2 py-1.5">Status</th>
                  <th className="text-left font-medium px-2 py-1.5">For this slot</th>
                </tr>
              </thead>
              <tbody>
                {availableVehicles.map((v) => (
                  <tr key={v._id} className="border-t border-border/40">
                    <td className="px-2 py-1.5 font-medium">{v.registrationNo}</td>
                    <td className="px-2 py-1.5">
                      {v.model}
                      {v.variant ? ` · ${v.variant}` : ""} · {v.batteryPercent}%
                    </td>
                    <td className="px-2 py-1.5">{v.status}</td>
                    <td className="px-2 py-1.5">
                      {v.assignable !== false ? (
                        <span className="text-green-600 dark:text-green-400">Can assign</span>
                      ) : (
                        <span className="text-amber-600 dark:text-amber-400">
                          {fleetUnavailableLabel(v.unavailableReason)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div className="rounded-lg border border-border/50 bg-muted/20 p-4 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Assign demo vehicle</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Pick a demo car free for this slot, then assign the sales executive.
        </p>
        {currentVehicleLabel ? (
          <p className="text-xs text-foreground">
            Current: <span className="font-medium">{currentVehicleLabel}</span>
          </p>
        ) : null}
        <div className="space-y-2">
          <Label className="text-xs">Available demo fleet ({preferredModel || "all"})</Label>
          {canAssign ? (
            <>
              {vehiclesLoading ? (
                <p className="text-xs text-muted-foreground flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading vehicles…
                </p>
              ) : (
                <Select value={assignVehicleId || "none"} onValueChange={(v) => setAssignVehicleId(v === "none" ? "" : v)}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Choose demo vehicle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Select vehicle —</SelectItem>
                    {availableVehicles
                      .filter((v) => v.assignable !== false)
                      .map((v) => (
                        <SelectItem key={v._id} value={v._id}>
                          {v.registrationNo} · {v.model} {v.variant} · {v.status} · {v.batteryPercent}%
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}
              {availableVehicles.length === 0 && !vehiclesLoading ? (
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  No demo vehicle available for this model — reschedule the customer to another date/time.
                </p>
              ) : null}
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                disabled={saving || !assignVehicleId || terminal}
                onClick={async () => {
                  if (!assignVehicleId) return;
                  await onAssign(assignVehicleId);
                  setAssignVehicleId("");
                  await loadAvailableVehicles();
                }}
              >
                <Car className="w-4 h-4 mr-2" /> Save vehicle assignment
              </Button>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">{currentVehicleLabel ? `${currentVehicleLabel} · view only` : "Not assigned · view only"}</p>
          )}
        </div>
      </div>
    </>
  );
}
