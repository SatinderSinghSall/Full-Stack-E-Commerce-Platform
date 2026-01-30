import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import {
  Package,
  ShoppingCart,
  IndianRupee,
  Clock,
  Users,
  RefreshCcw,
  TrendingUp,
} from "lucide-react";

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
import Skeleton from "@/components/ui/skeleton";

const Dashboard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    users: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(backendUrl + "/api/product/list"),
        axios.post(backendUrl + "/api/order/list", {}, { headers: { token } }),
        axios.get(backendUrl + "/api/user/count", { headers: { token } }),
      ]);

      if (
        productsRes.data.success &&
        ordersRes.data.success &&
        usersRes.data.success
      ) {
        const orders = ordersRes.data.orders;

        const revenue = orders
          .filter((o) => o.payment)
          .reduce((sum, o) => sum + o.amount, 0);

        setStats({
          products: productsRes.data.products.length,
          orders: orders.length,
          revenue,
          pending: orders.filter((o) => !o.payment).length,
          users: usersRes.data.count,
        });

        setRecentOrders(orders.slice(0, 5));
        setLastUpdated(new Date());
      }
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formattedLastUpdated = useMemo(() => {
    if (!lastUpdated) return "";
    return lastUpdated.toLocaleTimeString();
  }, [lastUpdated]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your store performance
          </p>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground mt-1">
              Last updated at {formattedLastUpdated}
            </p>
          )}
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={loading}
          className={`flex items-center gap-2 text-sm border px-3 py-2 rounded-md transition
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-muted"}
        `}
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              title="Products"
              value={stats.products}
              icon={<Package />}
            />
            <StatCard
              title="Orders"
              value={stats.orders}
              icon={<ShoppingCart />}
            />
            <StatCard
              title="Revenue"
              value={`${currency}${stats.revenue}`}
              icon={<IndianRupee />}
              highlight
            />
            <StatCard
              title="Pending Payments"
              value={stats.pending}
              icon={<Clock />}
              warning={stats.pending > 0}
            />
            <StatCard title="Users" value={stats.users} icon={<Users />} />
          </>
        )}
      </div>

      {/* RECENT ORDERS */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRowSkeleton key={i} />
                ))
              ) : recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    No orders yet — your first sale will appear here.
                  </TableCell>
                </TableRow>
              ) : (
                recentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium">
                      {order.address.firstName} {order.address.lastName}
                    </TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
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

/* ---------- STAT CARD ---------- */
const StatCard = ({ title, value, icon, highlight, warning }) => (
  <Card
    className={`transition hover:shadow-md ${
      highlight ? "border-green-200" : ""
    } ${warning ? "border-yellow-200" : ""}`}
  >
    <CardContent className="flex items-center justify-between pt-6">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-semibold mt-1 flex items-center gap-1">
          {value}
          {highlight && <TrendingUp className="w-4 h-4 text-green-600" />}
        </p>
      </div>
      <div className="p-3 rounded-full bg-muted text-muted-foreground">
        {icon}
      </div>
    </CardContent>
  </Card>
);

/* ---------- SKELETONS ---------- */
const StatCardSkeleton = () => (
  <Card>
    <CardContent className="flex items-center justify-between pt-6">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-16" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full" />
    </CardContent>
  </Card>
);

const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Skeleton className="h-4 w-32" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-20" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-10" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-4 w-16" />
    </TableCell>
    <TableCell>
      <Skeleton className="h-6 w-20 rounded-full" />
    </TableCell>
  </TableRow>
);

export default Dashboard;
