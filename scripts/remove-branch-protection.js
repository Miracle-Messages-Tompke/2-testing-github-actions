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
  restrictions: null,
  required_status_checks: null,
  enforce_admins: null,
  required_pull_request_reviews: null,
  required_linear_history: false,
  allow_force_pushes: false,
  allow_deletions: false,
  required_conversation_resolution: false,
}).then(() => {
  console.log("Disabled branch protection temporarily.");
}).catch((err) => {
  console.error(err);

  process.exit(1);
});
