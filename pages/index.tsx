import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from "react";
import { HeroCompare } from '../src/Components/HeroCompare/HeroCompare';
import { Weather } from '../src/data/weather'
import { WeatherDayCard } from '../src/Components/WeatherDayCard/WeatherDayCard';
import { Grid, Skeleton, Typography, Box} from '@mui/material';

const Home: NextPage = () => {
  const weather = useWeather()
  return (
    <>
      <Head>
        <title>Relative Weather</title>
        <meta name="description" content="Weather compared to yesterday." />
      </Head>
      <HeroCompare delta={weather?.delta}></HeroCompare>
      <Grid container justifyContent="center" spacing={{xs: 1, lg: 1}}>
        <Grid item xs={6} sm={6} md={2} lg={2} marginTop={2}>
          <WeatherDayCard weatherDay={weather?.yesterday}></WeatherDayCard>
        </Grid>
        <Grid item xs={6} sm={6} md={2} lg={2} marginTop={2}>
          <WeatherDayCard weatherDay={weather?.now}></WeatherDayCard>  
        </Grid>
      </Grid>
    </>
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