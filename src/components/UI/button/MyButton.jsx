import classes from './MyButton.module.css';

export default function MyButton({children, ...props}) {
    // console.log({props})
    return (
        <button {...props} className={classes.myBtn}>{children}</button>
    )
};
