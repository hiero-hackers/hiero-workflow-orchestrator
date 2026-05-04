import { Octokit } from 'octokit'
import dotenv from 'dotenv'

dotenv.config()

// Create authenticated client (use a GitHub token)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
})

async function run() {
  const owner = 'Anxhul10'   // e.g. 'facebook'
  const repo = 'click-skip-youtube'     // e.g. 'react'
  const pull_number = 5        // your PR number

  const commits = await octokit.rest.pulls.listCommits({
    owner,
    repo,
    pull_number
  })

  console.log('Total commits:', commits.data.length)

  commits.data.forEach((c, i) => {
    console.log(`Commit ${i + 1}:`)
    console.log('SHA:', c.sha)
    console.log('Signed:', c.commit.verification.verified)
    console.log('Reason:', c.commit.verification.reason)
    console.log('---')
  })
}

run().catch(console.error)