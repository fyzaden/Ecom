require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const admin = require('firebase-admin');
const app = express();

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      console.error(`❌ Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('✅ Payment successful! Processing database updates...');

      await handleSuccessfulPayment(session);
    }

    res.json({ received: true });
  },
);

// Database Operations
async function handleSuccessfulPayment(session) {
  try {
    const userId = session.metadata.userId;
    const productItems = JSON.parse(session.metadata.cartItems);
    console.log('📦 Gelen Ürünler:', productItems);

    const batch = db.batch();

    productItems.forEach((item) => {
      if (!item.id) {
        console.error("❌ Hata: Ürün ID'si bulunamadı!", item);
        return;
      }

      const productRef = db.collection('products').doc(item.id);
      batch.update(productRef, {
        stock: admin.firestore.FieldValue.increment(-item.quantity),
      });
    });

    if (userId && userId !== 'guest') {
      const orderRef = db
        .collection('users')
        .doc(userId)
        .collection('orders')
        .doc();
      batch.set(orderRef, {
        orderId: session.id,
        amount: session.amount_total / 100,
        currency: session.currency,
        items: productItems,
        status: 'paid',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    console.log('🚀 Firebase updated: Stock reduced and Order history added.');
  } catch (error) {
    console.error('❌ Firebase Update Error:', error);
  }
} //

const PORT = process.env.PORT || 4242;
app.listen(PORT, () =>
  console.log(`🚀 Webhook Server is running on port ${PORT}`),
);
