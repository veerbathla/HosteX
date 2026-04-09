import Badge from "../../../components/ui/Badge";
import Card from "../../../components/ui/Card";

export function GatekeeperPage({ children }) {
  return <div className="min-h-screen bg-gray-50 p-1">{children}</div>;
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wide text-green-700">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-3xl font-semibold text-gray-950">{title}</h1>
        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-500">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
    </header>
  );
}

export function GateCard({ children, className = "" }) {
  return (
    <Card
      className={`border-gray-200 bg-white shadow-sm transition duration-200 ease-in-out hover:shadow-md ${className}`}
    >
      {children}
    </Card>
  );
}

export function GateStatCard({ label, value, helper, icon, tone = "green" }) {
  const tones = {
    green: "text-green-700 bg-green-50 border-green-100",
    blue: "text-blue-700 bg-blue-50 border-blue-100",
    amber: "text-amber-700 bg-amber-50 border-amber-100",
    red: "text-red-700 bg-red-50 border-red-100",
    gray: "text-gray-700 bg-gray-50 border-gray-200",
  };

  return (
    <GateCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <h3 className="mt-3 text-4xl font-semibold leading-none text-gray-950">
            {value}
          </h3>
        </div>
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl border ${tones[tone]}`}
        >
          {icon}
        </div>
      </div>
      {helper && <p className="mt-4 text-sm font-medium text-gray-500">{helper}</p>}
    </GateCard>
  );
}

export function StatusBadge({ status }) {
  const meta = {
    inside: { label: "Inside", type: "success" },
    outside: { label: "Outside", type: "warning" },
    pending: { label: "Pending", type: "error" },
    collected: { label: "Collected", type: "success" },
    damaged: { label: "Damaged", type: "warning" },
    open: { label: "Open", type: "warning" },
    resolved: { label: "Resolved", type: "success" },
    exited: { label: "Exited", type: "neutral" },
    alert: { label: "Alert", type: "error" },
    ok: { label: "Clear", type: "success" },
  };

  const item = meta[status] || { label: status, type: "neutral" };
  return <Badge type={item.type}>{item.label}</Badge>;
}

export function GateTable({ columns, children, footer }) {
  return (
    <GateCard className="overflow-hidden p-0">
      <div
        className="hidden bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 lg:grid"
        style={{ gridTemplateColumns: columns }}
      >
        {children.header}
      </div>
      <div className="divide-y divide-gray-100">{children.rows}</div>
      {footer && <div className="border-t border-gray-100 px-6 py-4">{footer}</div>}
    </GateCard>
  );
}
