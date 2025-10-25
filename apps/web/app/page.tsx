import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <h1>Turborepo Demo Page</h1>
      <Suspense fallback={<div>Loading API data...</div>}>
        <APIData />
      </Suspense>
    </div>
  );
}

async function APIData() {
  const response = await fetch(process.env.HONO_API_URL!, {
    cache: "force-cache",
  });
  const text = await response.text();

  return (
    <div>
      <h2>API Response:</h2>
      <pre>{text}</pre>
    </div>
  );
}
