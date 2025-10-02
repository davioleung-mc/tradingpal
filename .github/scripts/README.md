# IndexNow Automation Scripts

This directory contains scripts for automatically submitting URLs to IndexNow-enabled search engines (Bing, Yandex, etc.).

## Files

- **`submit-indexnow.sh`**: Main script that fetches your sitemap and submits all URLs to IndexNow API

## How It Works

### Automatic Submission (On Every Deploy)

The main deployment workflow (`.github/workflows/main.yml`) automatically:
1. Deploys your site to GitHub Pages
2. Fetches your sitemap from `https://thetradingpal.com/sitemap.xml`
3. Extracts all URLs
4. Submits them to IndexNow API

This happens **automatically on every push to main branch**.

### Manual Submission

You can also trigger IndexNow submissions manually:

1. Go to **Actions** tab in GitHub
2. Select **"Manual IndexNow Submission"** workflow
3. Click **"Run workflow"**
4. Options:
   - Leave empty to submit all URLs from sitemap
   - Or enter specific URLs (comma-separated): `https://thetradingpal.com/page1, https://thetradingpal.com/page2`

## API Key

The IndexNow API key is stored in:
- File: `/docs/public/808a8e0f85704699a6d532f0c2fb5a4a.txt`
- Key: `808a8e0f85704699a6d532f0c2fb5a4a`

This file is publicly accessible at `https://thetradingpal.com/808a8e0f85704699a6d532f0c2fb5a4a.txt` for verification.

## Response Codes

- **200/202**: Success - URLs submitted
- **400**: Bad request - Invalid format
- **403**: Forbidden - API key validation failed
- **422**: Unprocessable - URLs don't match host
- **429**: Too many requests - Rate limited

## Testing Locally

To test the script locally:

```bash
cd .github/scripts
chmod +x submit-indexnow.sh
./submit-indexnow.sh
```

## Verification

Check submission status in [Bing Webmaster Tools](https://www.bing.com/webmasters/).
