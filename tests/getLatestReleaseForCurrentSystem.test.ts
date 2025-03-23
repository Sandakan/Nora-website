import { describe, test, assert } from 'vitest';

import {
	fetchLatestRelease,
	selectAssetForCurrentSystem,
	getAssetMetadata,
	groupAssetMetadata,
	findBestAssetMatch,
} from '../src/utils/getLatestReleaseForCurrentSystem.ts';
import UAParser from 'ua-parser-js';
import { ArchTypes, AssetMetadata, OsTypes } from '../src/@types/app';
import { Asset } from '../src/@types/github_latest_release_api';

describe('getLatestReleaseForCurrentSystem', () => {
	test('fetchLatestRelease', async () => {
		const parser = new UAParser();
		const currentOs = parser.getOS().name;
		const currentArch = parser.getCPU().architecture;

		const release = await fetchLatestRelease();

		console.log(currentArch, currentOs);

		if (release && currentOs && currentArch) {
			const asset = selectAssetForCurrentSystem(release, currentOs, currentArch);
			console.log(JSON.stringify(asset));
		}

		assert.exists(release);
	});

	test('getAssetMetadata', () => {
		const asset: Asset = {
			url: 'https://api.github.com/repos/Sandakan/Nora/releases/assets/237974181',
			id: 237974181,
			node_id: 'RA_kwDOG-3nAc4OLzKl',
			name: 'Nora.v3.1.0-stable-linux-amd64.deb',
			label: '',
			uploader: {
				login: 'github-actions[bot]',
				id: 41898282,
				node_id: 'MDM6Qm90NDE4OTgyODI=',
				avatar_url: 'https://avatars.githubusercontent.com/in/15368?v=4',
				gravatar_id: '',
				url: 'https://api.github.com/users/github-actions%5Bbot%5D',
				html_url: 'https://github.com/apps/github-actions',
				followers_url: 'https://api.github.com/users/github-actions%5Bbot%5D/followers',
				following_url: 'https://api.github.com/users/github-actions%5Bbot%5D/following{/other_user}',
				gists_url: 'https://api.github.com/users/github-actions%5Bbot%5D/gists{/gist_id}',
				starred_url: 'https://api.github.com/users/github-actions%5Bbot%5D/starred{/owner}{/repo}',
				subscriptions_url: 'https://api.github.com/users/github-actions%5Bbot%5D/subscriptions',
				organizations_url: 'https://api.github.com/users/github-actions%5Bbot%5D/orgs',
				repos_url: 'https://api.github.com/users/github-actions%5Bbot%5D/repos',
				events_url: 'https://api.github.com/users/github-actions%5Bbot%5D/events{/privacy}',
				received_events_url: 'https://api.github.com/users/github-actions%5Bbot%5D/received_events',
				type: 'Bot',
				site_admin: false,
			},
			content_type: 'application/octet-stream',
			state: 'uploaded',
			size: 108368388,
			download_count: 7,
			created_at: new Date('2025-03-16T17:30:40Z'),
			updated_at: new Date('2025-03-16T17:30:43Z'),
			browser_download_url:
				'https://github.com/Sandakan/Nora/releases/download/v3.1.0-stable.pre-release.4/Nora.v3.1.0-stable-linux-amd64.deb',
		};

		const metadata = getAssetMetadata(asset);

		assert.deepEqual(metadata, {
			os: 'linux',
			arch: 'amd64',
			version: '3.1.0',
			release: 'stable',
			ext: 'deb',
			download_url:
				'https://github.com/Sandakan/Nora/releases/download/v3.1.0-stable.pre-release.4/Nora.v3.1.0-stable-linux-amd64.deb',
			download_count: 7,
		});
	});

	test('groupAssetMetadata', () => {
		const assetMetadata: AssetMetadata[] = [
			{
				os: 'linux',
				arch: 'x64',
				version: '3.1.0',
				release: 'stable',
				ext: 'zip',
				download_url: '',
				download_count: 0,
			},
			{
				os: 'linux',
				arch: 'arm64',
				version: '3.1.0',
				release: 'stable',
				ext: 'zip',
				download_url: '',
				download_count: 0,
			},
			{
				os: 'win',
				arch: 'x64',
				version: '3.1.0',
				release: 'stable',
				ext: 'exe',
				download_url: '',
				download_count: 0,
			},
		];

		const grouped = groupAssetMetadata(assetMetadata);

		assert.deepEqual(grouped, {
			linux: {
				x64: [
					{
						os: 'linux',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'zip',
						download_url: '',
						download_count: 0,
					},
				],
				arm64: [
					{
						os: 'linux',
						arch: 'arm64',
						version: '3.1.0',
						release: 'stable',
						ext: 'zip',
						download_url: '',
						download_count: 0,
					},
				],
			},
			win: {
				x64: [
					{
						os: 'win',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'exe',
						download_url: '',
						download_count: 0,
					},
				],
			},
		});
	});

	test('findBestAssetMatch', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			linux: {
				x64: [
					{
						os: 'linux',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'zip',
						download_url: '',
						download_count: 0,
					},
				],
				arm64: [
					{
						os: 'linux',
						arch: 'arm64',
						version: '3.1.0',
						release: 'stable',
						ext: 'zip',
						download_url: '',
						download_count: 0,
					},
				],
			},
			win: {
				x64: [
					{
						os: 'win',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'exe',
						download_url: '',
						download_count: 0,
					},
				],
			},
		};

		const match = findBestAssetMatch('linux', 'x64', groups);

		assert.deepEqual(match, [
			{
				os: 'linux',
				arch: 'x64',
				version: '3.1.0',
				release: 'stable',
				ext: 'zip',
				download_url: '',
				download_count: 0,
			},
		]);
	});

	test('selectAssetForCurrentSystem - Windows x64', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			win: {
				x64: [
					{
						os: 'win',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'exe',
						download_url: 'https://example.com/windows-x64.exe',
						download_count: 10,
					},
				],
			},
		};

		const match = findBestAssetMatch('win', 'x64', groups);

		assert.deepEqual(match, [
			{
				os: 'win',
				arch: 'x64',
				version: '3.1.0',
				release: 'stable',
				ext: 'exe',
				download_url: 'https://example.com/windows-x64.exe',
				download_count: 10,
			},
		]);
	});

	test('selectAssetForCurrentSystem - Linux arm64', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			linux: {
				arm64: [
					{
						os: 'linux',
						arch: 'arm64',
						version: '3.1.0',
						release: 'stable',
						ext: 'tar.gz',
						download_url: 'https://example.com/linux-arm64.tar.gz',
						download_count: 5,
					},
				],
			},
		};

		const match = findBestAssetMatch('linux', 'arm64', groups);

		assert.deepEqual(match, [
			{
				os: 'linux',
				arch: 'arm64',
				version: '3.1.0',
				release: 'stable',
				ext: 'tar.gz',
				download_url: 'https://example.com/linux-arm64.tar.gz',
				download_count: 5,
			},
		]);
	});

	test('selectAssetForCurrentSystem - macOS x64', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			mac: {
				x64: [
					{
						os: 'mac',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'dmg',
						download_url: 'https://example.com/macos-x64.dmg',
						download_count: 15,
					},
				],
			},
		};

		const match = findBestAssetMatch('mac', 'x64', groups);

		assert.deepEqual(match, [
			{
				os: 'mac',
				arch: 'x64',
				version: '3.1.0',
				release: 'stable',
				ext: 'dmg',
				download_url: 'https://example.com/macos-x64.dmg',
				download_count: 15,
			},
		]);
	});

	test('selectAssetForCurrentSystem - macOS arm64', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			mac: {
				arm64: [
					{
						os: 'mac',
						arch: 'arm64',
						version: '3.1.0',
						release: 'stable',
						ext: 'dmg',
						download_url: 'https://example.com/macos-arm64.dmg',
						download_count: 8,
					},
				],
			},
		};

		const match = findBestAssetMatch('mac', 'arm64', groups);

		assert.deepEqual(match, [
			{
				os: 'mac',
				arch: 'arm64',
				version: '3.1.0',
				release: 'stable',
				ext: 'dmg',
				download_url: 'https://example.com/macos-arm64.dmg',
				download_count: 8,
			},
		]);
	});

	test('findBestAssetMatch - unsupported OS (android)', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			linux: {
				x64: [
					{
						os: 'linux',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'zip',
						download_url: '',
						download_count: 0,
					},
				],
			},
		};

		const match = findBestAssetMatch('android', 'x64', groups);

		assert.isUndefined(match);
	});

	test('findBestAssetMatch - unsupported architecture (ios arm64)', () => {
		const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {
			mac: {
				x64: [
					{
						os: 'mac',
						arch: 'x64',
						version: '3.1.0',
						release: 'stable',
						ext: 'dmg',
						download_url: '',
						download_count: 0,
					},
				],
			},
		};

		const match = findBestAssetMatch('ios', 'arm64', groups);

		assert.isUndefined(match);
	});
});
