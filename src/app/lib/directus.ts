import { authentication, createDirectus, rest } from "@directus/sdk";

/*
Next.js extends the native fetch API with a force-cache configuration by default. This means you may sometimes run into scenarios where Next.js returns stale data.

To fix this, you can add the cache: "no-store" option to your fetch request.

*/

const directusClient = createDirectus("http://localhost:8055")
  .with(authentication("cookie", { credentials: "include" }))
  .with(
    rest({
      credentials: "include",
      onRequest: (options) => ({ ...options, cache: "no-store" }),
    })
  );

export default directusClient;
