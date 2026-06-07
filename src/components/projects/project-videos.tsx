type ProjectVideo = {
  src: string;
  title?: string;
  caption?: string;
  poster?: string;
};

export function ProjectVideos({ videos }: { videos: ProjectVideo[] }) {
  if (videos.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight">Gameplay in motion</h2>
      <div className="mt-6 space-y-10">
        {videos.map((video) => (
          <figure key={video.src}>
            {video.title && (
              <h3 className="mb-3 text-lg font-semibold tracking-tight">
                {video.title}
              </h3>
            )}
            <div className="overflow-hidden rounded-xl border bg-muted">
              <video
                className="aspect-video w-full"
                controls
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                poster={video.poster}
              >
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            {video.caption && (
              <figcaption className="mt-3 text-sm text-muted-foreground">
                {video.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
