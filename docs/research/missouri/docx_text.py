"""Prints the text of a .docx file, one paragraph per line (table cells are paragraphs too). Used by fetch.sh."""
import re
import sys
import zipfile
from xml.etree import ElementTree as ET

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def paragraphs(path):
    with zipfile.ZipFile(path) as z:
        root = ET.fromstring(z.read("word/document.xml"))
    for p in root.iter(W + "p"):
        text = "".join(t.text or "" for t in p.iter() if t.tag in (W + "t",)) 
        tabbed = text
        yield re.sub(r"\s+", " ", tabbed).strip()


if __name__ == "__main__":
    for line in paragraphs(sys.argv[1]):
        if line:
            print(line)
