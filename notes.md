# CS 260 Notes

Running notes on things I learn throughout the course. Add to this as you go — it's fair game for the midterm and final.

I love web programming.

## Startup HTML deliverable

- No CSS yet at this stage, so every page looks plain — that's expected. The point is structure and content placeholders, not visual design.
- Since there's no React/JS yet, the header/nav/footer have to be copy-pasted identically onto every page. This is intentional at this stage of the class; later, once React is introduced, this repetition collapses into a single shared component and the whole app becomes one `index.html`.
- Inline SVG (`<line>`, `<rect>`, `<circle>`) is enough to sketch a maze-like graphic without any images or JS — same idea as how Simon draws its buttons with SVG.
- Split the login/auth placeholder into two separate states on `login.html`: the actual input forms, and a separately labeled "once you're signed in" block showing the username/stats/logout button. Doing this as one combined section made it unclear which part was satisfying which rubric line.
- Used a local `python3 -m http.server` to preview pages in the browser instead of file:// URLs, since the browser extension I was using couldn't interact with local file:// pages directly.

## Deployment (Simon HTML + Startup HTML)

- `deployFiles.sh` only copies files to `services/<service>/public` on the server — it does **not** touch Caddy's routing. Caddy has to already have a block for the subdomain, or the deploy silently succeeds while the site itself is unreachable/wrong.
- My Caddyfile only had blocks for the root domain and `startup.jonaslee.com`, and that startup block pointed at the generic `/usr/share/caddy` default page instead of `services/startup/public`. There was no `simon.jonaslee.com` block at all. Had to hand-edit `/etc/caddy/Caddyfile` to add one and fix the other, each with `root * /home/ubuntu/services/<service>/public` + `file_server`, then `sudo caddy validate` and `sudo service caddy restart`.
- Caddy runs as its own system user (`caddy`), not `ubuntu`, and by default couldn't even traverse into `/home/ubuntu` (`drwxr-x---`). Fixed with `chmod o+x /home/ubuntu` — that grants traversal only, not directory listing, so it doesn't expose anything beyond what the Caddyfile explicitly serves.
- Always use absolute paths in the Caddyfile `root` directive, not relative ones — Caddy's systemd service has no working directory set, so a relative path resolves against `/`, not the ubuntu home directory.
- `deployFiles.sh` does `scp -r *` from wherever you run it — since my repo root also has the full course `instruction/` folder (63MB) alongside my own app files, running the script straight from the repo root would've uploaded the entire course website to production. Deployed from a clean staging folder containing only my 5 HTML pages + the one image they reference instead.
- First SSH connection to a fresh host from a new machine fails with "Host key verification failed" until you `ssh-keyscan -H <host> >> ~/.ssh/known_hosts` once.
