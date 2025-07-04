import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { menuList } from "@/data/menu";
import { selectCategories } from "@/redux/slices/category/category";
import { useSelector } from "react-redux";

const BusinessDropdown = () => {
  const categories = useSelector(selectCategories);
  const pathname = usePathname();
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State management
  const [isBusinessOpen, setIsBusinessOpen] = useState(false);
  const [isCorporateOpen, setIsCorporateOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Set initial hovered category when dropdown opens
  useEffect(() => {
    if (isBusinessOpen && categories?.length > 0 && !hoveredCategory) {
      setHoveredCategory(categories[0]._id);
    }
  }, [isBusinessOpen, categories, hoveredCategory]);

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scaleY: 0.95,
      transformOrigin: "top",
    },
    visible: {
      opacity: 1,
      y: 0,
      scaleY: 1,
      transformOrigin: "top",
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 22,
        mass: 0.75,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      scaleY: 0.96,
      transformOrigin: "top",
      transition: {
        duration: 0.15,
        ease: "easeInOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 450,
        damping: 22,
      },
    },
  };

  // Hover animation for menu items
  const hoverAnimation = {
    initial: { x: 0, color: "#374151" }, // Default gray-700 text
    hover: {
      x: 3,
      color: "#f2775e", // Theme orange color
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 18,
      },
    },
  };

  const hoverSubAnimations = {
    initial: { x: 0, color: "rgb(255, 255, 255)" }, // Default gray-700 text
    hover: {
      x: 3,
      color: "rgb(0, 0, 0)", // Theme orange color
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 18,
      },
    },
  };

  // Main wrapper styles for dropdown menus - using lighter backgrounds
  const dropdownStyles = {
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
    border: "1px solid rgba(245, 245, 250, 0.95)",
    background: "rgb(255, 255, 255)",
    padding: "8px 0",
  };

  // Nested dropdown styles - even lighter background
  const nestedDropdownStyles = {
    borderRadius: "5px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.03)",
    border: "1px solid rgba(248, 248, 252, 0.97)",
    background: " rgb(240, 112, 87)",
    padding: "6px 0",
    marginLeft: "10px",
    marginRight: "10px",
  };

  // Handle mouse events for main dropdown
  const handleMouseEnter = () => {
    setIsBusinessOpen(true);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsBusinessOpen(false);
    setIsCorporateOpen(false);
    setIsHovered(false);
  };

  // Handle click events to ensure only clicked dropdowns open
  const toggleBusinessDropdown = (e) => {
    e.preventDefault();
    setIsBusinessOpen(!isBusinessOpen);

    // Close corporate dropdown when business dropdown is closed
    if (isBusinessOpen) {
      setIsCorporateOpen(false);
    }
  };

  const toggleCorporateDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setIsCorporateOpen(!isCorporateOpen);
  };

  // Check if path is active
  const isActive = (path) => pathname.startsWith(path);

  return (
    <li
      className="menu-item-has-children relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main Business Link */}
      <a
        data-barba
        className="courseMainLink"
        style={{ cursor: "pointer", marginTop: "3px" }}
        onMouseOver={() => setHoveredLink("business")}
        onMouseOut={() => setHoveredLink(null)}
      >
        <span
          style={{
            color: isHovered || isActive("/business") ? "#F3D66A" : "#fff", // Soft yellow text for active or hover
          }}
        >
          Business
        </span>
        <motion.i
          className="icon-chevron-down text-13 ml-10"
          animate={isDropdownOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: isHovered || isActive("/business") ? "#F3D66A" : "#fff", // Soft yellow for icon on hover/active
          }}
        />
      </a>

      {/* Main Dropdown Menu */}
      <AnimatePresence>
        {isBusinessOpen && (
          <motion.ul
            className="subnav absolute left-0 mt-0 min-w-52 z-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={dropdownVariants}
            style={dropdownStyles}
          >
            {/* Corporate Submenu Item */}
            <li
              className="menu-item-has-children relative"
              onClick={(e) => e.stopPropagation()} // Prevent closing parent when clicking this item
            >
              <motion.div
                variants={itemVariants}
                whileHover="hover"
                initial="initial"
              >
                <Link
                  href="#"
                  onClick={toggleCorporateDropdown}
                  className={`flex items-center justify-between px-4 py-2 text-sm hover:bg-white transition-colors duration-200 ${
                    isActive("/corporate") ? "text-orange-1 font-medium" : ""
                  }`}
                >
                  <motion.span variants={hoverAnimation}>Corporate</motion.span>
                  <motion.div
                    variants={hoverAnimation}
                    className="icon-chevron-down text-11"
                    animate={isCorporateOpen ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>

              {/* Corporate Submenu Dropdown */}
              <AnimatePresence>
                {isCorporateOpen && (
                  <motion.ul
                    className="ml-2 mt-1 rounded-lg overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    style={nestedDropdownStyles}
                  >
                    {menuList[0].links[0].links.map((item, idx) => (
                      <motion.li
                        key={idx}
                        variants={itemVariants}
                        whileHover="hover"
                        initial="initial"
                        className={isActive(item.href) ? "bg-gray-50" : ""}
                      >
                        <Link href={item.href}>
                          <motion.span variants={hoverSubAnimations}>
                            {item.label}
                          </motion.span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Other Business Menu Items */}
            {menuList[0].links
              .filter((item) => item.href)
              .map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  whileHover="hover"
                  initial="initial"
                  className={isActive(item.href) ? "bg-gray-100" : ""}
                >
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 text-sm hover:bg-white transition-colors duration-200 ${
                      isActive(item.href) ? "text-orange-1 font-medium" : ""
                    }`}
                  >
                    <motion.span variants={hoverAnimation}>
                      {item.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
};

export default BusinessDropdown;
