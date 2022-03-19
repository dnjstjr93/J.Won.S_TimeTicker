<template>
    <div>
        <div class="mainNewsList">
                <span class="mainNews" v-for="(mainnews, index) in MainNewsList" :key="index">
                    <img class="newsImg" :src="mainnews.MainNewsImgList">
                    <span class="newsTitle">{{ mainnews.MainNewsTitleList }}</span>
                </span>
        </div>
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
            MainNewsList: [],

            news: '',
            NewsTime: '',

            audio: null,
            playStatus: false,
            playLog: ''
        }
    },
    methods: {
        getMainNews() {
            var url = "/api"

            axios.get(url,)
                .then((response) => {
                    if (response.status === 200) {
                        const $ = cheerio.load(response.data);

                        const list_news_inner_arr = $(
                            "#yDmH0d > c-wiz > div > div > div > div > main > c-wiz > div > div > div > div > div"
                        ).toArray();

                        list_news_inner_arr.forEach((div) => {
                            const articleFirst = $(div).find("article").first();
                            const h3First = $(articleFirst).find("h3").first();
                            const aFirst = $(h3First).find("a").first();

                            const imgaFirst = $(div).find("a").first();
                            const figureFirst = $(imgaFirst).find("figure").first();
                            const imgFirst = $(figureFirst).find("img").first();

                            if (aFirst.text() !== '') {
                                const mainnews = {}
                                mainnews.href = aFirst.attr('href')
                                mainnews.MainNewsTitleList = aFirst.text()
                                mainnews.MainNewsImgList = imgFirst.attr('srcset').split(' ')[0]
                                if (this.MainNewsList.length < 5) {
                                    this.MainNewsList.push(mainnews)
                                }
                            }
                        });
                    }
                }).catch((e) => {
                    console.log(e)
                }
            )
        },
        getNews() {
            var url = "https://imnews.imbc.com/replay/nwradio/"

            axios.get(url)
                .then((response) => {
                    if (response.status === 200) {
                        const $ = cheerio.load(response.data);

                        const list_text_inner_arr = $(
                            "#content > section > div > div > div > ul > li"
                        ).toArray();

                        list_text_inner_arr.forEach((li) => {
                            const divThird = $(li).find("div"); // 첫번째 <a> 태그
                            if (divThird['2'].attribs.class === 'tdata r_vod') {
                                const aFirst = $(divThird).find("a").first();
                                const path = aFirst.attr("href");
                                if (path === '#') {
                                    this.news = aFirst.attr("data-file");
                                    if (divThird['1'].attribs.class === 'tdata r_name') {
                                        this.NewsTime = divThird['1'].children[0].data
                                    }
                                }
                            }
                        });
                        console.log(this.NewsTime, '-', this.news)
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
    created() {
        this.getMainNews()
        this.getNews()
    },
    mounted() {
        setInterval(this.getMainNews, 30 * 60 * 1000)
        setInterval(this.getNews, 30 * 60 * 1000)
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

.mainNewsList {
    position: absolute;
    top: 16%;
    left: 15%;
    height: 46%;
    width: 70%;
    background-color: var(--card-background);
    display: block;
    border-radius: 8px;
    box-shadow: var(--card-boxshadow);
}

.mainNews {
    height: calc(calc(100% / 5) - 0.8%);
    border: 1px solid var(--border-color);
    display: block;
    align-items: center;
    border-radius: 8px;
    justify-content: center;
    flex-direction: column;
}

.newsImg {
    border-radius: 8px;
    height: 100%;
}

.newsTitle {
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--color);
    margin-left: 10px;
    vertical-align: top;
}

.news {
    position: absolute;
    bottom: 20%;
    left: 5%;
    width: 11%;
    height: 6%;
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
    bottom: 5%;
    left: 3%;
    width: 80px;
    color: var(--color);
}

</style>