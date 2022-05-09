import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from "react";
import { HeroCompare } from '../src/Components/HeroCompare/HeroCompare';
import { Weather } from '../src/data/weather'

const Home: NextPage = () => {
  const weather = useWeather()
  return (
    <main className={styles.main}>
        <Head>
          <title>Relative Weather</title>
          <meta name="description" content="Weather compared to yesterday." />
        </Head>
        <HeroCompare weather={weather}></HeroCompare>
    </main>
  )

  /** React hook to create a Weather instance. */
  function useWeather(): Weather | undefined {
    const [weather, setWeather] = useState<Weather | undefined>(undefined);
    
    useEffect(() => {
      async function create() {
        setWeather(await Weather.create());
      }
      create();
    }, []);
    return weather;
  }
}
export default Home