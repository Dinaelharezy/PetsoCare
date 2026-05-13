// 'use client'
// import { useState, useEffect } from 'react'
// import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
// import { Video } from '@/types/Video'
// import { apiUrl } from '@/lib/api'

// export default function VideoManagementClient() {
//   const [videos, setVideos] = useState<Video[]>([])
//   const [loading, setLoading] = useState(true)
//   const [showModal, setShowModal] = useState(false)
//   const [editingVideo, setEditingVideo] = useState<Video | null>(null)
//   const [successMessage, setSuccessMessage] = useState('')
//   const [error, setError] = useState('')
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [deletingId, setDeletingId] = useState<number | null>(null)


//   const [formData, setFormData] = useState({
//     titleAr: '',
//     titleEn: '',
//     url: '',
//     source: '',
//   })

//   useEffect(() => {
//     loadVideos()
//   }, [])

//   const loadVideos = async () => {
//     try {
//       setLoading(true)
//       const response = await fetch(apiUrl(`Videos?t=${Date.now()}`), {
//         headers: { 'ngrok-skip-browser-warning': 'true' },
//         cache: 'no-store',
//       })
//       const data = await response.json()
//       setVideos(Array.isArray(data) ? data : [])
//     } catch (error) {
//       console.error('Failed to load videos:', error)
//       setVideos([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleShowModal = (video?: Video) => {
//     if (video) {
//       setEditingVideo(video)
//       setFormData({
//         titleAr: video.titleAr,
//         titleEn: video.titleEn,
//         url: video.url,
//         source: video.source,
//       })
//     } else {
//       setEditingVideo(null)
//       setFormData({
//         titleAr: '',
//         titleEn: '',
//         url: '',
//         source: '',
//       })
//     }
//     setError('')
//     setShowModal(true)
//   }

//   const handleDeleteClick = (id: number) => {
//     setDeletingId(id)
//     setShowDeleteConfirm(true)
//   }

//     const confirmDelete = async () => {
//     if (!deletingId) return
    
//     try {
//       const response = await fetch(apiUrl(`Videos/${deletingId}`), {
//         method: 'DELETE',
//         headers: { 'ngrok-skip-browser-warning': 'true' },
//       })
//       if (!response.ok) { 
//         alert(`Failed to delete: ${response.status}`)
//         return
//       }
//       notifySuccess('Article deleted successfully!')
//       await loadArticles()
//     } catch (err) {
//       console.error('Error deleting article:', err)
//       alert('Failed to delete article. Please try again.')
//     } finally {
//       setShowDeleteConfirm(false)
//       setDeletingId(null)
//     }
//   }

//   const handleCloseModal = () => {
//     setShowModal(false)
//     setEditingVideo(null)
//     setError('')
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')

//     // ✅ التحقق من المدخلات
//     if (!formData.titleAr.trim()) {
//       setError('Arabic title is required')
//       return
//     }
//     if (!formData.titleEn.trim()) {
//       setError('English title is required')
//       return
//     }
//     if (!formData.url.trim()) {
//       setError('Video URL is required')
//       return
//     }
//     if (!formData.source.trim()) {
//       setError('Source is required')
//       return
//     }

//     try {
//       if (editingVideo) {
//         // ✅ Update existing video
//         const response = await fetch(apiUrl(`Videos/${editingVideo.id}`), {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true'
//           },
//           body: JSON.stringify(formData)
//         })

//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({}))
//           console.error('Update error:', errData)
//           setError(`Failed to update: ${response.status}`)
//           return
//         }

//         setSuccessMessage('Video updated successfully!')
//       } else {
//         // ✅ Create new video
//         const response = await fetch(apiUrl(`Videos`), {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'ngrok-skip-browser-warning': 'true'
//           },
//           body: JSON.stringify(formData)
//         })

//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({}))
//           console.error('Create error:', errData)
//           setError(`Failed to create: ${response.status}`)
//           return
//         }

//         setSuccessMessage('Video created successfully!')
//       }

//       await loadVideos()
//       handleCloseModal()
//       setTimeout(() => setSuccessMessage(''), 3000)
//       window.dispatchEvent(new Event('videosUpdated'))

//     } catch (error) {
//       console.error('Error saving video:', error)
//       setError('Failed to save video. Please try again.')
//     }
//   }

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this video?')) {
//        try {
//       const response = await fetch(apiUrl(`Videos/${id}`), {
//         method: 'DELETE',
//         headers: { 'ngrok-skip-browser-warning': 'true' }
//       })
      
