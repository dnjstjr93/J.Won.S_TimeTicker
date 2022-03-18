<template>
    <div>
        <div class="location-holder">
            <div class="location-icon icon">
                <svg width="25" height="25" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M30.2083 21.8761C30.2083 18.9984 27.8766 16.6667 25.001 16.6667C22.1234 16.6667 19.7917 18.9984 19.7917 21.8761C19.7917 24.7516 22.1234 27.0833 25.001 27.0833C27.8766 27.0833 30.2083 24.7516 30.2083 21.8761Z"
                          stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M24.999 43.75C22.5022 43.75 9.375 33.1216 9.375 22.0069C9.375 13.3055 16.369 6.25 24.999 6.25C33.629 6.25 40.625 13.3055 40.625 22.0069C40.625 33.1216 27.4958 43.75 24.999 43.75Z"
                          stroke="#000000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <a v-if="location" class="location" v-text="location"></a>
        </div>
        <div v-if="weatherData.currently && weatherData.daily" class="content fullheight centerpage" id="content">
            <div class="temperature-holder">
                <span class="value">{{ Math.round(weatherData.currently.temp) }}°C</span>
                <div class="mt-n2">
                    <font-awesome-icon
                        class="phrase"
                        :icon="curIcon"
                        size="1x"/>
                    <span class="phrase2">{{ curDesc }}</span>
                </div>
            </div>
            <div class="days">
                <span class="day" v-for="(day, index) in weatherData.daily" :key="index">
                    <span class="temperature-value">{{ Math.round(day.temp.max) }}°C</span>
                    <span class="temperature-value">{{ Math.round(day.temp.min) }}°C</span>
                    <span class="day-date">{{
                            new Date(weatherData.daily[index].dt * 1000).toLocaleString("ko", {
                                day: '2-digit',
                                year: '2-digit',
                                month: '2-digit'
                            })
                        }}</span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'getWeather',
    data() {
        return {
            location: '새말길 63-2',
            weatherData: {
                currently: {},
                daily: []
            },
            curID: '',
            curPhrase: '',
            curDesc: '',
            curIconNum: '',
            curIcon: 'sun',
            curDescKR: '',
        }
    },
    methods: {
        getAddress() {
            var url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json?x=' + this.$store.state.location.lon + '&y=' + this.$store.state.location.lat

            axios.get(url, {
                headers: {
                    Authorization: 'KakaoAK ' + this.$store.state.KAKAO_API_KEY
                },
            })
                .then((response) => {
                        this.location = response.data.documents[0].road_address.road_name + ' ' + response.data.documents[0].road_address.main_building_no + '-' + response.data.documents[0].road_address.sub_building_no
                    }
                ).catch((e) => {
                    console.log(e)
                }
            )
        },
        forecast() {
            var url = `http://api.openweathermap.org/data/2.5/onecall?`
                + `lat=${this.$store.state.location.lat}&lon=${this.$store.state.location.lon}&appid=${this.$store.state.API_KEY}&units=metric&lang=kr`

            axios.post(url)
                .then((response) => {
                        this.weatherData.currently = response.data.current
                        this.curID = this.weatherData.currently.weather[0].id
                        this.curPhrase = this.$store.state.WeatherCondition[this.curID].main
                        this.curDesc = this.$store.state.WeatherCondition[this.curID].descKR
                        this.curIconNum = this.weatherData.currently.weather[0].icon

                        this.curIcon = this.$store.state.WeatherCondition[this.curID].icon

                        this.curIcon = this.$store.state.IconList[this.curIcon]
                        this.weatherData.daily = response.data.daily
                    }
                ).catch((e) => {
                    console.log(e.message)
                }
            )
        }
    },
    mounted() {
        this.forecast()
        this.getAddress()
        setInterval(this.getAddress, 10 * 60 * 1000)
        setInterval(this.forecast, 10 * 60 * 1000)
    }
};
</script>

<style>
:root {
    --background: hsl(0, 0%, 98%);
    --color: hsl(0, 0%, 13%);
    --color-2: hsl(0, 0%, 27%);
    --color-3: hsl(0, 0%, 40%);
    --border-color: hsl(0, 0%, 88%);
    --card-background: hsl(0, 0%, 93%);
    --card-background-hover: hsl(0, 0%, 80%);
    --card-boxshadow: 0 0 30px 0 hsla(0, 0%, 50%, 0.10);
    --text-shadow: 0px 3px 3px hsla(0, 0%, 13%, 0.251);
    --green: hsl(170, 100%, 30%);
    --green-50: hsl(170, 100%, 30%, 50%);
}

.dark {
    --background: hsl(0, 0%, 2%);
    --color: hsl(0, 0%, 87%);
    --color-2: hsl(0, 0%, 73%);
    --color-3: hsl(0, 0%, 60%);
    --border-color: hsl(0, 0%, 12%);
    --card-background: hsl(0, 0%, 7%);
    --card-background-hover: hsl(0, 0%, 20%);
    --card-boxshadow: 0 0 30px 0 hsla(0, 0%, 0%, 0.10);
    --text-shadow: 0px 3px 3px hsla(0, 0%, 87%, 0.251);
}

.location-holder {
    position: absolute;
    top: 2%;
    left: 1%;
}

svg {
    color: var(--color);
}

.icon svg {
    vertical-align: middle;
    stroke: var(--color);
}

.icon svg path, .icon svg ellipse {
    stroke: var(--color);
}

.location {
    position: absolute;
    top: 25%;
    left: 110%;
    width: 600%;
    font-size: 1rem;
    font-weight: 600;
    font-family: 'Share Tech Mono', monospace;
    color: var(--color);
    text-decoration: none;
}

.content {
    flex-direction: column;
    justify-content: space-evenly;
}

.temperature-holder {
    position: absolute;
    left: 16%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color);
    text-shadow: var(--text-shadow);
}

.phrase {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-2);
    margin-right: 6px;
}

.phrase2 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-2);
}

.days {
    position: absolute;
    top: 2%;
    right: 1%;
    width: 60%;
    background-color: var(--card-background);
    display: flex;
    border-radius: 8px;
    box-shadow: var(--card-boxshadow);
}

.day {
    width: calc(100% / 8);
    height: 55px;
    border: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.day:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
}

.day:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
}

.temperature-value {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color);
}

.day-date {
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--color-2);
}

</style>