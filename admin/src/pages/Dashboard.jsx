import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { Package, ShoppingCart, IndianRupee, Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = ({ token }) => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        axios.get(backendUrl + "/api/product/list"),
        axios.post(backendUrl + "/api/order/list", {}, { headers: { token } }),
      ]);

      if (productsRes.data.success && ordersRes.data.success) {
        const orders = ordersRes.data.orders;

        const revenue = orders
          .filter((o) => o.payment)
          .reduce((sum, o) => sum + o.amount, 0);

        setStats({
          products: productsRes.data.products.length,
          orders: orders.length,
          revenue,
          pending: orders.filter((o) => !o.payment).length,
        });

        setRecentOrders(orders.slice(0, 5));
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Products" value={stats.products} icon={<Package />} />
        <StatCard title="Orders" value={stats.orders} icon={<ShoppingCart />} />
        <StatCard
          title="Revenue"
          value={`${currency}${stats.revenue}`}
          icon={<IndianRupee />}
        />
        <StatCard
          title="Pending Payments"
          value={stats.pending}
          icon={<Clock />}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No recent orders
                  </TableCell>
                </TableRow>
              ) : (
                recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </TableCell>
                    <TableCell>{order.items.length}</TableCell>
                    <TableCell>
                      {currency}
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Badge variant={order.payment ? "default" : "secondary"}>
                        {order.payment ? "Paid" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

/* Reusable Stat Card */
const StatCard = ({ title, value, icon }) => (
  <Card>
    <CardContent className="flex items-center justify-between pt-6">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
    </CardContent>
  </Card>
);

export default Dashboard;
