import mongoose, { Schema, model, models } from 'mongoose';

const OrderSchema = new Schema(
    {
        tourId: { type: String },
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String },
        request: { type: String },
        archived: { type: Boolean, default: false },
    },
    { timestamps: true }
);

const Order = models.Order || model('Order', OrderSchema);

export default Order;
