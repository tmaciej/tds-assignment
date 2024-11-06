import { test, expect } from "@playwright/test";

test("should be able to convert from USD to PLN and other way around", async ({
  page,
}) => {
  // Go to home page
  await page.goto("/");

  // Click the source currency select button
  await page.locator("button").filter({ hasText: "From..." }).click();

  // Search for US Dollar in list of currencies
  await page.getByPlaceholder("Search currency...").fill("usd");

  // Select US Dollar as a source currency
  await page.getByRole("option", { name: "US Dollar" }).click();

  // Check if button with selected source currency is visible
  await expect(
    page.locator("button").filter({ hasText: "US Dollar" })
  ).toBeVisible();

  // Click the target currency select button
  await page.locator("button").filter({ hasText: "To..." }).click();

  // Search for Euro in list of currencies
  await page.getByPlaceholder("Search currency...").fill("eur");

  // Select Euro as a target currency
  await page.getByRole("option", { name: "Euro" }).click();

  // Check if button with selected target currency is visible
  const euroButton = page.locator("button").filter({ hasText: "Euro" });
  await expect(euroButton).toBeVisible();

  // Click target currency button again to change it
  await euroButton.click();

  // Search for Polish Zloty in list of currencies
  await page.getByPlaceholder("Search currency...").fill("zlo");

  // Select Zloty as a target currency
  await page.getByRole("option", { name: "Zloty" }).click();

  // Enter amount
  await page.getByPlaceholder("Enter amount").fill("1000");

  // The following "getByText" tests may seem indeterministic but the exchange rate
  // of USD to PLN should realistically never be outside of 0.1-1 range

  // Check if we can see the result
  await expect(page.getByText(/\d,\d{3}\.?\d{0,2}/)).toBeVisible();

  // Click the swap direction button
  await page.locator("button").filter({ hasText: "Swap Direction" }).click();

  // Check if we can see the the result
  await expect(page.getByText(/\d{3}\.?\d{0,2}/)).toBeVisible();
});
