<template>
    <div>
        <TimeTicker/>
        <getWeather/>
        <getNews/>
        <setAlarm/>
    </div>
</template>

<script>
import TimeTicker from './components/TimeTicker'
import getWeather from './components/getWeather'
import getNews from './components/getNews'
import setAlarm from './components/setAlarm'

export default {
    name: 'App',
    components: {
        TimeTicker,
        getWeather,
        getNews,
        setAlarm
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
