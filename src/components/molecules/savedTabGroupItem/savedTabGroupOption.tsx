import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import type { MenuProps } from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  // タブグループID
  tabGroupId: number
  // タブの編集モードを更新するメソッド
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  // オプションの状態
  open: boolean
  anchorEl: HTMLElement | null
  setAnchorEl: Function
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        )
      }
    }
  }
}))

export default function SavedTabGroupOption(props: Props): JSX.Element {
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    props.setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    props.setAnchorEl(null)
  }

  const runEditGroupTabs = (): void => {
    props.setEditMode(true)
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="more"
        id="demo-customized-button"
        aria-controls={props.open ? 'long-menu' : undefined}
        aria-expanded={props.open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button'
        }}
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={handleClose}
      >
        <MenuItem onClick={runEditGroupTabs} disableRipple>
          <EditIcon />
          Edit
        </MenuItem>
      </StyledMenu>
    </div>
  )
}