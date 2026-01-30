import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { backendUrl } from "@/config";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Decorations");
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);

      images.forEach((img, i) => {
        img && formData.append(`image${i + 1}`, img);
      });

      const res = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setDescription("");
        setPrice("");
        setImages([null, null, null, null]);
        setBestseller(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FULL SCREEN LOADER */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <Loader2 className="h-10 w-10 text-white animate-spin" />
        </div>
      )}

      <div className="flex justify-center px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-4xl shadow-sm">
          <CardHeader className="border-b">
            <CardTitle className="text-xl">Add New Product</CardTitle>
          </CardHeader>

          <CardContent className="pt-8">
            <form onSubmit={onSubmitHandler} className="space-y-8">
              {/* Images */}
              <div>
                <Label className="mb-3 block font-medium">Product Images</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {images.map((img, index) => (
                    <label
                      key={index}
                      className="relative flex items-center justify-center h-28 rounded-lg border border-dashed cursor-pointer hover:border-black transition"
                    >
                      <img
                        src={
                          img ? URL.createObjectURL(img) : assets.upload_area
                        }
                        alt="upload"
                        className={`object-cover ${
                          img ? "w-full h-full rounded-lg" : "w-10 opacity-60"
                        }`}
                      />
                      <input
                        type="file"
                        hidden
                        onChange={(e) =>
                          handleImageChange(index, e.target.files[0])
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label>Product Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Handmade Cane Basket"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write product details..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Decorations">Decorations</SelectItem>
                      <SelectItem value="Gifts">Gifts</SelectItem>
                      {/* <SelectItem value="Kids">Kids</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="500"
                    required
                  />
                </div>
              </div>

              {/* Bestseller */}
              <div className="flex items-center gap-3">
                <Checkbox
                  id="bestseller"
                  checked={bestseller}
                  onCheckedChange={() => setBestseller((p) => !p)}
                />
                <Label htmlFor="bestseller">
                  Mark this product as Bestseller
                </Label>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Add Product
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Add;
