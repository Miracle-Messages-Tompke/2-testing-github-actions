#! /usr/bin/env node
/* eslint-disable no-undef */

const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
const owner = 'AAInternal';
const repo = 'Aileron';

octokit.request('GET /repos/{owner}/{repo}/actions/caches', {
  owner,
  repo,
}).then((request) => {
  const { data } = request;

  data.actions_caches.forEach(async (cache) => {
    console.log(`Deleting cache: ${  cache.key}`);

    await octokit.request('DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}', {
      owner,
      repo,
      cache_id: cache.id,
    });
  });
}).finally(() => {
  console.log("Cache's removed");
});
