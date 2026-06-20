export function getShelterTypeColor(type?: string) {
  switch (type) {
    case 'Dogs':
      return 'text-warning'
    case 'Cats':
      return 'text-info'
    case 'Both':
      return 'text-success'
    default:
      return 'text-muted'
  }
}