# Examples

Get the latest version of a document:

```json
{
    "uuid": "8af500a8-6f16-416a-9a6a-1665a5d0fcf7"
}
```

Get a specific version of a document:

```json
{
    "uuid": "8af500a8-6f16-416a-9a6a-1665a5d0fcf7",
    "version": 12
}
```

Get the document version referenced by the last status update, in this case we would get the last document version marked as "usable":

```json
{
    "uuid": "8af500a8-6f16-416a-9a6a-1665a5d0fcf7",
    "status": "usable"
}
```
