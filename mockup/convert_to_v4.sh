#!/bin/bash

# Convert all v3 pages to v4 format
# Updates: styles-v3.css → styles-v4.css, v3- → v4-, removes yellow/sage references

echo "Converting v3 pages to v4..."

for page in product cart about contact faq shipping returns privacy; do
    if [ -f "v3-${page}.html" ]; then
        sed 's/styles-v3\.css/styles-v4.css/g; s/v3-/v4-/g' "v3-${page}.html" > "v4-${page}.html"
        echo "✓ v4-${page}.html"
    fi
done

echo ""
echo "Total v4 pages: $(ls v4-*.html 2>/dev/null | wc -l)"

