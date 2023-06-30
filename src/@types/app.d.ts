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
