"use client";

import { useState, useRef, useEffect } from "react";

const WLDateRangePicker = () => {
  const [isShow, setIsShow] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Set client-side flag on mount to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsShow(!isShow);
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (!isClient) return;

    if (isShow) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isShow, isClient]);

  return (
    <div ref={containerRef} onClick={handleContainerClick}>
      <div className="wl-date-picker-container">
        <input
          type="text"
          className="wl-datepicker wl-datepicker-range wl-radius-64"
          defaultValue="10 May 2024 — 31 May 2024"
          readOnly
          onClick={isClient ? handleInputClick : undefined}
        />
        {isClient && (
          <div className={`wl-calendar-container ${isShow ? "wl-show" : ""}`}>
            <div className="wl-filter-options">
              <div className="wl-date-filter-wrapper wl-d-flex wl-flex-wrap wl-flex-row wl-align-items-center wl-gap-2">
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-1"
                  />
                  <label htmlFor="wl-chip-date-filter-1">Today</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-2"
                  />
                  <label htmlFor="wl-chip-date-filter-2">Yesterday</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-3"
                    defaultChecked
                  />
                  <label htmlFor="wl-chip-date-filter-3">This week</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-4"
                  />
                  <label htmlFor="wl-chip-date-filter-4">Last week</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-5"
                  />
                  <label htmlFor="wl-chip-date-filter-5">This month</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-6"
                  />
                  <label htmlFor="wl-chip-date-filter-6">Last month</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-7"
                  />
                  <label htmlFor="wl-chip-date-filter-7">Last 3 months</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-8"
                  />
                  <label htmlFor="wl-chip-date-filter-8">1st half</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-9"
                  />
                  <label htmlFor="wl-chip-date-filter-9">2nd half</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-10"
                  />
                  <label htmlFor="wl-chip-date-filter-10">Q1</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-11"
                  />
                  <label htmlFor="wl-chip-date-filter-11">Q2</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-12"
                  />
                  <label htmlFor="wl-chip-date-filter-12">Q3</label>
                </div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-13"
                  />
                  <label htmlFor="wl-chip-date-filter-13">Q4</label>
                </div>
                <div className="wl-date-filter-divider"></div>
                <div className="wl-chips">
                  <input
                    type="radio"
                    name="wl-chip-date-filter"
                    id="wl-chip-date-filter-custom"
                  />
                  <label htmlFor="wl-chip-date-filter-custom">Custom</label>
                </div>
              </div>
            </div>
            <div className="wl-dual-calendar-wrapper">
              <div className="wl-calendar-section">
                <div className="wl-calendar-header">
                  <div className="wl-d-flex wl-flex-grow-1 wl-align-items-center wl-gap-2">
                    <div className="wl-w-100 wl-d-flex wl-flex-grow-1">
                      <select className="wl-w-100">
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                      </select>
                    </div>
                    <select style={{ width: "110px" }}>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                    <button
                      className="wl-btn-primary-text"
                      aria-label="Previous month"
                      data-direction="prev"
                    ></button>
                    <button
                      className="wl-btn-primary-text"
                      aria-label="Next month"
                      data-direction="next"
                    ></button>
                  </div>
                </div>
                <div className="wl-calendar-body">
                  <div className="wl-weekday-wrapper">
                    <div className="wl-weekday-text">SU</div>
                    <div className="wl-weekday-text">MO</div>
                    <div className="wl-weekday-text">TU</div>
                    <div className="wl-weekday-text">WE</div>
                    <div className="wl-weekday-text">TH</div>
                    <div className="wl-weekday-text">FR</div>
                    <div className="wl-weekday-text">SA</div>
                  </div>
                  <div className="wl-datepicker-wrapper">
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="27 June 2025"
                    >
                      27
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="28 June 2025"
                    >
                      28
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="29 June 2025"
                    >
                      29
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="30 June 2025"
                    >
                      30
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="31 June 2025"
                    >
                      31
                    </button>
                    <button className="wl-calendar-item" aria-label="1 June 2025">
                      1
                    </button>
                    <button className="wl-calendar-item" aria-label="2 June 2025">
                      2
                    </button>
                    <button className="wl-calendar-item" aria-label="3 June 2025">
                      3
                    </button>
                    <button className="wl-calendar-item" aria-label="4 June 2025">
                      4
                    </button>
                    <button className="wl-calendar-item" aria-label="5 June 2025">
                      5
                    </button>
                    <button className="wl-calendar-item" aria-label="6 June 2025">
                      6
                    </button>
                    <button className="wl-calendar-item" aria-label="7 June 2025">
                      7
                    </button>
                    <button className="wl-calendar-item" aria-label="8 June 2025">
                      8
                    </button>
                    <button className="wl-calendar-item" aria-label="9 June 2025">
                      9
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="10 June 2025"
                    >
                      10
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="11 June 2025"
                    >
                      11
                    </button>
                    <button
                      className="wl-calendar-item wl-today wl-in-range wl-range-start"
                      aria-label="12 June 2025"
                    >
                      12<div className="wl-calendar-date-tags"></div>
                      <div
                        className="wl-background-range"
                        style={{ right: "0px" }}
                      ></div>
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="13 June 2025"
                    >
                      13
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="14 June 2025"
                    >
                      14
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="15 June 2025"
                    >
                      15
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="16 June 2025"
                    >
                      16
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="17 June 2025"
                    >
                      17
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range"
                      aria-label="18 June 2025"
                    >
                      18
                    </button>
                    <button
                      className="wl-calendar-item wl-in-range wl-range-end"
                      aria-label="19 June 2025"
                    >
                      19
                      <div
                        className="wl-background-range"
                        style={{ left: "0px" }}
                      ></div>
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="20 June 2025"
                    >
                      20
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="21 June 2025"
                    >
                      21
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="22 June 2025"
                    >
                      22
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="23 June 2025"
                    >
                      23
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="24 June 2025"
                    >
                      24
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="25 June 2025"
                    >
                      25
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="26 June 2025"
                    >
                      26
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="27 June 2025"
                    >
                      27
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="28 June 2025"
                    >
                      28
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="29 June 2025"
                    >
                      29
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="30 June 2025"
                    >
                      30
                    </button>
                  </div>
                </div>
              </div>
              <div className="wl-calendar-arrow"></div>
              <div className="wl-calendar-section">
                <div className="wl-calendar-header">
                  <div className="wl-d-flex wl-flex-grow-1 wl-align-items-center wl-gap-2">
                    <div className="wl-w-100 wl-d-flex wl-flex-grow-1">
                      <select className="wl-w-100">
                        <option value="0">January</option>
                        <option value="1">February</option>
                        <option value="2">March</option>
                        <option value="3">April</option>
                        <option value="4">May</option>
                        <option value="5">June</option>
                        <option value="6">July</option>
                        <option value="7">August</option>
                        <option value="8">September</option>
                        <option value="9">October</option>
                        <option value="10">November</option>
                        <option value="11">December</option>
                      </select>
                    </div>
                    <select style={{ width: "110px" }}>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                      <option value="2030">2030</option>
                    </select>
                  </div>
                  <div className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                    <button
                      className="wl-btn-primary-text"
                      aria-label="Previous month"
                      data-direction="prev"
                    ></button>
                    <button
                      className="wl-btn-primary-text"
                      aria-label="Next month"
                      data-direction="next"
                    ></button>
                  </div>
                </div>
                <div className="wl-calendar-body">
                  <div className="wl-weekday-wrapper">
                    <div className="wl-weekday-text">SU</div>
                    <div className="wl-weekday-text">MO</div>
                    <div className="wl-weekday-text">TU</div>
                    <div className="wl-weekday-text">WE</div>
                    <div className="wl-weekday-text">TH</div>
                    <div className="wl-weekday-text">FR</div>
                    <div className="wl-weekday-text">SA</div>
                  </div>
                  <div className="wl-datepicker-wrapper">
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="30 July 2025"
                    >
                      30
                    </button>
                    <button className="wl-calendar-item" aria-label="1 July 2025">
                      1
                    </button>
                    <button className="wl-calendar-item" aria-label="2 July 2025">
                      2
                    </button>
                    <button className="wl-calendar-item" aria-label="3 July 2025">
                      3
                    </button>
                    <button className="wl-calendar-item" aria-label="4 July 2025">
                      4
                    </button>
                    <button className="wl-calendar-item" aria-label="5 July 2025">
                      5
                    </button>
                    <button className="wl-calendar-item" aria-label="6 July 2025">
                      6
                    </button>
                    <button className="wl-calendar-item" aria-label="7 July 2025">
                      7
                    </button>
                    <button className="wl-calendar-item" aria-label="8 July 2025">
                      8
                    </button>
                    <button className="wl-calendar-item" aria-label="9 July 2025">
                      9
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="10 July 2025"
                    >
                      10
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="11 July 2025"
                    >
                      11
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="12 July 2025"
                    >
                      12
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="13 July 2025"
                    >
                      13
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="14 July 2025"
                    >
                      14
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="15 July 2025"
                    >
                      15
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="16 July 2025"
                    >
                      16
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="17 July 2025"
                    >
                      17
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="18 July 2025"
                    >
                      18
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="19 July 2025"
                    >
                      19
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="20 July 2025"
                    >
                      20
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="21 July 2025"
                    >
                      21
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="22 July 2025"
                    >
                      22
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="23 July 2025"
                    >
                      23
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="24 July 2025"
                    >
                      24
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="25 July 2025"
                    >
                      25
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="26 July 2025"
                    >
                      26
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="27 July 2025"
                    >
                      27
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="28 July 2025"
                    >
                      28
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="29 July 2025"
                    >
                      29
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="30 July 2025"
                    >
                      30
                    </button>
                    <button
                      className="wl-calendar-item"
                      aria-label="31 July 2025"
                    >
                      31
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="1 July 2025"
                    >
                      1
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="2 July 2025"
                    >
                      2
                    </button>
                    <button
                      disabled
                      className="wl-calendar-item wl-other-month disabled"
                      aria-label="3 July 2025"
                    >
                      3
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="wl-calendar-footer">
              <label className="wl-d-inline-flex wl-align-items-center wl-gap-1">
                <div className="wl-d-inline-flex wl-align-items-center">
                  <input type="checkbox" id="wl-input-save-filter" />
                  <label
                    htmlFor="wl-input-save-filter"
                    className="wl-text-nowrap"
                  >
                    Save this date filtering for all time
                  </label>
                </div>
                <div className="wl-tooltip-item">
                  <div className="wl-tooltip-content wl-tooltip-top-left">
                    Tip: It will apply every data listing page.
                  </div>
                </div>
              </label>
              <div className="wl-w-100 wl-d-inline-flex wl-justify-content-end wl-align-items-center wl-gap-2">
                <button className="wl-btn-primary-text">Clear</button>
                <button className="wl-btn-primary">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WLDateRangePicker;
