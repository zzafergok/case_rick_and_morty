'use client'

import { useEffect } from 'react'

/**
 * Security component that disables right-click and developer tools keyboard shortcuts
 * in production environment only.
 *
 * @remarks
 * This is a deterrent for casual users only. Technical users can still bypass these
 * restrictions via browser settings, extensions, or other methods.
 * Real security must be implemented on the backend with proper validation and authorization.
 *
 * @see BACKEND_SECURITY_RECOMMENDATIONS.md for comprehensive security guidelines
 */
export function DisableDevTools() {
  useEffect(() => {
    // Only apply restrictions in production environment
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    /**
     * Prevents context menu (right-click) from appearing
     */
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    /**
     * Prevents developer tools keyboard shortcuts
     * - F12: Open DevTools
     * - Ctrl+Shift+I / Cmd+Option+I: Open DevTools
     * - Ctrl+Shift+J / Cmd+Option+J: Open Console
     * - Ctrl+Shift+C / Cmd+Option+C: Open Element Inspector
     * - Ctrl+U / Cmd+Option+U: View Page Source
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

      // F12
      if (e.key === 'F12') {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+I or Cmd+Option+I (DevTools)
      if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (isMac && e.metaKey && e.altKey && e.key === 'i')) {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+J or Cmd+Option+J (Console)
      if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (isMac && e.metaKey && e.altKey && e.key === 'j')) {
        e.preventDefault()
        return false
      }

      // Ctrl+Shift+C or Cmd+Option+C (Element Inspector)
      if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (isMac && e.metaKey && e.altKey && e.key === 'c')) {
        e.preventDefault()
        return false
      }

      // Ctrl+U or Cmd+Option+U (View Source)
      if ((e.ctrlKey && e.key === 'u') || (isMac && e.metaKey && e.altKey && e.key === 'u')) {
        e.preventDefault()
        return false
      }

      return true
    }

    // Attach event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup function to remove event listeners when component unmounts
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}
