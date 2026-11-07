import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertTriangle, CheckCircle2, Info, Loader2, Upload, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatApiErrors } from "@/lib/api";
import {
  commitImportBatch,
  fetchImportBatch,
  updateImportBatchRow,
  type ImportBatch,
  type ImportBatchError,
  type ImportBatchRow,
} from "@/lib/pvLeadCrmApi";
import { CRM_CURRENT_FORMAT_HEADERS } from "@/lib/crmImportFormat";

const EDITABLE_FIELDS = [
  "CUSTOMER NAME",
  "PHONE",
  "MODEL",
  "SALES CONSULTANT",
  "LEAD SOURCE",
  "MAIL ID",
  "LOCATION",
] as const;

const WARNING_CODES = new Set(["duplicate_lead", "warning"]);

function isBlockingIssue(issue: ImportBatchError): boolean {
  const code = String(issue.code || "").toLowerCase();
  return !WARNING_CODES.has(code);
}

function rowBlockingIssues(row: ImportBatchRow): ImportBatchError[] {
  return (row.issues || []).filter(isBlockingIssue);
}

function rowInfoIssues(row: ImportBatchRow): ImportBatchError[] {
  return (row.issues || []).filter((i) => !isBlockingIssue(i));
}

function draftsDifferFromRow(row: ImportBatchRow, draft: Record<string, string> | undefined): boolean {
  if (!draft || !Object.keys(draft).length) return false;
  for (const field of EDITABLE_FIELDS) {
    const header = CRM_CURRENT_FORMAT_HEADERS.find((h) => h.toUpperCase() === field || h === field) || field;
    const rawVal = String(row.rawData?.[header] ?? row.rawData?.[field] ?? "").trim();
    const draftVal = String(draft[header] ?? draft[field] ?? "").trim();
    if (draftVal && draftVal !== rawVal) return true;
  }
  return false;
}

type ReviewTab = "needs_fix" | "ready" | "all";

