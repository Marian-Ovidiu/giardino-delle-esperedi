#!/bin/zsh

set -euo pipefail

prompt='Scientific herbarium registration photograph, not commercial food photography. One single dried heritage red maize cob, husk and silk removed, about 14 cm long, slender, tapered and visibly irregular. It has the morphology of an eight-row cob, but rotation and occlusion allow only three longitudinal kernel rows to be clearly legible; all other rows curve fully out of sight around the cylinder. Kernels vary visibly in size and spacing; row paths are slightly irregular. Every kernel is dry, dusty and completely matte, with microscopic pits, fine wrinkles, hairline fractures and a pale dry starch bloom. ZERO white pin highlights, ZERO glossy skin, ZERO wax, oil, lacquer or polish. A few naturally missing kernels expose rough pale fibrous rachis. Use the referenced paper as the exact ground: preserve its colour, fibre, exposure and texture without changing it. The cob bounding box occupies 46–50% of frame width and no more than 24% of frame height. Place its centroid exactly at x=37.5% of frame and y=56%, on a shallow diagonal from upper-left to lower-right, leaving a large uninterrupted paper field above and to the right. Full-depth scientific copy-stand focus: both tips and every kernel equally sharp, no bokeh, no focus falloff. Exactly one small overhead light from upper-left at 80° elevation. The only cast shadow travels lower-right and ENDS WITHIN ONE KERNEL WIDTH from the cob silhouette; short, crisp, lifted, never solid black, no long tail. Neutral 5600K, flat linear scan, low contrast, no warm cast, no HDR, no cinematic grade. No objects, props, writing, packaging, people, field, soil or atmosphere. Asymmetric, quiet, evidentiary.'

for candidate in 1 2 3 4; do
  higgsfield generate create flux_2 \
    --aspect-ratio 16:9 \
    --resolution 2k \
    --variant pro \
    --image-references assets/refs/REF-CARTA.png \
    --prompt "$prompt" \
    --wait
done
