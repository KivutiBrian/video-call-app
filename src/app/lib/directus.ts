import { authentication, createDirectus, rest } from "@directus/sdk";

const directusClient = createDirectus("http://localhost:8055")
  .with(authentication("cookie", { credentials: "include" }))
  .with(rest({ credentials: "include" }));

export default directusClient;
