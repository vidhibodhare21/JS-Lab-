# JSON Table Studio

A small browser demo showing how to load JSON with both the native `fetch()` API and jQuery `$.getJSON()`, then render the records dynamically into a table.

## Run locally

Because browser requests to local JSON files can be blocked when opening `index.html` directly, serve the folder over HTTP:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Use either button to reload the table and see which API supplied the current rows.
