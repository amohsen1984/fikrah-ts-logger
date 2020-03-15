Fikrah TypeScript Logger
=====================

A TypeScript logger package

## Configuration

### Default context

It is possible to provide an optional default context to an instance of `Logger`.

E.g.:

```typescript
const logger = new Logger(console);
logger.setDefaultContext({
    default_var: "This is the default context",
    i_should: "not be overridden",
});

logger.log("notice", "This is a notice log", {
    current_var: "This is the given context",
    i_should: "be overridden",
});
```

...will log:

```
[notice] This is a notice log
{
    default_var: "This is the default context",
    current_var: "This is the given context",
    i_should: "be overridden",
}
```
