"""Writes the text of Conn. Gen. Stat. sections 10-234aa to 10-234dd (student data privacy) from chapter 170.

Usage: python3 -I extract_law.py [source-dir]     (default: ./source)
"""

import html
import re
import sys
from pathlib import Path

src = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "source"
text = (src / "chap170.htm").read_text(encoding="latin-1")
text = re.sub(r"<(p|br|div|h\d)[^>]*>", "\n", text, flags=re.I)
text = html.unescape(re.sub(r"<[^>]+>", "", text))
text = "\n".join(re.sub(r"[ \t\xa0]+", " ", line).strip() for line in text.split("\n"))
text = re.sub(r"\n{3,}", "\n\n", text)
# The chapter lists its sections first; the law itself is the last copy of each heading.
start = text.rfind("Sec. 10-234aa.")
end = text.rfind("Sec. 10-234ee.")
if start < 0 or end <= start:
    sys.exit("error: sections 10-234aa to 10-234dd not found")
(src / "chap170-10-234aa-dd.txt").write_text(text[start:end].strip() + "\n")
print(f"Wrote {end - start} characters")
