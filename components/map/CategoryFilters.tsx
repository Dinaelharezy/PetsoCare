// 'use client'

// interface Category {
//   id: string
//   label: string
//   type: string | null
// }

// interface CategoryFiltersProps {
//   categories: Category[]
//   activeCategory: string
//   onCategoryChange: (categoryId: string) => void
// }

// export default function CategoryFilters({ 
//   categories, 
//   activeCategory, 
//   onCategoryChange 
// }: CategoryFiltersProps) {
//   return (
//     <div className="d-flex justify-content-between align-items-center mb-4">
//       <div className="category-filters">
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
//             onClick={() => onCategoryChange(category.id)}
//           >
//             {category.label}
//           </button>
//         ))}
//       </div>
      
//       <button className="report-btn">
//         Report Dangerous Animal
//       </button>
//     </div>
//   )
// }