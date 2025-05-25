import { HomePage } from "@/screens/region";
import { useRouter } from "next/router";
import Head from "next/head";
import { Box } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const { region } = router.query;

  if (!region) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>releweather | weather compared to yesterday</title>
      </Head>
      <HomePage regionId={region as string} />
    </>
  );
}
