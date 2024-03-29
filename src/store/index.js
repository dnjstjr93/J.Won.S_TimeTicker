import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        API_KEY: '472546e1d0a9a53064c2ae59d4610f13',
        KAKAO_API_KEY: '3db7c3e93b5e3f78fe9d5a8401063af4',
        NAVER_API: {
            ClientID: 'YsnLDb6fdCb9maKQncDl',
            ClientSecret: 'uj8Bg_98DU'
        },

        location: {
            lat: '37.365322375616095',
            lon: '127.15954653983601'
        },

        WeatherCondition: {
            '200':{main:"Thunderstorm", descEN:"thunderstorm with light rain", descKR: "약한 비를 동반한 뇌우", icon: '11d'},
            '201':{main:"Thunderstorm", descEN:"thunderstorm with rain", descKR: "비를 동반한 뇌우", icon: '11d'},
            '202':{main:"Thunderstorm", descEN:"thunderstorm with heavy rain", descKR: "폭우를 동반한 뇌우", icon: '11d'},
            '210':{main:"Thunderstorm", descEN:"light thunderstorm", descKR: "가벼운 뇌우", icon: '11d'},
            '211':{main:"Thunderstorm", descEN:"thunderstorm", descKR: "뇌우", icon: '11d'},
            '212':{main:"Thunderstorm", descEN:"heavy thunderstorm", descKR: "강한 뇌우", icon: '11d'},
            '221':{main:"Thunderstorm", descEN:"ragged thunderstorm", descKR: "거친 뇌우", icon: '11d'},
            '230':{main:"Thunderstorm", descEN:"thunderstorm with light drizzle", descKR: "약한 이슬비를 동반한 뇌우", icon: '11d'},
            '231':{main:"Thunderstorm", descEN:"thunderstorm with drizzle", descKR: "이슬비를 동반한 뇌우", icon: '11d'},
            '232':{main:"Thunderstorm", descEN:"thunderstorm with heavy drizzle", descKR: "강한 이슬비를 동반한 뇌우", icon: '11d'},
            '300': {main:"Drizzle",descEN: "light intensity drizzle", descKR: "약한 이슬비", icon: '09d'},
            '301': {main:"Drizzle",descEN: "drizzle", descKR: "이슬비", icon: '09d'},
            '302': {main:"Drizzle",descEN: "heavy intensity drizzle", descKR: "강한 이슬비", icon: '09d'},
            '310': {main:"Drizzle",descEN: "light intensity drizzle rain", descKR: "약한 이슬비", icon: '09d'},
            '311': {main:"Drizzle",descEN: "drizzle rain", descKR: "이슬비", icon: '09d'},
            '312': {main:"Drizzle",descEN: "heavy intensity drizzle rain", descKR: "강한 강도의 이슬비", icon: '09d'},
            '313': {main:"Drizzle",descEN: "shower rain and drizzle", descKR: "소나기 비와 이슬비", icon: '09d'},
            '314': {main:"Drizzle",descEN: "heavy shower rain and drizzle", descKR: "강한 소나기와 이슬비", icon: '09d'},
            '321': {main:"Drizzle",descEN: "shower drizzle", descKR: "이슬비", icon: '09d'},
            '500': {main:"Rain", descEN:"light rain", descKR: "가벼운 비", icon: '10d'},
            '501': {main:"Rain", descEN:"moderate rain", descKR: "적당한 비", icon: '10d'},
            '502': {main:"Rain", descEN:"heavy intensity rain", descKR: "강한 강도의 비", icon: '10d'},
            '503': {main:"Rain", descEN:"very heavy rain", descKR: "매우 큰 비", icon: '10d'},
            '504': {main:"Rain", descEN:"extreme rain", descKR: "극심한 비", icon: '10d'},
            '511': {main:"Rain", descEN:"freezing rain", descKR: "얼어붙은 비", icon: '13d'},
            '520': {main:"Rain", descEN:"light intensity shower rain", descKR: "가벼운 소나기 비", icon: '09d'},
            '521': {main:"Rain", descEN:"shower rain", descKR: "소나기 비", icon: '09d'},
            '522': {main:"Rain", descEN:"heavy intensity shower rain", descKR: "강한 소나기", icon: '09d'},
            '531': {main:"Rain", descEN:"ragged shower rain", descKR: "거친 소나기", icon: '09d'},
            '600': {main:"Snow", descEN:"light snow", descKR: "적은 양의 눈", icon: '13d'},
            '601': {main:"Snow", descEN:"Snow", descKR: "눈", icon: '13d'},
            '602': {main:"Snow", descEN:"Heavy snow", descKR: "폭설", icon: '13d'},
            '611': {main:"Snow", descEN:"Sleet", descKR: "진눈깨비", icon: '13d'},
            '612': {main:"Snow", descEN:"Light shower sleet", descKR: "가벼운 진눈깨비 소나기", icon: '13d'},
            '613': {main:"Snow", descEN:"Shower sleet", descKR: "진눈깨비", icon: '13d'},
            '615': {main:"Snow", descEN:"Light rain and snow", descKR: "가벼운 비와 눈", icon: '13d'},
            '616': {main:"Snow", descEN:"Rain and snow", descKR: "비와 눈", icon: '13d'},
            '620': {main:"Snow", descEN:"Light shower snow", descKR: "가벼운 눈 소나기", icon: '13d'},
            '621': {main:"Snow", descEN:"Shower snow", descKR: "소나기 눈", icon: '13d'},
            '622': {main:"Snow", descEN:"Heavy shower snow", descKR: "폭설", icon: '13d'},
            '701': {main:"Mist", descEN:"mist", descKR: "안개", icon: '50d'},
            '711': {main:"Smoke", descEN:"Smoke", descKR: "연기", icon: '50d'},
            '721': {main:"Haze", descEN:"Haze", descKR: "안개", icon: '50d'},
            '731': {main:"Dust", descEN:"sand/ dust whirls", descKR: "모래/먼지 소용돌이", icon: '50d'},
            '741': {main:"Fog", descEN:"fog", descKR: "안개", icon: '50d'},
            '751': {main:"Sand", descEN:"sand", descKR: "모래", icon: '50d'},
            '761': {main:"Dust", descEN:"dust", descKR: "먼지", icon: '50d'},
            '762': {main:"Ash", descEN:"volcanic ash", descKR: "화산재", icon: '50d'},
            '771': {main:"Squall", descEN:"squalls", descKR: "돌풍", icon: '50d'},
            '781': {main:"Tornado", descEN:"tornado", descKR: "폭풍", icon: '50d'},
            '800': {main:"Clear", descEN:"clear sky", descKR: "맑은 하늘", icon: '01d'},
            '801': {main:"Clouds", descEN:"few clouds: 11-25%", descKR: "약간의 구름: 11-25%", icon: '02d'},
            '802': {main:"Clouds", descEN:"scattered clouds: 25-50%", descKR: "흩어진 구름: 25-50%", icon: '03d'},
            '803': {main:"Clouds", descEN:"broken clouds: 51-84%", descKR: "부서진 구름: 51-84%", icon: '04d'},
            '804': {main:"Clouds", descEN:"overcast clouds: 85-100%", descKR: "흐린 구름: 85-100%", icon: '04d'},
        },
        IconList: {
            '01d': 'sun',
            '02d': 'cloud-sun',
            '03d': 'cloud',
            '04d': 'cloud',
            '09d': 'cloud-drizzle',
            '10d': 'cloud-showers-heavy',
            '11d': 'bolt',
            '13d': 'snowflake',
            '50d': 'smog',
        }
    },
})