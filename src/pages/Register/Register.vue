<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form } from "vant";
import { Field } from "vant";
Vue.use(Field);
Vue.use(Form);
export default {
  data() {
    return {
      phone: "",
      nickname:"",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$http
        .post("/register", {
          phone: this.phone,
          nickname:this.nickname,
          password: this.password,
        })
        .then((res) => {
          console.log(res)
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
