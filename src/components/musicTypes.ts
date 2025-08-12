export interface Track {
	fileName: string;
	title: string;
	artist: string;
	album: string;
	duration: number;
	songSrc: string;
	pictureSrc: string | null;
}

export interface Playlist {
	id: string;
	name: string;
	tracks: Track[];
}

export interface ProcessingProgress {
	current: number;
	total: number;
}
