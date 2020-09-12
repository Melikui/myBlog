var app = new Vue({
    el: '#music',
    data: {
        // 查询关键字
        query: '',
        // 歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: '',
        // 歌曲封面
        musicCover: './images/Maroon5.jpg',
        // 歌曲评论
        hotComments: [],
        isPlaying: false,
        iconPlay: false,
        current: -1,
        // 遮罩层显示状态
        isShow: false,
        // MV地址
        mvUrl: '',
        count: 0
    },
    methods: {
        // 歌曲搜索
        searchMusic: function () {
            var that = this;
            axios.get('https://autumnfish.cn/search?keywords=' + this.query)
                .then(function (response) {
                    that.musicList = response.data.result.songs;
                }, function (err) { console.log(err); });
        },
        // 歌曲播放
        plsyMusic: function (musicId, index) {
            this.current = index;
            this.count ++;
            var that = this;
            if(this.count%2==0){
                this.isPlaying = false;
                this.current = -1;
                this.musicUrl = '';
            }else{
                // 获取歌曲地址
                axios.get('https://autumnfish.cn/song/url?id=' + musicId)
                .then(function (response) {
                    that.musicUrl = response.data.data[0].url;
                }, function (err) { console.log(err); });
            }
            // 歌曲详情获取
            axios.get('https://autumnfish.cn/song/detail?ids=' + musicId)
                .then(function (response) {
                    that.musicCover = response.data.songs[0].al.picUrl;
                }, function (err) { console.log(err); });
            // 歌曲评论获取
            axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + musicId)
                .then(function (response) {
                    that.hotComments = response.data.hotComments;
                }, function (err) { console.log(err); });
        },
        // 歌曲播放
        play: function () {
            this.isPlaying = true;
            this.iconPlay = true;
        },
        // 歌曲暂停
        pause: function () {
            this.isPlaying = false;
            this.iconPlay = false;
        },
        // 播放MV
        playMv: function(mvid){
            this.isPlaying = false;
            this.current = -1;
            this.musicUrl = '';
            var that = this;
            axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
                .then(function (response) {
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                }, function (err) { console.log(err); });
        },
        hide: function(){
            this.isShow = false;
            this.mvUrl = '';
        }
    }
})