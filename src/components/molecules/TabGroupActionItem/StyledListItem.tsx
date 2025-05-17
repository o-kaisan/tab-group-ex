
import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    height: '2.5rem',
    paddingLeft: '0px',
    paddingRight: '0px',
    transition: 'all 0.3s',
    '.css-15ysc4p:hover': {
        'background-color': 'rgba(0, 0, 0, 0)'
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transform: 'translateX(3px)',
    },
}));

export default StyledListItem