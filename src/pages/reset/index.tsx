import { HomePage } from "@/screens/homepage";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>releweather | weather compared to yesterday</title>
        <meta
          name="description"
          content="Compare today's weather to yesterday's"
        />

        <meta property="og:title" content="releweather" />
        <meta
          property="og:description"
          content="Compare today's weather to yesterday's."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://relaweather.io/" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="releweather" />
        <meta
          name="twitter:description"
          content="Compare today's weather to yesterday's."
        />
        <meta name="twitter:image" content="/og-image.png" />
      </Head>
      <HomePage />
    </>
  );
}
