const express = require('express');
const cookieParser = require('cookie-parser');
const { sendCapiEvent, createUserData } = require('./meta-capi');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Placeholder for your frontend static files
// app.use(express.static('../dist'));

app.post('/api/checkout', async (req, res) => {
  console.log("Received checkout request:", req.body);

  // In a real application, you would have your order processing logic here
  // For this example, we'll assume the request body contains the necessary details

  try {
    // Example data - replace with actual data from your application
    const orderDetails = {
      total: req.body.total || '142.50',
      items: req.body.items || [{ id: 'prod123' }],
      orderId: `order_${Date.now()}` // Generate a unique order ID
    };
    const userInfo = {
        email: req.body.email || 'test@example.com',
        phone: req.body.phone || '16505551234',
        firstName: req.body.firstName || 'John',
        lastName: req.body.lastName || 'Doe'
    };

    const userData = createUserData(req, userInfo);

    const purchaseEvent = {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: req.protocol + '://' + req.get('host') + req.originalUrl,
      action_source: 'website',
      user_data: userData,
      custom_data: {
        value: orderDetails.total,
        currency: 'USD',
        content_ids: orderDetails.items.map(item => item.id),
        content_type: 'product',
      },
      event_id: orderDetails.orderId, // Use a unique order ID for deduplication
    };

    console.log("Sending CAPI event:", JSON.stringify(purchaseEvent, null, 2));
    await sendCapiEvent('Purchase', purchaseEvent);
    console.log('Purchase event sent to CAPI successfully.');

    res.status(200).json({ message: 'Order processed and CAPI event sent.', orderId: orderDetails.orderId });

  } catch (error) {
    console.error('Failed to process order or send CAPI event:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('This is a placeholder server to demonstrate CAPI implementation.');
  console.log('You will need to integrate this logic with your actual application backend.');
});
