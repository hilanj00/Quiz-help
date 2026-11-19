# Rules of the Road Quiz

A simple practice-test website for the USCG Navigation Rules (International & Inland), using the
U.S. Maritime Academy "Rules of the Road" practice problems.

## Use it

- Open `index.html` in a browser, or open the single-file version `dist/quiz.html`.
- Pick sections, Practice mode (answer shown after each question) or Exam mode (answers at the end),
  and how many questions.
- Missed questions are remembered in your browser so you can retake just those.

## Sections so far

| Section | File |
| --- | --- |
| Rules 1–9 (Both, Inland only, International only) | `data/rules-01-09.js` |
| Rules 10–19 (Both, Rule 10 TSS, Inland only) | `data/rules-10-19.js` |
| Lights & Shapes, Rules 20–25 (#144–224) | `data/lights-shapes.js` |

Answers come from the book's answer keys, except Lights & Shapes: that key hasn't been photographed
yet, so those answers were worked out from the Rules and are marked `{src: "rules"}`.
Questions that depend entirely on a book diagram are listed at the top of each data file.

## Adding questions

Each question is one line in a `data/*.js` file:

```js
[number, "Rule 14", "Question text", ["A text", "B text", "C text", "D text"], "B", {diagram: true, note: "optional"}],
```

After editing, rebuild the single-file version with `python3 build.py`.
