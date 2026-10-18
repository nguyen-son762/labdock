const http = require("node:http");
const { readFileSync } = require("node:fs");
const {
  productsResponse,
  productDetailResponse,
  homepageResponse,
  profileResponse,
  cartResponse,
} = require("./fixtures.cjs");
const id = (number) => `00000000-0000-4000-8000-${String(number).padStart(12, "0")}`;
const mediaURL = "http://127.0.0.1:3101/media/qa.png";
const products = Array.from({ length: 12 }, (_, index) => ({
  ...productsResponse.items[0],
  id: id(index + 1),
  slug: `qa-product-${index + 1}`,
  name: `QA Product ${index + 1}`,
  primaryImageUrl: mediaURL,
  outOfStock: false,
}));
const detail = { ...productDetailResponse, ...products[0], status: "Published" };
detail.media = [0, 1, 2].map((index) => ({
  ...productDetailResponse.media[0],
  id: id(50 + index),
  url: `${mediaURL}?qa=${index}`,
  sortOrder: index,
  isPrimary: index === 0,
}));
const profile = { ...profileResponse, fullName: "QA Tester", email: "qa@example.test" };
let cart = structuredClone(cartResponse);
cart.items[0].productName = "QA Product 1";
cart.items[0].imageUrl = "/home/hero-promo.png";
const tokens = {
  accessToken: "qa-local-access",
  refreshToken: "qa-local-refresh",
  expiresAt: "2099-01-01T00:00:00Z",
  mustChangePassword: false,
};
const requests = [];
http
  .createServer(async (request, response) => {
    const allowedOrigins = ["http://localhost:3100", "http://127.0.0.1:3100", "http://localhost:3102"];
    if (allowedOrigins.includes(request.headers.origin))
      response.setHeader("Access-Control-Allow-Origin", request.headers.origin);
    response.setHeader("Access-Control-Allow-Headers", "content-type,authorization");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    response.setHeader("Content-Type", "application/json");
    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }
    const url = new URL(request.url, "http://127.0.0.1:3101");
    const path = url.pathname.replace("/api/public/v1", "");
    if (path === "/media/qa.png") {
      response.setHeader("Content-Type", "image/png");
      response.end(readFileSync("public/home/hero-promo.png"));
      return;
    }
    const send = (data, status = 200) => {
      response.writeHead(status);
      response.end(JSON.stringify(data));
    };
    let body = "";
    for await (const chunk of request) body += chunk;
    requests.push({ method: request.method, path, query: url.search });
    if (path === "/__requests") return send(requests);
    if (path === "/auth/login" || path === "/auth/refresh") return send(tokens);
    if (path === "/me/profile") return send(profile);
    if (path === "/homepage")
      return send({
        ...homepageResponse,
        banners: [],
        newestProducts: products,
        personalizedOffers: products,
        testimonials: Array.from({ length: 4 }, (_, index) => ({
          ...homepageResponse.testimonials[0],
          id: id(index + 100),
          authorName: `QA Author ${index + 1}`,
        })),
      });
    if (path === "/categories")
      return send([
        {
          id: id(30),
          name: "QA Chemicals",
          slug: "qa-chemicals",
          description: null,
          level: 1,
          sortOrder: 0,
          productCount: 12,
          media: [],
          children: [],
        },
      ]);
    if (path === "/brands" || path === "/origins") return send([]);
    if (path === "/products")
      return send({
        items: products.slice(0, Number(url.searchParams.get("pageSize")) || 12),
        page: 1,
        pageSize: 12,
        total: 12,
      });
    if (/^\/products\/qa-product-\d+$/.test(path))
      return send({ ...detail, ...products.find((product) => `/products/${product.slug}` === path) });
    if (path === "/cart") return send(cart);
    if (path === "/cart/items" && request.method === "POST") return send(cart);
    if (path.startsWith("/cart/items/") && request.method === "PATCH") {
      const values = JSON.parse(body);
      cart.items = cart.items.map((item) => ({
        ...item,
        quantity: values.quantity,
        lineTotal: item.unitPrice * values.quantity,
      }));
      return send(cart);
    }
    if (path.startsWith("/cart/items/") && request.method === "DELETE") {
      cart.items = [];
      return send({});
    }
    return send({ detail: "No synthetic fixture for this endpoint." }, 404);
  })
  .listen(3101, "127.0.0.1", () => process.stdout.write("QA fixture server ready on 3101\n"));
