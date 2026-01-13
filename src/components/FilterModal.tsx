import React, { useState, useEffect, useMemo } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import {
  Filter as FilterIcon,
  X,
  ArrowUp,
  ArrowDown,
  Calendar,
  RefreshCw,
} from "react-feather";
import Select, { StylesConfig } from "react-select";

// Dummy t function for translation if not using a library like react-i18next
// In a real app, you'd import { useTranslation } from 'react-i18next'
const t = (key: string) => key;

// DateRangePicker is missing from your project, adding a placeholder
const DateRangePicker = ({ fromValue, toValue, onFromChange, onToChange, ...props }: any) => (
  <div className="d-flex gap-2">
     <input type="date" value={fromValue} onChange={(e) => onFromChange(e.target.value)} className="form-control" />
     <input type="date" value={toValue} onChange={(e) => onToChange(e.target.value)} className="form-control" />
  </div>
);

export interface FilterState {
  sort_by: string;
  sort_dir: string;
  date_col: string;
  from_date: string;
  to_date: string;
  [key: string]: string | undefined;
}

export interface StatusConfig {
  is_active?: boolean;
  is_verified?: boolean;
  deleted_at?: boolean;
  is_paid?: boolean;
  insurance_enabled_default?: boolean;
}

interface FilterModalProps {
  show: boolean;
  onClose: () => void;
  onApply: (filter: Partial<FilterState>) => void;
  allowedSort?: string[];
  statusConfig?: StatusConfig;
  allowedDateCols?: string[];
  defaultFilter?: Partial<FilterState>;
}

const INTERNAL_DEFAULT_FILTER: FilterState = {
  sort_by: "",
  sort_dir: "ASC",
  date_col: "",
  from_date: "",
  to_date: "",
};

