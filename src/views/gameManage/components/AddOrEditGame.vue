<template>
    <el-dialog :title="titel" :visible.sync="visible" width="1000px" top="6vh" @close="resetFormData">
        <el-form ref="dataForm" :rules="rules" :model="formData" label-width="200px">
            <el-form-item label="游戏名称:" prop="gameName">
                <el-input v-model="formData.gameName" placeholder="请输入游戏名称" style="width: 400px;"
                    maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="游戏分类:" prop="gameCategoryList">
                <el-checkbox-group v-model="formData.gameCategoryList" size="small" @change="checkedBoxChange">
                    <el-checkbox v-for="(value, key) in gameCategorys" :key="key" :label="key" border>
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="游戏LOGO:" prop="gameLogo" class="logo">
                <upload :limit="1" :file-list="logoList" @getUrl="getLogoUrl($event, 1)" @delUrl="deleteLogo" drag />
            </el-form-item>
            <el-form-item label="游戏主图:" prop="gameMainLogo">
                <upload ref="gameMainLogoComponent" :limit="5" :file-list="mainLogoList" :showClearBtn="true" drag />
            </el-form-item>
            <el-form-item label="游戏链接:" prop="gameUrl">
                <el-input type="textarea" resize="none" :rows="4" v-model="formData.gameUrl" placeholder="请输入游戏链接"
                    style="width: 400px;" maxlength="500"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { GAME_CATEGORYS } from '@/utils/constant'
import Upload from './Upload.vue'
import { AddGame, UpdateGameById } from '@/api/game'
export default {
    components: {
        Upload,
    },
    data() {
        return {
            titel: '',
            visible: false,
            formData: {},
            logoList: [],
            mainLogoList: [],
            rules: {
                gameName: [{ required: true, message: '请输入游戏名称', trigger: 'blur' }],
                gameCategoryList: [{ required: true, message: '请选择游戏分类', trigger: 'change' }],
                languageId: [{ required: true, message: '请选择游戏语言', trigger: 'change' }],
                gameLogo: [{ required: true, message: '请上传游戏LOGO', trigger: 'change' }],
                gameMainLogo: [{ required: true, message: '请上传游戏主图', trigger: 'change' }],
                gameUrl: [{ required: true, message: '请输入游戏链接', trigger: 'blur' }],
            },
            gameCategorys: GAME_CATEGORYS
        };
    },
    methods: {
        open(data) {
            this.resetFormData();
            if (data && data.id) {
                this.titel = '编辑游戏'
                this.formData = { ...data }
                this.formData.gameCategoryList = data.gameCategory.split(',')
                this.logoList = [{ url: data.gameLogo }]
                this.handlerMainLogoList(data.gameMainLogo)
            } else {
                this.titel = '添加游戏'
            }

            this.visible = true
        },
        //提交表单
        submitForm() {
            this.formData.gameMainLogo = this.getMainLogoValue();
            this.$refs.dataForm.validate((valid) => {
                if (valid) {
                    //将选中的游戏分类用“,”号连接转为字符串
                    this.formData.gameCategory = this.formData.gameCategoryList.join(',')
                    if (this.formData.id) {//修改
                        UpdateGameById(this.formData).then(res => {
                            this.$message.success("修改成功")
                            this.$emit('success')
                            this.visible = false
                        })
                    } else {//添加
                        AddGame(this.formData).then(res => {
                            this.$message.success("添加成功")
                            this.$emit('success')
                            this.visible = false
                        })
                    }
                } else {
                    return false;
                }
            });
        },
        //重置表单
        resetFormData() {
            this.formData = {
                gameName: '',
                gameCategory: '',
                gameCategoryList: [],
                languageId: 2,
                gameLogo: '',
                gameMainLogo: '',
                gameUrl: '',
            }
            this.logoList = []
            this.mainLogoList = []
        },
        //获取游戏LOGO图片url
        getLogoUrl(getUrl, typeNum) {
            this.formData.gameLogo = getUrl
        },
        //删除游戏LOGO图片url
        deleteLogo() {
            this.formData.gameLogo = '';
        },
        //获取游戏主图url
        getMainLogoValue() {
            let gameMainLogoValues = [];
            this.$refs.gameMainLogoComponent.values.forEach(item => {
                if (item && item.realUrl) {
                    gameMainLogoValues.push(item.realUrl);
                }
            })
            return gameMainLogoValues.length > 0 ? JSON.stringify(gameMainLogoValues) : "";
        },
        //处理游戏主图数组
        handlerMainLogoList(mainLogoStr) {
            let self = this;
            self.mainLogoList = [];
            self.gameMainLogoList = JSON.parse(mainLogoStr);
            self.gameMainLogoList.forEach(item => {
                self.mainLogoList.push({ url: item, realUrl: item });
            });
        },
        checkedBoxChange() {
            this.$forceUpdate();  //强制渲染多选框样式，否则值变了样式没有选中
        },
    },
}

</script>