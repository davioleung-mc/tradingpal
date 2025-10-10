# n8n Workflow Notes

- **Loop Over Items (`splitInBatches`)**
  - Always set `batchSize: 1`. Forgetting this caused the loop to stop after the first row.
  - Keep `reset` **disabled**. Leaving it enabled made the node restart on the same row repeatedly because it reinitialized the buffer each loop.
  - Connect the processing branch back into the same input port. Do **not** insert pass-through nodes (e.g., extra `Set` / "Continue Loop")—they aren’t needed and previously broke iteration.
  - Bottom output is the *loop* path; top output is *done*. Only use the top path if you need a completion handler.
  - Exports omit `batchSize` when it equals the default (`1`). Seeing it absent in the JSON does **not** mean the setting was lost.

- **Data integrity across branches**
  - Make sure every branch feeding `Update Sheet Row` outputs `row_number`, `googleIndexed`, `googleImpressions`, and `googleClicks`. Missing `row_number` or renaming fields stalled updates in earlier debugging.
  - In `Set` nodes, field names must **not** start with `=` (e.g., use `row_number`, not `=row_number`). The leading equals prevented downstream nodes from reading the data.

- **Set node behavior**
  - The toggle is named "Include Other Input Fields".
  - Turn it **OFF** to output only the fields you configure in the `Set` node (equivalent to "keep only set").
  - Turn it **ON** to pass through all original input fields in addition to the ones you set.

- **JSON Bodies in HTTP Request Nodes**
  - Do **not** prefix JSON keys or values with `=`. Embed expressions directly with `{{ ... }}` inside plain JSON. Adding `=` caused repeated “Forbidden” and parsing errors.

- **Testing helper**
  - Use a temporary `Set` node with "Include Other Input Fields" set to **OFF** to craft test items when validating downstream nodes like the Search Analytics fetch. Run that node manually, then execute the target node.

- **Search Analytics Fetch (True branch of `Indexed?`)**
  - Endpoint: `https://searchconsole.googleapis.com/webmasters/v3/sites/https://thetradingpal.com/searchAnalytics/query`.
  - Authenticate with the Google Service Account credential that includes the `https://www.googleapis.com/auth/webmasters.readonly` scope.
  - Example body:
    ```json
    {
      "startDate": "{{ $json.startDate || $now.add({ days: -28 }).format('YYYY-MM-DD') }}",
      "endDate": "{{ $json.endDate || $now.format('YYYY-MM-DD') }}",
      "dimensions": ["page"],
      "dimensionFilterGroups": [
        {
          "filters": [
            {
              "dimension": "page",
              "operator": "equals",
              "expression": "{{ $json.URL }}"
            }
          ]
        }
      ],
      "rowLimit": 1
    }
    ```
  - Parse `rows[0].impressions` and `rows[0].clicks`, falling back to `0` when no data is returned.
  - When using expression mode in n8n, wrap the whole value with `{{ ... }}` and call native helpers like `encodeURIComponent`. Example URL expression for a domain property:
    ```
    {{ 'https://searchconsole.googleapis.com/webmasters/v3/sites/' + encodeURIComponent('sc-domain:thetradingpal.com') + '/searchAnalytics/query' }}
    ```
  - Build the JSON body as an object inside the expression to avoid `"undefined"` strings:
    ```
    {{ {
        startDate: $json.startDate ?? $now.minus({ days: 28 }).toFormat('yyyy-MM-dd'),
        endDate: $json.endDate ?? $now.toFormat('yyyy-MM-dd'),
        dimensions: ['page'],
        dimensionFilterGroups: [
          {
            filters: [
              {
                dimension: 'page',
                operator: 'equals',
                expression: $json.URL
              }
            ]
          }
        ],
        rowLimit: 1
      }
    }}
    ```

- **General debugging reminders**
  - When the Inspect URL node fails with “Forbidden,” confirm Search Console property access and scopes (`indexing` for inspection, `webmasters.readonly` for analytics) and verify the JSON body is expression-free of leading equals.
  - Avoid reintroducing optional nodes (e.g., `Split Out`) unless the upstream node truly outputs nested arrays. `Get rows` already emits one item per row.
