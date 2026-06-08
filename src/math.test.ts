import { describe, it, expect } from "vitest";

const sum = (a: number, b: number) => a + b;

describe("our first function test", () => {
  it("have to add two numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
