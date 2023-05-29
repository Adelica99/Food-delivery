import spinner from '../../assets/icons/spiner.gif';

const Spinner = () => {
    return (
        <img src={spinner} alt="spinner" style={{'position': 'absolute', 
                                                  'top': '50%', 
                                                  'left': '50%',
                                                  'transform': 'translate(40%, -50%)', 
                                                  'height': '4rem'}} />
    )
}

export default Spinner;