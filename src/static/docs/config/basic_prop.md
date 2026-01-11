# Configuration - Basic info

To create an application with Aventus, you need to define a file named <mark>aventus.conf.avt</mark>. This file will define
    what Aventus must do with your code. The configuration is a json file with properties that are going to be explained
    below.

|Name|Description|
|---|---|
|module|This is the name of the module you are building. All your code will be inside             the module to avoid global variables.             &nbsp;Must satisfy: <mark>^[a-zA-Z0-9_]+$</mark>         &nbsp;|
|version|This is the version of the module you are building. The first number is the             major version, the second is the minor version and the last is the patch version. By default the value is             1.0.0             &nbsp;Must satisfy: <mark>^[0-9]+\.[0-9]+\.[0-9]+$</mark>         &nbsp;|
|organization|This is the name of organization for the module you are building. This is usefull if you want to publish your package under a specific organization.             &nbsp;Must satisfy: <mark>^[a-zA-Z0-9_@]+$</mark>         &nbsp;|
|description|This is the description of the module you are building. This is usefull if you want to publish your package.|
|documentation|This is the documentation link for the module you are building. This is usefull if you want to publish your package.|
|repository|This is the repository link for the module you are building. This is usefull if you want to publish your package.|
|tags|This is an array of string to tag your project on the store. This is usefull if you want to publish your package.|
|readme|This is the path to the readme. By default, Aventus check Readme in the same folder as the configuration. This is usefull if you want to publish your package.|
|componentPrefix|This is the prefix that are going to be used by all your webcomponents inside the module. For example if my class is named "Test" and my prefix is "av", the final tag will be "av-test". By default, it will use the module name as prefix.             &nbsp;Must satisfy: <mark>^[a-z]{2,}$</mark>         &nbsp;|
|hideWarnings|This is a boolean to hide warnings inside Aventus. This is useful when you are developing an app but your aren't in production. If you set it to false, you need to document all your methods             &nbsp;Must satisfy: <mark>true|false</mark>         &nbsp;|
|avoidParsingInsideTags|This is an array of string that the HTML compiler must avoid parsing. For example on this website, the tag av-code isn't parsed by the compiler to avoid detecting some Aventus features inside the HTML code like @element.             &nbsp;Each string must satisfy: <mark>^[a-z-]+$</mark>         &nbsp;|
|aliases|This is an object of string that allows replacement of code. For example { "@root": "./"} will replace any @root to resolve the root folder|
|build|This is an array of build options. Each build is defined by a list of input and will output a .js file and / or a package.avt file         &nbsp;|
|dependances|This is an array of dependances options.|
|static|This is an array of static options.         &nbsp;|
