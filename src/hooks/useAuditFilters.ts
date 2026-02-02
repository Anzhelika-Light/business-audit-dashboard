import { useState, useMemo } from "react";
import type { Audit } from "../types/audit";

export const useAuditFilters = (initialAudits: Audit[]) => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Dashboard");  
  const filteredAudits = useMemo(() => {
    return initialAudits.filter((audit) => {
      const matchesSearch = audit.name.toLowerCase().includes(search.toLowerCase());
      const matchesRisk = riskFilter === "All" || audit.risk === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [initialAudits, search, riskFilter]);

  const chartData = useMemo(() => {
    return filteredAudits.map((a) => ({
      name: a.name,
      budget: Number(a.budget.replace(/[^0-9.-]+/g, "")),
    }));
  }, [filteredAudits]);

  return {
    search,
    setSearch,
    riskFilter,
    setRiskFilter,
    filteredAudits,
    chartData,
    activeTab,
    setActiveTab,
  };
};