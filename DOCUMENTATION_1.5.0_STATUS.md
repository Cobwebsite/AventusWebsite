# Documentation 1.5.0 audit

Source of truth:

- `src/` in Aventus: language server and compiler.
- `client/`: VS Code extension.
- `cli/`: command-line interface.
- `base/` and `base/ui/`: public runtime APIs and UI components.

Only `.avt` documentation sources are edited. Markdown and `dist` files are generated and are not maintained manually.

## Progress

| Area | Status | Findings / action |
|---|---|---|
| Install / CLI | Updated | Separated VS Code commands from CLI commands; documented formatting scope, Emmet output, `av update` and `av dependencies help-llm`. |
| VS Code experience | Updated | Documented `aventus.ideBuild`, database/migration tooling and C#/PHP export commands with their external requirements. |
| Configuration basics | Updated | Matched aliases, alias-aware auto-imports, dependencies and namespace fields with the current schema. |
| Build configuration | Updated | Matched build fields and documented library-specific `compile.output` objects. |
| Web component conditions | Updated | Documented type narrowing for optional values. |
| Web component properties | Updated | Added `time`, Temporal-based Aventus types and `@NoType`; checked attribute and injection typing. |
| HTTP requests | Updated | Documented request caching, reusable `HttpResponse` bodies and corrected `HttpRouter` configuration/constructor usage. |
| Converter / dates | Updated | Added current Temporal-based types and the diagnostic forbidding native JavaScript `Date`. A dedicated API page may be preferable. |
| Data | Updated | Corrected generated static fields and documented typed cloning/schema restoration. |
| Errors | Updated | Documented message normalization, details, code lookup and result composition helpers. |
| RAM | Reviewed | Corrected collection/lookup examples and documented separate request/simple/detail resource types; mixin and listener APIs remain compatible. |
| State | Updated | Verified transition lifecycle and documented activation, guards, slug and after-change helpers. |
| Web components | Reviewed | Updated decorators, Temporal values, narrowing, loops, injection, Watch examples and lifecycle callbacks. Style, inheritance, signal, element, event, binding and component state have no new public API to document. |
| Core libraries | Reviewed | Corrected CompareObject and documented Watcher disposal/untracked reads, ResourceLoader CSP nonces and ResizeObserver callback typing; remaining runtime changes are internal typing fixes. |
| I18n | Reviewed | Configuration, file naming, registration, component/global lookup and locale switching match current behavior. |
| UI | Reviewed | Documented navigation, forms, modal/toast, Collapse horizontal mode, dynamic Tabs, Process returns and independent grid gaps; unchanged components compared. |
| Advanced | Reviewed | Updated global template locations, `isGlobal` and `aventus.globalPath`; Store, npm export and Storybook command flows reviewed. |
| Tutorials | Reviewed | Migrated examples from `dependances` to `dependencies`; tutorial sources pass the project check. |
| Release notes | Updated | Changelog reviewed from `65de3ee126e2a7b7d51d4bf4c0832ad61920012f` and kept concise. |

## Known missing 1.5.0 coverage

- No known missing public 1.5.0 feature after the current source comparison.

## Validation

- [x] Complete the page-by-page API comparison.
- [x] Run `av check` after each documentation batch.
- [ ] Review generated output without editing it manually.
- [x] Perform a final terminology pass (`dependencies`, VS Code, CLI, LSP).
