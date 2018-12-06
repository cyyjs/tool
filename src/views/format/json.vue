<template>
    <div class="box">
        <div><textarea v-model="json" autofocus placeholder="输入json字符串"></textarea></div>
        <div class="fm">
            <span class="copy" @click="copy">
                <i class="fa fa-copy"></i>
            </span>
            <pre v-html="hfmJson" id="code"></pre>
        </div>
    </div>
</template>
<script>
import 'highlight.js/styles/monokai.css'
import hljs from 'highlight.js/lib/highlight'
import json from 'highlight.js/lib/languages/json'
hljs.registerLanguage('json', json)
export default {
    data() {
        return {
            json:
                '{"code":0,"message":"","data":{"pv":null,"uv":null,"click":null,"click_uv":null}}'
        }
    },
    computed: {
        fmJson() {
            try {
                let fm = JSON.stringify(JSON.parse(this.json), null, 2)
                return fm
            } catch (e) {
                return e.message
            }
        },
        hfmJson() {
            return hljs.highlight('json', this.fmJson, true).value
        }
    },
    methods: {
        copy() {
            let cp = e => {
                e.clipboardData.setData('text/plain', this.fmJson)
                e.preventDefault()
            }
            document.addEventListener('copy', cp)
            document.execCommand('copy')
            document.removeEventListener('copy', cp)
            new Notification('消息', {
                body: '复制成功'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    height: 100%;
    justify-content: space-around;
    font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New,
        monospace;

    & > div {
        overflow: auto;
        width: 50%;
        height: 100%;
    }
}
textarea {
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: none;
    border: 0;
    resize: none;
}
.fm {
    border-left: 1px solid #ccc;
    padding: 10px;
    background-color: #282c34;
    color: #fff;
}
.copy {
    float: right;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    padding: 5px;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
}
</style>

