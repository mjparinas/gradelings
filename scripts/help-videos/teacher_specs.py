"""The teacher training videos: short how-tos made from screenshots of the real teacher area (demo data only,
taken by capture-teacher.mjs). Same engine, voice, captions and logo as the help videos. Build with
`python build.py --set teachers`. Narration names no real person or school. Captions are the narration word for word.

A step is `step(say, shot, highlights...)`. Crops and boxes are in the screenshot's own pixels (1280 wide); `HL` maps
a box on the screenshot onto the video frame."""
import json
from pathlib import Path
from engine import BLUE, PINK, GREEN, ORANGE, INK

SHOTS = Path(__file__).parent / "shots"
try:
    LIVE = json.loads((SHOTS / "boxes.json").read_text())
except FileNotFoundError:
    LIVE = {}
AREA_TOP, AREA_H, AREA_W, AREA_X = 96, 374, 880, 40


def SHOT(name, crop):
    """A crop of one screenshot, scaled to the video's picture area and centred in it."""
    x0, y0, x1, y1 = crop
    w = min(AREA_W, int(AREA_W * AREA_H / (y1 - y0) * (x1 - x0) / AREA_W))  # a tall crop is scaled down to fit the height
    scale = w / (x1 - x0)
    h = int((y1 - y0) * scale)
    return {"t": "shot", "file": str(SHOTS / f"{name}.png"), "crop": list(crop), "w": w, "dx": AREA_X + (AREA_W - w) // 2, "dy": AREA_TOP + max(0, (AREA_H - h) // 2), "scale": scale, "at": 0}


def HL(shot, box, label=None, color=ORANGE, at=0.0, side="below"):
    """An outline around `box` (x0, y0, x1, y1 on the screenshot), mapped onto the frame."""
    x0, y0, x1, y1 = box
    cx0, cy0 = shot["crop"][0], shot["crop"][1]
    s = shot["scale"]
    mapped = [shot["dx"] + (x0 - cx0) * s, shot["dy"] + (y0 - cy0) * s, shot["dx"] + (x1 - cx0) * s, shot["dy"] + (y1 - cy0) * s]
    return {"t": "hl", "box": mapped, "color": color, "label": label, "at": at, "side": side}


def step(say, *els):
    flat = []
    for e in els:
        flat += e if isinstance(e, list) else [e]
    return {"say": say, "els": flat}


def around(b, pad_x=0, pad_y=0):
    return (b["x"] - pad_x, b["y"] - pad_y, b["x"] + b["w"] + pad_x, b["y"] + b["h"] + pad_y)


def live_crop(top_y, height=370):
    return (200, max(0, int(top_y)), 1080, int(top_y) + height)


def _setup():
    s1 = SHOT("classes", (200, 70, 1080, 440))
    s2 = SHOT("classes", (200, 364, 1080, 734))
    s3 = SHOT("students", (200, 200, 1080, 570))
    s4 = SHOT("progress", (200, 60, 1080, 430))
    s5 = SHOT("classes", (200, 300, 1080, 670))
    return [
        {"id": "teacher-class-setup", "title": "Set up your class", "steps": [
            step("Welcome to Gradelings for teachers. Let's set up your first class. It takes about a minute.", s1),
            step("On the Your classes page, type a class name, pick the grade, and choose your province or state. Then tap Create class.",
                 s2, HL(s2, (225, 517, 411, 561), "Name", at=0.1, side="above"), HL(s2, (423, 517, 567, 561), "Grade", at=0.3, side="above"), HL(s2, (776, 517, 948, 561), "Province or state", at=0.5, side="above"), HL(s2, (225, 573, 347, 617), "Create class", GREEN, at=0.7)),
            step("If you teach two neighbouring grades, choose a second grade, and your class can use units from both.",
                 s2, HL(s2, (579, 517, 723, 561), "Second grade, if split", side="above")),
            step("Every class has a class code. Families can use it to link their own child, and you only ever see first names, grade and practice results for the units you assign.",
                 s3, HL(s3, (229, 265, 380, 305), "Class code")),
            step("Along the top are five tabs: Progress, Homework, Live, Students and Settings. Progress is where you'll look every day.",
                 s4, HL(s4, (210, 58, 820, 106), "Five tabs", at=0.1)),
            step("If you'd like a weekly summary, tick Email me every Monday. It lists who practised, how homework is going, and who to check in with.",
                 s5, HL(s5, (208, 350, 1072, 448), "Monday email")),
            step("Next, add your students. That's the next video.", s1),
        ]},
        {"id": "teacher-add-students", "title": "Add students and print login cards", "steps": _students()},
        {"id": "teacher-homework", "title": "Assign homework", "steps": _homework()},
        {"id": "teacher-progress", "title": "Read your class progress", "steps": _progress()},
        {"id": "teacher-live", "title": "Ask live questions", "steps": _live()},
    ]


def _students():
    a = SHOT("students", (200, 40, 1080, 410))
    names = SHOT("students", (200, 1130, 1080, 1500))
    codes = SHOT("students", (200, 640, 1080, 1010))
    kid = SHOT("student-code", (200, 60, 1080, 430))
    return [
        step("Open the Students tab to add your class. You don't need any email addresses or passwords.", a, HL(a, (614, 60, 718, 104), "Students")),
        step("Type each student's first name or a nickname, one per line, then tap Add students.",
             names, HL(names, (229, 1191, 1051, 1287), "First names, one per line"), HL(names, (229, 1295, 357, 1339), "Add students", GREEN, at=0.6)),
        step("Each student gets their own code. If a code is lost, tap New code to make a fresh one.",
             codes, HL(codes, (640, 680, 805, 960), "Their own code", at=0.05), HL(codes, (813, 677, 900, 719), "New code", at=0.5, side="above")),
        step("Students open Gradelings, tap My teacher gave me a code, and type it in. That's all they need.",
             kid, HL(kid, (448, 335, 832, 405), "Type the code"), ),
        step("Tap Print login cards to give every student a card with their code and a scan code. Larger print puts fewer cards on a page.",
             names, HL(names, (370, 1295, 522, 1339), "Print login cards", at=0.1), HL(names, (534, 1306, 786, 1330), "Larger print", GREEN, at=0.5)),
        step("To change a name, tap Edit. To take a student out, tap Remove, and everything about them is deleted.",
             codes, HL(codes, (912, 677, 1051, 719), "Edit or remove")),
    ]


def _homework():
    top = SHOT("homework", (200, 100, 1080, 470))
    rows = SHOT("homework", (200, 360, 1080, 730))
    add = SHOT("homework", (200, 620, 1080, 990))
    who = SHOT("homework", (200, 830, 1080, 1200))
    return [
        step("Homework is how you choose what your class practises. Students see it on their home screen, and they can do it offline.", top),
        step("Each assigned unit can have a start date, a due date, and a number of questions. Without a number, a unit is done when the student reaches Proficient.",
             rows, HL(rows, (467, 385, 886, 425), "Start date, due date, questions", side="below")),
        step("To add a unit, pick it from Add a unit. Or choose Pick several units at once to assign a whole set.",
             add, HL(add, (229, 697, 1051, 738), "Add a unit"), HL(add, (229, 760, 395, 786), "Several at once", GREEN, at=0.6)),
        step("Choose the whole class, or pick certain students, then tap Assign.",
             who, HL(who, (229, 1090, 470, 1122), "Who gets it", side="above"), HL(who, (229, 1140, 309, 1183), "Assign", GREEN, at=0.6)),
        step("Not sure about a unit? Tap Preview, or Try it, to play its first questions as a student would. Nothing is saved.",
             rows, HL(rows, (894, 385, 997, 425), "Preview or Try it")),
    ]


def _progress():
    head = SHOT("progress", (200, 200, 1080, 570))
    levels = SHOT("progress", (200, 420, 1080, 790))
    out = SHOT("progress", (200, 1000, 1080, 1370))
    nxt = SHOT("progress", (200, 1480, 1080, 1850))
    goal = SHOT("progress", (200, 1200, 1080, 1570))
    return [
        step("The Progress tab shows every student and every unit you've assigned, with their level.", head),
        step("Each cell shows the level, the percent right on the first try, and how many questions the student has answered.",
             levels, HL(levels, (453, 520, 1051, 740), "Level, accuracy and questions", side="above")),
        step("Use Sort by to put the students who need help, or the most active students, first.", head, HL(head, (229, 346, 417, 390), "Sort by")),
        step("Print a class summary, or download everything as a spreadsheet. It always says it reflects practice, not a report-card mark. You decide proficiency.",
             out, HL(out, (229, 1134, 685, 1178), "Print or download", GREEN), HL(out, (229, 1100, 1051, 1124), "Practice, not a mark", at=0.5, side="above")),
        step("Below the table, What to look at next names the units worth a quick reteach and the students to check in with, and why. You can assign extra practice to them in one tap.",
             nxt, HL(nxt, (648, 1546, 1051, 1700), "Check in with", at=0.1, side="above"), HL(nxt, (648, 1702, 931, 1746), "Extra practice", GREEN, at=0.6)),
        step("You can also set a weekly question goal for the whole class. Students see one shared bar with counts only: no names and no ranking.",
             goal, HL(goal, (208, 1214, 1072, 1476), "Class goal", side="above")),
    ]


def _live():
    timer = SHOT("live", (200, 100, 1080, 470))
    ask = SHOT("live", (200, 600, 1080, 970))
    summ = LIVE.get("summary", {"y": 1000})
    ans = LIVE.get("answered", {"y": 1160})
    bars_top = summ["y"] - 215
    live = SHOT("live-open", (200, bars_top - 40, 1080, ans["y"] + 50))
    controls = SHOT("live-open", live_crop(LIVE.get("upNext", {"y": 1240})["y"] - 30))
    return [
        step("Live questions let you ask the whole class one question and watch the answers arrive. First, the class timer.", timer),
        step("Pick a length from one minute to thirty, add a note like Silent reading if you like, and start the timer. Students see it at the top of their screen. It never locks anything.",
             timer, HL(timer, (229, 326, 892, 370), "Pick a length", at=0.05), HL(timer, (654, 406, 795, 450), "Start the timer", GREEN, at=0.6)),
        step("To ask a question, choose a unit under Ask from. Gradelings makes the question for you.", ask),
        step("As students answer, the bars fill, and each desk turns green for right or red for wrong. Students who haven't answered yet stay grey.",
             live, HL(live, (229, bars_top, 1051, summ["y"] - 20), "Answers come in", at=0.05, side="above"), HL(live, (229, ans["y"] - 122, 1051, ans["y"] - 2), "Desks", GREEN, at=0.5)),
        step("Only you see the next question while the class works on this one. Choose a different question if you like. Then show the answer, or tap Next question.",
             controls, HL(controls, around(LIVE.get("upNext", {"x": 242, "y": 1240, "w": 796, "h": 20}), 6, 6), "Only you see this", at=0.05, side="above"),
             HL(controls, (LIVE.get("reveal", {"x": 229})["x"], LIVE.get("reveal", {"y": 1455})["y"], LIVE.get("next", {"x": 395, "w": 133})["x"] + LIVE.get("next", {"w": 133})["w"], LIVE.get("reveal", {"y": 1455})["y"] + 44), "Show the answer, then Next", GREEN, at=0.6)),
        step("Everything from live questions is deleted after a day, and it never changes anyone's levels. Look back at today's questions to see who to check in with.",
             controls, HL(controls, (LIVE.get("lookBack", {"x": 229})["x"], LIVE.get("lookBack", {"y": 1528})["y"], LIVE.get("lookBack", {"x": 229, "w": 257})["x"] + LIVE.get("lookBack", {"w": 257})["w"], LIVE.get("lookBack", {"y": 1528})["y"] + 44), "Look back")),
    ]


VIDEOS = _setup()
