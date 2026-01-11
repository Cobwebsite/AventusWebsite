# Advanced - Store

The AventusJS Store gives you a central place to save your own creations and share them with others. You can also
    explore and download templates or packages from the community to speed up your development and boost productivity.


## Using the Store - Package

The AventusJS Store is available at [<mark>store.aventusjs.com</mark>](https://store.aventusjs.com/). From there, you can browse and search for available packages
    created by the community.

### Searching for Packages

You can use the search feature on the store website to quickly find the package you need. Each package has a name and
    version that you will use in your project configuration.

### Installing a Package

To install a package, you need to declare it inside your project configuration file <mark>aventus.conf.avt</mark>.

For example, if you want to use the <mark>MaterialIcon</mark> package in version <mark>1.0.0</mark>, your configuration file should include the following:

```json
{
    dependencies: {
        "MaterialIcon": "1.0.0"
    }
}
```

Once declared, Aventus will automatically download and link the package so you can use it directly in your project.
    This makes it quick and easy to integrate community-driven code and assets into your own work.

### Updating a Package

Packages are not updated automatically.

If a new version is available on the store, you can update your project simply by changing the version number in your
    &nbsp;<mark>aventus.conf.avt</mark> file.


For example, to update the MaterialIcon package from version <mark>1.0.0</mark> to <mark>1.1.0</mark>, your configuration should look like this:

```json
{
    dependencies: {
        "MaterialIcon": "1.1.0"
    }
}
```

After saving the configuration, Aventus will fetch the new version and replace the old one in your project.

## Using the Store - Template

Templates in AventusJS allow you to quickly generate files and boilerplate code for your projects. They are
    especially useful when you want to maintain consistency across components or projects. Full documentation for
    templates can be found in the template section.

### Finding and Downloading Templates

You can search for templates directly on the AventusJS Store website.

If you want to download a template, click the Download button. This will open a link directly in VSCode, which will
    automatically download the template into your workspace.

### Removing Templates

If you need to remove a downloaded template, you can use the following Aventus commands:

- <mark>Aventus : Uninstall Templates</mark> : use this if the template is a template that require an
        Aventus project.
- <mark>Aventus : Uninstall Projects</mark> : use this if the template is a template that doesn't
        require an Aventus project.

These commands ensure that your workspace stays clean and that old templates do not interfere with new ones.

## Publishing to the Store - Package

Publishing a package to the AventusJS Store allows you to share reusable pieces of code with the community while
    keeping your code modular and easy to integrate.

### Prerequisites

To publish a package, you need:

- A registered account on [store.aventusjs.com](https://store.aventusjs.com/).

### Connecting to the Store

- Run the command <mark>Aventus : Connect to the store</mark> in VSCode.
- Enter your credentials to log in.

Once connected, you can publish packages directly from your workspace.

### Publishing a Package

- Run the command <mark>Aventus : Publish package to the store</mark>
- If there is only one package in your workspace, it will be published automatically.
- If multiple packages are available, you will be asked to select the package you want to publish.
- 
        &nbsp;You can also publish under an organization if:
        &nbsp;
            &nbsp;The organization exists on the store.
            &nbsp;Your user account is linked to that organization.
        &nbsp;
    &nbsp;

### Configuration Fields

During publication, Aventus will use metadata defined in your <mark>aventus.conf.avt</mark> file. The
    following fields are recommended:

- <mark>version</mark>: The package version on the store. Each version can only be published once.
        Default is <mark>1.0.0</mark>
- <mark>description</mark>: A short description displayed under the package (max 255 characters).
- <mark>organization</mark>: If defined, the package will be published under this organization;
        otherwise, it will be published under your account.
- <mark>documentation</mark>: HTTP link to the package documentation.
- <mark>repository</mark>: Link to the repository.
- <mark>readme</mark>: Local link to the README file. If not defined, Aventus will attempt to find a
        README in the current folder.
- <mark>tags</mark>: Labels to help identify the package (maximum 5).

None of these fields are mandatory, but providing them makes your package more attractive and discoverable.

### Managing Package

You can edit the README content directly from the store website.

If needed, you can delete a package from the store if you are the owner.

## Publishing to the Store - Template

Publishing a template to the AventusJS Store allows you to share reusable project or component templates with the
    community, making it easier for others to create consistent and modular code.

### Publishing a Template

- Open the <mark>template.avt.ts</mark> file of your template in VSCode.
- Right-click anywhere in the file and select <mark>Aventus: Publish Template to the store</mark>.

### Template Metadata

Templates can include the same metadata as packages, defined in the <mark>meta()</mark> function.
    Recommended fields include:

- <mark>version</mark>: The template version on the store. Each version can only be published once.
        Default is <mark>1.0.0</mark>
- <mark>description</mark>: A short description displayed under the template (max 255 characters).
- <mark>organization</mark>: If defined, the template will be published under this organization;
        otherwise, it will be published under your account.
- <mark>documentation</mark>: HTTP link to the template documentation.
- <mark>repository</mark>: Link to the repository.
- <mark>readme</mark>: Local link to the README file. If not defined, Aventus will attempt to find a
        README in the current folder.
- <mark>tags</mark>: Labels to help identify the template (maximum 5).

Additionally, templates have unique fields:

- 
        &nbsp;<mark>installationFolder</mark>: Defines the folder where the template will be installed.
        &nbsp;Example: if the template is a project and <mark>installationFolder</mark> is set to <mark>Cobwebsite/Test</mark>, the template will be installed in <mark>$storage/projects/Cobwebsite/Test</mark>.
        &nbsp;If there are conflicts with existing folders, the new installation will overwrite the old one.
    &nbsp;
- <mark>isProject</mark>: Defines if the template need a <mark>aventus.conf.avt</mark>

### Managing Template

You can edit the README content directly from the store website.

Templates can also be deleted from the store if you are the owner.
