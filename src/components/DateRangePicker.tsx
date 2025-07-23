'use client';

import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';

interface DateRangePickerProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
  onSave?: () => void;
  onClear?: () => void;
  className?: string;
}

interface QuickOption {
  label: string;
  value: string;
  isSelected?: boolean;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onDateRangeChange,
  onSave,
  onClear,
  className = ''
}) => {
  const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedQuickOption, setSelectedQuickOption] = useState<string>('this-week');
  const [saveForAllTime, setSaveForAllTime] = useState(false);

  const quickOptions: QuickOption[] = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'This week', value: 'this-week', isSelected: true },
    { label: 'Last week', value: 'last-week' },
    { label: 'This month', value: 'this-month' },
    { label: 'Last month', value: 'last-month' },
    { label: 'Last 3 months', value: 'last-3-months' },
    { label: '1st half', value: '1st-half' },
    { label: '2nd half', value: '2nd-half' },
    { label: 'Q1', value: 'q1' },
    { label: 'Q2', value: 'q2' },
    { label: 'Q3', value: 'q3' },
    { label: 'Q4', value: 'q4' },
    { label: 'Custom', value: 'custom' }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  const weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  const handleQuickOptionSelect = (value: string) => {
    setSelectedQuickOption(value);
    // Calculate date range based on selection
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (value) {
      case 'today':
        startDate = today;
        endDate = today;
        break;
      case 'yesterday':
        startDate.setDate(today.getDate() - 1);
        endDate.setDate(today.getDate() - 1);
        break;
      case 'this-week':
        const dayOfWeek = today.getDay();
        startDate.setDate(today.getDate() - dayOfWeek);
        endDate.setDate(today.getDate() + (6 - dayOfWeek));
        break;
      case 'last-week':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - today.getDay() - 7);
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekStart.getDate() + 6);
        startDate = lastWeekStart;
        endDate = lastWeekEnd;
        break;
      case 'this-month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'last-month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      case 'last-3-months':
        startDate = new Date(today.getFullYear(), today.getMonth() - 3, 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'custom':
        // Keep current selection for custom
        return;
    }

    setSelectedRange({ start: startDate, end: endDate });
    onDateRangeChange?.(startDate, endDate);
  };

  const handleSave = () => {
    onSave?.();
  };

  const handleClear = () => {
    setSelectedRange(null);
    setSelectedQuickOption('this-week');
    onClear?.();
  };

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      days.push(currentDate);
    }
    return days;
  };

  const isInRange = (date: Date) => {
    if (!selectedRange) return false;
    return date >= selectedRange.start && date <= selectedRange.end;
  };

  const isRangeStart = (date: Date) => {
    if (!selectedRange) return false;
    return date.toDateString() === selectedRange.start.toDateString();
  };

  const isRangeEnd = (date: Date) => {
    if (!selectedRange) return false;
    return date.toDateString() === selectedRange.end.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth() && 
           date.getFullYear() === currentMonth.getFullYear();
  };

  const calendarDays = generateCalendarDays(currentMonth);

  return (
    <div className={`date-range-picker ${className}`}>
      {/* Quick Selection Chips */}
      <div className="quick-selection-chips">
        {quickOptions.map((option) => (
          <button
            key={option.value}
            className={`quick-option-chip ${selectedQuickOption === option.value ? 'selected' : ''}`}
            onClick={() => handleQuickOptionSelect(option.value)}
          >
            {selectedQuickOption === option.value && (
              <svg className="check-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.5 12.5L2 8L3.5 6.5L6.5 9.5L12.5 3.5L14 5L6.5 12.5Z" fill="#0f1fea"/>
              </svg>
            )}
            {option.label}
          </button>
        ))}
      </div>

      {/* Calendar Section */}
      <div className="calendar-section">
        <div className="calendar-container">
          {/* Left Calendar */}
          <div className="calendar">
            <div className="calendar-header">
              <div className="month-year-selector">
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="month-dropdown">
                    {months[currentMonth.getMonth()]}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((month, index) => (
                      <Dropdown.Item key={month} onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setMonth(index);
                        setCurrentMonth(newDate);
                      }}>
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="year-dropdown">
                    {currentMonth.getFullYear()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {years.map((year) => (
                      <Dropdown.Item key={year} onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setFullYear(year);
                        setCurrentMonth(newDate);
                      }}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="navigation-buttons">
                <Button variant="light" size="sm" className="nav-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
                <Button variant="light" size="sm" className="nav-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {/* Week Days Header */}
              <div className="week-days-header">
                {weekDays.map((day) => (
                  <div key={day} className="week-day">{day}</div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="calendar-days">
                {calendarDays.map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!isCurrentMonth(date) ? 'other-month' : ''} 
                               ${isInRange(date) ? 'in-range' : ''} 
                               ${isRangeStart(date) ? 'range-start' : ''} 
                               ${isRangeEnd(date) ? 'range-end' : ''}`}
                    onClick={() => {
                      if (isCurrentMonth(date)) {
                        // Handle date selection logic here
                      }
                    }}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Calendar (same as left for now) */}
          <div className="calendar">
            <div className="calendar-header">
              <div className="month-year-selector">
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="month-dropdown">
                    {months[currentMonth.getMonth()]}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {months.map((month, index) => (
                      <Dropdown.Item key={month} onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setMonth(index);
                        setCurrentMonth(newDate);
                      }}>
                        {month}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                  <Dropdown.Toggle variant="light" className="year-dropdown">
                    {currentMonth.getFullYear()}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {years.map((year) => (
                      <Dropdown.Item key={year} onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setFullYear(year);
                        setCurrentMonth(newDate);
                      }}>
                        {year}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="navigation-buttons">
                <Button variant="light" size="sm" className="nav-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
                <Button variant="light" size="sm" className="nav-btn">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4L10 8L6 12" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="calendar-grid">
              {/* Week Days Header */}
              <div className="week-days-header">
                {weekDays.map((day) => (
                  <div key={day} className="week-day">{day}</div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="calendar-days">
                {calendarDays.map((date, index) => (
                  <div
                    key={index}
                    className={`calendar-day ${!isCurrentMonth(date) ? 'other-month' : ''} 
                               ${isInRange(date) ? 'in-range' : ''} 
                               ${isRangeStart(date) ? 'range-start' : ''} 
                               ${isRangeEnd(date) ? 'range-end' : ''}`}
                    onClick={() => {
                      if (isCurrentMonth(date)) {
                        // Handle date selection logic here
                      }
                    }}
                  >
                    {date.getDate()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="date-picker-footer">
        <div className="save-option">
          <div className="save-checkbox">
            <input
              type="checkbox"
              id="saveForAllTime"
              checked={saveForAllTime}
              onChange={(e) => setSaveForAllTime(e.target.checked)}
            />
            <label htmlFor="saveForAllTime">Save this date filtering for all time</label>
          </div>
          <svg className="info-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C4.13 1 1 4.13 1 8s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" fill="#171717" fillOpacity="0.2"/>
            <path d="M7 6h2v5H7V6zm0-1h2v1H7V5z" fill="#171717" fillOpacity="0.2"/>
          </svg>
        </div>
        <div className="action-buttons">
          <Button variant="light" onClick={handleClear} className="clear-btn">
            Clear
          </Button>
          <Button variant="primary" onClick={handleSave} className="save-btn">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker; 