# I18n - Usage

Once you have completed all the configuration steps, you can start using I18n in your application. Since Aventus automatically adds <mark>Aventus@Main</mark>, a global function <mark>t()</mark> is available throughout your code.

```ts filename=Demo.lib.avt
export class Demo {
    public static test() {
        // The function t() is available
        // Note: "test" will be underlined because no translation has been provided yet
        t("test")
    }
}
```

In the code above, the string <mark>"test"</mark> will be flagged as an error because no translation exists yet.

If there is an error, autocompletion is available. Once everything is set up, you can easily find translation keys using autocompletion.

## Global file

To register global translations, create a file anywhere Aventus is watching. The file name must start with <mark>@</mark> and end with <mark>.i18n.avt</mark>.

When you open the file, Aventus will display a custom I18n editor. This editor allows you to:

- Quickly see missing translations
- Automatically translate your file using Deepl API (need a Deepl API key configured in settings)
- And more

In the top-right corner, there is a button labeled <mark>Aventus: Open i18n file</mark>. Clicking it switches from the custom editor to the standard text editor. These <mark>*.i18n.avt</mark> files are actually JSON files that can be edited directly. Pressing the button again will switch back to the custom editor.

Translations consist of a key and a list of locale/value pairs for that key. You can also use variables in your text by adding <mark>{variable}</mark> inside the string.

```json filename=@Default.18n.avt
{
    "{qty} liters": {
        "en-gb": "{qty} liters",
        "fr-fr": "{qty} litres"
    }
}
```

```ts filename=Demo.lib.avt
export class Demo {
    public static test() {
        t("{qty} liters", { qty: "5" });
    }
}
```

## WebComponent File

To add translations for a specific component, create a file with the same name as the component, ending with <mark>.i18n.avt</mark>. For example, for the component <mark>Test.wcl.avt</mark>, create a file named <mark>Test.i18n.avt</mark>.

Translations from this file can be accessed inside the component using the function <mark>this.t()</mark>. Do not use <mark>t()</mark> here, as it will refer to the global translations.

## Change locale

To change the locale during runtime, call the following function:

```typescript
Aventus.I18n.setLocale(locale: string)
```

This will load the necessary translation files and update the translations accordingly.
