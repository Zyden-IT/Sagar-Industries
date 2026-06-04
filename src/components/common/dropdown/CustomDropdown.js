import { CaretDownIcon } from "@phosphor-icons/react";
import { default as ReactSelect, components } from "react-select";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon size={16} weight="bold" className="text-text-primary" />
      </components.DropdownIndicator>
    )
  );
};

const customStyles = {
  container: (base) => ({
    ...base,
    borderRadius: "10px",
  }),

  control: (base, state) => {
    const hasError = state.selectProps.className && state.selectProps.className.includes("error");

    return {
      ...base,
      minHeight: "45px",
      height: "45px",
      backgroundColor: "rgba(var(--color-muted-rgb), 0.4)",
      borderRadius: "10px",
      padding: "0 10px",
      fontSize: "16px",
      fontFamily: "Jost, sans-serif",
      color: "var(--color-text)",
      cursor: "pointer",

      border: hasError ? "1.5px solid #ff0000" : "1.5px solid var(--color-border)",

      boxShadow: "none",

      "&:hover": {
        borderColor: hasError ? "#ff0000" : "",
      },
    };
  },

  valueContainer: (base) => ({
    ...base,
    height: "45px",
    padding: "0",
    display: "flex",
    alignItems: "center",
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "var(--color-text)",
  }),

  singleValue: (base) => ({
    ...base,
    color: "var(--color-text)",
    fontSize: "16px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "var(--color-text)",
    opacity: 0.55,
    fontSize: "14px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 6px",
  }),

  menu: (base) => ({
    ...base,
    backgroundColor: "var(--color-card)",
    borderRadius: "12px",
    border: "1px solid var(--color-border)",
    marginTop: "6px",
    zIndex: 999999,
  }),

  menuList: (base) => ({
    ...base,
    padding: "6px",
  }),

  option: (base, { isFocused, isSelected }) => ({
    ...base,
    fontSize: "14px",
    fontFamily: "Jost, sans-serif",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s ease",

    backgroundColor: isSelected
      ? "rgba(var(--color-primary-rgb, 0,184,229), 0.4)"
      : isFocused
        ? "rgba(var(--color-muted-rgb), 0.95)"
        : "transparent",

    color: isSelected ? "var(--color-heading)" : "var(--color-text)",
  }),
};

const Selector = (props) => {
  const optionsList = props.allowSelectAll
    ? [{ label: "Select All", value: "*" }, ...props.options]
    : props.options;

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
        styles={{
          ...customStyles,
          menuPortal: (base) => ({ ...base, zIndex: 999999 }),
        }}
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
