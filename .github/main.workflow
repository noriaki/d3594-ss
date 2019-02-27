workflow "Deploy on Now (Staging)" {
  on = "pull_request"
  resolves = [
    "actions/bin/debug@master",
    "alias",
  ]
}

action "only opened, synchronize" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "action 'opened|synchronize'"
}

action "deploy-staging" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["only opened, synchronize"]
  secrets = ["ZEIT_TOKEN"]
  args = "deploy --env NODE_ENV=staging --public --no-clipboard > $HOME/$GITHUB_ACTION.txt"
}

action "actions/bin/debug@master" {
  uses = "actions/bin/debug@master"
}

action "alias" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  args = "alias `cat ${HOME}/deploy-staging.txt` d3594-ss-stg"
  secrets = ["ZEIT_TOKEN"]
  needs = ["deploy-staging"]
}

workflow "Deploy on Now" {
  on = "push"
  resolves = ["release"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  args = "branch master"
}

action "deploy" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["Filters for GitHub Actions"]
  secrets = ["ZEIT_TOKEN"]
  args = "deploy --env NODE_ENV=production --public --no-clipboard > $HOME/$GITHUB_ACTION.txt"
}

action "release" {
  uses = "actions/zeit-now@666edee2f3632660e9829cb6801ee5b7d47b303d"
  needs = ["deploy"]
  args = "alias --local-config=./now.json"
  secrets = ["ZEIT_TOKEN"]
}
