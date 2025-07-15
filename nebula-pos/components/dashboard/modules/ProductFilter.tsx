"use client";

import { useState, FormEvent } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ScanLine, ArrowUpDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const sortOptions = [
  { value: "default", label: "Predeterminado" },
  { value: "popular", label: "Más popular" },
  { value: "alphabetical", label: "Orden alfabético (A-Z)" },
  { value: "alphabetical-desc", label: "Orden alfabético (Z-A)" },
]

export default function ProductFilter({ categories }: { categories: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [barcodeInput, setBarcodeInput] = useState(searchParams.get("search") || ""); //obtene
  const [activeTab, setActiveTab] = useState<"category" | "brand">("category");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get("brand") || "");
  const [sortBy, setSortBy] = useState("default")


  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    updateParams("search", barcodeInput);
  };

  const handleScan = () => {
    updateParams("search", barcodeInput);
  };

  const handleSelectCategory = (id: string) => {
    setSelectedCategory(id);
    updateParams("category", id);
  };

  const handleSelectBrand = (brand: string) => {
    setSelectedBrand(brand);
    updateParams("brand", brand);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    updateParams("sort", sort)
  }

  return (
    <div className="w-full p-4 bg-white rounded-lg border border-slate-300 shadow-sm">
      {/* Barcode Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={barcodeInput}
            onChange={(e) => setBarcodeInput(e.target.value)}
            className="pl-10 h-10 bg-gray-100 border-0 shadow-sm"
          />
        </div>
        <Button type="submit" onClick={handleScan} className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white">
          <ScanLine className="h-4 w-4 mr-2" />
          Escanear
        </Button>
      </form>

      {/* Tabs */}
      <div className="mb-4 flex justify-between border-b border-slate-200">
        <div className="flex items-center gap-8 ">
          <button
            onClick={() => setActiveTab("category")}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative ${activeTab === "category" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            Filtrar por categoría
            {activeTab === "category" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
          </button>
          <button
            onClick={() => setActiveTab("brand")}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-colors relative ${activeTab === "brand" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-1.414-.586H13l-2.5 2.5" />
              <path d="m14 12 3 3" />
            </svg>
            Filtro por marca
            {activeTab === "brand" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"></div>}
          </button>

        </div>
        <div className="flex items-center">
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="h-8 w-[180px] text-xs border-0 bg-gray-50 focus:ring-0">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="h-3 w-3 text-gray-500" />
                  <SelectValue placeholder="Ordenar por" />
                </div>
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-xs">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

      </div>

      {/* Filter Content */}
      {activeTab === "category" && (
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleSelectCategory(category)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md border text-sm ${selectedCategory === category
                ? "bg-blue-50 border-blue-200 text-blue-700"
                : "bg-gray-50 border-slate-200 text-gray-700 hover:bg-slate-100"
                }`}
            >
              {/* Reemplazamos img por un ícono */}
              <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
              </svg>
              {category}
            </button>
          ))}
        </div>
      )}

      {/*{activeTab === "brand" && (
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => handleSelectBrand(brand)}
              className={`px-3 py-1.5 rounded-md border text-sm ${
                selectedBrand === brand
                  ? "bg-blue-50 border-blue-200 text-blue-700"
                  : "bg-gray-50 border-slate-200 text-gray-700 hover:bg-slate-100"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      )}*/}
    </div>
  );
}
