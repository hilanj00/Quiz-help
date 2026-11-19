# Rules of the Road Quiz

A simple practice-test website for the USCG Navigation Rules (International & Inland), using the
U.S. Maritime Academy "Rules of the Road" practice problems.

## Use it

- Open `index.html` in a browser, or open the single-file version `dist/quiz.html`.
- Pick sections, Practice mode (answer shown after each question) or Exam mode (answers at the end),
  and how many questions.
- Missed questions are remembered in your browser so you can retake just those.

## Sections so far (517 questions)

| Section | File |
| --- | --- |
| Rules 1–9 (Both, Inland only, International only) | `data/rules-01-09.js` |
| Rules 10–19 (Both, Rule 10 TSS, Inland only) | `data/rules-10-19.js` |
| Lights & Shapes, #144–224 | `data/lights-shapes.js` |
| Lights & Shapes, #225–321, plus International only and Inland only | `data/lights-shapes-2.js` |
| Sound & Light Signals, #322–415, plus International only and Inland only | `data/sound-signals.js` |
| Annexes & distress signals, #416–436 | `data/annexes.js` |
| General Questions, Lights in Diagrams, Sound Signals in Diagrams | `data/diagrams.js` |

All answers come from the book's answer keys. Questions that refer to a book diagram are flagged
`{diagram: true}` and are off by default in the quiz. Lights & Shapes #276–297 (pages 62–63) are not
in yet.

## Adding questions

Each question is one line in a `data/*.js` file:

```js
[number, "Rule 14", "Question text", ["A text", "B text", "C text", "D text"], "B", {diagram: true, note: "optional"}],
```

After editing, rebuild the single-file version with `python3 build.py`.
