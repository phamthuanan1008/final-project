import React, { useState, useRef, useEffect } from "react";

interface NavbarProps {
    onSearch: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [value, setValue] = useState("");
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setValue(text);
        onSearch(text); // 🔥 đẩy text lên Shop
    };

    return (
        <div className="navbar-custom">
            <div className="navbar-right" ref={searchRef}>
                <button
                    className="search-toggle"
                    onClick={() => setShowSearch(prev => !prev)}
                >
                    <i className="zmdi zmdi-search"></i>
                </button>

                <div className={`search-wrapper ${showSearch ? "active" : ""}`}>
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
