import { CaretDownIcon } from "@phosphor-icons/react";
import { default as ReactSelect, components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon
          size={16}
          weight="bold"
          className={`text-text-secondary transition-transform duration-200 ${props.selectProps.menuIsOpen ? "rotate-180" : ""}`}
        />
      </components.DropdownIndicator>
    )
  );
};

// Theme-driven styles — every colour is a CSS var from global.css, so the
// dropdown adapts to light/dark automatically and matches the site inputs
// (bg-soft surface · 1.5px border · 10px radius · accent focus ring).
const customStyles = {
  container: (base) => ({
    ...base,
    borderRadius: "10px",
  }),

  control: (base, state) => {
    const hasError =
      state.selectProps.className && state.selectProps.className.includes("error");

    return {
      ...base,
      minHeight: "46px",
      backgroundColor: "var(--color-input)",
      borderRadius: "10px",
      padding: "0 6px",
      fontSize: "15px",
      fontFamily: "var(--font-body), Inter, sans-serif",
      color: "var(--color-text-primary)",
      cursor: "pointer",
      transition: "border-color 0.2s ease, box-shadow 0.2s ease",

      border: hasError
        ? "1.5px solid var(--color-secondary)"
        : `1.5px solid ${state.isFocused ? "var(--color-accent)" : "var(--color-border)"}`,

      boxShadow: state.isFocused
        ? "0 0 0 4px rgba(245, 132, 42, 0.15)"
        : "none",

      "&:hover": {
        borderColor: hasError ? "var(--color-secondary)" : "var(--color-accent)",
      },
    };
  },

  valueContainer: (base) => ({
    ...base,
    padding: "2px 8px",
    display: "flex",
    alignItems: "center",
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "var(--color-text-primary)",
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--color-text-primary)",
    fontSize: "15px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--color-text-secondary)",
    opacity: 0.7,
    fontSize: "14px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-card)",
    borderRadius: "12px",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-card)",
    marginTop: "6px",
    overflow: "hidden",
    zIndex: 999999,
  }),

  menuList: (base) => ({
    ...base,
    padding: "6px",
  }),

  option: (base, { isFocused, isSelected }) => ({
    ...base,
    fontSize: "14px",
    fontFamily: "var(--font-body), Inter, sans-serif",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.15s ease",

    backgroundColor: isSelected
      ? "var(--color-accent)"
      : isFocused
        ? "var(--color-bghover)"
        : "transparent",

    color: isSelected ? "#ffffff" : "var(--color-text-primary)",

    "&:active": {
      backgroundColor: isSelected ? "var(--color-accent)" : "var(--color-bghover)",
    },
  }),
};

const Selector = (props) => {
  const optionsList = props.allowSelectAll
    ? [{ label: "Select All", value: "*" }, ...props.options]
    : props.options;

  // Let callers extend (not replace) the theme styles per slot — each override
  // receives the already-themed base so defaults are preserved. Used e.g. by
  // icon-prefixed fields that need extra left padding to clear the icon.
  const styleOverrides = props.styles || {};
  const mergedStyles = { ...customStyles };
  Object.keys(styleOverrides).forEach((slot) => {
    const themed = customStyles[slot];
    const override = styleOverrides[slot];
    mergedStyles[slot] = (base, state) =>
      override(themed ? themed(base, state) : base, state);
  });
  mergedStyles.menuPortal = (base) => ({ ...base, zIndex: 999999 });

  return (
    <span
      className="d-inline-block custom-input"
      data-toggle="popover"
      data-trigger="focus"
      data-content="Please select account(s)"
    >
      <ReactSelect
        className="custom-checkbox-select"
        components={{ DropdownIndicator }}
        {...props}
        options={optionsList}
        menuPortalTarget={typeof window !== "undefined" ? document.body : null}
        menuPosition="fixed"
        classNamePrefix="cdd"
        styles={mergedStyles}
        onChange={(selected) => {
          if (
            selected !== null &&
            selected.length > 0 &&
            (selected[selected.length - 1].value === "*" ||
              selected[selected.length - 1].value === props.allOption?.value)
          ) {
            return props.onChange(props.options, props.drpIdentity);
          }
          return props.onChange(selected, props.drpIdentity);
        }}
        placeholder={props.placeholder || "Select option"}
        isMulti={props.isMulti}
      />
    </span>
  );
};

export default Selector;
