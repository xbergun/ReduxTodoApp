import { useSelector , useDispatch} from 'react-redux'
import { RootState } from 'Store/store'
import {changeActiveFilter ,clearCompleted,selectTodos,selectActiveFilter} from 'Store/todos/todosSlice'


const ContentFooter = () => {
    const items = useSelector(selectTodos)
    const itemsLeft = items.filter(item => !item.completed).length
    
    const activeFilter = useSelector(selectActiveFilter)

    const dispatch = useDispatch()

    return (
        <footer className="footer">

            <span className="todo-count">
                <strong>{itemsLeft} </strong>
                {itemsLeft > 1 ? 'items' : 'item'} left

            </span>

            <ul className="filters">
                <li>
                    <a href="#/" onClick={() =>dispatch(changeActiveFilter("all")) } className={activeFilter ==="all" ? "selected": ""}>All</a>
                </li>
                <li>
                    <a href="#/" onClick={() => dispatch(changeActiveFilter("active"))} className={activeFilter ==="active" ? "selected": ""}>Active</a>

                </li>
                <li>
                    <a href="#/" onClick={() => dispatch(changeActiveFilter("completed"))} className={activeFilter ==="completed" ? "selected": ""}>Completed</a>
                </li>
            </ul>


            <button className="clear-completed" onClick={() => dispatch(clearCompleted())}>
                Clear completed
            </button>
        </footer>
    )
}

export default ContentFooter