# Personal workspace and family mascot

Status: implemented for review; merging and deployment require the user's decision because this is a broad redesign.

## User decisions

- Use a compact tool interface with clear forms and content lists, little decoration.
- Replace the public settings menu with the signed-in user's avatar and their own videos/history. Remove the public administration link; preserve the independent admin route and permissions.
- Koma belongs to the Kiri, Mimi, and Fuwa family. Use a softly colored chibi girl, consistent with the supplied sister icons, rather than the rejected mature monochrome character or simple recoloring.

## Implementation

The existing GitHub session supplies the avatar, display name and login. The account menu opens the existing account-owned library, new analysis, help, or sign-out. A missing/broken avatar falls back to a name initial. Session loading, unavailable sign-in and failed logout retain explicit feedback. Outside click, blur, navigation and Escape close the menu; Escape restores the trigger. Help keeps keyboard focus inside its dialog and restores it on close.

The public header, welcome, form, list, progress and results use restrained neutral styling. Desktop keeps video source and analysis requirements side by side; mobile stacks them. Existing input validation, editable JSON drafts, source limits, ownership checks, retries, exports and account-local templates remain unchanged. No backend contract or provider configuration changes.

The family mascot appears only in small brand/help placements and shared icon/README/social assets. The account avatar is always independent. Existing admin branding receives the same mascot, without changing its controls or access rules.

## Verification

Run the repository check pipeline and inspect Chinese/English desktop and mobile layouts. Exercise menu keyboard focus, navigation, unavailable sign-in, broken avatars, long names, logout success/failure, library empty/error/list states, and direct admin access with local fixtures. These fixture checks do not establish real OAuth, provider execution, or media playback acceptance. Attach screenshots to the review rather than committing them.
