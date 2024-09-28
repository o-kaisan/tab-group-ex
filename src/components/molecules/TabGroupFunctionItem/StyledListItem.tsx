
import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    height: '2rem',
    transition: 'all 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateX(3px)',
    },
}));

export default StyledListItem