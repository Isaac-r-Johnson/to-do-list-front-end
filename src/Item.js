import {} from '@mui/material';
import './style.css';
import DoneIcon from '@mui/icons-material/Done';

function Item(props) {
    const deed = props.deed;

    const handleClick = (e) => {
        e.preventDefault();
        props.deleteItem(deed);
    }

    return(
        <div className='item-card'>
            <button onClick={e => handleClick(e)} className='item-btn'><DoneIcon fontSize='large'></DoneIcon></button>
            <h2 className='deed'>{deed}</h2>
        </div>
    );
}

export default Item;