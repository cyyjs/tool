import Img2Base from "@/views/format/img2base.vue";
import FmJson from "@/views/format/json.vue";
import ImgMini from "@/views/format/imgmini.vue";

export default [
  {
    path: "/fm/imgmini",
    name: "imgmini",
    meta: {
      back: true,
      title: '图片压缩',
      img: 'img/imgmini.png'
    },
    component: ImgMini
  },
  {
    path: "/fm/json",
    name: "fmjson",
    meta: {
      back: true,
      title: 'JSON格式化',
      img: 'img/json.svg'
    },
    component: FmJson
  },
  {
    path: "/fm/img2base",
    name: "img2base",
    meta: {
      back: true,
      title: '图片转Base64',
      img: 'img/base64.svg'
    },
    component: Img2Base
  }
]