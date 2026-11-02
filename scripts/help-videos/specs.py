"""The help videos: one idea each. `unit` is the unit key the app looks the video up by (src/lib/videoHelp.ts).
Narration names no region, money or brand. Captions are the narration word for word."""
from engine import BLUE, PINK, GREEN, ORANGE, INK, GRID


def T(x, y, s, size=40, color=INK, at=0, **k): return {"t": "text", "x": x, "y": y, "s": s, "size": size, "color": color, "at": at, **k}
def F(x, y, top, bottom, size=64, color=INK, at=0): return {"t": "frac", "x": x, "y": y, "top": top, "bottom": bottom, "size": size, "color": color, "at": at}
def PIE(cx, cy, r, n, shade=0, at=0, animate=False, color=BLUE, frm=0): return {"frm": frm, "t": "pie", "cx": cx, "cy": cy, "r": r, "n": n, "shade": shade, "at": at, "animate": animate, "color": color}
def BAR(x, y, w, h, n, shade=0, at=0, animate=False, frm=0): return {"frm": frm, "t": "bar", "x": x, "y": y, "w": w, "h": h, "n": n, "shade": shade, "at": at, "animate": animate}
def GRIDEL(x, y, rows, cols, cell, filled=0, at=0, animate=False, gap=4, color=BLUE): return {"t": "grid", "x": x, "y": y, "rows": rows, "cols": cols, "cell": cell, "filled": filled, "at": at, "animate": animate, "gap": gap, "color": color}
def GROUPS(x, y, n, per, cols=2, at=0, animate=False, deal=False, r=14): return {"t": "groups", "x": x, "y": y, "n": n, "per": per, "cols": cols, "at": at, "animate": animate, "deal": deal, "r": r}
def BLOCKS(x, y, tens, ones, at=0): return {"t": "blocks", "x": x, "y": y, "tens": tens, "ones": ones, "at": at}
def LINE(pts, color=INK, width=5, arrow=False, at=0): return {"t": "line", "pts": pts, "color": color, "width": width, "arrow": arrow, "at": at}
def NL(x, y, w, lo, hi, step, marks=(), at=0, fmt="{:g}"): return {"t": "numberline", "x": x, "y": y, "w": w, "lo": lo, "hi": hi, "step": step, "marks": list(marks), "at": at, "fmt": fmt}
def step(say, *els): return {"say": say, "els": list(els)}


