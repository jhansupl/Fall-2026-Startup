# CS 260 Notes

Running notes on things I learn throughout the course. Add to this as you go — it's fair game for the midterm and final.

I love web programming.

## Startup HTML deliverable

- No CSS yet at this stage, so every page looks plain — that's expected. The point is structure and content placeholders, not visual design.
- Since there's no React/JS yet, the header/nav/footer have to be copy-pasted identically onto every page. This is intentional at this stage of the class; later, once React is introduced, this repetition collapses into a single shared component and the whole app becomes one `index.html`.
- Inline SVG (`<line>`, `<rect>`, `<circle>`) is enough to sketch a maze-like graphic without any images or JS — same idea as how Simon draws its buttons with SVG.
- Split the login/auth placeholder into two separate states on `login.html`: the actual input forms, and a separately labeled "once you're signed in" block showing the username/stats/logout button. Doing this as one combined section made it unclear which part was satisfying which rubric line.
- Used a local `python3 -m http.server` to preview pages in the browser instead of file:// URLs, since the browser extension I was using couldn't interact with local file:// pages directly.
