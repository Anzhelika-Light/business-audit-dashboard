// @vitest-environment jsdom

import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuditFilters } from "./useAuditFilters";
import type { Audit } from "../types/audit";

// 1. Готуємо фейкові дані для тесту
// Оновлені тестові дані, які містять усі обов'язкові поля типу Audit
const mockAudits: Audit[] = [
  {
    id: 1,
    name: "Internal Financial Audit",
    risk: "High",
    budget: "$10,000",
    status: "In Progress", // або який у вас тип, наприклад 'Open' / 'Closed'
    details: "Some financial details",
  },
  {
    id: 2,
    name: "Cybersecurity Review",
    risk: "Medium",
    budget: "€5,500.50",
    status: "Completed",
    details: "Security check details",
  },
  {
    id: 3,
    name: "Tax Compliance",
    risk: "Low",
    budget: "2,000",
    status: "In Progress",
    details: "Tax documents review",
  },
];
describe("useAuditFilters Hook", () => {
  it("має повертати всі аудити за замовчуванням", () => {
    const { result } = renderHook(() => useAuditFilters(mockAudits));

    expect(result.current.filteredAudits).toHaveLength(3);
  });

  it("має правильно фільтрувати аудити за пошуковим рядком (без урахування регістру)", () => {
    const { result } = renderHook(() => useAuditFilters(mockAudits));

    // Імітуємо введення користувачем тексту "cyber"
    act(() => {
      result.current.setSearch("cyber");
    });

    expect(result.current.filteredAudits).toHaveLength(1);
    expect(result.current.filteredAudits[0].name).toBe("Cybersecurity Review");
  });

  it("має правильно фільтрувати аудити за рівнем ризику", () => {
    const { result } = renderHook(() => useAuditFilters(mockAudits));

    // Імітуємо вибір ризику "High"
    act(() => {
      result.current.setRiskFilter("High");
    });

    expect(result.current.filteredAudits).toHaveLength(1);
    expect(result.current.filteredAudits[0].risk).toBe("High");
  });

  it("має правильно парсити бюджет у числа для chartData", () => {
    const { result } = renderHook(() => useAuditFilters(mockAudits));

    // Перевіряємо, чи регулярний вираз очистив знаки $ та €
    expect(result.current.chartData[0].budget).toBe(10000);
    expect(result.current.chartData[1].budget).toBe(5500.5);
  });
});
