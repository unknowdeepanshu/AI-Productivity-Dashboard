import axios from "axios";
import { Tools } from "../../model/user.model.js";
import { Octokit } from "@octokit/rest";

export function getGitHubClient(accessToken) {
  return new Octokit({
    auth: accessToken,
  });
}

export async function githubAuthRedirect(req, res) {
  try {
    // 1️⃣ Find an EMPTY github tool
    let tool = await Tools.findOne({
      toolName: "github",
      $and: [
        {
          $or: [{ username: "" }, { username: { $exists: false } }],
        },
        {
          $or: [{ id: "" }, { id: { $exists: false } }],
        },
        {
          $or: [
            { accessToken: null },
            { "accessToken.token": { $exists: false } },
          ],
        },
      ],
    });

    // 2️⃣ If no empty tool exists → create one
    if (!tool) {
      tool = await Tools.create({
        toolName: "github",
        username: "",
        id: "",
        accessToken: null,
        ownedServers: [],
        otherServers: [],
      });
      console.log("Created NEW empty GitHub tool:", tool._id.toString());
    } else {
      console.log("Reusing EXISTING empty GitHub tool:", tool._id.toString());
    }

    // 3️⃣ Use tool._id as state (TESTING ONLY)
    const stateId = tool._id.toString();

    const githubAuthUrl =
      "https://github.com/login/oauth/authorize" +
      `?client_id=${process.env.GITHUB_CLIENT_ID}` +
      "&scope=read:user repo" +
      `&state=${stateId}`;

    res.redirect(githubAuthUrl);
  } catch (err) {
    console.error("GitHub redirect error:", err);
    res.status(500).send("GitHub auth error");
  }
}

export async function htmlpage(req, res) {
  res.send(`
    <html>
      <body style="font-family:sans-serif">
        <h2>GitHub Integration</h2>
        <p>Connect your GitHub account to sync repos.</p>

        <a href="/auth/github">
          <button>Connect GitHub</button>
        </a>
      </body>
    </html>
  `);
}

export async function githubAuthCallback(req, res) {
  const { code, state: userId } = req.query;

  const tokenRes = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    },
    { headers: { Accept: "application/json" } },
  );

  const { access_token } = tokenRes.data;
  const result = await Tools.updateOne(
    {
      _id: userId,
      toolName: "github",
      $or: [
        { accessToken: { $exists: false } },
        { accessToken: null },
        { "accessToken.token": { $exists: false } },
        { "accessToken.token": "" },
      ],
    },
    {
      $set: {
        accessToken: {
          token: access_token,
          expiresAt: null,
        },
      },
    },
  );

  if (result.matchedCount === 0) {
    return res.json({
      message: "Access token already exists. Skipping update.",
      accessToken: access_token,
    });
  }

  res.json({
    message: "Access token saved successfully",
    accessToken: access_token,
  });
}

//this for user details and repos list and owned repo and org with repo
export async function githubUser(req, res) {
  const { DB_ID } = req.params;

  console.log("User ID:", DB_ID);
  const tool = await Tools.findOne({ _id: DB_ID, toolName: "github" });

  if (!tool.accessToken.token) {
    return res.json({ accessToken: "not present" });
  }

  const octokit = getGitHubClient(tool.accessToken.token);
  //get user details and repos
  const { data: user } = await octokit.rest.users.getAuthenticated();

  //get all repos for the authenticated user
  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: "all",
    affiliation: "owner",
    per_page: 100,
  });

  const reposData = [];
  for (const repo of repos.data) {
    reposData.push({
      name: repo.name,
      full_name: repo.full_name,
      private: repo.private,
      url: repo.html_url,
    });
  }
  await Tools.findOneAndUpdate(
    { _id: DB_ID },
    { username: user.login },
    { id: user.id },
    {
      $push: {
        ownedServers: {
          serverId: user.id.toString(),
          serverName: user.login + "'s GitHub Repo Server",
          channels: reposData,
          accessList: [],
        },
      },
    },
  );
  let orgs = [];
  try {
    const { data } = await octokit.rest.orgs.listForAuthenticatedUser();

    orgs = data.map((org) => ({
      orgLogin: org.login,
      orgId: org.id,
      avatar: org.avatar_url,
    }));
  } catch (err) {
    console.error("Error fetching orgs:", err);
  }

  const { data } = await octokit.rest.repos.listForOrg({
    org: "just-test-for-me",
    type: "all", // all | public | private | forks | sources | member
    sort: "updated",
    per_page: 100,
  });
  let OrgRepos = data.map((repo) => ({
    name: repo.name,
    full_name: repo.full_name,
    url: repo.html_url,
  }));
  const finalData = orgs.map((org) => ({
    ...org,
    repos: OrgRepos.filter((repo) =>
      repo.full_name.startsWith(`${org.orgLogin}/`),
    ),
  }));

  res.json({
    user: user.login,
    userId: user.id,
    repos: reposData,
    org: finalData,
  });

  // res.json(data);
  console.log("this github repos  ", repos.data);
}

