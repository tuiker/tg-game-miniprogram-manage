<template>
  <el-upload action :accept="accept" :on-change="uploadFile" list-type="text" :auto-upload="false" :file-list="files"
    :on-remove="handleRemove" ref="upload" :disabled="disabled">
    <el-button type="primary" style="margin: 0px;" :disabled="disabled">点击上传</el-button>
  </el-upload>
</template>

<script>
//引入上传图片接口
import { UploadImg } from "@/api/tool";
export default {
  props: {
    limit: Number,
    fileList: Array,
    disabled: Boolean,
    accept: {
      type: String,
      default: ".apk"
    },
    fileName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      files: [],
      loading: null,
      imgUrl: [], //上传图片后地址合集
    };
  },
  watch: {
    fileList: {
      handler(newVal, oldVal) {
        this.files = newVal;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    //文件列表移除文件时的函数
    handleRemove(file, fileList) {
      const index = this.fileList.findIndex((item) => item === file.uid);
      this.imgUrl.splice(index, 1);
      this.$emit("delUrl", this.imgUrl);
    },
    //这里是不需要直接上传而是通过按钮上传的方法
    submitUpload() {
      this.$refs.upload.submit();
    },
    //文件状态改变时的函数(主要逻辑函数)
    uploadFile(e, fileList) {
      this.loading = this.$loading({
        lock: true,
        text: '上传中',
        spinner: 'el-icon-loading'
      });

      this.files = [fileList[fileList.length - 1]];

      const file = e.raw; // <- 这里是直接上传的
      let params = new FormData();
      params.append("files", file);
      params.append("gameName", this.fileName);
      UploadImg(params).then((res) => {
        this.loading.close();
        this.$message.success("上传成功！");
        this.$emit("getUrl", res.data[0]);
      }).catch((err) => {
        this.loading.close();
        this.$message.error("上传失败，请重试！");
      });
    },
    clearFiles() {
      this.$refs.upload.clearFiles();
    }
  },
};
</script>

<style  scope>
.el-upload-list {
  width: 400px;
}
</style>
