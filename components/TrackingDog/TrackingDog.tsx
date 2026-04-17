// components/TrackDog/TrackDogButton.tsx
'use client'

export default function TrackDogButton({ dogName = 'Max' }: { dogName?: string }) {
  const openSmartThings = () => {
    const isAndroid = /android/i.test(navigator.userAgent)
    const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent)

    if (isAndroid) {
      // Intent URL - Chrome Android يفتح التطبيق مباشرة
      const intentUrl = 'intent://find#Intent;scheme=smartthings;package=com.samsung.android.oneconnect;end'

      let appOpened = false

      const fallback = setTimeout(() => {
        if (!appOpened) {
          // التطبيق مش موجود → Play Store
          window.location.href =
            'https://play.google.com/store/apps/details?id=com.samsung.android.oneconnect'
        }
      }, 2000)

      window.addEventListener('pagehide', () => {
        appOpened = true
        clearTimeout(fallback)
      }, { once: true })

      window.location.href = intentUrl

    } else if (isIOS) {
      // iOS App Store
      window.location.href = 'https://apps.apple.com/app/smartthings/id1222822904'

    } else {
      // Desktop → SmartThings Find web
      window.open('https://smartthingsfind.samsung.com', '_blank')
    }
  }

  return (
    <button
      onClick={openSmartThings}
      className="background-for-app"
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            10,
        padding:        '14px 24px',
        borderRadius:   50,
        border:         'none',
        color:          'white',
        fontSize:       16,
        fontWeight:     500,
        cursor:         'pointer',
        width:          '100%',
      }}
    >
      📍 Track {dogName}
    </button>
  )
}