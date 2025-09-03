# Usage

`Update()` performs all the specified changes to the document in a single transaction. If you want to update several documents transactionally, use `BulkUpdate()`.

# Examples

Create a new document version and set it to "usable" (the status doesn't need to refer to an exact version as it impicitly targets the one being created by omitting version).

```json
{
  "uuid": "f5d2e4c5-01ba-4dae-9f09-a86701e06ecd",
  "status": [
    {
      "name": "usable"
    }
  ],
  "document": {
    "uuid": "f5d2e4c5-01ba-4dae-9f09-a86701e06ecd",
    "type": "core/planning-item",
    "uri": "core://newscoverage/f5d2e4c5-01ba-4dae-9f09-a86701e06ecd",
    "title": "Rysslands ambassadör kallas upp",
    "meta": [
      {
        "type": "core/planning-item",
        "data": {
          "end_date": "2025-08-29",
          "public": "true",
          "start_date": "2025-08-29",
          "tentative": "false"
        }
      },
      {
        "type": "core/newsvalue",
        "value": "4"
      },
      {
        "type": "tt/slugline",
        "value": "ryssambassadör"
      }
    ],
    "links": [
      {
        "uuid": "956636ed-2687-4bc3-a45a-7e09d98c6eeb",
        "type": "core/section",
        "title": "Inrikes",
        "rel": "section"
      }
    ],
    "language": "sv-se"
  }
}
```