//       console.log('🔴 Response status:', response.status) // ← وده
      
//       if (!response.ok) {
//         const body = await response.json()
//         console.log('🔴 Error body:', body) // ← وده
//         alert(`Failed to delete: ${response.status}`)
//         return
//       }
//         setSuccessMessage('Video deleted successfully!')
//         await loadVideos()
//         setTimeout(() => setSuccessMessage(''), 3000)
//         window.dispatchEvent(new Event('videosUpdated'))
//       } catch (error) {
//         console.error('Error deleting video:', error)
//         alert('Failed to delete video.')
//       }
//     }
//   }

//   const getYoutubeId = (url: string) => {
//     const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/\s]+)/)
//     return match ? match[1] : null
//   }

//   const getThumbnailUrl = (url: string) => {
//     const youtubeId = getYoutubeId(url)
//     if (youtubeId) {
//       return `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`
//     }
//     return null
//   }

//   if (loading) {
//     return (
//       <Container className="py-5 text-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </Container>
//     )
//   }

//   return (
//     <Container fluid className="px-4 py-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1 className="page-title">🎬 Video Management</h1>
//         <Button className="background-for-app" onClick={() => handleShowModal()}>
//           <i className="bi bi-plus-circle me-2"></i>
//           Add New Video
//         </Button>
//       </div>

//       {successMessage && (
//         <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
//           {successMessage}
//         </Alert>
//       )}

//       <Row className="g-4">
//         {videos.map((video) => {
//           const thumbnailUrl = getThumbnailUrl(video.url)
          
//           return (
//             <Col lg={6} xl={4} key={video.id}>
//               <Card className="animate-card h-100">
//                 {thumbnailUrl && (
//                   <div style={{ 
//                     position: 'relative', 
//                     aspectRatio: '16/9', 
//                     overflow: 'hidden',
//                     background: '#000'
//                   }}>
//                     <img
//                       src={thumbnailUrl}
//                       alt={video.titleEn}
//                       style={{ 
//                         width: '100%', 
//                         height: '100%', 
//                         objectFit: 'cover',
//                         cursor: 'pointer'
//                       }}
//                       onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}
//                     />
//                     <div 
//                       style={{
//                         position: 'absolute',
//                         inset: 0,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         background: 'rgba(0,0,0,0.3)',
//                         cursor: 'pointer',
//                         transition: 'background 0.2s'
//                       }}
//                       onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}
//                     >
//                       <i className="bi bi-play-circle-fill" style={{ fontSize: '48px', color: 'white', opacity: 0.8 }}></i>
//                     </div>
//                   </div>
//                 )}
                
//                 <Card.Body>
//                   <div className="d-flex justify-content-between align-items-start mb-2">
//                     <Badge bg="danger">
//                       <i className="bi bi-youtube me-1"></i> YouTube
//                     </Badge>
//                     <Badge bg="secondary">ID: {video.id}</Badge>
//                   </div>

//                   <h5 className="card-title mb-2">{video.titleEn}</h5>
//                   {/* <p className="text-muted small mb-2">{video.titleEn}</p> */}

//                   <div className="text-muted small mb-3">
//                     <i className="bi bi-person me-1"></i> {video.source}
//                     <br />
//                     <i className="bi bi-link-45deg me-1"></i> 
//                     <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
//                       Watch on YouTube
//                     </a>
//                   </div>

//                   <div className="d-flex gap-2 flex-wrap">
//                     <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(video)}>
//                       <i className="bi bi-pencil"></i> Edit
//                     </Button>
//                     <Button variant="outline-danger" size="sm" onClick={() => handleDelete(video.id)}>
//                       <i className="bi bi-trash"></i> Delete
//                     </Button>
//                     <Button 
//                       variant="outline-success" 
//                       size="sm" 
//                       onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}
//                     >
//                       <i className="bi bi-eye"></i> View
//                     </Button>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>
//           )
//         })}
//       </Row>

//       {videos.length === 0 && (
//         <Card className="animate-card">
//           <Card.Body className="text-center text-muted py-5">
//             <i className="bi bi-camera-reels" style={{ fontSize: '48px' }}></i>
//             <p className="mt-3">No videos found. Add your first video!</p>
//           </Card.Body>
//         </Card>
//       )}

