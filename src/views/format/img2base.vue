<template>
    <div class="content">
        <div class="drag-box" v-show="!code">
            <div>
                <i class="fa fa-upload"></i>
                <span>拖放图片文件到此，或点击上传</span>
                <input @change="change" type="file" accept="image/*">
            </div>
        </div>
        <div class="box" v-show="code">
            <div class="img">
                <input @change="change" type="file" accept="image/*">
                <img :src="code" alt>
            </div>
            <div class="code-box" v-show="!!code">
                <span class="copy" @click="copy" title="复制">
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
            if (!file.type.startsWith('image/')) {
                new Notification('提示', {
                    body: '请选择图片类型文件'
                })
                return
            }
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
            new Notification('提示', {
                body: '复制成功'
            })
        }
    }
}
</script>
<style scoped lang="scss">
.drag-box{
    position: relative;
    text-align: center;
    border: 2px dashed #ccc;
    border-radius: 15px;
    height: 100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }
    &>div{
        color: #ccc;
        margin: auto;
        i {
            font-size: 50px;
        }
        &>span {
            margin-top: 10px;
            display: block;
        }
    }
}
.code-box {
    line-height: 24px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #eee;
    background-color: #282c34;
    position: relative;
    height: 100%;
    overflow: auto;
}
.img {
    position: relative;
    input {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        opacity: 0;
        cursor: pointer;
    }
}
.code {
    word-wrap: break-word;
    padding: 5px 10px;
}
.copy {
    position: fixed;
    z-index: 1;
    top: 50px;
    right: 25px;
    background-color: #fff;
    color: #000;
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
    background-color: rgba(255, 255, 255, 0.9);
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


