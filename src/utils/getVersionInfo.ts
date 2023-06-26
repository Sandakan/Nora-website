// Learn more about semantic versioning on https://semver.org/
// Semantic version checking regex from https://regex101.com/r/vkijKf/1/
// Pre-release is in the form (alpha|beta). YYYYMMDDNN where NN is a number in range 0 to 99.

const semVerRegex =
	/^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

interface VersionInfo {
	major: string;
	minor: string;
	patch: string;
}

interface ExtendedVersionInfo extends VersionInfo {
	preRelease?: string;
	releasePhase?: string;
}

export const getVersionInfo = (versionString?: string): ExtendedVersionInfo | undefined => {
	if (versionString) {
		const versionData = versionString.match(semVerRegex);

		if (versionData) {
			const [, major, minor, patch, preRelease] = versionData;
			const releasePhase = preRelease?.replace(/[^a-zA-Z]/gi, '');

			return { major, minor, patch, preRelease, releasePhase };
		}
	}
	return undefined;
};
