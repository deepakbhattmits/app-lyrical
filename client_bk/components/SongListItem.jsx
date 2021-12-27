import {Link} from 'react-router-dom';
const SongListItem=({title,id,handleDelete}) =>
    <Link className='collection-item' to={`/songs/${id}`}>
        <span>{title}</span>

               
                <i onClick={()=>handleDelete(id)} className="material-icons right link ">delete</i>
           
</Link>;
export default SongListItem