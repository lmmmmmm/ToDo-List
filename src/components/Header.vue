<template>
  <el-row id="header">
    <el-col :span="4">
      <p>TODO-LIST</p>
    </el-col>
    <el-col :offset="6" :span="4">
      <p>{{date}}</p>
    </el-col>
    <el-col :span="2" :offset="5" class="info">
      <span>
        <a href="https://stonhouse.top/" target="_blank">Bolg</a>
      </span>
    </el-col>
    <el-col :span="3" class="info">
      <a href="https://github.com/lmmmmmm/" target="_blank">GitHub</a>
    </el-col>
  </el-row>
</template>

<script>
import dateUtils from "../util/DateUtils.js";
export default {
  data() {
    return {
      date: dateUtils.formartDate(new Date())
    };
  }
};
</script>

<style>
#header {
  height: 75px;
  background: #3fb6f6;
  margin-top: 0px !important;
}
p {
  font-family: sans-serif;
  color: white;
  font-size: 22px;
}
</style>
