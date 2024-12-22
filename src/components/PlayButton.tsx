import { isPlaying, currentTrack } from './state'
import type { Track } from './state'
import { useSignalEffect } from '@preact/signals'
import { useState } from 'preact/hooks'

type Props = {
  tracks: Track[]
  albumId: string
  albumName: string
  artist: string
  imageUrl: string
}

export default function PlayButton({
  tracks,
  albumId,
  albumName,
  artist,
  imageUrl,
}: Props) {
  const [isThisAlbumPlaying, setIsThisAlbumPlaying] = useState(false);

  useSignalEffect(() => {
    setIsThisAlbumPlaying(currentTrack.value?.albumId === albumId && isPlaying.value);
  });

  const isThisAlbumLoaded = currentTrack.value?.albumId === albumId;
  const buttonText = isThisAlbumLoaded
    ? (isThisAlbumPlaying ? 'Pause' : 'Resume')
    : 'Play';

  return (
    <button
      type="button"
      class="text-pink-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-black mr-4"
      onClick={() => {
        if (currentTrack.value?.albumId === albumId) {
          isPlaying.value = !isPlaying.value;
        } else {
          currentTrack.value = {
            ...tracks[0],
            albumId,
            albumName,
            artist,
            imageUrl,
          }
          isPlaying.value = true;
        }
      }}
    >
      {!isThisAlbumPlaying ? (
        // Play icon
        <svg
          class="w-6 h-6 mr-2 -ml-1 text-pink-700"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd"
          />
        </svg>
      ) : (
        // Pause icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 mr-2 -ml-1 text-pink-700"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z"
            clip-rule="evenodd"
          />
        </svg>
      )}
      {buttonText}
    </button>
  )
}
