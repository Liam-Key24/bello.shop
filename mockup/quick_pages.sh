#!/bin/bash

# Contact Page
cat > v2-contact.html <<'CONTACTHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - Bello</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles-v2.css">
    <style>
        .contact-container { max-width: 700px; margin: 0 auto; padding: 140px 20px 80px; position: relative; z-index: 1; }
        .page-header { text-align: center; margin-bottom: 50px; }
        .page-header h1 { font-size: 56px; font-weight: 900; margin-bottom: 16px; }
        .contact-form { background: var(--glass-bg-strong); backdrop-filter: blur(32px); border: 3px solid var(--glass-border); border-radius: 24px; padding: 40px; box-shadow: var(--glass-shadow-strong); }
        .form-group { margin-bottom: 24px; }
        .form-group label { display: block; font-weight: 600; margin-bottom: 8px; }
        .form-group input, .form-group textarea { width: 100%; padding: 14px 18px; border: 2px solid var(--glass-border); border-radius: 12px; font-family: var(--font-body); font-size: 15px; background: white; }
        .form-group textarea { min-height: 150px; resize: vertical; }
        .contact-info { margin-top: 40px; text-align: center; color: var(--color-mid-gray); }
    </style>
</head>
<body>
    <div class="nav-wrapper">
        <nav>
            <a href="v2-homepage.html" class="logo">Bello</a>
            <ul class="nav-links">
                <li><a href="v2-homepage.html">Home</a></li>
                <li><a href="v2-about.html">Our Story</a></li>
                <li><a href="v2-contact.html">Contact</a></li>
            </ul>
            <div class="nav-icons">
                <button class="icon-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                <button class="icon-btn cart-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count">0</span></button>
            </div>
        </nav>
    </div>

    <div class="contact-container">
        <div class="page-header">
            <h1>Get In Touch</h1>
            <p style="font-size: 18px; color: var(--color-mid-gray);">We're here to help. Send us a message and we'll respond within 24 hours.</p>
        </div>

        <div class="contact-form">
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="subject">Subject</label>
                    <input type="text" id="subject" name="subject" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                </div>
                <button type="submit" class="primary-button" style="width: 100%;">Send Message</button>
            </form>

            <div class="contact-info">
                <p style="margin: 24px 0 12px;"><strong>Email:</strong> <a href="mailto:hello@bello.shop" style="color: var(--color-sage-green);">hello@bello.shop</a></p>
                <p><strong>Response time:</strong> Within 24 hours (usually much faster)</p>
                <div style="margin-top: 32px;">
                    <p style="margin-bottom: 12px;"><strong>Follow us:</strong></p>
                    <div class="social-links" style="display: flex; justify-content: center;">
                        <a href="#">📷</a>
                        <a href="#">👍</a>
                        <a href="#">🐦</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>Bello</h3>
                    <p>Making sustainable living simple, beautiful, and accessible for everyone.</p>
                    <div class="social-links"><a href="#">📷</a><a href="#">👍</a><a href="#">🐦</a></div>
                </div>
                <div class="footer-section">
                    <h4>Shop</h4>
                    <ul><li><a href="v2-homepage.html">All Products</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul><li><a href="v2-contact.html">Contact Us</a></li><li><a href="v2-shipping.html">Shipping Info</a></li><li><a href="v2-returns.html">Returns</a></li><li><a href="v2-faq.html">FAQ</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul><li><a href="v2-about.html">About Us</a></li><li><a href="v2-privacy.html">Privacy Policy</a></li><li><a href="v2-privacy.html">Terms</a></li></ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Bello. All rights reserved.</p>
                <p>Made with 💚 for the planet</p>
            </div>
        </div>
    </footer>
</body>
</html>
CONTACTHTML

echo "✓ Contact"

# FAQ Page
cat > v2-faq.html <<'FAQHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAQ - Bello</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles-v2.css">
    <style>
        .faq-container { max-width: 900px; margin: 0 auto; padding: 140px 20px 80px; position: relative; z-index: 1; }
        .page-header { text-align: center; margin-bottom: 50px; }
        .page-header h1 { font-size: 56px; font-weight: 900; margin-bottom: 16px; }
        .faq-item { background: var(--glass-bg-strong); backdrop-filter: blur(32px); border: 3px solid var(--glass-border); border-radius: 20px; padding: 32px; margin-bottom: 20px; box-shadow: var(--glass-shadow); }
        .faq-item h3 { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: var(--color-sage-green); }
        .faq-item p { font-size: 16px; line-height: 1.7; color: var(--color-charcoal); }
    </style>
