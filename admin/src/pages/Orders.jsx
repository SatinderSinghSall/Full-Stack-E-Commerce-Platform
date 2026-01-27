import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } },
      );

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const statusHandler = async (status, orderId) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } },
      );

      if (res.data.success) {
        fetchAllOrders();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold">Orders</h2>
        <p className="text-sm text-muted-foreground">
          Manage and track customer orders
        </p>
      </div>

      {/* Orders Table */}
      <div className="rounded-lg border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order._id} className="align-top">
                  {/* Order Items */}
                  <TableCell>
                    <div className="flex gap-3">
                      <img
                        src={assets.parcel_icon}
                        alt="order"
                        className="w-10 h-10"
                      />
                      <div className="text-sm">
                        {order.items.map((item, idx) => (
                          <p key={idx}>
                            {item.name} × {item.quantity}
                          </p>
                        ))}
                      </div>
                    </div>
                  </TableCell>

                  {/* Customer */}
                  <TableCell>
                    <p className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.address.phone}
                    </p>
                  </TableCell>

                  {/* Order Meta */}
                  <TableCell className="text-sm space-y-1">
                    <p>Items: {order.items.length}</p>
                    <p>Method: {order.paymentMethod}</p>
                    <p>
                      Payment:{" "}
                      <Badge variant={order.payment ? "default" : "secondary"}>
                        {order.payment ? "Paid" : "Pending"}
                      </Badge>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="font-medium">
                    {currency}
                    {order.amount}
                  </TableCell>

                  {/* Status + View */}
                  <TableCell className="space-y-2">
                    <Select
                      value={order.status}
                      onValueChange={(value) => statusHandler(value, order._id)}
                    >
                      <SelectTrigger className="w-[160px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Order Placed">
                          Order Placed
                        </SelectItem>
                        <SelectItem value="Packing">Packing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Out for delivery">
                          Out for delivery
                        </SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* VIEW ORDER MODAL */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="w-full">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Order Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4 text-sm">
                          {/* Customer */}
                          <div>
                            <p className="font-medium">Customer</p>
                            <p>
                              {order.address.firstName} {order.address.lastName}
                            </p>
                            <p className="text-muted-foreground">
                              {order.address.phone}
                            </p>
                          </div>

                          {/* Address */}
                          <div>
                            <p className="font-medium">Delivery Address</p>
                            <p className="text-muted-foreground">
                              {order.address.street}, {order.address.city},{" "}
                              {order.address.state}, {order.address.country} -{" "}
                              {order.address.zipcode}
                            </p>
                          </div>

                          {/* Items */}
                          <div>
                            <p className="font-medium mb-2">Items</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between border rounded-md p-2"
                                >
                                  <span>
                                    {item.name} × {item.quantity}
                                  </span>
                                  <span>
                                    {currency}
                                    {item.price * item.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Payment */}
                          <div className="flex justify-between">
                            <span>Payment Method</span>
                            <span className="font-medium">
                              {order.paymentMethod}
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span>Payment Status</span>
                            <Badge
                              variant={order.payment ? "default" : "secondary"}
                            >
                              {order.payment ? "Paid" : "Pending"}
                            </Badge>
                          </div>

                          {/* Total */}
                          <div className="flex justify-between text-base font-semibold border-t pt-3">
                            <span>Total</span>
                            <span>
                              {currency}
                              {order.amount}
                            </span>
                          </div>

                          <p className="text-xs text-muted-foreground text-right">
                            Ordered on {new Date(order.date).toLocaleString()}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
