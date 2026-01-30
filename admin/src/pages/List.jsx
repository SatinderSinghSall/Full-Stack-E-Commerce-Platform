import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, currency } from "@/config";
import { Loader2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ITEMS_PER_PAGE = 8;

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editProduct, setEditProduct] = useState(null);
  const [updating, setUpdating] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + "/api/product/list");
      if (res.data.success) {
        setList(res.data.products.reverse());
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE PRODUCT ---------------- */
  const removeProduct = async (id) => {
    try {
      const res = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success("Product deleted");
        fetchList();
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  /* ---------------- UPDATE PRODUCT ---------------- */
  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);

      const res = await axios.post(
        backendUrl + "/api/product/update",
        {
          id: editProduct._id,
          name: editProduct.name,
          price: editProduct.price,
          category: editProduct.category,
          description: editProduct.description,
          bestseller: editProduct.bestseller,
        },
        { headers: { token } },
      );

      if (res.data.success) {
        toast.success("Product updated");
        fetchList();
        setEditProduct(null);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredList = useMemo(() => {
    if (!search) return list;

    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [list, search]);

  /* Reset page on search */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const paginatedList = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">All Products</h2>
          <p className="text-sm text-muted-foreground">
            View, edit or remove products
          </p>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {/* TABLE */}
      <div className="rounded-lg border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader2 className="mx-auto animate-spin" />
                </TableCell>
              </TableRow>
            ) : paginatedList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              paginatedList.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <img
                      src={item.image[0]}
                      className="w-12 h-12 rounded object-cover"
                      alt={item.name}
                    />
                  </TableCell>

                  <TableCell className="font-medium">
                    {item.name}
                    {item.bestseller && (
                      <Badge className="ml-2">Bestseller</Badge>
                    )}
                  </TableCell>

                  <TableCell>{item.category}</TableCell>

                  <TableCell>
                    {currency}
                    {item.price}
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    {/* VIEW */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle>{item.name}</DialogTitle>
                        </DialogHeader>

                        <img
                          src={item.image[0]}
                          className="w-full h-56 object-cover rounded-md"
                        />

                        <div className="text-sm space-y-2">
                          <p>
                            <b>Category:</b> {item.category}
                          </p>
                          <p>
                            <b>Price:</b> {currency}
                            {item.price}
                          </p>
                          <p>
                            <b>Description:</b> {item.description}
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {/* EDIT */}
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setEditProduct(item)}
                    >
                      Edit
                    </Button>

                    {/* DELETE */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete product?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeProduct(item._id)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
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
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* EDIT MODAL */}
      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>

          {editProduct && (
            <form onSubmit={updateProduct} className="space-y-4">
              <Input
                value={editProduct.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                placeholder="Product name"
              />

              <Input
                type="number"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                placeholder="Price"
              />

              <Textarea
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />

              <Button className="w-full" disabled={updating}>
                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Product
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default List;
