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


def CLK(cx, cy, r, h, m, at=0): return {"t": "clock", "cx": cx, "cy": cy, "r": r, "h": h, "m": m, "at": at}
def R(x0, y0, x1, y1, fill=None, color=INK, at=0): return {"t": "rect", "box": [x0, y0, x1, y1], "fill": fill, "color": color, "width": 4, "at": at}
def ROW(x, y, n, color=BLUE, cell=70, at=0, animate=False): return GRIDEL(x, y, 1, n, cell, n, at=at, animate=animate, gap=8, color=color)


VIDEOS += [
    {"id": "adding-put-together", "unit": "1/math/adding", "title": "Adding means putting together", "steps": [
        step("Adding means putting groups together.", T(480, 270, "3 + 2", 130, BLUE)),
        step("Here are three blue squares and two orange squares.", ROW(160, 220, 3, BLUE), ROW(520, 220, 2, ORANGE, at=0.2)),
        step("Put them together and count them all. One, two, three, four, five.", ROW(250, 220, 3, BLUE), ROW(250 + 3 * 78, 220, 2, ORANGE, animate=True, at=0.05), T(480, 400, "5 altogether", 56, at=0.6)),
        step("Three plus two equals five. The plus sign means put together. The equals sign means is the same as.", T(480, 270, "3 + 2 = 5", 140, GREEN)),
        step("Here is a quick trick. Start at the bigger number, three, and count on two more. Four, five.", NL(100, 290, 760, 0, 6, 1, [(3, BLUE, "3"), (5, GREEN, "5")]), T(480, 150, "count on 2 more", 46, at=0.3)),
        step("Try one yourself. What is two plus four? Start at the bigger number, four, and count on two. Five, six. The answer is six.", T(480, 190, "2 + 4", 90), T(480, 330, "4 ... 5, 6", 80, GREEN, at=0.5)),
    ]},
    {"id": "take-away-how-many-left", "unit": "1/math/take-away", "title": "Taking away", "steps": [
        step("Taking away means some go away, and we find out how many are left.", T(480, 270, "5 − 2", 130, BLUE)),
        step("We start with five squares.", ROW(250, 230, 5, BLUE), T(480, 400, "start with 5", 50, at=0.3)),
        step("Now take away two. Cross them out.", ROW(250, 230, 3, BLUE), R(250 + 3 * 78, 230, 250 + 3 * 78 + 70, 300, color=GRID), R(250 + 4 * 78, 230, 250 + 4 * 78 + 70, 300, color=GRID), T(480, 400, "take away 2", 50, PINK, at=0.3)),
        step("Count how many are left. There are three. Five take away two is three.", ROW(250, 230, 3, BLUE), T(480, 400, "5 − 2 = 3", 90, GREEN, at=0.2)),
        step("We can count back on a number line. Start at five and hop back two. Four, three. We land on three.", NL(100, 290, 760, 0, 6, 1, [(5, ORANGE, "5"), (3, GREEN, "3")]), T(480, 150, "hop back 2", 46, at=0.3)),
        step("Check with adding. Three plus two makes five. Adding and taking away are partners.", T(480, 190, "5 − 2 = 3", 80), T(480, 330, "3 + 2 = 5", 80, BLUE, at=0.4)),
    ]},
    {"id": "skip-counting", "unit": "2/math/patterns", "title": "Skip counting", "steps": [
        step("Skip counting means counting by the same jump each time.", T(480, 270, "2, 4, 6, 8", 110, BLUE)),
        step("Let's count by twos. Two, four, six, eight, ten. Each hop is two.", NL(60, 290, 840, 0, 20, 2, [(2, BLUE, ""), (4, BLUE, ""), (6, BLUE, ""), (8, BLUE, ""), (10, BLUE, "")]), T(480, 150, "jump of 2", 46)),
        step("Now count by fives. Five, ten, fifteen, twenty. Each hop is five.", NL(100, 290, 760, 0, 20, 5, [(5, PINK, ""), (10, PINK, ""), (15, PINK, ""), (20, PINK, "")]), T(480, 150, "jump of 5", 46)),
        step("And count by tens. Ten, twenty, thirty, forty. Each hop is ten.", NL(100, 290, 760, 0, 40, 10, [(10, GREEN, ""), (20, GREEN, ""), (30, GREEN, ""), (40, GREEN, "")]), T(480, 150, "jump of 10", 46)),
        step("To find what comes next in a pattern, look at two neighbours and see how much the number grows. Ten to twenty is a jump of ten, so the next number is forty.", T(480, 200, "10, 20, 30, __", 90), T(480, 340, "jump of 10, so 40", 56, BLUE, at=0.5)),
    ]},
    {"id": "telling-time", "unit": "3/math/time", "title": "Telling time", "steps": [
        step("A clock has two hands. The short hand shows the hour.", CLK(480, 290, 170, 3, 0), T(790, 200, "short hand: hour", 30, BLUE, anchor="mm")),
        step("The long hand shows the minutes. When it points straight up at the twelve, it is o'clock. This clock says three o'clock.", CLK(300, 290, 170, 3, 0), T(700, 250, "3:00", 100, GREEN), T(700, 350, "three o'clock", 40, at=0.4)),
        step("When the long hand points straight down at the six, it is half past. That is thirty minutes. This clock says half past three.", CLK(300, 290, 170, 3, 30), T(700, 250, "3:30", 100, GREEN), T(700, 350, "half past three", 40, at=0.4)),
        step("Each number stands for five minutes. Count by fives to the three. Five, ten, fifteen. This clock says quarter past three.", CLK(300, 290, 170, 3, 15), T(700, 250, "3:15", 100, GREEN), T(700, 350, "15 minutes past 3", 40, at=0.4)),
        step("To tell time, look at the short hand for the hour first. Then look at the long hand for the minutes.", T(480, 200, "1. short hand: hour", 60, BLUE), T(480, 320, "2. long hand: minutes", 60, PINK, at=0.4)),
    ]},
    {"id": "times-tables-tricks", "unit": "4/math/times-tables", "title": "Tricks for fives and nines", "steps": [
        step("Times tables get easier with tricks. Let's learn one for fives and one for nines.", T(480, 270, "5s and 9s", 120, BLUE)),
        step("Multiples of five always end in zero or five. Five, ten, fifteen, twenty, twenty-five, thirty.", T(480, 230, "5  10  15  20  25  30", 70), T(480, 360, "ends in 0 or 5", 52, BLUE, at=0.5)),
        step("For five times six, think of half of ten times six. Ten times six is sixty. Half of sixty is thirty.", T(480, 160, "5 × 6", 70), T(480, 280, "10 × 6 = 60", 64, at=0.2), T(480, 390, "half of 60 = 30", 64, GREEN, at=0.55)),
        step("For nines, multiply by ten and then take away the number. Nine times six is ten times six, which is sixty, take away six. That is fifty-four.", T(480, 160, "9 × 6", 70), T(480, 280, "10 × 6 = 60", 60, at=0.2), T(480, 390, "60 − 6 = 54", 64, GREEN, at=0.55)),
        step("Here is a check. The digits of every nine fact add up to nine. Fifty-four has a five and a four, and five plus four is nine.", T(480, 200, "54", 120), T(480, 350, "5 + 4 = 9", 70, BLUE, at=0.4)),
    ]},
    {"id": "hundreds-tens-ones", "unit": "3/math/numbers-to-1000", "title": "Hundreds, tens and ones", "steps": [
        step("A three digit number is made of hundreds, tens and ones.", T(480, 270, "347", 170, BLUE)),
        step("The three is in the hundreds place. It means three hundreds. That is three hundred.", T(480, 150, "3 hundreds = 300", 56, BLUE), R(200, 230, 330, 360, BLUE, at=0), R(360, 230, 490, 360, BLUE, at=0.2), R(520, 230, 650, 360, BLUE, at=0.4), T(425, 410, "100  +  100  +  100", 36, at=0.4)),
        step("The four is in the tens place. It means four tens, which is forty.", T(480, 150, "4 tens = 40", 56, ORANGE), BLOCKS(330, 220, 4, 0)),
        step("The seven is in the ones place. It means seven ones.", T(480, 150, "7 ones = 7", 56, GREEN), BLOCKS(300, 220, 0, 7)),
        step("Put them together. Three hundred plus forty plus seven makes three hundred forty-seven.", T(480, 190, "300 + 40 + 7", 90), T(480, 330, "= 347", 100, BLUE, at=0.4)),
        step("Try another. Two hundreds, five tens and nine ones. That is two hundred, plus fifty, plus nine, which makes two hundred fifty-nine.", T(480, 190, "200 + 50 + 9", 90), T(480, 330, "= 259", 100, GREEN, at=0.4)),
    ]},
    {"id": "rounding", "unit": "4/math/numbers-to-10000", "title": "Rounding numbers", "steps": [
        step("Rounding means finding the nearest friendly number.", T(480, 270, "4628 to 4600", 100, BLUE)),
        step("Let's round four thousand six hundred twenty-eight to the nearest hundred. First find the hundreds on each side. They are four thousand six hundred and four thousand seven hundred.", NL(100, 290, 760, 4600, 4700, 20, [(4628, PINK, "4628")]), T(160, 180, "4600", 40, BLUE), T(800, 180, "4700", 40, BLUE)),
        step("Now look at the digit one place to the right of the hundreds. That is the tens digit. It is a two.", T(480, 200, "4 6 2 8", 130), T(480, 360, "look at the tens digit: 2", 50, PINK, at=0.4)),
        step("If that digit is zero to four, round down. If it is five to nine, round up.", T(480, 190, "0 to 4: round down", 64, BLUE), T(480, 320, "5 to 9: round up", 64, GREEN, at=0.4)),
        step("Two is less than five, so we round down. Four thousand six hundred twenty-eight rounds to four thousand six hundred.", NL(100, 290, 760, 4600, 4700, 20, [(4628, PINK, "4628")]), T(480, 440, "rounds down to 4600", 50, GREEN, at=0.3)),
    ]},
    {"id": "comparing-fractions", "unit": "4/math/fractions", "title": "Comparing fractions", "steps": [
        step("To compare fractions, think about how big the pieces are and how many we have.", T(480, 270, "which is bigger?", 90, BLUE)),
        step("When the bottom numbers match, the pieces are the same size. So more pieces is more. Three eighths is bigger than two eighths.", BAR(180, 140, 600, 70, 8, 3), BAR(180, 260, 600, 70, 8, 2, at=0.2), F(300, 400, 3, 8, 56), T(480, 400, ">", 60), F(660, 400, 2, 8, 56, at=0.4)),
        step("When the top numbers match, look at the bottom numbers. More parts in the whole means smaller pieces.", T(480, 270, "more parts = smaller pieces", 60, PINK)),
        step("One half is bigger than one fourth, because a half piece is bigger than a fourth piece.", BAR(180, 140, 600, 70, 2, 1), BAR(180, 260, 600, 70, 4, 1, at=0.2), F(300, 400, 1, 2, 56), T(480, 400, ">", 60), F(660, 400, 1, 4, 56, at=0.4)),
        step("Same bottom number, compare the tops. Same top number, compare the bottoms, and the smaller bottom number is the bigger fraction.", T(480, 190, "same bottom: bigger top wins", 50, BLUE), T(480, 320, "same top: smaller bottom wins", 50, PINK, at=0.4)),
    ]},
    {"id": "division-remainders", "unit": "5/math/divide", "title": "Division with a remainder", "steps": [
        step("Sometimes things do not share out evenly. What is left over is called the remainder.", T(480, 270, "13 ÷ 4", 130, BLUE)),
        step("We have thirteen counters to share between four friends.", GRIDEL(300, 160, 2, 7, 52, 13, gap=8, color=ORANGE), T(480, 440, "13 counters, 4 friends", 40, at=0.4)),
        step("Hand them out one at a time. Each friend gets three counters. That uses twelve.", GROUPS(480, 140, 4, 3, animate=True, deal=True, at=0.05), T(480, 440, "4 × 3 = 12 used", 44, at=0.6)),
        step("One counter is left over. We write that as three remainder one.", T(480, 230, "13 ÷ 4 = 3 R 1", 90), T(480, 360, "R means remainder", 44, BLUE, at=0.4)),
        step("We can check. Four times three is twelve, and twelve plus the remainder one makes thirteen.", T(480, 200, "4 × 3 = 12", 70), T(480, 320, "12 + 1 = 13", 70, GREEN, at=0.4)),
    ]},
    {"id": "ratios", "unit": "6/math/mixed-numbers-and-ratios", "title": "What a ratio is", "steps": [
        step("A ratio compares two amounts.", T(480, 270, "3 : 2", 150, BLUE)),
        step("Here are three blue squares and two orange squares. The ratio of blue to orange is three to two.", ROW(160, 220, 3, BLUE), ROW(520, 220, 2, ORANGE), T(480, 400, "blue : orange = 3 : 2", 52, at=0.4)),
        step("The order matters. The ratio of orange to blue is two to three.", T(480, 190, "blue : orange = 3 : 2", 60, BLUE), T(480, 320, "orange : blue = 2 : 3", 60, ORANGE, at=0.4)),
        step("We can make an equal ratio by multiplying both numbers by the same amount. Double three and two to get six and four.", T(480, 150, "3 : 2", 80), T(480, 260, "× 2   × 2", 50, PINK, at=0.3), T(480, 370, "6 : 4", 100, GREEN, at=0.5)),
        step("Six to four is the same ratio as three to two. We multiply or divide both parts by the same number.", T(480, 270, "same number on both parts", 60, BLUE)),
    ]},
    {"id": "order-of-operations", "unit": "6/math/equations", "title": "Order of operations", "steps": [
        step("When a problem has more than one operation, we follow a set order so everyone gets the same answer.", T(480, 270, "3 + 4 × 2", 120, BLUE)),
        step("The order is: brackets first. Then multiply and divide, from left to right. Then add and subtract, from left to right.", T(480, 150, "1. brackets", 54, GREEN), T(480, 250, "2. × and ÷", 54, BLUE, at=0.3), T(480, 350, "3. + and −", 54, PINK, at=0.6)),
        step("In three plus four times two, multiply first. Four times two is eight. Then add: three plus eight is eleven.", T(480, 160, "3 + 4 × 2", 70), T(480, 280, "3 + 8", 70, at=0.3), T(480, 400, "= 11", 80, GREEN, at=0.55)),
        step("Brackets change the order. In bracket three plus four bracket, times two, do the brackets first. Seven times two is fourteen.", T(480, 160, "(3 + 4) × 2", 70), T(480, 280, "7 × 2", 70, at=0.3), T(480, 400, "= 14", 80, GREEN, at=0.55)),
        step("Same numbers, different order, different answer. That is why the order matters.", T(300, 270, "= 11", 90, BLUE), T(660, 270, "= 14", 90, PINK)),
    ]},
    {"id": "negative-numbers", "unit": "7/math/integer-add-subtract", "title": "Adding with negative numbers", "steps": [
        step("Integers are whole numbers that can be positive or negative. Zero is in the middle.", NL(80, 270, 800, -5, 5, 1, [(0, GREEN, "0")])),
        step("Positive numbers are to the right of zero. Negative numbers are to the left.", NL(80, 270, 800, -5, 5, 1, [(3, BLUE, "+3"), (-3, PINK, "−3")])),
        step("Adding a positive number moves right. Start at negative two, add three, and hop right three times. You land on positive one.", NL(80, 290, 800, -5, 5, 1, [(-2, ORANGE, "−2"), (1, GREEN, "1")]), T(480, 150, "−2 + 3 = 1", 70, at=0.3)),
        step("Adding a negative number moves left. Start at one, add negative four, and hop left four times. You land on negative three.", NL(80, 290, 800, -5, 5, 1, [(1, ORANGE, "1"), (-3, GREEN, "−3")]), T(480, 150, "1 + (−4) = −3", 70, at=0.3)),
        step("A positive one and a negative one cancel each other out, and make zero. We call them a zero pair.", T(480, 200, "+1 and −1", 90), T(480, 340, "(+1) + (−1) = 0", 70, GREEN, at=0.4)),
    ]},
    {"id": "two-step-equations", "unit": "7/math/two-step-equations", "title": "Solving two-step equations", "steps": [
        step("An equation says two things are equal. We want to find the unknown number, x.", T(480, 270, "2x + 3 = 11", 120, BLUE)),
        step("To solve it, undo the steps in reverse order. First, undo the plus three by subtracting three from both sides.", T(480, 160, "2x + 3 = 11", 70), T(480, 270, "− 3        − 3", 52, PINK, at=0.3), T(480, 380, "2x = 8", 80, GREEN, at=0.55)),
        step("Next, undo the times two by dividing both sides by two.", T(480, 160, "2x = 8", 70), T(480, 270, "÷ 2        ÷ 2", 52, PINK, at=0.3), T(480, 380, "x = 4", 80, GREEN, at=0.55)),
        step("Now check. Put four in place of x. Two times four is eight, and eight plus three is eleven. It works.", T(480, 190, "2 × 4 + 3", 80), T(480, 320, "= 11", 80, GREEN, at=0.4)),
        step("Whatever we do to one side, we do to the other side. That keeps the equation balanced.", T(480, 270, "do the same to both sides", 62, BLUE)),
    ]},
]
