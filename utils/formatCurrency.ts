// src/utils/formatCurrency.ts
export function formatCurrency(value: any): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(value)
      .replace(/\sVND$/, " VND");
  }
  