</head>
<body>
    <div class="nav-wrapper">
        <nav>
            <a href="v2-homepage.html" class="logo">Bello</a>
            <ul class="nav-links">
                <li><a href="v2-homepage.html">Home</a></li>
                <li><a href="v2-about.html">Our Story</a></li>
                <li><a href="v2-contact.html">Contact</a></li>
            </ul>
            <div class="nav-icons">
                <button class="icon-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                <button class="icon-btn cart-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count">0</span></button>
            </div>
        </nav>
    </div>

    <div class="faq-container">
        <div class="page-header">
            <h1>Frequently Asked Questions</h1>
            <p style="font-size: 18px; color: var(--color-mid-gray);">Quick answers to common questions. Can't find what you're looking for? <a href="v2-contact.html" style="color: var(--color-sage-green);">Contact us</a>.</p>
        </div>

        <div class="faq-item">
            <h3>🚚 When will my order arrive?</h3>
            <p>Standard UK delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout. Orders placed before 2pm are dispatched same day.</p>
        </div>

        <div class="faq-item">
            <h3>🔄 What's your return policy?</h3>
            <p>30-day money-back guarantee. Return any unused item in its original packaging for a full refund. We provide free prepaid return labels.</p>
        </div>

        <div class="faq-item">
            <h3>🌍 Are your products really eco-friendly?</h3>
            <p>Yes! Every product is eco-certified, made from sustainable materials, and produced ethically. We also offset 100% of our shipping emissions and use plastic-free packaging.</p>
        </div>

        <div class="faq-item">
            <h3>💷 Do you offer free shipping?</h3>
            <p>Yes! Free standard shipping on all UK orders over £30. Orders under £30 have a £3.99 shipping fee.</p>
        </div>

        <div class="faq-item">
            <h3>📦 How is my order packaged?</h3>
            <p>100% plastic-free! We use recycled cardboard boxes, paper tape, and biodegradable packing materials. Everything is recyclable or compostable.</p>
        </div>

        <div class="faq-item">
            <h3>✓ What if my item arrives damaged?</h3>
            <p>We'll replace it immediately at no charge. Contact us with photos and we'll send a replacement right away.</p>
        </div>

        <div class="faq-item">
            <h3>💳 What payment methods do you accept?</h3>
            <p>We accept all major credit/debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and PayPal via our secure Shopify checkout.</p>
        </div>

        <div class="faq-item">
            <h3>📧 How can I track my order?</h3>
            <p>You'll receive a tracking number via email once your order is dispatched. Use it to track your parcel in real-time.</p>
        </div>

        <div class="faq-item">
            <h3>❓ Still have questions?</h3>
            <p><a href="v2-contact.html" style="color: var(--color-sage-green); font-weight: 600;">Get in touch</a> and we'll help you out.</p>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>Bello</h3>
                    <p>Making sustainable living simple, beautiful, and accessible for everyone.</p>
                    <div class="social-links"><a href="#">📷</a><a href="#">👍</a><a href="#">🐦</a></div>
                </div>
                <div class="footer-section">
                    <h4>Shop</h4>
                    <ul><li><a href="v2-homepage.html">All Products</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul><li><a href="v2-contact.html">Contact Us</a></li><li><a href="v2-shipping.html">Shipping Info</a></li><li><a href="v2-returns.html">Returns</a></li><li><a href="v2-faq.html">FAQ</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul><li><a href="v2-about.html">About Us</a></li><li><a href="v2-privacy.html">Privacy Policy</a></li><li><a href="v2-privacy.html">Terms</a></li></ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Bello. All rights reserved.</p>
                <p>Made with 💚 for the planet</p>
            </div>
        </div>
    </footer>
</body>
</html>
FAQHTML

echo "✓ FAQ"

