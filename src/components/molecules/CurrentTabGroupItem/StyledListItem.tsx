
import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)<{ groupcolor: string }>(({ theme, groupcolor }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    height: '3rem',
    borderLeft: `3px solid ${groupcolor}`,
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateX(3px)',
    },
}));

export default StyledListItem