<template>
  <div>
    <video-background
      src="/video/bg-video.mp4"
      style="height: 100vh;"
      poster="/images/poster.png"
    >
      <div class="container-fluid overflow-auto">
        <div class="row ">
          <div class="col-12 col-lg-4 bg-img d-none d-lg-block" style="background-image: url('/images/login.svg');background-size: cover;height: 100vh;" />
          <div class="col-12  col-lg-8 pt-4 px-3 px-sm-5 px-md-5 pb-5">
            <div class="row">
              <div class="col-12 py-3 text-center">
                <svg
                  width="225"
                  height="32"
                  viewBox="0 0 225 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                >
                  <rect width="225" height="32" fill="url(#pattern0)" />
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_129_1673" transform="matrix(0.000429185 0 0 0.0030177 0 -0.000938841)" />
                    </pattern>
                    <image id="image0_129_1673" width="2330" height="332" xlink:href="data:image/png;base64,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" />
                  </defs>
                </svg>
              </div>
            </div>
            <div class="row" style="height: 90%">
              <div class="col-12 my-auto">
                <div class="text-center pt-1 ">
                  <h2 class="fw-bolder display-6 text-center">
                    {{ t('Log In') }}
                  </h2>
                  <span class="fs-5 pt-1 text-muted">{{ t('Welcome back,') }}</span>
                </div>
                <div class="row pt-2">
                  <div class="col-12">
                    <form method="POST" class=" pb-5 " @submit.prevent="loginNow">
                      <div class="row pt-3 justify-content-center">
                        <div class="col-12 col-sm-8 col-md-8 col-lg-6">
                          <label class="form-label">{{ t('Email') }}</label>
                          <input v-model="form.email" type="email" placeholder="Email" class="form-control">
                          <div v-if="errors.email" class="invalid-feedback d-block">
                            {{ errors.email[0] }}
                          </div>
                          <div v-if="auth_error" class="invalid-feedback d-block">
                            {{ t('Email or password is wrong, please try again!') }}
                          </div>
                        </div>
                      </div>
                      <div class="row justify-content-center pt-3">
                        <div class="col-12 col-sm-8 col-md-8 col-lg-6">
                          <label class="form-label">{{ t('Password') }}</label>
                          <input v-model="form.password" type="password" :placeholder="t('Password')" class="form-control">
                          <span class="float-end pt-2">
                            <router-link :to="localePath('/auth/forgot')" class="forgot-link" href="#">{{ t('Forgot Password') }}</router-link>
                          </span>
                        </div>
                      </div>
                      <div class="row justify-content-center pb-5">
                        <div class="col-12 col-sm-8 col-md-8 col-lg-6 pt-4 text-center">
                          <button type="submit" style="min-width:fit-content" class=" login-btn col-12">
                            {{ t('Sign In') }} <div v-if="loading" class="spinner-border spinner-border-sm" role="status">
                              <span class="sr-only">{{ t('Loading...') }}</span>
                            </div>
                          </button>
                          <h5 class="text-center pt-3">
                            {{ t('Don’t have an Account?') }} <NuxtLink class="signup-link" :to="localePath('/auth/signup')">
                              {{ t("Sign Up") }}
                            </NuxtLink>
                          </h5>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </video-background>
  </div>
</template>
<script>
import { mapState, mapActions } from 'pinia'
import backgroundImagePath from '~/assets/image/login4.png'
import { useUserStore } from '@/stores/user'
// import { useBufferStore } from '~/stores/buffer'
export default {
  name: 'Login',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()

    return {
      t,
      localePath
    }
  },
  data () {
    return {
      loading: false,
      form: {
        email: '',
        password: ''
      },
      auth_error: false,
      backgroundImagePath,
      errors: []
    }
  },
  computed: {
    ...mapState(useUserStore, ['is_login', 'user', 'token']),
    translate (tag) {
      const { t } = useI18n()
      return t(tag)
    }
  },
  mounted () {

    // console.log({ nuxtApp })

    // console.log({ db })

    // if (this.is_login){
    //   this.$router.push('/onboarding');
    // }
  },
  methods: {
    ...mapActions(useUserStore, ['login', 'logout']),
    loginNow () {
      this.errors = []
      this.auth_error = false
      this.loading = true

      this.$axios.post('/api/login', this.form).then(({ data }) => {
        this.loading = false

        if (data.status === 'success') {
          this.$axios.head.Authorization = 'bearer ' + data.authorisation.token
          this.login(data.user, data.authorisation.token)
          this.$toast.success('Login Successfully....')

          //
          // If a user already did the onboarding, then the soundscape will be defined, so we can jump
          // directly to the selected soundscape and start play.
          //
          let soundscape = 'Lagoon'
          if (data.user.settings) { // if the user logged in first time no settings available, so push to onboarding
            soundscape = data.user.settings.soundscape
            if (soundscape !== '') {
            // const soundscape = user.user.settings.soundscape
              let url
              switch (soundscape) {
                case 'Lagoon':
                  url = '/'
                  break
                case 'Meadow':
                  url = 'homemeadow'
                  break
                case 'x':
                  url = 'hometropics'
                  break
                case 'Forest':
                  url = 'homeforest'
                  break
                default:
                  url = '/'
                  break
              }
              this.$router.push(this.localePath(url))
            }
          } else {
            this.$router.push(this.localePath('/onboarding/selectinput'))
          }
        } else {
          this.$toast.error('Email or password is incorrect.')
        }
      }).catch((error) => {
        if (error.message === 'user is not defined') {
          this.loading = false
        } else {
          this.loading = false
          if ((error.code === 'ERR_NETWORK' || error.code === 'NS_ERROR_DOM_BAD_URI') && this.user !== null && this.token !== '') {
            this.$toast.warn(this.translate('Offline mode, please go online soon.'))
            this.login(this.user, this.token)
          }
          if (error.response.status === 500) {
            this.auth_error = true
            this.$toast.error('Es ist etwas schiefgelaufen. Versuche es später erneut')
          }
          if (error.response.status === 401) {
            this.auth_error = true
            this.$toast.error('Email or password is incorrect.')
          }
          if (error.response.status === 422) {
            this.errors = error.response.data.errors
          }
        }
      })
    }

  }
}
</script>
<style>
.videobg-content{
  overflow: auto !important;
}
</style>
~/stores/audio
