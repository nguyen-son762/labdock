import CheckoutPage from "./page";
import RequestQuotePage from "../request-quote/page";

for (const [name, page] of [
  ["checkout", CheckoutPage],
  ["quote", RequestQuotePage],
] as const) {
  describe(`${name} selection query`, () => {
    it("CHK-002 accepts repeated URL parameters and deduplicates identifiers", async () => {
      const element = await page({ searchParams: Promise.resolve({ items: ["I1,I1,, I2", "I3"] }) });
      expect(element.props.initialItemIds).toEqual(["I1", "I2"]);
    });
    it.each([{}, { items: "" }, { items: "I1,I2" }])("CHK-001 handles selection %j", async (params) => {
      const element = await page({ searchParams: Promise.resolve(params) });
      expect(element.props.initialItemIds).toEqual(params.items ? ["I1", "I2"] : undefined);
    });
  });
}
