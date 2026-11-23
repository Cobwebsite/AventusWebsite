# VS Code settings

Customize the Aventus extension in VS Code Settings or in your workspace's <mark>.vscode/settings.json</mark>. These settings control the editor, templates, file access and live server.

```json filename=.vscode/settings.json
{

	"aventus.ideBuild": true,
	"aventus.readDirs": ["./shared"],
	"aventus.liveserver": { "port": 8080, "rootFolder": "./dist" }

}
```

## Editor and build

|Setting|Purpose and default|
|---|---|
|aventus.updateImportOnRename|Update import paths when a file is renamed. Default: <mark>true</mark>.|
|aventus.ideBuild|Build code in the IDE. Default: <mark>true</mark>.|
|aventus.defaultHideWarnings|Default value for hiding warnings. Default: <mark>false</mark>.|
|aventus.defaultForceDocumentation|Default value for requiring documentation. Default: <mark>false</mark>.|
|aventus.logLevel|Log level: <mark>0</mark> Debug, <mark>1</mark> Information, <mark>2</mark> Warning, <mark>3</mark> Error, <mark>4</mark> None. Default: <mark>3</mark>.|

## Templates and files

|Setting|Purpose and default|
|---|---|
|aventus.projectPath|Paths containing project templates. Default: empty array.|
|aventus.templatePath|Paths containing element templates. Default: empty array.|
|aventus.globalPath|Paths containing global templates. Default: empty array.|
|aventus.useDefaultTemplate|Use the default Aventus templates. Default: <mark>true</mark>.|
|aventus.quickCreations|List of elements available for quick creation. Default: empty array.|
|aventus.readNodeModules|Read <mark>node_modules</mark> for import suggestions; this can slow the extension. Default: <mark>false</mark>.|
|aventus.readDirs|Extra readable directories. Relative paths start at the workspace root, not the <mark>.vscode</mark> directory. Default: empty array.|
|aventus.preventCustomData|URIs to exclude from custom data. Default: empty array.|

## Services

|Setting|Purpose and default|
|---|---|
|aventus.deeplApiKey|DeepL API key used for translation. Default: empty string.|
|aventus.liveserver|Live server options, described below.|

## Live server options

Configure the live server with the following fields in <mark>aventus.liveserver</mark>:

- <mark>host</mark> — Address the server listens on. Default: <mark>0.0.0.0</mark>.
- <mark>port</mark> — Port used by the server. Default: <mark>8080</mark>.
- <mark>autoIncrementPort</mark> — Try the next port if the chosen one is in use. Default: <mark>true</mark>.
- <mark>rootFolder</mark> — Folder served by the server. Default: <mark>./dist</mark>.
- <mark>indexFile</mark> — Page opened at the root URL. Default: <mark>index.html</mark>.
- <mark>delay</mark> — Wait before triggering a live reload. Default: <mark>200</mark> ms.
- <mark>launch_browser</mark> — Open a browser when the server starts. Default: <mark>true</mark>.
- <mark>browser</mark> — Browser to open; leave empty to use your default browser. Default: <mark>chrome</mark>.
- <mark>auto_close</mark> — Close the browser tab when the server stops. Default: <mark>true</mark>.
