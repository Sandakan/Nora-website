export interface Changelog {
	latestVersion: LatestAppVersion;
	versions: AppVersion[];
}

export interface LatestAppVersion {
	version: string;
	phase: string;
	releaseDate: string;
	artwork?: string;
	importantNotes?: string[];
}

export interface AppVersion {
	version: string;
	releaseDate: string;
	importantNotes?: string[];
	artwork?: string;
	notes: Notes;
}

export interface Notes {
	new: Fixed[];
	fixed: Fixed[];
	knownIssues: Fixed[];
}

export interface Fixed {
	note: string;
}

export type OsTypes = 'win' | 'linux' | 'mac';
export type ArchTypes = 'x64' | 'arm64' | 'x86_64';

export interface AssetMetadata {
	os: OsTypes;
	arch: ArchTypes;
	version: string;
	release: string;
	ext: string;
	download_url: string;
	download_count: number;
}
