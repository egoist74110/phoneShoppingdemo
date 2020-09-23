<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写手机号' }]"
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
      password: "",
    };
  },
  methods: {
    onSubmit() {
      this.$http
        .post("/login", {
          phone: this.phone,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.$store.commit("setUser", res.data.list);
            this.$router.back();
          }
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
