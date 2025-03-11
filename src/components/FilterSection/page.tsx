"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronDown, Filter, X } from 'lucide-react';
import { useDataFetch } from '@/hooks/useDataFetch';

// Define a type for the filter options
type FilterOption = string | number;

// Define a type for the filter categories
type FilterCategory = {
  name: string;
  options: FilterOption[];
};

const FilterSection = () => {
  const router = useRouter();
  const { data, loading, error } = useDataFetch();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, FilterOption>>({});
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([]);

  useEffect(() => {
    if (!loading && data.length > 0) {

      const attributes = [
        "County",
        "City",
        "State",
        "Postal Code",
        "Model Year",
        "Make",
        "Model",
        "Electric Vehicle Type",
        "Clean Alternative Fuel Vehicle (CAFV)",
        "Electric Range",
        "Base MSRP",
        "Legislative District",
        "Electric Utility"
      ];
      
      const filters = attributes.map(attribute => {
        const uniqueValues = [...new Set(data.map(item => item[attribute]))].filter(Boolean);
        
        if (attribute === "Electric Range" || attribute === "Base MSRP" || attribute === "Model Year") {
          let options: FilterOption[] = [];
          
          if (attribute === "Electric Range") {
            options = ["0-100", "101-200", "201-300", "301-400", "400+"];
          } else if (attribute === "Base MSRP") {
            options = ["Under $30k", "$30k-$50k", "$50k-$75k", "$75k-$100k", "Over $100k"];
          } else if (attribute === "Model Year") {
            // Fix: Add type assertion and handle null values properly
            const years = uniqueValues as (number | null)[];
            const nonNullYears = years.filter((year): year is number => year !== null).sort();
            options = nonNullYears.map(year => year.toString());
          }
          
          return {
            name: attribute,
            options: options
          };
        }
        
        return {
          name: attribute,
          options: uniqueValues.sort() as FilterOption[]
        };
      });
      
      setFilterCategories(filters);
    }
  }, [data, loading]);

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const selectOption = (category: string, option: FilterOption) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: option
    });
  };

  const clearFilter = (category: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[category];
    setSelectedFilters(newFilters);
  };

  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    Object.entries(selectedFilters).forEach(([key, value]) => {
      queryParams.append(key.replace(/\s+/g, '_').toLowerCase(), String(value));
    });
    
    router.push(`/dashboard?${queryParams.toString()}`);
  };
  
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 max-w-6xl mx-auto my-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 max-w-6xl mx-auto my-8">
        <p className="text-red-500 text-center">Error loading data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 max-w-6xl mx-auto my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Filter className="mr-2" size={24} />
          Filter Electric Vehicles
        </h2>
        
        {Object.keys(selectedFilters).length > 0 && (
          <button 
            onClick={() => setSelectedFilters({})}
            className="text-sm text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            Clear All Filters
          </button>
        )}
      </div>
      
      {Object.keys(selectedFilters).length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(selectedFilters).map(([category, option]) => (
            <div 
              key={category} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm"
            >
              <span>{category}: {option}</span>
              <button 
                onClick={() => clearFilter(category)}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filterCategories.map((category, index) => (
          <div key={index} className="relative">
            <button
              onClick={() => toggleDropdown(index)}
              className="w-full text-left px-4 py-3 border rounded-lg flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="font-medium text-gray-800 dark:text-gray-200">{category.name}</span>
              <motion.div
                animate={{ rotate: openDropdown === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openDropdown === index && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                  className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                    {category.options.length > 0 ? (
                      category.options.map((option, optIndex) => (
                        <motion.button
                          key={optIndex}
                          onClick={() => {
                            selectOption(category.name, option);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                            selectedFilters[category.name] === option 
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                          whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {option}
                        </motion.button>
                      ))
                    ) : (
                      <p className="px-4 py-2 text-gray-500 dark:text-gray-400">No options available</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <motion.button
          onClick={applyFilters}
          className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md ${
            Object.keys(selectedFilters).length === 0 ? 
            'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          whileHover={Object.keys(selectedFilters).length > 0 ? { scale: 1.03 } : {}}
          whileTap={Object.keys(selectedFilters).length > 0 ? { scale: 0.98 } : {}}
          disabled={Object.keys(selectedFilters).length === 0}
        >
          Apply Filters & View Dashboard
        </motion.button>
      </div>
    </div>
  );
};

export default FilterSection;