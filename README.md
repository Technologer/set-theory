# Set Theory

A scroll-through guide to 24 electronic dance genres, sequenced like a real DJ set —
warm-up, groove, the build, peak time, after hours, last record. Each genre brings its BPM
range, energy, notable artists, a fun fact, and a representative track that fades in
as you scroll to it.

## Run it

```bash
./serve.sh
```

Then open <http://localhost:8000> (the script opens it for you). On macOS you can also
double-click **`serve.command`** in Finder.

No build step, no `npm install`. Any static server works:

```bash
python3 -m http.server 8000
```

### ⚠️ Do not open `index.html` by double-clicking it

The YouTube embeds need a real `http://` origin. Loaded over `file://` every player
fails with **"Video player configuration error" (error 153)** because the embed has no
valid referrer. Always go through a local server.

## How it works

| File | Role |
| --- | --- |
| `index.html` | Page shell: intro, top bar, side rail, outro. Sections are rendered at runtime. |
| `js/data.js` | All content — 24 genres, acts, family accent colours. Edit here to change copy. |
| `js/app.js` | Rendering, IntersectionObserver, side rail, search, keyboard nav, progress. |
| `js/audio-engine.js` | YouTube IFrame API wrapper: one audible player at a time, volume fades, lazy load/destroy. |
| `css/styles.css` | All styling. Each section sets `--accent`; chips, rules and glows read from it. |

### Audio behaviour

- **Everything starts muted.** Browsers block autoplay with sound, so muted-autoplay is
  the default (the Instagram/TikTok pattern). The speaker button in the top-right turns
  sound on — that click is itself the gesture the browser needs to allow audible playback.
- **Exactly one track is ever audible.** A single `activeIndex` is tracked; the outgoing
  track fades out over 400ms while the incoming one fades in over 600ms.
- **When a track ends the journey advances itself** to the next genre (and from the last
  genre, to the closing screen) — the set keeps playing if you stop scrolling. Tracks run
  3–8 minutes, so this only fires if you actually sit on a section. Videos deliberately do
  not loop; looping would suppress the `ENDED` event this depends on.
- **Players are created lazily** for the current section ±1 and destroyed once they're
  more than 2 sections away, so the page doesn't hold 24 live iframes.
- A section becomes "active" at **55% viewport visibility**.
- Every section keeps a permanent **"Open on YouTube ↗"** link — useful with ad-blockers,
  and for listening on headphones outside the page.

To check the single-audible-player rule yourself, run this in the browser console while
scrolling — exactly one player should ever report state `1` (playing):

```js
AudioEngine.states()
```

### Accessibility

- `prefers-reduced-motion` disables the parallax/entrance animation **and** autoplay:
  each section shows a static thumbnail plus a "▶ Play this track" button instead.
  Auto-advance is also suppressed for these users — an unrequested page jump is exactly
  the motion they opted out of — so a finished track just resets its play button.
- Keyboard: <kbd>J</kbd>/<kbd>↓</kbd> next genre, <kbd>K</kbd>/<kbd>↑</kbd> previous,
  <kbd>/</kbd> opens search, <kbd>Esc</kbd> closes it.
- Interactive controls carry ARIA labels and pressed/expanded state.

## Editing content

`js/data.js` is the single source of truth. Each genre object takes:

```js
{
  id, act, family, accent, name, tagline, bpm, energy,
  desc, funFact, artists,
  video,       // YouTube video ID
  videoStart,  // seconds to cue into the track — raise it to skip a slow intro
  videoNote    // caption under the section
}
```

`videoStart` is `0` everywhere. Bumping it per track (e.g. straight to the drop) makes
the scroll journey hit harder — worth a pass with the page open.

The fun facts are well-documented trivia but, like any factual copy, deserve a human
spot-check before you show this to anyone.

### Copy that lives in `index.html`, not `data.js`

The closing screen carries two pieces of prose worth knowing about:

- **The act-naming disclosure** (`.outro__note`) — states plainly that *warm-up* and
  *peak time* are real DJ vocabulary while *the build*, *after hours* and *last record*
  are not fixed terms, and that the six-act structure is a teaching device. Keep this
  honest if you rename the acts in `data.js`.
- **"How a set actually gets built"** (`.craft`) — six set-building conventions: energy
  waves, phrasing, tempo proximity, half-time bridging, harmonic mixing, and planning
  the opener and closer. These are widely-taught craft conventions rather than hard
  rules, and deserve the same spot-check as the fun facts.

## Dependencies

Only the YouTube IFrame API and Google Fonts, both loaded from their CDNs at runtime.
No GSAP: entrance animation is IntersectionObserver plus CSS transitions, and jump
navigation uses native smooth scrolling — fewer moving parts, nothing to break if a CDN
is blocked.
