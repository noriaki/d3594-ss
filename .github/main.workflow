workflow "Deploy on Now" {
  on = "pull_request"
  resolves = [
    "deploy to staging",
    "actions/bin/debug@master",
  ]
}

action "only opened, synchronize" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "action 'opened|synchronize'"
}

action "deploy to staging" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["only opened, synchronize"]
  secrets = ["ZEIT_TOKEN"]
  args = "deploy --env NODE_ENV=staging"
}

action "actions/bin/debug@master" {
  uses = "actions/bin/debug@master"
}
