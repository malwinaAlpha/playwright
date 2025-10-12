import { expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventory_page";

export async function expectCartCount(
  inventoryPage: InventoryPage,
  count: string
) {
  await expect(inventoryPage.shoppingCartBadge).toHaveText(count);
}

// 💡 Next steps you can try:

// Create a login helper to log in as a standard user.

// Use your expectCartCount helper in another test to see it in action.

// Start adding more assertion helpers for things you repeat often (like error messages, totals, or page state).
