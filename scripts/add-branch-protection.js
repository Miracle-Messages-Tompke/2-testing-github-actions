#! /usr/bin/env node
/* eslint-disable no-undef */

const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const owner = 'AAInternal';
const repo = 'Aileron';

octokit.request('PUT /repos/{owner}/{repo}/branches/{branch}/protection', {
  owner,
  repo,
  branch: process.env.GITHUB_BRANCH,
  required_status_checks:{
    strict: true,
    contexts: [
      "e2e-tests",
      "build",
      "lint"
    ]
  },
  enforce_admins: true,
  required_pull_request_reviews: {
    required_approving_review_count: 1,
    dismiss_stale_reviews: false,
    require_code_owner_reviews: false
  },
  required_linear_history: true,
  allow_force_pushes: false,
  allow_deletions: false,
  required_conversation_resolution: true,
  restrictions: {
    users: [
      "ozee",
      "JoseAndresNC",
      "stompkeAA"
    ],
    teams: [],
  }
}).then(() => {
  console.log("Activated branch protection.");
}).catch((err) => {
  console.error(err);

  process.exit(1);
});
