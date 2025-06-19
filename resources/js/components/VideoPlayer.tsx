import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;

        if (video && src.endsWith('.m3u8')) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = src;
            }
        }
    }, [src]);

    return (
        <video ref={videoRef} controls className="w-full rounded-lg" />
    );
}
