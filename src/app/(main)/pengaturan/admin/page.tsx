"use client";

import * as z from "zod";

import { register } from "@/actions/register";
import { RoleGate } from "@/components/auth/role-gate";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/contexts/PageTitleContext";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserRole } from "@prisma/client";
import { Edit, Eye, EyeOff, Trash, UserPlus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export default function AdminPage() {
  const { setTitle } = usePageTitle();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data); // Set users if data is an array
      } else {
        setUsers([]); // Fallback to empty array if data is not an array
        console.error("Fetched data is not an array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    // Logic untuk menambah pengguna baru
  };
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handleEditUser = (userId: string) => {
    // Logic untuk mengedit pengguna
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      const res = await fetch(`/api/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        fetchUsers();
      } else {
        console.error("Failed to delete user.");
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setTitle("User Management");
    fetchUsers();
  }, [setTitle]);

  return (
    <div className="p-4">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <Card className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              User Management
            </h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={handleAddUser}>
                  <UserPlus className="mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="email@example.com"
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="*******"
                                type="password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Your Name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button
                      disabled={isPending}
                      type="submit"
                      className="w-full"
                    >
                      Create an account
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Role
                    </th>
                    <th className="p-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-none hover:bg-gray-50"
                    >
                      <td className="p-4 text-sm text-gray-800">{user.name}</td>
                      <td className="p-4 text-sm text-gray-800">
                        {user.email}
                      </td>
                      <td className="p-4 text-sm text-gray-800">{user.role}</td>

                      <td className="p-4 flex gap-2">
                        <Button
                          onClick={() => handleEditUser(user.id)}
                          variant="outline"
                          className="flex items-center text-gray-600 hover:text-blue-500"
                        >
                          <Edit size={16} />
                        </Button>
                        {/* <Button
                          onClick={() =>
                            handleToggleUserStatus(user.id, user.isActive)
                          }
                          variant="outline"
                          className="flex items-center text-gray-600 hover:text-yellow-500"
                        >
                          {user.isActive ? (
                            <EyeOff size={16} />
                          ) : (
                            <Eye size={16} />
                          )}
                        </Button> */}
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          variant="outline"
                          className="flex items-center text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </RoleGate>
    </div>
  );
}
