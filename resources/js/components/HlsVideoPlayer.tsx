// resources/js/components/HlsVideoPlayer.tsx
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoPlayerProps {
    src: string;
    width?: string | number;
    height?: string | number;
}

const HlsVideoPlayer: React.FC<HlsVideoPlayerProps> = ({
                                                           src,
                                                           width = '100%',
                                                           height = 'auto',
                                                       }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls();
            hlsRef.current = hls;

            hls.loadSource(src);
            hls.attachMedia(video);

            hls.on(Hls.Events.ERROR, (_, data) => {
                console.error('HLS error:', data);
            });

            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
        }
    }, [src]);

    return (
        <div style={{ maxWidth: width }}>
            <video
                ref={videoRef}
                controls
                style={{
                    width: '100%',
                    height,
                    borderRadius: '12px',
                    backgroundColor: '#000',
                }}
            />
        </div>
    );
};

export default HlsVideoPlayer;
