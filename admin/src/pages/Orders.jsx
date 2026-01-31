import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "@/config";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import OrderDetailsDialog from "@/components/OrderDetailsDialog";

const ORDERS_PER_PAGE = 6;

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // delete dialog states
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  /* ---------------- UPDATE STATUS ---------------- */
  const statusHandler = async (status, orderId) => {
    try {
      await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status },
        { headers: { token } },
      );
      fetchAllOrders();
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------------- DELETE ORDER ---------------- */
  const confirmDeleteOrder = async () => {
    if (!deleteOrderId) return;

    try {
      setDeleting(true);

      await axios.post(
        backendUrl + "/api/order/delete",
        { orderId: deleteOrderId },
        { headers: { token } },
      );

      toast.success("Order deleted");
      setOpenDeleteDialog(false);
      setDeleteOrderId(null);
      fetchAllOrders();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  };

  /* ---------------- SEARCH ---------------- */
  const filteredOrders = useMemo(() => {
    if (!search) return orders;
    const s = search.toLowerCase();

    return orders.filter(
      (o) =>
        `${o.address.firstName} ${o.address.lastName}`
          .toLowerCase()
          .includes(s) ||
        o.address.phone.includes(s) ||
        o.status.toLowerCase().includes(s) ||
        o.paymentMethod.toLowerCase().includes(s),
    );
  }, [orders, search]);

  useEffect(() => setCurrentPage(1), [search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE,
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm text-muted-foreground">
            Manage and track customer orders
          </p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="border rounded-md px-3 py-2 text-sm sm:max-w-xs"
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block rounded-lg border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  Loading orders...
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <DesktopRow
                  key={order._id}
                  order={order}
                  statusHandler={statusHandler}
                  onDelete={() => {
                    setDeleteOrderId(order._id);
                    setOpenDeleteDialog(true);
                  }}
                  setSelectedOrder={setSelectedOrder}
                  setOpenDialog={setOpenDialog}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <p className="text-center py-10">Loading orders...</p>
        ) : (
          paginatedOrders.map((order) => (
            <MobileOrderCard
              key={order._id}
              order={order}
              statusHandler={statusHandler}
              onDelete={() => {
                setDeleteOrderId(order._id);
                setOpenDeleteDialog(true);
              }}
              setSelectedOrder={setSelectedOrder}
              setOpenDialog={setOpenDialog}
            />
          ))
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            size="sm"
            variant="outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* ORDER DETAILS */}
      <OrderDetailsDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        order={selectedOrder}
      />

      {/* DELETE CONFIRMATION */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The order will be permanently
              removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteOrder} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/* ================= DESKTOP ROW ================= */
const DesktopRow = ({
  order,
  statusHandler,
  onDelete,
  setSelectedOrder,
  setOpenDialog,
}) => (
  <TableRow className="align-top">
    <TableCell>
      <div className="flex gap-3">
        <img src={assets.parcel_icon} className="w-10 h-10" />
        <div className="text-sm">
          {order.items.map((i, idx) => (
            <p key={idx}>
              {i.name} × {i.quantity}
            </p>
          ))}
        </div>
      </div>
    </TableCell>

    <TableCell>
      <p className="font-medium">
        {order.address.firstName} {order.address.lastName}
      </p>
      <p className="text-sm text-muted-foreground">{order.address.phone}</p>
    </TableCell>

    <TableCell className="text-sm space-y-1">
      <p>Items: {order.items.length}</p>
      <p>Method: {order.paymentMethod}</p>
      <Badge variant={order.payment ? "default" : "secondary"}>
        {order.payment ? "Paid" : "Pending"}
      </Badge>
    </TableCell>

    <TableCell className="font-medium">
      {currency}
      {order.amount}
    </TableCell>

    <TableCell>
      <Select
        value={order.status}
        onValueChange={(v) => statusHandler(v, order._id)}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[
            "Order Placed",
            "Packing",
            "Shipped",
            "Out for delivery",
            "Delivered",
          ].map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>

    {/* ACTIONS */}
    <TableCell>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            setSelectedOrder(order);
            setOpenDialog(true);
          }}
        >
          View More
        </Button>

        <Button size="sm" variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

/* ================= MOBILE CARD ================= */
const MobileOrderCard = ({
  order,
  statusHandler,
  onDelete,
  setSelectedOrder,
  setOpenDialog,
}) => (
  <div className="border rounded-lg p-4 space-y-3 bg-white">
    <div className="flex justify-between">
      <div>
        <p className="font-medium">
          {order.address.firstName} {order.address.lastName}
        </p>
        <p className="text-xs text-muted-foreground">{order.address.phone}</p>
      </div>
      <Badge variant={order.payment ? "default" : "secondary"}>
        {order.payment ? "Paid" : "Pending"}
      </Badge>
    </div>

    <div className="text-sm space-y-1">
      {order.items.map((i, idx) => (
        <p key={idx}>
          {i.name} × {i.quantity}
        </p>
      ))}
    </div>

    <div className="flex justify-between font-medium">
      <span>Total</span>
      <span>
        {currency}
        {order.amount}
      </span>
    </div>

    <Select
      value={order.status}
      onValueChange={(v) => statusHandler(v, order._id)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[
          "Order Placed",
          "Packing",
          "Shipped",
          "Out for delivery",
          "Delivered",
        ].map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    <div className="space-y-2">
      <Button
        size="sm"
        variant="outline"
        onClick={() => {
          setSelectedOrder(order);
          setOpenDialog(true);
        }}
      >
        View More
      </Button>

      <Button size="sm" variant="destructive" onClick={onDelete}>
        Delete Order
      </Button>
    </div>
  </div>
);

export default Orders;
