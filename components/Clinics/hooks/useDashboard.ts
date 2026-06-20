import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'
import { Appointment } from '../../../types/Appointment'



export function useDashboard() {
  const router = useRouter()
const [clinicId, setClinicId] = useState<number | null>(null)
  const [appointments, setAppointments]     = useState<Appointment[]>([])
  const [loading, setLoading]               = useState(true)
  const [filterStatus, setFilterStatus]     = useState<string>('all')
  const [toast, setToast]                   = useState<{ msg: string; type: 'success' | 'danger' } | null>(null)
  const [actionLoading, setActionLoading]   = useState<number | null>(null)
  const [showSettings, setShowSettings]     = useState(false)
  const [settingsLoading, setSettingsLoading] = useState(false)
  const [settings, setSettings]             = useState<Partial<Clinic>>({
    name: '', address: '', governorate: '', phone: '',
    facebookPage: '', bookingPrice: undefined, workingDays: '', workingHours: '',
  })
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectTargetId, setRejectTargetId]   = useState<number | null>(null)
  const [rejectReason, setRejectReason]       = useState('')

  useEffect(() => { loadAppointments() }, [])

  // ── Load ─────────────────────────────────────────────────────────────────
// const loadAppointments = async () => {
//   try {
//     setLoading(true)
//     const session = await getSession()
//     const data = await clinicsApi.getAppointments()
//     setAppointments(data)
//     // جيب الـ clinicId من أول appointment
//     if (data.length > 0 && data[0].clinicId) {
//       setClinicId(data[0].clinicId)
//     }
//   } catch (err) {
//     console.error('Failed to load appointments:', err)
//   } finally {
//     setLoading(false)
//   }
// }
// hooks/useDashboard.ts
const loadAppointments = async () => {
  try {
    setLoading(true)
    const data = await clinicsApi.getAppointments()
    setAppointments(data)
    
    // ✅ دلوقتي شغالة زي Flutter بالظبط
    if (data.length > 0 && data[0].clinicId) {
      setClinicId(data[0].clinicId)
    }
  } catch (err) {
    console.error('Failed to load appointments:', err)
  } finally {
    setLoading(false)
  }
}
  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: 'success' | 'danger') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3500)
  }

  // ── Approve ───────────────────────────────────────────────────────────────
  const handleApprove = async (id: number) => {
    setActionLoading(id)
    try {
      await clinicsApi.approveAppointment(id)
      setAppointments(prev =>
        prev.map(a => a.id === id ? { ...a, status: 'Approved' as const } : a)
      )
      showToast('Appointment approved!', 'success')
    } catch {
      showToast('Failed to approve.', 'danger')
    } finally {
      setActionLoading(null)
    }
  }

  // ── Reject ────────────────────────────────────────────────────────────────
  const openRejectModal = (id: number) => {
    setRejectTargetId(id)
    setRejectReason('')
    setShowRejectModal(true)
  }

  const handleRejectConfirm = async () => {
    if (rejectTargetId === null) return
    setActionLoading(rejectTargetId)
    setShowRejectModal(false)
    try {
      await clinicsApi.rejectAppointment(rejectTargetId, rejectReason)
      setAppointments(prev =>
        prev.map(a => a.id === rejectTargetId ? { ...a, status: 'Rejected' as const } : a)
      )
      showToast('Appointment rejected.', 'success')
    } catch {
      showToast('Failed to reject.', 'danger')
    } finally {
      setActionLoading(null)
      setRejectTargetId(null)
      setRejectReason('')
    }
  }

  // ── Settings ──────────────────────────────────────────────────────────────

const handleOpenSettings = async () => {
  setShowSettings(true)
  setSettingsLoading(true)
  try {
    if (!clinicId) return
    const clinic = await clinicsApi.getForOwner(clinicId)
    if (clinic) setSettings({ ...clinic })
  } finally {
    setSettingsLoading(false)
  }
}



const handleSettingsSave = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!clinicId) return
  try {
    await clinicsApi.updateSettings(clinicId, { ...settings })
    showToast('Settings saved!', 'success')
    setShowSettings(false)
  } catch {
    showToast('Failed to save settings.', 'danger')
  }
}
  // ── Derived ───────────────────────────────────────────────────────────────
  const filtered = filterStatus === 'all'
    ? appointments
    : appointments.filter(a => a.status === filterStatus)

  const counts = {
    all:       appointments.length,
    Pending:   appointments.filter(a => a.status === 'Pending').length,
    Approved:  appointments.filter(a => a.status === 'Approved').length,
    Rejected:  appointments.filter(a => a.status === 'Rejected').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
  }

  return {
    // data
    filtered,
    counts,
    loading,
    // filter
    filterStatus,
    setFilterStatus,
    // toast
    toast,
    // actions
    actionLoading,
    loadAppointments,
    handleApprove,
    // reject modal
    showRejectModal,
    setShowRejectModal,
    rejectReason,
    setRejectReason,
    openRejectModal,
    handleRejectConfirm,
    // settings modal
    showSettings,
    setShowSettings,
    settings,
    setSettings,
    settingsLoading,
    handleOpenSettings,
    handleSettingsSave,
    clinicId, setClinicId
  }
}