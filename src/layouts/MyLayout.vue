<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{toolBar.title}}
          <div slot="subtitle">{{toolBar.subtitle}}</div>
        </q-toolbar-title>

        <q-btn flat round dense icon="arrow_back" class="q-mr-xs" @click.native="back"/>
        <q-btn flat round dense icon="arrow_forward" @click.native="forward"/>
        <q-btn flat round dense icon="refresh" @click.native="refresh" />
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <div v-for="(site, index) in websites" :key="index">
          <q-list-header>{{site.name}}</q-list-header>
          <div v-for="(item, i) in site.sites" :key="i">
            <q-item @click.native="play(item.url),change(item)">
              <q-item-side icon="code" />
              <q-item-main :label="item.name" :sublabel="item.desc" />
            </q-item>
          </div>
        </div>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      websites: {},
      toolBar: { title: '车轮网址导航', subtitle: '最好用的导航工具' }
    }
  },
  created () {
    this.websites = [
      { name: '技术', sites: [{ name: '代码发布', desc: '代码发布', url: 'http://deploy.oa.com' }, { name: '配置中心', desc: '配置中心', url: 'http://cc.oa.com' }] },
      { name: '产品', sites: [{ name: '短链平台', desc: '短链平台', url: 'http://tinyurl.chelun.com' }] }
    ]
  },
  methods: {
    openURL,
    play (url, push = true) {
      push && this.pushQueue(url)
      this.$router.push({
        name: 'play-url',
        params: {
          url: encodeURIComponent(url)
        }
      })
    },
    pushQueue (url, key = 'url_history', type = 'push') {
      let local = this.$q.localStorage
      let history = []
      if (local.has(key)) {
        history = local.get.item(key)
        history = JSON.parse(history)
      }
      if (type === 'push') {
        history.push(url)
      } else {
        history.unshift(url)
      }
      if (history.length > 50) {
        history.pop()
      }
      local.set(key, JSON.stringify(history))
    },
    shiftQueue (key = 'url_history') {
      let local = this.$q.localStorage
      let history = []
      if (local.has(key)) {
        history = local.get.item(key)
        history = JSON.parse(history)
      }
      let url = history.shift()
      local.set(key, JSON.stringify(history))
      return url
    },
    change (item) {
      this.toolBar = { title: item.name, subtitle: item.desc }
    },
    back () {
      this.$store.dispatch('ClickRefresh')
      let oldurl = this.shiftQueue('url_history')
      if (!oldurl) {
        oldurl = '/'
      } else {
        this.pushQueue(oldurl, 'url_forward_log')
      }
      this.play(oldurl, false)
    },
    forward () {
      let oldurl = this.shiftQueue('url_forward_log')
      if (!oldurl) {
        oldurl = '/'
      } else {
        this.pushQueue(oldurl, 'url_history', 'shift')
      }
      this.play(oldurl, false)
    },
    refresh () {
      console.log('tt', this.$refs)
    }
  }
}
</script>

<style>
</style>