export default function AdminImportReview() {
  const { batchId } = useParams<{ batchId: string }>();
  const navigate = useNavigate();
  const [batch, setBatch] = useState<ImportBatch | null>(null);
  const [rows, setRows] = useState<ImportBatchRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingRow, setSavingRow] = useState<number | null>(null);
  const [committing, setCommitting] = useState(false);
  const [drafts, setDrafts] = useState<Record<number, Record<string, string>>>({});
  const [tab, setTab] = useState<ReviewTab>("needs_fix");

  const load = useCallback(async () => {
    if (!batchId) return;
    setLoading(true);
    try {
      const data = await fetchImportBatch(batchId);
      setBatch(data.batch);
      setRows(data.rows);
      const initial: Record<number, Record<string, string>> = {};
      for (const row of data.rows) {
        initial[row.rowNumber] = { ...(row.corrections || {}) };
      }
      setDrafts(initial);
    } catch (e) {
      toast.error(formatApiErrors(e));
    } finally {
      setLoading(false);
    }
  }, [batchId]);

  useEffect(() => {
    void load();
  }, [load]);

  const errorCount = useMemo(() => rows.filter((r) => r.status === "error").length, [rows]);
  const readyCount = useMemo(
    () => rows.filter((r) => r.status === "valid" || r.status === "corrected").length,
    [rows],
  );
  const skippedCount = useMemo(() => rows.filter((r) => r.status === "skipped").length, [rows]);

  const willCreate = batch?.summary?.willCreate ?? 0;
  const willUpdate = batch?.summary?.willUpdate ?? 0;

  const filteredRows = useMemo(() => {
    if (tab === "all") return rows;
    if (tab === "needs_fix") return rows.filter((r) => r.status === "error");
    return rows.filter((r) => r.status === "valid" || r.status === "corrected");
  }, [rows, tab]);

  const saveRow = async (row: ImportBatchRow) => {
    if (!batchId) return;
    setSavingRow(row.rowNumber);
    try {
      const corrections = drafts[row.rowNumber] || {};
      const updated = await updateImportBatchRow(batchId, row.rowNumber, corrections);
      setRows((prev) => prev.map((r) => (r.rowNumber === row.rowNumber ? updated : r)));
      if (updated.status === "error") {
        toast.warning(
          `Row ${row.rowNumber} still has errors. Nothing was written to Lead CRM — fix fields and save again.`,
        );
      } else {
        toast.success(
          `Row ${row.rowNumber} passed checks and is staged. Press Final Upload to create/update leads in CRM.`,
        );
      }
      await load();
    } catch (e) {
      toast.error(formatApiErrors(e));
    } finally {
      setSavingRow(null);
    }
  };

  const handleCommit = async () => {
    if (!batchId) return;
    setCommitting(true);
    try {
      const result = await commitImportBatch(batchId);
      const failed = result.results.failed?.length ?? 0;
      toast.success(
        `CRM updated: ${result.results.created ?? 0} new lead(s), ${result.results.updated ?? 0} updated` +
          (failed ? `, ${failed} failed` : ""),
      );
      navigate("/admin/crm/leads");
    } catch (e) {
      toast.error(formatApiErrors(e));
    } finally {
      setCommitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-muted-foreground">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading import review…
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold flex items-center gap-2">
            <Upload className="w-6 h-6 text-primary" /> Bulk import review
          </h1>
          <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
            {batch?.fileName || "Upload"} — this screen <strong>does not</strong> change Lead CRM until you press{" "}
            <strong>Final Upload</strong>. &quot;Apply fixes&quot; only updates this staging copy and re-runs validation.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button variant="outline" onClick={() => navigate("/admin/crm/leads")}>
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to CRM
          </Button>
          <Button
            disabled={committing || errorCount > 0 || batch?.status !== "review"}
            onClick={() => void handleCommit()}
            title={
              errorCount > 0
                ? `Fix ${errorCount} error row(s) before Final Upload`
                : `Import ${willCreate} new + update ${willUpdate} existing`
            }
          >
            {committing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2" />
            )}
            Final Upload
          </Button>
        </div>
      </div>

      <Card className="p-4 space-y-3 border-primary/20 bg-primary/5">
        <p className="text-sm font-medium flex items-center gap-2">
          <Info className="w-4 h-4 text-primary shrink-0" />
          What happens when you click each button
        </p>
        <ul className="text-sm text-muted-foreground space-y-1.5 list-disc pl-5">
          <li>
            <strong className="text-foreground">Apply fixes</strong> — saves your edits to this import batch and
            re-validates the row. CRM leads are <em>not</em> created or updated yet.
          </li>
          <li>
            <strong className="text-foreground">Final Upload</strong> — writes ready rows to Lead CRM (
            <span className="text-emerald-700">{willCreate} expected new</span>,{" "}
            <span className="text-sky-700">{willUpdate} expected updates</span>
            {skippedCount ? `, ${skippedCount} skipped` : ""}).
          </li>
          <li>
            <strong className="text-foreground">Blue notes</strong> (e.g. &quot;Existing lead PVLEAD… will be updated&quot;)
            are informational — they do not block import.
          </li>
        </ul>
      </Card>

      <Card className="p-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <span>
          Total rows: <strong>{batch?.summary?.total ?? rows.length}</strong>
        </span>
        <span className="text-emerald-600">
          Ready for CRM: <strong>{readyCount}</strong>
        </span>
        <span className="text-sky-700">
          Will create: <strong>{willCreate}</strong>
        </span>
        <span className="text-sky-900">
          Will update: <strong>{willUpdate}</strong>
        </span>
        {skippedCount > 0 ? (
          <span className="text-muted-foreground">
            Skipped (blank / notes): <strong>{skippedCount}</strong>
          </span>
        ) : null}
        <span className="text-red-600">
          Must fix: <strong>{errorCount}</strong>
        </span>
        <span>
          Batch: <Badge variant="outline">{batch?.status}</Badge>
        </span>
      </Card>

      <Tabs value={tab} onValueChange={(v) => setTab(v as ReviewTab)}>
        <TabsList>
          <TabsTrigger value="needs_fix">Must fix ({errorCount})</TabsTrigger>
          <TabsTrigger value="ready">Ready ({readyCount})</TabsTrigger>
          <TabsTrigger value="all">All ({rows.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-4">
          {filteredRows.length === 0 ? (
            <Card className="p-6 text-center text-muted-foreground text-sm">
              {tab === "needs_fix"
                ? "No blocking errors — you can use Final Upload."
                : "No rows in this view."}
            </Card>
          ) : (
            filteredRows.map((row) => {
              const blocking = rowBlockingIssues(row);
              const infos = rowInfoIssues(row);
              const dirty = draftsDifferFromRow(row, drafts[row.rowNumber]);
              const canSave = row.status === "error" || dirty;

              return (
                <Card key={row._id} className="p-4 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium flex flex-wrap items-center gap-2">
                      Excel row {row.rowNumber}
                      {row.status === "error" ? (
                        <Badge variant="destructive">Must fix</Badge>
                      ) : row.status === "skipped" ? (
                        <Badge variant="outline">Skipped</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-800">
                          Ready
                        </Badge>
                      )}
                      {row.status === "corrected" ? (
                        <Badge variant="outline" className="text-xs">
                          Edited in review
                        </Badge>
                      ) : null}
                    </div>
                    {canSave ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={savingRow === row.rowNumber}
                        onClick={() => void saveRow(row)}
                      >
                        {savingRow === row.rowNumber ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          "Apply fixes"
                        )}
                      </Button>
                    ) : (
                      <span className="text-xs text-muted-foreground">No pending edits</span>
                    )}
                  </div>

                  {blocking.map((err, idx) => (
                    <div key={`e-${idx}`} className="text-sm text-red-600 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        <strong className="font-medium">Error:</strong> {err.message || err.code}
                        {err.field ? ` (${err.field})` : ""}
                      </span>
                    </div>
                  ))}

                  {infos.map((info, idx) => (
                    <div
                      key={`w-${idx}`}
                      className="text-sm text-sky-800 bg-sky-500/10 border border-sky-500/20 rounded-md px-3 py-2 flex items-start gap-2"
                    >
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>
                        <strong className="font-medium">On Final Upload:</strong> {info.message || info.code}
                      </span>
                    </div>
                  ))}

                  {row.status !== "skipped" ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {EDITABLE_FIELDS.map((field) => {
                        const header =
                          CRM_CURRENT_FORMAT_HEADERS.find((h) => h.toUpperCase() === field || h === field) || field;
                        const rawVal = String(row.rawData?.[header] ?? row.rawData?.[field] ?? "");
                        const val = drafts[row.rowNumber]?.[header] ?? drafts[row.rowNumber]?.[field] ?? rawVal;
                        return (
                          <div key={field}>
                            <label className="text-xs text-muted-foreground">{field}</label>
                            <Input
                              value={val}
                              disabled={row.status === "skipped"}
                              onChange={(e) =>
                                setDrafts((prev) => ({
                                  ...prev,
                                  [row.rowNumber]: {
                                    ...(prev[row.rowNumber] || {}),
                                    [header]: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">{row.message || "Row skipped during validation."}</p>
                  )}
                </Card>
              );
            })
          )}
        </TabsContent>
      </Tabs>

      {errorCount === 0 && batch?.status === "review" ? (
        <Card className="p-6 text-center text-sm">
          <p className="text-muted-foreground">
            All {readyCount} lead row(s) are staged.{" "}
            <strong className="text-foreground">
              Final Upload will create {willCreate} and update {willUpdate}
            </strong>{" "}
            in Lead CRM (plus skip {skippedCount} non-lead rows).
          </p>
        </Card>
      ) : null}
    </div>
  );
}
