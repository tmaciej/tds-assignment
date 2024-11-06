import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import CurrencySelect, { CurrencySelectProps } from "./CurrencySelect";

// Mock scroll into view fn
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

const currencies: CurrencySelectProps["currencies"] = [
  {
    id: 147,
    name: "US Dollar",
    short_code: "USD",
    code: "840",
    precision: 2,
    subunit: 100,
    symbol: "$",
    symbol_first: true,
    decimal_mark: ".",
    thousands_separator: ",",
  },
  {
    id: 46,
    name: "Euro",
    short_code: "EUR",
    code: "978",
    precision: 2,
    subunit: 100,
    symbol: "\u20ac",
    symbol_first: true,
    decimal_mark: ",",
    thousands_separator: ".",
  },
];

describe("Currency Select component", () => {
  afterEach(cleanup);

  it("renders a Combobox for selecting currencies", () => {
    const [USD] = currencies;
    const onCurrencyChange = vi.fn();
    const { getByRole } = render(
      <CurrencySelect
        currencies={currencies}
        value={null}
        onCurrencyChange={onCurrencyChange}
      />
    );

    // Get the trigger button
    const button = getByRole("combobox");

    // Click the button to open list of currencies
    fireEvent.click(button);

    // Get the USD option
    const usdOption = getByRole("option", { name: USD.name });

    // Click the USD option to select it
    fireEvent.click(usdOption);

    // Check if callback was called with correct value
    expect(onCurrencyChange).toHaveBeenCalledWith(USD.short_code);
  });

  it("allows for currency searching in combobox", () => {
    const [USD, EUR] = currencies;
    const { getByRole, getByPlaceholderText, queryByRole, queryByText } =
      render(<CurrencySelect currencies={currencies} value={null} />);

    // Get the trigger button
    const button = getByRole("combobox");

    // Click the button to open search bar
    fireEvent.click(button);

    // Get the search input
    const searchInput = getByPlaceholderText("Search currency...");

    // Search for USD
    fireEvent.change(searchInput, {
      target: {
        value: USD.name.slice(0, 4),
      },
    });

    const usdOption = queryByRole("option", { name: USD.name });
    const euroOption = queryByRole("option", { name: EUR.name });

    // USD option should be visible
    expect(usdOption).not.toBe(null);

    // EUR option should not be visible
    expect(euroOption).toBe(null);

    // Search for non existing currency and check if empty state is rendered
    fireEvent.change(searchInput, {
      target: {
        value: "nonexistingcurrencyname",
      },
    });

    const emptyStateElement = queryByText("No currencies found.");
    expect(emptyStateElement).not.toBe(null);
  });
});