const FilterModal: React.FC<FilterModalProps> = ({
  show,
  onClose,
  onApply,
  allowedSort = [],
  statusConfig = {},
  allowedDateCols = [],
  defaultFilter = {},
}) => {
  const mergedDefault = useMemo<FilterState>(
    () => ({ ...INTERNAL_DEFAULT_FILTER, ...defaultFilter }),
    [defaultFilter]
  );

  const hasStatus = statusConfig && Object.values(statusConfig).some(Boolean);

  const [filter, setFilter] = useState<FilterState>(mergedDefault);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (show) setFilter(mergedDefault);
  }, [show, mergedDefault]);

  const getLabelColor = (value: string) => {
    if (value === "1") return "#198754";
    if (value === "0") return "#dc3545";
    return "#6c757d";
  };

  const sortOptions = allowedSort.map((col) => ({
    value: col,
    label: t(`filter.${col}`),
  }));

  const dateColOptions = allowedDateCols.map((col) => ({
    value: col,
    label: t(`filter.${col}`),
  }));

  interface RadioStatusProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    yesLabel: string;
    noLabel: string;
  }

  const RadioStatus: React.FC<RadioStatusProps> = ({ label, value, onChange, yesLabel, noLabel }) => {
    const options = [
      { value: "", label: t("filter.none") },
      { value: "1", label: yesLabel },
      { value: "0", label: noLabel },
    ];

    return (
      <div className="p-2 border rounded-3">
        <div className="d-flex flex-lg-nowrap flex-wrap justify-content-between ps-2 pe-2">
          <span
            className="fw-bold fw-medium"
            style={{ color: getLabelColor(value) }}
          >
            {label}
          </span>
          <div className="d-flex gap-4 flex-wrap">
            {options.map((opt) => (
              <label
                key={opt.value}
                className="d-flex align-items-center gap-2"
                style={{ cursor: "pointer" }}
              >
                <input
                  type="radio"
                  name={label}
                  value={opt.value}
                  checked={value === opt.value}
                  onChange={() => onChange(opt.value)}
                  style={{
                    accentColor:
                      opt.value === "1"
                        ? "#198754"
                        : opt.value === "0"
                          ? "#dc3545"
                          : "#6c757d",
                  }}
                />
                <span className="fs-bold">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    );
  };

  interface StatusToggleProps {
    label: string;
    value: string;
    onChange: (val: string) => void;
    color: string;
  }

  const StatusToggle: React.FC<StatusToggleProps> = ({ label, value, onChange, color }) => (
    <div className="d-flex align-items-center justify-content-between p-2 border rounded-3">
      <span className="small fw-medium">{label}</span>

      <div
        onClick={() => onChange(value === "1" ? "" : "1")}
        style={{
          width: 42,
          height: 22,
          borderRadius: 20,
          cursor: "pointer",
          background: value === "1" ? color : "#dee2e6",
          position: "relative",
          transition: "all .2s",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            position: "absolute",
            top: 2,
            left: value === "1" ? 22 : 2,
            transition: "all .2s",
          }}
        />
      </div>
    </div>
  );

  const sortDirOptions = [
    {
      value: "ASC",
      label: t("filter.ascending"),
      icon: <ArrowUp size={14} className="me-2" />,
    },
    {
      value: "DESC",
      label: t("filter.descending"),
      icon: <ArrowDown size={14} className="me-2" />,
    },
  ];

  const customSelectStyles: StylesConfig<any, false> = {
    control: (base) => ({
      ...base,
      borderRadius: "8px",
      borderColor: "#e2e8f0",
      boxShadow: "none",
      "&:hover": { borderColor: "#cbd5e1" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#0d6efd" : base.backgroundColor,
    }),
  };

  const normalizeFilter = (raw: FilterState): Partial<FilterState> => {
    const payload: Partial<FilterState> = {};

    // SORT
    if (raw.sort_by) {
      payload.sort_by = raw.sort_by;
      payload.sort_dir = raw.sort_dir || "ASC";
    }

    // DATE
    if (raw.date_col && raw.from_date && raw.to_date) {
      payload.date_col = raw.date_col;
      payload.from_date = raw.from_date;
      payload.to_date = raw.to_date;
    }

    // STATUS
    (["is_active", "is_verified", "is_paid", "insurance_enabled_default"] as const).forEach((key) => {
      if (raw[key] === "0" || raw[key] === "1") {
        payload[key] = raw[key];
      }
    });

    if (raw.deleted_at === "not_null") {
      payload.deleted_at = "not_null";
    }

    return payload;
  };

  const handleApply = () => {
    if (filter.date_col) {
      if (!filter.from_date || !filter.to_date) {
        setErrorMessage(t("filter.error_date_required"));
        return;
      }
    }

    onApply(normalizeFilter(filter));
    requestAnimationFrame(onClose);
  };

  const handleReset = () => {
    const reset = { ...INTERNAL_DEFAULT_FILTER };

    if (!statusConfig.is_active) delete (reset as any).is_active;
    if (!statusConfig.is_verified) delete (reset as any).is_verified;
    if (!statusConfig.deleted_at) delete (reset as any).deleted_at;
    if (!statusConfig.is_paid) delete (reset as any).is_paid;
    if (!statusConfig.insurance_enabled_default) delete (reset as any).insurance_enabled_default;

    setFilter(reset);
    onApply({});
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered size="sm">
      <Modal.Header className="border-0 px-4 pt-4 d-flex justify-content-between">
        <Modal.Title className="fw-bold d-flex align-items-center gap-2">
          <FilterIcon size={20} className="text-primary" />
          {t("filter.title")}
        </Modal.Title>
        <Button variant="link" className="p-0" onClick={onClose}>
          <X size={22} />
        </Button>
      </Modal.Header>

      <Modal.Body className="px-4 py-3">
        {/* SORT */}
        <h6 className="fw-bold text-muted mb-3">{t("filter.ordering")}</h6>
        <Row className="g-3 mb-4">
          <Col md={7}>
            <label className="form-label small">{t("filter.sort_field")}</label>
            <Select
              styles={customSelectStyles}
              options={sortOptions}
              isClearable
              placeholder={t("filter.select_placeholder")}
              value={sortOptions.find((o) => o.value === filter.sort_by)}
              onChange={(opt: any) =>
                setFilter((prev) => ({ ...prev, sort_by: opt?.value || "" }))
              }
            />
          </Col>
          <Col md={5}>
            <label className="form-label small">{t("filter.direction")}</label>
            <Select
              styles={customSelectStyles}
              options={sortDirOptions}
              value={sortDirOptions.find((o) => o.value === filter.sort_dir)}
              onChange={(opt: any) =>
                setFilter((prev) => ({ ...prev, sort_dir: opt?.value || "ASC" }))
              }
              // getOptionLabel={(e: any) => (
              //   <div className="d-flex align-items-center">
              //     {e.icon} {e.label}
              //   </div>
              // )}
            />
          </Col>
        </Row>

        <hr />

        {/* STATUS */}
        {hasStatus && (
          <>
            <hr />

            <h6 className="fw-bold text-muted mb-3">{t("filter.status")}</h6>

            <Row className="g-3 mb-4">
              {statusConfig?.is_active && (
                <Col md={12}>
                  <RadioStatus
                    label={t("filter.active")}
                    value={filter.is_active}
                    yesLabel={t("filter.yes")}
                    noLabel={t("filter.no")}
                    onChange={(val) =>
                      setFilter((prev) => ({ ...prev, is_active: val }))
                    }
                  />
                </Col>
              )}
              {statusConfig?.is_verified && (
                <Col md={12}>
                  <RadioStatus
                    label={t("filter.verified")}
                    value={filter.is_verified}
                    yesLabel={t("filter.yes")}
                    noLabel={t("filter.no")}
                    onChange={(val) =>
                      setFilter((prev) => ({ ...prev, is_verified: val }))
                    }
                  />
                </Col>
              )}

              {statusConfig?.is_paid && (
                <Col md={12}>
                  <RadioStatus
                    label={t("filter.is_paid")}
                    value={filter.is_paid}
                    yesLabel={t("filter.yes")}
                    noLabel={t("filter.no")}
                    onChange={(val) =>
                      setFilter((prev) => ({ ...prev, is_paid: val }))
                    }
                  />
                </Col>
              )}

              {statusConfig?.insurance_enabled_default && (
                <Col md={12}>
                  <RadioStatus
                    label={t("filter.insurance_enabled_default")}
                    value={filter.insurance_enabled_default}
                    yesLabel={t("filter.yes")}
                    noLabel={t("filter.no")}
                    onChange={(val) =>
                      setFilter((prev) => ({ ...prev, insurance_enabled_default: val }))
                    }
                  />
                </Col>
              )}

              {statusConfig?.deleted_at && (
                <Col md={12}>
                  <StatusToggle
                    label={t("filter.deleted")}
                    value={filter.deleted_at === "not_null" ? "1" : ""}
                    color="#dc3545"
                    onChange={(val) =>
                      setFilter((prev) => ({
                        ...prev,
                        deleted_at: val ? "not_null" : "",
                      }))
                    }
                  />
                </Col>
              )}
            </Row>
          </>
        )}

        {/* DATE */}
        <h6 className="fw-bold text-muted mb-3">{t("filter.time_range")}</h6>

        <Select
          styles={customSelectStyles}
          options={dateColOptions}
          isClearable
          placeholder={t("filter.select_placeholder")}
          value={dateColOptions.find((o) => o.value === filter.date_col)}
          onChange={(opt: any) =>
            setFilter((prev) => ({ ...prev, date_col: opt?.value || "" }))
          }
        />

        {filter.date_col ? (
          <div className="mt-3">
            <DateRangePicker
              fromValue={filter.from_date}
              toValue={filter.to_date}
              onFromChange={(from: string) => {
                setFilter((prev) => ({ ...prev, from_date: from }));
                if (errorMessage) setErrorMessage("");
              }}
              onToChange={(to: string) => {
                setFilter((prev) => ({ ...prev, to_date: to }));
                if (errorMessage) setErrorMessage("");
              }}
              showTime={false}
              allowClear
            />
            {errorMessage && (
              <div className="form-text text-danger mt-2">{errorMessage}</div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted">
            <Calendar size={32} className="opacity-25 mb-2" />
            <div>{t("filter.date_prompt")}</div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 px-4 pb-4 d-flex justify-content-between">
        <Button variant="light" onClick={handleReset}>
          <RefreshCw size={14} className="me-1" />
          {t("filter.reset")}
        </Button>
        <div className="d-flex gap-3">
          <Button variant="secondary" onClick={onClose}>
            {t("filter.cancel")}
          </Button>
          <Button variant="primary" onClick={handleApply}>
            {t("filter.apply")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