//       {/* Modal for Add/Edit */}
//       <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {editingVideo ? `✏️ Edit Video (ID: ${editingVideo.id})` : '➕ Add New Video'}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleSubmit}>
//           <Modal.Body>
//             {error && (
//               <Alert variant="danger" className="mb-3">{error}</Alert>
//             )}

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">Title (Arabic) *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="titleAr"
//                 value={formData.titleAr}
//                 onChange={handleInputChange}
//                 placeholder="العنوان بالعربية"
    
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">Title (English) *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="titleEn"
//                 value={formData.titleEn}
//                 onChange={handleInputChange}
//                 placeholder="Title in English"
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">Video URL *</Form.Label>
//               <Form.Control
//                 type="url"
//                 name="url"
//                 value={formData.url}
//                 onChange={handleInputChange}
//                 placeholder="https://www.youtube.com/embed/..."
//                 required
//               />
//               <Form.Text className="text-muted">
//                 Use YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID
//               </Form.Text>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold">Source *</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="source"
//                 value={formData.source}
//                 onChange={handleInputChange}
//                 placeholder="e.g., World Health Organization (WHO)"
//                 required
//               />
//             </Form.Group>

//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseModal}>
//               Cancel
//             </Button>
//             <Button type="submit" className="background-for-app">
//               {editingVideo ? '💾 Save Changes' : '➕ Add Video'}
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>

//       <style jsx>{`
//         .animate-card {
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .animate-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 8px 20px rgba(0,0,0,0.12);
//         }
//         .background-for-app {
//           background: linear-gradient(135deg, rgb(173, 241, 120) 0%, #8bc34a 100%);
//           border: none;
//           color: #1a3a00;
//           font-weight: 600;
//         }
//         .background-for-app:hover {
//           background: linear-gradient(135deg, #8bc34a 0%, rgb(173, 241, 120) 100%);
//           transform: scale(1.02);
//         }
//       `}</style>
//     </Container>
//   )
// }

'use client'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert } from 'react-bootstrap'
import { Video } from '@/types/Video'
import { apiUrl } from '@/lib/api'

