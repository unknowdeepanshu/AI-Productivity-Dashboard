import express from "express";
import {
  getCommentedIssues,
  getCommentedPullRequests,
  getOrgRepoIssuesAndPRs,
  githubAuthCallback,
  githubAuthRedirect,
  githubUser,
  htmlpage,
  listIssues,
} from "./github.controller.js";

const router = express.Router();

router.get("/auth/github", githubAuthRedirect);
router.get("/auth/github/callback", githubAuthCallback);
router.get("/github", htmlpage);
router.get("/state/:DB_ID", githubUser);
router.get("/issue/comments", getCommentedIssues);
router.get("/issue/list", listIssues);
router.get("/pr/comments", getCommentedPullRequests);
router.get("/org/issueandpr", getOrgRepoIssuesAndPRs);

export default router;
