<?php
namespace App\Services;

use Illuminate\Support\Facades\Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class VideoService
{
    public static function checkFFmpeg(): bool
    {
        $process = new Process(['ffmpeg', '-version']);
        $process->run();
        return $process->isSuccessful();
    }

    public static function generateHLS(string $inputPath, string $outputDir): string
    {
        $inputPath = str_replace('\\', '/', $inputPath);
        $outputDir = str_replace('\\', '/', $outputDir);

        Log::info("Checking file at path: $inputPath");
        Log::info("file_exists: " . (file_exists($inputPath) ? 'Yes' : 'No'));
        Log::info("is_readable: " . (is_readable($inputPath) ? 'Yes' : 'No'));

        if (!file_exists($inputPath)) {
            throw new \Exception("Input video file does not exist: $inputPath");
        }

        // Ensure output directory exists
        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $playlistPath = "$outputDir/master.m3u8";

        // Multi-resolution HLS generation
        $command = [
            'ffmpeg',
            '-i', $inputPath,
            '-filter_complex',
            "[0:v]split=3[v1][v2][v3];" .
            "[v1]scale=w=426:h=240[v1out];" .
            "[v2]scale=w=640:h=360[v2out];" .
            "[v3]scale=w=1280:h=720[v3out]",
            '-map', '[v1out]', '-c:v:0', 'libx264', '-b:v:0', '500k',
            '-map', '[v2out]', '-c:v:1', 'libx264', '-b:v:1', '800k',
            '-map', '[v3out]', '-c:v:2', 'libx264', '-b:v:2', '1500k',
            '-f', 'hls',
            '-var_stream_map', "v:0,name:240p v:1,name:360p v:2,name:720p",
            '-hls_time', '10',
            '-hls_list_size', '0',
            '-hls_segment_filename', "$outputDir/%v_%03d.ts",
            $playlistPath
        ];

        $process = new Process($command);
        $process->setTimeout(600);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return $playlistPath;
    }

    public static function generateSimpleHLS(string $inputPath, string $outputDir): string
    {
        $inputPath = str_replace('\\', '/', $inputPath);
        $outputDir = str_replace('\\', '/', $outputDir);

        Log::info("Fallback - Checking file at path: $inputPath");
        Log::info("file_exists: " . (file_exists($inputPath) ? 'Yes' : 'No'));
        Log::info("is_readable: " . (is_readable($inputPath) ? 'Yes' : 'No'));

        if (!file_exists($inputPath)) {
            throw new \Exception("Input video file does not exist: $inputPath");
        }

        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0755, true);
        }

        $playlistPath = "$outputDir/playlist.m3u8";
        $segmentPath = "$outputDir/segment_%03d.ts";

        $command = [
            'ffmpeg',
            '-i', $inputPath,
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-f', 'hls',
            '-hls_time', '10',
            '-hls_list_size', '0',
            '-hls_segment_filename', $segmentPath,
            $playlistPath
        ];

        $process = new Process($command);
        $process->setTimeout(600);
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return $playlistPath;
    }
}
