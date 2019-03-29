<template>
  <div class="play-view window-height window-width" style="overflow: hidden">
    <div
      class="toolbar primary fixed shadow-1"
      :class="{active: active || !showedToolbar}"
    >
      <q-toolbar-title :padding="1">
        {{url}}
      </q-toolbar-title>
      <button @click="refresh">
        <i>refresh</i>
      </button>
    </div>
    <div
      class="window-height window-width row items-center justify-center"
      v-show="!iframeLoaded"
    >
      <q-spinner
        color="primary"
        size="3em"
      />
    </div>
    <iframe
      ref="urlIframe"
      v-show="iframeLoaded"
      :src="url"
      @load="onload"
      class="full-height full-width"
      style="border: 0;"
    ></iframe>
  </div>
</template>

<script>
export default {
  data () {
    let url = decodeURIComponent(this.$route.params.url)
    return {
      url,
      active: true,
      iframeLoaded: false,
      showedToolbar: false
    }
  },
  methods: {
    onload () {
      this.active = false
      this.iframeLoaded = true
    },
    toggle () {
      this.active = !this.active
    },
    refresh () {
      let url = this.url
      setTimeout(() => {
        this.url = ''
        this.iframeLoaded = false
        this.$nextTick(() => {
          this.url = url
        })
      }, 350)
      this.active = false
    }
  },
  mounted () {
    setTimeout(() => {
      this.showedToolbar = true
    }, 1000)
  },
  watch: {
    '$route' () {
      let newurl = decodeURIComponent(this.$route.params.url)
      if (this.url !== newurl) {
        this.url = newurl
        // this.refresh()
      }
    }
  }

}
</script>

<style lang="stylus">
  .play-view
    .toolbar
      left 0
      right 0
      transform translateY(-101%)
      transition all .3s ease
      overflow visible
      &.active
        transform translateX(0)
    .toggle
      transform translateY(100%)
      a
        opacity 0.6
        border-radius 0 0 5px 5px
    .toolbar-title
      font-size 0.8rem
</style>
