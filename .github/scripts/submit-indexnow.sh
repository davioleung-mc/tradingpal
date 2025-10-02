#!/bin/bash
set -e

# IndexNow submission script
# Extracts URLs from sitemap and submits them to IndexNow API

# Check for required tools
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed."
    echo "Install with: apt-get install jq (Ubuntu) or brew install jq (macOS)"
    exit 1
fi

SITEMAP_URL="https://thetradingpal.com/sitemap.xml"
API_KEY="808a8e0f85704699a6d532f0c2fb5a4a"
KEY_LOCATION="https://thetradingpal.com/808a8e0f85704699a6d532f0c2fb5a4a.txt"
HOST="thetradingpal.com"

echo "Fetching sitemap from $SITEMAP_URL..."
SITEMAP_CONTENT=$(curl -s "$SITEMAP_URL")

# Extract URLs from sitemap (handles both <loc> tags)
# Using sed for better portability across systems
URLS=$(echo "$SITEMAP_CONTENT" | sed -n 's/.*<loc>\(.*\)<\/loc>.*/\1/p' || true)

if [ -z "$URLS" ]; then
  echo "No URLs found in sitemap. Submitting homepage only."
  URLS="https://thetradingpal.com/"
fi

# Convert URLs to JSON array format
URL_ARRAY=$(echo "$URLS" | jq -R -s -c 'split("\n") | map(select(length > 0))')

# Limit to 10,000 URLs per request (IndexNow limit)
URL_COUNT=$(echo "$URL_ARRAY" | jq 'length')
echo "Found $URL_COUNT URLs to submit"

if [ "$URL_COUNT" -gt 10000 ]; then
  echo "Warning: More than 10,000 URLs found. Submitting first 10,000 only."
  URL_ARRAY=$(echo "$URL_ARRAY" | jq '.[0:10000]')
fi

# Create JSON payload
PAYLOAD=$(jq -n \
  --arg host "$HOST" \
  --arg key "$API_KEY" \
  --arg keyLocation "$KEY_LOCATION" \
  --argjson urlList "$URL_ARRAY" \
  '{host: $host, key: $key, keyLocation: $keyLocation, urlList: $urlList}')

echo "Submitting to IndexNow API..."
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
BODY=$(echo "$RESPONSE" | sed '$d')

echo "Response Code: $HTTP_CODE"

case $HTTP_CODE in
  200)
    echo "✓ Success: URLs submitted successfully to IndexNow"
    ;;
  202)
    echo "✓ Accepted: URLs received and will be processed"
    ;;
  400)
    echo "✗ Error 400: Bad request - Invalid format"
    echo "$BODY"
    exit 1
    ;;
  403)
    echo "✗ Error 403: Forbidden - API key validation failed"
    echo "$BODY"
    exit 1
    ;;
  422)
    echo "✗ Error 422: Unprocessable Entity - URLs don't match host or key mismatch"
    echo "$BODY"
    exit 1
    ;;
  429)
    echo "✗ Error 429: Too Many Requests - Rate limited"
    echo "$BODY"
    exit 1
    ;;
  *)
    echo "✗ Unexpected response code: $HTTP_CODE"
    echo "$BODY"
    exit 1
    ;;
esac

echo "IndexNow submission completed successfully!"
