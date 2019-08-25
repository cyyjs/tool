<template>
    <div class="content">
        <div style="text-align: right;margin-bottom:20px;">
            <label class="btn">
                选择文件
                <input v-show="false" @change="change" type="file" accept="image/*">
            </label>
        </div>
        <div class="box">
            <div>
                <img :src="code" alt>
            </div>
            <div class="code-box" v-show="!!code">
                <span class="copy" @click="copy">
                    <i class="fa fa-copy"></i>
                </span>
                <div class="code">{{code}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            code: ''
        }
    },
    methods: {
        change(e) {
            this.code = ''
            let file = e.target.files[0]
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.code = reader.result
            });
            reader.readAsDataURL(file);
        },
        copy() {
            let cp = e => {
                e.clipboardData.setData('text/plain', this.code)
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
<style scoped>
.code-box {
    line-height: 24px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #eee;
    background-color: #282c34;
    position: relative;
    padding-top: 30px;
    height: 80%;
}
.code {
    height: 100%;
    overflow: auto;
    word-wrap: break-word;
    padding: 5px 10px;
}
.copy {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    padding: 5px;
}
.copy:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.box {
    display: flex;
    justify-content: space-between;
    height: 100%;
}
.box > div {
    width: 50%;
}
img {
    width: 90%;
}
</style>


