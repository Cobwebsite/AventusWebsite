# UI and experience

## Vscode UI

The Aventus extension will edit vscode user interface to add some features.

### The create option

When you right click on the vscode file explorer, you can notice that you have a new option named:  **Aventus :
        Create...** .

![](https://aventusjs.com/img/doc/install/experience/aventus_create.png)

If you click on it, a dropdown appears and you can select what you want to create.

-  **Init**  Create a new project
-  **Component**  Create a webcomponent
-  **Data**  Create a data structure
-  **RAM**  Create a storage
-  **Library**  Create a file to write any code
-  **State**  Create a state or a state manager

### The compilation information

If you have at least one build, on the bottom of the vscode you can see a tick and a time. If you hover this text,
    you will see the last time your build was compiled.

Use the <mark>aventus.ideBuild</mark> workspace setting to choose if builds are compiled by the IDE.
    This does not disable those builds for CLI commands.

![](https://aventusjs.com/img/doc/install/experience/last_compiled.png)

### The live server

If you have at least one build, on the bottom of the vscode you can see a play button. If you click on it, the live
    sever will start and a stop button will replace the play button.

![](https://aventusjs.com/img/doc/install/experience/start_server.png)

You can customize the live server inside the vscode
    settings under  **Aventus &gt; Liveserver** .

### Database and migration tools

Files ending with <mark>.db.avt</mark> open in the Aventus database diagram editor. The editor keeps the
    diagram and its text document synchronized.

The command <mark>Aventus : Create migration</mark> compares database schemas and generates a migration.
    Database access uses the <mark>AventusSharp.DatabaseQuery</mark> .NET tool, which the extension can install
    when needed.

![](https://aventusjs.com/img/doc/install/experience/db.png)

### C# and PHP exports

The VS Code extension recognizes <mark>aventus.sharp.avt</mark> and
    &nbsp;<mark>aventus.php.avt</mark>. Use <mark>Aventus : Export sharp</mark> or
    &nbsp;<mark>Aventus : Export Php</mark> to generate the corresponding TypeScript definitions.

C# export requires .NET and the global <mark>AventusSharp.Converter</mark> tool. The extension can install
    it on first use; <mark>Aventus : Update sharp tools</mark> updates installed C# converter and database
    query tools. PHP export requires PHP, Composer and the Aventus PHP transpiler.

In <mark>aventus.sharp.avt</mark>, HTTP router and WebSocket export use the compiled assembly by default
    (<mark>useCompiledDll</mark>). The application must call <mark>app.UseAventusExport()</mark>
    so its endpoints can be inspected without starting normally. HTTP generation can also enable
    &nbsp;<mark>cacheByDefault</mark>, <mark>clearCacheFct</mark> and <mark>addFormData</mark>.