# Privacy/Terms template
cat > v2-privacy.html <<'PRIVACYHTML'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy & Terms - Bello</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles-v2.css">
    <style>
        .legal-container { max-width: 900px; margin: 0 auto; padding: 140px 20px 80px; position: relative; z-index: 1; }
        .page-header { text-align: center; margin-bottom: 50px; }
        .page-header h1 { font-size: 56px; font-weight: 900; margin-bottom: 16px; }
        .legal-section { background: var(--glass-bg-strong); backdrop-filter: blur(32px); border: 3px solid var(--glass-border); border-radius: 24px; padding: 40px; margin-bottom: 32px; box-shadow: var(--glass-shadow-strong); }
        .legal-section h2 { font-size: 28px; font-weight: 800; margin: 32px 0 16px 0; color: var(--color-sage-green); }
        .legal-section h2:first-child { margin-top: 0; }
        .legal-section p { font-size: 16px; line-height: 1.7; color: var(--color-charcoal); margin-bottom: 16px; }
        .legal-section ul { margin: 16px 0; padding-left: 24px; }
        .legal-section ul li { margin-bottom: 8px; line-height: 1.7; }
    </style>
</head>
<body>
    <div class="nav-wrapper">
        <nav>
            <a href="v2-homepage.html" class="logo">Bello</a>
            <ul class="nav-links">
                <li><a href="v2-homepage.html">Home</a></li>
                <li><a href="v2-about.html">Our Story</a></li>
                <li><a href="v2-contact.html">Contact</a></li>
            </ul>
            <div class="nav-icons">
                <button class="icon-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg></button>
                <button class="icon-btn cart-badge"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="cart-count">0</span></button>
            </div>
        </nav>
    </div>

    <div class="legal-container">
        <div class="page-header">
            <h1>Privacy Policy & Terms</h1>
            <p style="font-size: 16px; color: var(--color-mid-gray);">Last updated: November 2026</p>
        </div>

        <div class="legal-section">
            <h2>Privacy Policy</h2>
            <p><strong>Your privacy matters to us.</strong> We collect only the information necessary to process your orders and provide great service.</p>
            
            <h2>What We Collect</h2>
            <ul>
                <li>Contact information (name, email, shipping address)</li>
                <li>Payment information (processed securely by Shopify)</li>
                <li>Order history</li>
                <li>Basic website usage data (cookies, analytics)</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
                <li>To process and fulfill your orders</li>
                <li>To send order confirmations and shipping updates</li>
                <li>To provide customer support</li>
                <li>To improve our website and products (with your consent)</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time. Contact us at <a href="mailto:privacy@bello.shop" style="color: var(--color-sage-green);">privacy@bello.shop</a> for requests.</p>

            <h2>Data Security</h2>
            <p>We use industry-standard encryption and secure servers. Payment information is processed through Shopify's PCI-compliant payment gateway.</p>
        </div>

        <div class="legal-section">
            <h2>Terms of Service</h2>
            <p><strong>By using our website, you agree to these terms.</strong></p>

            <h2>Orders & Pricing</h2>
            <p>All prices are in GBP and include VAT. We reserve the right to refuse or cancel orders for any reason.</p>

            <h2>Returns & Refunds</h2>
            <p>See our <a href="v2-returns.html" style="color: var(--color-sage-green);">Returns Policy</a> for full details. 30-day money-back guarantee on all products.</p>

            <h2>Intellectual Property</h2>
            <p>All content on this website (images, text, logos) is owned by Bello and protected by copyright law.</p>

            <h2>Limitation of Liability</h2>
            <p>We are not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.</p>

            <h2>Contact</h2>
            <p>Questions about our policies? Email us at <a href="mailto:legal@bello.shop" style="color: var(--color-sage-green);">legal@bello.shop</a></p>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <div class="footer-grid">
                <div class="footer-brand">
                    <h3>Bello</h3>
                    <p>Making sustainable living simple, beautiful, and accessible for everyone.</p>
                    <div class="social-links"><a href="#">📷</a><a href="#">👍</a><a href="#">🐦</a></div>
                </div>
                <div class="footer-section">
                    <h4>Shop</h4>
                    <ul><li><a href="v2-homepage.html">All Products</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Support</h4>
                    <ul><li><a href="v2-contact.html">Contact Us</a></li><li><a href="v2-shipping.html">Shipping Info</a></li><li><a href="v2-returns.html">Returns</a></li><li><a href="v2-faq.html">FAQ</a></li></ul>
                </div>
                <div class="footer-section">
                    <h4>Company</h4>
                    <ul><li><a href="v2-about.html">About Us</a></li><li><a href="v2-privacy.html">Privacy Policy</a></li><li><a href="v2-privacy.html">Terms</a></li></ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Bello. All rights reserved.</p>
                <p>Made with 💚 for the planet</p>
            </div>
        </div>
    </footer>
</body>
</html>
PRIVACYHTML

echo "✓ Privacy/Terms"

ls -1 v2-*.html | wc -l

