//Layout
import {Grid} from '@material-ui/core'
import React from 'react'
import Themes from './Themes'

export default function Todo() {
    return (
            //Global Container
        <Grid container spacing = {3}>
            {/* Todo Container  */}
            <Grid container spacing = {3} item xs = {9}>
                <Grid item xs = {12}>
                    <Themes/>
                </Grid>
                <Grid item xs = {12}>
                    Todo List
                </Grid>
            </Grid>

            {/* Goal Interface Container  */}
            <Grid item xs = {3}>
                Goal
            </Grid>
        </Grid>
    )
}
