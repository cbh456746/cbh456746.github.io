# Maintenance runbook (GitHub Desktop)

## One-time setup

1. Install and sign in to GitHub Desktop.
2. Choose **File → Clone repository**, then choose the owner repository `cbh456746/cbh456746.github.io`.
3. Choose a simple folder such as `Documents/GitHub/cbh456746.github.io`. This is the real local copy connected to GitHub.
4. On GitHub, open **Settings → Pages** and select **GitHub Actions** as the build source (once). This allows the included build workflow to publish the site.
5. Before copying this delivery into it, use **Fetch origin**. If updates exist, choose **Pull origin** first.

## Apply this delivery safely

1. Extract the delivered ZIP into a temporary folder.
2. Copy its contents into the cloned repository folder from step 3.
3. **Do not copy a `.git` folder.** The clone's hidden `.git` folder is what connects it to GitHub.
4. In GitHub Desktop, inspect the **Changes** tab. Files should look like the expected new layout, content folders, and documents.
5. Write a summary such as `Modernize site structure and design`, then choose **Commit to main**.
6. Choose **Push origin**. Wait for the button to finish.
7. On GitHub, open the **Actions** tab and wait for `Build and deploy GitHub Pages` to pass. Then open the website in an InPrivate/Incognito window.

## Normal content change

1. Fetch/Pull first.
2. Edit one Markdown or YAML data file.
3. Check the Change list; only expected files should be present.
4. Commit with a sentence explaining the change, then Push origin.

## When to stop

Stop and ask for help if GitHub Desktop says **conflict**, asks you to force push, shows unrelated deleted files, or the GitHub Actions build fails. Do not use force push or discard-all-changes as a shortcut.

## Verification checklist

- Home: `/`
- Resume: `/resume/`
- Projects: `/projects/`
- Research: `/research/`
- Notes: `/notes/`
- Play: `/play/`
- Archive: `/archive/`
- Legacy samples: `/play/hello-2015/`, `/play/hello-2015-ko/`
