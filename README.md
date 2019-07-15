# Copy Import

Adds a "Copy Import" action to the file tree context menu. Users can set template strings for different file extensions. Once selected the import string will copied to the clipboard.

![Extension preview](https://i.imgur.com/ANPvbS4.gif)

#
| Template string  | Values given the example file path `/home/user/dev/projectName/src/some/path/example.js` |
|------------------|------------------------------------------------------------------------------------------|
| {{EXT}}          | js                                                                                       |
| {{BASENAME}}     | example                                                                                  |
| {{PROJECT_ROOT}} | /home/user/dev/projectName                                                               |
| {{FILE_PATH}}    | src/some/path/                                                                           |
| {{DOT_PATH}}     | src.some.path.                                                                           |
| {{ROOT_ALIAS}}   | Configurable in extension settings                                                       |
#

Configuration example:
```
"copyImport.rootAlias": "@",
"copyImport.fileExtensionImportTemplateMap": {
        "js": "import {{BASENAME}} from '{{ROOT_ALIAS}}/{{FILE_PATH}}'",
        "py": "from {{DOT_PATH}} import {{BASENAME}}"
    }
```