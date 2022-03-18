<template>
    <div>
        <div class="news">
            <div class="news_btn"
                 elevation="5"
                 @click="play"
            >{{ NewsTime }}
            </div>
        </div>
        <div class="news_log">{{ playLog }}</div>
    </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";

export default {
    name: 'getNews',
    data() {
        return {
            news: '',
            NewsTime: '',

            audio:null,
            playStatus: false,
            playLog: ''
        }
    },
    methods: {
        getNews() { // 주요 뉴스 리스트도 연동?
            var url = "https://imnews.imbc.com/replay/nwradio/"

            axios.get(url)
                .then((response) => {
                    if (response.status === 200) {
                        const $ = cheerio.load(response.data);

                        const list_text_inner_arr = $(
                            "#content > section > div > div > div > ul > li > div"
                            // "#content > section > div > div > ul"
                        ).toArray();

                        list_text_inner_arr.forEach((div) => {
                            const aFirst = $(div).find("a").first(); // 첫번째 <a> 태그
                            if (div.attribs.class === 'tdata r_name') {
                                this.NewsTime = div.children[0].data
                            }
                            const path = aFirst.attr("href"); // 첫번째 <a> 태그 url
                            if (path === '#') {
                                this.news = aFirst.attr("data-file");
                            }
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                }
            )
        },
        play() {
            if (this.news) {
                if (!this.playStatus) {
                    this.audio = new Audio(this.news);
                    this.audio.play();
                    this.playStatus = true
                    this.playLog = '재생 중..'
                } else {
                    this.audio.pause();
                    this.playStatus = false
                    this.playLog = '중지'
                }
            }
        }
        // TODO: 실내 온습도?
    },
    mounted() {
        // setInterval(this.getNews, 30 * 60 * 1000)
        setInterval(this.getNews, 1000)
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

.news {
    position: absolute;
    top: 20%;
    left: 2%;
    width: 80px;
    height: 35px;
    background-color: var(--card-background);
    display: flex;
    border-radius: 10%;
    box-shadow: var(--card-boxshadow);
    color: var(--color);
}

.news_btn {
    width: 100%;
    height: 93%;
    border: 1px solid var(--border-color);
    border-radius: 10%;
    border-color: var(--color);
    box-shadow: 0 0 10px var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.news_btn:active {
    width: 100%;
    height: 93%;
    border: 1px solid var(--border-color);
    border-radius: 10%;
    border-color: var(--color);
    box-shadow: 0 0 0px var(--color);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.news_log {
    position: absolute;
    bottom: 10%;
    left: 2%;
    width: 80px;
    color: var(--color);
}

</style>