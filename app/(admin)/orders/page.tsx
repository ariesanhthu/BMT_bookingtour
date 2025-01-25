'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash, Archive } from 'lucide-react';

interface Order {
    _id: string;
    tourId: string;
    tourName: string;
    name: string;
    phone: string;
    email?: string;
    request?: string;
    createdAt: string;
    archived: boolean;
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);

    // Fetch orders from API
    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders');
            const activeOrders = data.filter((order: Order) => !order.archived);
            const archivedOrders = data.filter((order: Order) => order.archived);
    
            setOrders(
                activeOrders.sort(
                    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            );
            setArchivedOrders(
                archivedOrders.sort(
                    (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
            );
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };
    
    useEffect(() => {
        fetchOrders();
    }, []);

    // Handle archiving an order
    const handleArchive = async (id: string) => {
        try {
            await axios.put(`/api/orders/${id}/archive`);
            fetchOrders();
        } catch (error) {
            console.error('Error archiving order:', error);
        }
    };

    // Handle deleting an order
    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`/api/orders/${id}`);
            fetchOrders();
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Render order cards
    const renderOrders = (orderList: Order[]) => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orderList.map((order) => (
                <Card key={order._id} className="border shadow-md">
                    <CardHeader>
                        <CardTitle>
                            <span className="text-lg font-bold">{order.name}</span>
                        </CardTitle>
                        <p className="text-sm text-gray-600">Tour ID: {order.tourName}</p>
                        <p className="text-sm text-gray-600">Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">SĐT: {order.phone}</p>
                        {order.email && <p className="text-sm">Email: {order.email}</p>}
                        {order.request && <p className="text-sm">Yêu cầu: {order.request}</p>}
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                       {
                        
                       
                        <Button variant="outline" size="sm" onClick={() => handleArchive(order._id)}>
                            <Archive className="w-4 h-4 mr-2" /> {!order.archived ? 'Lưu trữ' : 'Bỏ lưu trữ'}
                        </Button>
                        }
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(order._id)}>
                            <Trash className="w-4 h-4 mr-2" /> Xóa
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

    return (
        <div className="p-6 justify-center h-full w-full">
            <Tabs defaultValue="orders" className='h-full w-full'>
                <TabsList>
                    <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
                    <TabsTrigger value="archived">Đơn đã xem</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                    {orders.length > 0 ? renderOrders(orders) : <p>Không có đơn hàng nào.</p>}
                </TabsContent>
                <TabsContent value="archived">
                    {archivedOrders.length > 0 ? renderOrders(archivedOrders) : <p>Không có đơn hàng lưu trữ nào.</p>}
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default OrdersPage;
