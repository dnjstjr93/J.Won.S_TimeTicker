<template>
    <div>
        <div class="alarm_log">알람 설정</div>
        <div class="alarm" md="auto">
            <div class="hour">
                <div class="alarm_hour_up"
                     @click="changeHour('up')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-up'"
                        size="1x"/>
                </div>
                <div class="alarm_hour">
                    {{ hour }}
                </div>
                <div class="alarm_hour_down"
                     @click="changeHour('down')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-down'"
                        size="1x"/>
                </div>
            </div>
            <div class="colon">
                :
            </div>
            <div class="min">
                <div class="alarm_min_up"
                     @click="changeMinute('up')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-up'"
                        size="1x"/>
                </div>
                <div class="alarm_min">
                    {{ minute }}
                </div>
                <div class="alarm_min_down"
                     @click="changeMinute('down')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-down'"
                        size="1x"/>
                </div>
            </div>
            <div class="colon">
                :
            </div>
            <div class="meridiem">
                <div class="alarm_meridiem_up"
                     @click="changeMeri('up')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-up'"
                        size="1x"/>
                </div>
                <div class="alarm_meridiem">
                    {{ meridiem }}
                </div>
                <div class="alarm_meridiem_down"
                     @click="changeMeri('down')"
                >
                    <font-awesome-icon
                        class="phrase"
                        :icon="'caret-down'"
                        size="1x"/>
                </div>
            </div>
        </div>
        <div class="alarm_btn"
             @click="play"
        > {{ audioButton }}
        </div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
    data() {
        return {
            hour: '08',
            minute: '30',
            meridiem: 'AM',

            diff_min: 0,

            audio: null,
            alarmAudio: 'https://t1.daumcdn.net/cfile/tistory/99DD78465CF6B4DE03?original',
            playStatus: false,
            audioButton: '알람 끄기'
        }
    },
    methods: {
        changeHour(flag) {
            if (flag === 'up') {
                this.hour = parseInt(this.hour) + 1
                if (this.hour > 12) {
                    this.hour = this.hour % 12
                }
            } else if (flag === 'down') {
                this.hour = parseInt(this.hour) - 1
                if (this.hour < 0) {
                    this.hour = 12 + this.hour
                }
            }
            this.hour = this.hour.toString().padStart(2, '0')
        },
        changeMinute(flag) {
            if (flag === 'up') {
                this.minute = parseInt(this.minute) + 1
                if (this.minute > 59) {
                    this.minute = this.minute % 60
                }
            } else if (flag === 'down') {
                this.minute = parseInt(this.minute) - 1
                if (this.minute < 0) {
                    this.minute = 60 + this.minute
                }
            }
            this.minute = this.minute.toString().padStart(2, '0')
        },
        changeMeri(flag) {
            if (flag === 'up') {
                if (this.meridiem === 'AM') {
                    this.meridiem = 'PM'
                } else {
                    this.meridiem = 'AM'
                }
            } else if (flag === 'down') {
                if (this.meridiem === 'PM') {
                    this.meridiem = 'AM'
                } else {
                    this.meridiem = 'PM'
                }
            }
        },
        AlertAlarm() {
            let curTime = new Date()

            let alarmHour = 0
            if (this.meridiem === 'PM') {
                alarmHour = parseInt(this.hour) + 12
            }

            let AlarmTime = moment(curTime.getFullYear() + '-' + (curTime.getMonth() + 1).toString().padStart(2, '0') + '-' + curTime.getDate().toString().padStart(2, '0') + ' ' + alarmHour.toString().padStart(2, '0') + ':' + this.minute.toString().padStart(2, '0'), 'YYYY-MM-DD HH:mm')
            curTime = moment(curTime, 'YYYY-MM-DD HH:mm')

            this.diff_min = parseInt(moment.duration(curTime.diff(AlarmTime)).asMinutes(), 10);

            if (this.diff_min === 0) {
                if (!this.playStatus) {
                    this.audio = new Audio(this.alarmAudio);
                    this.audio.play();
                    this.audioButton = '알람 끄기'
                }
            }
        },
        play() {
            console.log(this.playStatus)
            if (!this.playStatus) {
                if (this.audio !== null){
                    this.audio.pause();
                }
                this.playStatus = true
                this.audioButton = '알람 켜기'
            } else {
                this.playStatus = false
                // this.audio = new Audio(this.alarmAudio);
                // this.audio.play();
                this.audioButton = '알람 끄기'
            }
        }
    },
    mounted() {
        setInterval(this.AlertAlarm, 5 * 1000)
        // setInterval(this.AlertAlarm, 1000)
    }
}
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

.alarm {
    position: absolute;
    bottom: 14%;
    left: 3%;
    width: 28%;
    display: flex;
}

.hour {
}

.alarm_hour {
    margin-left: 8px;
    font-size: 30px;
    border: 2px solid var(--border-color);
    border-radius: 20%;
    color: var(--color);
}

.alarm_hour_up {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_hour_up:active {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_hour_down {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_hour_down:active {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.colon {
    font-size: 30px;
    margin-top: 14px;
    margin-left: 10px;
    color: var(--color);
}

.min {
}

.alarm_min {
    margin-left: 8px;
    font-size: 30px;
    border: 2px solid var(--border-color);
    border-radius: 20%;
    color: var(--color);
}

.alarm_min_up {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_min_up:active {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_min_down {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_min_down:active {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.meridiem {
}

.alarm_meridiem {
    margin-left: 8px;
    font-size: 30px;
    border: 2px solid var(--border-color);
    border-radius: 20%;
    color: var(--color);
}

.alarm_meridiem_up {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_meridiem_up:active {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_meridiem_down {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_meridiem_down:active {
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_log {
    position: absolute;
    bottom: 29%;
    left: 4%;
    width: 80px;
    font-weight: bold;
    color: var(--color);
}

.alarm_btn {
    position: absolute;
    bottom: 5%;
    left: 4%;
    width: 11%;
    height: 5%;
    border: 1px solid var(--border-color);
    border-radius: 10%;
    border-color: var(--color);
    box-shadow: 0 0 10px var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

.alarm_btn:active {
    position: absolute;
    bottom: 5%;
    left: 4%;
    width: 11%;
    height: 5%;
    border: 1px solid var(--border-color);
    border-radius: 10%;
    border-color: var(--color);
    box-shadow: 0 0 0px var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: var(--color);
}

</style>