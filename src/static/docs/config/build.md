# Configuration - Build

Inside a module, you can split you code into differents submodules. Inside Aventus, this submodule is called a
    &nbsp;<mark>Build</mark>. The build job is to transform some Aventus input files into a JavaScript file (for an
    app) and/or a
    Aventus Package File (for a lib).


|Name|Description|
|---|---|
|module|This will override the module value of the basic config.         &nbsp;|
|name|             &nbsp;This is the name for the build. If the build is exported as a library, the                 library name                 will be <mark>$module</mark>@<mark>$name</mark>         &nbsp;|
|description|This will override the description value of the basic config.|
|tags|This will override the tags value of the basic config.|
|documentation|This will override the documentation value of the basic config.|
|repository|This will override the repository value of the basic config.|
|organization|This will override the organization value of the basic config.|
|readme|This will override the readme value of the basic config.|
|version|This will override the version value of the basic config.         &nbsp;|
|disabled|This is a boolean to define if the build is active or not.             &nbsp;Must satisfy: <mark>true|false</mark>         &nbsp;|
|hideWarnings|This will override the hideWarnings value of the basic config.         &nbsp;|
|componentPrefix|This will override the componentPrefix value of the basic config.         &nbsp;|
|src|This is an array of string to define which folders Aventus will watch. For             example, if you set "./src/*", all files inside the folder "src" will be watched.         &nbsp;|
|compile|This is an array to define how to compile your build.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;input|This is string or an array to define the entries points of your program. If not             set, all the files matching the build.src will be compiled. Otherwise, only the needed file by your entries             points will be compiled         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;output|This is string to define where the compiled JavaScript file must be written.             &nbsp;Must satisfy: ^\S+\.js         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;outputNpm|This is a string or an array to define where to export your project to npm             project. It can also be a object to customize settings.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;path|This is a string or an array to define where to export your project to npm             project         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;packageJson|This is a boolean to define if you need a package.json when you are exporting         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;npmName|This is a string to define the name inside the package.json when you are             exporting         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;manifest|This is a boolean to define if you need to generate manifest for your             components. This will help developers to use your components inside the IDE.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;live|This is a boolean to define if the npm content must be recompiled on change.             Default is false         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;package|This is string to define where the .package.avt file must be written.             &nbsp;Must satisfy: ^\S+\.package\.avt         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;compressed|This is boolean to define if the final build must be compressed.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;i18n|This is string to define where to export i18n files. You can also define an             array of object to have more options         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output|This is string to define where to export i18n files.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mount|This is string to define the http path to mount your i18n files.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mode|             &nbsp;This is string to define how aventus must compile your i18n.             &nbsp;                 &nbsp;singleFile: export all translations inside a single file                 &nbsp;oneToOne: export translation inside the same file name as input                 &nbsp;groupComponent: group components transaltions inside a single file                 &nbsp;basedOnAttribute: WIP                 &nbsp;include: WIP             &nbsp;         &nbsp;|
|stories|This is an object to configure how to export storybook for your package.         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;output|This is a string to define where to export storybook         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;workspace|This is a string to define where to add the .storybook folder         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;live|             &nbsp;This is a boolean to define if the story content must be recompiled on change or only with the                 command             &nbsp;<mark>Aventus : Build storybook</mark>         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;prefix|This is a string to prefix all your stories to group stories         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;format|             &nbsp;This is a string to define how Aventus must deal with elements to export to storybook.             &nbsp;                 &nbsp;all: export all elements                 &nbsp;public: only public elements will be exported                 &nbsp;protected: only public + protected elements will be exported                 &nbsp;manual: only elements with tag Storybook will be exported             &nbsp;         &nbsp;|
|&nbsp;&nbsp;&nbsp;&nbsp;srcBaseUrl|             &nbsp;This is a string to define a base url to link file to your repo.         &nbsp;|
|outsideModule|             &nbsp;This is an array of string to define which folders Aventus will watch. The                 watched file will be compiled outside of the module. For example, if you define a class "Test" inside a                 module "HelloWorld", you can reach the class by typing <mark>window.Test</mark> instead of                 &nbsp;<mark>window.HelloWorld.Test</mark>             &nbsp;         &nbsp;|
|namespaceStrategy|             &nbsp;This is a string to define how Aventus must deal with namespace.             &nbsp;                 &nbsp;manual: the developer will write the namespace by himself                 &nbsp;followFolders: the namespace will be set based on the current folder and the namespaceRoot property                 &nbsp;                 &nbsp;followFoldersCamelCase: same as followFolders but formatted in camel case                 &nbsp;                 &nbsp;rules: the namespace will be set based on the namespaceRules property             &nbsp;         &nbsp;|
|namespaceRoot|             &nbsp;This is a string to define what is the namespace root folder (only for followFolders strategy)         &nbsp;|
|namespaceRules|             &nbsp;This is an object to define the namespace based on the uri where the key is the namespace and the                 value is an array of string to match uri             &nbsp;         &nbsp;|
|dependances|             &nbsp;This is an object of dependance options to                 use code and/or autocompletion inside your code.         &nbsp;|
|nodeModulesDir|The path where the node_modules are installed. By default the value is             ./node_modules         &nbsp;|
|avoidParsingInsideTags|This will override the avoidParsingInsideTags value of the basic config.         &nbsp;|
|i18n|Configuration for i18n|
|&nbsp;&nbsp;&nbsp;&nbsp;locales|This is an array of string to define locales that is required inside your             project|
|&nbsp;&nbsp;&nbsp;&nbsp;fallback|Define the fallback locale|
|&nbsp;&nbsp;&nbsp;&nbsp;autoRegister|Define if aventus must autoRegister your i18n files. Default is             true|
