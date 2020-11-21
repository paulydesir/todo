import React from 'react'
import {Grid} from '@material-ui/core'

export function GoalsItem({data}) {
    return (
        <Grid container spacing = {3}>
            <Grid item xs = {12}>
                {data.title}
            </Grid>
        </Grid>
    )
}

