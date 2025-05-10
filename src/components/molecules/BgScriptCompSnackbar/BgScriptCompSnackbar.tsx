import * as React from 'react'
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar'

interface Props {
    tabGroupTitle: string
}

export default function BgScriptCompSnackbar(props: Props): JSX.Element {
    const [open, setOpen] = React.useState(true)
    const [title, setTitle] = React.useState(props.tabGroupTitle)

    const handleClose = (_event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason): void => {
        if (reason === 'clickaway') return
        setOpen(false)
    }

    React.useEffect(() => {
        const container = document.getElementById('bg-script-snackbar-root')
        if (container == null) return

        const handleUpdate = (event: Event): void => {
            const customEvent = event as CustomEvent<{ tabGroupTitle: string }>
            setTitle(customEvent.detail.tabGroupTitle)
            setOpen(true) // 再表示
        }

        container.addEventListener('snackbar-update', handleUpdate)
        return () => {
            container.removeEventListener('snackbar-update', handleUpdate)
        }
    }, [])

    const message = `TabGroup '${title}' saved complete`

    return <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} message={message} />
}
