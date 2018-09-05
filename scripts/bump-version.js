#!/usr/bin/env node
const yargs = require('yargs');
const fs = require('fs');
const path = require('path');
const semver = require('semver');
const pkg = require('../package.json');
const appPkg = require('../src/app/package.json');
const manifest = require('../src/ext/manifest.json');

const PRE_COMMANDS = ['preminor', 'premajor', 'prepatch', 'prerelease'];

function writeJson(fileName, data) {
	let json = JSON.stringify(data, null, 4);
	fs.writeFileSync(fileName, json);
}

function updateAppPackage(ver) {
	let fileName = path.resolve(__dirname, '../src/app/package.json');
	let data = Object.assign({}, appPkg, { version: ver });
	writeJson(fileName, data);
}

function updateManifest(verName, ver) {
	let fileName = path.resolve(__dirname, '../src/ext/manifest.json');
	let data = Object.assign({}, manifest, { version: ver, version_name: verName });
	writeJson(fileName, data);
}

function updatePackage(ver) {
	let fileName = path.resolve(__dirname, '../package.json');
	let data = Object.assign({}, pkg, { version: ver });
	writeJson(fileName, data);
}

function incPkgVersion(ver, command, preid) {
	return semver.inc(ver, command, preid);
}

function incManifestVersion(ver, command) {
	let parts = ver.split('.').map(p => +p);
	if (parts.length < 3) {
		while (parts.length < 3) parts.push(0);
	}
	let sv = parts.slice(0, 3).join('.');
	if (parts.length === 4) {
		sv += '-' + parts[3];
	}
	sv = semver.inc(sv, command);
	return sv.replace('-', '.');
}

function main() {
	const argv = yargs
		.usage('Usage: $0 <command> [options]')
		.command('major', 'bump major version')
		.command('minor', 'bump minor version')
		.command('patch', 'bump patch version')
		.command('premajor', 'bump premajor version')
		.command('preminor', 'bump preminor version')
		.command('prepatch', 'bump prepatch version')
		.command('prerelease', 'bump prerelease version')
		.demandCommand(1, 'You need at least one command before moving on')
		.option('preid', {
			global: true,
			description:
				'Identifier to be used to prefix premajor, preminor, prepatch or prerelease version increments'
		})
		.option('soft', {
			global: true,
			default: false,
			description: "print new versions but don't update anything"
		})
		.boolean('soft')
		.help()
		.strict().argv;

	const command = argv._[0];
	let preid = null;
	if (PRE_COMMANDS.includes(command)) {
		preid = argv.preid;
	}
	let newPkgVersion = incPkgVersion(pkg.version, command, preid);
	let newManifestVersion = incManifestVersion(manifest.version, command);
	if (!argv.soft) {
		updateManifest(newPkgVersion, newManifestVersion);
		updatePackage(newPkgVersion);
		updateAppPackage(newPkgVersion);
	}
	console.log('updated package version', pkg.version, '->', newPkgVersion);
	console.log('updated manifest version', manifest.version, '->', newManifestVersion);
}

if (!module.parent) {
	main();
}
