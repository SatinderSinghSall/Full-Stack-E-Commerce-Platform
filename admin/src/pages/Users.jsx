import React, { useEffect, useState } from "react";
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

const UsersPage = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <Users className="h-6 w-6" />
          Users
        </h1>
        <p className="text-sm text-muted-foreground">Manage registered users</p>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {loading ? (
            <p className="text-center py-8 text-muted-foreground">
              Loading users...
            </p>
          ) : users.length === 0 ? (
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
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user.name}</TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Badge variant="default">Active</Badge>
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
  );
};

export default UsersPage;
