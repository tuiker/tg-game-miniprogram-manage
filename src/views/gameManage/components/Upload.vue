<template>
  <div>
    <el-upload :limit="limit" action accept="image/*" :on-change="uploadFile" list-type="picture-card"
      :auto-upload="false" :file-list="fileList" :on-exceed="handleExceed" :on-preview="handlePictureCardPreview"
      :before-remove="beforeRemove" :on-remove="handleRemove" ref="upload" class="avatar-uploader"
      :class="{ hide: showUpload }" :on-success="onSuccess" :on-error="onError" :disabled="disabled" :drag="drag"
      :multiple="multiple">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-button v-show="showClearBtn && values && values.length > 0" type="warning" plain size="small" @click="clearFiles"
      class="clearBtn">清空上传列表</el-button>
    <el-dialog width="30%" :visible.sync="dialogVisible">
      <img width="100%" :src="imgUrl.url" alt />
    </el-dialog>
  </div>
</template>

<script>
//引入上传图片接口
import { UploadImg } from "@/api/tool";
// import { Loading } from 'element-ui';
export default {
  props: {
    limit: Number,
    fileList: Array,
    disabled: Boolean,
    drag: Boolean,
    multiple: Boolean,
    showClearBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      showUpload: false, //控制limit最大值之后 关闭上传按钮
      dialogVisible: false, //查看图片弹出框
      imgUrl: [], //上传图片后地址合集
      values: [], //存储当前组件的文件列表
      loading: null,
    };
  },
  //监听上传图片的数组(为了处理修改时,自动渲染问题,和上传按钮消失问题);
  watch: {
    fileList: {
      handler(newVal, oldVal) {
        this.values = newVal;
        if (newVal.length == this.limit) this.showUpload = true;
        else this.showUpload = false;
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    beforeRemove(file, fileList) {

    },
    //文件列表移除文件时的函数
    handleRemove(file, fileList) {
      this.values = fileList;
      this.$emit("delUrl", this.values);
      if (fileList.length < this.limit) this.showUpload = false;
    },
    //点击文件列表中已上传的文件时的函数
    handlePictureCardPreview(file) {
      this.imgUrl.url = file.url;
      this.dialogVisible = true;
    },
    //这里是不需要直接上传而是通过按钮上传的方法
    submitUpload() {
      this.$refs.upload.submit();
    },
    //文件状态改变时的函数(主要逻辑函数)
    uploadFile(e, fileList) {
      //判断用户上传最大数量限制,来让上传按钮消失
      if (fileList.length >= this.limit) this.showUpload = true;
      // const file = e.file; <- 这里是不需要直接上传而是通过按钮上传的
      const file = e.raw; // <- 这里是直接上传的
      //大小
      const size = file.size / 1024 / 1024 / 2;
      if (
        !(
          file.type === "image/png" ||
          file.type === "image/gif" ||
          file.type === "image/jpg" ||
          file.type === "image/jpeg"
        )
      ) {
        this.$notify.warning({
          title: "警告",
          message:
            "请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片",
        });
      } else if (size > 2) {
        this.$notify.warning({
          title: "警告",
          message: "图片大小必须小于2M",
        });
      } else {
        this.loading = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading'
        });
        if (this.limit == 1) this.imgUrl = []; //此处判断为一张的时候需要清空数组
        let params = new FormData();
        params.append("files", file);
        UploadImg(params).then((res) => {
          fileList[fileList.length - 1].realUrl = res.data[0];
          this.values = fileList;
          this.$emit("getUrl", res.data[0]);

          this.$message.success("上传成功！");
          this.loading.close();
        }).catch((err) => {
          this.loading.close();
          this.$message.error("上传失败，请重试！");
        });
      }
    },
    //文件超出个数限制时的函数
    handleExceed(files, fileList) {
      this.$message.info(`最多只允许上传${this.limit}张图片`);
    },
    //清空已上传的文件列表
    clearFiles() {
      this.$refs.upload.clearFiles();
      this.values = [];
      this.showUpload = false;
      this.$emit("clear");
    },
    onSuccess() {

    },
    onError() {

    }
  },
};
</script>

<style  scope>
.hide .el-upload--picture-card {
  display: none !important;
}


.avatar-uploader>.el-upload {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 0px;
  background: #fff;
}

.avatar-uploader .el-upload-dragger {
  width: 150px;
  height: 150px;
  line-height: 150px;
  border-radius: 0px;
  background: #fff;
}

.avatar-uploader>.el-upload>i {
  font-size: 28px;
  color: #ccc;
}

/* .avatar-uploader>.el-upload-list {
  display: block;
} */

.avatar-uploader>.el-upload-list>.el-upload-list__item {
  width: 150px;
  height: 150px;
  /* display: block; */
}

.avatar-uploader>.el-upload-list>.el-upload-list__item>img {
  width: 150px;
  height: 150px;
  border-radius: 0px;
}
</style>
