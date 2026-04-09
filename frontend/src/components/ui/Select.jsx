import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  className = "",
  searchable = false,
  ariaLabel,
}) {
  const rootRef = useRef(null);
  const searchRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const normalizedOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option,
      ),
    [options],
  );

  const selectedOption = normalizedOptions.find((option) => option.value === value);
  const hasSearch = searchable || normalizedOptions.length > 8;
  const filteredOptions = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return normalizedOptions;

    return normalizedOptions.filter((option) =>
      option.label.toLowerCase().includes(term),
    );
  }, [normalizedOptions, query]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (open && hasSearch) {
      window.setTimeout(() => searchRef.current?.focus(), 0);
    }
  }, [hasSearch, open]);

  const chooseOption = (option) => {
    onChange?.(option.value);
    setOpen(false);
    setQuery("");
  };

  const handleKeyDown = (event) => {
    if (!open && ["Enter", " ", "ArrowDown"].includes(event.key)) {
      event.preventDefault();
      setHighlightedIndex(0);
      setOpen(true);
      return;
    }

    if (!open) return;

    if (event.key === "Escape" || event.key === "Tab") {
      setOpen(false);
      setQuery("");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((current) =>
        Math.min(current + 1, Math.max(filteredOptions.length - 1, 0)),
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === "Enter" && filteredOptions[highlightedIndex]) {
      event.preventDefault();
      chooseOption(filteredOptions[highlightedIndex]);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`} onKeyDown={handleKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || placeholder}
        onClick={() => {
          setHighlightedIndex(0);
          setOpen((current) => !current);
        }}
        className="flex h-12 w-full items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-3.5 text-left text-sm font-medium text-gray-700 shadow-sm transition duration-200 hover:border-gray-300 hover:shadow-md focus:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100"
      >
        <span className={selectedOption ? "truncate" : "truncate text-gray-500"}>
          {selectedOption?.label || placeholder}
        </span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-gray-400 transition duration-200 ${
            open ? "rotate-180 text-green-600" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 origin-top rounded-xl border border-gray-100 bg-white p-1.5 shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition duration-150">
          {hasSearch && (
            <label className="mb-1.5 flex h-10 items-center gap-2 rounded-lg bg-gray-50 px-3 text-gray-400">
              <Search size={15} />
              <input
                ref={searchRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlightedIndex(0);
                }}
                placeholder="Search..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm font-medium text-gray-700 outline-none placeholder:text-gray-500"
              />
            </label>
          )}

          <div role="listbox" className="max-h-64 space-y-1 overflow-y-auto">
            {filteredOptions.map((option, index) => {
              const selected = option.value === value;
              const highlighted = index === highlightedIndex;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => chooseOption(option)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition duration-150 ${
                    selected
                      ? "bg-green-50 font-semibold text-green-800"
                      : highlighted
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && <Check size={15} className="text-green-600" />}
                </button>
              );
            })}

            {filteredOptions.length === 0 && (
              <p className="px-3 py-3 text-sm font-medium text-gray-400">
                No options found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
