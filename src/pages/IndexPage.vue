<template>
  <q-page>
    <div class="bg-positive q-pa-lg" style="height: 220px">
      <div class="flex" style="align-items: center">
        <q-img
          src="../assets/icon.svg"
          spinner-color="white"
          style="height: 35px; max-width: 35px"
        />
        <h6 class="q-my-none q-ml-sm">Whatsapp Clone</h6>
      </div>
    </div>
    <div class="q-px-lg">
      <q-card style="margin-top: -7rem">
        <q-card-section>
          <div class="row w-100">
            <div
              class="col-md-6 col-12 flex flex-center q-mb-lg"
              v-if="!$q.screen.md"
            >
              <img
                alt="App Logo"
                src="~assets/img_1.svg"
                style="width: 200px; height: 200px"
              />
            </div>
            <div class="col-md-6 col-12 flex flex-center">
              <div class="text-center text-md-initial">
                <span class="text-blue-grey-3">Whatsapp Clone</span>
                <h3 class="q-mb-lg q-mt-none text-white text-weight-bold">
                  Chat with your friends
                </h3>
                <div class="q-ml-md q-pl-md q-py-sm border-left text-white">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime accusantium, enim ducimus qui unde dolor dolore
                    eligendi, nobis iste nisi ipsam eos officia quis ut. Maxime
                    optio facilis asperiores animi? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Maxime accusantium
                  </p>
                  <div class="q-mt-lg">
                    <q-btn
                      icon="login"
                      color="positive"
                      label="Sign in"
                      class="q-mr-md"
                      @click="login"
                    />
                    <q-btn
                      icon="lab la-github"
                      color="white"
                      outline
                      text-color="white"
                      label="Github"
                      href="https://github.com/andresmarquez02/whatsapp-clone"
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-12 flex flex-center" v-if="$q.screen.md">
              <img
                alt="App Logo"
                src="~assets/img_1.svg"
                style="width: 500px; height: 500px"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useAuthStore } from "../stores/auth/authStore";

const $q = useQuasar();
const authStore = useAuthStore();
const { login } = authStore;
</script>

<style lang="scss">
.w-100 {
  width: 100%;
}
@media (min-width: 1024px) {
  .border-left {
    border-left: 2px rgb(88, 88, 88) solid;
  }
  .text-md-initial {
    text-align: initial;
  }
}
</style>
