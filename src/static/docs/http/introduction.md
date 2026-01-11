# Aventus HTTP Layer

The Aventus HTTP layer provides a high-level, type-safe abstraction on top of the native fetch API.
    It simplifies common networking patterns such as:

- Sending and handling HTTP requests
- Managing JSON, text, and binary (blob) responses
- Intercepting and transforming requests and responses
- Managing errors in a consistent way
- Automatically handling form data and method spoofing (PUT/DELETE)
- Integrating with HttpRouter for clean endpoint definitions

At its core, the system revolves around the HttpRequest class, a powerful yet flexible utility
that makes HTTP communication declarative, predictable, and framework-agnostic.
