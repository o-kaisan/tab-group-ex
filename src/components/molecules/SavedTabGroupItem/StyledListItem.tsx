
import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    height: '3rem',
    borderLeft: `3px solid #dcdcdc`,
    transition: 'all 0.3s',
}));

export default StyledListItem