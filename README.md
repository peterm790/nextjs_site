# Pete's Website

## Deploying to petemarsh.com

The production site is hosted by Vercel in the `petes-website` project.

1. Push the validated commit to the `main` branch on GitHub.
2. If Vercel does not deploy it automatically, open the Vercel project and go to **Deployments**.
3. Select **Deployments actions → Create Deployment**.
4. Enter `main` or the exact Git commit SHA and create the preview deployment.
5. Verify the preview, then promote that deployment to production. This updates `https://petemarsh.com`.
