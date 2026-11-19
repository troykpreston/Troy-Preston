/**
 * Architecture & workflow diagrams, rendered by <Diagram> in the site's own
 * visual language (no Mermaid runtime).
 *
 * Source: _docs/detailsmd. Node labels come from the supplied Mermaid
 * diagrams; connections were reconstructed from each section's text.
 *
 * basis:
 *   "documented" — grounded in implementation details (Fund Clarity, BD Clarity)
 *   "logical"    — logical structure inferred from product scope; NOT as-built infrastructure
 *   "conceptual" — proposed architecture; components still to be confirmed
 *
 * Node kinds map to the diagram palette:
 *   interface → graphite · service → sapphire · integration → champagne · data · actor
 */

export type NodeKind = "actor" | "interface" | "service" | "data" | "integration";

export type DiagramNode = { id: string; label: string; kind: NodeKind };

export type Diagram = {
  title: string;
  basis: "documented" | "logical" | "conceptual";
  /** Each layer is one row on desktop; rows stack top → bottom. */
  layers: DiagramNode[][];
  /** [from, to] — connect adjacent layers, or neighbours in the same layer. */
  edges: [string, string][];
};

const n = (id: string, label: string, kind: NodeKind): DiagramNode => ({ id, label, kind });

export const diagrams: Record<string, Diagram> = {
  "fund-clarity": {
    title: "System architecture",
    basis: "documented",
    layers: [
      [n("users", "Fund managers · Finance · Administrators", "actor")],
      [n("web", "React + TypeScript web application", "interface")],
      [n("api", "Python API · Azure Functions", "service")],
      [
        n("roles", "Role & reporting-period controls", "service"),
        n("calc", "Financial calculation services", "service"),
        n("domain", "Investor · Loan · Product services", "service"),
        n("csv", "CSV import & validation", "integration"),
        n("report", "Reporting & export", "service"),
      ],
      [n("sql", "Azure SQL Database", "data")],
    ],
    edges: [
      ["users", "web"],
      ["web", "api"],
      ["api", "roles"],
      ["api", "calc"],
      ["api", "domain"],
      ["api", "csv"],
      ["api", "report"],
      ["roles", "sql"],
      ["calc", "sql"],
      ["domain", "sql"],
      ["csv", "sql"],
      ["report", "sql"],
    ],
  },

  "bd-clarity": {
    title: "Data pipeline",
    basis: "documented",
    layers: [
      [n("sources", "External research sources", "actor"), n("sched", "Power Automate scheduler", "integration")],
      [n("disc", "Azure Functions — discovery", "service")],
      [n("blob", "Azure Blob Storage", "data"), n("parse", "Parsing & normalization", "service")],
      [n("match", "Target / alias matching", "service"), n("runs", "Runs / checkpoints", "service")],
      [n("sql", "Azure SQL Database", "data"), n("sp", "SharePoint integration", "integration")],
      [n("dash", "BD Clarity web dashboard", "interface")],
    ],
    edges: [
      ["sources", "disc"],
      ["sched", "disc"],
      ["disc", "blob"],
      ["blob", "parse"],
      ["parse", "match"],
      ["parse", "runs"],
      ["match", "sql"],
      ["runs", "sql"],
      ["sql", "sp"],
      ["sql", "dash"],
    ],
  },


  aether: {
    title: "Agent orchestration",
    basis: "conceptual",
    layers: [
      [n("editor", "Visual workflow editor", "interface")],
      [n("def", "Workflow definition", "service")],
      [n("orch", "Orchestration layer", "service")],
      [
        n("ai", "AI model integration", "integration"),
        n("tools", "External tools / APIs", "integration"),
        n("state", "Execution state", "data"),
      ],
      [n("mon", "Execution monitoring", "interface")],
    ],
    edges: [
      ["editor", "def"],
      ["def", "orch"],
      ["orch", "ai"],
      ["orch", "tools"],
      ["orch", "state"],
      ["state", "mon"],
    ],
  },

  "id-verify": {
    title: "Verification pipeline",
    basis: "logical",
    layers: [
      [n("sdk", "Android SDK / client application", "interface")],
      [n("capture", "Document & selfie capture", "service")],
      [n("quality", "Image quality checks", "service")],
      [n("doc", "Document analysis — OCR / MRZ", "service"), n("face", "Face detection & processing", "service")],
      [n("pad", "Presentation attack detection", "service"), n("match", "Face matching", "service")],
      [n("decision", "Verification decision", "service")],
      [n("audit", "Session & audit records", "data")],
    ],
    edges: [
      ["sdk", "capture"],
      ["capture", "quality"],
      ["quality", "doc"],
      ["quality", "face"],
      ["face", "pad"],
      ["face", "match"],
      ["doc", "match"],
      ["pad", "decision"],
      ["match", "decision"],
      ["decision", "audit"],
    ],
  },

  telebook: {
    title: "Access workflow",
    basis: "logical",
    layers: [
      [n("web", "Web management", "interface"), n("mobile", "Mobile experience", "interface")],
      [n("api", "Application API", "service")],
      [
        n("booking", "Booking service", "service"),
        n("visitor", "Visitor management", "service"),
        n("pass", "Digital pass / QR", "service"),
        n("roles", "Roles & permissions", "service"),
      ],
      [n("db", "Application database", "data"), n("access", "Access event integration", "integration")],
    ],
    edges: [
      ["web", "api"],
      ["mobile", "api"],
      ["api", "booking"],
      ["api", "visitor"],
      ["api", "pass"],
      ["api", "roles"],
      ["booking", "db"],
      ["visitor", "db"],
      ["roles", "db"],
      ["pass", "access"],
    ],
  },

  tavola: {
    title: "Operational workflow",
    basis: "logical",
    layers: [
      [
        n("pos", "POS / order entry", "interface"),
        n("orders", "Order management", "service"),
        n("kitchen", "Kitchen workflow", "service"),
      ],
      [
        n("payment", "Payment processing", "integration"),
        n("inventory", "Inventory updates", "service"),
        n("analytics", "Sales & analytics", "interface"),
      ],
      [n("db", "Operational database", "data")],
    ],
    edges: [
      ["pos", "orders"],
      ["orders", "kitchen"],
      ["kitchen", "payment"],
      ["payment", "inventory"],
      ["inventory", "analytics"],
      ["inventory", "db"],
      ["analytics", "db"],
    ],
  },

  evalis: {
    title: "Examination lifecycle",
    basis: "logical",
    layers: [
      [
        n("author", "Question authoring", "interface"),
        n("bank", "Question bank", "data"),
        n("config", "Exam configuration", "service"),
        n("schedule", "Scheduling", "service"),
      ],
      [
        n("session", "Candidate session", "interface"),
        n("monitor", "Monitoring", "service"),
        n("grading", "Grading", "service"),
        n("results", "Results & analytics", "interface"),
      ],
    ],
    edges: [
      ["author", "bank"],
      ["bank", "config"],
      ["config", "schedule"],
      ["schedule", "session"],
      ["session", "monitor"],
      ["monitor", "grading"],
      ["grading", "results"],
    ],
  },

  aura: {
    title: "Booking workflow",
    basis: "logical",
    layers: [
      [
        n("search", "Destination search", "interface"),
        n("details", "Package / hotel details", "interface"),
        n("avail", "Availability & pricing", "service"),
        n("request", "Booking request", "service"),
      ],
      [
        n("checkout", "Checkout", "interface"),
        n("payment", "Payment provider", "integration"),
        n("confirm", "Booking confirmation", "service"),
        n("admin", "Admin management", "interface"),
      ],
    ],
    edges: [
      ["search", "details"],
      ["details", "avail"],
      ["avail", "request"],
      ["request", "checkout"],
      ["checkout", "payment"],
      ["payment", "confirm"],
      ["confirm", "admin"],
    ],
  },

  forme: {
    title: "Commerce workflow",
    basis: "logical",
    layers: [
      [
        n("store", "Storefront", "interface"),
        n("catalog", "Product catalog", "service"),
        n("cart", "Shopping cart", "service"),
        n("checkout", "Checkout", "interface"),
      ],
      [
        n("payment", "Payment integration", "integration"),
        n("orders", "Order management", "service"),
        n("inventory", "Inventory", "data"),
        n("admin", "Admin dashboard", "interface"),
      ],
    ],
    edges: [
      ["store", "catalog"],
      ["catalog", "cart"],
      ["cart", "checkout"],
      ["checkout", "payment"],
      ["payment", "orders"],
      ["orders", "inventory"],
      ["admin", "inventory"],
    ],
  },

};
