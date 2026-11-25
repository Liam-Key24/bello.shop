#!/bin/bash

# Kill any running chrome instances
pkill -9 chrome 2>/dev/null
sleep 2

PAGES=(
    "v2-homepage"
    "v2-product"
    "v2-cart"
    "v2-about"
    "v2-shipping"
    "v2-returns"
    "v2-contact"
    "v2-faq"
    "v2-privacy"
)

mkdir -p screenshots-v2

echo "Capturing desktop screenshots (1440px)..."
for page in "${PAGES[@]}"; do
    echo "  → $page (desktop)"
    google-chrome --headless --disable-gpu \
        --screenshot=screenshots-v2/${page}-desktop.png \
        --window-size=1440,2000 \
        --hide-scrollbars \
        ${page}.html 2>&1 | grep -E "(written|bytes)" || true
    sleep 1
done

echo ""
echo "Capturing mobile screenshots (390px)..."
for page in "${PAGES[@]}"; do
    echo "  → $page (mobile)"
    google-chrome --headless --disable-gpu \
        --screenshot=screenshots-v2/${page}-mobile.png \
        --window-size=390,2000 \
        --hide-scrollbars \
        ${page}.html 2>&1 | grep -E "(written|bytes)" || true
    sleep 1
done

echo ""
echo "Screenshots complete!"
ls -lh screenshots-v2/ | head -20

