workflow "Deploy on Now" {
  on = "pull_request"
  resolves = [
    "deploy",
    "hmarr/debug-action",
    "actions/bin/debug@master",
  ]
}

action "Only opened, synchronize" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "action 'opened|synchronize'"
}

action "deploy" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["Only opened, synchronize"]
  secrets = ["ZEIT_TOKEN"]
  env = {
    NODE_ENV = "staging"
  }
}

action "hmarr/debug-action" {
  uses = "hmarr/debug-action@master"
}

action "actions/bin/debug@master" {
  uses = "actions/bin/debug@master"
}
