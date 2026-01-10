import app from "./app";


Bun.serve({
    // Incase you run from WSL, you need hostname as 0.0.0.0 to bind
    fetch: app.fetch,
});

console.log("Server Running");