import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { clinicsApi } from '../../../data/api/Clinic'
import { Clinic } from '../../../types/Clinic'
import { Appointment } from '../../../types/Appointment'

const getClinicId = (): string => '28'

export function useDashboard() {
  const router = useRouter()

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
  const loadAppointments = async () => {
    try {
      setLoading(true)
      const data = await clinicsApi.getAppointments(getClinicId())
      setAppointments(data)
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
      const all = await clinicsApi.getAll()
      const clinic = all.find(c => c.id === Number(getClinicId()))
      if (clinic) {
        setSettings({
          name:         clinic.name         || '',
          address:      clinic.address      || '',
          governorate:  clinic.governorate  || '',
          phone:        clinic.phone        || '',
          facebookPage: clinic.facebookPage || '',
          bookingPrice: clinic.bookingPrice,
          workingDays:  clinic.workingDays  || '',
          workingHours: clinic.workingHours || '',
        })
      }
    } catch (err) {
      console.error('Failed to load clinic settings:', err)
    } finally {
      setSettingsLoading(false)
    }
  }

  const handleSettingsSave = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await clinicsApi.updateSettings(getClinicId(), {
        name:         settings.name,
        address:      settings.address,
        governorate:  settings.governorate,
        phone:        settings.phone,
        facebookPage: settings.facebookPage,
        bookingPrice: settings.bookingPrice,
        workingDays:  settings.workingDays,
        workingHours: settings.workingHours,
      })

      const updatedAll = await clinicsApi.getAll()
      const updatedClinic = updatedAll.find(c => c.id === Number(getClinicId()))
      if (updatedClinic) {
        setSettings({
          name:         updatedClinic.name         || '',
          address:      updatedClinic.address      || '',
          governorate:  updatedClinic.governorate  || '',
          phone:        updatedClinic.phone        || '',
          facebookPage: updatedClinic.facebookPage || '',
          bookingPrice: updatedClinic.bookingPrice,
          workingDays:  updatedClinic.workingDays  || '',
          workingHours: updatedClinic.workingHours || '',
        })
      }

      showToast('Settings saved!', 'success')
      setShowSettings(false)
      window.dispatchEvent(new CustomEvent('clinicsUpdated'))
      router.refresh()
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
  }
}