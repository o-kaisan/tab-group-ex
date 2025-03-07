import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledListItem = styled(ListItem)<{ groupcolor: string }>(({ theme, groupcolor }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    height: '2.5rem',
    padding: '3px 6px',
    borderLeft: `3px solid ${groupcolor}`,
    transition: 'all 0.3s'
}))

export default StyledListItem
