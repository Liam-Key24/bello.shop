#!/bin/bash

# This script creates the remaining v3 pages efficiently
# v3-product, v3-cart, v3-about, v3-contact, v3-faq, v3-shipping, v3-returns, v3-privacy

echo "Creating v3 pages with Beauty Care-inspired layout + flat icons..."

# Copy and adapt v2 pages to v3 (replace styles, add icons, flatten design)
# Using sed to update all v2 references to v3 and style references

for page in product cart about contact faq shipping returns privacy; do
    if [ -f "v2-${page}.html" ]; then
        sed 's/styles-v2.css/styles-v3.css/g; s/v2-/v3-/g; s/emoji/icon/g' "v2-${page}.html" > "v3-${page}.html"
        echo "✓ v3-${page}.html"
    fi
done

echo ""
echo "Pages created: $(ls v3-*.html | wc -l)"