export default function VideoManagementClient() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    url: '',
    source: '',
  })

  useEffect(() => {
    loadVideos()
  }, [])

  const loadVideos = async () => {
    try {
      setLoading(true)
      const response = await fetch(apiUrl(`Videos?t=${Date.now()}`), {
        headers: { 'ngrok-skip-browser-warning': 'true' },
        cache: 'no-store',
      })
      const data = await response.json()
      setVideos(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load videos:', error)
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg)
    setTimeout(() => setSuccessMessage(''), 3000)
    window.dispatchEvent(new Event('videosUpdated'))
  }

  const handleShowModal = (video?: Video) => {
    if (video) {
      setEditingVideo(video)
      setFormData({
        titleAr: video.titleAr,
        titleEn: video.titleEn,
        url: video.url,
        source: video.source,
      })
    } else {
      setEditingVideo(null)
      setFormData({ titleAr: '', titleEn: '', url: '', source: '' })
    }
    setError('')
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingVideo(null)
    setError('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleDeleteClick = (id: number) => {
    setDeletingId(id)
    setShowDeleteConfirm(true)
  }

  const cancelDelete = () => {
    setShowDeleteConfirm(false)
    setDeletingId(null)
  }

  const confirmDelete = async () => {
    if (!deletingId) return
    try {
      const response = await fetch(apiUrl(`Videos/${deletingId}`), {
        method: 'DELETE',
        headers: { 'ngrok-skip-browser-warning': 'true' },
      })
      if (!response.ok) {
        alert(`Failed to delete: ${response.status}`)
        return
      }
      notifySuccess('Video deleted successfully!')
      await loadVideos()
    } catch (err) {
      console.error('Error deleting video:', err)
      alert('Failed to delete video. Please try again.')
    } finally {
      setShowDeleteConfirm(false)
      setDeletingId(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.titleAr.trim()) { setError('Arabic title is required'); return }
    if (!formData.titleEn.trim()) { setError('English title is required'); return }
    if (!formData.url.trim())     { setError('Video URL is required');     return }
    if (!formData.source.trim())  { setError('Source is required');        return }

    try {
      if (editingVideo) {
        const response = await fetch(apiUrl(`Videos/${editingVideo.id}`), {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) { setError(`Failed to update: ${response.status}`); return }
        notifySuccess('Video updated successfully!')
      } else {
        const response = await fetch(apiUrl(`Videos`), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
          body: JSON.stringify(formData),
        })
        if (!response.ok) { setError(`Failed to create: ${response.status}`); return }
        notifySuccess('Video created successfully!')
      }

      await loadVideos()
      handleCloseModal()
    } catch (error) {
      console.error('Error saving video:', error)
      setError('Failed to save video. Please try again.')
    }
  }

  const getYoutubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/\s]+)/)
    return match ? match[1] : null
  }

  const getThumbnailUrl = (url: string) => {
    const youtubeId = getYoutubeId(url)
    return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : null
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    )
  }

  return (
    <Container fluid className="px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="page-title">🎬 Video Management</h1>
        <Button className="background-for-app" onClick={() => handleShowModal()}>
          <i className="bi bi-plus-circle me-2"></i>
          Add New Video
        </Button>
      </div>

      {successMessage && (
        <Alert variant="success" dismissible onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      <Row className="g-4">
        {videos.map((video) => {
          const thumbnailUrl = getThumbnailUrl(video.url)
          return (
            <Col lg={6} xl={4} key={video.id}>
              <Card className="animate-card h-100">
                {thumbnailUrl && (
                  <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#000' }}>
                    <img
                      src={thumbnailUrl}
                      alt={video.titleEn}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}
                    />
                    <div
                      style={{
                        position: 'absolute', inset: 0, display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.3)', cursor: 'pointer',
                      }}
                      onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}
                    >
                      <i className="bi bi-play-circle-fill" style={{ fontSize: '48px', color: 'white', opacity: 0.8 }}></i>
                    </div>
                  </div>
                )}
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Badge bg="danger"><i className="bi bi-youtube me-1"></i> YouTube</Badge>
                    <Badge bg="secondary">ID: {video.id}</Badge>
                  </div>
                  <h5 className="card-title mb-2">{video.titleEn}</h5>
                  <div className="text-muted small mb-3">
                    <i className="bi bi-person me-1"></i> {video.source}
                    <br />
                    <i className="bi bi-link-45deg me-1"></i>
                    <a href={video.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                      Watch on YouTube
                    </a>
                  </div>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button variant="outline-primary" size="sm" onClick={() => handleShowModal(video)}>
                      <i className="bi bi-pencil"></i> Edit
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDeleteClick(video.id)}>
                      <i className="bi bi-trash"></i> Delete
                    </Button>
                    <Button variant="outline-success" size="sm" onClick={() => window.open(`/main/Videos/${video.id}`, '_blank')}>
                      <i className="bi bi-eye"></i> View
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
      </Row>

      {videos.length === 0 && (
        <Card className="animate-card">
          <Card.Body className="text-center text-muted py-5">
            <i className="bi bi-camera-reels" style={{ fontSize: '48px' }}></i>
            <p className="mt-3">No videos found. Add your first video!</p>
          </Card.Body>
        </Card>
      )}

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingVideo ? `✏️ Edit Video (ID: ${editingVideo.id})` : '➕ Add New Video'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title (Arabic) *</Form.Label>
              <Form.Control type="text" name="titleAr" value={formData.titleAr} onChange={handleInputChange} placeholder="العنوان بالعربية" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title (English) *</Form.Label>
              <Form.Control type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} placeholder="Title in English" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Video URL *</Form.Label>
              <Form.Control type="url" name="url" value={formData.url} onChange={handleInputChange} placeholder="https://www.youtube.com/embed/..." />
              <Form.Text className="text-muted">Use YouTube embed URL: https://www.youtube.com/embed/VIDEO_ID</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Source *</Form.Label>
              <Form.Control type="text" name="source" value={formData.source} onChange={handleInputChange} placeholder="e.g., World Health Organization (WHO)" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit" className="background-for-app">
              {editingVideo ? '💾 Save Changes' : '➕ Add Video'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="text-danger">
            <i className="bi bi-exclamation-octagon-fill me-2" />
            Delete Video
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <div className="text-center py-3">
            <div className="mb-3">
              <i className="bi bi-trash3-fill text-danger" style={{ fontSize: '4rem' }} />
            </div>
            <h5>Are you absolutely sure?</h5>
            <p className="text-muted mb-0">
              This action <strong>cannot be undone</strong>. This will permanently delete the video
              and remove all associated data from our servers.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={cancelDelete}>
            <i className="bi bi-arrow-left me-1" /> Nevermind
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <i className="bi bi-trash me-1" /> Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .animate-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .animate-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .background-for-app {
          background: linear-gradient(135deg, rgb(173, 241, 120) 0%, #8bc34a 100%);
          border: none; color: #1a3a00; font-weight: 600;
        }
        .background-for-app:hover {
          background: linear-gradient(135deg, #8bc34a 0%, rgb(173, 241, 120) 100%);
          transform: scale(1.02);
        }
      `}</style>
    </Container>
  )
}