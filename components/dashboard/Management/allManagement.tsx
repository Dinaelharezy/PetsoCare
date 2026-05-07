// 'use client'

// import { Card, Button } from 'react-bootstrap'
// import { useRouter } from 'next/navigation'

// export default function ArticleManagementDash() {
//   const router = useRouter()

//   const handleAddArticle = () => {
//     // Navigate to article management page
//     router.push('/admin/articles')
//   }

//   const handleViewArticles = () => {
//     // Navigate to article management page
//     router.push('/admin/articles')
//   }

//   return (
//     <Card className="animate-card p-2">
//       <Card.Body>
//         <h5 className="card-title p-1">Article Management</h5>
//         <div className="d-grid gap-3">
//           <Button 
//             className="background-for-app" 
            
//             onClick={handleAddArticle}
//           >
//             <i className="color-for-app bi bi-file-earmark-plus me-2"></i>
//             Add New Article
//           </Button>
//           <Button 
//             variant="outline-secondary" 
//             onClick={handleViewArticles}
//           >
//             View All Articles
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   )
// }
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ManagementAction {
  title: string
  subtitle: string
  icon: string  // Bootstrap icon class
  color: string
  route: string
}

const MANAGEMENT_ACTIONS: ManagementAction[] = [
  {
    title: 'Article Management',
    subtitle: 'Create, edit, and manage awareness articles',
    icon: 'bi bi-journal-bookmark-fill',
    color: '#0ea5e9', // info color
    route: '/admin/articles'
  },
  {
    title: 'Videos Management',
    subtitle: 'Create, edit, and manage awareness videos',
    icon: 'bi bi-camera-reels-fill',
    color: '#6366f1', // primary strong
    route: '/admin/videos'
  },
  {
    title: 'Clinic Management',
    subtitle: 'Manage clinics, addresses, images, and booking details',
    icon: 'bi bi-hospital',
    color: '#22c55e', // success color
    route: '/admin/clinics'
  },
  {
    title: 'Shelter Management',
    subtitle: 'Manage shelters, contacts, locations, and information',
    icon: 'bi bi-building',
    color: '#f59e0b', // warning color
    route: '/admin/shelters'
  },
  {
    title: 'Locations Management',
    subtitle: 'Manage areas and vaccination locations',
    icon: 'bi bi-geo-alt-fill',
    color: '#8b5cf6', // primary color
    route: '/admin/vaccine'
  },
]

export default function ManagementActionsSection() {
  const router = useRouter()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const getColumnCount = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      if (width < 650) return 1
      if (width < 1100) return 2
      return 3
    }
    return 3
  }

  return (
    <div className="management-actions-section">
      <style jsx>{`
        .management-actions-section {
          width: 100%;
        }
        
        .management-grid {
          display: grid;
          gap: 1.25rem;
        }
        
        @media (min-width: 650px) {
          .management-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1100px) {
          .management-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .management-card {
          background: #fff;
          border-radius: 1rem;
          padding: 1.25rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .management-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .management-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }
        
        .management-card:hover::before {
          opacity: 1;
        }
        
        .card-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: transform 0.2s ease;
        }
        
        .management-card:hover .card-icon {
          transform: scale(1.05);
        }
        
        .card-icon i {
          font-size: 26px;
          color: #fff;
        }
        
        .card-title {
          font-size: 1rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        
        .card-subtitle {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
          margin-bottom: 1rem;
        }
        
        .card-arrow {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-top: 0.5rem;
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.25s ease;
        }
        
        .management-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        
        .arrow-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .management-card:hover .arrow-circle {
          transform: translateX(4px);
        }
        
        .arrow-circle i {
          font-size: 12px;
          color: #fff;
        }
        
        @media (max-width: 650px) {
          .management-card {
            padding: 1rem;
          }
          
          .card-icon {
            width: 44px;
            height: 44px;
          }
          
          .card-icon i {
            font-size: 22px;
          }
          
          .card-title {
            font-size: 0.9rem;
          }
          
          .card-subtitle {
            font-size: 0.7rem;
          }
        }
      `}</style>

      <div className="management-grid">
        {MANAGEMENT_ACTIONS.map((action, index) => (
          <div
            key={index}
            className="management-card"
            onClick={() => router.push(action.route)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              background: `linear-gradient(135deg, #ffffff 0%, ${action.color}08 100%)`,
              borderLeft: `3px solid ${action.color}`,
            }}
          >
            <div 
              className="card-icon"
              style={{ background: `linear-gradient(135deg, ${action.color}, ${action.color}cc)` }}
            >
              <i className={action.icon} />
            </div>
            
            <div className="card-title">
              {action.title}
            </div>
            
            <div className="card-subtitle">
              {action.subtitle}
            </div>
            
            <div className="card-arrow">
              <div 
                className="arrow-circle"
                style={{ background: action.color }}
              >
                <i className="bi bi-arrow-right" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}