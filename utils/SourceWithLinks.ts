import React from 'react'

export const SourceWithLinks = ({ source }: { source: string }) => {
  const parts = source.split(/(https?:\/\/[^\s]+)/g)
  const els = parts.map((part, i) => {
    if (part.startsWith('http')) {
      const props = {
        key: i,
        href: part,
        target: '_blank',
        rel: 'noopener noreferrer',
        style: { color: 'rgb(100,170,70)', wordBreak: 'break-all' as const },
      }
      return React.createElement('a', props, part)
    }
    return React.createElement('span', { key: i }, part)
  })
  return React.createElement(React.Fragment, null, ...els)
}