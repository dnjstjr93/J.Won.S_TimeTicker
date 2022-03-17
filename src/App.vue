<template>
    <div>
        <TimeTicker/>
        <getWeather/>
    </div>
</template>

<script>
import TimeTicker from './components/TimeTicker'
import getWeather from './components/getWeather'

export default {
    name: 'App',
    components: {
        TimeTicker,
        getWeather
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
