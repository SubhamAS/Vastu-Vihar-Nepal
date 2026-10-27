import { useEffect, useId, useRef, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Archive02Icon,
  Tick02Icon,
  Undo02Icon,
} from "@hugeicons/core-free-icons";

const LINE = [{ transform: "scaleX(1)" }, { transform: "scaleX(0)" }];
const OUTLINE = [{ strokeDashoffset: 0 }, { strokeDashoffset: -1 }];
const SIZES = {
  sm: { height: 36, font: 13, icon: 14, px: 16 },
  md: { height: 44, font: 14, icon: 15, px: 20 },
  lg: { height: 52, font: 15, icon: 17, px: 24 },
};

export default function FuseButton({
  label = "Archive",
  undoLabel = "Undo",
  ariaLabel,
  undoAriaLabel,
  doneLabel = "Archived",
  icon,
  color = "#f5f5f5",
  background = "#27272a",
  fuseColor = "#f5a524",
  size = "md",
  radius = 22,
  undoWindow = 4000,
  fuse = "outline",
  fuseThickness = 1.5,
  crossfadeMs = 200,
  commitOn = "press",
  pauseOnHover = true,
  settle = "reset",
  disabled = false,
  onCommit,
  onUndo,
  onFuseEnd,
  onPhaseChange,
  className = "",
  type = "button",
}) {
  const [phase, setPhase] = useState("idle");
  const [instant, setInstant] = useState(false);
  const rootRef = useRef(null);
  const idleRef = useRef(null);
  const undoRef = useRef(null);
  const lineRef = useRef(null);
  const rimRef = useRef(null);
  const anim = useRef(null);
  const pause = useRef({ hover: false, hidden: false, canHoverPause: false });
  const lastInput = useRef("pointer");
  const windowRef = useRef(undoWindow);
  const latest = useRef({ onCommit, onUndo, onFuseEnd, onPhaseChange, commitOn, settle });
  latest.current = { onCommit, onUndo, onFuseEnd, onPhaseChange, commitOn, settle };
  const statusId = useId();
  const preset = SIZES[size] || SIZES.md;

  const go = (next) => {
    setInstant(lastInput.current === "keyboard");
    setPhase(next);
    latest.current.onPhaseChange?.(next);
  };

  const syncPlayState = () => {
    const animation = anim.current;
    if (!animation) return;
    const { hover, hidden } = pause.current;
    if (hover || hidden) {
      if (animation.playState === "running") animation.pause();
    } else if (animation.playState === "paused") {
      animation.play();
    }
  };

  const light = (from = 0) => {
    const element = fuse === "outline" ? rimRef.current : lineRef.current;
    if (!element) return;
    anim.current?.cancel();
    const animation = element.animate(fuse === "outline" ? OUTLINE : LINE, {
      duration: windowRef.current,
      easing: "linear",
      fill: "forwards",
    });
    if (from) animation.currentTime = from;
    animation.onfinish = () => {
      const callbacks = latest.current;
      callbacks.onFuseEnd?.();
      if (callbacks.commitOn === "fuseEnd") callbacks.onCommit?.("fuseEnd");
      lastInput.current = "pointer";
      go(callbacks.settle === "stay" ? "settled" : "idle");
    };
    anim.current = animation;
    syncPlayState();
  };

  const arm = () => {
    if (disabled || phase !== "idle") return;
    windowRef.current = undoWindow;
    light();
    pause.current.canHoverPause = false;
    pause.current.hover = false;
    if (commitOn === "press") onCommit?.("press");
    go("armed");
  };

  const undo = () => {
    if (phase !== "armed") return;
    if (anim.current) {
      anim.current.onfinish = null;
      anim.current.cancel();
      anim.current = null;
    }
    onUndo?.();
    go("idle");
  };

  useEffect(() => {
    const hadFocus = rootRef.current?.contains(document.activeElement);
    if (phase === "armed") undoRef.current?.focus({ preventScroll: true });
    else if (hadFocus) (phase === "idle" ? idleRef.current : rootRef.current)?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    const onVisibility = () => {
      pause.current.hidden = document.hidden;
      syncPlayState();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      anim.current?.cancel();
    };
    // The listener intentionally reads the refs, which stay current.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const animation = anim.current;
    if (!animation || phase !== "armed") return;
    light(Number(animation.currentTime) || 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuse]);

  const handlePointerDown = (event) => {
    lastInput.current = "pointer";
    const pressable = phase === "armed" || (phase === "idle" && !disabled);
    if (event.button === 0 && pressable && rootRef.current) rootRef.current.dataset.pressed = "";
  };
  const release = () => {
    if (rootRef.current) delete rootRef.current.dataset.pressed;
  };
  const handlePointerEnter = (event) => {
    if (pauseOnHover && event.pointerType === "mouse" && pause.current.canHoverPause) {
      pause.current.hover = true;
      syncPlayState();
    }
  };
  const handlePointerLeave = (event) => {
    release();
    if (event.pointerType !== "mouse") return;
    pause.current.canHoverPause = true;
    pause.current.hover = false;
    syncPlayState();
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") lastInput.current = "keyboard";
    if (event.key === "Escape" && phase === "armed") {
      event.preventDefault();
      lastInput.current = "keyboard";
      undo();
    }
  };

  const actionIcon = icon ?? <HugeiconsIcon icon={Archive02Icon} size={preset.icon} strokeWidth={1.8} />;
  const line = (
    <i
      ref={lineRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[var(--fb-fuse-h)] origin-left [background:var(--fb-fuse)] [box-shadow:0_0_6px_color-mix(in_srgb,var(--fb-fuse)_55%,transparent)] group-data-[fuse=top]:top-0 group-data-[fuse=top]:bottom-auto forced-colors:[background:Highlight]"
      aria-hidden="true"
    />
  );

  return (
    <span
      ref={rootRef}
      tabIndex={-1}
      className={`group relative inline-grid h-[var(--fb-h)] grid-cols-[minmax(0,1fr)] isolate touch-manipulation select-none overflow-hidden rounded-[var(--fb-radius)] font-medium leading-none tracking-[0.01em] outline-none [font-family:inherit] [font-size:var(--fb-fs)] [background:var(--fb-bg)] [color:var(--fb-ink)] [-webkit-tap-highlight-color:transparent] [transition:transform_160ms_var(--fb-ease-out)] data-[pressed]:[transform:scale(var(--fb-press))] motion-reduce:data-[pressed]:[transform:none] has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-offset-[3px] has-[:focus-visible]:[outline-color:color-mix(in_srgb,var(--fb-ink)_60%,transparent)] data-[phase=idle]:has-[.fb-idle:disabled]:opacity-[0.55] contrast-more:[box-shadow:inset_0_0_0_1px_color-mix(in_srgb,var(--fb-ink)_40%,transparent)]${className ? ` ${className}` : ""}`}
      data-phase={phase}
      data-fuse={fuse}
      data-instant={instant ? "" : undefined}
      aria-disabled={phase === "settled" || undefined}
      style={{
        "--fb-ink": color,
        "--fb-bg": background,
        "--fb-fuse": fuseColor,
        "--fb-fuse-h": `${fuseThickness}px`,
        "--fb-radius": `${radius}px`,
        "--fb-fade": `${crossfadeMs}ms`,
        "--fb-h": `${preset.height}px`,
        "--fb-fs": `${preset.font}px`,
        "--fb-icon": `${preset.icon}px`,
        "--fb-px": `${preset.px}px`,
        "--fb-press": 0.97,
        "--fb-ease-out": "cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      onPointerDown={handlePointerDown}
      onPointerUp={release}
      onPointerCancel={release}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={idleRef}
        type={type}
        className="fb-idle relative [grid-area:1/1] inline-flex h-full w-full min-w-0 items-center justify-center gap-2 m-0 border-0 bg-transparent px-[var(--fb-px)] whitespace-nowrap cursor-pointer invisible opacity-0 [filter:blur(2px)] [color:inherit] [font:inherit] [letter-spacing:inherit] [transition:opacity_var(--fb-fade)_ease,filter_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade),background-color_160ms_ease] motion-reduce:[filter:none] motion-reduce:[transition:opacity_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade)] group-data-[instant]:[transition-duration:0s] group-data-[phase=idle]:visible group-data-[phase=idle]:opacity-100 group-data-[phase=idle]:[filter:blur(0)] group-data-[phase=idle]:[transition-delay:0s] disabled:cursor-default focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:enabled:hover:[background:color-mix(in_srgb,var(--fb-ink)_7%,transparent)]"
        disabled={disabled}
        inert={phase !== "idle"}
        aria-label={ariaLabel || label || "Action"}
        onClick={arm}
      >
        <span className="inline-flex h-[var(--fb-icon)] w-[var(--fb-icon)] [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
          {actionIcon}
        </span>
        {label}
        {fuse !== "outline" ? line : null}
      </button>
      <button
        ref={undoRef}
        type="button"
        className="relative [grid-area:1/1] inline-flex h-full w-full min-w-0 items-center justify-center gap-2 m-0 border-0 bg-transparent px-[var(--fb-px)] whitespace-nowrap cursor-pointer invisible opacity-0 [filter:blur(2px)] [color:inherit] [font:inherit] [letter-spacing:inherit] [transition:opacity_var(--fb-fade)_ease,filter_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade),background-color_160ms_ease] motion-reduce:[filter:none] motion-reduce:[transition:opacity_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade)] group-data-[instant]:[transition-duration:0s] group-data-[phase=armed]:visible group-data-[phase=armed]:opacity-100 group-data-[phase=armed]:[filter:blur(0)] group-data-[phase=armed]:[transition-delay:0s] focus-visible:outline-none [@media(hover:hover)_and_(pointer:fine)]:hover:[background:color-mix(in_srgb,var(--fb-ink)_7%,transparent)]"
        aria-describedby={statusId}
        aria-label={undoAriaLabel || undoLabel || "Undo action"}
        aria-keyshortcuts="Escape"
        inert={phase !== "armed"}
        onClick={undo}
      >
        <span className="inline-flex h-[var(--fb-icon)] w-[var(--fb-icon)] [&>svg]:h-full [&>svg]:w-full [transform:rotate(-70deg)] [transition:transform_var(--fb-fade)_var(--fb-ease-out)] group-data-[phase=armed]:[transform:rotate(0deg)] motion-reduce:transition-none motion-reduce:[transform:none]" aria-hidden="true">
          <HugeiconsIcon icon={Undo02Icon} size={preset.icon} strokeWidth={2} />
        </span>
        {undoLabel}
        {fuse !== "outline" ? line : null}
      </button>
      <span
        className="relative [grid-area:1/1] inline-flex h-full w-full min-w-0 items-center justify-center gap-2 m-0 border-0 bg-transparent px-[var(--fb-px)] whitespace-nowrap cursor-default invisible opacity-0 [filter:blur(2px)] [color:inherit] [font:inherit] [letter-spacing:inherit] [transition:opacity_var(--fb-fade)_ease,filter_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade)] motion-reduce:[filter:none] motion-reduce:[transition:opacity_var(--fb-fade)_ease,visibility_0s_linear_var(--fb-fade)] group-data-[instant]:[transition-duration:0s] group-data-[phase=settled]:visible group-data-[phase=settled]:opacity-100 group-data-[phase=settled]:[filter:blur(0)] group-data-[phase=settled]:[transition-delay:0s]"
        inert={phase !== "settled"}
      >
        <span className="inline-flex h-[var(--fb-icon)] w-[var(--fb-icon)] [&>svg]:h-full [&>svg]:w-full" aria-hidden="true">
          <HugeiconsIcon icon={Tick02Icon} size={preset.icon} strokeWidth={2.2} />
        </span>
        {doneLabel}
      </span>
      {fuse === "outline" ? (
        <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible opacity-0 [filter:drop-shadow(0_0_3px_color-mix(in_srgb,var(--fb-fuse)_60%,transparent))] [transition:opacity_var(--fb-fade)_ease] group-data-[phase=armed]:opacity-100 group-data-[instant]:[transition-duration:0s]" aria-hidden="true">
          <rect
            ref={rimRef}
            pathLength="1"
            className="fill-none [x:calc(var(--fb-fuse-h)/2)] [y:calc(var(--fb-fuse-h)/2)] [width:calc(100%-var(--fb-fuse-h))] [height:calc(100%-var(--fb-fuse-h))] [rx:max(0px,calc(var(--fb-radius)-var(--fb-fuse-h)/2))] [stroke:var(--fb-fuse)] [stroke-width:var(--fb-fuse-h)] [stroke-linecap:round] [stroke-dasharray:1] forced-colors:[stroke:Highlight]"
          />
        </svg>
      ) : null}
      <span className="sr-only" id={statusId} role="status" aria-live="polite">
        {phase === "idle" ? "" : doneLabel}
      </span>
    </span>
  );
}
