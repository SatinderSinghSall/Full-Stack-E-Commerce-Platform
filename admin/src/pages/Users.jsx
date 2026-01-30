import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Users } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const USERS_PER_PAGE = 8;

const UsersPage = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FETCH USERS ---------------- */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(backendUrl + "/api/user/list", {
        headers: { token },
      });

      if (res.data.success) {
        setUsers(res.data.users);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ---------------- SEARCH ---------------- */
  const filteredUsers = useMemo(() => {
    if (!search) return users;

    const s = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s),
    );
  }, [users, search]);

  /* Reset page on search */
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE,
  );

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="h-6 w-6" />
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage registered users
          </p>
        </div>

        {/* SEARCH */}
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            {loading ? (
              <p className="text-center py-8 text-muted-foreground">
                Loading users...
              </p>
            ) : paginatedUsers.length === 0 ? (
              <p className="text-center py-8 text-muted-foreground">
                No users found
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {paginatedUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>

                      <TableCell>
                        <Badge>Active</Badge>
                      </TableCell>

                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                        <Button size="sm" variant="destructive">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">
            Loading users...
          </p>
        ) : paginatedUsers.length === 0 ? (
          <p className="text-center py-8 text-muted-foreground">
            No users found
          </p>
        ) : (
          paginatedUsers.map((user) => (
            <div
              key={user._id}
              className="border rounded-lg p-4 space-y-2 bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                Joined on {new Date(user.createdAt).toLocaleDateString()}
              </p>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="w-full">
                  View
                </Button>
                <Button size="sm" variant="destructive" className="w-full">
                  Delete
                </Button>
              </div>
            </div>
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
    </div>
  );
};

export default UsersPage;
