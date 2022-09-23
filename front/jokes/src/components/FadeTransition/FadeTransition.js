import { CSSTransition } from "react-transition-group";
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    start_transition: {
        '&:hover, &': {
            opacity: (props) => 0,
            transform: ({ transform }) => transform,
            filter: ({ filter }) => filter,
        }
    },
    end_transition: {
        '&:hover, &': {
            opacity: (props) => 1,
            transform: (props) => 'translate(0px)',
            filter: (props) => 'blur(0px)',
            transition: ({ duration, timingFunction, delay }) => [
                ['opacity', `${duration}ms`, timingFunction, `${delay}ms`], 
                ['transform', `${duration}ms`, timingFunction, `${delay}ms`], 
                ['filter', `${duration}ms`, timingFunction, `${delay}ms`]
            ],
        },
    },
})


function FadeTransition(props) {
    const classes = useStyles(props);
    const classNames = {
        appear: classes.start_transition,
        appearActive: classes.end_transition,

        enter: classes.start_transition,
        enterActive: classes.end_transition,

        exit: classes.start_transition,
        exitActive: classes.end_transition,
    }

    return <CSSTransition nodeRef={props.nodeRef} in={props.animSwitch} timeout={props.duration} classNames={classNames} appear={props.appear}>
        {props.children}
    </CSSTransition>
}

FadeTransition.defaultProps = {
    animSwitch: true,
    appear: true,
    duration: 300,
    filter: 'blur(5px)',
    transform: 'translateX(-200px)',
    timingFunction: 'ease',
    delay: 0,
}

export default FadeTransition