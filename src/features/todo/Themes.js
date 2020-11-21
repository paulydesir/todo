import React, {useState} from 'react'
import {Grid,Button,makeStyles} from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    buttons: {
      '& > *': {
        margin: theme.spacing(),
      },
    },
  }));
  


const Themes = () => {
    const [Themes,setThemes] = useState([
        {
            id: 1,
            title:"Drawing and Art",
            active:true
        },
        {
            id: 2,
            title:"Programming",
            active:true
        },
        {
            id: 3,
            title:"Dancing",
            active:false,
            extra: true
        },
        {
            id: 4,
            title:"Soccer",
            active:false,
            extra: true
        },
        {
            id: 5,
            title:"Freestyle Flows",
            active:false,
            extra: true
        },

    ])

    const [formats, setFormats] = React.useState(() => []);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
      };


    const classes = useStyles();


    let themesToggle = Themes.map((theme,index) => (
        <Button key = {theme.id} onClick = {() => setFormats([...formats,theme.id])} variant= {theme.active ? 'outlined'  : 'contained'}>{theme.title}</Button>
    ))

    // let ThemeList = formats.map((format,index) => {
    //     <Grid item xs = {12} key = {index} >
    //         {format}
    //     </Grid>
    // })
    return (
        <Grid container spacing = {3}>
            <Grid container spacing = {3} item xs = {12} className = {classes.button}>
                <Grid item xs= {12}>
                    {themesToggle}
                </Grid>  
            </Grid>
            <Grid item xs = {12}>
                {/* {ThemeList} */}
            </Grid>
        </Grid>
    )
}

export default Themes;
