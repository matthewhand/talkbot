# Avatar / animation inventory

**Verdict: this tree is unrelated to Persona + Talking Head.** Do not drop `assets/review-pack` here.

`matthewhand/talkbot` is a 2023 fork of [nullabork/talkbot](https://github.com/nullabork/talkbot): a Discord text-to-speech and translation bot. There is no visual avatar, talking-head, or animation loader. “Personalization” in this codebase means TTS voice / pitch / speed / language, not a character.

Local fork work is AWS deploy only (SSM, ECR, GitHub Actions). Last push: 2023-05-29. Not archived, but dormant as an avatar host.

## How media is stored

| Kind | Location | Notes |
| --- | --- | --- |
| Avatars | none | No `assets/`, no image/3D files, no loader |
| Animations | none | No sprite, Lottie, Rive, GLB/VRM, or video pipeline |
| Bot face (logo) | remote URL only | README and Discord embeds point at `nullabork/artwork` / `voices.talkbot.dev/img/face_200.png` |
| TTS voice catalogs | `google.json`, `amazon.json`, `azure.json`, `watson.json`, `config/*-voices.json` | Provider voice metadata, not characters |
| Voice sample zips | `*_voice_samples.zip` | TTS audio demos; generated samples go to gitignored `samples/` |
| SFX | runtime `server.audioEmojis` | HTTPS URLs persisted in server state, not repo files |
| Secrets | `config/auth.json` (gitignored) | Example only in `config/auth.example.json` |

There are no default avatar/animation files to preserve, and no code path that would consume extra ones.

## Why a review pack does not belong here

A license-clean avatar/anim pack would be unused orphans. This repo cannot “hold extras without replacing defaults” because it has neither defaults nor a slot for extras.

Put review-pack assets in the Persona / Talking Head repos that already keep avatar and animation files separate.
