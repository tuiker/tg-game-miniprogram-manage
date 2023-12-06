<template>
    <el-dialog :title="titel" :visible.sync="visible" width="1000px" top="6vh">
        <el-form ref="dataForm" :model="formData" label-width="200px">
            <el-form-item label="游戏名称:" prop="gameName">
                <el-input v-model="formData.gameName" style="width: 400px;" readonly></el-input>
            </el-form-item>
            <el-form-item label="游戏分类:" prop="gameCategoryList">
                <el-checkbox-group v-model="formData.gameCategoryList" size="small" @change="checkedBoxChange" readonly>
                    <el-checkbox v-for="(value, key) in gameCategorys" :key="key" :label="key" border>
                        {{ value }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="游戏LOGO:" prop="gameLogo" class="logo">
                <el-image style="width: 100px; height: 100px" :src="formData.gameLogo"
                    :preview-src-list="[formData.gameLogo]"></el-image>
            </el-form-item>
            <el-form-item label="游戏主图:" prop="gameMainLogo">
                <el-image style="width: 100px; height: 100px;margin-right: 10px;" v-for="(item, index) in mainLogoList"
                    :key="index" :src="item" :preview-src-list="mainLogoList"></el-image>
            </el-form-item>
            <el-form-item label="游戏链接:" prop="gameUrl">
                <el-input type="textarea" resize="none" :rows="4" v-model="formData.gameUrl" style="width: 400px;"
                    readonly></el-input>
            </el-form-item>
            <el-form-item label="添加人:" prop="creator">
                <el-input v-model="formData.creator" style="width: 400px;" readonly></el-input>
            </el-form-item>
            <el-form-item label="添加时间:" prop="createTime">
                <el-input v-model="formData.createTime" style="width: 400px;" readonly></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="visible = false">关 闭</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { GAME_CATEGORYS } from '@/utils/constant'
export default {
    data() {
        return {
            titel: '',
            visible: false,
            formData: {},
            mainLogoList: [],
            gameCategorys: GAME_CATEGORYS
        };
    },
    methods: {
        open(data) {
            this.titel = '游戏详情'
            if (data && data.id) {
                this.formData = { ...data }
                this.formData.gameCategoryList = data.gameCategory.split(',')
                this.mainLogoList = JSON.parse(data.gameMainLogo);
            }
            this.visible = true
        },
    },
}

</script>