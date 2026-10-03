# Hassaan Farooq: portfolio

A portfolio that boots like a CI pipeline and runs like a tiny cluster. Built with Vite, React 19, Tailwind CSS 4 and framer-motion.

## Two ways to view it

- **Desktop** (wide screens with a mouse): a browser desktop with draggable windows, icons, a taskbar and a boot sequence that is a CI run (`checkout, build, test, release, deploy`).
- **Quick view** (phones, tablets, reduced motion, or the "Quick view" button): one plain scrolling page with the same content. Scroll progress is shown as pipeline stages.

The page picks a view automatically. Force one with `?shell=quick` or `?shell=desktop`; the choice is remembered.

## Things to try

- Press `Ctrl K` or `Cmd K` (or `/`) for the command palette.
- Kill a skill pod, or release the **Chaos monkey**, and watch the cluster heal.
- Open **Terminal** and type `help`. Try `kubectl get pods`, `chaos`, `theme blueprint` and `sudo hire-me`.
- Switch themes. Each one is a kubectl context: `dark-cluster`, `blueprint`, `light-vellum`, `retro-crt`.
- Share a window with its URL hash, for example `#skills` or `#projects/task-manager-docker-k8s`.

## Scripts

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Editing content

All content lives in `src/data/`. Both views read from it, so edit it once.

| File            | What it holds                                                    |
| --------------- | ---------------------------------------------------------------- |
| `profile.js`    | Name, role, summary and the three fact cards                     |
| `skills.js`     | Skills (each one becomes a pod)                                  |
| `projects.js`   | Projects. Fill in `repo` and `demo` and the buttons appear       |
| `experience.js` | Work history, shown as a git log                                 |
| `links.js`      | Email, GitHub, LinkedIn and the resume URL                       |

## How it is put together

```
src/
  data/            content
  theme/           themes (kubectl contexts), provider and switcher
  cluster/         pod store and the chaos monkey
  commands/        command registry shared by the palette and the terminal
  palette/         Ctrl K command palette
  apps/            app catalog (metadata) and registry (views)
  views/           content views, shared by both shells
  shell/quick/     Quick view (the scrolling page)
  shell/desktop/   desktop shell and the window manager (lazy loaded)
```

- **Add an app:** add an entry to `src/apps/catalog.js`, map its view in `src/apps/registry.js`, and it appears on the desktop and in the palette.
- **Add a command:** add an entry to `commands` in `src/commands/registry.js`. It works in the terminal and the palette.
- **Add a theme:** add a `[data-theme="..."]` block in `src/styles/theme.css` and an entry in `src/theme/themes.js`. Also add the id to the list in the inline script in `index.html`.
- Theme tokens are CSS variables mapped to Tailwind colors (`bg-canvas`, `text-muted`, `border-line`, `text-accent`, and so on). Use those instead of raw colors so every theme keeps working.

## Accessibility

- Quick view is a semantic page and the fallback for everything else; there is also a `<noscript>` summary.
- Windows are non-modal dialogs. Focus a title bar and use the arrow keys to move it, `Esc` to close it.
- The palette is a combobox with focus return, and the terminal supports history and Tab completion.
- `prefers-reduced-motion` skips the boot sequence, defaults to Quick view and speeds up the cluster.