//this org repo with issue and pr list with comments for tambo ai when user select repo for sync
export async function getOrgRepoIssuesAndPRs(req, res) {
  try {
    // const { org, repo } = req.query;

    const org = "just-test-for-me";
    const repo = "this-google";

    const octokit = getGitHubClient(process.env.GITHUB_ACCESS_TOKEN);

    /* ---------------- ISSUES ---------------- */
    const issuesRes = await octokit.rest.issues.listForRepo({
      owner: org,
      repo: repo,
      state: "all",
      per_page: 100,
    });

    const issues = [];

    for (const issue of issuesRes.data) {
      // skip PRs (GitHub returns PRs as issues)
      if (issue.pull_request) continue;

      const commentsRes = await octokit.rest.issues.listComments({
        owner: org,
        repo: repo,
        issue_number: issue.number,
      });

      issues.push({
        issueNumber: issue.number,
        title: issue.title,
        body: issue.body,
        user: issue.user.login,
        comments: commentsRes.data.map((c) => ({
          user: c.user.login,
          body: c.body,
          createdAt: c.created_at,
        })),
      });
    }

    /* ---------------- PULL REQUESTS ---------------- */
    const prsRes = await octokit.rest.pulls.list({
      owner: org,
      repo: repo,
      state: "all",
      per_page: 100,
    });

    const pullRequests = [];

    for (const pr of prsRes.data) {
      const prCommentsRes = await octokit.rest.pulls.listReviewComments({
        owner: org,
        repo: repo,
        pull_number: pr.number,
      });

      pullRequests.push({
        prNumber: pr.number,
        title: pr.title,
        body: pr.body,
        user: pr.user.login,
        comments: prCommentsRes.data.map((c) => ({
          user: c.user.login,
          body: c.body,
          createdAt: c.created_at,
        })),
      });
    }

    /* ---------------- FINAL RESPONSE ---------------- */
    res.json({
      org,
      repo,
      issues,
      pullRequests,
    });
    // res.json(issuesRes);
  } catch (error) {
    console.error("this is error", error);
    res.status(500).json({ error: error.message });
  }
}

// this for tambo ai get comment issue selected
export async function getCommentedIssues(req, res) {
  // Step 1: get updated issues since last check
  const octokit = getGitHubClient(process.env.GITHUB_ACCESS_TOKEN);

  const { data } = await octokit.rest.issues.listForRepo({
    owner: "vishwakrmadipasnshu-cell",
    repo: "test-for-auth",
    state: "all",
    per_page: 100,
  });

  const result = [];

  for (const comment of data) {
    result.push({
      issueUrl: comment.url,
      issueNumber: comment.number,
      userName: comment.user.login,
      title: comment.title,
      body: comment.body,
    });
  }
  const message = [];
  // // Step 2: fetch ONLY new comments
  for (const issue of data) {
    const datas = await octokit.rest.issues.listComments({
      owner: "vishwakrmadipasnshu-cell",
      repo: "test-for-auth",
      issue_number: issue.number,
    });
    const comments = [];
    if (datas.data.length > 0) {
      for (const comment of datas.data) {
        comments.push({
          userName: comment.user.login,
          commentBody: comment.body,
        });
      }
      message.push({
        issueNumber: datas.data[0].issue_url.split("/").slice(-1)[0],
        Comments: comments,
      });
    }
  }
  const finalData = [];

  for (const issue of result) {
    // find matching comments by issueNumber
    const msg = message.find(
      (m) => Number(m.issueNumber) === issue.issueNumber,
    );

    finalData.push({
      ...issue,
      Comments: msg ? msg.Comments : [],
    });
  }
  res.json(finalData);
}

// this for tambo ai list all comment pull request in repo and their comments
export async function getCommentedPullRequests(req, res) {
  const octokit = getGitHubClient(process.env.GITHUB_ACCESS_TOKEN);

  const owner = "vishwakrmadipasnshu-cell";
  const repo = "test-for-auth";

  // 1️⃣ Get pull requests
  const { data: pulls } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "all",
    per_page: 100,
  });

  const finalData = [];

  for (const pr of pulls) {
    // 2️⃣ Issue comments on PR
    const issueCommentsRes = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number: pr.number,
    });

    // 3️⃣ Review (inline) comments
    const reviewCommentsRes = await octokit.rest.pulls.listReviewComments({
      owner,
      repo,
      pull_number: pr.number,
    });

    const comments = [];

    // issue comments
    for (const c of issueCommentsRes.data) {
      comments.push({
        type: "issue_comment",
        userName: c.user.login,
        commentBody: c.body,
        createdAt: c.created_at,
      });
    }

    // review comments
    for (const c of reviewCommentsRes.data) {
      comments.push({
        type: "review_comment",
        userName: c.user.login,
        commentBody: c.body,
        file: c.path,
        line: c.line,
        createdAt: c.created_at,
      });
    }

    finalData.push({
      prUrl: pr.html_url,
      prNumber: pr.number,
      title: pr.title,
      body: pr.body,
      userName: pr.user.login,
      state: pr.state,
      Comments: comments,
    });
  }

  res.json(finalData);
}

export async function listIssues(req, res) {
  const octokit = getGitHubClient("698605ef9acb1465fe18fcd5");
  const data = await octokit.rest.issues.listForRepo({
    owner: "vishwakrmadipasnshu-cell",
    repo: "test-for-auth",
    state: "all",
    per_page: 100,
  });

  res.json(data);
  // return result;
}
