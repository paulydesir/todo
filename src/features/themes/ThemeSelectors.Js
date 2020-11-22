import React from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {fetchThemes,selectAllThemes} from './themesSlice'


export default function ThemeSelectors() {
    const dispatch = useDispatch()
    // const allThemes = useSelector(selectAllThemes)
    const themeStatus = useSelector(state => state.themes.status);

    useEffect(() => {
        if (ThemesStatus === 'idle') {
            dispatch(fetchThemes())
        }
      }, [ThemesStatus,dispatch])

    return (
        <>   
        </>
    )
}
