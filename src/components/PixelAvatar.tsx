import { STAR, ROBOT, boxShadowFromMap } from "../data/pixelArt";

/**
 * The site's single strong pixel element: a 16x16 robot avatar rendered as a
 * CSS box-shadow sprite, with the one sanctioned Yellow micro-accent (pixel
 * star badge) pinned to its corner.
 */
export function PixelAvatar({ size = 168 }: { size?: number }) {
  const px = size / 16;
  const unit = px / 1.6; // pixel size inside the 7x7 star sprite
  const starSize = unit * 7;

  return (
    <div className="relative inline-block" role="img" aria-label="Pixel-art robot avatar">
      {/* paper card behind the sprite */}
      <div
        aria-hidden="true"
        className="rounded-lg border border-line bg-surface"
        style={{ width: size + px * 4, height: size + px * 4 }}
      >
        <div
          style={{
            width: px,
            height: px,
            margin: px * 2,
            boxShadow: boxShadowFromMap(ROBOT, px),
          }}
        />
      </div>

      {/* Yellow pixel sparkle badge — centered on the card's top-right corner */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: -starSize / 2 + px, right: -starSize / 2 + px }}
      >
        <div
          style={{
            width: unit,
            height: unit,
            boxShadow: boxShadowFromMap(STAR, unit),
          }}
        />
      </div>
    </div>
  );
}
