import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)'
    },
    title: {
        fontSize: 16
    },
    pos: {
        fontSize: 14,
        marginBottom: 12
    }
})

export function SettingsDescription(): JSX.Element {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="initial" gutterBottom>
                    GroupMode: Default
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    グループ化されていないタブを対象に開いているタブ全てを一つにグループ化する
                </Typography>

                <Typography className={classes.title} gutterBottom>
                    GroupMode: Domain
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    ドメインごとにグループ化する
                    <br />
                    ※サブドメイン含む
                </Typography>

                <Typography className={classes.title} gutterBottom>
                    GroupMode: Custom
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    「RULE」タブの内容に従ってグループ化する
                    <br />
                    ※サブドメイン含む
                </Typography>
            </CardContent>
        </Card>
    )
}
