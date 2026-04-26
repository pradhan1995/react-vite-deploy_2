// src/i18n/translations.ts

export type Lang = 'en' | 'hi';

export const translations = {
  en: {
    // Nav
    storeName: 'Daily Need Store',
    tagline: 'The Super Grocery Store',
    home: 'Home',
    cart: 'Cart',

    // Categories
    all: 'All',
    grocery: 'Grocery',
    dairy: 'Dairy',
    snacks: 'Snacks',
    beverages: 'Beverages',

    // Catalog
    searchPlaceholder: 'Search products...',
    noProducts: 'No products found',
    addToCart: 'Add',
    outOfStock: 'Out of Stock',
    relatedProducts: 'Related Products',

    // Cart
    yourCart: 'Your Cart',
    emptyCart: 'Your cart is empty',
    emptyCartSub: 'Add some items to get started',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    remove: 'Remove',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    free: 'FREE',
    total: 'Total',

    // Checkout
    checkout: 'Checkout',
    orderSummary: 'Order Summary',
    deliveryMode: 'Delivery Mode',
    homeDelivery: 'Home Delivery',
    selfPickup: 'Self Pickup',
    deliveryNote: '₹40 flat delivery charge',
    pickupNote: 'Free — pick up from store',
    customerDetails: 'Your Details',
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    address: 'Delivery Address',
    notes: 'Special Instructions',
    notesPlaceholder: 'Any special requests?',
    placeOrder: 'Place Order',
    placing: 'Placing Order...',

    // OTP
    verifyPhone: 'Verify Your Phone',
    otpSent: 'We sent a 6-digit OTP to',
    enterOtp: 'Enter OTP',
    verify: 'Verify & Confirm',
    verifying: 'Verifying...',
    resendOtp: 'Resend OTP',
    resendIn: 'Resend in',
    seconds: 's',

    // Tracking
    trackOrder: 'Track Order',
    orderRef: 'Order Reference',
    trackBtn: 'Track',
    orderTimeline: 'Order Timeline',
    payNow: 'Pay Now',
    estimatedDelivery: 'Estimated Delivery',
    shippingDetails: 'Shipping Details',
    carrier: 'Carrier',
    trackingId: 'Tracking ID',

    // Status labels
    statusVerified: 'Order Verified',
    statusAccepted: 'Order Accepted',
    statusPaid: 'Payment Received',
    statusShipped: 'Out for Delivery',
    statusDelivered: 'Delivered',

    // Status desc
    descVerified: 'Your order has been received and verified.',
    descAccepted: 'Store has accepted your order and is packing it.',
    descPaid: 'Payment confirmed. Getting ready to dispatch.',
    descShipped: 'Your order is on the way!',
    descDelivered: 'Delivered! Enjoy your purchase.',

    // General
    loading: 'Loading...',
    error: 'Something went wrong',
    retry: 'Retry',
    back: 'Back',
    items: 'items',
    item: 'item',
  },
  hi: {
    // Nav
    storeName: 'डेली नीड स्टोर',
    tagline: 'द सुपर ग्रॉसरी स्टोर',
    home: 'होम',
    cart: 'कार्ट',

    // Categories
    all: 'सभी',
    grocery: 'किराना',
    dairy: 'डेयरी',
    snacks: 'स्नैक्स',
    beverages: 'पेय',

    // Catalog
    searchPlaceholder: 'उत्पाद खोजें...',
    noProducts: 'कोई उत्पाद नहीं मिला',
    addToCart: 'जोड़ें',
    outOfStock: 'स्टॉक में नहीं',
    relatedProducts: 'संबंधित उत्पाद',

    // Cart
    yourCart: 'आपकी कार्ट',
    emptyCart: 'कार्ट खाली है',
    emptyCartSub: 'शुरू करने के लिए कुछ आइटम जोड़ें',
    continueShopping: 'खरीदारी जारी रखें',
    proceedToCheckout: 'चेकआउट करें',
    remove: 'हटाएं',
    subtotal: 'उप-कुल',
    deliveryFee: 'डिलीवरी शुल्क',
    free: 'मुफ़्त',
    total: 'कुल',

    // Checkout
    checkout: 'चेकआउट',
    orderSummary: 'ऑर्डर सारांश',
    deliveryMode: 'डिलीवरी मोड',
    homeDelivery: 'होम डिलीवरी',
    selfPickup: 'स्वयं उठाएं',
    deliveryNote: '₹40 फ्लैट डिलीवरी चार्ज',
    pickupNote: 'मुफ़्त — स्टोर से उठाएं',
    customerDetails: 'आपकी जानकारी',
    name: 'पूरा नाम',
    email: 'ईमेल पता',
    phone: 'फोन नंबर',
    address: 'डिलीवरी पता',
    notes: 'विशेष निर्देश',
    notesPlaceholder: 'कोई विशेष अनुरोध?',
    placeOrder: 'ऑर्डर दें',
    placing: 'ऑर्डर हो रहा है...',

    // OTP
    verifyPhone: 'फोन सत्यापित करें',
    otpSent: 'हमने 6-अंकीय OTP भेजा है',
    enterOtp: 'OTP दर्ज करें',
    verify: 'सत्यापित करें',
    verifying: 'सत्यापन हो रहा है...',
    resendOtp: 'OTP दोबारा भेजें',
    resendIn: 'दोबारा भेजें',
    seconds: 'सेकंड',

    // Tracking
    trackOrder: 'ऑर्डर ट्रैक करें',
    orderRef: 'ऑर्डर संदर्भ',
    trackBtn: 'ट्रैक करें',
    orderTimeline: 'ऑर्डर टाइमलाइन',
    payNow: 'अभी भुगतान करें',
    estimatedDelivery: 'अनुमानित डिलीवरी',
    shippingDetails: 'शिपिंग विवरण',
    carrier: 'कैरियर',
    trackingId: 'ट्रैकिंग आईडी',

    // Status labels
    statusVerified: 'ऑर्डर सत्यापित',
    statusAccepted: 'ऑर्डर स्वीकृत',
    statusPaid: 'भुगतान प्राप्त',
    statusShipped: 'डिलीवरी पर',
    statusDelivered: 'डिलीवर हुआ',

    // Status desc
    descVerified: 'आपका ऑर्डर प्राप्त और सत्यापित हो गया है।',
    descAccepted: 'स्टोर ने आपका ऑर्डर स्वीकार कर लिया है।',
    descPaid: 'भुगतान की पुष्टि हो गई। भेजने की तैयारी हो रही है।',
    descShipped: 'आपका ऑर्डर रास्ते में है!',
    descDelivered: 'डिलीवर हो गया! आनंद लें।',

    // General
    loading: 'लोड हो रहा है...',
    error: 'कुछ गलत हो गया',
    retry: 'पुनः प्रयास करें',
    back: 'वापस',
    items: 'आइटम',
    item: 'आइटम',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
