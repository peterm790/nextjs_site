# Pete's Website

## Deploying to petemarsh.com

The production site is hosted by Vercel in the `petes-website` project. GitHub Actions is the only production deployment path; Vercel's built-in Git deployments are disabled in `vercel.json` to prevent duplicate or ambiguous releases.

Pushing a validated commit to `main` runs `.github/workflows/deploy-production.yml`. The workflow installs the locked dependencies, verifies the static production build, creates Vercel build artifacts, and deploys them to production. Concurrent releases queue rather than cancelling an in-progress production deployment.

The repository requires these GitHub Actions secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The workflow can also be rerun manually from **GitHub → Actions → Deploy production → Run workflow**.
