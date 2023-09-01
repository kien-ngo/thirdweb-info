import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
  runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/ver", async (c) => {
  const packageNames = [
    "@thirdweb-dev/sdk",
    "@thirdweb-dev/auth",
    "@thirdweb-dev/storage",
    "@thirdweb-dev/wallets",
    "@thirdweb-dev/react",
    "@thirdweb-dev/chains",
    "@thirdweb-dev/react-core",
    "@thirdweb-dev/react-native",
    "@thirdweb-dev/react-native-compat",
    "@paperxyz/react-client-sdk",
  ];
  const requests = packageNames.map((pck) =>
    fetch(`https://registry.npmjs.org/${pck}/latest`).then((r) => r.json())
  );
  const responses = await Promise.all(requests);
  const data = responses.map((item, index) => ({
    [packageNames[index]]: item.version ?? "n/a",
  }));
  return c.json(data);
});

export default handle(app);
