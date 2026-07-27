#!/bin/zsh
# ============================================================================
# Provisional register plates — Higgsfield generation.
#
# These are MATERIAL STUDIES, not documentation. Nothing generated here may
# depict a person, this company's land or equipment, a process it is said to
# perform, a historical document, or a cob whose rows could be counted.
#
# Every prompt therefore describes a surface, not a place and not an event.
# REF-CARTA is passed as an image reference so the whole set shares one
# palette and one light, and reads as one shoot rather than six searches.
#
# Output: 3:2 masters into assets/masters/piastre/. They are cropped to the
# art direction's 8:5 and encoded locally by scripts/build-piastre.mjs —
# generation never writes into public/.
# ============================================================================
set -e

MODEL=nano_banana_pro
REF=assets/refs/REF-CARTA.png
OUT=assets/masters/piastre
mkdir -p $OUT

# Shared grade. Repeated verbatim in every prompt so the set is consistent.
LOOK="editorial still life plate, matte dry surfaces, no gloss, no specular highlights, raking low-angle daylight from the left, soft short shadows, muted desaturated palette of warm bone paper and dark ink, fine 35mm film grain, visible dust and imperfection, shallow depth of field, no text, no lettering, no packaging, no labels, no people, no hands, no logos"

typeset -A PROMPTS
PROMPTS[re-materia]="Dry papery corn husk bracts lying flat on unbleached laid paper, curled brittle edges, close overhead study. ${LOOK}"
PROMPTS[campo-terra]="Dry ploughed earth clods, close overhead study of bare soil texture, no horizon, no sky, no buildings, no machinery. ${LOOK}"
PROMPTS[campo-coltura]="A few dry broken stalks and chaff on a pale ground, extreme close study, no horizon, no sky, no field, no buildings. ${LOOK}"
PROMPTS[pietra-macina]="Weathered granite millstone surface, radial cut grooves, dust caught in the channels, close raking study of stone texture only, no machinery, no wood, no room. ${LOOK}"
PROMPTS[pietra-farina]="Macro of coarse stone-ground cornmeal, loose heap, individual particles and irregular grain visible, pale warm ochre, on unbleached paper. ${LOOK}"
PROMPTS[atmosfera-luce]="Fine dust suspended in a shaft of low raking daylight against a plain unbleached paper wall, almost abstract, nothing identifiable in frame. ${LOOK}"

for key in ${(k)PROMPTS}; do
  echo "→ $key"
  higgsfield generate create $MODEL \
    --prompt "${PROMPTS[$key]}" \
    --aspect_ratio 3:2 \
    --resolution 2k \
    --image-references $REF \
    --wait --wait-timeout 6m \
    --json > "$OUT/$key.json" || { echo "  ✗ $key failed"; continue; }
  echo "  ✓ $key"
done

echo "Masters written to $OUT — review before running scripts/build-piastre.mjs"
