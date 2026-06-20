
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, Button, Spinner, Alert, Form } from 'react-bootstrap'
import { useAppointment } from '../hooks/useAppointment'

export interface AvailableTime {
  ClinicId: string
  date: string
  time: string
  CustomerName: string
  Phone: string
}

type Step = 'datetime' | 'info' | 'confirm' | 'done'

export function Appointment() {
  const params = useParams()
  const clinicId = params?.id as string

 
  const [step, setStep] = useState<Step>('datetime')

  const {
    availableDates,
    availableTimes,
    setAvailableTimes,
    loadingTimes,
    setLoadingTimes,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    customerName,
    setCustomerName,
    phone,
    setPhone,
    booking,
    setBooking,
    error,
    setError,
  } = useAppointment(clinicId)

  
// Fetch available times when date changes
useEffect(() => {
  if (!selectedDate || !clinicId) return
  const fetchTimes = async () => {
    setLoadingTimes(true)
    setSelectedTime('')
    setError('')
    try {
    const res = await fetch(`/api/proxy/Appointments/${clinicId}/available-times?date=${selectedDate}`)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        console.error("Error fetching times:", errorData)
        throw new Error()
      }
      const data = await res.json()
      const times = Array.isArray(data) ? data : data.times ?? data.data ?? []
      setAvailableTimes(times.length > 0 ? times : ['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'])
    } catch (err) {
      console.error("Failed to fetch times, using fallback")
      setAvailableTimes(['9:00 AM','10:00 AM','11:00 AM','12:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM'])
    } finally {
      setLoadingTimes(false)
    }
  }
  fetchTimes()
}, [selectedDate, clinicId])


