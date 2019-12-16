// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode')

const createImportString = (optionsArr) => {
	return optionsArr.reduce((acc, options) => {
		const filePath = options.path
		const extensionSplit = filePath.split('.')
		const extension = extensionSplit[extensionSplit.length - 1]
		const config = vscode.workspace.getConfiguration('copyImport')
		const template = config.fileExtensionImportTemplateMap[extension]
		if (template) {
			const splitPath = filePath.split('/')
			const baseName = splitPath[splitPath.length - 1].split('.')[0]
			const rootPath = vscode.workspace.workspaceFolders[0].uri.path
			const importPath = filePath.replace(
				`${rootPath}/`, ''
			).split('.')[0]
			var replacements = {
				"{{EXT}}": extension,
				"{{BASENAME}}": baseName,
				"{{PROJECT_ROOT}}": rootPath,
				"{{FILE_PATH}}": importPath,
				"{{DOT_PATH}}": importPath.replace(/\//g, '.'),
				"{{ROOT_ALIAS}}": config.rootAlias
			}
			const importString = template.replace(/\{\{\w+\}\}/g, function(all) {
				return replacements[all] || all
			})
			return `${acc}${acc ? '\n' : ''}${importString}`
		} else {
			vscode.window.showInformationMessage(
				'Import copied to clipboard'
			)
			return acc
		}
	}, '')
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "copy-import" is now active!')

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	// *** Can't figure out how to get a fuzzy finder ***
	// const copyImportFromSearch = vscode.commands.registerCommand(
	// 	'extension.copyImportSearch',
	// 	function(options) {
	// 		vscode.workspace.findFiles('*').then(console.log)
	// 	}
	// )

	let disposable = vscode.commands.registerCommand(
		'extension.copyImport',
		function (options, allOptions) {
		let allFiles = allOptions
		if (!Array.isArray(allOptions)) {
			allFiles = [options]
		}
		// The code you place here will be executed every time your command is executed
		// const root = vscode.workspace.workspaceFolders.uri.path
		const importString = createImportString(allFiles)
		vscode.env.clipboard.writeText(importString)
		vscode.window.showInformationMessage(
			'Import copied to clipboard'
		)
	})

	context.subscriptions.push(disposable)
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
