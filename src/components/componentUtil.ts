import { type Song } from "@/globalState";

export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const displayArtistAlbum = (song: Song | null) => {
	if (!song?.artist) return "👤 No artist selected";
	if (!song.album) return `👤 ${song.artist}`;
	return `👤 ${song.artist} • 💿 ${song.album}`;
};
