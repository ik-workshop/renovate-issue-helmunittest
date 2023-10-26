const Fs = require('fs');

module.exports = {
  "platform": "github",
  "token": process.env.RENOVATE_TOKEN,
  "repositories": JSON.parse(Fs.readFileSync('repos.json', 'utf8')),
  "logLevel": process.env.LOG_LEVEL,
  "gitAuthor": "Renovate Bot <bot@renovateapp.com>",
  "prConcurrentLimit": 0,
  "prHourlyLimit": 0,
  "pruneStaleBranches": true,
  "recreateWhen": "always",
  "onboarding": false,
  "requireConfig": "optional",
  "baseBranches": ["master", "main"],
  "enabledManagers": [
    "gitlabci",
    "regex",
  ],
  "packageRules": [
    {
      "matchDatasources": ["docker"],
      "matchPackageNames": ["helmunittest/helm-unittest"],
      // "versioning": "regex:^(?<compatibility>.*)-(?<major>\\d+)\.(?<minor>\\d+)\.(?<patch>\\d+)$",
      "versioning": "loose",
      "prBodyDefinitions": {
        "Sources": "[Sources](https://github.com/helm-unittest/helm-unittest)"
      },
      "prBodyColumns": [
        "Package",
        "Update",
        "Change",
        "Sources"
      ]
    },
  ],
  "regexManagers": [

  ],
  "customManagers": [
    {
      "customType": "regex",
      "description": "Update docker references in Makefile",
      "fileMatch": [".*"],
      "matchStrings": [
        ".*_(RENOVATE_IMAGE|IMAGE):\\s*(?<depName>.*):(?<currentValue>[a-z0-9.-]+)(?:@(?<currentDigest>sha256:[a-f0-9]+))?"
      ],
      "datasourceTemplate": "docker",
      "versioningTemplate": "docker"
    },
    {
      "customType": "regex",
      "description": "Update docker references in Makefile v2",
      "fileMatch": [".*"],
      "matchStrings": [
        ".*_IMAGE\\s*:=\\s*(?<depName>.*):(?<currentValue>[a-z0-9.-]+)"
      ],
      "datasourceTemplate": "docker"
    },
  ]
}