// ✅ Convert time display format to TimeSpan
const convertToTimeSpan = (timeStr: string): string => {
  try {
    const date = new Date(`2000-01-01 ${timeStr}`)
    if (isNaN(date.getTime())) {
      // لو فشل التحويل، جرب format تاني
      const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i)
      if (match) {
        let hours = parseInt(match[1])
        const minutes = match[2]
        const period = match[3].toUpperCase()
        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0
        return `${hours.toString().padStart(2, '0')}:${minutes}:00`
      }
      return "12:00:00"
    }
    return date.toTimeString().split(' ')[0]
  } catch {
    return "12:00:00"
  }
}
const handleConfirmAppointment = async () => {
  if (!selectedDate || !selectedTime || !customerName.trim() || !phone.trim()) return;
  setBooking(true);
  setError("");
  try {
    const timeSpan = convertToTimeSpan(selectedTime);

    // ✅ التجربة 1: بدون dto (كأنك بتتكلم مع الـ Controller مباشرة)
    const payloadFlat = {
      ClinicId: String(clinicId),
      Date: selectedDate,
      Time: timeSpan,
      CustomerName: customerName.trim(),
      Phone: phone.trim(),
    };

    // ✅ التجربة 2: مع dto (لو أول واحد فشل)
    const payloadWithDto = {
      dto: {
        ClinicId: String(clinicId),
        Date: selectedDate,
        Time: timeSpan,
        CustomerName: customerName.trim(),
        Phone: phone.trim(),
      },
    };

    console.log("📤 Trying flat payload:", JSON.stringify(payloadFlat, null, 2));

    let res = await fetch(`/api/proxy/Appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify(payloadFlat),
    });

    // لو فشل الأول، جرب الـ dto
    if (!res.ok) {
      console.log("⚠️ Flat payload failed, trying with dto...");
      res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(payloadWithDto),
      });
    }

    const responseText = await res.text();
    console.log("📥 Response:", responseText);

    if (!res.ok) {
      try {
        const err = JSON.parse(responseText);
        setError(err.error || err.title || `Booking failed (${res.status})`);
      } catch {
        setError(`Booking failed: ${responseText}`);
      }
      return;
    }

    // ✅ بعد النجاح، خزن البيانات بالشكل اللي يتناسب مع الـ Type
    const newAppointment = {
      id: Date.now(),
      customerName: customerName.trim(),
      phone: phone.trim(),
      date: selectedDate,
      time: selectedTime,
      status: "Pending" as const,
    };

    setStep("done");
    window.dispatchEvent(
      new CustomEvent("newAppointment", {
        detail: newAppointment,
      })
    );
  } catch (err) {
    console.error("Booking error:", err);
    setError("Failed to book. Please try again.");
  } finally {
    setBooking(false);
  }
};
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return {
      weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
      day: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    }
  }

  const styles = {
    card: {
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      borderRadius: '20px',
      border: 'none',
      overflow: 'hidden',
    } as React.CSSProperties,
    dateChip: (active: boolean): React.CSSProperties => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '12px 10px', borderRadius: '14px', cursor: 'pointer',
      border: `2px solid ${active ? '#7CB342' : '#e8e8e8'}`,
      backgroundColor: active ? '#f0f8e8' : 'white',
      transition: 'all 0.2s', minWidth: '70px', userSelect: 'none',
    }),
    timeChip: (active: boolean): React.CSSProperties => ({
      padding: '10px 14px', borderRadius: '12px', cursor: 'pointer',
      border: `2px solid ${active ? '#7CB342' : '#e8e8e8'}`,
      backgroundColor: active ? '#f0f8e8' : 'white',
      color: active ? '#7CB342' : '#555',
      fontWeight: active ? '600' : '400',
      fontSize: '0.88rem', transition: 'all 0.2s',
      textAlign: 'center' as const, userSelect: 'none' as const,
    }),
    confirmBtn: (disabled: boolean): React.CSSProperties => ({
      backgroundColor: '#7CB342', border: 'none',
      padding: '13px 40px', borderRadius: '12px',
      fontWeight: '600', fontSize: '1rem', letterSpacing: '0.3px',
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s',
    }),
    stepDot: (active: boolean, done: boolean): React.CSSProperties => ({
      width: '10px', height: '10px', borderRadius: '50%',
      backgroundColor: done ? '#7CB342' : active ? '#7CB342' : '#ddd',
      opacity: done ? 0.4 : 1, transition: 'all 0.3s',
    }),
  }

  // ✅ DONE screen
  if (step === 'done') {
    return (
      <Card style={styles.card} className="p-5 mb-4 text-center">
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
        <h4 style={{ fontWeight: '700', color: '#2d2d2d', marginBottom: '8px' }}>Appointment Confirmed!</h4>
        <p className="text-muted mb-1">
          <strong>{customerName}</strong> — {formatDate(selectedDate).weekday}, {formatDate(selectedDate).day} {formatDate(selectedDate).month}
        </p>
        <p className="text-muted mb-4">at <strong>{selectedTime}</strong></p>
        <div style={{ display: 'inline-block', backgroundColor: '#f0f8e8', borderRadius: '12px', padding: '10px 20px', color: '#7CB342', fontWeight: '600', fontSize: '0.9rem' }}>
          ✓ We'll contact you at {phone}
        </div>
        <br />
        <Button
          variant="link" className="mt-4"
          style={{ color: '#7CB342', textDecoration: 'none', fontWeight: '500' }}
          onClick={() => { setStep('datetime'); setCustomerName(''); setPhone(''); setSelectedTime('') }}
        >
          + Book another appointment
        </Button>
      </Card>
    )
  }

  return (
    <>
      <div className="section-header mb-3">
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1a1a1a' }}>Book an Appointment</h3>
        <p className="text-muted" style={{ fontSize: '0.95rem' }}>Choose your preferred date and time slot below.</p>
      </div>

      <Card style={styles.card} className="mb-4">
        {/* Step indicator */}
        <div style={{ backgroundColor: '#fafafa', padding: '16px 28px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {(['datetime', 'info', 'confirm'] as Step[]).map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={styles.stepDot(step === s, ['info','confirm','done'].indexOf(step) > ['info','confirm','done'].indexOf(s))} />
              <span style={{ fontSize: '0.8rem', color: step === s ? '#7CB342' : '#aaa', fontWeight: step === s ? '600' : '400' }}>
                {['Date & Time', 'Your Info', 'Confirm'][i]}
              </span>
              {i < 2 && <span style={{ color: '#ddd', fontSize: '0.8rem', marginLeft: '4px' }}>›</span>}
            </div>
          ))}
        </div>

        <div style={{ padding: '28px' }}>
          {error && <Alert variant="danger" className="mb-3" style={{ borderRadius: '12px' }}>{error}</Alert>}

          {/* STEP 1: Date & Time */}
          {step === 'datetime' && (
            <>
              <h6 style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                📅 Select Date
              </h6>
              <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '28px' }}>
                {availableDates.map((date) => {
                  const f = formatDate(date)
                  const active = selectedDate === date
                  return (
                    <div key={date} style={styles.dateChip(active)} onClick={() => setSelectedDate(date)}>
                      <span style={{ fontSize: '0.72rem', color: active ? '#7CB342' : '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{f.weekday}</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '700', color: active ? '#7CB342' : '#1a1a1a', lineHeight: 1.1 }}>{f.day}</span>
                      <span style={{ fontSize: '0.72rem', color: active ? '#7CB342' : '#999' }}>{f.month}</span>
                    </div>
                  )
                })}
              </div>

              <h6 style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '16px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🕐 Select Time
              </h6>
              {loadingTimes ? (
                <div className="text-center py-3">
                  <Spinner animation="border" size="sm" style={{ color: '#7CB342' }} />
                  <span className="ms-2 text-muted" style={{ fontSize: '0.9rem' }}>Loading slots...</span>
                </div>
              ) : availableTimes.length === 0 ? (
                <p className="text-muted text-center py-2" style={{ fontSize: '0.9rem' }}>No slots available for this day.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '10px', marginBottom: '28px' }}>
                  {availableTimes.map((time) => (
                    <div key={time} style={styles.timeChip(selectedTime === time)} onClick={() => setSelectedTime(time)}>{time}</div>
                  ))}
                </div>
              )}

              <div className="text-end">
                <Button onClick={() => setStep('info')} disabled={!selectedDate || !selectedTime} style={styles.confirmBtn(!selectedDate || !selectedTime)}>
                  Next →
                </Button>
              </div>
            </>
          )}

          {/* STEP 2: Customer Info */}
          {step === 'info' && (
            <>
              <div style={{ backgroundColor: '#f8fdf4', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</span>
                  <div style={{ fontWeight: '700', color: '#7CB342' }}>{formatDate(selectedDate).weekday}, {formatDate(selectedDate).day} {formatDate(selectedDate).month}</div>
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</span>
                  <div style={{ fontWeight: '700', color: '#7CB342' }}>{selectedTime}</div>
                </div>
              </div>

              <h6 style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>👤 Your Details</h6>

              <Form.Group className="mb-3">
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Full Name *</Form.Label>
                <Form.Control type="text" placeholder="e.g. Ahmed Hassan" value={customerName} onChange={(e) => setCustomerName(e.target.value)} style={{ borderRadius: '12px', border: '2px solid #e8e8e8', padding: '12px 16px', fontSize: '0.95rem' }} />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#444' }}>Phone Number *</Form.Label>
                <Form.Control type="tel" placeholder="e.g. 01012345678" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ borderRadius: '12px', border: '2px solid #e8e8e8', padding: '12px 16px', fontSize: '0.95rem' }} />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="link" style={{ color: '#999', textDecoration: 'none', padding: 0 }} onClick={() => setStep('datetime')}>← Back</Button>
                <Button onClick={() => setStep('confirm')} disabled={!customerName.trim() || !phone.trim()} style={styles.confirmBtn(!customerName.trim() || !phone.trim())}>Review →</Button>
              </div>
            </>
          )}

          {/* STEP 3: Confirm */}
          {step === 'confirm' && (
            <>
              <h6 style={{ fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>✅ Review & Confirm</h6>
              <div style={{ backgroundColor: '#f8fdf4', borderRadius: '16px', padding: '20px 24px', marginBottom: '24px' }}>
                {[
                  { label: '📅 Date', value: `${formatDate(selectedDate).weekday}, ${formatDate(selectedDate).day} ${formatDate(selectedDate).month}` },
                  { label: '🕐 Time', value: selectedTime },
                  { label: '👤 Name', value: customerName },
                  { label: '📞 Phone', value: phone },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eef5e6' }}>
                    <span style={{ fontSize: '0.88rem', color: '#777' }}>{label}</span>
                    <span style={{ fontWeight: '600', color: '#1a1a1a', fontSize: '0.95rem' }}>{value}</span>
                  </div>
                ))}
              </div>

              {error && <Alert variant="danger" style={{ borderRadius: '12px' }}>{error}</Alert>}

              <div className="d-flex justify-content-between align-items-center">
                <Button variant="link" style={{ color: '#999', textDecoration: 'none', padding: 0 }} onClick={() => setStep('info')}>← Back</Button>
                <Button onClick={handleConfirmAppointment} disabled={booking} style={styles.confirmBtn(booking)}>
                  {booking ? <><Spinner animation="border" size="sm" className="me-2" />Booking...</> : '🗓 Confirm Appointment'}
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </>
  )
}