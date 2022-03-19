<template>
    <div id="clock">
        <p class="date" style="margin-bottom: -20px">{{ date }}</p>
        <p class="time">{{ time }}</p>
    </div>
</template>

<script>
import "@fontsource/share-tech-mono";

export default {
    name: 'TimeTicker',
    data() {
        return {
            time: '',
            date: '',
            week: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
        }
    },
    methods: {
        updateTime() {
            // TODO: 알람 기능 추가
            let cd = new Date();
            this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
            this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.week[cd.getDay()];
        },
        zeroPadding(num, digit) {
            var zero = ''
            for (var i = 0; i < digit; i++) {
                zero += '0'
            }
            return (zero + num).slice(-digit)
        },
        changeMode() {
            let hour = parseInt(this.time.split(':')[0],10)
            // let hour = 10
            var body = document.querySelector("body");
            if (hour > 19 || hour < 7) {  // dark
                body.classList.add("dark");
            } else {
                body.classList.remove("dark");
            }
        }
    },
    mounted() {
        setInterval(this.updateTime, 500)
        setInterval(this.changeMode, 1000)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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

html, body {
    height: 100%;
    overflow-y: hidden;
    overflow-x: hidden;
}

body {
    background: var(--background);
    overflow: none;
}

p {
    margin: 0;
    padding: 0;
}

#clock {
    font-family: 'Share Tech Mono', monospace;

    color: #ffffff;
    text-align: center;
    position: absolute;
    left: 65%;
    top: 80%;
    transform: translate(-50%, -50%);
    color: var(--color);

    .time {
        letter-spacing: 0.05em;
        font-size: 110px;
        padding: 5px 0;
    }

    .date {
        letter-spacing: 0.1em;
        font-size: 45px;
    }

}
</style>
