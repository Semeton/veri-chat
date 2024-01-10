import server, { PORT } from "./app";

server.listen(PORT, () => {
  console.log(`[server]: App running at http://localhost:${PORT}`);
});
