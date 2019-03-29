export function ClickRefresh (context) {
  context.commit('setRefresh', true)
}

export function CloseRefresh (context) {
  context.commit('setRefresh', false)
}

export function ClickForward (context) {
  context.commit('setForward', true)
}

export function CloseForward (context) {
  context.commit('setForward', false)
}

export function ClickBack (context) {
  context.commit('setBack', true)
}

export function CloseBack (context) {
  context.commit('setBack', false)
}
