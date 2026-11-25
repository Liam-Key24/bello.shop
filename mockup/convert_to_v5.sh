#!/bin/bash

# Convert v4 pages to v5
echo "Converting v4 pages to v5..."

for page in product cart about contact faq shipping returns privacy; do
    if [ -f "v4-${page}.html" ]; then
        # Update stylesheet reference and all v4 links to v5
        sed 's/styles-v4\.css/styles-v5.css/g; s/v4-/v5-/g' "v4-${page}.html" > "v5-${page}.html.tmp"
        
        # Add gradient blobs after <body> tag
        sed '/<body>/a\    <!-- Gradient Blobs -->\n    <div class="gradient-blob blob-1"></div>\n    <div class="gradient-blob blob-2"></div>\n    <div class="gradient-blob blob-3"></div>\n    <div class="gradient-blob blob-4"></div>\n' "v5-${page}.html.tmp" > "v5-${page}.html"
        
        rm "v5-${page}.html.tmp"
        echo "✓ v5-${page}.html"
    fi
done

echo ""
echo "Total v5 pages: $(ls v5-*.html 2>/dev/null | wc -l)"

