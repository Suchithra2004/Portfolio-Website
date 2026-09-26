"""Build the portfolio case-study PDF. Run: python build_case_study.py"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    BaseDocTemplate, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph,
    Spacer, Table, TableStyle,
)


ROOT = Path(__file__).resolve().parent
OUTPUT = ROOT / "output" / "pdf" / "Reducing_Repeat_Driver_Cancellations_Case_Study.pdf"
OUTPUT.parent.mkdir(parents=True, exist_ok=True)

INK = colors.HexColor("#17231e")
GREEN = colors.HexColor("#173d32")
TEAL = colors.HexColor("#317865")
MUTED = colors.HexColor("#607066")
LINE = colors.HexColor("#dde5dc")
PALE = colors.HexColor("#edf3ed")
AMBER = colors.HexColor("#a66738")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="KickerCustom", fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=TEAL, spaceAfter=9, tracking=1.2))
styles.add(ParagraphStyle(name="TitleCustom", fontName="Helvetica-Bold", fontSize=30, leading=34, textColor=GREEN, spaceAfter=12))
styles.add(ParagraphStyle(name="SubtitleCustom", fontName="Helvetica", fontSize=13, leading=19, textColor=MUTED, spaceAfter=15))
styles.add(ParagraphStyle(name="SectionCustom", fontName="Helvetica-Bold", fontSize=15, leading=20, textColor=GREEN, spaceBefore=13, spaceAfter=7, keepWithNext=True))
styles.add(ParagraphStyle(name="SubheadCustom", fontName="Helvetica-Bold", fontSize=10, leading=14, textColor=INK, spaceBefore=8, spaceAfter=4, keepWithNext=True))
styles.add(ParagraphStyle(name="BodyCustom", fontName="Helvetica", fontSize=9, leading=14.2, textColor=INK, spaceAfter=7))
styles.add(ParagraphStyle(name="SmallCustom", fontName="Helvetica", fontSize=8, leading=12, textColor=INK, spaceAfter=5))
styles.add(ParagraphStyle(name="TinyCustom", fontName="Helvetica", fontSize=7.4, leading=10.4, textColor=INK))
styles.add(ParagraphStyle(name="MutedCustom", fontName="Helvetica", fontSize=8, leading=12, textColor=MUTED, spaceAfter=7))
styles.add(ParagraphStyle(name="LabelCustom", fontName="Helvetica-Bold", fontSize=8, leading=11, textColor=TEAL, spaceAfter=5))
styles.add(ParagraphStyle(name="TableHeadCustom", fontName="Helvetica-Bold", fontSize=7.4, leading=10.5, textColor=colors.white))
styles.add(ParagraphStyle(name="TableCellCustom", fontName="Helvetica", fontSize=7.3, leading=10.6, textColor=INK))
styles.add(ParagraphStyle(name="TableBoldCustom", fontName="Helvetica-Bold", fontSize=7.3, leading=10.6, textColor=INK))


def p(text, style="BodyCustom"):
    return Paragraph(text, styles[style])


def box(label, text, bg=PALE):
    content = [p(label, "LabelCustom"), p(text, "SmallCustom")]
    table = Table([[content]], colWidths=[502])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), bg),
        ("BOX", (0, 0), (-1, -1), .5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


def table(headers, rows, widths, align_right=()):
    data = [[p(h, "TableHeadCustom") for h in headers]]
    for row in rows:
        data.append([p(str(value), "TableBoldCustom" if idx == 0 else "TableCellCustom") for idx, value in enumerate(row)])
    result = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    commands = [
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f7f9f5")]),
        ("LINEBELOW", (0, -1), (-1, -1), .5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    for col in align_right:
        commands.append(("ALIGN", (col, 1), (col, -1), "RIGHT"))
    result.setStyle(TableStyle(commands))
    return result


def draw_page(canvas, doc):
    canvas.saveState()
    w, h = letter
    canvas.setStrokeColor(LINE)
    canvas.setLineWidth(.6)
    canvas.line(55, h - 45, w - 55, h - 45)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(GREEN)
    canvas.drawString(55, h - 36, "SUCHITHRA R  /  PRODUCT CASE STUDY")
    canvas.setStrokeColor(LINE)
    canvas.line(55, 43, w - 55, 43)
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(55, 30, "Reducing Repeat Driver Cancellations")
    canvas.drawRightString(w - 55, 30, f"{doc.page}")
    canvas.restoreState()


doc = BaseDocTemplate(str(OUTPUT), pagesize=letter, leftMargin=55, rightMargin=55, topMargin=62, bottomMargin=59,
                      title="Reducing Repeat Driver Cancellations", author="Suchithra R",
                      subject="APM portfolio product case study")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, leftPadding=0, rightPadding=0,
              topPadding=0, bottomPadding=0)
doc.addPageTemplates(PageTemplate(id="case", frames=[frame], onPage=draw_page))
story = []

# Page 1: framing and logic.
story += [p("PRODUCT CONCEPT  /  MARKETPLACE HEALTH", "KickerCustom"),
          p("Reducing Repeat Driver Cancellations", "TitleCustom"),
          p("A product strategy for recovering rider trust after a driver cancels a matched ride.", "SubtitleCustom"),
          p("Case-study status: concept, not a company analysis. No interviews, production telemetry, or causal outcome data were supplied. All numeric examples are illustrative assumptions.", "MutedCustom"),
          p("01  /  Problem", "SectionCustom"),
          p("A rider sees a matched driver, vehicle, and pickup ETA. The driver cancels. The rider waits for another match and may face another cancellation under the same marketplace conditions. Repeated cancellation adds waiting time and creates a plausible trust risk at the moment a rider needs reliability.", "BodyCustom"),
          box("FACT / SCENARIO", "The starting point is the case-study scenario: a request is matched, then cancelled by the driver. It is a design brief, not an observed dataset."),
          Spacer(1, 10),
          box("INFERENCE TO TEST", "Repeated driver cancellations may concentrate on certain trips or windows, increase abandonment, and reduce later return. The direction and size of those effects require request-level and rider-cohort telemetry."),
          p("02  /  Product opportunity", "SectionCustom"),
          p("The intervention has two horizons. <b>Recover the current rider</b> through immediate priority rematching and transparent status. <b>Reduce the next cancellation</b> through relevant driver context, a targeted fare floor, and better direction-aware matching where evidence supports them.", "BodyCustom"),
          p("Decision path", "SubheadCustom"),
          p("Problem → reason taxonomy → marketplace metrics → ranked solutions → controlled pilots → prototype → learning loop.", "BodyCustom"),
          PageBreak()]

# Page 2: causes and metrics.
story += [p("03  /  Root-cause hypotheses", "SectionCustom"),
          p("The four reason groups guide different product responses. They are candidate categories from the original report; their prevalence is unknown until reason capture is validated.", "BodyCustom"),
          table(["Reason", "Potential signal", "Product implication"], [
              ("Low fare", "Fare relative to distance / effort; reason code", "Show guaranteed earnings; test a targeted fare floor"),
              ("Wrong direction", "Declared destination or heading versus trip direction", "Show route fit; later test soft pre-match compatibility"),
              ("Traffic / pickup ETA", "Quoted ETA versus updated travel conditions", "Show updated pickup context before cancellation"),
              ("Rider no-show risk", "Verified wait / no-show history, where appropriate", "Research privacy and fairness before exposing rider history"),
          ], [99, 192, 211]),
          p("04  /  Marketplace health metrics", "SectionCustom"),
          p("<b>North star:</b> completed rides per request. The stages below locate different failure modes; every rate needs a consistent request cohort and time window.", "BodyCustom"),
          table(["Metric", "Operational definition"], [
              ("Match Rate", "Requests matched with a driver / eligible requests"),
              ("Driver-Accept Rate*", "Matched requests that progress to trip start without driver cancellation / matched requests"),
              ("Completion Rate", "Completed rides / started rides"),
              ("Rider Retention", "Riders returning within 7 or 30 days, compared by cancellation exposure"),
              ("Spiral Exposure Rate", "Requests with 2+ driver cancellations before completion or abandonment / eligible requests"),
          ], [150, 352]),
          p("*The source report names the post-match stage “Driver-Accept Rate.” Its definition here is explicit so it is not confused with accepting an incoming offer.", "MutedCustom"),
          p("Illustrative retention pattern", "SubheadCustom"),
          table(["Driver cancellations before completion", "Illustrative 7-day return"], [
              ("0", "68%"), ("1", "51%"), ("2+", "34%")
          ], [315, 187]),
          p("These three values come from the source report and are not measured results. They motivate cohort analysis; they do not establish causation.", "MutedCustom"),
          PageBreak()]

# Page 3: solutions and prioritization.
story += [p("05  /  Proposed solutions", "SectionCustom"),
          p("<b>1. Reason-specific nudge + priority rematch.</b> Before a driver confirms cancellation, show context that fits the selected reason: guaranteed earnings, destination fit, or an updated pickup ETA. The driver keeps full control. If they cancel, prioritize the affected rider in the next matching pass and explain the recovery without promising a precise ETA.", "BodyCustom"),
          p("<b>2. Fare-floor guarantee.</b> Guarantee a minimum payout on eligible short or low-value trips. The source proposes funding through targeted margin adjustment. Eligibility, payout, rider fare effect, and subsidy cost need modeling before a live test.", "BodyCustom"),
          p("<b>3. Direction-compatibility filtering.</b> Use a driver's declared heading as a soft pre-match signal. This may reduce wrong-direction cancellations, but stricter filtering can lower match rate or increase time to match, so it belongs after cheaper levers are measured.", "BodyCustom"),
          p("06  /  RICE prioritization", "SectionCustom"),
          p("The original model assumes 100,000 monthly matched rides and an 8% driver-cancellation rate: 8,000 affected rides per month. Reach, impact, confidence, effort, and scores below are <b>illustrative</b>. Effort is in person-weeks; impact is a relative scoring input, not an outcome forecast.", "BodyCustom"),
          table(["Solution", "Reach", "Impact", "Conf.", "Effort", "RICE"], [
              ("Nudges + priority rematch", "8,000", "1", "70%", "3", "~1,867"),
              ("Fare-floor guarantee", "3,200", "2", "75%", "4", "~1,200"),
              ("Direction compatibility", "2,000", "1.5", "65%", "8", "~244"),
          ], [181, 57, 61, 58, 58, 87]),
          Spacer(1, 12),
          box("RECOMMENDED SEQUENCE", "Pilot nudges plus priority rematch first because it can reach every rider affected by a cancellation and avoids pricing or matching-engine changes. Model and test the fare floor next. Explore direction compatibility after checking the potential match-rate cost."),
          Spacer(1, 11),
          box("ASSUMPTION CHECK", "The source describes low fare and wrong direction as leading reasons but gives no validated reason-mix shares. Their ranking and the corresponding RICE reach estimates must be replaced with real reason-code data before funding decisions.", colors.HexColor("#fbf2e9")),
          PageBreak()]

# Page 4: experiments.
story += [p("07  /  Experiment plan", "SectionCustom"),
          p("Pilot 1 — reason-specific nudges + priority rematch", "SubheadCustom"),
          p("<b>Hypothesis.</b> The paired intervention lowers Spiral Exposure Rate; riders who experience a cancellation may be more likely to return within 7 days.", "BodyCustom"),
          p("<b>Design.</b> Compare treatment with today's cancellation flow and standard requeue. Assign by balanced geo-time blocks or another marketplace-aware unit, with enough separation to limit driver and matching-pool spillover. Stratify peak versus off-peak windows. Keep a rider's requests in a consistent arm within the observation window. The source proposed request-level A/B assignment; marketplace interference makes that design risky unless spillover is shown to be negligible.", "BodyCustom"),
          p("<b>Primary metric.</b> Spiral Exposure Rate. <b>Secondary outcome.</b> 7-day return among riders with at least one driver cancellation, interpreted with cohort size and uncertainty. <b>Guardrails.</b> Match Rate, post-match progression to start, time to rematch, driver supply availability, and support contact rate.", "BodyCustom"),
          p("<b>Decision rule.</b> Set minimum detectable effect, sample size, and stopping window from actual baseline volume before launch. Proceed only if exposure improves without a material guardrail regression; do not read a conceptual chart as a result.", "BodyCustom"),
          p("Pilot 2 — targeted fare-floor guarantee", "SubheadCustom"),
          p("<b>Hypothesis.</b> A minimum payout on eligible trips lowers low-fare cancellations without disproportionate rider fare inflation or margin damage.", "BodyCustom"),
          p("<b>Design.</b> Use matched control zones or windows with comparable trip mix and supply conditions. Define eligibility before assignment and compare the same trip segment over time. Monitor cross-zone driver movement and pricing spillover.", "BodyCustom"),
          p("<b>Primary metric.</b> Driver-cancellation rate attributed to low fare on eligible trips. <b>Guardrails.</b> Rider fare, supply-hours, completed rides per request, and contribution margin per eligible trip.", "BodyCustom"),
          box("FIRST INSTRUMENTATION GATE", "If driver reason codes are missing, inconsistent, or heavily marked “Other,” improve reason capture and audit it before interpreting either pilot. A/B assignment, request-level cancellation count, priority-rematch entry, trip outcome, and rider return must also be logged."),
          PageBreak()]

# Page 5: prototype and learning loop.
story += [p("08  /  Prototype walkthrough", "SectionCustom"),
          p("The accompanying local HTML/CSS/JavaScript prototype makes the product decisions tangible in three connected views. It is a concept demonstration, not a ride-hailing application or a live dashboard.", "BodyCustom"),
          table(["Surface", "What the prototype demonstrates"], [
              ("Rider", "Matched → driver cancelled → priority rematch → new match. Clear cancellation language, request preservation, and an illustrative ETA range."),
              ("Driver", "Incoming trip with estimated earnings and a sample fare floor. A reason selection leads to a relevant nudge; the driver can keep or cancel the trip."),
              ("Ops", "The funnel metrics and Spiral Exposure Rate, source illustrative retention values (68%, 51%, 34%), and a conceptual pilot trend with no numeric effect claim."),
          ], [94, 408]),
          p("09  /  Success metrics and learning loop", "SectionCustom"),
          p("<b>Success signal:</b> lower Spiral Exposure Rate while Match Rate, post-match progression, completed rides per request, and driver availability remain healthy. Retention is a slower supporting signal, not proof of mechanism on its own.", "BodyCustom"),
          p("<b>Learn:</b> inspect the reason mix, cancellation sequences, peak-hour segments, priority-rematch latency, and the gap between quoted and actual pickup time. If nudges have little effect for low-fare trips but rider recovery improves, keep the rematch element and test the payout lever separately. If match rate falls in a direction-filter pilot, relax or remove the filter.", "BodyCustom"),
          p("10  /  What real telemetry must validate", "SectionCustom"),
          p("1. Baseline driver-cancellation rate and reason-code quality; the 8% assumption and RICE reach figures are illustrative.<br/>2. Cancellation-count cohorts and 7/30-day rider return, with trip mix and peak-hour controls; the 68/51/34% values are illustrative.<br/>3. Fare-floor eligibility, subsidy cost, rider fare effect, and contribution margin.<br/>4. Whether direction compatibility helps cancellations without reducing Match Rate or extending match time.<br/>5. Whether priority rematching actually reduces second cancellations and time to a stable match.", "BodyCustom"),
          Spacer(1, 12),
          box("PORTFOLIO TAKEAWAY", "The case frames repeated driver cancellations as a marketplace recovery problem, links each proposed intervention to a reason or rider failure mode, and defines the measurements needed to replace assumptions with evidence."),
          Spacer(1, 13),
          p("Source note: refined from the supplied six-page report, “The Cancellation Spiral: Reducing Driver-Side Cancellations After Match” (Sep 25, 2026). Original illustrative values and the three-solution strategy are preserved; unsupported prevalence claims are flagged and the pilot design is clarified.", "MutedCustom")]

doc.build(story)
print(OUTPUT)
