import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { closeTabGroup, ungroupTabs } from '../utils/tabGroups';

export interface Props {
  // タブグループID
  tabGroupId: number,
  // タブ一覧を更新するメソッド
  updatedTabGroupList: any
}


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function OptionMenus(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const runUnGroupTabs = (tabGroupId: number) => {
    /*
     * アクティブなウィンドウのタブグループを全て解除
     */
    handleClose();
    ungroupTabs(tabGroupId).then(() => {
        props.updatedTabGroupList()
    });
  }

  const runRemoveTabGroups = (tabGroupId: number) => {
      handleClose();
      closeTabGroup(tabGroupId).then(() =>{
        props.updatedTabGroupList()
      });
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="demo-customized-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <EditIcon />
          Edit(未実装)
        </MenuItem>
        <MenuItem onClick={() => {runRemoveTabGroups(props.tabGroupId)}} disableRipple>
          <HighlightOffIcon />
          Close
        </MenuItem>
        <MenuItem onClick={() => {runUnGroupTabs(props.tabGroupId)}} disableRipple>
          <LayersClearIcon />
          Ungroup
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
