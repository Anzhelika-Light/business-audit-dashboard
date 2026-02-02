import type { Audit } from "../types/audit";

export const downloadCSV = (data: Audit[], filename: string) => {
  const headers = "ID;Name;Status;Risk;Budget\n";

  const rows = data
    .map(
      (a) =>
        `${a.id};${a.name};${a.status};${a.risk};${a.budget.replace(
          ",",
          "."
        )}\n`
    )
    .join("");

  const csvContent = headers + rows;

  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
