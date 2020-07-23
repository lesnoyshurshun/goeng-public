import makeStyles from '@material-ui/core/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    item: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.grey['200']
        }
    }
}))

export default useStyles