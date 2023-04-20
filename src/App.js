import { Stack, TextField } from '@mui/material';
import Item from './Item';
import './style.css';
import AddIcon from '@mui/icons-material/Add';
import Popup from 'reactjs-popup';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const Load = () => {
        fetch("/tasks/")
            .then(j => j.text())
            .then(data => {
                const tempList = data.split(',');
                setTasks(tempList);
            });
    }

    useEffect(() => {
        Load();
    }, []);


    const deleteTask = (deed) => {
        const temp = tasks.filter(task => deed !== task);
        //setTasks(temp);
        const tempToWrite = temp.join(",");

        axios.post("/remove", { "tasks": tempToWrite })
        Load();
    }

    const listOfTasks = tasks.map((task, index) =>
        <Item key={index} itemKey={index} deed={task} deleteItem={deleteTask} />
    );

    const handleClick = () => {
        if (newTask) {
            var tempTasks = [];
            tempTasks = tasks;
            tempTasks.push(newTask);
            console.log(tempTasks);
            const tempTasksToSend = tempTasks.join(",");
            axios.post("/add", { "tasks": tempTasksToSend })
            setNewTask('');
            Load();
        }
    }

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    return (
        <div>
            <Stack>
                {listOfTasks}
            </Stack>
            <Popup trigger=
                {<button className='add-btn'><AddIcon fontSize='large' /></button>}
                modal nested>
                {
                    close => (
                        <div className='popup'>
                            <div>
                                <TextField autoComplete='off' onChange={handleChange} value={newTask} id="outlined-basic" color='secondary' className='text' label="Enter Task" variant="outlined" />
                            </div>
                            <div>
                                <button className='add-btn add-pos' onClick={() => { close(); handleClick() }}><AddIcon fontSize='large' /></button>
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    );
}

export default App;