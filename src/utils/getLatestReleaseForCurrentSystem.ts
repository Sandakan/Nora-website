import { ArchTypes, AssetMetadata, OsTypes } from '../@types/app';
import type { Asset, GithubLatestReleaseAPI } from '../@types/github_latest_release_api';

const GITHUB_RELEASE_URL = 'https://api.github.com/repos/Sandakan/Nora/releases/tags/v3.1.0-stable.pre-release.4';
// const GITHUB_RELEASE_URL = 'https://api.github.com/repos/Sandakan/Nora/releases/latest';
const ASSET_METADATA_REGEX = /v?(?<version>\d[\w.]+)-(?<release>\w+)-(?<os>\w+)-(?<arch>\w+)\.(?<ext>\w+)$/gm;

const INTERCHANGABLE_ARCHS = [
	['x64', 'amd64', 'x86_64'],
	['arm64', 'aarch64'],
];

export const OS_NAMES: Record<OsTypes, string> = {
	mac: 'Mac OS',
	win: 'Windows',
	linux: 'Linux',
};

export const getAssetMetadata = (asset: Asset): AssetMetadata | null => {
	const match = ASSET_METADATA_REGEX.exec(asset.name);
	ASSET_METADATA_REGEX.lastIndex = 0;

	if (!match?.groups) return null;

	const { os, arch, version, release, ext } = match.groups;

	return {
		os,
		arch,
		version,
		release,
		ext,
		download_url: asset.browser_download_url,
		download_count: asset.download_count,
	} as AssetMetadata;
};

export const groupAssetMetadata = (assetMetadata: AssetMetadata[]) => {
	const groupByOs = Object.groupBy(assetMetadata, (metadata) => metadata.os);

	const groups: Partial<Record<OsTypes, Partial<Record<ArchTypes, AssetMetadata[]>>>> = {};

	for (const [os, group] of Object.entries(groupByOs)) {
		if (!group) continue;

		groups[os as OsTypes] = Object.groupBy(group, (metadata) => metadata.arch);
	}

	return groups;
};

const isArchInterchangeable = (archA: ArchTypes, archB: ArchTypes) => {
	for (const interchangeableArchs of INTERCHANGABLE_ARCHS) {
		if (interchangeableArchs.includes(archA) && interchangeableArchs.includes(archB)) return true;
	}

	return false;
};

export const findBestAssetMatch = (os: string, arch: string, groups: ReturnType<typeof groupAssetMetadata>) => {
	const userOs = os.toLowerCase();
	const userArch = arch.toLowerCase();

	for (const [assetOs, asset] of Object.entries(groups)) {
		const isAssetOsAMatch =
			assetOs.toLocaleLowerCase().includes(userOs) || userOs.includes(assetOs.toLocaleLowerCase());

		if (isAssetOsAMatch) {
			for (const [assetArch, metadata] of Object.entries(asset)) {
				const isAssetArchAMatch =
					assetArch.toLocaleLowerCase().includes(userArch) ||
					userArch.includes(assetArch.toLocaleLowerCase()) ||
					isArchInterchangeable(assetArch as ArchTypes, userArch as ArchTypes);

				if (isAssetArchAMatch) return metadata;
			}

			// return asset;
		}
	}
};

export const selectAssetForCurrentSystem = (data: GithubLatestReleaseAPI, os: string, arch: string) => {
	const { assets } = data;

	const assetMetadata = assets.map((asset) => getAssetMetadata(asset)).filter((metadata) => metadata !== null);
	const groups = groupAssetMetadata(assetMetadata);
	const match = findBestAssetMatch(os, arch, groups);

	console.log({ os, arch, metadata: assetMetadata, groups, match });

	return match;
};

export const fetchLatestRelease = async () => {
	const res = await fetch(GITHUB_RELEASE_URL);
	const data = (await res.json()) as GithubLatestReleaseAPI;

	return data;
};
