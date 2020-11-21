import React from 'react'
import {Card,CardContent,CardActions,Button,Typography,Popper,Grid} from '@material-ui/core'
import {RelatedTasks} from './RelatedTasks'

export const GoalCardItem = (props) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <Card className={'goalCard'}>
        <CardContent>
            <Grid container spacing  = {3}>
                <Grid item xs = {6}> Edit</Grid>
                <Grid item xs = {6}> Pin</Grid>
            </Grid>
            <Typography>{props.data.title}</Typography>
            {/* <Typography>{props.data.deadline}</Typography>
            <Typography>{props.data.priority}</Typography> */}
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <RelatedTasks data = {props.data.id}/>
            </Popper>
            <Button size="small" aria-describedby={id} onClick={handleClick}>Actions</Button>
        </CardContent>
        <CardActions>
            
        </CardActions>
    </Card>
    )
}
