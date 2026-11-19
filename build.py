#!/usr/bin/env python3
"""Bundle index.html + style.css + data/*.js + app.js into one self-contained page.

Usage:
  python3 build.py              -> writes dist/quiz.html (a full standalone HTML file)
  python3 build.py --fragment   -> writes dist/quiz-fragment.html (no <html>/<head>/<body> tags,
                                   the format used for publishing as a claude.ai artifact)
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent


def between(text, start, end):
    return text.split(f"<!-- {start} -->", 1)[1].split(f"<!-- {end} -->", 1)[0].strip()


def inline(fragment):
    def css(m):
        return "<style>\n" + (ROOT / m.group(1)).read_text() + "</style>"

    def js(m):
        return "<script>\n" + (ROOT / m.group(1)).read_text() + "</script>"

    fragment = re.sub(r'<link rel="stylesheet" href="(?!https?:)([^"]+)">', css, fragment)
    fragment = re.sub(r'<script src="(?!https?:)([^"]+)"></script>', js, fragment)
    return fragment


def main():
    src = (ROOT / "index.html").read_text()
    head = inline(between(src, "ARTIFACT-HEAD-START", "ARTIFACT-HEAD-END"))
    body = inline(between(src, "ARTIFACT-BODY-START", "ARTIFACT-BODY-END"))
    out_dir = ROOT / "dist"
    out_dir.mkdir(exist_ok=True)
    if "--fragment" in sys.argv:
        out = out_dir / "quiz-fragment.html"
        out.write_text(head + "\n" + body + "\n")
    else:
        out = out_dir / "quiz.html"
        out.write_text(
            '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            + head + "\n</head>\n<body>\n" + body + "\n</body>\n</html>\n"
        )
    print(f"wrote {out.relative_to(ROOT)} ({out.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
