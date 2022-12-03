
import {motion} from 'framer-motion';

const animationSmoothY = {
    initial: {opacity: 0, y: 100},
    animate: {opacity: 1, y: 0},
    exit: {opacity: 0, x: -100}    
}

const animationNavBar = {
    initial: {scale: 0},
    animate:{ scale: 1 },
    transition:{ ease: "easeOut", duration: 1 }
}

export const AnimatedPageSmoothY = ({children}) => {
    return (
        <motion.div variants={animationSmoothY} initial='initial' animate='animate' exit='exit'>
            {children}
        </motion.div>
    )
}

export const AnimatedPageNavBar = ({children}) => {
    return (
        <motion.div variants={animationNavBar} initial='initial' animate='animate' exit='exit'>
            {children}
        </motion.div>
    )
}

export default AnimatedPageSmoothY;






