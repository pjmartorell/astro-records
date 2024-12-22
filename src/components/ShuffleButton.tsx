import { isPlaying, currentTrack, getRandomTrack } from './state'
import type { Track } from './state'

type Props = {
  tracks: Track[]
  albumId: string
  albumName: string
  artist: string
  imageUrl: string
}

export default function ShuffleButton({
  tracks,
  albumId,
  albumName,
  artist,
  imageUrl,
}: Props) {
  const handleShuffle = () => {
    const randomTrack = getRandomTrack(tracks, currentTrack.value?.id);
    currentTrack.value = {
      ...randomTrack,
      albumId,
      albumName,
      artist,
      imageUrl
    }
    isPlaying.value = true;
  }

  return (
    <button
      type="button"
      class="text-pink-600 bg-gray-100 font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-gray-500 mr-4 hover:bg-gray-200"
      onClick={handleShuffle}
    >
      <svg
        class="w-6 h-6 mr-2 -ml-1 text-pink-600"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill-rule="evenodd"
          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
          clip-rule="evenodd"
        />
      </svg>
      Shuffle
    </button>
  )
}
