#!/bin/zsh

set -euo pipefail

project_dir="${0:A:h:h}"
prompt='Edit the referenced paper only. Preserve its exact colour, fibre and exposure. Press exactly EIGHT shallow blind-debossed horizontal registration grooves into the paper: eight and only eight. Each groove begins on the same left axis; their right endpoints form an irregular stepped rhythm and never align. The grooves are uninked, colourless and visible only through subtle compressed fibre and a hairline lower-edge relief from one neutral upper-left copy light. Wide empty paper around them. No corn, kernels, botanical object, text, letters, numerals, symbols, stamps, borders, grid intersections, decorative pattern, cast shadow, seam or ninth line. Museum conservation record, not packaging mockup.'

for candidate in 1 2 3 4; do
  higgsfield generate create nano_banana_2_lite \
    --aspect-ratio 16:9 \
    --resolution 1k \
    --thinking HIGH \
    --image-references "$project_dir/assets/refs/REF-CARTA.png" \
    --prompt "$prompt" \
    --wait
done