VIDEOS = [
    {"id": "fractions-equal-parts", "unit": "3/math/fractions", "title": "What a fraction is", "steps": [
        step("A fraction tells us about equal parts of a whole.", PIE(480, 290, 150, 1), T(480, 480, "one whole", 34)),
        step("Here is a pizza cut into four equal parts. Equal means every part is the same size.", PIE(480, 290, 150, 4)),
        step("Let's shade one part. One out of the four parts is shaded.", PIE(300, 290, 140, 4, 1, animate=True, at=0.05), T(300, 470, "1 of 4 parts", 34, at=0.5)),
        step("We write that as one fourth. The bottom number says how many equal parts there are in all. The top number says how many of those parts we are talking about.",
             PIE(260, 290, 130, 4, 1), F(640, 290, 1, 4, 100), T(790, 232, "parts we shade", 30, BLUE, at=0.35, anchor="lm"), T(790, 350, "equal parts in all", 30, PINK, at=0.55, anchor="lm")),
        step("Now shade three parts. That is three fourths. The bottom number is still four, because the pizza still has four equal parts.",
             PIE(260, 290, 130, 4, 3, animate=True, at=0.05, frm=1), F(640, 290, 3, 4, 100, at=0.3)),
        step("Remember: the bottom number counts all the equal parts. The top number counts the parts we pick.", F(480, 290, "top", "bottom", 70), T(480, 440, "parts we pick, out of all the equal parts", 32, BLUE)),
    ]},
    {"id": "multiplication-equal-groups", "unit": "3/math/multiplication", "title": "Multiplying with equal groups", "steps": [
        step("Multiplication is a quick way to add equal groups.", T(480, 280, "3 groups of 4", 80, BLUE)),
        step("Here are three groups, and each group has four dots. We can add: four plus four plus four.", GROUPS(480, 150, 3, 4, animate=True, at=0.05), T(480, 440, "4 + 4 + 4", 56, at=0.55)),
        step("That makes twelve. So three groups of four is twelve.", GROUPS(480, 150, 3, 4), T(480, 440, "4 + 4 + 4 = 12", 56)),
        step("We write it like this: three times four equals twelve. The first number is how many groups. The second number is how many are in each group.",
             T(480, 200, "3 × 4 = 12", 100), T(300, 330, "how many groups", 34, BLUE, at=0.4), T(660, 330, "how many in each", 34, PINK, at=0.55),
             LINE([(300, 300), (350, 250)], BLUE, 4, True, at=0.4), LINE([(660, 300), (520, 250)], PINK, 4, True, at=0.55)),
        step("We can also see it as an array, which is rows and columns. Three rows of four make twelve.", GRIDEL(300, 140, 3, 4, 70, 12, animate=True, at=0.1, gap=6), T(480, 470, "3 rows of 4 = 12", 40, at=0.6)),
        step("To multiply, count the groups, count how many are in each group, and then multiply.", T(480, 270, "groups × in each group", 60, BLUE)),
    ]},
    {"id": "division-sharing-equally", "unit": "3/math/division", "title": "Dividing means sharing equally", "steps": [
        step("Division means sharing equally.", T(480, 280, "12 ÷ 3", 110, BLUE)),
        step("We have twelve counters and three friends. We want everyone to get the same amount.", GRIDEL(300, 160, 2, 6, 52, 12, gap=8, color=ORANGE), T(480, 440, "12 counters, 3 friends", 40, at=0.4)),
        step("Hand them out one at a time, round and round, until none are left.", GROUPS(480, 150, 3, 4, animate=True, deal=True, at=0.05)),
        step("Each friend gets four. So twelve divided by three is four.", GROUPS(480, 150, 3, 4), T(480, 440, "12 ÷ 3 = 4", 60)),
        step("We can check with multiplication. Three groups of four make twelve. Division and multiplication are partners.", T(480, 230, "12 ÷ 3 = 4", 70), T(480, 350, "3 × 4 = 12", 70, BLUE, at=0.4)),
    ]},
    {"id": "tens-and-ones", "unit": "2/math/tens-and-ones", "title": "Tens and ones", "steps": [
        step("Every two digit number is made of tens and ones.", T(480, 280, "34", 160, BLUE)),
        step("Look at the three. It is in the tens place, so it means three tens. Each stick holds ten.", BLOCKS(330, 150, 3, 0), T(700, 250, "3 tens", 60, BLUE, at=0.3)),
        step("Now look at the four. It is in the ones place, so it means four ones.", BLOCKS(330, 150, 3, 4), T(700, 250, "3 tens", 50, BLUE), T(700, 330, "4 ones", 50, ORANGE, at=0.3)),
        step("Three tens is thirty. Four ones is four. Thirty plus four makes thirty-four.", T(480, 230, "30 + 4 = 34", 90), T(480, 350, "3 tens + 4 ones", 50, BLUE)),
        step("So the place of a digit tells you its value. Look at the tens first, and then the ones.", T(480, 280, "tens first, then ones", 62, BLUE)),
    ]},
    {"id": "equivalent-fractions", "unit": "5/math/equivalent-fractions", "title": "Equivalent fractions", "steps": [
        step("Equivalent fractions look different, but they show the same amount.", BAR(180, 190, 600, 70, 2, 1), BAR(180, 300, 600, 70, 4, 2, at=0.3), T(480, 440, "same amount", 44, GREEN, at=0.6)),
        step("Here is one half. The bar has two equal parts, and one part is shaded.", BAR(180, 200, 600, 90, 2, 1, animate=True, at=0.1), F(480, 400, 1, 2, 70, at=0.5)),
        step("Now cut every part in half. The bar has four parts, and two are shaded. The shaded amount did not change.", BAR(180, 150, 600, 70, 2, 1), BAR(180, 260, 600, 70, 4, 2, animate=True, at=0.1), F(300, 420, 1, 2, 56), T(480, 420, "=", 56), F(660, 420, 2, 4, 56, at=0.5)),
        step("To get from one half to two fourths, multiply the top and the bottom by two.", F(250, 270, 1, 2, 90), T(480, 270, "=", 80), F(710, 270, 2, 4, 90, at=0.5), T(480, 150, "× 2 on top and bottom", 40, BLUE, at=0.3)),
        step("Always multiply the top and the bottom by the same number. Then the fraction keeps its size.", T(480, 270, "same number on top and bottom", 56, BLUE)),
    ]},
    {"id": "decimals-tenths", "unit": "4/math/decimals", "title": "Tenths as decimals", "steps": [
        step("A decimal shows parts of a whole, just like a fraction.", T(480, 270, "0.3 and 3/10", 100, BLUE)),
        step("Cut a whole into ten equal parts. Each part is one tenth, or zero point one.", BAR(110, 200, 740, 90, 10, 1, animate=True, at=0.2), T(480, 400, "1/10 = 0.1", 60, at=0.5)),
        step("Shade three parts. That is three tenths, or zero point three.", BAR(110, 200, 740, 90, 10, 3, animate=True, at=0.1, frm=1), T(480, 400, "3/10 = 0.3", 60, at=0.4)),
        step("The digit after the decimal point is in the tenths place. So zero point three means three tenths.", T(480, 200, "0 . 3", 140), T(480, 340, "tenths place", 50, BLUE, at=0.4), LINE([(560, 320), (545, 270)], BLUE, 5, True, at=0.4)),
        step("On a number line, zero point three sits three tenths of the way from zero to one.", NL(100, 270, 760, 0, 1, 0.1, [(0.3, PINK, "0.3")], at=0.0, fmt="{:.1f}")),
    ]},
    {"id": "area-square-units", "unit": "5/math/area-and-perimeter", "title": "Finding area", "steps": [
        step("Area tells us how much flat space a shape covers.", GRIDEL(300, 160, 3, 4, 90, 12, gap=0, color=GREEN)),
        step("We measure area in square units. This rectangle is four squares long and three squares tall.", GRIDEL(300, 160, 3, 4, 90, 0, gap=0), T(480, 125, "4 squares long", 34, BLUE), T(190, 295, "3 tall", 34, PINK, anchor="mm")),
        step("Count the squares inside. There are three rows of four.", GRIDEL(300, 160, 3, 4, 90, 12, animate=True, at=0.1, gap=0, color=GREEN), T(480, 470, "3 rows of 4 squares", 40, at=0.6)),
        step("That is twelve square units. Instead of counting every square, multiply the length by the width. Four times three is twelve.", GRIDEL(120, 160, 3, 4, 90, 12, gap=0, color=GREEN), T(740, 250, "4 × 3 = 12", 64), T(740, 340, "12 square units", 38, GREEN, at=0.5)),
        step("Area is the space inside a shape. It is not the distance around the edge.", T(480, 270, "area = length × width", 64, GREEN)),
    ]},
    {"id": "percent-out-of-100", "unit": "6/math/percents-and-budgets", "title": "What percent means", "steps": [
        step("Percent means out of one hundred.", T(480, 270, "25% = 25 out of 100", 70, BLUE)),
        step("Here is a grid of one hundred squares. If twenty-five squares are shaded, that is twenty-five percent.", GRIDEL(330, 120, 10, 10, 34, 25, animate=True, at=0.1, gap=2), T(160, 300, "25%", 70, BLUE, at=0.5)),
        step("Twenty-five out of one hundred is the same as one fourth. So twenty-five percent equals one fourth.", F(260, 270, 25, 100, 80), T(450, 270, "=", 70), F(640, 270, 1, 4, 80, at=0.5)),
        step("Fifty percent is fifty out of one hundred. That is the same as one half.", F(260, 270, 50, 100, 80), T(450, 270, "=", 70), F(640, 270, 1, 2, 80, at=0.5)),
        step("To find twenty-five percent of a number, find one fourth of it. Twenty-five percent of eighty is twenty.", T(480, 190, "25% of 80", 64), T(480, 300, "80 ÷ 4 = 20", 80, BLUE, at=0.4)),
    ]},
    {"id": "make-ten", "unit": "1/math/make-ten", "title": "Making ten", "steps": [
        step("Ten is a friendly number. A ten frame has ten boxes.", GRIDEL(240, 190, 2, 5, 90, 0, gap=6)),
        step("Put seven counters in the frame. How many empty boxes are left?", GRIDEL(240, 190, 2, 5, 90, 7, animate=True, at=0.05, gap=6, color=ORANGE)),
        step("Three boxes are empty. So seven and three make ten.", GRIDEL(240, 150, 2, 5, 90, 7, gap=6, color=ORANGE), T(480, 420, "7 + 3 = 10", 70, at=0.3)),
        step("Look for the partner that makes ten. Six needs four. Eight needs two. Nine needs only one.", T(480, 190, "6 + 4 = 10", 80), T(480, 330, "8 + 2 = 10", 80, BLUE, at=0.5)),
        step("Knowing your partners to ten makes adding quicker. Seven and three. Six and four. Nine and one.", T(480, 190, "7 + 3", 70), T(480, 290, "6 + 4", 70, BLUE), T(480, 390, "9 + 1", 70, PINK), T(700, 290, "= 10", 90, GREEN)),
    ]},
]
