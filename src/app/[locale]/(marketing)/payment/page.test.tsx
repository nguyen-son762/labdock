import PaymentPage from "./page";
import PaymentSuccessPage from "./success/page";

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: () => {
    throw new Error("Redirect /checkout");
  },
}));
const valid = { method: "paynow", reference: "PAY-ABC12345", amount: "99.50" };
describe("Payment route URL validation", () => {
  it("PAY-001 passes a well-formed payment session to the screen", async () => {
    const result = await PaymentPage({ searchParams: Promise.resolve(valid) });
    expect(result.props).toMatchObject({ method: "paynow", paymentReference: "PAY-ABC12345", amount: 99.5 });
  });
  it.each([
    ["PAY-002", { reference: undefined }],
    ["PAY-003", { reference: "PAY-abc12345" }],
    ["PAY-004", { reference: "PAY-ABC1234" }],
    ["PAY-005", { amount: "0" }],
    ["PAY-006", { amount: "-1" }],
    ["PAY-007", { amount: "NaN" }],
    ["PAY-008", { amount: "Infinity" }],
    ["PAY-009", { amount: undefined }],
  ])("%s rejects a malformed payment query %j", async (_id, values) => {
    await expect(PaymentPage({ searchParams: Promise.resolve({ ...valid, ...values }) })).rejects.toThrow(
      "Redirect /checkout",
    );
  });
  it.each([undefined, "card"])("PAY-010 defaults unsupported method %s to paynow", async (method) => {
    const result = await PaymentPage({ searchParams: Promise.resolve({ ...valid, method }) });
    expect(result.props.method).toBe("paynow");
  });
  it.each([
    { orderId: "invalid", amount: "10" },
    { orderId: "11111111-1111-4111-8111-111111111111", amount: "10" },
    { orderId: "OR-3000", amount: undefined },
    { orderId: "OR-3000", amount: "0" },
    { orderId: "OR-3000", amount: "-1" },
    { orderId: "OR-3000", amount: "Infinity" },
  ])("PAY-015 rejects malformed success queries %j", async (values) => {
    await expect(PaymentSuccessPage({ searchParams: Promise.resolve(values) })).rejects.toThrow("Redirect /checkout");
  });
});
