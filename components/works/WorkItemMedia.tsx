"use client";

import { cn } from "@/lib/cn";
import type { WorkItem } from "@/lib/works";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** One shared media frame for all work *cards* so grids stay even; images & video are fully visible (letterboxed). */
const WORK_CARD_FRAME =
  "relative w-full aspect-square overflow-hidden bg-charcoal";

type WorkItemMediaProps = {
  project: WorkItem;
  sizes: string;
  className: string;
  /**
   * `card` (default) — single square frame + object-contain for all stills and video (balanced grids).
   * `inset` — still images fill a parent box (e.g. featured split); only pass when parent sets size.
   */
  layout?: "card" | "inset";
  /** Extra classes on the card media frame (e.g. max height for compact video on the home page). */
  frameClassName?: string;
};

/**
 * Muted work clips: only play while in view; pause when off-screen. Card layout uses a fixed square
 * frame so all work cards align; `object-contain` keeps full image/video inside the card.
 */
export function WorkItemMedia({
  project,
  sizes,
  className,
  layout = "card",
  frameClassName,
}: WorkItemMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = Boolean(project.video) && !videoFailed;
  const videoSrc = project.video?.src;

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !hasVideo || !videoSrc) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void el.play().catch(() => {
              /* autoplay may be blocked; poster still shows */
            });
          } else {
            el.pause();
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.2 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      el.pause();
    };
  }, [hasVideo, videoSrc]);

  if (hasVideo && project.video) {
    return (
      <div className={cn(WORK_CARD_FRAME, frameClassName)}>
        <video
          key={videoSrc}
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-contain object-center",
            className,
          )}
          src={project.video.src}
          loop
          muted
          playsInline
          preload="metadata"
          poster={project.video.poster ?? project.image}
          onError={() => setVideoFailed(true)}
          aria-label={`${project.title} showcase video`}
        />
      </div>
    );
  }

  if (layout === "inset") {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={className}
        sizes={sizes}
      />
    );
  }

  return (
    <div className={cn(WORK_CARD_FRAME)}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={cn("object-contain object-center", className)}
        sizes={sizes}
      />
    </div>
  );
}
